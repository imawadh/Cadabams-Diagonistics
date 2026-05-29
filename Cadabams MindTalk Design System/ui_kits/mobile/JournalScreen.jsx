/* Journal landing — safe space for thoughts and feelings. Free Flow hero, guided reflections, daily gratitude. */

function JournalScreen() {
  return (
    <MTScreen>
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Journal</div>
          <div style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>Your safe space for thoughts and feelings.</div>
        </div>
        <MTAvatar src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23FBB7BC'/%3E%3Ccircle cx='32' cy='26' r='11' fill='%23FFE4D2'/%3E%3Cpath d='M14 60c2-12 11-18 18-18s16 6 18 18z' fill='%23FFE4D2'/%3E%3C/svg%3E" size={40} ring />
      </div>

      {/* Free Flow gradient hero */}
      <div style={{ margin: '14px 16px 18px', borderRadius: 24,
        background: 'linear-gradient(90deg,#F77268 0%,#F97316 100%)', padding: 20, color: '#fff',
        boxShadow: '0 12px 28px rgba(247,114,104,.22)', display: 'flex', alignItems: 'center', gap: 12,
        position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: 999, background: 'rgba(255,255,255,.08)' }}/>
        <div style={{ position: 'absolute', right: 30, bottom: -30, width: 80, height: 80, borderRadius: 999, background: 'rgba(255,255,255,.06)' }}/>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ fontSize: 24, fontWeight: 800 }}>Free Flow</div>
          <div style={{ fontSize: 13, opacity: 0.95, marginTop: 4 }}>Write whatever is on your mind. No prompts, just you.</div>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: 999, background: 'rgba(255,255,255,.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
        </div>
      </div>

      {/* Guided reflection */}
      <div style={{ margin: '0 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>Guided Reflection</div>
        <button style={{ background: 'none', border: 0, color: '#F97316', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>View All</button>
      </div>
      <div style={{ margin: '0 16px 22px', display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        <ReflectionCard tint="blue" title="Gratitude" sub="3 min focus" glyph={
          <svg viewBox="0 0 24 24" fill="none" stroke="#2C7BE5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>
        }/>
        <ReflectionCard tint="purple" title="Sleep Log" sub="Evening reset" glyph={
          <svg viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        }/>
        <ReflectionCard tint="green" title="Anxiety" sub="5 min unwind" glyph={
          <svg viewBox="0 0 24 24" fill="none" stroke="#1F8B4C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h13a3 3 0 1 0-3-3M3 14h17a3 3 0 1 1-3 3"/></svg>
        }/>
      </div>

      {/* Daily Gratitude card */}
      <MTCard style={{ margin: '0 16px 18px', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Daily Gratitude</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Your daily mindful pause</div>
          </div>
          <span style={{ padding: '4px 10px', background: '#F4F2EE', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#6B7280' }}>0 day streak</span>
        </div>

        <div style={{ marginTop: 14, background: '#FAF7F4', borderRadius: 999, padding: 4,
          display: 'flex', justifyContent: 'space-between' }}>
          {[
            ['M','24'],['T','25'],['W','26'],['T','27'],['F','28'],['S','29'],['S','30']
          ].map(([w, n], i) => {
            const active = i === 4;
            return (
              <div key={n} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '8px 0', flex: 1, borderRadius: 999,
                background: active ? '#F97316' : 'transparent',
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#fff' : '#6B7280' }}>{w}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: active ? '#fff' : '#0E1726', fontFeatureSettings: '"tnum" 1' }}>{n}</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: '#FFF8F0' }}>
          <MTOverline>Today's prompt</MTOverline>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0E1726', marginTop: 6, lineHeight: 1.35 }}>
            What are three small things that made you smile today?
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B7280' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/></svg>
              3 min
            </span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth={2}><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1"/></svg>
              Guided
            </span>
          </div>
        </div>
      </MTCard>

      {/* Past entry preview */}
      <MTCard style={{ margin: '0 16px 110px' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>28</div>
            <div style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 600 }}>OCT</div>
          </div>
          <div style={{ flex: 1, borderLeft: '1px solid #ECE6DE', paddingLeft: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Three small joys from today 😊</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2, lineHeight: 1.45 }}>
              The morning coffee was perfect today, specifically the foam on top. Also, I saw a dog wearing a raincoat…
            </div>
          </div>
        </div>
      </MTCard>

      <MTTabBar active="home" onChange={() => {}} />
    </MTScreen>
  );
}

function ReflectionCard({ tint, title, sub, glyph }) {
  return (
    <div style={{ flex: '0 0 44%', background: '#fff', borderRadius: 18, padding: 14,
      boxShadow: '0 2px 6px rgba(15,23,42,.05),0 6px 16px rgba(15,23,42,.04)' }}>
      <MTGlyphTile tint={tint}>{glyph}</MTGlyphTile>
      <div style={{ fontSize: 14, fontWeight: 800, marginTop: 12 }}>{title}</div>
      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { JournalScreen });
