import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `${siteConfig.name} · 直接訂房，零 OTA 抽成`,
  description: siteConfig.heroSubtitle,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b87333",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-stone-ink">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
            S
          </span>
          <span className="text-base sm:text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          <Link href="/rooms" className="text-muted-foreground hover:text-foreground transition-colors">
            房型
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            關於
          </Link>
          <Link
            href="/inquiry"
            className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            立即詢問
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div>
          <h2 className="font-semibold text-stone-ink">{siteConfig.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>
        <div className="text-sm">
          <h3 className="font-medium text-stone-ink">聯絡屋主</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>電話：{siteConfig.phone}</li>
            <li>LINE：{siteConfig.lineId}</li>
            <li>Email：{siteConfig.email}</li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-medium text-stone-ink">地址</h3>
          <p className="mt-2 text-muted-foreground">{siteConfig.address}</p>
        </div>
        <div className="text-sm">
          <h3 className="font-medium text-stone-ink">政策與條款</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                服務條款
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                隱私權政策
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-foreground transition-colors">
                取消與退訂政策
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
        <div className="border-t border-border/50 pt-4 text-xs text-muted-foreground space-y-1">
          <p>
            營運公司：{COMPANY.name}｜統一編號：{COMPANY.taxId}｜地址：{COMPANY.address}
          </p>
          <p>
            客服電話：{COMPANY.phone}｜客服 Email：
            <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground transition-colors">
              {COMPANY.email}
            </a>
            ｜LINE：{COMPANY.lineId}
          </p>
          <p>
            {COMPANY.name} ·{" "}
            <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground transition-colors">
              {COMPANY.email}
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Powered by StayMini.
          </p>
        </div>
      </div>
    </footer>
  );
}
