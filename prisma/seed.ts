// Sample seed for StayMini. Run with `npm run db:seed` AFTER provisioning the DB
// and running `npx prisma migrate dev`. Phase 0 does not execute this — the app
// uses src/lib/rooms-store.ts, which mirrors these values.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rooms = [
  {
    slug: "mountain-double",
    name: "山景雙人房",
    capacity: 2,
    pricePerNight: 2800,
    description:
      "面向中央山脈的大片落地窗，清晨可看到雲海。房內備有手沖咖啡組與在地茶葉。適合情侶或商務客。",
    amenities: ["免費 Wi-Fi", "獨立衛浴", "山景陽台", "手沖咖啡組", "冷氣 / 暖氣", "停車位"],
    imageUrl: "https://picsum.photos/seed/staymini-mountain/1200/800",
  },
  {
    slug: "ocean-quad",
    name: "海景四人房",
    capacity: 4,
    pricePerNight: 4800,
    description:
      "兩張雙人床配陽台直望太平洋，傍晚可步行 3 分鐘到海邊看夕陽。房內附小冰箱與膠囊咖啡機。",
    amenities: ["免費 Wi-Fi", "獨立衛浴", "海景陽台", "膠囊咖啡機", "冷氣 / 暖氣", "停車位", "嬰兒床（可加）"],
    imageUrl: "https://picsum.photos/seed/staymini-ocean/1200/800",
  },
  {
    slug: "family-suite",
    name: "家庭六人套房",
    capacity: 6,
    pricePerNight: 6800,
    description:
      "兩房一廳獨立套房，含小型廚房、客廳沙發與兒童遊戲區。適合三代同行或好友家庭出遊。",
    amenities: ["免費 Wi-Fi", "兩間獨立衛浴", "小廚房", "洗烘衣機", "兒童遊戲區", "停車位（兩台）"],
    imageUrl: "https://picsum.photos/seed/staymini-family/1200/800",
  },
];

async function main() {
  for (const r of rooms) {
    await prisma.room.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }
  console.log(`Seeded ${rooms.length} rooms.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
