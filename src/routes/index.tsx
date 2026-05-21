import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/pillow-hero.jpg";
import singleImg from "@/assets/pillow-single.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BB Pillow — Made for a good dream | หมอน BBpillow" },
      {
        name: "description",
        content:
          "BBpillow หมอน ที่นอน ผ้าปูที่นอน คุณภาพระดับห้างสรรพสินค้า ในราคาเริ่มต้น 100 บาท ส่งตรงจากผู้ผลิตในประเทศไทย",
      },
    ],
  }),
});

const products = [
  { th: "หมอนหนุน", en: "Pillows", price: "100–250 ฿", desc: "นุ่ม ฟู คืนตัวดี ใยสังเคราะห์เกรดพรีเมียม" },
  { th: "ที่นอน", en: "Mattresses", price: "350–400 ฿", desc: "รองรับสรีระ ระบายอากาศ นอนสบายทุกคืน" },
  { th: "ผ้าปูที่นอน", en: "Bedsheets", price: "150–300 ฿", desc: "เนื้อผ้านุ่ม สีไม่ตก ซักง่าย แห้งไว" },
  { th: "ผ้าห่ม", en: "Blankets", price: "200–350 ฿", desc: "อบอุ่น เบาสบาย ไม่ระคายเคืองผิว" },
  { th: "ท็อปเปอร์", en: "Toppers", price: "300–400 ฿", desc: "เพิ่มความนุ่ม ยืดอายุที่นอนเดิมของคุณ" },
  { th: "ปลอกหมอน", en: "Pillow Cases", price: "100–180 ฿", desc: "ผ้าฝ้ายผสม สวมใส่ง่าย ดูแลง่าย" },
];

const features = [
  { icon: "✦", th: "ไม่ก่อภูมิแพ้", en: "Hypoallergenic" },
  { icon: "✦", th: "ซักได้", en: "Washable" },
  { icon: "✦", th: "ใยสังเคราะห์ 100%", en: "100% Polyester" },
  { icon: "✦", th: "คืนรูปได้ดี", en: "Refluffable" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-medium text-primary">
              Made for a good dream
            </span>
            <h1 className="mt-5 text-4xl leading-tight md:text-6xl">
              นอนหลับสบาย<br />
              <span className="text-primary">ในราคาที่สบายใจ</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              หมอน ที่นอน และเครื่องนอนคุณภาพห้างสรรพสินค้า ในราคาเริ่มต้น 100 บาท
              ผลิตในประเทศไทย เพื่อการพักผ่อนที่ดีของทุกคน
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                ดูสินค้าทั้งหมด
              </a>
              <a
                href="#wholesale"
                className="rounded-full border border-border bg-card px-7 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                สั่งซื้อขายส่ง / B2B
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div><span className="text-2xl font-semibold text-foreground">22M+</span><br />ยอดขายต่อปี (บาท)</div>
              <div><span className="text-2xl font-semibold text-foreground">100+</span><br />ปีของแบรนด์ในวิสัยทัศน์</div>
              <div><span className="text-2xl font-semibold text-foreground">100%</span><br />ผลิตในไทย</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" />
            <img
              src={heroImg}
              alt="หมอน BB Pillow คุณภาพดี"
              className="relative w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {features.map((f) => (
            <div key={f.en} className="text-center">
              <div className="text-2xl text-accent">{f.icon}</div>
              <div className="mt-2 font-medium">{f.th}</div>
              <div className="text-xs text-muted-foreground">{f.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-4xl">สินค้าของเรา / Our Products</h2>
          <p className="mt-3 text-muted-foreground">
            เครื่องนอนใยสังเคราะห์ครบทุกชิ้นสำหรับห้องนอนของคุณ ในราคา 100–400 บาท
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.en}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                <img
                  src={singleImg}
                  alt={p.en}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg">{p.th}</h3>
                  <p className="text-xs text-muted-foreground">{p.en}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
                  {p.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-5 md:px-8">
          <div className="md:col-span-2">
            <img
              src={heroImg}
              alt="เรื่องราวของ BB Pillow"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div className="md:col-span-3">
            <span className="text-sm font-medium uppercase tracking-wider text-accent">เรื่องราวของเรา</span>
            <h2 className="mt-2 text-3xl md:text-4xl">จาก 5,000 บาทสุดท้าย<br />สู่แบรนด์ 100 ปี</h2>
            <p className="mt-5 text-muted-foreground">
              คุณศศิพร เริ่มต้น BBpillow ด้วยเงินก้อนสุดท้าย 5,000 บาท ด้วยความเชื่อว่า “สินค้าจำเป็นที่ไม่มีวันหมดอายุ”
              จะสร้างชีวิตที่มั่นคงให้กับครอบครัวได้ วันนี้ BBpillow เติบโตเป็นธุรกิจที่มียอดขายกว่า 22 ล้านบาทต่อปี
            </p>
            <p className="mt-4 text-muted-foreground">
              เรายึดมั่นในปรัชญา <span className="font-medium text-foreground">Rinen</span> —
              สร้างแบรนด์ที่ยั่งยืน 100 ปี เพื่อมอบ <em>“การนอนหลับที่มีคุณภาพ และฝันดี”</em>
              ให้คนไทยทุกคน ในราคาที่ไม่ต้องลังเลที่จะใช้ทุกวัน
            </p>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="wholesale" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <div className="grid items-center gap-8 p-10 md:grid-cols-2 md:p-14">
            <div>
              <h2 className="text-3xl md:text-4xl">สำหรับธุรกิจ / Wholesale</h2>
              <p className="mt-4 text-primary-foreground/80">
                โรงแรม รีสอร์ท หอพัก หรือร้านค้าปลีก เรามีราคาพิเศษสำหรับการสั่งซื้อจำนวนมาก
                พร้อมบริการจัดส่งทั่วประเทศ
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="#contact"
                className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                ขอใบเสนอราคา
              </a>
              <a
                href="#contact"
                className="rounded-full border border-primary-foreground/30 px-7 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                ติดต่อทีมขาย
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
