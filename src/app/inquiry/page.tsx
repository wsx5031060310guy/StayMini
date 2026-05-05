import { Card, CardContent } from "@/components/ui/card";
import { listRooms, getRoomBySlug } from "@/lib/rooms-store";
import { siteConfig } from "@/lib/site-config";
import { InquiryForm } from "./InquiryForm";

export const metadata = { title: "訂房請求 · 山海間民宿" };

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const sp = await searchParams;
  const rooms = listRooms();
  const roomParam = sp?.room;
  const defaultRoom = roomParam && getRoomBySlug(roomParam) ? roomParam : undefined;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">訂房請求</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          請填寫以下資訊，屋主會以 LINE 或 Email 回覆是否仍有空房。
          <br className="hidden sm:block" />
          急件請直接撥打 <a className="text-primary hover:underline" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          {" "}或加 LINE：<span className="font-medium">{siteConfig.lineId}</span>。
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <InquiryForm rooms={rooms} defaultRoomSlug={defaultRoom} />
        </CardContent>
      </Card>
    </div>
  );
}
