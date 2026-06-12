import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "付款結果 · 山海間民宿",
  description: "付款流程已完成，訂房確認將以 Email 或 LINE 通知您。",
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const emailPending = COMPANY.email.includes("待補");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <Card className="w-full">
        <CardContent className="pt-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-semibold sm:text-3xl">付款流程已完成</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            感謝您的訂購！實際付款結果以系統通知為準，
            <br />
            訂房確認將以 Email 或 LINE 通知您，請留意收件匣。
          </p>
          {order && (
            <p className="mt-4 text-xs text-muted-foreground">
              訂單編號：<span className="font-mono">{order}</span>
            </p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            若您未完成付款或遲未收到通知，請以 Email（
            {emailPending ? (
              COMPANY.email
            ) : (
              <a
                className="text-primary underline underline-offset-2"
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
            )}
            ）或電話（{COMPANY.phone}）聯繫客服。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/">回首頁</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rooms">看房型</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
