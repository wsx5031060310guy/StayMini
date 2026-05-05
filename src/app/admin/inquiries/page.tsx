import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listInquiries } from "@/lib/inquiries-store";
import { getRoomBySlug } from "@/lib/rooms-store";
import { formatDate, formatDateTime, nightsBetween } from "@/lib/utils";

export const metadata = { title: "訂房詢問列表 · 管理後台" };
export const dynamic = "force-dynamic";

export default function AdminInquiriesPage() {
  const inquiries = listInquiries();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">訂房詢問列表</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            目前共 {inquiries.length} 筆。⚠️ 此頁面尚未加上身份驗證，正式上線前請先設置 Auth.js。
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-14 text-center text-muted-foreground">
            目前還沒有訂房詢問。送出一份 <a href="/inquiry" className="text-primary hover:underline">/inquiry</a> 表單試試看。
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((q) => {
            const room = q.roomSlug ? getRoomBySlug(q.roomSlug) : null;
            const nights = nightsBetween(q.checkIn, q.checkOut);
            return (
              <Card key={q.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold">{q.name}</h2>
                        <Badge variant="secondary">{q.guests} 人</Badge>
                        <StatusBadge status={q.status} />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {q.phone && <span>📞 {q.phone}</span>}
                        {q.phone && q.email && <span className="mx-2">·</span>}
                        {q.email && <span>✉ {q.email}</span>}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      送出於 {formatDateTime(q.createdAt)}
                      <br />
                      ID: <span className="font-mono">{q.id}</span>
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <Field label="入住">
                      {formatDate(q.checkIn)} – {formatDate(q.checkOut)}
                      <span className="ml-2 text-muted-foreground">({nights} 晚)</span>
                    </Field>
                    <Field label="房型偏好">{room ? room.name : "未指定"}</Field>
                    <Field label="人數">{q.guests} 人</Field>
                  </div>

                  {q.message && (
                    <div className="mt-4 rounded-md bg-muted/50 p-3 text-sm">
                      <span className="font-medium">訊息：</span>
                      {q.message}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5">{children}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" | "outline" }> = {
    new: { label: "新詢問", variant: "warning" },
    contacted: { label: "已聯絡", variant: "secondary" },
    confirmed: { label: "已確認", variant: "success" },
    cancelled: { label: "已取消", variant: "outline" },
  };
  const meta = map[status] ?? { label: status, variant: "outline" as const };
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}
