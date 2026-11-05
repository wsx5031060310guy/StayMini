import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HomeTour } from '@/components/HomeTour';
import { listRooms } from '@/lib/rooms-store';
import { formatTwd } from '@/lib/utils';

export const metadata: Metadata = {
  title: '民宿自有官網示範｜山海間民宿',
  description: '房型、設施與訂房詢問都放在自己的官網，旅客直接聯絡屋主。',
};

const roomImages: Record<string, string> = {
  'mountain-double': '/product/room-mountain.jpg',
  'ocean-quad': '/product/room-ocean.jpg',
  'family-suite': '/product/room-family.jpg',
};

export default function HomePage() {
  const rooms = listRooms();

  return (
    <div className="stay-home">
      <section className="stay-hero" aria-labelledby="stay-hero-title">
        <div className="stay-hero-copy">
          <h1 id="stay-hero-title">
            <span className="stay-nowrap">民宿自有官網，</span>
            <span className="stay-nowrap">訂房直接找屋主</span>
          </h1>
          <p>
            這是一個示範民宿網站。旅客可以直接看房型、查設施，再送出訂房詢問。
          </p>
          <div className="stay-hero-actions">
            <a className="stay-button stay-button-primary" href="#demo-rooms">
              瀏覽示範房型
            </a>
            <Link className="stay-button stay-button-secondary" href="/inquiry">
              試用詢問表單
            </Link>
          </div>
        </div>
        <div className="stay-product-frame" aria-label="民宿自有官網房型頁實際畫面">
          <div className="stay-product-caption">
            <strong>山海間民宿</strong>
            <span className="stay-demo-label">示範資料</span>
          </div>
          <div className="stay-product-screen">
            <Image
              src="/product/staymini-rooms.webp"
              alt="山海間民宿房型列表實際畫面"
              fill
              priority
              sizes="(max-width: 800px) 94vw, 52vw"
            />
          </div>
        </div>
      </section>

      <section id="demo-rooms" className="stay-room-section" aria-labelledby="stay-rooms-title">
        <div className="stay-section-heading stay-room-heading">
          <div>
            <h2 id="stay-rooms-title">旅客先看到房型，再決定要不要問</h2>
            <p>示範房型資料，點開可查看完整房型頁。</p>
          </div>
          <Link href="/rooms">查看全部房型</Link>
        </div>
        <div className="stay-room-rail" tabIndex={0} aria-label="示範房型，可水平捲動">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.slug}`} className="stay-room-card">
              <div className="stay-room-photo">
                <Image
                  src={roomImages[room.slug]}
                  alt={`${room.name}示範照片`}
                  fill
                  sizes="(max-width: 800px) 82vw, 31vw"
                />
                <span className="stay-demo-label">示範房型</span>
              </div>
              <div className="stay-room-meta">
                <div>
                  <h3>{room.name}</h3>
                  <span>{room.capacity} 人入住</span>
                </div>
                <p>{formatTwd(room.pricePerNight)} <span>/ 晚</span></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="stay-section" aria-labelledby="stay-system-title">
        <div className="stay-section-heading">
          <h2 id="stay-system-title">一個官網，完成從看房到詢問</h2>
          <p>房型、內容與詢問流程用同一套視覺呈現，旅客不必在多個頁面猜下一步。</p>
        </div>
        <div className="stay-bento">
          <article className="stay-bento-card stay-bento-wide">
            <div className="stay-bento-copy">
              <span>房型內容</span>
              <h3>大照片先建立期待</h3>
              <p>房型頁並列照片、價格與入住人數，旅客先看懂再詢問。</p>
            </div>
            <div className="stay-bento-screen stay-bento-screen-room">
              <span className="stay-demo-label">示範資料</span>
              <Image src="/product/staymini-room.webp" alt="海景四人房房型頁實際畫面" fill sizes="(max-width: 800px) 100vw, 58vw" />
            </div>
          </article>
          <article className="stay-bento-card stay-bento-form">
            <div className="stay-bento-copy">
              <span>詢問流程</span>
              <h3>入住需求一次填完整</h3>
              <p>日期、人數與房型偏好集中在一份詢問單。</p>
            </div>
            <div className="stay-bento-screen stay-bento-screen-form">
              <Image src="/product/staymini-inquiry.webp" alt="訂房詢問表單實際畫面" fill sizes="(max-width: 800px) 100vw, 36vw" />
            </div>
          </article>
          <article className="stay-bento-card stay-bento-mobile">
            <div className="stay-bento-copy">
              <span>自有版面</span>
              <h3>品牌、照片與內容由民宿自己安排</h3>
              <p>不用把重要房型資訊塞進平台固定格式。</p>
            </div>
            <div className="stay-bento-photo">
              <Image src="/product/room-ocean.jpg" alt="海景四人房示範照片" fill sizes="(max-width: 800px) 100vw, 36vw" />
              <span className="stay-demo-label">示範照片</span>
            </div>
          </article>
        </div>
      </section>

      <section className="stay-section stay-flow" aria-labelledby="stay-flow-title">
        <div className="stay-section-heading">
          <h2 id="stay-flow-title">旅客三步驟完成詢問</h2>
          <p>點選步驟，查看對應的實際頁面。</p>
        </div>
        <HomeTour />
      </section>

      <section className="stay-trust" aria-labelledby="stay-trust-title">
        <div>
          <h2 id="stay-trust-title">這是一個可操作的方案示範</h2>
          <p>山海間民宿是示範站，不是真實營業的民宿，照片為 AI 生成示意。</p>
        </div>
        <dl>
          <div>
            <dt>資料身分</dt>
            <dd>照片、房價、地址與聯絡資訊皆為示範資料</dd>
          </div>
          <div>
            <dt>可操作頁面</dt>
            <dd>房型列表、房型詳情與訂房詢問表單</dd>
          </div>
          <div>
            <dt>詢問表單</dt>
            <dd>用於確認房況，不在送出時收取費用</dd>
          </div>
        </dl>
      </section>

      <section className="stay-cta" aria-labelledby="stay-cta-title">
        <div>
          <h2 id="stay-cta-title">從房型頁開始體驗</h2>
          <p>先看示範房型，再試著送出一份不收費的訂房詢問。</p>
        </div>
        <Link className="stay-button stay-button-primary" href="/rooms">
          查看示範房型
        </Link>
      </section>
    </div>
  );
}
