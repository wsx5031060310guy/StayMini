import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "關於我們 · 山海間民宿" };

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold sm:text-4xl">關於我們</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        我們是一對在花蓮東海岸生活十年的夫妻，民宿就是我們的家。
        歡迎來這裡聽海、看山、發呆，把行程交給我們也可以。
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold">民宿故事</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              2016 年我們從台北搬到花蓮，把老家整理成可以接待旅人的小空間。
              三間房型分別面向山、面向海、與適合家庭的獨立套房，每間都有自己的故事。
              我們堅持親自接待、親自打理，希望每位旅人離開時都帶走一段安靜的記憶。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold">為什麼不上 OTA？</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              我們希望旅人付的錢，能直接回到接待你的人身上。
              透過自己的官網與 LINE 聯絡，省下 15–20% 的中介費，
              我們可以把這些預算花在更好的早餐、更乾淨的浴巾、與更多在地推薦上。
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">屋主</h3>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.ownerName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">聯絡方式</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>電話：{COMPANY.phone}</li>
              <li>LINE：{COMPANY.lineId}</li>
              <li>Email：{COMPANY.email}</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">地址</h3>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.address}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">交通與位置</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          自駕：花蓮市區走台 11 線南下約 30 分鐘。火車：壽豐站接送可預約。
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border bg-muted">
          <iframe
            src={siteConfig.mapEmbedUrl}
            width="100%"
            height="360"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="民宿位置地圖"
            className="block"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          (地圖為 placeholder，正式上線前請替換為真實 Google Maps 嵌入網址。)
        </p>
      </div>
    </div>
  );
}
