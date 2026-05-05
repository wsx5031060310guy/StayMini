import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRoomBySlug, listRooms } from "@/lib/rooms-store";
import { formatTwd } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  return listRooms().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "房型不存在" };
  return { title: `${room.name} · 山海間民宿` };
}

export default async function RoomDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const galleryUrls = [
    room.imageUrl,
    room.imageUrl.replace(/\/(\d+)\/(\d+)$/, "/$1/$2") +
      `?seed=${room.slug}-2`,
    `https://picsum.photos/seed/${room.slug}-3/1200/800`,
    `https://picsum.photos/seed/${room.slug}-4/1200/800`,
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/rooms" className="text-sm text-muted-foreground hover:text-foreground">
        ← 回房型列表
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-cover bg-center shadow-sm"
            style={{ backgroundImage: `url(${room.imageUrl})` }}
            aria-hidden
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {galleryUrls.slice(1).map((url, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
                aria-hidden
              />
            ))}
          </div>
        </div>

        <Card className="h-fit">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-semibold sm:text-3xl">{room.name}</h1>
              <Badge variant="secondary">{room.capacity} 人</Badge>
            </div>
            <p className="mt-2 text-xl font-semibold text-primary">
              {formatTwd(room.pricePerNight)}{" "}
              <span className="text-sm text-muted-foreground font-normal">/ 晚</span>
            </p>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link href={`/inquiry?room=${room.slug}`}>詢問此房型</Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              我們會在收到詢問後 24 小時內以 LINE 或 Email 回覆。
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold">房型介紹</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{room.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">設備與服務</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
