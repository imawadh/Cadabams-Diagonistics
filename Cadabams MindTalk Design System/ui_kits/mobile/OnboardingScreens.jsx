/* Onboarding screens — Country select, Phone login, Option select bottom sheet. */

const COUNTRIES = [
  { flag: '🇦🇺', name: 'Australia', code: '+61' },
  { flag: '🇧🇷', name: 'Brazil', code: '+55' },
  { flag: '🇨🇦', name: 'Canada', code: '+1' },
  { flag: '🇫🇷', name: 'France', code: '+33' },
  { flag: '🇩🇪', name: 'Germany', code: '+49' },
  { flag: '🇮🇹', name: 'Italy', code: '+39' },
  { flag: '🇯🇵', name: 'Japan', code: '+81' },
  { flag: '🇲🇽', name: 'Mexico', code: '+52' },
  { flag: '🇳🇿', name: 'New Zealand', code: '+64' },
  { flag: '🇸🇬', name: 'Singapore', code: '+65' },
  { flag: '🇿🇦', name: 'South Africa', code: '+27' },
];

function CountrySelectScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE' }}>
      <div style={{ padding: '4px 16px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #ECE6DE' }}>
        <div style={{ width: 32 }}/>
        <div style={{ fontSize: 16, fontWeight: 800 }}>Select Country</div>
        <MTRoundIcon bg="#fff">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </MTRoundIcon>
      </div>
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 1px 2px rgba(15,23,42,.04)' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9AA0AB" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
          <span style={{ fontSize: 13, color: '#9AA0AB' }}>Search country or code</span>
        </div>
      </div>
      <div style={{ padding: '8px 22px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#9AA0AB' }}>SUGGESTED</div>
      <div style={{ margin: '4px 16px 12px', padding: '12px 14px',
        background: '#FFF8F0', border: '1.5px solid #F97316', borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>🇮🇳</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#F97316' }}>India</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#F97316' }}>+91</span>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.4} strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
      </div>
      <div style={{ margin: '0 16px 8px', padding: '10px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>🇺🇸</span>
        <span style={{ flex: 1, fontSize: 14, color: '#0E1726' }}>United States</span>
        <span style={{ fontSize: 12, color: '#9AA0AB' }}>+1</span>
      </div>
      <div style={{ padding: '12px 22px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#9AA0AB' }}>ALL COUNTRIES</div>
      <div style={{ margin: '0 16px 110px' }}>
        {COUNTRIES.map(c => (
          <div key={c.name} style={{ padding: '10px 6px', display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid #F1ECE5' }}>
            <span style={{ fontSize: 18 }}>{c.flag}</span>
            <span style={{ flex: 1, fontSize: 14, color: '#0E1726' }}>{c.name}</span>
            <span style={{ fontSize: 12, color: '#9AA0AB' }}>{c.code}</span>
          </div>
        ))}
      </div>
    </MTScreen>
  );
}

function PhoneLoginScreen() {
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 0 }}>
      {/* Silk-flow hero — layered translucent ribbons */}
      <div style={{ height: 360, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg,#F4ECE8 0%, #F8EFE8 40%, #FCF6EE 100%)' }}>
        <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            {/* Painterly silk gradients */}
            <linearGradient id="silkA" x1="0%" y1="50%" x2="100%" y2="40%">
              <stop offset="0%" stopColor="#E8B5A0" stopOpacity="0"/>
              <stop offset="20%" stopColor="#E8B5A0" stopOpacity="0.55"/>
              <stop offset="50%" stopColor="#F2C9B0" stopOpacity="0.78"/>
              <stop offset="80%" stopColor="#D8AEB8" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#C8B8D0" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="silkB" x1="0%" y1="40%" x2="100%" y2="60%">
              <stop offset="0%" stopColor="#F2C9B0" stopOpacity="0"/>
              <stop offset="30%" stopColor="#EFC4B5" stopOpacity="0.6"/>
              <stop offset="60%" stopColor="#E5B8C5" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#D5C5DA" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="silkC" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#F8DCC8" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#E5B8A8" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="silkHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0"/>
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="silkGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFE5D6" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#FFE5D6" stopOpacity="0"/>
            </radialGradient>
            <filter id="silkBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.2"/>
            </filter>
            <filter id="silkSoft" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3"/>
            </filter>
          </defs>

          {/* Ambient glow */}
          <rect width="400" height="360" fill="url(#silkGlow)"/>

          {/* Main draping ribbon — wide arc */}
          <path d="M-40 150
                   C 60 90, 140 230, 220 150
                   S 360 100, 440 140
                   L 440 230
                   C 360 260, 280 200, 200 240
                   S 60 270, -40 220 Z"
                fill="url(#silkA)" filter="url(#silkBlur)"/>

          {/* Secondary fold underneath */}
          <path d="M-40 200
                   C 80 160, 160 280, 260 200
                   S 380 240, 440 210
                   L 440 280
                   C 360 320, 240 250, 140 290
                   S -40 290, -40 290 Z"
                fill="url(#silkB)" filter="url(#silkBlur)" opacity="0.85"/>

          {/* Upper wisp */}
          <path d="M40 80
                   C 120 50, 200 130, 300 80
                   S 420 100, 420 100
                   L 420 130
                   C 340 160, 220 110, 140 150
                   S 40 130, 40 130 Z"
                fill="url(#silkC)" filter="url(#silkSoft)" opacity="0.7"/>

          {/* Highlight crease — top edge of fold */}
          <path d="M-20 158
                   C 70 100, 150 230, 230 152
                   S 360 110, 440 144"
                fill="none" stroke="url(#silkHighlight)" strokeWidth="2.5"
                opacity="0.55" filter="url(#silkBlur)"/>

          {/* Inner crease shadow */}
          <path d="M0 175
                   C 85 130, 160 250, 240 168
                   S 370 130, 440 158"
                fill="none" stroke="#B8817A" strokeWidth="0.8"
                opacity="0.18" filter="url(#silkBlur)"/>

          {/* Trailing wisp right side */}
          <path d="M260 90
                   C 320 110, 380 80, 440 90
                   L 440 130
                   C 380 130, 320 150, 260 130 Z"
                fill="#E5B8C5" opacity="0.35" filter="url(#silkSoft)"/>

          {/* Trailing wisp left side */}
          <path d="M-40 130
                   C 30 110, 80 150, 130 130
                   L 130 170
                   C 80 190, 30 150, -40 170 Z"
                fill="#EFC4B5" opacity="0.4" filter="url(#silkSoft)"/>

          {/* Final soft highlight */}
          <ellipse cx="220" cy="160" rx="120" ry="22" fill="#FFFFFF" opacity="0.35" filter="url(#silkSoft)"/>
        </svg>
      </div>
      <div style={{ padding: '0 24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff',
          boxShadow: '0 4px 12px rgba(15,23,42,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: -22, marginBottom: 18 }}>
          <MTSparkle size={22} color="#F97316"/>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>Start your journey</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginTop: 8, lineHeight: 1.5 }}>
          Enter your mobile number to sign in or create a new account.
        </div>
        <div style={{ marginTop: 22, display: 'flex', gap: 0, background: '#fff', borderRadius: 14,
          boxShadow: '0 1px 2px rgba(15,23,42,.04)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 6,
            borderRight: '1px solid #ECE6DE', fontSize: 14, fontWeight: 700 }}>
            🇺🇸 +1 <span style={{ color: '#9AA0AB', fontSize: 10 }}>▾</span>
          </div>
          <div style={{ flex: 1, padding: '14px 14px', fontSize: 14, color: '#9AA0AB' }}>Mobile number</div>
        </div>
        <button style={{ width: '100%', marginTop: 12, padding: '15px 20px', borderRadius: 14, border: 0,
          background: 'linear-gradient(135deg,#F77268 0%, #F97316 100%)', color: '#fff',
          fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 8px 18px rgba(247,114,104,.28)' }}>Continue</button>
        <button style={{ width: '100%', marginTop: 10, padding: '15px 20px', borderRadius: 14,
          background: '#fff', color: '#0E1726', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', border: '1px solid #ECE6DE' }}>Sign up</button>
        <div style={{ marginTop: 18, fontSize: 11, color: '#9AA0AB', textAlign: 'center', lineHeight: 1.6 }}>
          By continuing, you agree to our <span style={{ color: '#F97316', fontWeight: 700 }}>Terms of Service</span><br/>
          and <span style={{ color: '#F97316', fontWeight: 700 }}>Privacy Policy</span>.
        </div>
      </div>
    </MTScreen>
  );
}

function OptionSelectScreen() {
  const [selected, setSelected] = React.useState('agree');
  const opts = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  return (
    <MTScreen style={{ background: '#FCF6EE', paddingTop: 54 }}>
      {/* dimmed assessment beneath */}
      <div style={{ padding: '0 20px', opacity: 0.35, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <MTRoundIcon bg="#fff">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M15 6l-6 6 6 6"/></svg>
          </MTRoundIcon>
          <div style={{ flex: 1, marginLeft: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0E1726', textAlign: 'right', marginBottom: 6 }}>Step 3 of 10</div>
            <div style={{ height: 4, background: '#ECE6DE', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: '#F97316' }}/>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#C9531A', textAlign: 'center', letterSpacing: '-0.01em' }}>Adult Attachment Check-in</div>
        <div style={{ fontSize: 13, color: '#0E1726', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
          Rate how characteristic each statement feels in your romantic relationships.
        </div>
        <div style={{ fontSize: 12, color: '#9AA0AB', textAlign: 'center', marginTop: 18 }}>
          Tap to choose a response for each line before continuing.
        </div>
        <div style={{ marginTop: 22, fontSize: 14, color: '#0E1726' }}>I find it relatively easy to get close to people.</div>
        <div style={{ marginTop: 10, padding: '14px 16px', border: '1.5px solid #F97316', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#C9531A', fontSize: 13, fontWeight: 600 }}>Select an option</span>
          <span style={{ width: 22, height: 22, borderRadius: 999, border: '1.5px solid #F97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2.4} strokeLinecap="round"><path d="M6 15l6-6 6 6"/></svg>
          </span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#FCF6EE', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        boxShadow: '0 -10px 28px rgba(15,23,42,.12)', padding: '20px 18px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Choose response</div>
          <MTRoundIcon bg="#fff">
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E1726" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </MTRoundIcon>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {opts.map(o => {
            const id = o.toLowerCase().replace(/\s/g, '-').replace('strongly-', 's-');
            const sel = id === 'agree' && selected === 'agree';
            return (
              <button key={o} onClick={() => setSelected(id)} style={{
                width: '100%', padding: '14px 16px', borderRadius: 14, fontFamily: 'inherit',
                background: sel ? '#FFF8F0' : '#fff',
                border: sel ? '1.5px solid #F97316' : '1px solid #ECE6DE',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: sel ? '#F97316' : '#0E1726' }}>{o}</span>
                <span style={{ width: 22, height: 22, borderRadius: 999,
                  border: sel ? 'none' : '1.5px solid #D9D2C6',
                  background: sel ? '#F97316' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sel && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </MTScreen>
  );
}

Object.assign(window, { CountrySelectScreen, PhoneLoginScreen, OptionSelectScreen });
