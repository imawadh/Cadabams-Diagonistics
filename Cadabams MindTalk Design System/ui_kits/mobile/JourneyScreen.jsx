/* Journey screen — Duolingo-style vertical path with unit banner. */

const PATH_NODES = [
  { kind: 'start', state: 'active' },
  { kind: 'book', state: 'locked' },
  { kind: 'audio', state: 'locked' },
  { kind: 'number', n: 4, state: 'locked' },
  { kind: 'gift', state: 'locked', tint: 'reward' },
  { kind: 'number', n: 6, state: 'locked' },
  { kind: 'trophy', state: 'locked' },
];

function JourneyScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      {/* Header bar */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MTRoundIcon bg="#fff">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#0E1726' }}>90 Day Reset</div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4,
          background: '#fff', padding: '6px 12px', borderRadius: 999,
          fontSize: 12, fontWeight: 700, color: '#0E1726',
          boxShadow: '0 2px 6px rgba(15,23,42,.05)' }}>
          <span style={{ fontSize: 12 }}>🔥</span> 0
        </div>
      </div>

      {/* Unit banner */}
      <div style={{ margin: '8px 16px 24px', borderRadius: 18, padding: '16px 18px',
        background: 'linear-gradient(135deg,#F77268 0%, #F97316 100%)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 8px 18px rgba(247,114,104,.22)' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Unit 1</div>
          <div style={{ fontSize: 12, opacity: 0.95, marginTop: 2 }}>Emotional Awareness</div>
        </div>
        <button style={{ background: 'rgba(0,0,0,.18)', color: '#fff', border: 0,
          padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit' }}>Guidebook</button>
      </div>

      {/* Vertical path */}
      <PathColumn />

      <div style={{ height: 110 }}/>
      <MTTabBar active="path" tabs={JOURNEY_TABS} />
    </MTScreen>
  );
}

const JOURNEY_TABS = [
  { id: 'path', label: 'Path', icon: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></> },
  { id: 'goals', label: 'Goals', icon: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></> },
  { id: 'ai', label: 'AI', special: true },
  { id: 'community', label: 'Community', icon: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c1-3 3-5 6-5s5 2 6 5M14 20c1-2 2-3 3-3s2 1 3 3"/></> },
  { id: 'profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></> },
];

function PathColumn() {
  // x offsets along a gentle alternating curve, centered at 50%
  const xPattern = [50, 38, 62, 50, 35, 50, 50];
  const stepH = 92;
  return (
    <div style={{ position: 'relative', margin: '0 16px' }}>
      {PATH_NODES.map((node, i) => {
        const x = xPattern[i % xPattern.length];
        const y = i * stepH;
        return <PathNode key={i} node={node} x={x} y={y} index={i} />;
      })}
      <div style={{ height: PATH_NODES.length * stepH }}/>
    </div>
  );
}

function PathNode({ node, x, y, index }) {
  const isActive = node.state === 'active';
  const isReward = node.tint === 'reward';
  const size = isActive ? 76 : 60;

  // Color & glyph by kind
  let bg = '#E8E1D6';
  let glyphColor = '#B1A99B';
  let shadow = 'inset 0 -3px 0 rgba(15,23,42,.06)';

  if (isActive) {
    bg = '#F97316';
    glyphColor = '#fff';
    shadow = '0 6px 0 #C9531A, 0 12px 24px rgba(249,115,22,.32)';
  } else if (isReward) {
    bg = '#FCD9A8';
    glyphColor = '#C9531A';
    shadow = 'inset 0 -3px 0 rgba(193,90,20,.18)';
  }

  return (
    <div style={{
      position: 'absolute',
      left: `calc(${x}% - ${size / 2}px)`,
      top: y,
      width: size, height: size,
    }}>
      {isActive && (
        <div style={{
          position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
          background: '#fff', padding: '5px 14px', borderRadius: 999,
          fontSize: 11, fontWeight: 800, color: '#F97316', letterSpacing: '0.04em',
          boxShadow: '0 4px 10px rgba(15,23,42,.08)',
          display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
        }}>
          <span style={{ color: '#F7C44A', fontSize: 10 }}>★★★</span>
          <span>START</span>
        </div>
      )}
      <div style={{
        width: size, height: size,
        borderRadius: isReward ? 18 : 999,
        background: bg, boxShadow: shadow,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isActive ? 'pointer' : 'default',
      }}>
        <NodeGlyph node={node} color={glyphColor} active={isActive} />
      </div>
    </div>
  );
}

function NodeGlyph({ node, color, active }) {
  const sw = active ? 2.6 : 2.2;
  switch (node.kind) {
    case 'start':
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
          <path d="M8 5v14l11-7z"/>
        </svg>
      );
    case 'book':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2z"/>
          <path d="M4 5v15"/>
        </svg>
      );
    case 'audio':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14v-2a9 9 0 0 1 18 0v2"/>
          <rect x="3" y="13" width="5" height="7" rx="1.5"/>
          <rect x="16" y="13" width="5" height="7" rx="1.5"/>
        </svg>
      );
    case 'gift':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="4" rx="1"/>
          <path d="M5 12v9h14v-9M12 8v13"/>
          <path d="M12 8s-3-5-6-3 3 3 6 3zM12 8s3-5 6-3-3 3-6 3z"/>
        </svg>
      );
    case 'trophy':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4h8v5a4 4 0 0 1-8 0z"/>
          <path d="M8 7H5a3 3 0 0 0 3 3M16 7h3a3 3 0 0 1-3 3"/>
          <path d="M10 14h4l-1 4h-2z"/>
          <path d="M7 21h10"/>
        </svg>
      );
    case 'number':
      return (
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 22,
          color, fontFeatureSettings: '"tnum" 1',
        }}>{node.n}</span>
      );
  }
}

Object.assign(window, { JourneyScreen });
