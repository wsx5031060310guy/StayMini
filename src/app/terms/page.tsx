import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "服務條款 · 山海間民宿",
  description: "山海間民宿線上訂房服務條款：訂房流程、付款與金流、入住規則、取消退訂與個人資料保護說明。",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold sm:text-4xl">服務條款</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        最後更新日期：2026 年 6 月 12 日。使用本網站訂房服務前，請詳閱以下條款；完成訂房請求即視為同意本條款。
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-stone-ink">一、營運者資訊</h2>
          <p className="mt-3">
            本網站（{siteConfig.name}訂房網站）由 {COMPANY.legalName} 營運。
          </p>
          <ul className="mt-3 space-y-1">
            <li>公司名稱：{COMPANY.name}</li>
            <li>統一編號：{COMPANY.taxId}</li>
            <li>登記地址：{COMPANY.address}</li>
            <li>聯絡電話：{COMPANY.phone}</li>
            <li>客服 Email：{COMPANY.email}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">二、服務內容與訂房流程</h2>
          <p className="mt-3">
            本網站提供民宿房型介紹與線上訂房服務。各房型之售價（每晚房價，新臺幣計價）均公開標示於首頁、
            <Link href="/rooms" className="text-primary underline underline-offset-2">房型列表</Link>
            與各房型介紹頁。訂房流程如下：
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>瀏覽房型與公告房價，選擇欲入住之房型與日期。</li>
            <li>
              填寫
              <Link href="/inquiry" className="text-primary underline underline-offset-2">訂房請求</Link>
              （姓名、聯絡方式、入住與退房日期、人數）並送出。
            </li>
            <li>我們會在收到請求後 24 小時內，以 LINE、電話或 Email 回覆確認是否仍有空房。</li>
            <li>空房確認後，依回覆通知所載之金額與付款指示完成付款，訂房即告成立。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">三、付款與金流</h2>
          <p className="mt-3">
            本網站之線上付款透過「藍新金流 NewebPay」第三方金流服務處理，可使用信用卡等藍新金流支援之付款方式。
            付款過程於藍新金流之安全交易頁面完成，本網站不會儲存您的完整信用卡卡號。
            實際應付金額以訂房確認通知所載為準；如有早鳥、連住或其他優惠，亦以確認通知為準。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">四、入住規則</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>入住（check-in）與退房（check-out）時間依各房型頁與訂房確認通知公告為準。</li>
            <li>每房入住人數以各房型公告之人數上限為準，超過人數請事先告知並經同意。</li>
            <li>全館禁菸；如有寵物同行或其他特殊需求，請於訂房請求中註明並經確認。</li>
            <li>住客應善盡善良管理人注意義務使用房間與設備，如有毀損應照價賠償。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">五、取消與退訂</h2>
          <p className="mt-3">
            訂房之取消、變更與退費標準，詳見
            <Link href="/refund" className="text-primary underline underline-offset-2">取消與退訂政策</Link>。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">六、個人資料保護</h2>
          <p className="mt-3">
            我們依個人資料保護法蒐集、處理及利用您的個人資料，詳見
            <Link href="/privacy" className="text-primary underline underline-offset-2">隱私權政策</Link>。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">七、免責聲明</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>因天災、停電、網路中斷、系統維護或其他不可抗力因素致服務暫停或中斷，本網站不負損害賠償責任，但將盡速回復服務。</li>
            <li>網站內容（含照片、文字）僅供參考，實際房況以現場為準；如有重大差異，您得依取消與退訂政策辦理退費。</li>
            <li>住客於住宿期間之個人財物請自行妥善保管。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">八、準據法與管轄</h2>
          <p className="mt-3">
            本條款之解釋與適用，以中華民國法律為準據法。因本條款所生之爭議，雙方同意先誠信協商；
            協商不成時，以本公司所在地之地方法院為第一審管轄法院，但消費者保護法等法律另有規定者，從其規定。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">九、聯絡方式</h2>
          <p className="mt-3">對本條款或訂房服務有任何疑問，歡迎透過下列方式聯絡客服：</p>
          <ul className="mt-3 space-y-1">
            <li>Email：{COMPANY.email}</li>
            <li>電話：{COMPANY.phone}</li>
            <li>LINE：{COMPANY.lineId}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
