/* Journey expansion — Landing, Detail */

function JourneyMountainHero({ height = 220 }) {
  return (
    <div style={{ height, position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="jsky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4A872"/>
            <stop offset="60%" stopColor="#F4C18C"/>
            <stop offset="100%" stopColor="#FAD8AC"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#jsky)"/>
        <circle cx="200" cy="120" r="50" fill="#FFE0B0" opacity="0.7"/>
        <path d="M0 200 L 60 120 L 100 160 L 160 90 L 220 150 L 280 100 L 340 150 L 400 130 L 400 220 L 0 220 Z" fill="#C04A1B"/>
        <path d="M0 200 L 80 150 L 140 180 L 200 140 L 260 180 L 320 150 L 400 180 L 400 220 L 0 220 Z" fill="#9A381A"/>
        <ellipse cx="80" cy="80" rx="40" ry="6" fill="#FAD8AC" opacity="0.6"/>
        <ellipse cx="320" cy="100" rx="50" ry="7" fill="#FAD8AC" opacity="0.5"/>
      </svg>
    </div>
  );
}

function JourneysLandingScreen() {
  const filters = ['All', 'Anxiety', 'Sleep', 'Depression'];
  const [active, setActive] = React.useState('All');
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 800 }}>Explore Journeys</div>
        <MTRoundIcon bg="transparent">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ margin: '4px 16px 16px', padding: 14, background: '#FFF1E2',
        border: '1px solid #FFE0C0', borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MTSparkle size={16} color="#F97316"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#C9531A' }}>Recommended for You</div>
          <div style={{ fontSize: 11, color: '#0E1726', marginTop: 2, lineHeight: 1.4 }}>
            Based on your anxiety assessment, we found 3 journeys that might help.
          </div>
        </div>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C9531A" strokeWidth={2.4} strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
      </div>
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
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

      <div style={{ margin: '0 20px 10px', fontSize: 17, fontWeight: 800 }}>Featured Journey</div>
      <div style={{ margin: '0 16px 18px', borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(15,23,42,.06)' }}>
        <div style={{ position: 'relative' }}>
          <JourneyMountainHero height={170}/>
          <div style={{ position: 'absolute', top: 12, left: 12, padding: '5px 10px',
            background: 'rgba(28,36,51,.85)', color: '#fff', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>Trending</div>
        </div>
        <div style={{ background: '#fff', padding: 14 }}>
          <div style={{ display: 'flex', gap: 12, color: '#9AA0AB', fontSize: 11 }}>
            <span style={{ display: 'inline-flex', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
              90 Days
            </span>
            <span style={{ display: 'inline-flex', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><path d="M3 20h2v-6H3zM10 20h2V10h-2zM17 20h2V4h-2z"/></svg>
              Beginner
            </span>
          </div>
          <div style={{ marginTop: 8, fontSize: 17, fontWeight: 800 }}>90 Day Emotional Reset</div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
            A complete guide to understanding your emotions, building resilience, and finding…
          </div>
          <button style={{ marginTop: 12, padding: '8px 14px', borderRadius: 999,
            background: '#FFE4D2', color: '#C9531A', border: 0, fontSize: 12, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Start Now
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#C9531A" strokeWidth={2.4} strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <div style={{ margin: '0 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Quick Picks</div>
        <button style={{ background: 'none', border: 0, color: '#F97316', fontWeight: 700, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>Filters</button>
      </div>
      <div style={{ margin: '0 16px 110px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { t: 'Deep Sleep', s: '7 Days · Audio', g: 'linear-gradient(180deg,#3a6a9c,#5a8abe)' },
          { t: 'Social Confidence', s: '14 Days · Interactive', g: 'linear-gradient(180deg,#e8e8e8,#cfd8b8)' },
          { t: 'Work Stress', s: '21 Days · Mixed', g: 'linear-gradient(135deg,#9a3b1a,#e58851,#fbb572)' },
          { t: 'Self Love', s: '30 Days · Journal', g: 'linear-gradient(180deg,#fbe1e8,#f4c4cf)' },
        ].map(p => (
          <div key={p.t}>
            <div style={{ height: 110, borderRadius: 14, background: p.g,
              boxShadow: '0 4px 12px rgba(15,23,42,.06)' }}/>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700 }}>{p.t}</div>
            <div style={{ fontSize: 11, color: '#9AA0AB' }}>{p.s}</div>
          </div>
        ))}
      </div>
    </MTScreen>
  );
}

function JourneyDetailScreen() {
  const syllabus = [
    { n: 1, t: 'Emotional Awareness', s: 'Days 1-7 · 7 Tasks', active: true },
    { n: 2, t: 'Identifying Triggers', s: 'Days 8-14 · 7 Tasks', locked: true },
    { n: 3, t: 'Building Coping Mechanisms', s: 'Days 15-30 · 15 Tasks', locked: true },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      <div style={{ position: 'relative', height: 240, paddingTop: 54 }}>
        <JourneyMountainHero height={240}/>
        <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <MTRoundIcon bg="rgba(255,255,255,.85)">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <MTRoundIcon bg="rgba(255,255,255,.85)">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h8M8 12l8-6M8 12l8 6"/></svg>
          </MTRoundIcon>
        </div>
      </div>
      <div style={{ marginTop: -24, background: '#FCF6EE', borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '20px 20px 130px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, background: '#FFE4D2',
            color: '#C9531A', borderRadius: 999 }}>Beginner</span>
          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600,
            border: '1px solid #ECE6DE', borderRadius: 999 }}>90 Days</span>
          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600,
            border: '1px solid #ECE6DE', borderRadius: 999 }}>5-10 min/day</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>90 Day Emotional Reset</div>
        <div style={{ marginTop: 8, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
          A complete guide to understanding your emotions, building resilience, and finding inner peace through daily micro-tasks. Perfect for beginners starting their mental wellness journey.
        </div>

        <div style={{ marginTop: 14, padding: 12, background: '#FFF1E2', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 12 }}>
          <MTAvatar initials="DA" size={40}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Curated by Dr. Ananya</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>Clinical Psychologist</div>
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800 }}>What you'll achieve</div>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { t: 'Understand your triggers', g: <path d="M12 2v6M12 22v-2M2 12h2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/> },
            { t: 'Build emotional resilience', g: <path d="M12 2L4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6z"/> },
            { t: 'Reduce daily stress', g: <path d="M5 12h14M5 7h10M5 17h10"/> },
            { t: 'Better relationships', g: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
          ].map((b, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14,
              boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FFE4D2',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C9531A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{b.g}</svg>
              </div>
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{b.t}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800 }}>Journey Syllabus</div>
        <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
          {syllabus.map(s => (
            <div key={s.n} style={{ background: '#fff', borderRadius: 14, padding: 14,
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 999,
                background: s.active ? '#F97316' : '#F1ECE5',
                color: s.active ? '#fff' : '#9AA0AB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800 }}>{s.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontSize: 11, color: '#9AA0AB', marginTop: 2 }}>{s.s}</div>
              </div>
              {s.locked
                ? <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                : <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px',
        background: 'linear-gradient(180deg, rgba(252,246,238,0) 0%, #FCF6EE 30%)',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#9AA0AB' }}>Total Duration</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0E1726' }}>3 Months</div>
        </div>
        <button style={{ flex: 1, padding: '14px 16px', borderRadius: 999, background: '#F97316',
          color: '#fff', border: 0, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          Subscribe to Journey
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { JourneysLandingScreen, JourneyDetailScreen, JourneyMountainHero });
