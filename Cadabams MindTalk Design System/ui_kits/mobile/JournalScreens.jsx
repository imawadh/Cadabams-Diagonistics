/* Journal expansion — Active dashboard, Entry write, Detail */

function PlantHero({ height = 180 }) {
  /* Stylized abstract dunes + plant SVG (placeholder for the hero illustration) */
  return (
    <div style={{ height, position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="dune-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C04A1B"/>
            <stop offset="60%" stopColor="#D9683A"/>
            <stop offset="100%" stopColor="#E58851"/>
          </linearGradient>
          <linearGradient id="dune-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E58851"/>
            <stop offset="100%" stopColor="#F4A872"/>
          </linearGradient>
          <linearGradient id="dune-near" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4A872"/>
            <stop offset="100%" stopColor="#FAC79B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#dune-sky)"/>
        <path d="M0 60 Q 80 30 160 70 T 320 60 T 400 80 V 200 H 0 Z" fill="#A0381A" opacity="0.55"/>
        <path d="M0 100 Q 70 70 150 100 T 280 95 T 400 110 V 200 H 0 Z" fill="url(#dune-mid)"/>
        <path d="M0 140 Q 100 110 200 140 T 400 145 V 200 H 0 Z" fill="url(#dune-near)" opacity="0.85"/>
        <ellipse cx="200" cy="190" rx="120" ry="20" fill="#FFE0C0" opacity="0.5"/>
        {/* Sprout */}
        <g transform="translate(195 100)">
          <path d="M5 80 Q 5 50 0 30" stroke="#9A4A1A" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <path d="M5 50 Q -8 45 -14 30 Q -2 28 5 45 Z" fill="#5C3A1F"/>
          <path d="M5 40 Q 18 33 22 18 Q 10 18 5 35 Z" fill="#7A4A22"/>
          <path d="M5 28 Q 0 18 -8 10 Q 2 4 8 22 Z" fill="#8A4A1A"/>
        </g>
      </svg>
    </div>
  );
}

function JournalActiveScreen() {
  const days = [
    { d: 'M', n: 24 }, { d: 'T', n: 25 }, { d: 'W', n: 26 },
    { d: 'T', n: 27 }, { d: 'F', n: 28, on: true }, { d: 'S', n: 29 }, { d: 'S', n: 30 },
  ];
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      <div style={{ position: 'relative', height: 240, paddingTop: 54 }}>
        <PlantHero height={240}/>
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
        padding: '24px 20px 110px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>Daily<br/>Gratitude</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 6 }}>Your daily mindful pause</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <span style={{ width: 24, height: 24, borderRadius: 999, background: '#FFE4D2',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="#F97316"><path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-7 1 2 1 4 2 4 1 0 0-3 0-7z"/></svg>
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0E1726', lineHeight: 1.2 }}>0 Day<br/>Streak</span>
          </div>
        </div>

        {/* Week strip */}
        <div style={{ marginTop: 16, padding: 12, background: '#fff', borderRadius: 16,
          boxShadow: '0 1px 2px rgba(15,23,42,.04)', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
          {days.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 600 }}>{d.d}</span>
              <span style={{ width: 30, height: 30, borderRadius: 999,
                background: d.on ? '#F97316' : '#F4F1EC',
                color: d.on ? '#fff' : '#0E1726',
                fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.n}</span>
            </div>
          ))}
        </div>

        {/* Today's prompt */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 16, padding: 16,
          boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
          <MTOverline>TODAY'S PROMPT</MTOverline>
          <div style={{ marginTop: 8, fontSize: 16, fontWeight: 700, color: '#0E1726', lineHeight: 1.4 }}>
            What are three small things that made you smile today?
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 14, color: '#9AA0AB', fontSize: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              3 min
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><path d="M20 12l-8 8-8-8 8-8z"/></svg>
              Guided
            </span>
          </div>
        </div>

        {/* Recent entries */}
        <div style={{ marginTop: 18, fontSize: 16, fontWeight: 800 }}>Recent Entries</div>
        <div style={{ marginTop: 10, padding: '32px 16px', borderRadius: 16,
          background: '#fff', border: '1.5px dashed #E6DFD2', textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, margin: '0 auto', borderRadius: 999, background: '#FFE4D2',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}><path d="M4 4h7v16H4zM13 4h7v16h-7z"/></svg>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700 }}>No entries yet</div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#9AA0AB', lineHeight: 1.5 }}>
            Complete your first reflection today to start your streak!
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18 }}>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 999,
          background: '#F97316', color: '#fff', border: 0, fontSize: 15, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round"><path d="M12 20h9M16.5 3.5l4 4L7 21l-4 1 1-4z"/></svg>
          Write Today's Entry
        </button>
      </div>
    </MTScreen>
  );
}

function JournalEntryWriteScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MTRoundIcon bg="#F1ECE5">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </MTRoundIcon>
        <div style={{ background: '#F1ECE5', borderRadius: 999, padding: '6px 14px', fontSize: 12, color: '#6B7280' }}>Today, 28 Oct</div>
        <MTRoundIcon bg="#F1ECE5">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ padding: '4px 24px' }}>
        <MTOverline>TODAY'S PROMPT</MTOverline>
        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, lineHeight: 1.25 }}>
          What are three small things that made you smile today?
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          {[
            <path key="img" d="M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4"/>,
            <><path key="m1" d="M12 4v12"/><path key="m2" d="M9 8a3 3 0 0 1 6 0v4a3 3 0 0 1-6 0zM5 12a7 7 0 0 0 14 0M12 19v3"/></>,
            <><circle key="e" cx="12" cy="12" r="9"/><path key="e2" d="M9 14c1 1.5 5 1.5 6 0M9 9h0M15 9h0"/></>,
            <path key="h" d="M5 7h14M9 4v16M5 13h14M15 4v16"/>,
          ].map((g, i) => (
            <button key={i} style={{ width: 40, height: 40, borderRadius: 999, background: '#fff',
              border: 0, cursor: 'pointer', boxShadow: '0 1px 2px rgba(15,23,42,.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">{g}</svg>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 26, fontSize: 15, lineHeight: 1.7, color: '#0E1726' }}>
          The morning coffee was perfect today, specifically the foam on top.
          <br/><br/>
          Also, I saw a dog wearing a raincoat on my walk. It looked so proud of itself.
          <br/><br/>
          And finally...
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18, display: 'flex', gap: 10 }}>
        <button style={{ flex: 1, padding: '13px 16px', borderRadius: 999, background: '#F97316',
          color: '#fff', border: 0, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          <MTSparkle size={14} color="#fff"/>
          Go deeper
        </button>
        <button style={{ flex: 1, padding: '13px 16px', borderRadius: 999, background: '#fff',
          color: '#0E1726', border: '1px solid #ECE6DE', fontSize: 14, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer' }}>
          Finish
        </button>
      </div>
    </MTScreen>
  );
}

function JournalDetailScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      <div style={{ position: 'relative', height: 220, paddingTop: 54 }}>
        <PlantHero height={220}/>
        <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <MTRoundIcon bg="rgba(255,255,255,.85)">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <MTRoundIcon bg="rgba(255,255,255,.85)">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"/></svg>
          </MTRoundIcon>
        </div>
      </div>
      <div style={{ marginTop: -24, background: '#FCF6EE', borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '20px 20px 110px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <MTTag color={{ bg: '#FFE4D2', fg: '#C9531A' }}>Daily Practice</MTTag>
          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, color: '#0E1726',
            background: 'transparent', border: '1px solid #ECE6DE', borderRadius: 999 }}>3 Min Focus</span>
          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, color: '#0E1726',
            background: 'transparent', border: '1px solid #ECE6DE', borderRadius: 999 }}>Guided</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em' }}>Daily Gratitude</div>
        <div style={{ marginTop: 8, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
          Shift your mindset with just 3 minutes a day. This guided journal helps you find joy in small moments and build a lasting habit of positivity.
        </div>

        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800 }}>Why this journal?</div>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { t: 'Boosts happiness', g: <><circle cx="12" cy="12" r="9"/><path d="M9 14c1 1.5 5 1.5 6 0M9 9h0M15 9h0"/></> },
            { t: 'Improves sleep', g: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/> },
            { t: 'Self-compassion', g: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
            { t: 'Reduces stress', g: <path d="M13 2L3 14h7l-1 8 10-12h-7z"/> },
          ].map((b, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 14px',
              boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{b.g}</svg>
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700 }}>{b.t}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800 }}>How it works</div>
        <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
          {[
            'Receive a gentle reminder at your preferred time.',
            'Answer 3 simple, guided prompts.',
            'Track your mood and watch your streak grow.',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.4} strokeLinecap="round" style={{ marginTop: 4 }}><path d="M5 12l5 5L20 7"/></svg>
              <span style={{ fontSize: 13, color: '#0E1726', lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800 }}>Your Routine</div>
        <div style={{ marginTop: 10, padding: 14, background: '#fff', borderRadius: 14,
          boxShadow: '0 1px 2px rgba(15,23,42,.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Daily Reminder</div>
            <div style={{ fontSize: 12, color: '#9AA0AB', marginTop: 2 }}>Every day at 8:00 AM</div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 999, background: '#F1ECE5',
            color: '#0E1726', border: 0, fontSize: 12, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>Edit</button>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px',
        background: 'linear-gradient(180deg, rgba(252,246,238,0) 0%, #FCF6EE 30%)',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#9AA0AB' }}>Frequency</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1726' }}>Daily</div>
        </div>
        <button style={{ flex: 1, padding: '14px 16px', borderRadius: 999, background: '#F97316',
          color: '#fff', border: 0, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          Subscribe to Journal
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round"><path d="M15 17h5l-1.4-1.4A6.5 6.5 0 0 0 19 11.5 7 7 0 0 0 5 11M9 21h6"/></svg>
        </button>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { JournalActiveScreen, JournalEntryWriteScreen, JournalDetailScreen, PlantHero });
