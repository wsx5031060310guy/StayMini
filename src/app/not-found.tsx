import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-semibold">找不到頁面</h1>
      <p className="mt-2 text-muted-foreground">您要找的內容可能已搬家或不存在。</p>
      <div className="mt-6 flex gap-2">
        <Button asChild>
          <Link href="/">回首頁</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/rooms">看房型</Link>
        </Button>
      </div>
    </div>
  );
}
