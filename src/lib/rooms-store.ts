// In-memory room catalog for Phase 0. Mirrors the Prisma `Room` model.
// Swap to `prisma.room.*` once Mike provisions Postgres + runs `prisma migrate dev`.

export type Room = {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  pricePerNight: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  createdAt: Date;
};

const rooms: Room[] = [
  {
    id: "room_1",
    slug: "mountain-double",
    name: "山景雙人房",
    capacity: 2,
    pricePerNight: 2800,
    description:
      "面向中央山脈的大片落地窗，清晨可看到雲海。房內備有手沖咖啡組與在地茶葉，適合情侶或商務旅客度過安靜的一晚。",
    amenities: ["免費 Wi-Fi", "獨立衛浴", "山景陽台", "手沖咖啡組", "冷氣 / 暖氣", "停車位"],
    imageUrl: "https://picsum.photos/seed/staymini-mountain/1200/800",
    createdAt: new Date("2026-04-01T08:00:00+08:00"),
  },
  {
    id: "room_2",
    slug: "ocean-quad",
    name: "海景四人房",
    capacity: 4,
    pricePerNight: 4800,
    description:
      "兩張雙人床配陽台直望太平洋，傍晚步行 3 分鐘到海邊看夕陽。房內附小冰箱與膠囊咖啡機，適合好友或家庭出遊。",
    amenities: [
      "免費 Wi-Fi",
      "獨立衛浴",
      "海景陽台",
      "膠囊咖啡機",
      "冷氣 / 暖氣",
      "停車位",
      "嬰兒床（可加）",
    ],
    imageUrl: "https://picsum.photos/seed/staymini-ocean/1200/800",
    createdAt: new Date("2026-04-01T08:05:00+08:00"),
  },
  {
    id: "room_3",
    slug: "family-suite",
    name: "家庭六人套房",
    capacity: 6,
    pricePerNight: 6800,
    description:
      "兩房一廳獨立套房，含小型廚房、客廳沙發與兒童遊戲區。適合三代同行或好友家庭出遊，可自行下廚與洗烘衣。",
    amenities: [
      "免費 Wi-Fi",
      "兩間獨立衛浴",
      "小廚房",
      "洗烘衣機",
      "兒童遊戲區",
      "停車位（兩台）",
    ],
    imageUrl: "https://picsum.photos/seed/staymini-family/1200/800",
    createdAt: new Date("2026-04-01T08:10:00+08:00"),
  },
];

export function listRooms(): Room[] {
  return [...rooms].sort((a, b) => a.pricePerNight - b.pricePerNight);
}

export function getRoomBySlug(slug: string): Room | null {
  return rooms.find((r) => r.slug === slug) ?? null;
}
