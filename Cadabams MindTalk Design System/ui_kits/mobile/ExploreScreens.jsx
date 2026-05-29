/* Explore + Quick Relief screens — Explore landing, Audio list, Reflection player, Breathing exercise. */

function ExploreScreen() {
  const filters = ['For You', 'Sleep', 'Anxiety', 'Meditation'];
  const [active, setActive] = React.useState('For You');
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 20px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>Explore</div>
      </div>
      <div style={{ padding: '8px 16px 4px' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
          <span style={{ fontSize: 13, color: '#9AA0AB' }}>Try "Sleep meditation" or "Anxiety"</span>
        </div>
      </div>
      <div style={{ margin: '12px 0 16px', padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => {
          const on = f === active;
          return (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: '8px 16px', borderRadius: 999, fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              background: on ? '#0E1726' : '#fff', color: on ? '#fff' : '#0E1726',
              border: on ? 'none' : '1px solid #ECE6DE', cursor: 'pointer', whiteSpace: 'nowrap' }}>{f}</button>
          );
        })}
      </div>
      {/* Daily pick hero */}
      <div style={{ margin: '0 16px 18px', borderRadius: 22, overflow: 'hidden', position: 'relative',
        height: 180, background: 'linear-gradient(180deg,#3a4a3f 0%, #6b5a3a 50%, #c89656 100%)',
        boxShadow: '0 8px 22px rgba(15,23,42,.18)' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(255,180,100,.6), transparent 55%)' }}/>
        <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 10px',
          background: 'rgba(0,0,0,.4)', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#fff' }}>Daily Pick</div>
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, color: '#fff' }}>
          <div style={{ fontSize: 19, fontWeight: 800 }}>Morning Clarity</div>
          <div style={{ fontSize: 12, opacity: .9, marginTop: 2 }}>Start your day with 10 mins of focus.</div>
        </div>
        <button style={{ position: 'absolute', left: 14, bottom: 60, width: 40, height: 40, borderRadius: 999,
          background: '#F97316', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(249,115,22,.4)' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>

      {/* Quick Relief */}
      <SectionHead title="Quick Relief" link="See all"/>
      <div style={{ margin: '0 16px 18px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <ContentCard title="Stress SOS" sub="Dr. Sarah" badge="5 min" gradient="linear-gradient(135deg,#FB923C,#F97316,#9F3208)"/>
        <ContentCard title="Forest Breath" sub="Nature Sounds" badge="3 min" gradient="linear-gradient(135deg,#0F2E1A,#3F6B45,#A8B575)"/>
      </div>

      {/* Browse by feeling */}
      <SectionHead title="Browse by Feeling"/>
      <div style={{ margin: '0 16px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <FeelingTile label="Anxious" tint="orange" glyph={<path d="M12 2v6m0 0l-3-3m3 3l3-3M6 14h12a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6z"/>}/>
        <FeelingTile label="Tired" tint="green" glyph={<><circle cx="12" cy="12" r="3"/><path d="M12 6V3M12 21v-3M6 12H3M21 12h-3"/></>}/>
        <FeelingTile label="Sad" tint="blue" glyph={<><circle cx="12" cy="12" r="9"/><path d="M9 16c1-1.5 5-1.5 6 0M9 9h0M15 9h0"/></>}/>
        <FeelingTile label="Can't Sleep" tint="purple" glyph={<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>}/>
      </div>

      {/* Sleep stories */}
      <SectionHead title="Sleep Stories" link="See all"/>
      <div style={{ margin: '0 16px 110px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <ContentCard title="The Midnight Train" sub="John Doe" badge="25 min" gradient="linear-gradient(180deg,#1a2f5c,#3a5a8c,#7a4a2c)"/>
        <ContentCard title="Winter Cabin" sub="Alice Smith" badge="20 min" gradient="linear-gradient(180deg,#2a3a4f,#5a6a7f,#aabac0)"/>
      </div>
      <MTTabBar active="explore"/>
    </MTScreen>
  );
}

function SectionHead({ title, link }) {
  return (
    <div style={{ margin: '0 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 17, fontWeight: 800 }}>{title}</div>
      {link && <button style={{ background: 'none', border: 0, color: '#F97316', fontWeight: 700, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>{link}</button>}
    </div>
  );
}

function ContentCard({ title, sub, badge, gradient }) {
  return (
    <div style={{ flex: '0 0 46%', minWidth: 160 }}>
      <div style={{ height: 110, borderRadius: 16, background: gradient, position: 'relative',
        boxShadow: '0 4px 12px rgba(15,23,42,.1)' }}>
        <div style={{ position: 'absolute', right: 8, bottom: 8, padding: '3px 8px',
          background: 'rgba(0,0,0,.5)', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700 }}>{badge}</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: '#0E1726' }}>{title}</div>
      <div style={{ fontSize: 11, color: '#9AA0AB' }}>{sub}</div>
    </div>
  );
}

function FeelingTile({ label, tint, glyph }) {
  const c = MT_TINTS[tint];
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{glyph}</svg>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#0E1726' }}>{label}</span>
    </div>
  );
}

/* ---------- Audio list ---------- */
function AudioListScreen() {
  const filters = ['All', 'Sleep', 'Anxiety', 'Focus', 'Short'];
  const [active, setActive] = React.useState('All');
  const items = [
    { title: 'Ocean Breathing', tags: ['3 min', 'Audio', 'Calm'] },
    { title: 'Morning Clarity', tags: ['5 min', 'Audio', 'Focus'] },
    { title: 'Quick Body Scan', tags: ['4 min', 'Audio', 'Grounding'] },
    { title: 'Forest Bathing', tags: ['10 min', 'Audio', 'Nature'] },
    { title: 'Drift to Sleep', tags: ['15 min', 'Audio', 'Sleep'] },
    { title: 'SOS Panic Reset', tags: ['2 min', 'Audio', 'Anxiety'] },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ECE6DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MTRoundIcon bg="#fff">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Audio resets</div>
            <div style={{ fontSize: 11, color: '#9AA0AB' }}>24 sessions available</div>
          </div>
        </div>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ padding: '12px 16px 8px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => {
          const on = f === active;
          return (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: '8px 14px', borderRadius: 999, fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
              background: on ? '#0E1726' : '#fff', color: on ? '#fff' : '#0E1726',
              border: on ? 'none' : '1px solid #ECE6DE', cursor: 'pointer', whiteSpace: 'nowrap' }}>{f}</button>
          );
        })}
      </div>
      <div style={{ margin: '8px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>All Audio</div>
        <div style={{ fontSize: 12, color: '#9AA0AB' }}>Shortest first ▾</div>
      </div>
      <div style={{ margin: '0 16px 110px', display: 'grid', gap: 10 }}>
        {items.map(it => (
          <div key={it.title} style={{ background: '#fff', borderRadius: 14, padding: 12,
            display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12,
              background: 'linear-gradient(135deg,#FBB78A,#F97316,#C9531A)', position: 'relative', overflow: 'hidden' }}>
              <svg viewBox="0 0 56 56" style={{ position: 'absolute', inset: 0 }}>
                <path d="M0 38 C 14 28, 28 44, 56 32 L 56 56 L 0 56 Z" fill="rgba(255,255,255,.18)"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{it.title}</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {it.tags.map(t => <MTTag key={t}>{t}</MTTag>)}
              </div>
              <div style={{ marginTop: 8, color: '#F97316', fontSize: 12, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.2}><path d="M8 5v14l11-7z"/></svg>
                Play
              </div>
            </div>
          </div>
        ))}
      </div>
    </MTScreen>
  );
}

/* ---------- Reflection player (Gratitude, blue glow) ---------- */
function ReflectionPlayerScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </MTRoundIcon>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 220, height: 220, borderRadius: 999,
          background: 'radial-gradient(circle, #DDEBFB 30%, #ECF3FB 70%, #F4F7FB 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 0 0 1px rgba(44,123,229,.08), 0 18px 40px rgba(44,123,229,.1)' }}>
          <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="#2C7BE5" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>
          </svg>
        </div>
        <div style={{ marginTop: 28, fontSize: 24, fontWeight: 800 }}>Gratitude</div>
        <div style={{ fontSize: 13, color: '#9AA0AB', marginTop: 4 }}>3 min focus</div>
      </div>
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 110 }}>
        <div style={{ height: 4, background: '#E6E3DC', borderRadius: 999, position: 'relative' }}>
          <div style={{ width: '36%', height: '100%', background: '#2C7BE5', borderRadius: 999 }}/>
          <div style={{ position: 'absolute', left: '36%', top: -5, width: 14, height: 14, borderRadius: 999,
            background: '#2C7BE5', boxShadow: '0 2px 4px rgba(44,123,229,.3)', transform: 'translateX(-50%)' }}/>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9AA0AB' }}>
          <span>1:05</span><span>3:00</span>
        </div>
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36 }}>
          <button style={{ background: 'none', border: 0, cursor: 'pointer' }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2} strokeLinecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button style={{ width: 64, height: 64, borderRadius: 999, background: '#F97316',
            border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(249,115,22,.36)' }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          </button>
          <button style={{ background: 'none', border: 0, cursor: 'pointer' }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2} strokeLinecap="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>
          </button>
        </div>
      </div>
    </MTScreen>
  );
}

/* ---------- Breathing exercise ---------- */
function BreathingScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MTRoundIcon bg="#fff">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </MTRoundIcon>
        <div style={{ background: '#fff', borderRadius: 999, padding: '6px 14px',
          display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0E1726' }}>Technique</span>
          <span style={{ padding: '3px 8px', borderRadius: 999, background: '#FFE4D2', color: '#C9531A', fontSize: 11, fontWeight: 700 }}>4-7-8 Relax</span>
        </div>
      </div>
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 280, height: 280, borderRadius: 999,
          background: 'radial-gradient(circle, #FBB78A 0%, #FCD3B0 35%, #FFE4D2 65%, #FFF1E2 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 4s ease-in-out infinite' }}>
          <div style={{ width: 180, height: 180, borderRadius: 999, background: 'rgba(247,165,114,.5)' }}/>
        </div>
        <style>{`@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }`}</style>
        <div style={{ marginTop: 26, fontSize: 26, fontWeight: 800 }}>Inhale</div>
        <div style={{ fontSize: 13, color: '#9AA0AB', marginTop: 4 }}>Through your nose</div>
        <div style={{ marginTop: 22, padding: '6px 14px', background: '#F1ECE5', borderRadius: 999,
          fontSize: 12, fontWeight: 700, color: '#6B7280' }}>04:30 remaining</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36 }}>
        <MTRoundIcon bg="#fff" size={44}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M16 9c1 1 1 5 0 6M19 6c2 2 2 10 0 12"/></svg>
        </MTRoundIcon>
        <button style={{ width: 64, height: 64, borderRadius: 999, background: '#F97316',
          border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 18px rgba(249,115,22,.36)' }}>
          <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
        </button>
        <MTRoundIcon bg="#fff" size={44}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h8M8 12l8-6M8 12l8 6"/></svg>
        </MTRoundIcon>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { ExploreScreen, AudioListScreen, ReflectionPlayerScreen, BreathingScreen });
