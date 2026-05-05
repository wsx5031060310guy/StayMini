import { NextRequest, NextResponse } from "next/server";
import { getEcpayConfig, verifyCallback } from "@/lib/payment/ecpay";
import { markOrderFailed, markOrderPaid } from "@/lib/payment/order-store";

// ECPay sends application/x-www-form-urlencoded to ReturnURL.
// Reply with the literal "1|OK" body so ECPay stops retrying.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = Object.fromEntries(new URLSearchParams(body));

  const { hashKey, hashIV } = getEcpayConfig();
  if (!verifyCallback(params, hashKey, hashIV)) {
    return new NextResponse("0|CheckMacFailed", { status: 400 });
  }

  const merchantTradeNo = params.MerchantTradeNo;
  if (!merchantTradeNo) {
    return new NextResponse("0|MissingTradeNo", { status: 400 });
  }

  if (params.RtnCode === "1") {
    markOrderPaid({
      merchantTradeNo,
      providerRef: params.TradeNo ?? null,
      rawCallback: params,
    });
  } else {
    markOrderFailed({ merchantTradeNo, rawCallback: params });
  }

  return new NextResponse("1|OK", { status: 200 });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
