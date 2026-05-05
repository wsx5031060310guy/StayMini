import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "訂房請求已送出 · 山海間民宿" };

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <Card className="w-full">
        <CardContent className="pt-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-semibold sm:text-3xl">訂房請求已送出！</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            屋主會於 24 小時內透過 LINE 或 Email 回覆是否仍有空房。
            <br />
            如有急事，請直接撥打{" "}
            <a className="text-primary hover:underline" href={`tel:${siteConfig.phone}`}>
              {siteConfig.phone}
            </a>
            {" "}或加 LINE：<span className="font-medium">{siteConfig.lineId}</span>。
          </p>
          {id && (
            <p className="mt-4 text-xs text-muted-foreground">
              詢問編號：<span className="font-mono">{id}</span>
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/">回首頁</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rooms">繼續看房型</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
