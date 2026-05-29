/* MindTalk UI kit — shared utilities. Loads after colors_and_type.css. */

const MT_TINTS = {
  blue:   { bg: '#E8F1FF', fg: '#2C7BE5' },
  purple: { bg: '#F1EBFF', fg: '#6C5CE7' },
  green:  { bg: '#E6F4EA', fg: '#1F8B4C' },
  pink:   { bg: '#FFE6EA', fg: '#D03B5C' },
  peach:  { bg: '#FFE9D9', fg: '#C9531A' },
  orange: { bg: '#FFE4D2', fg: '#E8620A' },
};

/* ------------------ Generic atoms ----------------------------------------- */

function MTOverline({ children, color = '#E8620A', style }) {
  return <div style={{
    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color, ...style,
  }}>{children}</div>;
}

function MTAvatar({ src, initials, size = 40, ring }) {
  const style = {
    width: size, height: size, borderRadius: 999,
    background: src ? `url(${src}) center/cover` : 'linear-gradient(135deg,#FBB7BC,#F97316)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontSize: size * 0.36, flexShrink: 0,
    boxShadow: ring ? '0 0 0 3px #fff, 0 4px 10px rgba(15,23,42,.12)' : 'none',
  };
  return <div style={style}>{!src && initials}</div>;
}

function MTSparkle({ size = 16, color = '#F97316' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6z"/>
      <path d="M19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>
    </svg>
  );
}

function MTAIPill({ label = 'AI-generated', size = 'sm' }) {
  const pad = size === 'sm' ? '5px 10px' : '7px 14px';
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: pad, fontSize: fs, fontWeight: 700,
      background: '#FBF5EF', color: '#C9531A',
      border: '1px solid #FFE9D9', borderRadius: 999,
    }}>
      <MTSparkle size={fs} />{label}
    </span>
  );
}

function MTChip({ children, active, dark, color, style, onClick }) {
  let bg = '#fff', fg = '#0E1726', bd = '#ECE6DE';
  if (active) { bg = '#1C2433'; fg = '#fff'; bd = 'transparent'; }
  if (dark)   { bg = '#1C2433'; fg = '#fff'; bd = 'transparent'; }
  if (color)  { bg = color.bg; fg = color.fg; bd = 'transparent'; }
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
      background: bg, color: fg, border: `1px solid ${bd}`,
      fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
      ...style,
    }}>{children}</button>
  );
}

function MTTag({ children, color }) {
  const c = color || { bg: '#F4F2EE', fg: '#4A5260' };
  return (
    <span style={{
      padding: '4px 10px', fontSize: 11, fontWeight: 500,
      background: c.bg, color: c.fg, borderRadius: 999, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

/* ------------------ Buttons ----------------------------------------------- */

function MTButton({ children, variant = 'primary', size = 'md', icon, iconRight, full, onClick, style }) {
  const base = {
    fontFamily: 'inherit', fontWeight: 700, border: 0, borderRadius: 999,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', gap: 8, transition: 'transform .14s',
    width: full ? '100%' : undefined,
  };
  const sizes = {
    sm: { padding: '10px 16px', fontSize: 13 },
    md: { padding: '14px 22px', fontSize: 15 },
    lg: { padding: '16px 28px', fontSize: 16 },
  };
  const variants = {
    primary: { background: '#F97316', color: '#fff', boxShadow: '0 8px 18px rgba(249,115,22,.28)' },
    gradient: { background: 'linear-gradient(90deg,#F77268 0%,#F97316 100%)', color: '#fff', boxShadow: '0 8px 18px rgba(247,114,104,.22)' },
    secondary: { background: '#fff', color: '#0E1726', boxShadow: '0 2px 6px rgba(15,23,42,.05),0 6px 16px rgba(15,23,42,.04)' },
    dark: { background: '#1C2433', color: '#fff' },
    ghost: { background: 'transparent', color: '#F97316', boxShadow: 'none' },
    danger: { background: '#fff', color: '#DC4B45', border: '1px solid #FCE4E2', boxShadow: 'none' },
  };
  return (
    <button
      onClick={onClick}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {icon}{children}{iconRight}
    </button>
  );
}

/* ------------------ Cards ------------------------------------------------- */

function MTCard({ children, padding = 16, radius = 18, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: radius, padding,
      boxShadow: '0 2px 6px rgba(15,23,42,.05),0 6px 16px rgba(15,23,42,.04)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

/* ------------------ Tile glyph (category icon) ---------------------------- */

function MTGlyphTile({ tint, children, size = 44, radius = 12 }) {
  const c = MT_TINTS[tint] || MT_TINTS.blue;
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: c.fg, display: 'flex' }}>{children}</span>
    </div>
  );
}

/* ------------------ Top bar ----------------------------------------------- */

function MTTopBar({ left, title, right, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 20px 12px', minHeight: 48,
      ...style,
    }}>
      <div style={{ flexShrink: 0 }}>{left}</div>
      <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: '#0E1726', textAlign: title ? 'center' : 'left' }}>{title}</div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

function MTRoundIcon({ children, onClick, bg = '#fff', size = 36 }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 999, background: bg,
      border: 0, fontFamily: 'inherit', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 2px rgba(15,23,42,.04),0 1px 1px rgba(15,23,42,.03)',
    }}>{children}</button>
  );
}

/* ------------------ Bottom tab bar ---------------------------------------- */

function MTTabBar({ active = 'home', onChange = () => {}, tabs: customTabs }) {
  const tabs = customTabs || [
    { id: 'home', label: 'Home', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/> },
    { id: 'explore', label: 'Explore', icon: <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></> },
    { id: 'ai', label: 'AI', special: true },
    { id: 'appts', label: 'Appts', icon: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></> },
    { id: 'profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 12, right: 12,
      background: '#fff', borderRadius: 28, padding: '12px 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 8px 24px rgba(15,23,42,.08),0 2px 6px rgba(15,23,42,.04)',
    }}>
      {tabs.map(t => {
        if (t.special) {
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
              width: 56, height: 56, borderRadius: 999, background: '#F97316',
              border: 0, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 24px rgba(249,115,22,.32)',
              marginTop: -22, fontFamily: 'inherit',
            }}>
              <MTSparkle size={28} color="#fff" />
            </button>
          );
        }
        const isActive = active === t.id;
        const color = isActive ? '#F97316' : '#6B7280';
        const fill = isActive ? '#FFE4D2' : 'none';
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'none', border: 0, cursor: 'pointer', flex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 0', fontFamily: 'inherit',
          }}>
            <svg width={22} height={22} viewBox="0 0 24 24" stroke={color} fill={fill} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
            <span style={{ fontSize: 11, fontWeight: 600, color }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------ Mobile screen wrapper --------------------------------- */

function MTScreen({ children, style }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#FAF7F4',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#0E1726', overflowY: 'auto', overflowX: 'hidden',
      position: 'relative', paddingTop: 54,
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, {
  MT_TINTS, MTOverline, MTAvatar, MTSparkle, MTAIPill, MTChip, MTTag,
  MTButton, MTCard, MTGlyphTile, MTTopBar, MTRoundIcon, MTTabBar, MTScreen,
});
