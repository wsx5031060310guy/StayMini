# StayMini 操作與業務流程

## 1. 房型瀏覽到詢問

```mermaid
flowchart TD
  Home["GET /"] --> ListRooms["listRooms()"]
  ListRooms --> RoomCards["首頁房型卡片"]
  RoomCards --> RoomsPage["GET /rooms"]
  RoomsPage --> Detail["GET /rooms/[slug]"]
  Detail --> GetRoom["getRoomBySlug(slug)"]
  GetRoom --> CTA["Link /inquiry?room={slug}"]
  CTA --> InquiryPage["GET /inquiry"]
  InquiryPage --> InquiryForm["InquiryForm defaultRoomSlug"]
```

首頁與房型頁都從 `rooms-store.ts` 讀三間 sample 房型。房型詳情頁用 `getRoomBySlug()` 驗證 slug，不存在時呼叫 `notFound()`。

## 2. 訂房詢問送出

```mermaid
sequenceDiagram
  actor Guest as 旅人
  participant Page as /inquiry InquiryForm
  participant Action as submitInquiry()
  participant Rooms as getRoomBySlug()
  participant Store as inquiries-store.ts
  participant Mail as notifyOwnerOfInquiry()
  participant Thanks as /inquiry/thanks

  Guest->>Page: 填寫姓名、聯絡方式、日期、人數、房型
  Page->>Action: Server Action FormData
  Action->>Rooms: 驗證 roomSlug
  Action->>Store: findActiveOverlap(roomSlug, checkIn, checkOut)
  Store-->>Action: contacted / confirmed 衝突清單
  alt validation failed or date conflict
    Action-->>Page: errors
  else valid
    Action->>Store: createInquiry()
    Action->>Mail: Mailgun best-effort 通知
    Action->>Thanks: redirect /inquiry/thanks?id={id}
  end
```

`submitInquiry()` 檢查姓名、聯絡方式、入住/退房日、人數與房型。只有 `contacted` / `confirmed` 詢問會被 `findActiveOverlap()` 視為日期衝突；Mailgun 失敗不會阻擋表單完成。

## 3. 屋主查看詢問後台

```mermaid
sequenceDiagram
  actor Owner as 屋主
  participant MW as middleware.ts
  participant Env as ADMIN_USER / ADMIN_PASSWORD
  participant Admin as /admin/inquiries
  participant Store as listInquiries()
  participant Rooms as getRoomBySlug()

  Owner->>MW: GET /admin/inquiries
  MW->>Env: 讀取 Basic Auth 帳密
  alt env missing
    MW-->>Owner: 503 Admin auth not configured
  else auth invalid
    MW-->>Owner: 401 WWW-Authenticate
  else auth valid
    MW->>Admin: NextResponse.next()
    Admin->>Store: listInquiries()
    Admin->>Rooms: 依 roomSlug 顯示房型名稱
    Admin-->>Owner: 詢問列表
  end
```

`/admin/*` 由 `src/middleware.ts` Basic Auth 保護。頁面只讀 in-memory 詢問資料，沒有狀態更新表單或 API。

## 4. NewebPay 付款流程

```mermaid
sequenceDiagram
  actor Client as 前端 / 呼叫端
  participant Checkout as POST /api/payment/newebpay/checkout
  participant Pricing as getPlan()
  participant Orders as payment/order-store.ts
  participant Crypto as buildCheckoutPayload()
  participant NWP as NewebPay MPG
  participant Return as POST /api/payment/newebpay/return
  participant Notify as POST /api/payment/newebpay/notify
  participant Success as /payment/success

  Client->>Checkout: { plan, email, bookingId? }
  Checkout->>Pricing: getPlan(plan)
  Checkout->>Orders: createOrder(PENDING)
  Checkout->>Crypto: AES TradeInfo + TradeSha
  Checkout-->>Client: { endpoint, params, merchantOrderNo }
  Client->>NWP: submit payment form
  NWP->>Return: browser return POST TradeInfo
  Return-->>Success: 303 redirect ?order={MerchantOrderNo}
  NWP->>Notify: server notify POST TradeInfo + Status
  Notify->>Orders: markOrderPaid() or markOrderFailed()
```

`checkout` 目前只支援 `pricing.ts` 裡的 `pro` 方案。付款狀態以 `/notify` 為準；`/return` 只盡力解析訂單編號並導到成功頁。

## 5. AI 民宿介紹文產生

```mermaid
sequenceDiagram
  actor Host as 呼叫端
  participant API as POST /api/listing-blurb
  participant RouterClient as chat()
  participant Route as SMART_ROUTER_URL /route?tier=free
  participant Completion as SMART_ROUTER_URL /v1/chat/completions

  Host->>API: { name, location, features, rooms? }
  alt missing name or location
    API-->>Host: 400 name + location required
  else valid
    API->>RouterClient: chat(messages, { tier: "free" })
    RouterClient->>Route: 選模型
    Route-->>RouterClient: { model }
    RouterClient->>Completion: chat completions
    Completion-->>RouterClient: assistant content
    RouterClient-->>API: text
    API-->>Host: { blurb }
  end
```

此 API 不在現有頁面中呼叫，但 route 已存在。若 `SMART_ROUTER_URL` 未設定，client 預設呼叫 `http://127.0.0.1:8765`。
