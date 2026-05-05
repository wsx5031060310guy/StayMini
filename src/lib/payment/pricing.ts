export type Plan = {
  code: string;
  name: string;
  amount: number;
  description: string;
  interval?: "month" | "year" | "one_time";
};

// StayMini 雙模式：抽成制 (per-booking 3%) 或 訂閱制 NT$1,299/月 免抽成
export const STAYMINI_PLANS: Record<string, Plan> = {
  pro: {
    code: "pro",
    name: "StayMini 專業版",
    amount: 1299,
    description: "免抽成 + iCal 多通路同步 + 自動結算",
    interval: "month",
  },
  // 抽成制由 commission.ts 處理，不走 plan checkout
};

export const COMMISSION_RATE = 0.03;

export function getPlan(code: string): Plan | null {
  return STAYMINI_PLANS[code] ?? null;
}

export function calcCommission(bookingAmount: number): number {
  return Math.round(bookingAmount * COMMISSION_RATE);
}
