/* Home variations — V11 (white-card layout) + Daily Growth (timeline activity feed) */

const SARAH_AVATAR_V = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBB7BC"/><stop offset="1" stop-color="#F97316"/></linearGradient></defs>
  <rect width="64" height="64" fill="url(#g2)"/>
  <circle cx="32" cy="26" r="11" fill="#FFE4D2"/>
  <path d="M14 60c2-12 11-18 18-18s16 6 18 18z" fill="#FFE4D2"/>
</svg>`);

/* ---------- V11: full-bleed pink hero, white quick-action cards ---------- */
function HomeV11Screen() {
  const moods = [
    { c: '#F7C44A', e: '😄' },
    { c: '#F7A172', e: '🙂' },
    { c: '#1C2433', e: '😐' },
    { c: '#F58F9A', e: '😔' },
    { c: '#DC8055', e: '😣' },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      {/* Top hero — pink → orange */}
      <div style={{ background: 'linear-gradient(180deg,#F58FB4 0%, #F77291 30%, #F77268 70%, #F97316 100%)',
        padding: '54px 20px 28px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Good Morning,</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>Sarah</div>
          </div>
          <MTAvatar src={SARAH_AVATAR_V} size={42} ring/>
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>Hi Sarah, how are you<br/>feeling today?</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 8, lineHeight: 1.5 }}>
              Your check-in helps us shape your<br/>home, guidance, and support.
            </div>
          </div>
          <div style={{ width: 80, height: 80, borderRadius: 18,
            background: 'linear-gradient(135deg,#FBC4D6,#E8A8D0,#C9A8E0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 6px 14px rgba(0,0,0,.12)' }}>
            <span style={{ fontSize: 32 }}>💗</span>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.92 }}>Tap your mood</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {moods.map((m, i) => (
              <span key={i} style={{ width: 26, height: 26, borderRadius: 999, background: m.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                fontFamily: "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
                boxShadow: i === 2 ? '0 0 0 2px #fff' : 'none' }}>{m.e}</span>
            ))}
          </div>
        </div>
      </div>

      {/* AI ask bar (overlaps hero) */}
      <div style={{ margin: '-18px 16px 0', background: '#fff', borderRadius: 28,
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 8px 20px rgba(15,23,42,.1)' }}>
        <MTSparkle size={16} color="#F97316"/>
        <span style={{ flex: 1, fontSize: 13, color: '#9AA0AB' }}>Ask Dr. Riya anything...</span>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><path d="M12 4v12"/><path d="M9 8a3 3 0 0 1 6 0v4a3 3 0 0 1-6 0zM5 12a7 7 0 0 0 14 0M12 19v3"/></svg>
      </div>

      {/* Match me row */}
      <div style={{ margin: '12px 16px 0', padding: '8px 12px', background: '#fff', borderRadius: 999,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: '#F1ECE5',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}><circle cx="9" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0M13 19a6 6 0 0 1 8-2"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 700, letterSpacing: '0.06em' }}>NEED SUPPORT?</div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Find the right expert for you</div>
        </div>
        <button style={{ padding: '7px 14px', borderRadius: 999, background: '#0E1726', color: '#fff',
          border: 0, fontSize: 12, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>Match me</button>
      </div>

      {/* Quick Actions — 3 large white cards */}
      <div style={{ margin: '20px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Quick Actions</div>
        <span style={{ fontSize: 12, color: '#9AA0AB' }}>Swipe to see more</span>
      </div>
      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { tint: 'purple', t: 'Therapy', g: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4"/></> },
          { tint: 'pink', t: 'Journal', g: <path d="M5 3h14v18l-7-4-7 4z"/> },
          { tint: 'blue', t: 'Breathe', g: <path d="M3 12h6l2-3 2 6 2-3h6"/> },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '18px 12px',
            textAlign: 'center', boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 44, height: 44, margin: '0 auto', borderRadius: 12, background: MT_TINTS[c.tint].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={MT_TINTS[c.tint].fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{c.g}</svg>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800 }}>{c.t}</div>
          </div>
        ))}
      </div>

      {/* Recommended Journeys */}
      <div style={{ margin: '24px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Recommended Journeys</div>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#F97316' }}>View All</span>
      </div>
      <div style={{ margin: '0 16px', padding: 14, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFE4D2',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="#F97316"><path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-7 1 2 1 4 2 4 1 0 0-3 0-7z"/></svg>
          </div>
          <div style={{ fontSize: 11, color: '#9AA0AB', fontWeight: 700 }}>90 DAYS &nbsp; <span style={{ color: '#0E1726' }}>BEGINNER</span></div>
        </div>
        <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800 }}>90 Day Emotional Reset</div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 1.5 }}>
          A complete journey to understand your emotions and build…
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 14, fontSize: 11, color: '#9AA0AB' }}>
          <span>90 days</span><span>Beginner</span>
        </div>
      </div>

      {/* Recommended for you */}
      <div style={{ margin: '20px 20px 8px', fontSize: 17, fontWeight: 800 }}>Recommended for You</div>
      <div style={{ margin: '0 16px 110px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <div style={{ flex: '0 0 60%', minWidth: 220 }}>
          <div style={{ height: 130, borderRadius: 16, position: 'relative',
            background: 'linear-gradient(135deg,#F4C4A8,#9C7FBC,#3F4F8F)',
            boxShadow: '0 4px 12px rgba(15,23,42,.1)' }}>
            <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '4px 10px',
              background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width={10} height={10} viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              5 min
            </span>
          </div>
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800 }}>Morning Clarity</div>
          <div style={{ fontSize: 11, color: '#9AA0AB' }}>Guided Visualization</div>
        </div>
        <div style={{ flex: '0 0 60%', minWidth: 220 }}>
          <div style={{ height: 130, borderRadius: 16,
            background: 'linear-gradient(180deg,#9CC4D8,#5BA89A,#3F8A8A)',
            boxShadow: '0 4px 12px rgba(15,23,42,.1)' }}/>
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800 }}>Anxiety Relief</div>
          <div style={{ fontSize: 11, color: '#9AA0AB' }}>Soundscape</div>
        </div>
      </div>

      <MTTabBar active="home" tabs={[
        { id: 'home', label: 'Home', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/> },
        { id: 'explore', label: 'Explore', icon: <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></> },
        { id: 'ai', label: 'AI Coach', special: true },
        { id: 'appts', label: 'Appts', icon: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></> },
        { id: 'profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></> },
      ]}/>
    </MTScreen>
  );
}

/* ---------- Daily Growth: gradient hero + activity timeline ---------- */
function HomeDailyGrowthScreen() {
  const week = [
    { d: 'Mon', n: 12 }, { d: 'Tue', n: 13 }, { d: 'Wed', n: 14 }, { d: 'Thu', n: 15 },
    { d: 'Today', n: 16, on: true }, { d: 'Sat', n: 17 },
  ];
  const activity = [
    { tint: 'orange', icon: <path d="M12 2v6m0 0l-3-3m3 3l3-3M6 14h12a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6z"/>,
      t: 'Mood check-in completed', s: 'Logged: Hopeful — your daily check-in is done streaking.', time: '8:00 AM' },
    { tint: 'purple', icon: <path d="M5 3h14v18l-7-4-7 4z"/>,
      t: 'Journal reflection saved', s: 'You wrote about a kid wishing it didn\'t end on a small dim from the day.', time: '9:15 AM' },
    { tint: 'blue', icon: <path d="M3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9z"/>,
      t: 'Journey step completed', s: 'Finished Day 9 of Emotional Reset focused on noticing triggers without judgement.', time: '1:40 PM' },
    { tint: 'peach', icon: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
      t: 'Appointment confirmed', s: 'Reminder time was set to notify 1hr before.', time: '2:00 PM' },
    { tint: 'pink', icon: <path d="M5 3h14v18l-7-4-7 4z"/>,
      t: 'Assessment report generated', s: 'Your stress check-in matched a few weeks with energy fatigue patterns.', time: '4:00 PM' },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg,#F58FB4 0%, #F77291 35%, #F77268 75%, #F97316 100%)',
        padding: '54px 20px 24px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Good Morning,</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>Sarah</div>
          </div>
          <MTAvatar src={SARAH_AVATAR_V} size={42} ring/>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25 }}>Hi Sarah, how are you feeling today?</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4, lineHeight: 1.5 }}>
              Your check-in helps us shape your home, guidance, and support.
            </div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg,#FBC4D6,#E8A8D0)' }}/>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.92 }}>Tap your mood</span>
          {['#F7C44A', '#F7A172', '#1C2433', '#F58F9A', '#DC8055'].map((c, i) => (
            <span key={i} style={{ width: 22, height: 22, borderRadius: 999, background: c,
              boxShadow: i === 2 ? '0 0 0 2px #fff' : 'none' }}/>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(255,255,255,.95)', borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <MTSparkle size={14} color="#F97316"/>
          <span style={{ flex: 1, fontSize: 12, color: '#9AA0AB' }}>Ask Dr. Riya anything...</span>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
        </div>
      </div>

      {/* Match me */}
      <div style={{ margin: '12px 16px 0', padding: '8px 12px', background: '#fff', borderRadius: 999,
        display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ width: 26, height: 26, borderRadius: 999, background: '#F1ECE5' }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: '#9AA0AB', fontWeight: 700, letterSpacing: '0.06em' }}>NEED SUPPORT?</div>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Find the right expert for you</div>
        </div>
        <span style={{ padding: '6px 12px', borderRadius: 999, background: '#0E1726', color: '#fff',
          fontSize: 11, fontWeight: 700 }}>Talk to a therapist</span>
        <span style={{ padding: '6px 12px', borderRadius: 999, background: '#FFE4D2', color: '#C9531A',
          fontSize: 11, fontWeight: 700 }}>Browse experts</span>
      </div>

      {/* Quick Actions — 4-up */}
      <div style={{ margin: '14px 20px 8px', fontSize: 15, fontWeight: 800 }}>Quick Actions</div>
      <div style={{ margin: '0 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { tint: 'pink', t: 'Assessments', s: 'Anxiety, mood & more', meta: '2 new suggested' },
          { tint: 'green', t: 'Guided journeys', s: 'Building style paths for your mood', meta: 'Day 9 of 30%' },
          { tint: 'orange', t: 'Journal & reflect', s: 'Reflect on guided thoughts', meta: '3 min gratitude' },
          { tint: 'purple', t: 'Quick relief', s: 'Breath, audio & visual resets', meta: 'Under 5 Min' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 12,
            boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: MT_TINTS[c.tint].bg }}/>
            <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800 }}>{c.t}</div>
            <div style={{ fontSize: 10, color: '#9AA0AB', marginTop: 2, lineHeight: 1.4 }}>{c.s}</div>
            <div style={{ marginTop: 6, fontSize: 10, fontWeight: 700, color: MT_TINTS[c.tint].fg }}>{c.meta}</div>
          </div>
        ))}
      </div>

      {/* Your Journey */}
      <div style={{ margin: '12px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>Your Journey</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#F97316' }}>View Path</span>
      </div>
      <div style={{ margin: '0 16px 12px', padding: 14, background: '#fff', borderRadius: 14,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 700 }}>DAILY STREAK · 4 DAYS</div>
        <div style={{ marginTop: 4, fontSize: 14, fontWeight: 800 }}>90 Day Emotional Reset</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: '#F1ECE5', borderRadius: 999 }}>
            <div style={{ width: '35%', height: '100%', background: '#F97316', borderRadius: 999 }}/>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#9AA0AB' }}>35%</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: '#9AA0AB' }}>Level 2 · Awareness</div>
      </div>

      {/* Daily Growth — week strip + activity */}
      <div style={{ margin: '12px 20px 8px', fontSize: 15, fontWeight: 800 }}>Daily Growth</div>
      <div style={{ margin: '0 16px 12px', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4 }}>
        {week.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 9, color: d.on ? '#0E1726' : '#9AA0AB', fontWeight: 700,
              padding: d.on ? '2px 6px' : 0, background: d.on ? '#F1ECE5' : 'transparent', borderRadius: 999 }}>{d.d}</span>
            <span style={{ marginTop: 4, fontSize: 12, fontWeight: 800, color: d.on ? '#0E1726' : '#9AA0AB' }}>{d.n}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 16px 14px', display: 'grid', gap: 10 }}>
        {activity.map((a, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 12,
            display: 'flex', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: MT_TINTS[a.tint].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MT_TINTS[a.tint].fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{a.icon}</svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{a.t}</div>
              <div style={{ marginTop: 2, fontSize: 10, color: '#9AA0AB', lineHeight: 1.45 }}>{a.s}</div>
              <div style={{ marginTop: 4, fontSize: 9, color: '#C5C5C5' }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: '12px 20px 8px', fontSize: 15, fontWeight: 800 }}>Recommended for You</div>
      <div style={{ margin: '0 16px 110px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <div style={{ flex: '0 0 50%', minWidth: 160 }}>
          <div style={{ height: 100, borderRadius: 14, position: 'relative',
            background: 'linear-gradient(135deg,#F4C4A8,#9C7FBC,#3F4F8F)' }}>
            <span style={{ position: 'absolute', right: 6, bottom: 6, padding: '3px 8px',
              background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 9, borderRadius: 999 }}>5 min</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 800 }}>Morning Clarity</div>
          <div style={{ fontSize: 10, color: '#9AA0AB' }}>Guided Visualization</div>
        </div>
        <div style={{ flex: '0 0 50%', minWidth: 160 }}>
          <div style={{ height: 100, borderRadius: 14,
            background: 'linear-gradient(180deg,#3F8A8A,#1F4D55)' }}/>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 800 }}>Anxiety Relief</div>
          <div style={{ fontSize: 10, color: '#9AA0AB' }}>Soundscape</div>
        </div>
      </div>

      <MTTabBar active="home" tabs={[
        { id: 'home', label: 'Home', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/> },
        { id: 'explore', label: 'Explore', icon: <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></> },
        { id: 'ai', label: 'AI', special: true },
        { id: 'appts', label: 'Appts', icon: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></> },
        { id: 'profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></> },
      ]}/>
    </MTScreen>
  );
}

Object.assign(window, { HomeV11Screen, HomeDailyGrowthScreen });
