// Main App: routing, cart, header/footer, mode toggle, tweaks
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;
const { I, BBLogo, Btn, Badge } = window.BBUI;
const { Home, Shop, PDP, Cart, Checkout } = window.BBWeb;
const { Wholesale, Story, Dashboard } = window.BBWeb2;
const { MiniHome, MiniPDP, MiniCart, MiniCheckout, MiniLineBar, MiniTabBar } = window.BBMini;

// EDITMODE tweak defaults (lives at file root for host to rewrite)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "default",
  "density": "comfy",
  "fontPair": "prompt-sarabun",
  "b2bEmphasis": false
}/*EDITMODE-END*/;

const PALETTES = {
  default: { paper: '#F7F5F0', soil: '#3E2A1E', sky: '#3A6EA5', clay: '#C06C53', name: { th: 'ดิน-ฟ้า', en: 'Earth & Sky' } },
  warm:    { paper: '#FBF6EE', soil: '#3D2415', sky: '#A8593B', clay: '#D67C42', name: { th: 'อบอุ่น', en: 'Warm' } },
  cool:    { paper: '#F4F4F0', soil: '#26323D', sky: '#2F7B8C', clay: '#5A8FA8', name: { th: 'เย็น', en: 'Cool' } },
  sage:    { paper: '#F4F3EC', soil: '#2D3826', sky: '#4F7A5E', clay: '#8B6F47', name: { th: 'ต้นไม้', en: 'Sage' } },
};

const FONT_PAIRS = {
  'prompt-sarabun': { heading: '"Prompt", sans-serif', body: '"Sarabun", sans-serif', name: 'Prompt + Sarabun' },
  'noto-ibm':      { heading: '"Noto Serif Thai", serif', body: '"IBM Plex Sans Thai", sans-serif', name: 'Noto Serif + IBM Plex' },
  'mitr-kanit':    { heading: '"Mitr", sans-serif', body: '"Kanit", sans-serif', name: 'Mitr + Kanit' },
};

function App({ t, setTweak }) {
  const palette = PALETTES[t.palette] || PALETTES.default;
  const fonts = FONT_PAIRS[t.fontPair] || FONT_PAIRS['prompt-sarabun'];

  // Mode (web | mini), lang, route, cart
  const [mode, setMode] = useStateA(() => localStorage.getItem('bb-mode') || 'web');
  const [lang, setLang] = useStateA(() => localStorage.getItem('bb-lang') || 'th');
  const [route, setRoute] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('bb-route')) || { screen: 'home' }; }
    catch { return { screen: 'home' }; }
  });
  const [cart, setCart] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('bb-cart')) || []; }
    catch { return []; }
  });

  useEffectA(() => { localStorage.setItem('bb-mode', mode); }, [mode]);
  useEffectA(() => { localStorage.setItem('bb-lang', lang); }, [lang]);
  useEffectA(() => { localStorage.setItem('bb-route', JSON.stringify(route)); }, [route]);
  useEffectA(() => { localStorage.setItem('bb-cart', JSON.stringify(cart)); }, [cart]);

  // Dynamic <title> + meta description + Product JSON-LD
  useEffectA(() => {
    const brand = 'BBpillow';
    const suffix = lang === 'th' ? 'นอนหลับมีคุณภาพ ในราคาตลาดนัด' : 'Quality sleep at flea-market prices';
    const titles = {
      home:      lang === 'th' ? `${brand} — ${suffix}` : `${brand} — ${suffix}`,
      shop:      lang === 'th' ? `ช้อปเครื่องนอน — ${brand}` : `Shop Bedding — ${brand}`,
      wholesale: lang === 'th' ? `ค้าส่งโรงแรม/รีสอร์ท — ${brand}` : `Wholesale Hotels & Resorts — ${brand}`,
      story:     lang === 'th' ? `เรื่องราวของเรา — ${brand}` : `Our Story — ${brand}`,
      cart:      lang === 'th' ? `ตะกร้าสินค้า — ${brand}` : `Cart — ${brand}`,
      checkout:  lang === 'th' ? `ชำระเงิน — ${brand}` : `Checkout — ${brand}`,
      dashboard: lang === 'th' ? `บัญชีของฉัน — ${brand}` : `My Account — ${brand}`,
    };
    const descs = {
      home:      lang === 'th' ? 'BBpillow — เครื่องนอนคุณภาพห้างฯ ในราคาตลาดนัด หมอน ที่นอน ผ้าปู ผ้านวม ท็อปเปอร์ ส่งฟรี 500+ รับประกัน 1 ปี' : 'BBpillow — Department-store quality bedding at flea-market prices. Pillows, mattresses, sheets, blankets. Free shipping over ฿500. 1-year warranty.',
      shop:      lang === 'th' ? 'เลือกซื้อหมอน ที่นอน ผ้าปู ผ้านวม ท็อปเปอร์ คุณภาพห้างฯ ราคาคุ้มค่า ส่งฟรี 500+' : 'Shop premium pillows, mattresses, sheets and toppers at affordable prices. Free shipping over ฿500.',
      wholesale: lang === 'th' ? 'ราคาขายส่งดีกว่าตลาด 30–50% สำหรับโรงแรม รีสอร์ท หอพัก และผู้ค้าปลีก' : 'Wholesale pricing 30–50% below market for hotels, resorts, dorms and retailers.',
      story:     lang === 'th' ? 'จากเงิน 5,000 บาทสุดท้ายสู่แบรนด์ที่หลายแสนครอบครัวไว้วางใจ' : 'From a final 5,000 baht to a brand trusted by hundreds of thousands of families.',
      cart:      lang === 'th' ? 'ตะกร้าสินค้าของคุณที่ BBpillow' : 'Your shopping cart at BBpillow.',
      checkout:  lang === 'th' ? 'กรอกที่อยู่จัดส่งและเลือกวิธีชำระเงินเพื่อสั่งซื้อสินค้า' : 'Enter your delivery address and choose a payment method to complete your order.',
      dashboard: lang === 'th' ? 'ดูคำสั่งซื้อ แต้มสะสม และจัดการโปรไฟล์ของคุณ' : 'View your orders, loyalty points and manage your profile.',
    };

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }

    if (route.screen === 'pdp') {
      const p = window.BB.products.find(x => x.id === route.id);
      if (p) {
        const name = lang === 'th' ? p.th : p.en;
        document.title = `${name} — ${brand}`;
        metaDesc.content = lang === 'th' ? `${p.desc_th} ราคา ฿${p.price.toLocaleString('en-US')} ที่ BBpillow` : `${p.desc_en} Price ฿${p.price.toLocaleString('en-US')} at BBpillow`;

        // Product JSON-LD
        const existing = document.getElementById('bb-jsonld-product');
        if (existing) existing.remove();
        const s = document.createElement('script');
        s.id = 'bb-jsonld-product';
        s.type = 'application/ld+json';
        s.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.th,
          alternateName: p.en,
          description: lang === 'th' ? p.desc_th : p.desc_en,
          image: `https://www.bbpillow.com/${p.img.replace('./', '')}`,
          sku: p.sku,
          brand: { '@type': 'Brand', name: 'BBpillow' },
          offers: {
            '@type': 'Offer',
            url: `https://www.bbpillow.com/#pdp/${p.id}`,
            price: String(p.price),
            priceCurrency: 'THB',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'BBpillow' },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'THB' },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: '1', maxValue: '2', unitText: 'Day' },
                transitTime: { '@type': 'QuantitativeValue', minValue: '2', maxValue: '4', unitText: 'Day' },
              },
            },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(p.rating),
            reviewCount: String(p.reviews),
            bestRating: '5',
            worstRating: '1',
          },
        });
        document.head.appendChild(s);
      }
    } else {
      document.title = titles[route.screen] || titles.home;
      metaDesc.content = descs[route.screen] || descs.home;
      const existing = document.getElementById('bb-jsonld-product');
      if (existing) existing.remove();
    }
  }, [route, lang]);

  // CSS vars on root
  useEffectA(() => {
    const r = document.documentElement;
    r.style.setProperty('--paper', palette.paper);
    r.style.setProperty('--soil', palette.soil);
    r.style.setProperty('--sky', palette.sky);
    r.style.setProperty('--clay', palette.clay);
    r.style.setProperty('--heading-font', fonts.heading);
    r.style.setProperty('--body-font', fonts.body);
    document.body.style.background = palette.paper;
  }, [palette, fonts]);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const nav = (screen, params = {}) => { setRoute({ screen, ...params }); window.scrollTo({ top: 0 }); };
  const goMini = (r) => setRoute(r);

  const addToCart = (p, qty = 1) => {
    setCart(c => {
      const ex = c.find(x => x.id === p.id);
      if (ex) return c.map(x => x.id === p.id ? { ...x, qty: x.qty + qty } : x);
      return [...c, { id: p.id, qty }];
    });
    // toast
    showToast(lang === 'th' ? `เพิ่ม "${p.th}" แล้ว` : `Added "${p.en}"`);
  };
  const updateQty = (id, qty) => setCart(c => c.map(x => x.id === id ? { ...x, qty } : x));
  const removeFromCart = (id) => setCart(c => c.filter(x => x.id !== id));
  const clearCart = () => setCart([]);

  // ──────────────── render ────────────────
  if (mode === 'mini') {
    return (
      <PageShell palette={palette} fonts={fonts}>
        <ModeBar mode={mode} setMode={setMode} lang={lang} setLang={setLang} cartCount={cartCount}
          t={t} setTweak={setTweak} palette={palette} fonts={fonts}/>
        <MiniAppStage lang={lang} route={route} go={goMini} cart={cart}
          addToCart={addToCart} updateQty={updateQty} removeFromCart={removeFromCart} clearCart={clearCart}
          cartCount={cartCount}/>
      </PageShell>
    );
  }

  return (
    <PageShell palette={palette} fonts={fonts}>
      <ModeBar mode={mode} setMode={setMode} lang={lang} setLang={setLang} cartCount={cartCount}
        t={t} setTweak={setTweak} palette={palette} fonts={fonts}/>
      <WebHeader lang={lang} nav={nav} route={route} cartCount={cartCount} b2b={t.b2bEmphasis}/>
      <main>
        {route.screen === 'home' && <Home lang={lang} nav={nav} addToCart={addToCart} density={t.density} b2b={t.b2bEmphasis}/>}
        {route.screen === 'shop' && <Shop lang={lang} nav={nav} addToCart={addToCart} density={t.density} initial={route}/>}
        {route.screen === 'pdp' && <PDP lang={lang} nav={nav} addToCart={addToCart} route={route}/>}
        {route.screen === 'cart' && <Cart lang={lang} nav={nav} cart={cart} updateQty={updateQty} removeFromCart={removeFromCart}/>}
        {route.screen === 'checkout' && <Checkout lang={lang} nav={nav} cart={cart} clearCart={clearCart}/>}
        {route.screen === 'wholesale' && <Wholesale lang={lang} nav={nav}/>}
        {route.screen === 'story' && <Story lang={lang} nav={nav}/>}
        {route.screen === 'dashboard' && <Dashboard lang={lang} nav={nav}/>}
      </main>
      <WebFooter lang={lang} nav={nav}/>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--soil)' }}>
      {children}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────
function showToast(msg) {
  const old = document.getElementById('bb-toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.id = 'bb-toast';
  el.textContent = msg;
  el.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: var(--soil); color: var(--paper);
    padding: 10px 18px; border-radius: 999px;
    font-family: "Prompt", sans-serif; font-size: 13.5px;
    box-shadow: 0 10px 28px rgba(62,42,30,.25);
    z-index: 1000; opacity: 0; transition: opacity .2s, transform .2s;
    pointer-events: none;
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => el.remove(), 250);
  }, 1800);
}

// ─── Mode toggle bar (top, sticky) ────────────────────────
function ModeBar({ mode, setMode, lang, setLang }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 80,
      background: 'rgba(247,245,240,.85)', backdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid rgba(62,42,30,.08)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 16px',
    }}>
      <div style={{
        display: 'inline-flex', background: 'rgba(62,42,30,.06)', borderRadius: 999, padding: 3,
      }}>
        {[
          { id: 'web', l: lang === 'th' ? 'เว็บ' : 'Web' },
          { id: 'mini', l: lang === 'th' ? 'LINE Mini-App' : 'LINE Mini-App' },
        ].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            appearance: 'none', border: 0, cursor: 'pointer',
            padding: '5px 14px', borderRadius: 999,
            background: mode === m.id ? '#fff' : 'transparent',
            color: mode === m.id ? 'var(--soil)' : 'rgba(62,42,30,.55)',
            fontFamily: '"Prompt", sans-serif', fontSize: 12.5, fontWeight: 500,
            boxShadow: mode === m.id ? '0 1px 3px rgba(62,42,30,.08)' : 'none',
            transition: 'all .15s',
          }}>{m.l}</button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="Specs.html" target="_blank" style={{
          fontFamily: '"Prompt", sans-serif', fontSize: 12.5, color: 'rgba(62,42,30,.6)',
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {lang === 'th' ? 'เอกสารระบบ' : 'Specs'} <I.chevR width={14} height={14}/>
        </a>
        <div style={{
          display: 'inline-flex', background: 'rgba(62,42,30,.06)', borderRadius: 999, padding: 3,
        }}>
          {['th', 'en'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              appearance: 'none', border: 0, cursor: 'pointer',
              padding: '5px 12px', borderRadius: 999,
              background: lang === l ? '#fff' : 'transparent',
              color: lang === l ? 'var(--soil)' : 'rgba(62,42,30,.55)',
              fontFamily: '"Prompt", sans-serif', fontSize: 12, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '.04em',
            }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Web header ────────────────────────────────────────────
function WebHeader({ lang, nav, route, cartCount, b2b }) {
  const [open, setOpen] = useStateA(false);
  const [scrolled, setScrolled] = useStateA(false);
  useEffectA(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { id: 'home', t: window.BB.t('home', lang) },
    { id: 'shop', t: window.BB.t('shop', lang) },
  ];

  return (
    <>
      <header style={{
        position: 'sticky', top: 41, zIndex: 70,
        background: scrolled ? 'rgba(247,245,240,.97)' : 'rgba(247,245,240,.88)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(62,42,30,.07)',
        boxShadow: scrolled ? '0 4px 24px rgba(62,42,30,.07)' : 'none',
        transition: 'box-shadow .3s, background .3s',
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18,
          padding: '14px 20px' }}>
          <button onClick={() => nav('home')} style={{
            appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer', padding: 0,
          }}>
            <img src="assets/logo new.jpg" alt="BBPillow" style={{height: 40, display: 'block'}} />
          </button>
          <nav className="bb-nav" style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
            {links.map(l => (
              <button key={l.id} onClick={() => nav(l.id)} style={{
                appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
                fontFamily: '"Prompt", sans-serif', fontSize: 14,
                color: route.screen === l.id ? 'var(--soil)' : 'rgba(62,42,30,.55)',
                fontWeight: route.screen === l.id ? 500 : 400,
                padding: '6px 14px', borderRadius: 999,
                background: route.screen === l.id ? 'rgba(62,42,30,.06)' : 'transparent',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={(e) => { if (route.screen !== l.id) e.currentTarget.style.background = 'rgba(62,42,30,.04)'; }}
              onMouseLeave={(e) => { if (route.screen !== l.id) e.currentTarget.style.background = 'transparent'; }}
              >{l.t}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {b2b && <Badge kind="clay">B2B mode</Badge>}
            <button onClick={() => nav('dashboard')} style={navBtn} title={window.BB.t('account', lang)} aria-label={window.BB.t('account', lang)}>
              <I.user/>
            </button>
            <button onClick={() => nav('cart')} style={{ ...navBtn, position: 'relative' }} title={window.BB.t('cart', lang)} aria-label={window.BB.t('cart', lang)}>
              <I.cart/>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -4,
                  minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999,
                  background: 'var(--clay)', color: '#fff',
                  fontFamily: '"Prompt", sans-serif', fontSize: 11, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </button>
            <button className="bb-mobile-menu" aria-label={window.BB.t('openMenu', lang)} onClick={() => setOpen(true)} style={{ ...navBtn, display: 'none' }}>
              <I.menu/>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(62,42,30,.4)', zIndex: 200,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 'min(80vw, 300px)',
            background: 'var(--paper)', padding: '22px 20px', display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 40px rgba(62,42,30,.12)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <BBLogo size={20}/>
              <button aria-label={window.BB.t('closeMenu', lang)} onClick={() => setOpen(false)} style={{ ...navBtn, background: 'rgba(62,42,30,.06)' }}><I.close/></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              {links.map(l => (
                <button key={l.id} onClick={() => { nav(l.id); setOpen(false); }} style={{
                  appearance: 'none', border: 0, cursor: 'pointer',
                  fontFamily: '"Prompt", sans-serif', fontSize: 17, textAlign: 'left',
                  padding: '14px 12px', borderRadius: 12,
                  background: route.screen === l.id ? 'rgba(62,42,30,.06)' : 'transparent',
                  color: 'var(--soil)', fontWeight: route.screen === l.id ? 500 : 400,
                }}>{l.t}</button>
              ))}
              <button onClick={() => { nav('dashboard'); setOpen(false); }} style={{
                appearance: 'none', border: 0, cursor: 'pointer',
                fontFamily: '"Prompt", sans-serif', fontSize: 17, textAlign: 'left',
                padding: '14px 12px', borderRadius: 12, background: 'transparent',
                color: 'var(--soil)',
              }}>{window.BB.t('account', lang)}</button>
            </div>
            <div style={{ paddingTop: 16, borderTop: '1px solid rgba(62,42,30,.08)' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#06C755', color: '#fff', border: 'none', cursor: 'pointer',
                padding: '11px 18px', borderRadius: 999, width: '100%', justifyContent: 'center',
                fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 500,
              }}><I.line/> {lang === 'th' ? 'เพิ่มเพื่อน LINE' : 'Add LINE friend'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
const navBtn = {
  appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
  width: 36, height: 36, borderRadius: 10,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--soil)',
};

// ─── Web footer ────────────────────────────────────────────
function WebFooter({ lang, nav }) {
  return (
    <footer style={{ background: 'var(--soil)', color: 'var(--paper)', padding: '48px 20px 24px', marginTop: 40 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }} className="bb-footer-grid">
        <div>
          <img src="assets/logo new.jpg" alt="BBPillow" style={{ height: 48, display: 'block', borderRadius: 8, objectFit: 'contain' }}/>
          <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, lineHeight: 1.6, opacity: 0.65, marginTop: 12, maxWidth: 280 }}>
            {lang === 'th' ? window.BB.dict.heroSub.th : window.BB.dict.heroSub.en}
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Btn kind="line" size="sm"><I.line/> LINE</Btn>
          </div>
        </div>
        <FootCol title={window.BB.t('shop', lang)} items={[
          { t: lang === 'th' ? 'หมอน' : 'Pillows', go: () => nav('shop', { cat: 'pillow' }) },
          { t: lang === 'th' ? 'ที่นอน' : 'Mattresses', go: () => nav('shop', { cat: 'mattress' }) },
          { t: lang === 'th' ? 'ผ้าปูที่นอน' : 'Sheets', go: () => nav('shop', { cat: 'sheet' }) },
          { t: lang === 'th' ? 'ผ้าห่ม' : 'Blankets', go: () => nav('shop', { cat: 'blanket' }) },
        ]}/>
        <FootCol title={lang === 'th' ? 'บริษัท' : 'Company'} items={[
          { t: lang === 'th' ? 'เกี่ยวกับเรา' : 'About us', go: () => nav('story') },
          { t: lang === 'th' ? 'ติดต่อ' : 'Contact', go: () => {} },
          { t: lang === 'th' ? 'สำหรับองค์กร' : 'For business', go: () => nav('wholesale') },
        ]}/>
        <FootCol title={lang === 'th' ? 'ลูกค้า' : 'Customer'} items={[
          { t: lang === 'th' ? 'นโยบายคืนสินค้า' : 'Returns', go: () => {} },
          { t: lang === 'th' ? 'จัดส่ง' : 'Shipping', go: () => {} },
          { t: lang === 'th' ? 'คำถามที่พบบ่อย' : 'FAQ', go: () => {} },
        ]}/>
      </div>
      <div style={{ maxWidth: 1180, margin: '24px auto 0', borderTop: '1px solid rgba(247,245,240,.1)',
        paddingTop: 18, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.55 }}>
          © 2026 BBpillow Co., Ltd. {window.BB.t('rightsReserved', lang)}.
        </div>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.55 }}>
          {lang === 'th' ? 'เลขทะเบียนนิติบุคคล 0463565001158' : 'Reg. 0463565001158'}
        </div>
      </div>
    </footer>
  );
}
function FootCol({ title, items }) {
  return (
    <div>
      <h4 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', opacity: 0.85, margin: '0 0 12px' }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <li key={i}>
            <button onClick={it.go} style={{
              appearance: 'none', border: 0, background: 'transparent', padding: 0, cursor: 'pointer',
              fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'var(--paper)', opacity: 0.7,
              textAlign: 'left',
            }}>{it.t}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mini-app stage (renders inside an iPhone frame) ──────
function MiniAppStage({ lang, route, go, cart, addToCart, updateQty, removeFromCart, clearCart, cartCount }) {
  const points = 480;
  const screen = route.screen === 'home' || !['home','shop','pdp','cart','checkout','me'].includes(route.screen) ? 'home' : route.screen;

  const titles = {
    home: 'BBpillow', shop: lang === 'th' ? 'สินค้า' : 'Shop', pdp: lang === 'th' ? 'สินค้า' : 'Product',
    cart: window.BB.t('yourCart', lang), checkout: window.BB.t('checkout', lang), me: window.BB.t('account', lang),
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 50px)',
      padding: '32px 20px 60px',
      background: 'radial-gradient(circle at 30% 0%, rgba(58,110,165,.06), transparent 50%), radial-gradient(circle at 80% 60%, rgba(192,108,83,.05), transparent 60%)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      gap: 40, flexWrap: 'wrap',
    }}>
      {/* Phone */}
      <div style={{ position: 'relative' }}>
        <IOSDevice width={390} height={780}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ paddingTop: 50 }}/>
            <MiniLineBar title={titles[screen]}
              hasBack={['pdp','checkout'].includes(screen)}
              onBack={() => go({ screen: screen === 'checkout' ? 'cart' : 'home' })}/>
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: 'var(--paper)' }}>
              {screen === 'home' && <MiniHome lang={lang} go={go} addToCart={addToCart} points={points}/>}
              {screen === 'shop' && <MiniShop lang={lang} go={go} addToCart={addToCart} initial={route}/>}
              {screen === 'pdp' && <MiniPDP lang={lang} route={route} go={go} addToCart={addToCart}/>}
              {screen === 'cart' && <MiniCart lang={lang} cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} go={go}/>}
              {screen === 'checkout' && <MiniCheckout lang={lang} cart={cart} clearCart={clearCart} go={go}/>}
              {screen === 'me' && <MiniMe lang={lang} go={go} points={points}/>}
            </div>
            <MiniTabBar active={screen === 'pdp' || screen === 'checkout' ? 'shop' : screen}
              onTab={(id) => go({ screen: id })} lang={lang} cartCount={cartCount}/>
          </div>
        </IOSDevice>

        {/* LIFF chat shell */}
        <div style={{
          position: 'absolute', top: -10, left: -10, right: -10, bottom: -10,
          borderRadius: 58, pointerEvents: 'none',
          background: 'linear-gradient(180deg, transparent, rgba(6,199,85,.05))',
        }}/>
      </div>

      {/* Info card next to phone (visible on wide screens) */}
      <div className="bb-mini-info" style={{ width: 320, alignSelf: 'flex-start', marginTop: 24 }}>
        <Badge kind="sage"><I.line width={12} height={12}/> LINE Mini-App / LIFF</Badge>
        <h2 style={{ fontFamily: '"Prompt", sans-serif', fontSize: 26, fontWeight: 500, color: 'var(--soil)', margin: '14px 0 10px', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
          {lang === 'th' ? 'ช้อปได้ในแชต LINE โดยไม่ต้องสลับแอป' : 'Shop inside LINE — no app switch.'}
        </h2>
        <p style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 14, color: 'rgba(62,42,30,.65)', lineHeight: 1.55, margin: 0 }}>
          {lang === 'th'
            ? 'B2C ใช้ LIFF SSO ดึงโปรไฟล์อัตโนมัติ — สต็อกตรงกับเว็บ ใช้แต้มร่วมกัน รับสิทธิพิเศษเฉพาะ LINE.'
            : 'B2C uses LIFF SSO with auto-filled profile — shared stock with web, shared loyalty points, LINE-only perks.'}
        </p>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <InfoRow icon={<I.user/>} t={lang === 'th' ? 'LINE Login (SSO)' : 'LINE Login (SSO)'} s={lang === 'th' ? 'ล็อกอินครั้งเดียวจาก LINE Profile' : 'One-tap auth via LINE profile'}/>
          <InfoRow icon={<I.gift/>} t={lang === 'th' ? '2× แต้มสะสม' : '2× loyalty points'} s={lang === 'th' ? 'เฉพาะคำสั่งซื้อใน Mini-App' : 'Mini-App orders only'}/>
          <InfoRow icon={<I.pkg/>} t={lang === 'th' ? 'สต็อกร่วม' : 'Unified inventory'} s={lang === 'th' ? 'API กลาง — เว็บ + LINE เห็นสต็อกเดียวกัน' : 'Single API — web + LINE see one stock'}/>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, t, s }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, background: '#fff', flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sky)',
        border: '1px solid rgba(62,42,30,.06)',
      }}>{icon}</div>
      <div>
        <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, color: 'var(--soil)', fontWeight: 500 }}>{t}</div>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, color: 'rgba(62,42,30,.6)', marginTop: 1 }}>{s}</div>
      </div>
    </div>
  );
}

// Mini Shop (simple grid + filter chip row)
function MiniShop({ lang, go, addToCart, initial }) {
  const [cat, setCat] = useStateA(initial?.cat || 'all');
  const list = cat === 'all' ? window.BB.products : window.BB.products.filter(p => p.category === cat);
  const { MiniCard } = window.__MiniLocal || {};
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '12px 14px', scrollbarWidth: 'none' }}>
        {window.BB.categories.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            appearance: 'none', border: '1px solid', cursor: 'pointer',
            borderColor: cat === c.id ? 'var(--soil)' : 'rgba(62,42,30,.15)',
            background: cat === c.id ? 'var(--soil)' : '#fff',
            color: cat === c.id ? 'var(--paper)' : 'var(--soil)',
            padding: '6px 12px', borderRadius: 999,
            fontFamily: '"Prompt", sans-serif', fontSize: 12, fontWeight: 500,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{lang === 'th' ? c.th : c.en}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px' }}>
        {list.map(p => (
          <MiniCardLocal key={p.id} p={p} lang={lang} onClick={() => go({ screen: 'pdp', id: p.id })} onAdd={addToCart}/>
        ))}
      </div>
    </div>
  );
}

// We need MiniCard accessible; inline its functionality.
function MiniCardLocal({ p, lang, onClick, onAdd }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      border: '1px solid rgba(62,42,30,.06)',
    }}>
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#EDE8DC', position: 'relative' }}>
        <img src={p.img} alt={lang === 'th' ? p.th : p.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
        <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--clay)', marginTop: 4 }}>{window.BB.fmtBaht(p.price)}</div>
      </div>
    </div>
  );
}

// Mini Me (mini-app dashboard)
function MiniMe({ lang, go, points }) {
  return (
    <div style={{ padding: '14px 14px 100px' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--soil), #5C4533)', color: 'var(--paper)',
        borderRadius: 16, padding: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#FFC7A4',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Prompt", sans-serif', fontSize: 20, fontWeight: 600, color: 'var(--soil)',
          }}>P</div>
          <div>
            <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 17, fontWeight: 500 }}>ภัทรา ศรีนวล</div>
            <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, opacity: 0.7 }}>Soft tier · 480 pts</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 14 }}>
        {[
          { icon: <I.pkg/>, t: lang === 'th' ? 'คำสั่งซื้อ' : 'Orders', n: 5 },
          { icon: <I.gift/>, t: lang === 'th' ? 'รางวัล' : 'Rewards', n: 3 },
          { icon: <I.heart/>, t: lang === 'th' ? 'รายการโปรด' : 'Favorites', n: 8 },
          { icon: <I.bell/>, t: lang === 'th' ? 'แจ้งเตือน' : 'Alerts', n: 2 },
        ].map((it, i) => (
          <button key={i} style={{
            appearance: 'none', border: 0, background: '#fff', cursor: 'pointer',
            padding: 14, borderRadius: 12, textAlign: 'left',
            display: 'flex', gap: 10, alignItems: 'center',
            border: '1px solid rgba(62,42,30,.06)',
          }}>
            <div style={{ color: 'var(--sky)' }}>{it.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Prompt", sans-serif', fontSize: 13.5, color: 'var(--soil)', fontWeight: 500 }}>{it.t}</div>
              <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.55)' }}>{it.n}</div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 14, background: '#fff', borderRadius: 12, padding: 14, border: '1px solid rgba(62,42,30,.06)' }}>
        <div style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, color: 'rgba(62,42,30,.55)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 10 }}>
          {lang === 'th' ? 'ตั้งค่า' : 'Settings'}
        </div>
        {[
          lang === 'th' ? 'ที่อยู่จัดส่ง' : 'Shipping addresses',
          lang === 'th' ? 'ภาษา · ไทย' : 'Language · English',
          lang === 'th' ? 'แจ้งเตือน' : 'Notifications',
          lang === 'th' ? 'ออกจากระบบ' : 'Sign out',
        ].map((x, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(62,42,30,.06)' : 'none',
            fontFamily: '"Sarabun", sans-serif', fontSize: 13.5, color: 'var(--soil)',
          }}>
            {x} <I.chevR width={16} height={16} style={{ color: 'rgba(62,42,30,.4)' }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mount + Tweaks Panel
function Root() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <App t={t} setTweak={setTweak}/>
      <TweaksPanel>
        <TweakSection label={(window.BB.dict.brand && window.BB.dict.brand.en) ? 'Brand palette' : 'Palette'}/>
        <TweakRadio label="Palette" value={t.palette}
          options={['default','warm','cool','sage']}
          onChange={(v) => setTweak('palette', v)}/>
        <TweakSection label="Typography"/>
        <TweakSelect label="Font pair" value={t.fontPair}
          options={['prompt-sarabun', 'noto-ibm', 'mitr-kanit']}
          onChange={(v) => setTweak('fontPair', v)}/>
        <TweakSection label="Layout"/>
        <TweakRadio label="Density" value={t.density}
          options={['compact', 'comfy']}
          onChange={(v) => setTweak('density', v)}/>
        <TweakSection label="Mode"/>
        <TweakToggle label="B2B emphasis" value={t.b2bEmphasis}
          onChange={(v) => setTweak('b2bEmphasis', v)}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
