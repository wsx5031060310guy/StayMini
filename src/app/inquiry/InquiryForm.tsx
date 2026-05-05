"use client";

import { useActionState } from "react";
import { Input, Textarea, Select, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitInquiry, type InquiryFormState } from "./actions";
import type { Room } from "@/lib/rooms-store";

type Props = {
  rooms: Room[];
  defaultRoomSlug?: string;
};

const initialState: InquiryFormState = {};

export function InquiryForm({ rooms, defaultRoomSlug }: Props) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const errors = state?.errors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="姓名" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field label="人數" htmlFor="guests" required error={errors.guests}>
          <Input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} required />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="電話" htmlFor="phone" error={errors.contact}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0912-345-678" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
      </div>
      {errors.contact && (
        <p className="-mt-2 text-sm text-destructive">{errors.contact}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="入住日" htmlFor="checkIn" required error={errors.checkIn}>
          <Input id="checkIn" name="checkIn" type="date" required />
        </Field>
        <Field label="退房日" htmlFor="checkOut" required error={errors.checkOut}>
          <Input id="checkOut" name="checkOut" type="date" required />
        </Field>
      </div>

      <Field label="房型偏好" htmlFor="roomSlug" error={errors.roomSlug}>
        <Select id="roomSlug" name="roomSlug" defaultValue={defaultRoomSlug ?? ""}>
          <option value="">尚未決定 / 請屋主推薦</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}（{r.capacity} 人 / NT${r.pricePerNight.toLocaleString("zh-TW")}）
            </option>
          ))}
        </Select>
      </Field>

      <Field label="訊息給屋主" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="例：想知道是否可以加嬰兒床、附近推薦的早餐店…"
        />
      </Field>

      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          送出後屋主會在 24 小時內透過 LINE 或 Email 回覆。本表單僅為詢問，不收取任何費用。
        </p>
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "送出中…" : "送出訂房請求"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
