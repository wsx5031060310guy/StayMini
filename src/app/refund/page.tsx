import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "取消與退訂政策 · 山海間民宿",
  description: "山海間民宿訂房取消與退訂政策：依距入住日天數之階梯退費標準、不可抗力處理、退款管道與時程說明。",
};

const REFUND_TIERS = [
  { period: "入住日 14 日（含）前", ratio: "退還已付金額 100%" },
  { period: "入住日前 10–13 日", ratio: "退還已付金額 70%" },
  { period: "入住日前 7–9 日", ratio: "退還已付金額 50%" },
  { period: "入住日前 4–6 日", ratio: "退還已付金額 40%" },
  { period: "入住日前 2–3 日", ratio: "退還已付金額 30%" },
  { period: "入住日前 1 日", ratio: "退還已付金額 20%" },
  { period: "入住當日取消或未到（No-show）", ratio: "不予退還" },
];

export default function RefundPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold sm:text-4xl">取消與退訂政策</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        最後更新日期：2026 年 6 月 12 日。本政策參考交通部觀光署「個別旅客訂房定型化契約應記載及不得記載事項」訂定。
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-stone-ink">一、旅客取消訂房之退費標準</h2>
          <p className="mt-3">
            訂房成立並完成付款後，旅客如欲解約退訂，依通知到達日距預定入住日之天數，按下列比例退還已付款項：
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-border/70">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-stone-ink">
                  <th scope="col" className="px-4 py-2.5 font-medium">取消通知時間</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">退費比例</th>
                </tr>
              </thead>
              <tbody>
                {REFUND_TIERS.map((tier) => (
                  <tr key={tier.period} className="border-b border-border/50 last:border-b-0">
                    <td className="px-4 py-2.5">{tier.period}</td>
                    <td className="px-4 py-2.5">{tier.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs sm:text-sm">
            ※ 實際退費標準以您收到之訂房確認文件與最新法規公告為準；如有差異，依較有利於消費者之規定辦理。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">二、變更入住日期</h2>
          <p className="mt-3">
            如欲變更入住日期，請儘早與我們聯繫；在房況許可範圍內，可協助改期一次且不收取費用。
            改期後再取消者，仍依原入住日適用前條退費標準。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">三、不可抗力與特殊事由</h2>
          <p className="mt-3">
            因天災（颱風、地震等）、疫情、政府命令或其他不可歸責於雙方之事由，致無法依約入住者，
            旅客得選擇全額退費或延期入住，不收取任何手續費。
            如因民宿因素（房間毀損、超賣等）無法提供住宿，將全額退費並協助安排替代住宿。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">四、退款管道與時程</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              申請方式：請以 Email（{COMPANY.email}）提出，
              並提供訂房人姓名、訂單編號（或入住日期）以利核對。
            </li>
            <li>退款方式：依原付款管道原路退回；信用卡付款採退刷方式退還至原扣款卡片。</li>
            <li>退款時程：確認受理後 7–14 個工作天內完成退款作業；實際入帳時間依各發卡銀行作業為準。</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
