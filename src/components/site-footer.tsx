export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-xl font-semibold">BB Pillow</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Made for a good dream. <br />
            หมอนคุณภาพห้างฯ ในราคาตลาดนัด
          </p>
        </div>
        <div>
          <h4 className="font-semibold">ติดต่อ / Contact</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Facebook: facebook.com/BBpillows</li>
            <li>Line: @bbpillow</li>
            <li>Email: hello@bbpillow.co.th</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">ขายส่ง / Wholesale</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            สนใจสั่งซื้อจำนวนมาก สำหรับโรงแรม รีสอร์ท หรือร้านค้าปลีก ติดต่อทีมขายของเราได้ทุกวัน
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BBpillow Thailand · Made in Thailand
      </div>
    </footer>
  );
}
