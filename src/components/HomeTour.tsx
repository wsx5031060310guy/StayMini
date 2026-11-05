'use client';

import Image from 'next/image';
import { useState } from 'react';

const tour = [
  {
    title: '先看所有房型',
    body: '照片、入住人數與每晚價格先排清楚，旅客可以直接比較。',
    image: '/product/staymini-rooms.webp',
    alt: '山海間民宿房型列表實際畫面',
    position: '50% 20%',
  },
  {
    title: '再看房內細節',
    body: '房型頁放大照片、設施與價格，重要資訊不藏在訊息對話裡。',
    image: '/product/staymini-room.webp',
    alt: '山海間民宿海景四人房詳情實際畫面',
    position: '50% 18%',
  },
  {
    title: '最後送出詢問',
    body: '旅客填寫日期、人數與偏好，屋主收到完整需求後再回覆。',
    image: '/product/staymini-inquiry.webp',
    alt: '山海間民宿訂房詢問表單實際畫面',
    position: '50% 12%',
  },
] as const;

export function HomeTour() {
  const [active, setActive] = useState(0);
  const selected = tour[active];

  return (
    <div className="stay-tour">
      <div className="stay-tour-list" role="tablist" aria-label="民宿官網使用流程">
        {tour.map((step, index) => {
          const isActive = index === active;
          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="stay-tour-panel"
              className="stay-tour-step"
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <span>
                <strong>{step.title}</strong>
                {isActive ? <small>{step.body}</small> : null}
              </span>
            </button>
          );
        })}
      </div>
      <div id="stay-tour-panel" role="tabpanel" className="stay-tour-screen">
        <span className="stay-demo-label">示範資料</span>
        <Image
          key={selected.image}
          src={selected.image}
          alt={selected.alt}
          fill
          sizes="(max-width: 800px) 100vw, 58vw"
          style={{ objectPosition: selected.position }}
        />
      </div>
    </div>
  );
}
