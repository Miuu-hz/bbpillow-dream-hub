// Wholesale, Story, Dashboard screens
// Globally exported via window.BBWeb2

const { I, BBLogo, Btn, Stars, Badge, ProductCard, SectionHd, QtyStep, Field, EmptyArt } = window.BBUI;
const { useState: useStateW2 } = React;

// ─────────────────────────────────────────────────────────────
// WHOLESALE
// ─────────────────────────────────────────────────────────────
function Wholesale({ lang, nav }) {
  const [form, setForm] = useStateW2({
    company: '', contact: '', email: '', phone: '',
    type: 'hotel', quantity: '100-500', products: [], message: '',
  });
  const [sent, setSent] = useStateW2(false);
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '60px 20px 48px', background: 'linear-gradient(180deg, rgba(58,110,165,.06), transparent)',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Badge kind="sky">B2B · Wholesale</Badge>
          <h1 style={{
            fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 500,
            color: 'var(--soil)', margin: '14px 0 14px', letterSpacing: '-0.02em', lineHeight: 1.1,
            maxWidth: 760,
          }}>
            {lang === 'th'
              ? 'พาร์ทเนอร์ค้าส่งสำหรับโรงแรม รีสอร์ท และผู้ค้าปลีก'
              : 'Wholesale partner for hotels, resorts & retailers.'}
          </h1>
          <p style={{
            fontFamily: '"Sarabun", sans-serif', fontSize: 16.5, color: 'rgba(62,42,30,.7)',
            margin: 0, maxWidth: 620, lineHeight: 1.55,
          }}>
            {lang === 'th'
              ? 'ราคาขายส่งดีกว่าตลาด 30–50% มีระบบสต็อกแยก ส่งทันใจทั่วประเทศ'
              : '30–50% better than market wholesale, dedicated stock, nationwide delivery.'}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <SectionHd title={window.BB.t('bulkBenefits', lang)}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: <I.pkg/>, t: lang === 'th' ? 'ราคาขั้นบันได' : 'Tiered pricing',
                s: lang === 'th' ? 'ยิ่งสั่งเยอะ ยิ่งคุ้ม เริ่มจาก 100 ชิ้น' : 'Better rates from 100+ units' },
              { icon: <I.truck/>, t: lang === 'th' ? 'จัดส่งเฉพาะ' : 'Dedicated logistics',
                s: lang === 'th' ? 'รถส่งของเราเอง ตรงเวลา' : 'In-house fleet, on schedule' },
              { icon: <I.shield/>, t: lang === 'th' ? 'รับประกัน' : 'B2B warranty',
                s: lang === 'th' ? 'เปลี่ยนทดแทนภายใน 7 วัน' : '7-day replacement guarantee' },
              { icon: <I.gift/>, t: lang === 'th' ? 'พิมพ์โลโก้' : 'Custom branding',
                s: lang === 'th' ? 'สกรีนโลโก้แบรนด์คุณได้' : 'Print your logo on items' },
            ].map((b, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 22, border: '1px solid rgba(62,42,30,.06)' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: 'rgba(58,110,165,.08)', color: 'var(--sky)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                }}>{b.icon}</div>
                <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 16, fontWeight: 500, color: 'var(--soil)', margin: '0 0 6px' }}>{b.t}</h3>
                <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'rgba(62,42,30,.65)', margin: 0, lineHeight: 1.5 }}>{b.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section style={{ padding: '20px 20px 40px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <SectionHd title={lang === 'th' ? 'ราคาขายส่ง (ตัวอย่าง)' : 'Wholesale pricing (example)'}
            sub={lang === 'th' ? 'หมอนหนุน Cloud — ราคาปลีก ฿189' : 'Cloud Pillow — retail ฿189'}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { range: '50–99', price: 140, off: '26%' },
              { range: '100–499', price: 115, off: '39%', popular: true },
              { range: '500–999', price: 98, off: '48%' },
              { range: '1,000+', price: 85, off: '55%' },
            ].map((t, i) => (
              <div key={i} style={{
                background: t.popular ? 'var(--soil)' : '#fff',
                color: t.popular ? 'var(--paper)' : 'var(--soil)',
                borderRadius: 16, padding: 20, border: t.popular ? 'none' : '1px solid rgba(62,42,30,.08)',
                position: 'relative',
              }}>
                {t.popular && (
                  <div style={{ position: 'absolute', top: -10, right: 16 }}>
                    <Badge kind="clay">{lang === 'th' ? 'นิยม' : 'Popular'}</Badge>
                  </div>
                )}
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, opacity: t.popular ? 0.75 : 0.6, letterSpacing: '.04em' }}>
                  {lang === 'th' ? 'จำนวน' : 'Quantity'}
                </div>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 500, marginTop: 2 }}>{t.range}</div>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 32, fontWeight: 600, color: t.popular ? '#FFC7A4' : 'var(--clay)', marginTop: 14, letterSpacing: '-0.01em' }}>
                  ฿{t.price}<span style={{ fontSize: 13, fontWeight: 400, opacity: 0.8 }}>/{lang === 'th' ? 'ชิ้น' : 'unit'}</span>
                </div>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, opacity: 0.75, marginTop: 4 }}>
                  -{t.off} {lang === 'th' ? 'จากราคาปลีก' : 'from retail'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 32 }} className="bb-cart-grid">
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid rgba(62,42,30,.06)' }}>
            {!sent ? (
              <>
                <h2 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 26, fontWeight: 500, color: 'var(--soil)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                  {window.BB.t('requestQuote', lang)}
                </h2>
                <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.65)', margin: '0 0 22px' }}>
                  {lang === 'th' ? 'เราจะติดต่อกลับภายใน 24 ชั่วโมง' : 'We will respond within 24 hours.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Field label={lang === 'th' ? 'ชื่อบริษัท / องค์กร' : 'Company / organization'} value={form.company} onChange={(v) => u('company', v)} required/>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label={lang === 'th' ? 'ผู้ติดต่อ' : 'Contact name'} value={form.contact} onChange={(v) => u('contact', v)} required/>
                    <Field label="Email" type="email" value={form.email} onChange={(v) => u('email', v)} required/>
                  </div>
                  <Field label={lang === 'th' ? 'เบอร์โทร' : 'Phone'} value={form.phone} onChange={(v) => u('phone', v)} required/>
                  <div>
                    <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500, color: 'rgba(62,42,30,.7)', marginBottom: 6 }}>
                      {lang === 'th' ? 'ประเภทธุรกิจ' : 'Business type'} <span style={{ color: 'var(--clay)' }}>*</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[
                        { id: 'hotel', th: 'โรงแรม/รีสอร์ท', en: 'Hotel/Resort' },
                        { id: 'dorm', th: 'หอพัก/อพาร์ตเมนต์', en: 'Dorm/Apartment' },
                        { id: 'retail', th: 'ผู้ค้าปลีก', en: 'Retailer' },
                        { id: 'other', th: 'อื่น ๆ', en: 'Other' },
                      ].map(o => (
                        <button key={o.id} type="button" onClick={() => u('type', o.id)} style={{
                          appearance: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                          border: '1px solid', borderColor: form.type === o.id ? 'var(--clay)' : 'rgba(62,42,30,.15)',
                          background: form.type === o.id ? 'rgba(192,108,83,.08)' : '#fff',
                          color: form.type === o.id ? 'var(--clay)' : 'var(--soil)',
                          fontFamily: '"Prompt", sans-serif', fontSize: 13,
                        }}>{lang === 'th' ? o.th : o.en}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500, color: 'rgba(62,42,30,.7)', marginBottom: 6 }}>
                      {lang === 'th' ? 'จำนวนโดยประมาณ' : 'Estimated quantity'} <span style={{ color: 'var(--clay)' }}>*</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['50-99','100-499','500-999','1000+'].map(q => (
                        <button key={q} type="button" onClick={() => u('quantity', q)} style={{
                          appearance: 'none', padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                          border: '1px solid', borderColor: form.quantity === q ? 'var(--clay)' : 'rgba(62,42,30,.15)',
                          background: form.quantity === q ? 'rgba(192,108,83,.08)' : '#fff',
                          color: form.quantity === q ? 'var(--clay)' : 'var(--soil)',
                          fontFamily: '"Prompt", sans-serif', fontSize: 13,
                        }}>{q}</button>
                      ))}
                    </div>
                  </div>
                  <Field label={lang === 'th' ? 'รายละเอียดเพิ่มเติม' : 'Additional details'} value={form.message} onChange={(v) => u('message', v)} multiline rows={4}
                    placeholder={lang === 'th' ? 'สินค้าที่สนใจ, ข้อกำหนดพิเศษ, ระยะเวลาส่งมอบ ...' : 'Products of interest, special requirements, timeline...'}/>
                  <div style={{ marginTop: 8 }}>
                    <Btn kind="primary" size="lg" onClick={() => setSent(true)}>
                      {window.BB.t('requestQuote', lang)} <I.chevR/>
                    </Btn>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'rgba(120,135,90,.15)', color: '#5d6a3f',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}><I.check width={32} height={32} strokeWidth={2.5}/></div>
                <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 500, color: 'var(--soil)', margin: '0 0 8px' }}>
                  {lang === 'th' ? 'ได้รับคำขอแล้ว ขอบคุณ!' : 'Request received. Thanks!'}
                </h3>
                <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.65)', margin: '0 0 20px' }}>
                  {lang === 'th' ? 'ทีมขาย B2B จะติดต่อกลับภายใน 24 ชม.' : 'B2B team will reach out within 24 hours.'}
                </p>
                <Btn kind="outline" onClick={() => setSent(false)}>{lang === 'th' ? 'ส่งคำขอใหม่' : 'Send another'}</Btn>
              </div>
            )}
          </div>

          <aside>
            <div style={{ background: 'var(--soil)', color: 'var(--paper)', borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 16, fontWeight: 500, margin: 0 }}>
                {window.BB.t('downloadCatalog', lang)}
              </h3>
              <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, opacity: 0.7, margin: '6px 0 18px' }}>
                {lang === 'th' ? 'PDF · 24 หน้า · อัปเดตล่าสุด พ.ย. 2569' : 'PDF · 24 pages · Updated Nov 2026'}
              </p>
              <Btn kind="outline" full style={{ color: 'var(--paper)', borderColor: 'rgba(247,245,240,.4)' }}>
                <I.pkg/> {lang === 'th' ? 'ดาวน์โหลด PDF' : 'Download PDF'}
              </Btn>
            </div>
            <div style={{ background: '#fff', borderRadius: 18, padding: 22, marginTop: 14, border: '1px solid rgba(62,42,30,.06)' }}>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 8 }}>
                {lang === 'th' ? 'ติดต่อตรง' : 'Direct contact'}
              </div>
              <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 15, color: 'var(--soil)', fontWeight: 500 }}>คุณบี · Sales Lead</div>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'var(--sky)', marginTop: 4 }}>091-8033688 · b2b@bbpillow.co.th</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <Btn kind="line" size="sm" full><I.line/> LINE</Btn>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OUR STORY
// ─────────────────────────────────────────────────────────────
function Story({ lang, nav }) {
  return (
    <div style={{ paddingBottom: 80 }}>
      <section style={{ padding: '60px 20px 40px', maxWidth: 760, margin: '0 auto' }}>
        <div style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500,
          letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 14,
        }}>{lang === 'th' ? 'เรื่องราว' : 'Our story'}</div>
        <h1 style={{
          fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500,
          color: 'var(--soil)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, textWrap: 'balance',
        }}>
          {lang === 'th'
            ? 'แบรนด์ 100 ปี ที่เริ่มจากเงิน 5,000 บาทสุดท้าย'
            : 'A 100-year brand that began with a final 5,000 baht.'}
        </h1>
      </section>

      <section style={{ padding: '0 20px' }}>
        <div style={{
          maxWidth: 1080, margin: '0 auto',
          aspectRatio: '16/8', borderRadius: 24, overflow: 'hidden', background: '#5C4533', position: 'relative',
        }}>
          <img src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1600&auto=format&fit=crop&q=70"
            alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
      </section>

      <section style={{ padding: '48px 20px', maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 17, lineHeight: 1.7, color: 'rgba(62,42,30,.82)', margin: '0 0 24px' }}>
          {lang === 'th'
            ? 'BBpillow ก่อตั้งโดยคุณศศิพร ในวันที่เงินในมือเหลือเพียง 5,000 บาท เธอเลือกขายเครื่องนอน — ของจำเป็นที่ไม่หมดอายุ ไม่ต้องลด ไม่ต้องดัมพ์ราคา'
            : 'BBpillow was founded by Khun Sasiporn on the day she had only 5,000 baht left. She chose bedding — essential goods that never expire, never need to be discounted, never need to be dumped.'}
        </p>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 17, lineHeight: 1.7, color: 'rgba(62,42,30,.82)', margin: '0 0 24px' }}>
          {lang === 'th'
            ? 'จากแผงเล็ก ๆ ที่ตลาดนัด สู่ธุรกิจ 22 ล้านบาทต่อปี ด้วยปรัชญาญี่ปุ่นที่เรียกว่า "รินเน็น" — การสร้างแบรนด์ที่ยั่งยืน 100 ปี'
            : 'From a tiny flea-market stall to a 22-million-baht business — guided by the Japanese philosophy of "Rinen": building a brand that lasts a hundred years.'}
        </p>

        {/* Pull quote */}
        <blockquote style={{
          margin: '32px 0', padding: '24px 28px', background: 'rgba(58,110,165,.06)', borderRadius: 16,
          borderLeft: '3px solid var(--sky)',
        }}>
          <p style={{
            fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 400,
            color: 'var(--soil)', margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em', textWrap: 'balance',
          }}>
            "{lang === 'th'
              ? 'ทุกบ้านควรได้นอนบนเครื่องนอนคุณภาพห้างฯ โดยไม่ต้องลังเลที่จะใช้ทุกวัน'
              : 'Every home should sleep on department-store quality bedding — without hesitation, every single night.'}"
          </p>
          <footer style={{ marginTop: 14, fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.6)' }}>
            — {lang === 'th' ? 'คุณศศิพร, ผู้ก่อตั้ง' : 'Khun Sasiporn, founder'}
          </footer>
        </blockquote>

        <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 500, color: 'var(--soil)', margin: '32px 0 14px', letterSpacing: '-0.01em' }}>
          {lang === 'th' ? 'รินเน็น — ปรัชญา 100 ปี' : 'Rinen — the 100-year philosophy'}
        </h3>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 16, lineHeight: 1.7, color: 'rgba(62,42,30,.78)', margin: 0 }}>
          {lang === 'th'
            ? 'เราไม่ต้องการเป็นแบรนด์ที่ดังในวันเดียว เราต้องการเป็นแบรนด์ที่ลูกของลูกท่านยังเชื่อใจ เครื่องนอนทุกชิ้นออกแบบมาเพื่อใช้งานจริงในชีวิตประจำวัน — ทำความสะอาดง่าย ทนทาน ราคาที่ไม่ต้องคิดมาก'
            : 'We are not chasing overnight fame. We are building a brand your grandchildren will still trust. Every piece is designed for real, daily use — easy to clean, durable, and priced so cost is never a worry.'}
        </p>
      </section>

      {/* Timeline */}
      <section style={{ padding: '40px 20px', maxWidth: 980, margin: '0 auto' }}>
        <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 500, color: 'var(--soil)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          {lang === 'th' ? 'เส้นทาง' : 'Milestones'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { y: '2015', th: 'เริ่มต้นด้วยเงิน 5,000 บาทที่ตลาดนัด', en: 'Started at a flea market with 5,000 baht' },
            { y: '2018', th: 'เปิดโรงงานผลิตเอง · 50 พนักงาน', en: 'Opened own factory · 50 employees' },
            { y: '2022', th: 'ขายส่งให้โรงแรม 200+ แห่งทั่วประเทศ', en: 'Wholesale to 200+ hotels nationwide' },
            { y: '2024', th: 'ยอดขายแตะ 22 ล้านบาท/ปี', en: '22M THB annual revenue' },
            { y: '2026', th: 'เปิดตัว LINE Mini-App สำหรับ B2C', en: 'Launching LINE Mini-App for B2C' },
          ].map((m, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr', gap: 18, alignItems: 'baseline',
              padding: '14px 0', borderBottom: '1px solid rgba(62,42,30,.06)',
            }}>
              <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 22, fontWeight: 500, color: 'var(--clay)' }}>{m.y}</div>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 15, color: 'var(--soil)', lineHeight: 1.5 }}>{lang === 'th' ? m.th : m.en}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────
function Dashboard({ lang, nav }) {
  const [tab, setTab] = useStateW2('orders');
  const points = 480;
  const tier = lang === 'th' ? 'สมาชิก Soft' : 'Soft tier';

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 20px 64px' }}>
      <div style={{
        background: 'var(--soil)', color: 'var(--paper)', borderRadius: 20, padding: 24,
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center',
      }} className="bb-dash-hero">
        <div>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, opacity: 0.7 }}>
            {lang === 'th' ? 'สวัสดี' : 'Hi there,'}
          </div>
          <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 26, fontWeight: 500, marginTop: 2, letterSpacing: '-0.01em' }}>
            {lang === 'th' ? 'คุณภัทรา · ' : 'Patra · '}<span style={{ opacity: 0.7, fontSize: 16, fontWeight: 400 }}>{tier}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <I.line style={{ color: '#06C755' }}/>
            <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, opacity: 0.7 }}>
              {lang === 'th' ? 'เชื่อมต่อกับ LINE แล้ว' : 'Connected via LINE'}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.7, letterSpacing: '.06em', textTransform: 'uppercase' }}>
            {window.BB.t('loyaltyPoints', lang)}
          </div>
          <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 40, fontWeight: 600, color: '#FFC7A4', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {points}
          </div>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.7, marginTop: 4 }}>
            {lang === 'th' ? 'อีก 120 แต้มถึงทอง' : '120 to Gold'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, margin: '24px 0 16px', borderBottom: '1px solid rgba(62,42,30,.1)' }}>
        {[
          { id: 'orders', t: window.BB.t('myOrders', lang) },
          { id: 'points', t: lang === 'th' ? 'แต้ม & รางวัล' : 'Points & rewards' },
          { id: 'profile', t: window.BB.t('profile', lang) },
        ].map(x => (
          <button key={x.id} onClick={() => setTab(x.id)} style={{
            appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
            padding: '12px 6px', fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500,
            color: tab === x.id ? 'var(--soil)' : 'rgba(62,42,30,.5)',
            borderBottom: '2px solid', borderColor: tab === x.id ? 'var(--clay)' : 'transparent',
            marginBottom: -1,
          }}>{x.t}</button>
        ))}
      </div>

      {tab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { id: 'BB-204871', date: '14 พ.ย. 2026', status: 'shipped', total: 678, items: 3 },
            { id: 'BB-203455', date: '02 พ.ย. 2026', status: 'delivered', total: 290, items: 1 },
            { id: 'BB-201998', date: '21 ต.ค. 2026', status: 'delivered', total: 1230, items: 4 },
          ].map(o => (
            <div key={o.id} style={{
              background: '#fff', borderRadius: 16, padding: 18, border: '1px solid rgba(62,42,30,.06)',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 15, fontWeight: 500, color: 'var(--soil)' }}>#{o.id}</span>
                  {o.status === 'shipped' && <Badge kind="sky">{lang === 'th' ? 'จัดส่งแล้ว' : 'Shipped'}</Badge>}
                  {o.status === 'delivered' && <Badge kind="sage">{lang === 'th' ? 'ส่งสำเร็จ' : 'Delivered'}</Badge>}
                </div>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.6)' }}>
                  {o.date} · {o.items} {lang === 'th' ? 'ชิ้น' : 'items'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 18, fontWeight: 600, color: 'var(--clay)' }}>
                  {window.BB.fmtBaht(o.total)}
                </div>
                <button style={{
                  appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
                  fontFamily: '"Prompt", sans-serif', fontSize: 13, color: 'var(--sky)', marginTop: 4,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>{lang === 'th' ? 'ดูรายละเอียด' : 'View details'} <I.chevR/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'points' && (
        <div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid rgba(62,42,30,.06)', marginBottom: 14 }}>
            <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.6)' }}>
              {lang === 'th' ? 'ระดับสมาชิก' : 'Member tier'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 12 }}>
              <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500, color: 'var(--soil)' }}>Soft (480 pts)</span>
              <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.5)' }}>Gold (600 pts)</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'rgba(62,42,30,.08)', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, var(--clay), #E8A07C)' }}/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { pts: 100, th: 'ส่วนลด ฿50', en: '฿50 voucher' },
              { pts: 300, th: 'ปลอกหมอนฟรี', en: 'Free pillowcase' },
              { pts: 600, th: 'หมอน Cloud ฟรี', en: 'Free Cloud pillow' },
              { pts: 1000, th: 'ท็อปเปอร์ฟรี', en: 'Free topper' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 16, border: '1px solid rgba(62,42,30,.06)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, background: 'rgba(192,108,83,.1)', color: 'var(--clay)', fontFamily: '"Prompt", sans-serif', fontSize: 12, fontWeight: 500 }}>
                  <I.gift width={14} height={14}/> {r.pts} pts
                </div>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, color: 'var(--soil)', marginTop: 10, fontWeight: 500 }}>{lang === 'th' ? r.th : r.en}</div>
                <button disabled={points < r.pts} style={{
                  marginTop: 12, padding: '8px 14px', borderRadius: 999, border: '1px solid',
                  borderColor: points >= r.pts ? 'var(--clay)' : 'rgba(62,42,30,.15)',
                  background: points >= r.pts ? 'var(--clay)' : 'transparent',
                  color: points >= r.pts ? '#fff' : 'rgba(62,42,30,.4)',
                  fontFamily: '"Prompt", sans-serif', fontSize: 12.5, cursor: points >= r.pts ? 'pointer' : 'not-allowed',
                  width: '100%',
                }}>{points >= r.pts ? (lang === 'th' ? 'แลกเลย' : 'Redeem') : (lang === 'th' ? 'ยังไม่พอ' : 'Not enough')}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'profile' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 22, border: '1px solid rgba(62,42,30,.06)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label={lang === 'th' ? 'ชื่อ' : 'Name'} value="ภัทรา ศรีนวล" onChange={() => {}}/>
          <Field label="Email" value="patra.s@example.com" onChange={() => {}}/>
          <Field label={lang === 'th' ? 'เบอร์โทร' : 'Phone'} value="089-123-4567" onChange={() => {}}/>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn kind="primary">{lang === 'th' ? 'บันทึก' : 'Save changes'}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { BBWeb2: { Wholesale, Story, Dashboard } });
