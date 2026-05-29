/* Therapist booking — find your therapist. Match CTA, filter chips, recommended cards. */

const THERAPISTS = [
  { id: 'ananya', name: 'Dr. Ananya Reddy', cred: 'Clinical Psychologist · M.Phil', tags: ['Anxiety','Depression','+2'], rating: 4.9, fee: '₹1,800', initials: 'AR', avatar: 'linear-gradient(135deg,#FBB7BC,#F97316)' },
  { id: 'david', name: 'Dr. David Cohen', cred: 'Psychotherapist · PhD', tags: ['Trauma','Relationships','CBT'], rating: 4.8, fee: '₹2,500', initials: 'DC', avatar: 'linear-gradient(135deg,#A89AC8,#6C5CE7)' },
];

function TherapistsScreen() {
  const [filter, setFilter] = React.useState('all');
  return (
    <MTScreen>
      <MTTopBar
        title=""
        right={<MTRoundIcon><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg></MTRoundIcon>}
      />
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 14 }}>Find your therapist</div>
      </div>

      {/* Match CTA hero — compact */}
      <div style={{ margin: '0 16px 14px', borderRadius: 22,
        background: 'linear-gradient(135deg,#F77268 0%,#F97316 100%)', padding: '14px 16px', color: '#fff',
        boxShadow: '0 10px 24px rgba(247,114,104,.22)', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: 999, background: 'rgba(255,255,255,.08)' }}/>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>Not sure who to choose?</div>
          <div style={{ fontSize: 12, opacity: 0.95, marginTop: 2 }}>
            Answer a few questions, get matched.
          </div>
        </div>
        <button style={{ background: '#fff', color: '#F97316', border: 0, position: 'relative',
          padding: '9px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: 'pointer',
          fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Match me →
        </button>
      </div>

      {/* Filter chips */}
      <div style={{ margin: '0 16px 18px', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        <MTChip active={filter==='all'} onClick={() => setFilter('all')}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
            All Filters
          </span>
        </MTChip>
        <MTChip onClick={() => setFilter('lang')}>Language ▾</MTChip>
        <MTChip onClick={() => setFilter('avail')}>Availability ▾</MTChip>
        <MTChip onClick={() => setFilter('fee')}>Fee ▾</MTChip>
      </div>

      <div style={{ margin: '0 16px 12px', fontSize: 17, fontWeight: 800 }}>Recommended for you</div>

      <div style={{ margin: '0 16px 130px', display: 'grid', gap: 12 }}>
        {THERAPISTS.map(t => <TherapistCard key={t.id} t={t} />)}
      </div>

      <MTTabBar active="appts" />
    </MTScreen>
  );
}

function TherapistCard({ t }) {
  return (
    <MTCard padding={14}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: t.avatar, display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>
            {t.initials}
          </div>
          <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
            background: '#fff', borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 700,
            color: '#0E1726', boxShadow: '0 2px 6px rgba(15,23,42,.1)',
            display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <span style={{ color: '#F7C44A', fontSize: 11 }}>★</span>{t.rating}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0E1726' }}>{t.name}</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{t.cred}</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {t.tags.map(tag => <MTTag key={tag}>{tag}</MTTag>)}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #ECE6DE',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9AA0AB', letterSpacing: '0.06em' }}>SESSION FEE</div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{t.fee}</div>
        </div>
        <MTButton variant="dark" size="sm">Book Now</MTButton>
      </div>
    </MTCard>
  );
}

Object.assign(window, { TherapistsScreen });
