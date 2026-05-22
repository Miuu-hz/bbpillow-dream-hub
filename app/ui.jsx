// Shared UI primitives — icons, buttons, atoms
// Globally exported via window.BBUI

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

// ─────────────────────────────────────────────────────────────
// Icons — line-style, 24x24, currentColor
// ─────────────────────────────────────────────────────────────
const I = {
  search: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  cart: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 4h2.5l2.4 12.5a2 2 0 002 1.6h8.6a2 2 0 002-1.6L21.5 8H6.4"/><circle cx="9.5" cy="20.5" r="1.3"/><circle cx="17.5" cy="20.5" r="1.3"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 2l3 6.5 7 .8-5.3 4.8 1.5 7L12 17.5 5.8 21l1.5-7L2 9.3l7-.8L12 2z"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  chevL: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  chevD: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  trash: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-7 0v13a2 2 0 002 2h6a2 2 0 002-2V7"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>,
  truck: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
  leaf: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 4C10 5 4 11 4 20c8 0 14-6 16-14M4 20c2-6 6-10 12-12"/></svg>,
  refresh: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 12a8 8 0 11-2.3-5.6L20 9M20 4v5h-5"/></svg>,
  filter: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></svg>,
  line: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}><path d="M12 2C6 2 1.5 5.9 1.5 10.7c0 4.3 3.6 7.9 8.4 8.6.3.1.7.2.8.4.1.2.1.6 0 .8l-.1.6c-.1.3-.3 1.1 1 .6 1.3-.5 7-4.1 9.5-7 1.7-1.9 2.5-3.8 2.5-6C22.5 5.9 18 2 12 2z"/></svg>,
  pkg: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 16V8L12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/></svg>,
  gift: (p) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9h18v3H3zM5 12v9h14v-9M12 9V5a2 2 0 10-3 2 2 2 0 003-2 2 2 0 103 2 2 2 0 00-3-2v4M12 9v12"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9a6 6 0 1112 0c0 4 2 5 2 7H4c0-2 2-3 2-7zM10 20a2 2 0 004 0"/></svg>,
};

// ─────────────────────────────────────────────────────────────
// Logo — wordmark
// ─────────────────────────────────────────────────────────────
function BBLogo({ size = 22, color }) {
  return (
    <span style={{
      fontFamily: '"Prompt", sans-serif', fontWeight: 700,
      fontSize: size, letterSpacing: '-0.01em', color,
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{
        width: size * 0.92, height: size * 0.92, borderRadius: '50%',
        background: 'linear-gradient(135deg,#fff 0%,#EBE6DA 60%,#D7CEBC 100%)',
        boxShadow: 'inset 0 -2px 4px rgba(62,42,30,.12), inset 0 1px 2px rgba(255,255,255,.8), 0 1px 2px rgba(62,42,30,.08)',
        display: 'inline-block', flexShrink: 0,
      }}/>
      bbpillow
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────
function Btn({ kind = 'primary', size = 'md', icon, children, onClick, full, disabled, type, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, fontFamily: '"Prompt", sans-serif', fontWeight: 500,
    border: '1px solid transparent', cursor: 'pointer',
    transition: 'transform .12s, box-shadow .12s, background .12s',
    width: full ? '100%' : undefined,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, borderRadius: 999 },
    md: { padding: '12px 22px', fontSize: 14.5, borderRadius: 999 },
    lg: { padding: '15px 28px', fontSize: 16, borderRadius: 999 },
  };
  const kinds = {
    primary: { background: 'var(--clay)', color: '#fff', boxShadow: '0 1px 2px rgba(62,42,30,.12), 0 4px 12px rgba(192,108,83,.18)' },
    sky: { background: 'var(--sky)', color: '#fff', boxShadow: '0 1px 2px rgba(62,42,30,.12), 0 4px 12px rgba(58,110,165,.18)' },
    soil: { background: 'var(--soil)', color: 'var(--paper)' },
    outline: { background: 'transparent', color: 'var(--soil)', border: '1px solid var(--soil)' },
    ghost: { background: 'transparent', color: 'var(--soil)' },
    line: { background: '#06C755', color: '#fff' },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(-1px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(.96)')}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(-1px)')}
      style={{ ...base, ...sizes[size], ...kinds[kind], ...style }}>
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Stars
// ─────────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: '#E9A93B', alignItems: 'center' }}>
      {[1,2,3,4,5].map(n => (
        <I.star key={n} width={size} height={size} style={{ opacity: n <= Math.round(rating) ? 1 : 0.25 }}/>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Badge / Pill
// ─────────────────────────────────────────────────────────────
function Badge({ children, kind = 'soil' }) {
  const tones = {
    soil: { bg: 'rgba(62,42,30,.08)', fg: 'var(--soil)' },
    clay: { bg: 'rgba(192,108,83,.12)', fg: 'var(--clay)' },
    sky: { bg: 'rgba(58,110,165,.12)', fg: 'var(--sky)' },
    sage: { bg: 'rgba(120,135,90,.14)', fg: '#5d6a3f' },
    paper: { bg: 'rgba(255,255,255,.7)', fg: 'var(--soil)' },
  };
  const t = tones[kind] || tones.soil;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: '"Sarabun", sans-serif', fontSize: 11.5, fontWeight: 500,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.fg, lineHeight: 1.4,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// Product card
// ─────────────────────────────────────────────────────────────
function ProductCard({ p, lang, onClick, onAdd, compact }) {
  const [liked, setLiked] = useState(false);
  const name = lang === 'th' ? p.th : p.en;
  const off = Math.round(((p.compare - p.price) / p.compare) * 100);
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden',
      border: '1px solid rgba(62,42,30,.07)', cursor: 'pointer',
      transition: 'transform .25s cubic-bezier(.25,.46,.45,.94), box-shadow .25s',
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 2px 8px rgba(62,42,30,.04)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 18px 48px rgba(62,42,30,.1)';
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1.06)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(62,42,30,.04)';
      const img = e.currentTarget.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    }}>
      <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#EDE8DC' }}>
        <img src={p.img} alt={name} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform .5s cubic-bezier(.25,.46,.45,.94)',
        }}/>
        {off > 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <Badge kind="clay">-{off}%</Badge>
          </div>
        )}
        {p.badges && p.badges.includes('new') && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <Badge kind="sage">{lang === 'th' ? 'ใหม่' : 'New'}</Badge>
          </div>
        )}
        <button onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }} style={{
          position: 'absolute', bottom: 10, right: 10,
          width: 32, height: 32, borderRadius: '50%',
          background: liked ? 'var(--clay)' : 'rgba(255,255,255,.88)',
          backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: liked ? '#fff' : 'rgba(62,42,30,.7)',
          transition: 'all .18s',
          boxShadow: '0 2px 8px rgba(62,42,30,.15)',
        }}>
          <I.heart width={14} height={14} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"/>
        </button>
      </div>
      <div style={{ padding: compact ? 12 : 14, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: compact ? 13 : 14, color: 'var(--soil)',
          lineHeight: 1.35, fontWeight: 500,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'rgba(62,42,30,.55)' }}>
          <Stars rating={p.rating} size={11}/>
          <span style={{ fontFamily: '"Sarabun", sans-serif' }}>{p.rating} ({p.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
          <span style={{ fontFamily: '"Prompt", sans-serif', fontSize: compact ? 16 : 18, fontWeight: 600, color: 'var(--clay)' }}>
            {window.BB.fmtBaht(p.price)}
          </span>
          {p.compare && (
            <span style={{ fontFamily: '"Sarabun", sans-serif', fontSize: 12, color: 'rgba(62,42,30,.4)', textDecoration: 'line-through' }}>
              {window.BB.fmtBaht(p.compare)}
            </span>
          )}
        </div>
        {!compact && onAdd && (
          <button onClick={(e) => { e.stopPropagation(); onAdd(p); }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--clay)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--clay)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--paper)'; e.currentTarget.style.color = 'var(--soil)'; e.currentTarget.style.borderColor = 'rgba(62,42,30,.15)'; }}
            style={{
              marginTop: 6, padding: '9px 12px', borderRadius: 999,
              border: '1px solid rgba(62,42,30,.15)', background: 'var(--paper)',
              color: 'var(--soil)', fontFamily: '"Prompt", sans-serif', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all .18s',
            }}>
            <I.plus/> {window.BB.t('addToCart', lang)}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────
function SectionHd({ eyebrow, title, sub, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
      <div>
        {eyebrow && <div style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: 12, fontWeight: 500,
          letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 20, height: 2, background: 'var(--clay)', display: 'inline-block', borderRadius: 999, flexShrink: 0 }}/>
          {eyebrow}
        </div>}
        <h2 style={{
          fontFamily: '"Prompt", sans-serif', fontSize: 'clamp(22px, 4.5vw, 32px)', fontWeight: 500,
          color: 'var(--soil)', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.15,
        }}>{title}</h2>
        {sub && <p style={{
          fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'rgba(62,42,30,.6)',
          margin: '8px 0 0', maxWidth: 480, lineHeight: 1.5,
        }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step counter (qty)
// ─────────────────────────────────────────────────────────────
function QtyStep({ value, onChange, min = 1, max = 99 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 0,
      border: '1px solid rgba(62,42,30,.15)', borderRadius: 999, background: '#fff',
    }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={iconBtn}><I.minus/></button>
      <span style={{
        minWidth: 32, textAlign: 'center', fontFamily: '"Prompt", sans-serif',
        fontSize: 15, fontWeight: 500, color: 'var(--soil)',
      }}>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} style={iconBtn}><I.plus/></button>
    </div>
  );
}
const iconBtn = {
  appearance: 'none', border: 0, background: 'transparent',
  width: 32, height: 32, borderRadius: 999, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--soil)',
};

// ─────────────────────────────────────────────────────────────
// Text Input / Field
// ─────────────────────────────────────────────────────────────
function Field({ label, type = 'text', value, onChange, placeholder, required, multiline, rows = 4 }) {
  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px', borderRadius: 12,
    border: '1px solid rgba(62,42,30,.18)', background: '#fff',
    fontFamily: '"Sarabun", sans-serif', fontSize: 14.5, color: 'var(--soil)',
    outline: 'none', transition: 'border-color .15s, box-shadow .15s',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={{
        fontFamily: '"Sarabun", sans-serif', fontSize: 12.5, fontWeight: 500,
        color: 'rgba(62,42,30,.7)',
      }}>{label}{required && <span style={{ color: 'var(--clay)' }}> *</span>}</span>}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: '"Sarabun", sans-serif' }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--sky)'; e.target.style.boxShadow = '0 0 0 3px rgba(58,110,165,.12)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(62,42,30,.18)'; e.target.style.boxShadow = 'none'; }}
        />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = 'var(--sky)'; e.target.style.boxShadow = '0 0 0 3px rgba(58,110,165,.12)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(62,42,30,.18)'; e.target.style.boxShadow = 'none'; }}
        />
      )}
    </label>
  );
}

// Empty-state illustration (subtle)
function EmptyArt({ size = 120 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <ellipse cx="60" cy="100" rx="36" ry="6" fill="rgba(62,42,30,.06)"/>
      <path d="M30 70 Q60 50 90 70 Q92 90 60 92 Q28 90 30 70 Z" fill="#fff" stroke="rgba(62,42,30,.18)" strokeWidth="1.4"/>
      <path d="M40 72 Q60 60 80 72" fill="none" stroke="rgba(62,42,30,.16)" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// Export to window so other Babel scripts can use these
Object.assign(window, {
  BBUI: { I, BBLogo, Btn, Stars, Badge, ProductCard, SectionHd, QtyStep, Field, EmptyArt },
});
