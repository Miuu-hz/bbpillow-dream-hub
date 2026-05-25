// Web screens: Home, Shop, PDP, Cart, Checkout
// Globally exported via window.BBWeb

const { I, BBLogo, Btn, Stars, Badge, ProductCard, SectionHd, QtyStep, Field, EmptyArt } = window.BBUI;
const { useState: useStateW, useEffect: useEffectW, useMemo: useMemoW, useRef: useRefW } = React;

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function Home({ lang, nav, addToCart, density, b2b }) {
  const best = window.BB.products.filter(p => p.badges && p.badges.includes('best-seller')).slice(0, 4);
  const all = window.BB.products;

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: density === 'compact' ? '48px 20px 40px' : '72px 20px 60px',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(circle at 70% 40%, rgba(58,110,165,.06) 0%, transparent 55%), radial-gradient(circle at 8% 80%, rgba(192,108,83,.07) 0%, transparent 45%)',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.95fr)', gap: 40, alignItems: 'center' }}
          className="bb-hero-grid">
          <div>
            <div style={{
              fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500,
              letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--clay)',
              marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 18, height: 1, background: 'var(--clay)' }}/>
              {window.BB.t('heroEyebrow', lang)}
            </div>
            <h1 style={{
              fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 600,
              color: 'var(--soil)', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.08,
              textWrap: 'balance',
            }}>
              {lang === 'th' ? (
                <>นอนหลับมีคุณภาพ<br/>
                <em style={{ fontStyle: 'normal', color: 'var(--sky)', fontWeight: 500 }}>ในราคาตลาดนัด</em></>
              ) : (
                <>Quality sleep at<br/>
                <em style={{ fontStyle: 'normal', color: 'var(--sky)', fontWeight: 500 }}>flea-market prices.</em></>
              )}
            </h1>
            <p style={{
              fontFamily: '"Sarabun", sans-serif', fontSize: 16.5, color: 'rgba(62,42,30,.7)',
              margin: '20px 0 28px', maxWidth: 520, lineHeight: 1.55, textWrap: 'pretty',
            }}>{window.BB.t('heroSub', lang)}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn kind={b2b ? 'sky' : 'primary'} size="lg" onClick={() => nav('shop')}>
                {window.BB.t('shopNow', lang)}
              </Btn>
              <Btn kind="outline" size="lg" onClick={() => nav('wholesale')}>
                {window.BB.t('bulkInquiry', lang)}
              </Btn>
            </div>
            <div style={{ display: 'flex', gap: 0, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
              <Stat n="22M฿" l={window.BB.t('statRevenue', lang)}/>
              <div style={{ width: 1, height: 36, background: 'rgba(62,42,30,.13)', margin: '0 24px' }}/>
              <Stat n="100K+" l={window.BB.t('statCustomers', lang)}/>
              <div style={{ width: 1, height: 36, background: 'rgba(62,42,30,.13)', margin: '0 24px' }}/>
              <Stat n="4.8★" l={window.BB.t('statReviews', lang)}/>
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: 360 }}>
            <HeroComposition />
          </div>
        </div>
        {/* faint horizon line */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'rgba(62,42,30,.08)' }}/>
      </section>

      {/* Why us — value props */}
      <section style={{ padding: '48px 20px', borderBottom: '1px solid rgba(62,42,30,.06)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <ValueProp icon={<I.truck/>} t={window.BB.t('vpShipTitle', lang)} s={window.BB.t('vpShipSub', lang)}/>
          <ValueProp icon={<I.shield/>} t={window.BB.t('vpWarrantyTitle', lang)} s={window.BB.t('vpWarrantySub', lang)}/>
          <ValueProp icon={<I.refresh/>} t={window.BB.t('vpReturnTitle', lang)} s={window.BB.t('vpReturnSub', lang)}/>
          <ValueProp icon={<I.leaf/>} t={window.BB.t('vpBrandTitle', lang)} s={window.BB.t('vpBrandSub', lang)}/>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: density === 'compact' ? '40px 20px' : '64px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <SectionHd
            eyebrow={window.BB.t('shopByCategory', lang)}
            title={window.BB.t('categories', lang)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
            {window.BB.categories.filter(c => c.id !== 'all').map((c, i) => (
              <CategoryTile key={c.id} cat={c} lang={lang} idx={i} onClick={() => nav('shop', { cat: c.id })}/>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section style={{ padding: density === 'compact' ? '24px 20px 40px' : '40px 20px 64px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <SectionHd
            eyebrow={window.BB.t('customerFavorites', lang)}
            title={window.BB.t('bestsellers', lang)}
            sub={window.BB.t('topSellersMonth', lang)}
            action={
              <button onClick={() => nav('shop')} style={{
                appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
                fontFamily: '"Prompt", sans-serif', fontSize: 14, color: 'var(--sky)', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>{window.BB.t('viewAll', lang)} <I.chevR/></button>
            }
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
            {(best.length ? best : all.slice(0, 4)).map(p => (
              <ProductCard key={p.id} p={p} lang={lang} onClick={() => nav('pdp', { id: p.id })} onAdd={addToCart}/>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story snippet */}
      <section style={{ padding: '64px 20px', background: 'var(--soil)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}
          className="bb-hero-grid">
          <div style={{
            aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', position: 'relative',
            background: '#5C4533',
          }}>
            <img src="./assets/ที่นอนอนุบาล70_110/1.png"
              alt="คุณศศิพร ผู้ก่อตั้ง BBpillow" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.78 }}/>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 30%, rgba(62,42,30,.5) 100%)',
            }}/>
            <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.7, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                {window.BB.t('founderLabel', lang)}
              </div>
              <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 20, fontWeight: 500, marginTop: 4 }}>
                {window.BB.t('founderName', lang)}
              </div>
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500,
              letterSpacing: '.08em', textTransform: 'uppercase', color: '#D9A07C', marginBottom: 14,
            }}>{window.BB.t('rinenLabel', lang)}</div>
            <h2 style={{
              fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400,
              margin: 0, lineHeight: 1.15, letterSpacing: '-0.01em',
            }}>
              {window.BB.t('storyTitle', lang)}
            </h2>
            <p style={{
              fontFamily: '"Sarabun", sans-serif', fontSize: 15.5, lineHeight: 1.65, opacity: 0.82,
              marginTop: 18, maxWidth: 540,
            }}>
              {window.BB.t('storyBody', lang)}
            </p>
            <div style={{ marginTop: 24 }}>
              <Btn kind="outline" size="md" style={{ color: 'var(--paper)', borderColor: 'rgba(247,245,240,.5)' }}
                onClick={() => nav('story')}>
                {window.BB.t('readStory', lang)} <I.chevR/>
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* B2B strip — emphasized if b2b mode */}
      {b2b && (
        <section style={{ padding: '40px 20px', background: 'rgba(192,108,83,.08)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <Badge kind="clay">B2B</Badge>
              <h3 style={{
                fontFamily: '"Prompt", sans-serif', fontSize: 24, fontWeight: 500,
                color: 'var(--soil)', margin: '10px 0 4px',
              }}>{window.BB.t('b2bTitle', lang)}</h3>
              <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'rgba(62,42,30,.7)', margin: 0 }}>
                {window.BB.t('b2bSub', lang)}
              </p>
            </div>
            <Btn kind="primary" onClick={() => nav('wholesale')}>{window.BB.t('requestQuote', lang)} <I.chevR/></Btn>
          </div>
        </section>
      )}

      {/* LINE newsletter */}
      <section style={{ padding: '64px 20px', background: 'linear-gradient(150deg, #EEE9DE 0%, #E4DCCE 50%, #D8CEBC 100%)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
            background: '#06C755', color: '#fff', borderRadius: 999, fontSize: 12, fontWeight: 500,
            fontFamily: '"Sarabun", sans-serif',
          }}><I.line/> LINE Official</div>
          <h2 style={{
            fontFamily: '"Prompt", sans-serif', fontSize: 28, fontWeight: 500,
            color: 'var(--soil)', margin: '14px 0 8px', letterSpacing: '-0.01em',
          }}>{window.BB.t('newsletter', lang)}</h2>
          <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'rgba(62,42,30,.65)', margin: '0 0 22px' }}>
            {window.BB.t('linePromo', lang)}
          </p>
          <Btn kind="line" size="lg"><I.line/> {window.BB.t('lineAddFriend', lang)}</Btn>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 28, fontWeight: 600, color: 'var(--soil)', letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'rgba(62,42,30,.55)', marginTop: 5 }}>{l}</div>
    </div>
  );
}

function ValueProp({ icon, t, s }) {
  return (
    <div
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(62,42,30,.07)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(62,42,30,.04)'; }}
      style={{
        display: 'flex', gap: 16, alignItems: 'flex-start',
        padding: '22px 20px', background: '#fff', borderRadius: 18,
        border: '1px solid rgba(62,42,30,.07)',
        boxShadow: '0 2px 8px rgba(62,42,30,.04)',
        transition: 'transform .2s, box-shadow .2s',
      }}>
      <div style={{
        width: 46, height: 46, borderRadius: 14, flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(58,110,165,.12), rgba(58,110,165,.05))',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--sky)',
      }}>{icon}</div>
      <div>
        <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 15, fontWeight: 500, color: 'var(--soil)' }}>{t}</div>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.6)', marginTop: 3, lineHeight: 1.4 }}>{s}</div>
      </div>
    </div>
  );
}

function CategoryTile({ cat, lang, idx, onClick }) {
  const imgs = {
    pillow: { src: './assets/หมอนบอดี้/IMG_2991.JPG', alt: { th: 'หมอนบอดี้', en: 'Body Pillow' } },
    mattress: { src: './assets/ที่นอนTopper3.5/IMG_2971.JPG', alt: { th: 'ที่นอน', en: 'Mattress' } },
    topper: { src: './assets/ที่นอนปิกนิก3.5/IMG_2979.JPG', alt: { th: 'ที่นอนปิกนิก', en: 'Picnic Mattress' } },
    sheet: { src: './assets/ชุดผ้าปู/IMG_2995.JPG', alt: { th: 'ชุดผ้าปูที่นอน', en: 'Sheet Set' } },
    blanket: { src: './assets/ผ้านวม5/IMG_2985.JPG', alt: { th: 'ผ้านวม', en: 'Comforter Blanket' } },
  };
  return (
    <button onClick={onClick}
      onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.07)'; }}
      onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
      style={{ appearance: 'none', border: 0, padding: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
      <div style={{
        aspectRatio: '3/4', borderRadius: 18, overflow: 'hidden',
        position: 'relative', background: '#EDE8DC',
      }}>
        <img src={imgs[cat.id]} alt={lang === 'th' ? cat.th : cat.en} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform .45s cubic-bezier(.25,.46,.45,.94)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(20,10,4,.62) 100%)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          color: '#fff', fontFamily: '"Prompt", sans-serif', fontSize: 16, fontWeight: 500,
          letterSpacing: '-0.01em',
        }}>{lang === 'th' ? cat.th : cat.en}</div>
      </div>
    </button>
  );
}

// Hero composition — overlapping product images
function HeroComposition() {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxWidth: 520, marginLeft: 'auto' }}>
      <div style={{
        position: 'absolute', top: '4%', left: '8%', width: '64%', aspectRatio: '4/5',
        borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 30px 60px -20px rgba(62,42,30,.25)',
        background: '#EDE8DC',
      }}>
        <img src="./assets/ชุดผ้าปู/IMG_2995.JPG"
          alt="ชุดผ้าปูที่นอน Cotton-Touch BBpillow" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div style={{
        position: 'absolute', top: '34%', right: '2%', width: '46%', aspectRatio: '1',
        borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 20px 40px -16px rgba(62,42,30,.2)',
        background: '#EDE8DC',
      }}>
        <img src="./assets/ผ้านวม5/IMG_2985.JPG"
          alt="ผ้านวม 5 ฟุต นุ่มหนา BBpillow" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      <div style={{
        position: 'absolute', bottom: '4%', left: '2%', width: '40%', aspectRatio: '5/4',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 20px 40px -16px rgba(62,42,30,.2)',
        background: '#EDE8DC',
      }}>
        <img src="./assets/ที่นอนTopper3.5/IMG_2971.JPG"
          alt="ที่นอนท็อปเปอร์ Soft Lay 3.5 ฟุต BBpillow" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>
      {/* price tag */}
      <div style={{
        position: 'absolute', top: '8%', right: '0%',
        background: '#fff', borderRadius: 16, padding: '10px 14px',
        boxShadow: '0 8px 24px rgba(62,42,30,.12)',
        fontFamily: '"Prompt", sans-serif',
      }}>
        <div style={{ fontSize: 10.5, color: 'rgba(62,42,30,.55)', fontFamily: '"Sarabun", sans-serif', letterSpacing: '.04em' }}>เริ่มต้น</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--clay)', lineHeight: 1 }}>฿129</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SHOP
// ─────────────────────────────────────────────────────────────
function Shop({ lang, nav, addToCart, density, initial }) {
  const [cat, setCat] = useStateW(initial?.cat || 'all');
  const [mat, setMat] = useStateW([]);
  const [maxP, setMaxP] = useStateW(500);
  const [sortBy, setSortBy] = useStateW('popular');

  const filtered = useMemoW(() => {
    let list = window.BB.products.slice();
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (mat.length) list = list.filter(p => mat.includes(p.material));
    list = list.filter(p => p.price <= maxP);
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.sold - a.sold);
    return list;
  }, [cat, mat, maxP, sortBy]);

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 20px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'rgba(62,42,30,.55)', marginBottom: 8,
        }}>{window.BB.t('home', lang)} / {window.BB.t('shop', lang)}</div>
        <h1 style={{
          fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500,
          color: 'var(--soil)', margin: 0, letterSpacing: '-0.01em',
        }}>{window.BB.t('allProducts', lang)}</h1>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.6)', margin: '6px 0 0' }}>
          {filtered.length} {window.BB.t('itemsUnit', lang)}
        </p>
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 20,
        scrollbarWidth: 'none' }}>
        {window.BB.categories.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            appearance: 'none', border: '1px solid',
            borderColor: cat === c.id ? 'var(--soil)' : 'rgba(62,42,30,.15)',
            background: cat === c.id ? 'var(--soil)' : 'transparent',
            color: cat === c.id ? 'var(--paper)' : 'var(--soil)',
            padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
            fontFamily: '"Prompt", sans-serif', fontSize: 13.5, fontWeight: 500,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{lang === 'th' ? c.th : c.en}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0,1fr)', gap: 32 }} className="bb-shop-grid">
        {/* Filters */}
        <aside className="bb-filters" style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80 }}>
            <FilterBlock title={window.BB.t('material', lang)}>
              {window.BB.materials.map(m => (
                <label key={m.id} style={chkRow}>
                  <input type="checkbox" checked={mat.includes(m.id)} onChange={(e) => {
                    setMat(prev => e.target.checked ? [...prev, m.id] : prev.filter(x => x !== m.id));
                  }} style={chkInput}/>
                  <span>{lang === 'th' ? m.th : m.en}</span>
                </label>
              ))}
            </FilterBlock>
            <FilterBlock title={window.BB.t('price', lang)}>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'rgba(62,42,30,.7)', marginBottom: 8 }}>
                ฿0 – ฿{maxP}
              </div>
              <input type="range" min={100} max={500} step={50} value={maxP}
                onChange={(e) => setMaxP(+e.target.value)} style={{ width: '100%', accentColor: 'var(--clay)' }}/>
            </FilterBlock>
            <FilterBlock title={window.BB.t('sort', lang)}>
              {[
                { id: 'popular', th: 'ขายดี', en: 'Popular' },
                { id: 'price-asc', th: 'ราคาต่ำ→สูง', en: 'Price low to high' },
                { id: 'price-desc', th: 'ราคาสูง→ต่ำ', en: 'Price high to low' },
                { id: 'rating', th: 'คะแนนสูงสุด', en: 'Highest rated' },
              ].map(s => (
                <label key={s.id} style={chkRow}>
                  <input type="radio" name="sort" checked={sortBy === s.id} onChange={() => setSortBy(s.id)}
                    style={{ ...chkInput, borderRadius: '50%' }}/>
                  <span>{lang === 'th' ? s.th : s.en}</span>
                </label>
              ))}
            </FilterBlock>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} p={p} lang={lang}
                onClick={() => nav('pdp', { id: p.id })}
                onAdd={addToCart}/>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60 }}>
                <EmptyArt/>
                <p style={{ fontFamily: '"Sarabun", sans-serif', color: 'rgba(62,42,30,.55)', marginTop: 12 }}>
                  {window.BB.t('noProductsFilter', lang)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }) {
  return (
    <div>
      <h3 style={{
        fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 600,
        letterSpacing: '.06em', textTransform: 'uppercase',
        color: 'var(--soil)', margin: '0 0 12px',
      }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}
const chkRow = {
  display: 'flex', alignItems: 'center', gap: 10,
  fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'var(--soil)', cursor: 'pointer',
};
const chkInput = {
  appearance: 'none', width: 16, height: 16, borderRadius: 4,
  border: '1.5px solid rgba(62,42,30,.3)', cursor: 'pointer', position: 'relative',
  background: '#fff', accentColor: 'var(--clay)',
};

// ─────────────────────────────────────────────────────────────
// PDP
// ─────────────────────────────────────────────────────────────
function PDP({ lang, nav, addToCart, route }) {
  const p = window.BB.products.find(x => x.id === route.id) || window.BB.products[0];
  const [qty, setQty] = useStateW(1);
  const [activeImg, setActiveImg] = useStateW(0);
  const name = lang === 'th' ? p.th : p.en;
  const off = Math.round(((p.compare - p.price) / p.compare) * 100);
  const gallery = p.gallery || [p.img, p.img, p.img, p.img];

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 20px 64px' }}>
      <div style={{
        fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'rgba(62,42,30,.55)', marginBottom: 20,
      }}>
        <a onClick={(e) => { e.preventDefault(); nav('home'); }} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{window.BB.t('home', lang)}</a> / <a onClick={(e) => { e.preventDefault(); nav('shop'); }} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{window.BB.t('shop', lang)}</a> / <span style={{ color: 'var(--soil)' }}>{name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.85fr)', gap: 48 }} className="bb-hero-grid">
        <div>
          <div style={{
            aspectRatio: '1', borderRadius: 20, overflow: 'hidden', background: '#EDE8DC', marginBottom: 12,
          }}>
            <img src={gallery[activeImg]} alt={name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .2s' }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {gallery.slice(0, 4).map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{
                aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#EDE8DC',
                cursor: 'pointer',
                border: i === activeImg ? '2px solid var(--clay)' : '2px solid transparent',
                opacity: i === activeImg ? 1 : 0.65,
                transition: 'opacity .15s, border-color .15s',
              }}>
                <img src={img} alt={`${name} รูปที่ ${i+1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <Badge kind="clay">-{off}%</Badge>
            {p.badges && p.badges.includes('best-seller') && <Badge kind="sage">{window.BB.t('bestSeller', lang)}</Badge>}
          </div>
          <h1 style={{
            fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 500,
            color: 'var(--soil)', margin: '0 0 12px', letterSpacing: '-0.01em', lineHeight: 1.2,
          }}>{name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Stars rating={p.rating}/>
            <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'rgba(62,42,30,.6)' }}>
              {p.rating} · {p.reviews} {window.BB.t('reviewsUnit', lang)} · {window.BB.t('soldLabel', lang)} {p.sold.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 40, fontWeight: 600, color: 'var(--clay)', lineHeight: 1 }}>
              {window.BB.fmtBaht(p.price)}
            </span>
            <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 16, color: 'rgba(62,42,30,.4)', textDecoration: 'line-through' }}>
              {window.BB.fmtBaht(p.compare)}
            </span>
          </div>

          <p style={{
            fontFamily: '"Sarabun", sans-serif', fontSize: 15, lineHeight: 1.65, color: 'rgba(62,42,30,.75)',
            margin: '0 0 24px', padding: '16px 18px', background: 'rgba(58,110,165,.05)', borderRadius: 14,
            borderLeft: '3px solid var(--sky)',
          }}>{lang === 'th' ? p.desc_th : p.desc_en}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <Specs label={window.BB.t('materialLabel', lang)} value={
              window.BB.materials.find(m => m.id === p.material) ? (lang === 'th' ? window.BB.materials.find(m => m.id === p.material).th : window.BB.materials.find(m => m.id === p.material).en) : p.material
            }/>
            <Specs label="SKU" value={p.sku}/>
            <Specs label={window.BB.t('stockLabel', lang)} value={window.BB.t('inStock', lang)} accent/>
            <Specs label={window.BB.t('shippingLabel', lang)} value={window.BB.t('shippingDays', lang)}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'rgba(62,42,30,.7)' }}>
              {window.BB.t('quantityLabel', lang)}
            </span>
            <QtyStep value={qty} onChange={setQty}/>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <Btn kind="outline" size="lg" full onClick={() => { addToCart(p, qty); }}>
              <I.cart/> {window.BB.t('addToCart', lang)}
            </Btn>
            <Btn kind="primary" size="lg" full onClick={() => { addToCart(p, qty); nav('cart'); }}>
              {window.BB.t('buyNow', lang)} <I.chevR/>
            </Btn>
          </div>

          <div style={{ display: 'flex', gap: 16, padding: '14px 16px', background: '#fff', borderRadius: 14,
            border: '1px solid rgba(62,42,30,.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--soil)' }}>
              <I.truck/>
              <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13 }}>{window.BB.t('freeShip', lang)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section style={{ marginTop: 64 }}>
        <SectionHd title={window.BB.t('customerReviews', lang)}
          eyebrow={`${p.rating}★ · ${p.reviews} reviews`}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {window.BB.reviews.map(r => (
            <div key={r.id} style={{
              background: '#fff', borderRadius: 16, padding: 18,
              border: '1px solid rgba(62,42,30,.06)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontWeight: 500, color: 'var(--soil)' }}>{r.user}</div>
                <Stars rating={r.stars}/>
              </div>
              <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, lineHeight: 1.55, color: 'rgba(62,42,30,.75)', margin: '0 0 8px' }}>
                {lang === 'th' ? r.th : r.en}
              </p>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.45)' }}>{r.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Specs({ label, value, accent }) {
  return (
    <div style={{ padding: '10px 14px', background: '#fff', borderRadius: 12, border: '1px solid rgba(62,42,30,.06)' }}>
      <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500, color: accent ? '#5d6a3f' : 'var(--soil)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────────────────────
function Cart({ lang, nav, cart, updateQty, removeFromCart }) {
  const items = cart.map(c => ({ ...c, p: window.BB.products.find(p => p.id === c.id) })).filter(x => x.p);
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <EmptyArt size={160}/>
        <h1 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 24, fontWeight: 500, color: 'var(--soil)', margin: '20px 0 8px' }}>
          {window.BB.t('empty', lang)}
        </h1>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.6)', margin: '0 0 24px' }}>
          {window.BB.t('cartEmptySub', lang)}
        </p>
        <Btn kind="primary" size="lg" onClick={() => nav('shop')}>{window.BB.t('continue', lang)}</Btn>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 20px 64px' }}>
      <h1 style={{
        fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500,
        color: 'var(--soil)', margin: '0 0 24px', letterSpacing: '-0.01em',
      }}>{window.BB.t('yourCart', lang)} <span style={{ color: 'rgba(62,42,30,.4)', fontWeight: 400 }}>({items.length})</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 32 }} className="bb-cart-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(({ p, qty }) => (
            <div key={p.id} style={{
              display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 16,
              background: '#fff', borderRadius: 16, padding: 14,
              border: '1px solid rgba(62,42,30,.06)',
            }}>
              <div style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden', background: '#EDE8DC' }}>
                <img src={p.img} alt={lang === 'th' ? p.th : p.en} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                <div>
                  <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'var(--soil)', fontWeight: 500, lineHeight: 1.4 }}>
                    {lang === 'th' ? p.th : p.en}
                  </div>
                  <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.5)', marginTop: 2 }}>{p.sku}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                  <QtyStep value={qty} onChange={(v) => updateQty(p.id, v)}/>
                  <button aria-label={window.BB.t('removeItem', lang)} onClick={() => removeFromCart(p.id)} style={{
                    appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
                    color: 'rgba(62,42,30,.5)', display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontFamily: '"Sarabun", sans-serif', fontSize: 12.5,
                  }}><I.trash/></button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 600, color: 'var(--clay)' }}>
                  {window.BB.fmtBaht(p.price * qty)}
                </div>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.5)', marginTop: 2 }}>
                  ฿{p.price} × {qty}
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div style={{
            background: '#fff', borderRadius: 18, padding: 22,
            border: '1px solid rgba(62,42,30,.06)', position: 'sticky', top: 90,
          }}>
            <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--soil)', margin: '0 0 14px' }}>
              {window.BB.t('orderSummary', lang)}
            </h3>
            <SumRow l={window.BB.t('subtotal', lang)} v={window.BB.fmtBaht(subtotal)}/>
            <SumRow l={window.BB.t('shipping', lang)} v={shipping === 0 ? window.BB.t('free', lang) : window.BB.fmtBaht(shipping)} accent={shipping === 0}/>
            <div style={{ borderTop: '1px solid rgba(62,42,30,.1)', margin: '12px 0' }}/>
            <SumRow l={window.BB.t('total', lang)} v={window.BB.fmtBaht(total)} big/>
            <div style={{ marginTop: 16 }}>
              <Btn kind="primary" size="lg" full onClick={() => nav('checkout')}>{window.BB.t('checkout', lang)} <I.chevR/></Btn>
            </div>
            <button onClick={() => nav('shop')} style={{
              marginTop: 12, width: '100%', appearance: 'none', border: 0, background: 'transparent',
              fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'var(--sky)', cursor: 'pointer',
            }}>{window.BB.t('continue', lang)}</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SumRow({ l, v, big, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0' }}>
      <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: big ? 15 : 13.5, color: big ? 'var(--soil)' : 'rgba(62,42,30,.7)', fontWeight: big ? 500 : 400 }}>{l}</span>
      <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: big ? 22 : 14, fontWeight: big ? 600 : 500, color: big ? 'var(--clay)' : accent ? '#5d6a3f' : 'var(--soil)' }}>{v}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHECKOUT
// ─────────────────────────────────────────────────────────────
function Checkout({ lang, nav, cart, clearCart }) {
  const [step, setStep] = useStateW(1);
  const [form, setForm] = useStateW({
    name: '', phone: '', address: '', city: '', zip: '', payment: 'cod', notes: '',
  });
  const items = cart.map(c => ({ ...c, p: window.BB.products.find(p => p.id === c.id) })).filter(x => x.p);
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px 20px 80px' }}>
      <h1 style={{
        fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 500,
        color: 'var(--soil)', margin: '0 0 8px', letterSpacing: '-0.01em',
      }}>{window.BB.t('checkout', lang)}</h1>

      {/* Stepper */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {[
          { n: 1, t: window.BB.t('stepShipping', lang) },
          { n: 2, t: window.BB.t('stepPayment', lang) },
          { n: 3, t: window.BB.t('stepConfirm', lang) },
        ].map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: step >= s.n ? 'var(--clay)' : 'rgba(62,42,30,.1)',
              color: step >= s.n ? '#fff' : 'rgba(62,42,30,.5)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 600,
            }}>{step > s.n ? <I.check width={14} height={14}/> : s.n}</div>
            <span style={{
              fontFamily: '"Sarabun", sans-serif', fontSize: 13.5,
              color: step >= s.n ? 'var(--soil)' : 'rgba(62,42,30,.5)',
              fontWeight: step === s.n ? 500 : 400,
            }}>{s.t}</span>
            {i < 2 && <div style={{ flex: 1, height: 1, background: 'rgba(62,42,30,.1)' }}/>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 32 }} className="bb-cart-grid">
        <div style={{ background: '#fff', borderRadius: 18, padding: 24, border: '1px solid rgba(62,42,30,.06)' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 500, color: 'var(--soil)', margin: '0 0 4px' }}>
                {window.BB.t('deliveryAddress', lang)}
              </h3>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                background: 'rgba(6,199,85,.08)', borderRadius: 10, marginBottom: 4,
              }}>
                <I.line style={{ color: '#06C755' }}/>
                <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13, color: 'var(--soil)' }}>
                  {window.BB.t('lineAutofill', lang)}
                </span>
              </div>
              <Field label={window.BB.t('fullName', lang)} value={form.name} onChange={(v) => update('name', v)} required/>
              <Field label={window.BB.t('phone', lang)} value={form.phone} onChange={(v) => update('phone', v)} placeholder="08x-xxx-xxxx" required/>
              <Field label={window.BB.t('address', lang)} value={form.address} onChange={(v) => update('address', v)} multiline rows={3} required/>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <Field label={window.BB.t('cityDistrict', lang)} value={form.city} onChange={(v) => update('city', v)} required/>
                <Field label={window.BB.t('zipCode', lang)} value={form.zip} onChange={(v) => update('zip', v)} required/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <Btn kind="primary" onClick={() => setStep(2)}>{window.BB.t('next', lang)} <I.chevR/></Btn>
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 500, color: 'var(--soil)', margin: '0 0 4px' }}>
                {window.BB.t('paymentMethod', lang)}
              </h3>
              {[
                { id: 'cod', th: 'เก็บเงินปลายทาง (COD)', en: 'Cash on delivery' },
                { id: 'promptpay', th: 'พร้อมเพย์ / QR', en: 'PromptPay / QR' },
                { id: 'card', th: 'บัตรเครดิต/เดบิต', en: 'Credit/Debit card' },
                { id: 'line', th: 'LINE Pay', en: 'LINE Pay' },
              ].map(o => (
                <label key={o.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                  borderRadius: 12, border: '1px solid',
                  borderColor: form.payment === o.id ? 'var(--clay)' : 'rgba(62,42,30,.12)',
                  background: form.payment === o.id ? 'rgba(192,108,83,.05)' : '#fff', cursor: 'pointer',
                }}>
                  <input type="radio" name="pay" checked={form.payment === o.id}
                    onChange={() => update('payment', o.id)} style={{ accentColor: 'var(--clay)' }}/>
                  <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'var(--soil)', flex: 1 }}>{lang === 'th' ? o.th : o.en}</span>
                  {o.id === 'line' && <span style={{ background: '#06C755', color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontFamily: '"Prompt", sans-serif' }}>+5% pts</span>}
                </label>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <Btn kind="ghost" onClick={() => setStep(1)}><I.chevL/> {window.BB.t('back', lang)}</Btn>
                <Btn kind="primary" onClick={() => setStep(3)}>{window.BB.t('review', lang)} <I.chevR/></Btn>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 500, color: 'var(--soil)', margin: 0 }}>
                {window.BB.t('confirmOrder', lang)}
              </h3>
              <div style={{ padding: '14px 16px', background: 'rgba(58,110,165,.05)', borderRadius: 12 }}>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {window.BB.t('shipTo', lang)}
                </div>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'var(--soil)', lineHeight: 1.5 }}>
                  <strong>{form.name || window.BB.t('notFilled', lang)}</strong><br/>
                  {form.address} {form.city} {form.zip}<br/>
                  {form.phone}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {window.BB.t('itemsLabel', lang)}
                </div>
                {items.map(({ p, qty }) => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(62,42,30,.06)' }}>
                    <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'var(--soil)' }}>
                      {(lang === 'th' ? p.th : p.en)} <span style={{ color: 'rgba(62,42,30,.5)' }}>× {qty}</span>
                    </span>
                    <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500, color: 'var(--soil)' }}>
                      {window.BB.fmtBaht(p.price * qty)}
                    </span>
                  </div>
                ))}
              </div>
              <Field label={window.BB.t('orderNotes', lang)} value={form.notes} onChange={(v) => update('notes', v)} multiline rows={2}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <Btn kind="ghost" onClick={() => setStep(2)}><I.chevL/> {window.BB.t('back', lang)}</Btn>
                <Btn kind="primary" size="lg" onClick={() => { clearCart(); setStep(4); }}>
                  {window.BB.t('placeOrder', lang)} <I.check/>
                </Btn>
              </div>
            </div>
          )}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', background: 'rgba(120,135,90,.15)', color: '#5d6a3f',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
              }}><I.check width={36} height={36} strokeWidth={2.5}/></div>
              <h2 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 26, fontWeight: 500, color: 'var(--soil)', margin: '0 0 8px' }}>
                {window.BB.t('thankYou', lang)}
              </h2>
              <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'rgba(62,42,30,.65)', margin: '0 0 6px' }}>
                {window.BB.t('orderNumber', lang)}: <strong style={{ color: 'var(--soil)' }}>#BB-{Date.now().toString().slice(-6)}</strong>
              </p>
              <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'rgba(62,42,30,.55)', margin: '0 0 24px' }}>
                {window.BB.t('trackingInfo', lang)}
              </p>
              <Btn kind="primary" onClick={() => nav('dashboard')}>{window.BB.t('viewOrder', lang)} <I.chevR/></Btn>
            </div>
          )}
        </div>

        {step < 4 && (
          <aside>
            <div style={{
              background: '#fff', borderRadius: 18, padding: 22,
              border: '1px solid rgba(62,42,30,.06)', position: 'sticky', top: 90,
            }}>
              <h3 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--soil)', margin: '0 0 14px' }}>
                {window.BB.t('checkoutSummary', lang)}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                {items.map(({ p, qty }) => (
                  <div key={p.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background: '#EDE8DC', flexShrink: 0 }}>
                      <img src={p.img} alt={lang === 'th' ? p.th : p.en} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'var(--soil)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lang === 'th' ? p.th : p.en}</div>
                      <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.5)' }}>× {qty}</div>
                    </div>
                    <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--soil)' }}>{window.BB.fmtBaht(p.price * qty)}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(62,42,30,.08)', paddingTop: 10 }}>
                <SumRow l={window.BB.t('subtotal', lang)} v={window.BB.fmtBaht(subtotal)}/>
                <SumRow l={window.BB.t('shipping', lang)} v={shipping === 0 ? window.BB.t('free', lang) : window.BB.fmtBaht(shipping)} accent={shipping === 0}/>
                <div style={{ borderTop: '1px solid rgba(62,42,30,.1)', margin: '8px 0' }}/>
                <SumRow l={window.BB.t('total', lang)} v={window.BB.fmtBaht(total)} big/>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { BBWeb: { Home, Shop, PDP, Cart, Checkout } });
