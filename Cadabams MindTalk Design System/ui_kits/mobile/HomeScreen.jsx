/* Home screen — primary surface. Greeting, quick actions, journey, daily growth, recommendations. */

const SARAH_AVATAR = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBB7BC"/><stop offset="1" stop-color="#F97316"/></linearGradient></defs>
  <rect width="64" height="64" fill="url(#g)"/>
  <circle cx="32" cy="26" r="11" fill="#FFE4D2"/>
  <path d="M14 60c2-12 11-18 18-18s16 6 18 18z" fill="#FFE4D2"/>
</svg>`);

function HomeScreen() {
  const [mood, setMood] = React.useState(null);
  const moods = [
    { c: '#F7C44A', e: '😄' },
    { c: '#F7A172', e: '🙂' },
    { c: '#F58F9A', e: '😐' },
    { c: '#6FB58A', e: '😌' },
    { c: '#1F4D55', e: '😔' },
    { c: '#DC4B45', e: '😣' },
  ];

  return (
    <MTScreen>
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, color: '#6B7280' }}>Good Morning,</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>Sarah</div>
        </div>
        <MTAvatar src={SARAH_AVATAR} size={44} ring />
      </div>

      {/* Greeting hero */}
      <div style={{ margin: '8px 16px 16px', borderRadius: 28,
        background: 'linear-gradient(135deg,#F58F9A 0%,#F77268 50%,#F97316 100%)',
        padding: 18, color: '#fff', boxShadow: '0 12px 28px rgba(247,114,104,.22)',
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>Hi Sarah, how are you feeling today?</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>Your check-in helps us shape your home, guidance, and support.</div>
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 30 }}>💗</span>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.95 }}>Tap your mood</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {moods.map((m, i) => (
              <button key={i} onClick={() => setMood(i)} style={{
                width: 30, height: 30, borderRadius: 999, background: m.c, border: 0, cursor: 'pointer',
                boxShadow: mood === i ? '0 0 0 2.5px #fff, 0 2px 4px rgba(0,0,0,.18)' : 'inset 0 0 0 1.5px rgba(255,255,255,.4)',
                transform: mood === i ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform .14s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, lineHeight: 1, padding: 0,
                fontFamily: "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
              }}>{m.e}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Ask Dr. Rhea bar */}
      <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 999, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 2px 6px rgba(15,23,42,.05),0 6px 16px rgba(15,23,42,.04)',
      }}>
        <MTSparkle size={16}/>
        <div style={{ flex: 1, fontSize: 13, color: '#6B7280' }}>Ask Dr. Rhea anything…</div>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v3"/></svg>
      </div>

      {/* Therapist match CTA mini-hero */}
      <div style={{ margin: '0 16px 18px' }}>
        <MTOverline color="#C9531A" style={{ marginLeft: 4 }}>Need support?</MTOverline>
        <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
          <MTButton variant="dark" size="sm" style={{ flex: 1 }}>Talk to a therapist</MTButton>
          <MTButton variant="secondary" size="sm" style={{ flex: 1 }}>Browse experts</MTButton>
        </div>
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Quick Actions" />
      <div style={{ margin: '0 16px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickCard tint="blue" title="Assessments" desc="Check anxiety, mood &amp; more." footer="2 new suggested" />
        <QuickCard tint="green" title="Guided journeys" desc="Building blocks for your mind." footer="Day 9 of 90" />
        <QuickCard tint="peach" title="Journal &amp; reflect" desc="Reflections for your guided moments." footer="3-min gratitude" />
        <QuickCard tint="purple" title="Quick relief" desc="Breath, audio, &amp; visual resets." footer="Under 5 min" highlightFooter />
      </div>

      {/* Journey progress */}
      <div style={{ margin: '0 16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Your Journey</div>
        <button style={{ background: 'none', border: 0, color: '#F97316', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View Path</button>
      </div>
      <MTCard style={{ margin: '0 16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#C9531A', letterSpacing: '0.06em' }}>DAILY STREAK · 4 DAYS</div>
            <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4 }}>90 Day Emotional Reset</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Level 2 · Awareness</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1726' }}>30%</div>
        </div>
        <div style={{ marginTop: 12, height: 6, background: '#F4F2EE', borderRadius: 999 }}>
          <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg,#F77268,#F97316)', borderRadius: 999 }}/>
        </div>
      </MTCard>

      {/* Daily growth date strip */}
      <SectionHeader title="Daily Growth" trailing="This week" />
      <div style={{ margin: '0 16px 12px', background: '#fff', borderRadius: 999, padding: 6,
        display: 'flex', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        {['M 12','T 13','W 14','T 15','F 16','S 17','S 18'].map((d, i) => {
          const [w, n] = d.split(' ');
          const active = i === 4;
          return (
            <div key={d} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 0', minWidth: 36, borderRadius: 999, flex: 1,
              background: active ? '#F97316' : 'transparent',
            }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#fff' : '#6B7280' }}>{w}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: active ? '#fff' : '#0E1726' }}>{n}</span>
            </div>
          );
        })}
      </div>

      <div style={{ margin: '0 16px 18px', display: 'grid', gap: 8 }}>
        <ActivityRow tint="green" title="Mood check-in completed" time="11:30 AM" desc="You logged 'Happy' today." />
        <ActivityRow tint="blue" title="Journal reflection saved" time="9:15 AM" desc="3 small things that made you smile." />
        <ActivityRow tint="orange" title="Journey step completed" time="1:40 PM" desc="Day 9 · Identifying triggers." />
      </div>

      {/* Recommended for You */}
      <SectionHeader title="Recommended for You" />
      <div style={{ margin: '0 16px 110px', display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
        <PhotoTile title="Morning Clarity" meta="3 min · Audio" hue={['#FFB87A','#F97316']} />
        <PhotoTile title="Anxiety Relief" meta="6 min · Visual" hue={['#94B8E0','#6FB58A']} />
        <PhotoTile title="Forest Bathing" meta="10 min · Nature" hue={['#5A8A55','#274C2A']} />
      </div>

      <MTTabBar active="home" />
    </MTScreen>
  );
}

function SectionHeader({ title, trailing }) {
  return (
    <div style={{ margin: '0 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 17, fontWeight: 800 }}>{title}</div>
      {trailing && <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{trailing}</div>}
    </div>
  );
}

function QuickCard({ tint, title, desc, footer, highlightFooter }) {
  const c = MT_TINTS[tint];
  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: 14,
      boxShadow: '0 2px 6px rgba(15,23,42,.05),0 6px 16px rgba(15,23,42,.04)' }}>
      <MTGlyphTile tint={tint}>
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 12l2 2 4-4"/></svg>
      </MTGlyphTile>
      <div style={{ fontSize: 14, fontWeight: 800, marginTop: 10 }}>{title}</div>
      <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
      <div style={{ marginTop: 10, display: 'inline-block', padding: '4px 10px', borderRadius: 999,
        fontSize: 10, fontWeight: 700,
        background: highlightFooter ? '#1C2433' : c.bg,
        color: highlightFooter ? '#fff' : c.fg,
      }}>{footer}</div>
    </div>
  );
}

function ActivityRow({ tint, title, time, desc }) {
  const c = MT_TINTS[tint];
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px',
      display: 'flex', gap: 12, alignItems: 'flex-start',
      boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
      <div style={{ width: 8, height: 8, borderRadius: 999, background: c.fg, marginTop: 6, flexShrink: 0 }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ fontSize: 10.5, color: '#9AA0AB', fontWeight: 600 }}>{time}</div>
    </div>
  );
}

function PhotoTile({ title, meta, hue = ['#FFB87A','#F97316'] }) {
  return (
    <div style={{ flex: '0 0 65%', position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '1.4',
      boxShadow: '0 2px 6px rgba(15,23,42,.08),0 6px 16px rgba(15,23,42,.06)',
      background: `radial-gradient(circle at 30% 70%, ${hue[0]} 0%, ${hue[1]} 70%)` }}>
      <div style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: 'rgba(0,0,0,.45)',
        borderRadius: 999, fontSize: 10, fontWeight: 700, color: '#fff' }}>{meta}</div>
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, color: '#fff' }}>
        <div style={{ fontSize: 16, fontWeight: 800 }}>{title}</div>
      </div>
      <div style={{ position: 'absolute', right: 12, bottom: 12, width: 36, height: 36, borderRadius: 999,
        background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 16px rgba(0,0,0,.3)' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
