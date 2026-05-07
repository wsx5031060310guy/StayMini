# StayMini

> 給台灣獨立民宿屋主的「最小可用」官網模板。
> 擺脫 OTA 抽成，旅人直接透過詢問表單聯繫屋主。

Tier 5 of Mike Feng's micro-saas portfolio. Phase 0 ships a single-tenant demo;
Phase 1 will turn this into a multi-tenant SaaS template.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS** + shadcn-ui style components (Button, Card, Input, Textarea, Select, Badge)
- **Prisma** + Postgres (Neon-compatible) — schema only this phase, no real DB
- **Server Actions** for the inquiry form
- **Mailgun** scaffold ready (env var only, not wired up)
- Mobile-first (sm:/md:/lg: progressive)
- 繁體中文 UI · English code/comments

## MVP scope (Phase 0)

| Route | Purpose |
| --- | --- |
| `/` | Hero (大圖 + 民宿名 + tagline) + 「立即詢問」CTA + 三項房型預覽 |
| `/rooms` | 三間 sample 房型卡片列表 |
| `/rooms/[slug]` | 單一房型 detail：圖庫 placeholder、介紹、設備、CTA 帶房型 deep-link 至 `/inquiry?room=…` |
| `/about` | 民宿故事、地址、聯絡、Google Maps placeholder |
| `/inquiry` | 訂房請求表單（姓名 / 電話 / Email / 入住日 / 退房日 / 人數 / 房型 / 訊息）→ Server Action → 存入記憶體 store + `console.log` |
| `/inquiry/thanks` | 送出後感謝頁，顯示詢問編號 |
| `/admin/inquiries` | 屋主後台：詢問列表（**尚未加上身份驗證，正式上線前必加**） |

## Quickstart

```bash
cd StayMini
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
```

無需資料庫即可啟動 — 詢問會存到 in-memory store（`src/lib/inquiries-store.ts`）並 `console.log` 在 dev server。

## Project layout

```
src/
  app/
    layout.tsx              # 共用 header / footer
    page.tsx                # /
    rooms/page.tsx          # /rooms
    rooms/[slug]/page.tsx   # /rooms/:slug
    about/page.tsx          # /about
    inquiry/page.tsx        # /inquiry
    inquiry/InquiryForm.tsx # client component
    inquiry/actions.ts      # Server Action
    inquiry/thanks/page.tsx # /inquiry/thanks
    admin/inquiries/page.tsx
    not-found.tsx
    globals.css
  components/ui/            # Button, Card, Input/Textarea/Select/Label, Badge
  lib/
    site-config.ts          # 民宿名稱 / tagline / 聯絡方式（一處改，全站套用）
    rooms-store.ts          # 三間 sample 房型
    inquiries-store.ts      # in-memory 詢問 store
    prisma.ts               # 為 Phase 1 預留的 Prisma client singleton
    utils.ts                # cn / formatDate / formatTwd / nightsBetween
prisma/
  schema.prisma             # Inquiry + Room 模型
  seed.ts                   # 三間房型 seed（Phase 1 才執行）
```

## Customize for a real minsu

最小客製：改 `src/lib/site-config.ts`（民宿名、tagline、聯絡方式、地址、Maps 嵌入網址、Hero 圖）
與 `src/lib/rooms-store.ts`（房型）。

進階客製：
- Hero 背景：把 `siteConfig.heroImageUrl` 換成 `/public` 內的本地圖片
- Tailwind 配色：`tailwind.config.ts` 內 amber/stone palette 可調
- 換掉所有 `picsum.photos` placeholder URL 為真實照片

## Next steps for Mike (before deploying)

1. **Provision Postgres** (Neon / Supabase) → 把連線字串填入 `.env`
2. `npx prisma migrate dev --name init` 建表
3. `npm run db:seed` 把 `rooms-store.ts` 的內容 seed 到 DB（或直接在 Prisma Studio 編輯）
4. **Switch stores to Prisma**：把 `src/app/**/page.tsx` 中的 `listRooms()` / `getRoomBySlug()` / `createInquiry()` / `listInquiries()` 換成 `prisma.room.*` / `prisma.inquiry.*`
5. **Add Auth.js (NextAuth)** 保護 `/admin/*` — 目前完全無驗證，公開可見
6. **Wire Mailgun** for new-inquiry email notifications：在 Server Action 內呼叫 Mailgun API（HTTP `POST /v3/{domain}/messages`），寄到屋主 email。env 已預留：`MAILGUN_API_KEY` / `MAILGUN_DOMAIN` / `MAILGUN_FROM_EMAIL` / `MAILGUN_FROM_NAME` / `MAILGUN_REGION`。
7. **Replace placeholders**：Google Maps embed URL、Hero 圖、`siteConfig.lineId`、所有民宿照片
8. **Vercel deploy**：`vercel --prod`（Mike 手動執行，**不要**在 CI 自動部署）

## Non-goals (intentionally not built)

- 線上付款 / 訂金（屋主希望先電話 / LINE 確認再走匯款）
- 房況日曆（避免 over-engineering，屋主自己用 Google Calendar 管理）
- 多語系（先 zh-TW only，i18n 在 Phase 1 才做）
- 多 tenant（Phase 1 才做，目前是單民宿模板）

## License

Private. © Mike Feng.
