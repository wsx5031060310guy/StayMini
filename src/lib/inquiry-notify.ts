import { siteConfig } from "@/lib/site-config";
import { isMailgunConfigured, sendMail } from "@/lib/mailgun";
import { getRoomBySlug } from "@/lib/rooms-store";
import type { Inquiry } from "@/lib/inquiries-store";

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function notifyOwnerOfInquiry(inquiry: Inquiry): Promise<void> {
  if (!isMailgunConfigured()) return;
  if (!siteConfig.email) return;

  const room = inquiry.roomSlug ? getRoomBySlug(inquiry.roomSlug) : null;
  const roomLabel = room?.name ?? inquiry.roomSlug ?? "未指定房型";
  const nights = Math.max(
    1,
    Math.round((inquiry.checkOut.getTime() - inquiry.checkIn.getTime()) / (1000 * 60 * 60 * 24))
  );

  const lines = [
    `新詢問編號：${inquiry.id}`,
    `姓名：${inquiry.name}`,
    `電話：${inquiry.phone ?? "—"}`,
    `Email：${inquiry.email ?? "—"}`,
    `入住：${fmtDate(inquiry.checkIn)} → 退房：${fmtDate(inquiry.checkOut)}（${nights} 晚）`,
    `人數：${inquiry.guests}`,
    `房型：${roomLabel}`,
    `留言：${inquiry.message ?? "—"}`,
  ];

  await sendMail({
    to: siteConfig.email,
    subject: `[${siteConfig.name}] 新訂房詢問 — ${inquiry.name}（${fmtDate(inquiry.checkIn)})`,
    text: lines.join("\n"),
    replyTo: inquiry.email ?? undefined,
  });
}
