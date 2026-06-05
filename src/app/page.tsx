import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { listRooms } from "@/lib/rooms-store";
import { formatTwd } from "@/lib/utils";

export default function HomePage() {
  const rooms = listRooms();

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${siteConfig.heroImageUrl})` }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-stone-ink/55" aria-hidden />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4 py-20 text-white sm:px-6 sm:py-28 md:py-36">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            擺脫 OTA 抽成 · 直接與屋主聯繫
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {siteConfig.name}
            <span className="block text-base font-normal text-white/85 mt-3 sm:text-lg">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-white/85 sm:text-base">{siteConfig.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/inquiry">立即詢問訂房</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              <Link href="/rooms">看房型</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title: "零 OTA 抽成", body: "省下 15–20% 中介費，價格回到旅人與屋主之間。" },
            { title: "LINE 直連屋主", body: "詢問後屋主以 LINE / 電話直接回覆，溝通最快。" },
            { title: "手機優先設計", body: "行動裝置體驗為主，瀏覽、詢問都能單手完成。" },
            { title: "在地屋主經營", body: "屋主即客服，房況、推薦景點都能直接問。" },
          ].map((f) => (
            <Card key={f.title} className="bg-card/80">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-stone-ink">{f.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">三間房型，三種視角</h2>
            <p className="mt-2 text-sm text-muted-foreground">每間房都附獨立衛浴與免費 Wi-Fi。</p>
          </div>
          <Link href="/rooms" className="hidden text-sm text-primary hover:underline sm:inline">
            看全部房型 →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.slug}`} className="group block">
              <Card className="overflow-hidden transition-shadow group-hover:shadow-md">
                <div
                  className="aspect-[4/3] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${room.imageUrl})` }}
                  aria-hidden
                />
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <span className="text-sm text-muted-foreground">{room.capacity} 人</span>
                  </div>
                  <p className="mt-1 text-sm text-primary font-medium">
                    {formatTwd(room.pricePerNight)} <span className="text-muted-foreground font-normal">/ 晚</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:px-6 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">準備好來度假了嗎？</h2>
            <p className="mt-2 text-sm text-muted-foreground">填一份簡單的詢問單，屋主會於 24 小時內回覆。</p>
          </div>
          <Button asChild size="lg">
            <Link href="/inquiry">填寫訂房請求</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
