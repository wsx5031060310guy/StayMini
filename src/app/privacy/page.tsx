import { COMPANY } from "@/lib/company";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "隱私權政策 · 山海間民宿",
  description: "山海間民宿訂房網站隱私權政策：個人資料蒐集目的、類別、利用範圍、當事人權利與資料安全維護說明。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-semibold sm:text-4xl">隱私權政策</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        最後更新日期：2026 年 6 月 12 日。本政策依個人資料保護法第 8 條規定，向您告知下列事項。
      </p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-stone-ink">一、蒐集機關（者）</h2>
          <p className="mt-3">
            本網站（{siteConfig.name}訂房網站）之個人資料蒐集者為 {COMPANY.legalName}（統一編號：{COMPANY.taxId}）。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">二、蒐集之目的</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>處理訂房請求、確認空房與訂房相關聯繫。</li>
            <li>提供住宿服務及入住相關安排（接送、加床、餐食等）。</li>
            <li>收款、退款、開立憑證等帳務與金流處理。</li>
            <li>客戶服務、爭議處理與法令遵循。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">三、蒐集之個人資料類別</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>識別與聯絡資料：姓名、電話、Email、LINE 帳號（如您主動提供）。</li>
            <li>入住資訊：入住與退房日期、入住人數、房型、特殊需求備註。</li>
            <li>交易紀錄：訂單編號、付款金額、付款狀態（信用卡卡號等支付資料由藍新金流處理，本網站不儲存完整卡號）。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">四、利用期間、地區、對象及方式</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>期間：自蒐集時起至蒐集目的消失，或法令要求之保存年限屆滿為止。</li>
            <li>地區：中華民國境內，及本網站所使用雲端服務商之伺服器所在地。</li>
            <li>
              對象：本公司及為完成上開目的所必要之協力廠商，包括金流服務商（藍新金流 NewebPay）、
              雲端主機與電子郵件服務商；除法令要求外，不會提供予其他第三人。
            </li>
            <li>方式：以自動化機器或其他非自動化方式，於上開目的範圍內蒐集、處理及利用。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">五、當事人權利</h2>
          <p className="mt-3">依個人資料保護法第 3 條，您就您的個人資料得行使下列權利：</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>查詢或請求閱覽。</li>
            <li>請求製給複製本。</li>
            <li>請求補充或更正。</li>
            <li>請求停止蒐集、處理或利用。</li>
            <li>請求刪除。</li>
          </ul>
          <p className="mt-3">
            行使上述權利，請以 Email（{COMPANY.email}）聯絡我們，
            我們將於法定期限內處理。您得自由選擇是否提供個人資料；惟若不提供訂房所必要之資料，將無法完成訂房服務。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">六、Cookie 之使用</h2>
          <p className="mt-3">
            本網站可能使用 Cookie 及類似技術以維持網站基本運作與改善瀏覽體驗。
            您可透過瀏覽器設定拒絕或刪除 Cookie，惟部分功能可能因此無法正常運作。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">七、資料安全維護</h2>
          <p className="mt-3">
            我們採取與個人資料保護相當之資通安全措施（包括傳輸加密、存取權限控管）保護您的個人資料，
            防止資料被竊取、竄改、毀損、滅失或洩漏。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-ink">八、政策修訂</h2>
          <p className="mt-3">
            本政策將因應法令或服務調整不定期修訂，修訂後將公布於本頁面並更新「最後更新日期」。
            如有疑問，歡迎來信 {COMPANY.email} 洽詢。
          </p>
        </section>
      </div>
    </div>
  );
}
