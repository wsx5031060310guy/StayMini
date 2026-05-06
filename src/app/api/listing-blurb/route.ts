import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/router-client";

// POST /api/listing-blurb
// Body: { name: string, location: string, features: string[], rooms?: number }
// Returns: { blurb: string }
//
// Generates a 60-90 字 marketing blurb for a B&B listing using the
// Smart Router free tier. Hosts can call this from the admin dashboard
// before publishing a new property.
export async function POST(req: NextRequest) {
  const { name, location, features, rooms } = (await req.json()) as {
    name?: string;
    location?: string;
    features?: string[];
    rooms?: number;
  };
  if (!name || !location) return NextResponse.json({ error: "name + location required" }, { status: 400 });

  const system =
    "你是民宿文案助手。輸出繁體中文，60-90 字，溫暖簡潔，不要使用 emoji，不要加標題。";
  const user =
    `民宿名稱：${name}\n地點：${location}\n房數：${rooms ?? "未填"}\n` +
    `特色：${(features || []).join("、") || "未填"}\n` +
    "請寫一段官網首頁用的介紹文。";

  try {
    const text = await chat(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      { tier: "free" }
    );
    return NextResponse.json({ blurb: text.trim() });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
