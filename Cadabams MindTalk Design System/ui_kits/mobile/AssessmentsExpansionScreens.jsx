/* Assessments expansion — Landing, Intro, Activity question, Complete */

function AssessmentsLandingScreen() {
  const filters = ['All', 'Anxiety', 'Depression', 'Sleep'];
  const [active, setActive] = React.useState('All');
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 20px 6px' }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em' }}>Assessments</div>
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Understand yourself better with clinical tools.</div>
      </div>
      <div style={{ padding: '12px 16px 4px' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
          <span style={{ fontSize: 13, color: '#9AA0AB' }}>Search assessments...</span>
        </div>
      </div>
      <div style={{ padding: '12px 16px 4px', display: 'flex', gap: 8, overflowX: 'auto' }}>
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
      <div style={{ margin: '12px 16px 16px', padding: 18, background: '#1C2433',
        borderRadius: 18, color: '#fff' }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', fontSize: 11, fontWeight: 700,
          background: 'rgba(255,255,255,.1)', borderRadius: 999 }}>Recommended</span>
        <div style={{ marginTop: 12, fontSize: 19, fontWeight: 800 }}>Weekly Emotional Check-in</div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,.75)', lineHeight: 1.5 }}>
          Track your mood patterns and get personalized insights for the week ahead.
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 14, fontSize: 11, color: 'rgba(255,255,255,.85)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            5 min
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>
            12 Questions
          </span>
        </div>
      </div>

      <div style={{ margin: '0 20px 10px', fontSize: 16, fontWeight: 800 }}>Popular Screenings</div>
      <div style={{ margin: '0 16px 16px', display: 'grid', gap: 10 }}>
        {[
          { tint: 'blue', t: 'GAD-7 Anxiety Scale', tags: ['Anxiety', '5 min'],
            g: <><path d="M3 16a4 4 0 0 1 4-4 5 5 0 0 1 10 0 4 4 0 0 1 4 4"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/></> },
          { tint: 'green', t: 'PHQ-9 Depression Test', tags: ['Mood', '10 min'],
            g: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78zM9 12l2 2 4-4"/> },
          { tint: 'orange', t: 'Sleep Quality Index', tags: ['Sleep', '7 min'],
            g: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/> },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: MT_TINTS[c.tint].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MT_TINTS[c.tint].fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{c.g}</svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{c.t}</div>
              <div style={{ marginTop: 5, display: 'flex', gap: 6 }}>
                {c.tags.map(t => <MTTag key={t}>{t}</MTTag>)}
              </div>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </div>
        ))}
      </div>

      <div style={{ margin: '0 20px 10px', fontSize: 16, fontWeight: 800 }}>Personal Growth</div>
      <div style={{ margin: '0 16px 110px', display: 'grid', gap: 10 }}>
        {[
          { tint: 'purple', t: 'Stress Triggers', tags: ['Stress', '15 min'],
            g: <MTSparkle size={18} color={MT_TINTS.purple.fg}/> },
          { tint: 'pink', t: 'Relationship Satisfaction', tags: ['Social', '8 min'],
            g: null, p: <><circle cx="9" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0M13 19a6 6 0 0 1 8-2"/></> },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: MT_TINTS[c.tint].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {c.g ? c.g : <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MT_TINTS[c.tint].fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{c.p}</svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{c.t}</div>
              <div style={{ marginTop: 5, display: 'flex', gap: 6 }}>
                {c.tags.map(t => <MTTag key={t}>{t}</MTTag>)}
              </div>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </div>
        ))}
      </div>
      <MTTabBar active="explore" tabs={[
        { id: 'home', label: 'Home', icon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/> },
        { id: 'explore', label: 'Explore', icon: <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></> },
        { id: 'journal', label: 'Journal', icon: <path d="M5 3h14v18l-7-4-7 4z"/> },
        { id: 'connect', label: 'Connect', icon: <><circle cx="9" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0M13 19a6 6 0 0 1 8-2"/></> },
      ]}/>
    </MTScreen>
  );
}

function AssessmentIntroScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px' }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ margin: '4px 16px 16px', height: 200, borderRadius: 18, overflow: 'hidden',
        background: 'linear-gradient(180deg,#FFE0C0 0%,#FBC892 100%)', position: 'relative' }}>
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M0 130 Q 60 100 120 130 T 240 130 T 400 130 V 200 H 0 Z" fill="#F4A872"/>
          <path d="M0 160 Q 80 130 160 160 T 320 155 T 400 160 V 200 H 0 Z" fill="#E58851"/>
          <circle cx="200" cy="90" r="50" fill="#fff" opacity="0.85"/>
          {/* leafy plant */}
          <g transform="translate(200 90)">
            <path d="M0 30 Q 0 0 -2 -20" stroke="#9A4A1A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M-2 0 Q -16 -4 -22 -18 Q -8 -18 0 -3 Z" fill="#F97316"/>
            <path d="M-2 -10 Q 14 -16 20 -28 Q 6 -30 -2 -14 Z" fill="#FBA76A"/>
            <path d="M-2 -22 Q -10 -32 -16 -38 Q -4 -42 0 -26 Z" fill="#E8620A"/>
            <path d="M-1 -28 Q 8 -34 12 -40 Q 0 -44 -1 -32 Z" fill="#F97316"/>
            <circle cx="-12" cy="-26" r="3" fill="#F77268"/>
            <circle cx="-9" cy="-30" r="2" fill="#F77268"/>
          </g>
        </svg>
      </div>
      <div style={{ padding: '0 24px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '5px 12px', fontSize: 11, fontWeight: 700,
          background: '#FFE4D2', color: '#C9531A', borderRadius: 999 }}>Clinically Validated</span>
        <div style={{ marginTop: 12, fontSize: 24, fontWeight: 800 }}>GAD-7 Anxiety Scale</div>
        <div style={{ marginTop: 8, fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
          A self-administered screening tool used to measure the severity of generalized anxiety disorder.
        </div>
      </div>
      <div style={{ padding: '20px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { ic: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>, lbl: '5 min', sub: 'Duration' },
          { ic: <><path d="M5 5h14v14H5z"/><path d="M9 9l2 2 4-4M9 14l2 2 4-4"/></>, lbl: '7 Questions', sub: 'Length' },
        ].map((b, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 12px',
            textAlign: 'center', boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto' }}>{b.ic}</svg>
            <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800 }}>{b.lbl}</div>
            <div style={{ fontSize: 11, color: '#9AA0AB', marginTop: 2 }}>{b.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '14px 16px 0', padding: 16, background: '#fff', borderRadius: 14,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)', display: 'grid', gap: 12 }}>
        {[
          { ic: <path d="M5 12l5 5L20 7"/>, t: 'Understand your anxiety level',
            s: 'Get a clear score based on clinical standards.' },
          { ic: <path d="M5 12l5 5L20 7"/>, t: 'Track your progress',
            s: 'See how your mental health changes over time.' },
          { ic: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>, t: 'Private & Confidential',
            s: 'Your results are only visible to you.' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 22, height: 22, borderRadius: 999, background: '#FFE4D2',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">{b.ic}</svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{b.t}</div>
              <div style={{ fontSize: 12, color: '#9AA0AB', marginTop: 2, lineHeight: 1.5 }}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 32px 32px', fontSize: 11, color: '#9AA0AB', textAlign: 'center', lineHeight: 1.6 }}>
        This assessment is for educational purposes only and is not a diagnostic tool or a substitute for professional medical advice.
      </div>
    </MTScreen>
  );
}

function ActivityAssessmentScreen() {
  const [sel, setSel] = React.useState('Work or Career');
  const opts = [
    { t: 'Work or Career', g: <><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></> },
    { t: 'Relationships', g: <><circle cx="9" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0M13 19a6 6 0 0 1 8-2"/></> },
    { t: 'Health & Body', g: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78zM9 12l2 2 4-4"/> },
    { t: 'Finances', g: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/></> },
    { t: 'Just feeling off', g: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/> },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <MTRoundIcon bg="transparent">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </MTRoundIcon>
        <div style={{ flex: 1, height: 4, background: '#ECE6DE', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '30%', height: '100%', background: '#F97316' }}/>
        </div>
      </div>
      <div style={{ padding: '12px 20px' }}>
        <MTOverline color="#9AA0AB">ANXIETY RELIEF · DAY 9</MTOverline>
        <div style={{ marginTop: 10, fontSize: 22, fontWeight: 800, lineHeight: 1.25 }}>
          What's the main thing on your mind right now?
        </div>
      </div>
      <div style={{ padding: '20px 16px 110px', display: 'grid', gap: 10 }}>
        {opts.map(o => {
          const on = o.t === sel;
          return (
            <button key={o.t} onClick={() => setSel(o.t)} style={{
              padding: 14, borderRadius: 14, fontFamily: 'inherit', cursor: 'pointer',
              background: on ? '#FFF8F0' : '#fff',
              border: on ? '1.5px solid #F97316' : '1px solid #ECE6DE',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10,
                background: on ? '#fff' : '#F4F1EC',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={on ? '#F97316' : '#6B7280'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{o.g}</svg>
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 800, color: '#0E1726' }}>{o.t}</span>
              <span style={{ width: 22, height: 22, borderRadius: 999,
                background: on ? '#F97316' : 'transparent',
                border: on ? 'none' : '1.5px solid #D9D2C6',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {on && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18 }}>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 999,
          background: '#F97316', color: '#fff', border: 0, fontSize: 14, fontWeight: 800,
          letterSpacing: '0.04em', fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>CONTINUE</button>
      </div>
    </MTScreen>
  );
}

function AssessmentCompleteScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <MTRoundIcon bg="transparent">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </MTRoundIcon>
        <div style={{ flex: 1, height: 4, background: '#F97316', borderRadius: 999 }}/>
      </div>
      <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 90, height: 90, borderRadius: 999, background: '#FFE4D2',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>
          </svg>
        </div>
        <div style={{ marginTop: 22, fontSize: 28, fontWeight: 800, lineHeight: 1.15 }}>Assessment<br/>Complete</div>
        <div style={{ marginTop: 12, fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
          You've answered all questions. We're ready to compile your personalized insights.
        </div>
      </div>
      <div style={{ margin: '32px 16px 0', padding: 16, background: '#F4F2EE', borderRadius: 14 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <MTSparkle size={16} color="#F97316"/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800 }}>AI-Generated Report</div>
            <div style={{ marginTop: 4, fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
              This report is generated using artificial intelligence based on your responses. It is for informational purposes only and does not replace professional medical advice.
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18 }}>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 999,
          background: '#F97316', color: '#fff', border: 0, fontSize: 14, fontWeight: 800,
          letterSpacing: '0.04em', fontFamily: 'inherit', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          GENERATE REPORT
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { AssessmentsLandingScreen, AssessmentIntroScreen, ActivityAssessmentScreen, AssessmentCompleteScreen });
