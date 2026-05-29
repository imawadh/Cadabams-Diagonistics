/* Therapist booking expansion — Match intake, Slot selection, Booking review, Session details */

function MatchIntakeScreen() {
  const opts = ['Anxiety & Stress', 'Depression & Mood', 'Relationships', 'Trauma & Healing', 'Work & Career', 'Sleep & Insomnia'];
  const [sel, setSel] = React.useState('Anxiety & Stress');
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 20px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: '#ECE6DE', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '20%', height: '100%', background: '#F97316' }}/>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#9AA0AB' }}>Step 1 of 5</div>
      </div>
      <div style={{ padding: '8px 20px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>What would you like to focus on?</div>
        <div style={{ marginTop: 8, fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
          Select all that apply so we can find the best specialist for your needs.
        </div>
      </div>
      <div style={{ padding: '20px 16px 110px', display: 'grid', gap: 10 }}>
        {opts.map(o => {
          const on = o === sel;
          return (
            <button key={o} onClick={() => setSel(o)} style={{
              padding: '16px 16px', borderRadius: 14, fontFamily: 'inherit',
              background: on ? '#FFF8F0' : '#fff',
              border: on ? '1.5px solid #F97316' : '1px solid #ECE6DE',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0E1726' }}>{o}</span>
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
          background: '#F97316', color: '#fff', border: 0, fontSize: 15, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>Continue</button>
      </div>
    </MTScreen>
  );
}

function SlotSelectionScreen() {
  const days = [
    { d: 'Mon', n: 23, s: 'Available', sel: true },
    { d: 'Tue', n: 24, s: 'Available' },
    { d: 'Wed', n: 25, s: 'Few left', warn: true },
    { d: 'Thu', n: 26, s: 'Full', full: true },
    { d: 'Fri', n: 27, s: 'Available' },
    { d: 'Sat', n: 28, s: 'No slots', full: true },
    { d: 'Sun', n: 29, s: 'Available' },
    { d: 'Mon', n: 30, s: 'Few left', warn: true },
    { d: 'Tue', n: 31, s: 'Available' },
    { d: 'Wed', n: 1, s: 'Full', full: true },
  ];
  const morning = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoon = ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', 'No slots'];
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid #ECE6DE' }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Select a slot</div>
      </div>
      <div style={{ margin: '14px 16px 16px', padding: 12, background: '#fff', borderRadius: 14,
        display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <MTAvatar initials="AR" size={48}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Dr. Ananya Reddy</div>
          <div style={{ fontSize: 11, color: '#9AA0AB', marginTop: 2 }}>Clinical Psychologist · 50 min session</div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: '#FFE4D2',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C9531A" strokeWidth={2.2}><path d="M23 7l-7 5 7 5V7zM2 6h12v12H2z"/></svg>
        </div>
      </div>

      <div style={{ padding: '0 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1726' }}>October 2023</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <MTRoundIcon bg="#fff" size={28}>
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <MTRoundIcon bg="#fff" size={28}>
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </MTRoundIcon>
        </div>
      </div>
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {days.map((d, i) => (
          <div key={i} style={{ flex: '0 0 60px', padding: '10px 6px',
            background: '#fff', borderRadius: 12, textAlign: 'center',
            border: d.sel ? '1.5px solid #F97316' : '1px solid #ECE6DE' }}>
            <div style={{ fontSize: 10, color: d.sel ? '#F97316' : '#9AA0AB', fontWeight: 700 }}>{d.d}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: d.sel ? '#F97316' : '#0E1726', margin: '4px 0' }}>{d.n}</div>
            <div style={{ padding: '2px 6px', borderRadius: 6, fontSize: 9, fontWeight: 700,
              background: d.full ? '#FCE4E2' : d.warn ? '#FFE4D2' : '#E6F4EA',
              color: d.full ? '#DC4B45' : d.warn ? '#C9531A' : '#1F8B4C' }}>{d.s}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '4px 20px', fontSize: 14, fontWeight: 800 }}>Available slots for Mon, 23 Oct</div>
      <div style={{ padding: '10px 20px 4px', fontSize: 12, color: '#9AA0AB' }}>Morning</div>
      <div style={{ padding: '6px 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {morning.map(t => {
          const sel = t === '11:30 AM';
          return (
            <div key={t} style={{ padding: '11px 8px', borderRadius: 10, textAlign: 'center',
              background: sel ? '#FFF1E2' : '#fff',
              border: sel ? '1.5px solid #F97316' : '1px solid #ECE6DE',
              fontSize: 12, fontWeight: 700, color: sel ? '#C9531A' : '#0E1726' }}>{t}</div>
          );
        })}
      </div>
      <div style={{ padding: '4px 20px', fontSize: 12, color: '#9AA0AB' }}>Afternoon</div>
      <div style={{ padding: '6px 16px 110px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {afternoon.map((t, i) => {
          const dis = t === 'No slots';
          return (
            <div key={i} style={{ padding: '11px 8px', borderRadius: 10, textAlign: 'center',
              background: '#fff', border: '1px solid #ECE6DE',
              fontSize: 12, fontWeight: 700, color: dis ? '#C5C5C5' : '#0E1726' }}>{t}</div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px',
        background: 'linear-gradient(180deg, rgba(252,246,238,0) 0%, #FCF6EE 30%)',
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>₹1,800</div>
          <div style={{ fontSize: 11, color: '#9AA0AB' }}>Per 50 min session</div>
        </div>
        <button style={{ flex: 1, padding: '14px 16px', borderRadius: 999, background: '#F97316',
          color: '#fff', border: 0, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>Confirm booking</button>
      </div>
    </MTScreen>
  );
}

function BookingReviewScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Review Booking</div>
      </div>
      <div style={{ margin: '14px 16px 12px', padding: 14, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <MTAvatar initials="AR" size={44}/>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Dr. Ananya Reddy</div>
            <div style={{ fontSize: 11, color: '#9AA0AB' }}>Clinical Psychologist</div>
          </div>
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F1ECE5', display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2} style={{ marginTop: 2 }}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
            <div>
              <div style={{ fontSize: 11, color: '#9AA0AB' }}>Date & Time</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Mon, 23 Oct · 11:30 AM</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2} style={{ marginTop: 2 }}><path d="M23 7l-7 5 7 5V7zM2 6h12v12H2z"/></svg>
            <div>
              <div style={{ fontSize: 11, color: '#9AA0AB' }}>Session Type</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Video Consultation (50 min)</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 16px 12px', padding: 14, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ fontSize: 12, color: '#9AA0AB' }}>Payment Method</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 22, borderRadius: 5, background: '#F1ECE5' }}/>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>•••• 4242</span>
          <button style={{ background: 'none', border: 0, color: '#F97316', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', cursor: 'pointer' }}>Change</button>
        </div>
      </div>

      <div style={{ margin: '0 16px 12px', padding: 14, background: '#fff', borderRadius: 16,
        boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B7280', padding: '6px 0' }}>
          <span>Session Fee</span><span>₹1,800.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B7280', padding: '6px 0',
          borderBottom: '1px solid #F1ECE5' }}>
          <span>Taxes & Fees</span><span>₹90.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, padding: '10px 0 0' }}>
          <span>Total</span><span>₹1,890.00</span>
        </div>
      </div>

      <div style={{ padding: '6px 24px', fontSize: 12, color: '#9AA0AB', lineHeight: 1.5 }}>
        Free cancellation until 24 hours before the session. Cancellations made after that time may be charged a 50% fee.
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18 }}>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 999,
          background: '#F97316', color: '#fff', border: 0, fontSize: 15, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>Pay & Book Appointment</button>
      </div>
    </MTScreen>
  );
}

function SessionDetailsScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </MTRoundIcon>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Session Details</div>
        <MTRoundIcon bg="#fff">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 96, height: 96, borderRadius: 999,
            background: 'linear-gradient(135deg,#FBB7BC,#F97316)',
            border: '3px solid #fff', boxShadow: '0 4px 12px rgba(15,23,42,.08)' }}/>
          <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: 999,
            background: '#1F8B4C', border: '2px solid #fff' }}/>
        </div>
        <div style={{ marginTop: 14, fontSize: 18, fontWeight: 800 }}>Dr. Ananya Reddy</div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Clinical Psychologist · PhD</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          {['Anxiety', 'Depression', 'Stress'].map(t => (
            <span key={t} style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600,
              background: '#F1ECE5', color: '#4A5260', borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ margin: '20px 16px 12px', padding: 14, background: '#fff', borderRadius: 14,
        display: 'flex', boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
        <div style={{ flex: 1, paddingRight: 12, borderRight: '1px solid #F1ECE5' }}>
          <div style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 700, letterSpacing: '0.06em' }}>DATE & TIME</div>
          <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
            <span style={{ fontSize: 14, fontWeight: 800 }}>Today, 4:00 PM</span>
          </div>
        </div>
        <div style={{ flex: 1, paddingLeft: 12 }}>
          <div style={{ fontSize: 10, color: '#9AA0AB', fontWeight: 700, letterSpacing: '0.06em' }}>TYPE</div>
          <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}><path d="M23 7l-7 5 7 5V7zM2 6h12v12H2z"/></svg>
            <span style={{ fontSize: 14, fontWeight: 800 }}>Video Call</span>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 16px 8px' }}>
        <button style={{ width: '100%', padding: '15px 20px', borderRadius: 999,
          background: '#F97316', color: '#fff', border: 0, fontSize: 15, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, boxShadow: '0 8px 18px rgba(249,115,22,.32)' }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2}><path d="M23 7l-7 5 7 5V7zM2 6h12v12H2z"/></svg>
          Join Session
        </button>
        <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: '#9AA0AB' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            You can join 10 minutes before start time
          </span>
        </div>
      </div>

      <div style={{ margin: '14px 20px 8px', fontSize: 16, fontWeight: 800 }}>Prepare for Session</div>
      <div style={{ margin: '0 16px 14px', display: 'grid', gap: 10 }}>
        {[
          { tint: 'green', t: 'Pre-session Check-in', s: 'Completed 2 hours ago', done: true,
            g: <><rect x="3" y="5" width="14" height="16" rx="2"/><path d="M9 9l2 2 4-4"/></> },
          { tint: 'orange', t: 'Share Journal', s: 'Select entries to share with Dr. Reddy',
            g: <><rect x="3" y="3" width="9" height="18"/><rect x="12" y="3" width="9" height="18"/></> },
          { tint: 'blue', t: 'Previous Notes', s: 'Review notes from last session',
            g: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></> },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: MT_TINTS[c.tint].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MT_TINTS[c.tint].fg} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{c.g}</svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: '#9AA0AB', marginTop: 2 }}>{c.s}</div>
            </div>
            {c.done
              ? <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1F8B4C" strokeWidth={2.4} strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
              : <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2.4} strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18, display: 'flex', gap: 10 }}>
        <button style={{ flex: 1, padding: '13px 16px', borderRadius: 999, background: '#fff',
          color: '#0E1726', border: '1px solid #ECE6DE', fontSize: 13, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', gap: 6 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M16 14l-3 3-2-2"/></svg>
          Reschedule
        </button>
        <button style={{ flex: 1, padding: '13px 16px', borderRadius: 999, background: '#fff',
          color: '#DC4B45', border: '1px solid #FCE4E2', fontSize: 13, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', gap: 6 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#DC4B45" strokeWidth={2.2}><circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/></svg>
          Cancel
        </button>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { MatchIntakeScreen, SlotSelectionScreen, BookingReviewScreen, SessionDetailsScreen });
