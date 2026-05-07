import { NextRequest, NextResponse } from "next/server";
import { buildCheckoutPayload } from "@/lib/payment/newebpay";
import { getPlan } from "@/lib/payment/pricing";
import { createOrder, makeMerchantTradeNo } from "@/lib/payment/order-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function siteUrl(req: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const planCode = String(body.plan ?? "pro");
  const plan = getPlan(planCode);
  if (!plan) {
    return NextResponse.json({ error: "invalid plan" }, { status: 400 });
  }

  const merchantOrderNo = makeMerchantTradeNo("STAY");
  const customerEmail = typeof body.email === "string" ? body.email : null;
  const bookingId = typeof body.bookingId === "string" ? body.bookingId : null;
  createOrder({ merchantTradeNo: merchantOrderNo, plan, provider: "NEWEBPAY", bookingId, customerEmail });

  const base = siteUrl(req);
  const { endpoint, params } = buildCheckoutPayload({
    merchantOrderNo,
    amount: plan.amount,
    itemDesc: plan.name,
    email: customerEmail || "buyer@staymini.tw",
    returnUrl: `${base}/api/payment/newebpay/return`,
    notifyUrl: `${base}/api/payment/newebpay/notify`,
    clientBackUrl: `${base}/payment/success?order=${merchantOrderNo}`,
  });

  return NextResponse.json({ endpoint, params, merchantOrderNo });
}
