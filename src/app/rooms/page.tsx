import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listRooms } from "@/lib/rooms-store";
import { formatTwd } from "@/lib/utils";

export const metadata = { title: "房型介紹 · 山海間民宿" };

export default function RoomsIndexPage() {
  const rooms = listRooms();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">房型介紹</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          三間房型供您選擇。所有房間皆附獨立衛浴、免費 Wi-Fi、停車位。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="flex flex-col overflow-hidden">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${room.imageUrl})` }}
              aria-hidden
            />
            <CardContent className="flex flex-1 flex-col pt-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">{room.name}</h2>
                <Badge variant="secondary">{room.capacity} 人</Badge>
              </div>
              <p className="mt-1 text-base font-medium text-primary">
                {formatTwd(room.pricePerNight)}{" "}
                <span className="text-sm text-muted-foreground font-normal">/ 晚</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {room.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {room.amenities.slice(0, 4).map((a) => (
                  <Badge key={a} variant="outline" className="font-normal">
                    {a}
                  </Badge>
                ))}
                {room.amenities.length > 4 && (
                  <Badge variant="outline" className="font-normal">
                    +{room.amenities.length - 4}
                  </Badge>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/rooms/${room.slug}`}>看詳情</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/inquiry?room=${room.slug}`}>詢問此房型</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
