// In-memory order/booking store. Mirrors Prisma `Order` + `Booking` so the
// payment + commission flow is testable before DATABASE_URL is set.
// Swap for Prisma once Neon is provisioned — surface is stable.

import crypto from "node:crypto";
import { calcCommission, type Plan } from "./pricing";

export type OrderProvider = "ECPAY" | "STRIPE";
export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type BookingStatus =
  | "HELD"
  | "CONFIRMED"
  | "CANCELLED"
  | "NO_SHOW"
  | "COMPLETED";

export interface StoredBooking {
  id: string;
  roomSlug: string;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalAmount: number;
  commission: number;
  payoutAmount: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoredOrder {
  id: string;
  merchantTradeNo: string;
  bookingId: string | null;
  planCode: string;
  amount: number;
  currency: string;
  provider: OrderProvider;
  providerRef: string | null;
  status: OrderStatus;
  customerEmail: string | null;
  rawCallback: Record<string, unknown> | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const globalForStore = globalThis as unknown as {
  __stayminiOrders?: StoredOrder[];
  __stayminiBookings?: StoredBooking[];
};
const orders: StoredOrder[] =
  globalForStore.__stayminiOrders ?? (globalForStore.__stayminiOrders = []);
const bookings: StoredBooking[] =
  globalForStore.__stayminiBookings ??
  (globalForStore.__stayminiBookings = []);

export function makeMerchantTradeNo(prefix = "STAY"): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}${stamp}${rand}`.slice(0, 20);
}

export function createBooking(input: {
  roomSlug: string;
  guestName: string;
  guestEmail?: string | null;
  guestPhone?: string | null;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalAmount: number;
}): StoredBooking {
  const commission = calcCommission(input.totalAmount);
  const now = new Date();
  const booking: StoredBooking = {
    id: crypto.randomBytes(8).toString("hex"),
    roomSlug: input.roomSlug,
    guestName: input.guestName,
    guestEmail: input.guestEmail ?? null,
    guestPhone: input.guestPhone ?? null,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    totalAmount: input.totalAmount,
    commission,
    payoutAmount: input.totalAmount - commission,
    status: "HELD",
    createdAt: now,
    updatedAt: now,
  };
  bookings.push(booking);
  return booking;
}

export function createOrder(input: {
  merchantTradeNo: string;
  plan: Plan;
  provider: OrderProvider;
  bookingId?: string | null;
  customerEmail?: string | null;
}): StoredOrder {
  const now = new Date();
  const order: StoredOrder = {
    id: crypto.randomBytes(8).toString("hex"),
    merchantTradeNo: input.merchantTradeNo,
    bookingId: input.bookingId ?? null,
    planCode: input.plan.code,
    amount: input.plan.amount,
    currency: "TWD",
    provider: input.provider,
    providerRef: null,
    status: "PENDING",
    customerEmail: input.customerEmail ?? null,
    rawCallback: null,
    paidAt: null,
    createdAt: now,
    updatedAt: now,
  };
  orders.push(order);
  return order;
}

export function findOrderByMerchantTradeNo(no: string): StoredOrder | null {
  return orders.find((o) => o.merchantTradeNo === no) ?? null;
}

export function findBookingById(id: string): StoredBooking | null {
  return bookings.find((b) => b.id === id) ?? null;
}

export function markOrderPaid(input: {
  merchantTradeNo: string;
  providerRef?: string | null;
  rawCallback: Record<string, unknown>;
}): StoredOrder | null {
  const order = findOrderByMerchantTradeNo(input.merchantTradeNo);
  if (!order) return null;
  order.status = "PAID";
  order.providerRef = input.providerRef ?? order.providerRef;
  order.paidAt = new Date();
  order.rawCallback = input.rawCallback;
  order.updatedAt = new Date();

  // If this order was attached to a booking, advance the booking to CONFIRMED.
  if (order.bookingId) {
    const booking = findBookingById(order.bookingId);
    if (booking && booking.status === "HELD") {
      booking.status = "CONFIRMED";
      booking.updatedAt = new Date();
    }
  }
  return order;
}

export function markOrderFailed(input: {
  merchantTradeNo: string;
  rawCallback: Record<string, unknown>;
}): StoredOrder | null {
  const order = findOrderByMerchantTradeNo(input.merchantTradeNo);
  if (!order) return null;
  order.status = "FAILED";
  order.rawCallback = input.rawCallback;
  order.updatedAt = new Date();
  return order;
}

export function listOrders(): StoredOrder[] {
  return [...orders].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function listBookings(): StoredBooking[] {
  return [...bookings].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
