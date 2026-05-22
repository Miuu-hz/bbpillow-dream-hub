// LINE Mini-App screens (rendered inside an iOS phone frame)
// Globally exported via window.BBMini

const { I, Btn, Stars, Badge, QtyStep, Field, EmptyArt } = window.BBUI;
const { useState: useStateM } = React;

// Mini-app uses tighter spacing, integrated LINE chrome
const LINE_GREEN = '#06C755';

function MiniLineBar({ title, onBack, hasBack }) {
  // Mock of the LINE LIFF top chrome (generic header — not LINE's exact UI)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 14px 10px', background: '#fff',
      borderBottom: '1px solid rgba(62,42,30,.06)',
      fontFamily: '"Prompt", sans-serif',
    }}>
      <div style={{ width: 36, display: 'flex', justifyContent: 'flex-start' }}>
        {hasBack ? (
          <button onClick={onBack} style={{
            appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
            color: 'var(--soil)', padding: 4,
          }}><I.chevL/></button>
        ) : null}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--soil)' }}>{title}</div>
      <div style={{ width: 36, display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{
          appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
          color: 'rgba(62,42,30,.55)', padding: 4,
        }}><I.close/></button>
      </div>
    </div>
  );
}

function MiniHome({ lang, go, addToCart, points }) {
  const products = window.BB.products.slice(0, 6);
  const best = window.BB.products.filter(p => p.badges && p.badges.includes('best-seller'));

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Member card */}
      <div style={{ padding: '14px 14px 8px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--soil), #5C4533)', color: 'var(--paper)',
          borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(192,108,83,.2)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11, opacity: 0.7, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              {lang === 'th' ? 'สวัสดี ภัทรา' : 'Hi Patra'}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 28, fontWeight: 600, color: '#FFC7A4', letterSpacing: '-0.01em' }}>{points}</span>
              <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.75 }}>{lang === 'th' ? 'แต้ม Soft' : 'pts · Soft'}</span>
            </div>
            <div style={{
              marginTop: 10, height: 5, borderRadius: 999, background: 'rgba(255,255,255,.15)', overflow: 'hidden',
            }}>
              <div style={{ width: '80%', height: '100%', background: '#FFC7A4' }}/>
            </div>
            <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11, opacity: 0.7, marginTop: 6 }}>
              {lang === 'th' ? 'อีก 120 แต้มถึงทอง' : '120 pts to Gold'}
            </div>
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <div style={{ padding: '6px 14px 10px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
          background: '#06C755', color: '#fff', borderRadius: 12,
        }}>
          <I.gift/>
          <div style={{ flex: 1, fontFamily: '"Sarabun", sans-serif', fontSize: 13 }}>
            <strong style={{ fontFamily: '"Prompt", sans-serif', fontWeight: 600 }}>
              {lang === 'th' ? 'LINE-only:' : 'LINE-only:'}
            </strong>{' '}
            {lang === 'th' ? 'รับ 2x แต้ม ทุกคำสั่งซื้อวันนี้' : '2× points on all orders today'}
          </div>
          <I.chevR/>
        </div>
      </div>

      {/* Quick categories */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, padding: '8px 14px 16px',
      }}>
        {window.BB.categories.filter(c => c.id !== 'all').map(c => (
          <button key={c.id} onClick={() => go({ screen: 'shop', cat: c.id })} style={{
            appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 2px',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: 'rgba(58,110,165,.08)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sky)',
              fontFamily: '"Prompt", sans-serif', fontSize: 18, fontWeight: 600,
            }}>{(lang === 'th' ? c.th : c.en).slice(0, 1)}</div>
            <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 10.5, color: 'var(--soil)', textAlign: 'center', lineHeight: 1.2 }}>{lang === 'th' ? c.th : c.en}</div>
          </button>
        ))}
      </div>

      {/* Best sellers */}
      <MiniSection title={window.BB.t('bestsellers', lang)} action={lang === 'th' ? 'ดูทั้งหมด' : 'See all'} onAction={() => go({ screen: 'shop' })}/>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 14px 16px', scrollbarWidth: 'none' }}>
        {best.map(p => (
          <MiniMiniCard key={p.id} p={p} lang={lang} onClick={() => go({ screen: 'pdp', id: p.id })}/>
        ))}
      </div>

      {/* Grid */}
      <MiniSection title={lang === 'th' ? 'แนะนำสำหรับคุณ' : 'For you'}/>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px',
      }}>
        {products.map(p => (
          <MiniCard key={p.id} p={p} lang={lang} onClick={() => go({ screen: 'pdp', id: p.id })} onAdd={addToCart}/>
        ))}
      </div>
    </div>
  );
}

function MiniSection({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 14px 8px' }}>
      <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--soil)', margin: 0, letterSpacing: '-0.005em' }}>{title}</h3>
      {action && <button onClick={onAction} style={{
        appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
        fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'var(--sky)',
      }}>{action}</button>}
    </div>
  );
}

function MiniMiniCard({ p, lang, onClick }) {
  return (
    <button onClick={onClick} style={{
      appearance: 'none', border: 0, background: 'transparent', padding: 0, cursor: 'pointer',
      flexShrink: 0, width: 140, textAlign: 'left',
    }}>
      <div style={{
        aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#EDE8DC', marginBottom: 6,
      }}>
        <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'var(--soil)', lineHeight: 1.3,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {lang === 'th' ? p.th : p.en}
      </div>
      <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--clay)', marginTop: 2 }}>
        {window.BB.fmtBaht(p.price)}
      </div>
    </button>
  );
}

function MiniCard({ p, lang, onClick, onAdd }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      border: '1px solid rgba(62,42,30,.06)',
    }}>
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#EDE8DC', position: 'relative' }}>
        <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <button onClick={(e) => { e.stopPropagation(); onAdd(p); }} style={{
          position: 'absolute', bottom: 6, right: 6,
          width: 30, height: 30, borderRadius: '50%', border: 0, cursor: 'pointer',
          background: 'var(--clay)', color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(192,108,83,.3)',
        }}><I.plus/></button>
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'var(--soil)', lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 31 }}>
          {lang === 'th' ? p.th : p.en}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
          <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--clay)' }}>{window.BB.fmtBaht(p.price)}</span>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 10.5, color: 'rgba(62,42,30,.4)', textDecoration: 'line-through' }}>{window.BB.fmtBaht(p.compare)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
          <I.star width={10} height={10} style={{ color: '#E9A93B' }}/>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 10.5, color: 'rgba(62,42,30,.55)' }}>{p.rating} ({p.reviews})</span>
        </div>
      </div>
    </div>
  );
}

// PDP
function MiniPDP({ lang, route, go, addToCart }) {
  const p = window.BB.products.find(x => x.id === route.id) || window.BB.products[0];
  const [qty, setQty] = useStateM(1);
  const name = lang === 'th' ? p.th : p.en;
  const off = Math.round(((p.compare - p.price) / p.compare) * 100);

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ aspectRatio: '1', background: '#EDE8DC', position: 'relative' }}>
        <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <Badge kind="clay">-{off}%</Badge>
          {p.badges && p.badges.includes('best-seller') && <Badge kind="paper">{lang === 'th' ? 'ขายดี' : 'Best'}</Badge>}
        </div>
      </div>
      <div style={{ padding: '14px 14px 0' }}>
        <h2 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 18, fontWeight: 500, color: 'var(--soil)', margin: '0 0 6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Stars rating={p.rating} size={12}/>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.6)' }}>{p.rating} · {p.reviews} {lang === 'th' ? 'รีวิว' : 'reviews'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 28, fontWeight: 600, color: 'var(--clay)', letterSpacing: '-0.01em' }}>{window.BB.fmtBaht(p.price)}</span>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.4)', textDecoration: 'line-through' }}>{window.BB.fmtBaht(p.compare)}</span>
        </div>
        <p style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, lineHeight: 1.55, color: 'rgba(62,42,30,.78)',
          padding: '10px 12px', background: 'rgba(58,110,165,.05)', borderRadius: 10, borderLeft: '3px solid var(--sky)',
          margin: 0,
        }}>{lang === 'th' ? p.desc_th : p.desc_en}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 12 }}>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.7)' }}>{lang === 'th' ? 'จำนวน' : 'Quantity'}</span>
          <QtyStep value={qty} onChange={setQty}/>
        </div>

        {/* Earn points */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
          background: 'rgba(192,108,83,.08)', borderRadius: 10, marginBottom: 10,
        }}>
          <I.gift width={16} height={16} style={{ color: 'var(--clay)' }}/>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'var(--soil)' }}>
            {lang === 'th' ? `รับ ${Math.floor(p.price / 10) * 2} แต้ม (2× LINE)` : `Earn ${Math.floor(p.price / 10) * 2} pts (2× LINE)`}
          </span>
        </div>
      </div>

      {/* Bottom sticky action */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', padding: '10px 14px 30px',
        borderTop: '1px solid rgba(62,42,30,.06)',
        display: 'flex', gap: 8,
      }}>
        <button onClick={() => { addToCart(p, qty); }} style={{
          appearance: 'none', border: '1px solid rgba(62,42,30,.2)', background: '#fff',
          padding: '12px 16px', borderRadius: 999, cursor: 'pointer',
          color: 'var(--soil)', fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}><I.cart width={16} height={16}/> {lang === 'th' ? 'ตะกร้า' : 'Cart'}</button>
        <button onClick={() => { addToCart(p, qty); go({ screen: 'cart' }); }} style={{
          appearance: 'none', border: 0, background: 'var(--clay)', color: '#fff',
          padding: '12px 16px', borderRadius: 999, cursor: 'pointer',
          fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500, flex: 1,
        }}>{window.BB.t('buyNow', lang)} · {window.BB.fmtBaht(p.price * qty)}</button>
      </div>
    </div>
  );
}

// Cart
function MiniCart({ lang, cart, updateQty, removeFromCart, go }) {
  const items = cart.map(c => ({ ...c, p: window.BB.products.find(p => p.id === c.id) })).filter(x => x.p);
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <EmptyArt size={120}/>
        <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 500, color: 'var(--soil)', margin: '16px 0 6px' }}>{window.BB.t('empty', lang)}</h3>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.55)', margin: '0 0 18px' }}>
          {lang === 'th' ? 'เลือกซื้อสินค้าได้เลย' : 'Start shopping now'}
        </p>
        <Btn kind="primary" onClick={() => go({ screen: 'home' })}>{window.BB.t('continue', lang)}</Btn>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(({ p, qty }) => (
          <div key={p.id} style={{
            display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 10, padding: 10,
            background: '#fff', borderRadius: 12, border: '1px solid rgba(62,42,30,.06)',
          }}>
            <div style={{ aspectRatio: '1', borderRadius: 8, overflow: 'hidden', background: '#EDE8DC' }}>
              <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'var(--soil)', lineHeight: 1.3,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {lang === 'th' ? p.th : p.en}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <QtyStep value={qty} onChange={(v) => updateQty(p.id, v)}/>
                <button onClick={() => removeFromCart(p.id)} style={{
                  appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
                  color: 'rgba(62,42,30,.4)',
                }}><I.trash width={16} height={16}/></button>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--clay)' }}>{window.BB.fmtBaht(p.price * qty)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom sticky */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', padding: '12px 14px 30px',
        borderTop: '1px solid rgba(62,42,30,.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.6)' }}>{window.BB.t('subtotal', lang)}</span>
          <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13, color: 'var(--soil)' }}>{window.BB.fmtBaht(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.6)' }}>{window.BB.t('shipping', lang)}</span>
          <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13, color: shipping === 0 ? '#5d6a3f' : 'var(--soil)' }}>
            {shipping === 0 ? window.BB.t('free', lang) : window.BB.fmtBaht(shipping)}
          </span>
        </div>
        <button onClick={() => go({ screen: 'checkout' })} style={{
          appearance: 'none', border: 0, background: '#06C755', color: '#fff', cursor: 'pointer',
          padding: '14px 16px', borderRadius: 999, width: '100%',
          fontFamily: '"Prompt", sans-serif', fontSize: 14.5, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <I.line/> {lang === 'th' ? 'ชำระด้วย LINE Pay' : 'Pay with LINE Pay'} · {window.BB.fmtBaht(total)}
        </button>
      </div>
    </div>
  );
}

// Mini-app checkout (simpler)
function MiniCheckout({ lang, cart, clearCart, go }) {
  const [done, setDone] = useStateM(false);
  const items = cart.map(c => ({ ...c, p: window.BB.products.find(p => p.id === c.id) })).filter(x => x.p);
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;
  const pointsEarn = Math.floor(total / 10) * 2;

  if (done) {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'rgba(120,135,90,.15)', color: '#5d6a3f',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px',
        }}><I.check width={36} height={36} strokeWidth={2.5}/></div>
        <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 20, fontWeight: 500, color: 'var(--soil)', margin: '0 0 6px' }}>
          {lang === 'th' ? 'ชำระเงินสำเร็จ' : 'Payment successful'}
        </h3>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.6)', margin: '0 0 6px' }}>
          {lang === 'th' ? 'หมายเลข' : 'Order'} #BB-{Date.now().toString().slice(-6)}
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(192,108,83,.1)', color: 'var(--clay)', borderRadius: 999, fontFamily: '"Prompt", sans-serif', fontSize: 13, marginBottom: 22 }}>
          <I.gift width={14} height={14}/> {lang === 'th' ? 'ได้รับ' : 'Earned'} +{pointsEarn} pts
        </div>
        <div>
          <Btn kind="primary" onClick={() => go({ screen: 'home' })}>{lang === 'th' ? 'กลับหน้าแรก' : 'Back to home'}</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid rgba(62,42,30,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <I.line style={{ color: '#06C755' }}/>
            <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--soil)' }}>
              {lang === 'th' ? 'ที่อยู่จาก LINE Profile' : 'Address from LINE Profile'}
            </span>
          </div>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.75)', lineHeight: 1.5 }}>
            ภัทรา ศรีนวล · 089-123-4567<br/>
            123/45 ซ.สุขุมวิท 24, คลองตัน, วัฒนา, กรุงเทพฯ 10110
          </div>
          <button style={{
            appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
            fontFamily: '"Prompt", sans-serif', fontSize: 12, color: 'var(--sky)', marginTop: 8, padding: 0,
          }}>{lang === 'th' ? 'แก้ไข' : 'Edit'}</button>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid rgba(62,42,30,.06)' }}>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 8 }}>
            {lang === 'th' ? 'รายการ' : 'Items'} ({items.length})
          </div>
          {items.map(({ p, qty }) => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: '"Sarabun", sans-serif', fontSize: 12.5 }}>
              <span style={{ color: 'var(--soil)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{(lang === 'th' ? p.th : p.en)} × {qty}</span>
              <span style={{ color: 'var(--soil)', fontFamily: '"Prompt", sans-serif', fontWeight: 500 }}>{window.BB.fmtBaht(p.price * qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(62,42,30,.06)', marginTop: 8, paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.65)' }}>
              <span>{window.BB.t('subtotal', lang)}</span><span>{window.BB.fmtBaht(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.65)', marginTop: 2 }}>
              <span>{window.BB.t('shipping', lang)}</span>
              <span style={{ color: shipping === 0 ? '#5d6a3f' : 'inherit' }}>{shipping === 0 ? window.BB.t('free', lang) : window.BB.fmtBaht(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '1px dashed rgba(62,42,30,.1)' }}>
              <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--soil)' }}>{window.BB.t('total', lang)}</span>
              <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 18, fontWeight: 600, color: 'var(--clay)' }}>{window.BB.fmtBaht(total)}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid rgba(62,42,30,.06)' }}>
          <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 10 }}>
            {lang === 'th' ? 'ชำระด้วย' : 'Pay with'}
          </div>
          <label style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            background: 'rgba(6,199,85,.06)', border: '1px solid #06C755', borderRadius: 10,
          }}>
            <input type="radio" checked readOnly style={{ accentColor: '#06C755' }}/>
            <I.line style={{ color: '#06C755' }}/>
            <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13.5, color: 'var(--soil)', fontWeight: 500, flex: 1 }}>LINE Pay</span>
            <Badge kind="sage">+5%</Badge>
          </label>
          <label style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            background: '#fff', border: '1px solid rgba(62,42,30,.12)', borderRadius: 10, marginTop: 6,
          }}>
            <input type="radio" readOnly/>
            <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13.5, color: 'var(--soil)', flex: 1 }}>{lang === 'th' ? 'พร้อมเพย์' : 'PromptPay'}</span>
          </label>
          <label style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            background: '#fff', border: '1px solid rgba(62,42,30,.12)', borderRadius: 10, marginTop: 6,
          }}>
            <input type="radio" readOnly/>
            <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13.5, color: 'var(--soil)', flex: 1 }}>{lang === 'th' ? 'เก็บเงินปลายทาง' : 'Cash on delivery'}</span>
          </label>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
          background: 'rgba(192,108,83,.08)', borderRadius: 10,
        }}>
          <I.gift style={{ color: 'var(--clay)' }}/>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'var(--soil)' }}>
            {lang === 'th' ? `จะได้รับ ${pointsEarn} แต้ม` : `You will earn ${pointsEarn} points`}
          </span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', padding: '12px 14px 30px',
        borderTop: '1px solid rgba(62,42,30,.06)',
      }}>
        <button onClick={() => { clearCart(); setDone(true); }} style={{
          appearance: 'none', border: 0, background: '#06C755', color: '#fff', cursor: 'pointer',
          padding: '14px 16px', borderRadius: 999, width: '100%',
          fontFamily: '"Prompt", sans-serif', fontSize: 14.5, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <I.line/> {lang === 'th' ? 'ยืนยันชำระเงิน' : 'Confirm payment'} · {window.BB.fmtBaht(total)}
        </button>
      </div>
    </div>
  );
}

// Bottom tab bar
function MiniTabBar({ active, onTab, lang, cartCount }) {
  const tabs = [
    { id: 'home', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/></svg>, t: { th: 'หน้าแรก', en: 'Home' } },
    { id: 'shop', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4a4 4 0 018 0v2"/></svg>, t: { th: 'สินค้า', en: 'Shop' } },
    { id: 'cart', icon: <I.cart width={22} height={22}/>, t: { th: 'ตะกร้า', en: 'Cart' }, badge: cartCount },
    { id: 'me', icon: <I.user width={22} height={22}/>, t: { th: 'ฉัน', en: 'Me' } },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(62,42,30,.08)',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      paddingBottom: 24, paddingTop: 6, zIndex: 10,
    }}>
      {tabs.map(tb => (
        <button key={tb.id} onClick={() => onTab(tb.id)} style={{
          appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
          padding: '6px 4px', color: active === tb.id ? 'var(--clay)' : 'rgba(62,42,30,.5)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative',
        }}>
          <span style={{ position: 'relative' }}>
            {tb.icon}
            {tb.badge > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -8,
                minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999,
                background: 'var(--clay)', color: '#fff',
                fontFamily: '"Prompt", sans-serif', fontSize: 10, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{tb.badge}</span>
            )}
          </span>
          <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 10.5 }}>{lang === 'th' ? tb.t.th : tb.t.en}</span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { BBMini: { MiniHome, MiniPDP, MiniCart, MiniCheckout, MiniLineBar, MiniTabBar } });
