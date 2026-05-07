"use server";

import { redirect } from "next/navigation";
import { createInquiry, findActiveOverlap } from "@/lib/inquiries-store";
import { getRoomBySlug } from "@/lib/rooms-store";
import { notifyOwnerOfInquiry } from "@/lib/inquiry-notify";

function parseDate(value: FormDataEntryValue | null): Date | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export type InquiryFormState = {
  errors?: Record<string, string>;
};

export async function submitInquiry(
  _prev: InquiryFormState | undefined,
  formData: FormData
): Promise<InquiryFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const checkIn = parseDate(formData.get("checkIn"));
  const checkOut = parseDate(formData.get("checkOut"));
  const guestsRaw = (formData.get("guests") as string | null) ?? "";
  const guests = parseInt(guestsRaw, 10);
  const roomSlug = (formData.get("roomSlug") as string | null)?.trim() || null;
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "請輸入您的姓名";
  if (!phone && !email) errors.contact = "請至少留下電話或 Email 其中一項";
  if (!checkIn) errors.checkIn = "請選擇入住日期";
  if (!checkOut) errors.checkOut = "請選擇退房日期";
  if (checkIn && checkOut && checkOut.getTime() <= checkIn.getTime()) {
    errors.checkOut = "退房日期需晚於入住日期";
  }
  if (!Number.isFinite(guests) || guests < 1) errors.guests = "請輸入入住人數";
  if (roomSlug && !getRoomBySlug(roomSlug)) errors.roomSlug = "找不到此房型";

  if (Object.keys(errors).length > 0) return { errors };

  if (roomSlug && checkIn && checkOut) {
    const conflicts = findActiveOverlap(roomSlug, checkIn, checkOut);
    if (conflicts.length > 0) {
      const earliest = conflicts.reduce((a, b) => (a.checkIn < b.checkIn ? a : b));
      const fmt = (d: Date) => d.toISOString().slice(0, 10);
      return {
        errors: {
          checkIn: `此房型在 ${fmt(earliest.checkIn)} ~ ${fmt(earliest.checkOut)} 已被預訂，請改其他日期或房型`,
        },
      };
    }
  }

  const inquiry = createInquiry({
    name,
    phone: phone || null,
    email: email || null,
    checkIn: checkIn!,
    checkOut: checkOut!,
    guests,
    roomSlug,
    message: message || null,
  });

  console.log("[StayMini] new inquiry:", {
    id: inquiry.id,
    name: inquiry.name,
    phone: inquiry.phone,
    email: inquiry.email,
    checkIn: inquiry.checkIn.toISOString().slice(0, 10),
    checkOut: inquiry.checkOut.toISOString().slice(0, 10),
    guests: inquiry.guests,
    roomSlug: inquiry.roomSlug,
  });

  // Best-effort owner notification — never block the form on Mailgun errors.
  try {
    await notifyOwnerOfInquiry(inquiry);
  } catch (e) {
    console.error("[StayMini] mailgun notify failed:", e);
  }

  redirect(`/inquiry/thanks?id=${inquiry.id}`);
}
