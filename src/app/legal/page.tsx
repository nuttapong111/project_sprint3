'use client';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">กฎหมาย</h1>
          <p className="text-gray-400 mt-2">นโยบายและเงื่อนไขการใช้งานของแพลตฟอร์ม</p>
        </div>

        <section id="privacy" className="mb-10">
          <h2 className="text-2xl font-bold mb-3">นโยบายความเป็นส่วนตัว</h2>
          <p className="text-gray-300">เราเก็บและใช้ข้อมูลส่วนบุคคลตามหลัก PDPA เพื่อวัตถุประสงค์ในการให้บริการเท่านั้น</p>
        </section>

        <section id="terms" className="mb-10">
          <h2 className="text-2xl font-bold mb-3">เงื่อนไขการใช้งาน</h2>
          <p className="text-gray-300">การใช้งานแพลตฟอร์มนี้ถือว่าผู้ใช้ยอมรับเงื่อนไขทั้งหมดที่กำหนดไว้</p>
        </section>

        <section id="cookies" className="mb-10">
          <h2 className="text-2xl font-bold mb-3">นโยบายคุกกี้</h2>
          <p className="text-gray-300">เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ใช้งานและการวิเคราะห์การใช้งานเว็บไซต์</p>
        </section>

        <section id="accessibility" className="mb-10">
          <h2 className="text-2xl font-bold mb-3">ข้อกำหนดการเข้าถึง</h2>
          <p className="text-gray-300">เราออกแบบให้สอดคล้องกับแนวทาง WCAG เพื่อให้ทุกคนเข้าถึงได้</p>
        </section>
      </div>
    </div>
  );
}


