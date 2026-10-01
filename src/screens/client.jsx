// Client side: premium/dark. Home, Prenota, Percorso, Profilo, Notifiche.
import { Icon, Button, ServicePill, BrandRule } from '../components/ds.jsx'

const MS = 'Montserrat,sans-serif'
const BEBAS = "'Bebas Neue',sans-serif"
const SERIF = "'Instrument Serif',serif"
export const caps = (color, size = 11, ls = '.18em') => ({ font: `600 ${size}px ${MS}`, letterSpacing: ls, color })
const sub = { font: `500 12px ${MS}`, color: '#BFC5C8', marginTop: 3 }
const roundBtn = { width: 44, height: 44, borderRadius: 999, border: 0, background: '#1A1D20', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }
const iconRow = { display: 'flex', gap: 6, alignItems: 'center' }
const page = gap => ({ padding: '12px 20px 32px', display: 'flex', flexDirection: 'column', gap })

export function Check({ ring, fill, tick }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: 999, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .24s ease-out', border: `1.5px solid ${ring}`, background: fill }}>
      <Icon name="check" size={16} color={tick} />
    </div>
  )
}

export function Home({ v }) {
  const n = v.next
  return (
    <div style={page(24)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: `400 26px/1 ${SERIF}`, fontStyle: 'italic', color: '#BFC5C8' }}>Ciao,</div>
          <div style={{ font: `400 56px/.92 ${BEBAS}` }}>FRANCESCA</div>
        </div>
        <button onClick={v.goNotifs} aria-label="Notifiche" style={{ ...roundBtn, position: 'relative' }}>
          <Icon name="bell" size={20} color="#fff" />
          {v.hasUnread && (
            <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, borderRadius: 99, background: '#2486AB', font: `700 10px/16px ${MS}`, color: '#fff', textAlign: 'center', padding: '0 4px', boxSizing: 'border-box' }}>{v.unread}</span>
          )}
        </button>
      </div>

      {v.hasNext && (
        <div onClick={v.openNext} style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, background: '#2486AB', padding: '22px 22px 20px', cursor: 'pointer', minHeight: 176, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', right: -90, top: -70, width: 250, height: 250, borderRadius: '50%', border: '34px solid rgba(255,255,255,.14)' }} />
          <div style={{ position: 'relative', ...caps('inherit') }}>PROSSIMA LEZIONE</div>
          <div style={{ position: 'relative' }}>
            <div style={{ font: `400 44px/.95 ${BEBAS}` }}>{n.name}</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 10, font: `500 14px ${MS}`, flexWrap: 'wrap' }}>
              <span style={iconRow}><Icon name="calendar" size={15} color="#fff" />{n.day}</span>
              <span style={iconRow}><Icon name="clock" size={15} color="#fff" />{n.time}</span>
              <span style={iconRow}><Icon name="user-round" size={15} color="#fff" />{n.trainer}</span>
            </div>
          </div>
        </div>
      )}
      {v.noNext && (
        <div style={{ borderRadius: 20, background: '#1A1D20', padding: 22, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ font: `400 32px/.95 ${BEBAS}` }}>NESSUNA LEZIONE IN PROGRAMMA</div>
          <Button variant="primary" size="md" onClick={v.goOrari}>Prenota ora</Button>
        </div>
      )}

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, background: '#fff', color: '#0B0D0F', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ position: 'absolute', right: -60, bottom: -80, width: 200, height: 200, borderRadius: '50%', background: '#EEF7FB' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <div>
            <div style={caps('#1E7194')}>IL TUO PACCHETTO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
              <span style={{ font: `400 60px/1 ${BEBAS}` }}>{v.credits}</span>
              <span style={{ font: `500 13px ${MS}`, color: '#6B7479' }}>lezioni su {v.total}</span>
            </div>
          </div>
          <span style={{ font: `500 12px ${MS}`, color: '#6B7479', paddingBottom: 6 }}>Scade il 31 dic</span>
        </div>
        <div style={{ position: 'relative', display: 'flex', gap: 3 }}>
          {v.creditDots.map((p, k) => <div key={k} style={{ flex: 1, height: 8, borderRadius: 2, background: p.bg }} />)}
        </div>
        {v.renewPending && (
          <div style={{ position: 'relative', display: 'flex', gap: 10, alignItems: 'center', font: `600 13px ${MS}` }}>
            <Icon name="hourglass" size={16} color="#2486AB" />
            <span>{v.renewText}: Andrea conferma, saldi in studio.</span>
          </div>
        )}
        {v.renewAvail && <Button variant="primary" size="sm" onClick={v.openRenew} style={{ position: 'relative', alignSelf: 'flex-start' }}>Richiedi rinnovo</Button>}
      </div>

      {v.hasOthers && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={caps('#BFC5C8')}>ALTRE PRENOTAZIONI</div>
          {v.others.map(m => (
            <div key={m.id} onClick={m.onOpen} style={{ borderRadius: 8, background: '#1A1D20', padding: '12px 14px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 52, borderRadius: 8, background: m.color, color: '#0B0D0F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <span style={{ font: `700 10px ${MS}`, letterSpacing: '.08em' }}>{m.k}</span>
                <span style={{ font: `400 24px/1 ${BEBAS}` }}>{m.n}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `600 15px ${MS}` }}>{m.name}</div>
                <div style={sub}>{m.dtime} · {m.trainer}</div>
              </div>
              <Icon name="chevron-right" size={18} color="#6B7479" />
            </div>
          ))}
        </div>
      )}

      {v.myFixed.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={caps('#BFC5C8')}>IL TUO POSTO FISSO</div>
          {v.myFixed.map(f => (
            <div key={f.id} style={{ borderRadius: 8, background: '#1A1D20', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, font: `600 14px ${MS}` }}>
              <Icon name="calendar" size={18} color="#3F9CC4" />{f.text}
            </div>
          ))}
        </div>
      )}

      {v.hasWaits && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={caps('#BFC5C8')}>LISTA D’ATTESA</div>
          {v.waits.map(w => (
            <div key={w.id} style={{ borderRadius: 8, background: '#1A1D20', padding: '12px 12px 12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="hourglass" size={18} color="#3F9CC4" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `600 14px ${MS}` }}>{w.name}</div>
                <div style={sub}>{w.when}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={w.onLeave}>Esci</Button>
            </div>
          ))}
          <div style={{ font: `500 12px/1.45 ${MS}`, color: '#BFC5C8' }}>{v.waitRuleText}</div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', font: `500 12px/1.45 ${MS}`, color: '#BFC5C8' }}>
        <Icon name="info" size={16} color="#2486AB" />
        <span>{v.cancelRuleText}</span>
      </div>
    </div>
  )
}

export function Orari({ v }) {
  return (
    <div style={{ padding: '12px 0 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ padding: '0 20px' }}>
        <div style={{ font: `400 48px/.92 ${BEBAS}` }}>PRENOTA</div>
        <div style={{ font: `500 13px ${MS}`, color: '#BFC5C8', marginTop: 4 }}>28 settembre – 3 ottobre</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {v.days.map(d => (
          <button key={d.k} onClick={d.onPick} aria-pressed={d.active} style={{ flex: 'none', width: 52, height: 68, borderRadius: 8, border: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transition: 'background .24s ease-out', background: d.bg, color: '#fff' }}>
            <span style={{ font: `600 11px ${MS}`, letterSpacing: '.08em' }}>{d.k}</span>
            <span style={{ font: `400 28px/1 ${BEBAS}` }}>{d.n}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {v.filters.map(f => (
          <ServicePill key={f.label} active={f.active} onClick={f.onPick} style={{ flex: 'none', minHeight: 44, padding: '0 16px', boxSizing: 'border-box' }}>{f.label}</ServicePill>
        ))}
      </div>
      <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <span style={{ font: `400 26px/1 ${SERIF}` }}>{v.dayFull}</span>
        {v.offline && <span style={{ font: `500 11px ${MS}`, color: '#BFC5C8' }}>Aggiornati alle 9:32</span>}
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {v.loading && v.skel.map(k => (
          <div key={k} aria-hidden="true" style={{ height: 68, borderRadius: 8, background: '#1A1D20', display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', animation: 'bePulse 1.2s ease-in-out infinite' }}>
            <div style={{ width: 44, height: 22, borderRadius: 4, background: '#283A3E' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: '60%', height: 12, borderRadius: 4, background: '#283A3E' }} />
              <div style={{ width: '40%', height: 10, borderRadius: 4, background: '#283A3E' }} />
            </div>
          </div>
        ))}
        {v.notLoading && (
          <>
            {v.classes.map(c => (
              <div key={c.id} onClick={c.onOpen} role="button" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 14px 14px 0', borderRadius: 8, background: '#1A1D20', cursor: 'pointer', overflow: 'hidden', opacity: c.opacity }}>
                <div style={{ width: 5, alignSelf: 'stretch', background: c.color }} />
                <div style={{ font: `400 28px/1 ${BEBAS}`, width: 56 }}>{c.dtime}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: `600 15px ${MS}` }}>{c.name}</div>
                  <div style={sub}>{c.sub}</div>
                </div>
                <div style={{ font: `700 11px ${MS}`, letterSpacing: '.08em', padding: '8px 12px', borderRadius: 999, background: c.tagBg, color: c.tagFg }}>{c.tag}</div>
              </div>
            ))}
            {v.emptyDay && <div style={{ padding: '32px 0', textAlign: 'center', font: `500 14px ${MS}`, color: '#BFC5C8' }}>Nessun corso per questo filtro.</div>}
          </>
        )}
      </div>
    </div>
  )
}

export function Percorso({ v }) {
  return (
    <div style={page(22)}>
      <div>
        <div style={caps('#BFC5C8')}>SETTIMANA 6 DI 8 · CON ANDREA</div>
        <div style={{ font: `400 48px/.92 ${BEBAS}`, marginTop: 6 }}>IL MIO PERCORSO</div>
        <div style={{ font: `500 13px ${MS}`, color: '#BFC5C8', marginTop: 6 }}>Obiettivo: tonificazione e postura</div>
      </div>
      <div role="tablist" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 'minmax(0,1fr)', padding: 4, borderRadius: 999, background: '#1A1D20', gap: 4 }}>
        {v.subs.map(r => (
          <button key={r.label} role="tab" aria-selected={r.active} onClick={r.onPick} style={{ height: 44, border: 0, borderRadius: 999, cursor: 'pointer', font: `600 13px ${MS}`, transition: 'background .24s ease-out', background: r.bg, color: r.fg }}>{r.label}</button>
        ))}
      </div>
      {v.subPiano && <Piano v={v} />}
      {v.subProg && <Progressi v={v} />}
    </div>
  )
}

function Piano({ v }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, background: '#2486AB', padding: 20 }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 220, height: 220, borderRadius: '50%', border: '30px solid rgba(255,255,255,.14)' }} />
        <div style={{ position: 'relative', ...caps('inherit') }}>ALLENAMENTO DI OGGI · 40 MIN</div>
        <div style={{ position: 'relative', font: `400 40px/.95 ${BEBAS}`, marginTop: 6 }}>CORE &amp; POSTURA</div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,.28)', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#fff', borderRadius: 99, transition: 'width .24s ease-out', width: v.exPct }} />
          </div>
          <span style={{ font: `600 13px ${MS}` }}>{v.exDoneN}/{v.exTotal} esercizi</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {v.exercises.map(e => (
          <button key={e.name} onClick={e.onToggle} aria-pressed={e.done} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', border: 0, borderBottom: '1px solid rgba(255,255,255,.14)', background: 'none', color: '#fff', textAlign: 'left', cursor: 'pointer', minHeight: 56 }}>
            <Check {...e} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: `600 15px ${MS}`, opacity: e.op }}>{e.name}</div>
              <div style={sub}>{e.detail}</div>
            </div>
          </button>
        ))}
      </div>
      <Button variant={v.completeVariant} size="lg" onClick={v.completeWorkout} style={{ width: '100%' }}>{v.completeLabel}</Button>
      <div style={{ borderRadius: 20, background: '#fff', color: '#0B0D0F', padding: '18px 20px' }}>
        <div style={caps('#1E7194')}>NOTA DI ANDREA</div>
        <div style={{ font: `400 24px/1.15 ${SERIF}`, marginTop: 8 }}>“{v.trainerNote}”</div>
      </div>
    </div>
  )
}

function Progressi({ v }) {
  const tile = { borderRadius: 8, background: '#1A1D20', padding: '14px 16px' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={tile}><div style={{ font: `400 40px/1 ${BEBAS}` }}>{v.totalSessions}</div><div style={sub}>sessioni completate</div></div>
        <div style={tile}><div style={{ font: `400 40px/1 ${BEBAS}` }}>5 SETT.</div><div style={sub}>di costanza di fila</div></div>
      </div>
      <div style={{ borderRadius: 8, background: '#1A1D20', padding: 16 }}>
        <div style={{ ...caps('#BFC5C8'), marginBottom: 14 }}>SESSIONI A SETTIMANA</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
          {v.bars.map(b => (
            <div key={b.l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ font: `600 11px ${MS}` }}>{b.v}</span>
              <div style={{ width: '100%', borderRadius: '4px 4px 0 0', transition: 'height .24s ease-out', height: b.h, background: b.bg }} />
              <span style={{ font: `600 10px ${MS}`, color: '#BFC5C8' }}>{b.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
        <span style={{ font: `400 30px/1 ${SERIF}` }}>Misure</span>
        <span style={{ font: `500 12px ${MS}`, color: '#BFC5C8' }}>Aggiornate: {v.measDate}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
        {v.meas.map(m => (
          <div key={m.label} style={{ borderRadius: 8, background: '#1A1D20', padding: 12 }}>
            <div style={caps('#BFC5C8', 10, '.14em')}>{m.label}</div>
            <div style={{ font: `400 28px/1 ${BEBAS}`, marginTop: 6 }}>{m.val}<span style={{ font: `500 11px ${MS}`, color: '#BFC5C8' }}> {m.unit}</span></div>
            <div style={{ font: `600 12px ${MS}`, color: '#3F9CC4', marginTop: 2 }}>{m.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ font: `500 12px ${MS}`, color: '#BFC5C8', marginTop: -8 }}>Variazione dall’inizio del percorso (1 settembre)</div>
      <Button variant="outline" size="md" onClick={v.openMeasure} style={{ width: '100%' }}>Aggiorna misure</Button>
      <div style={{ font: `400 30px/1 ${SERIF}`, marginTop: 8 }}>Prima e dopo</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {v.photos.map(p => (
          <button key={p.label} onClick={p.onPick} style={{ aspectRatio: '3/4', borderRadius: 8, border: '1.5px dashed #6B7479', background: '#0B0D0F', color: '#BFC5C8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            <Icon name="camera" size={22} color="#BFC5C8" />
            <span style={{ font: `600 13px ${MS}`, color: '#fff' }}>{p.label}</span>
            <span style={{ font: `500 11px ${MS}` }}>Tocca per aggiungere</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', font: `500 12px ${MS}`, color: '#BFC5C8' }}>
        <Icon name="lock" size={14} color="#BFC5C8" />Visibili solo a te e ad Andrea.
      </div>
    </div>
  )
}

export function Profilo({ v }) {
  const line = { display: 'flex', gap: 10, alignItems: 'center', font: `500 14px ${MS}` }
  return (
    <div style={page(26)}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: '#2486AB', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 30px/1 ${BEBAS}`, flex: 'none' }}>FC</div>
        <div>
          <div style={{ font: `400 36px/.95 ${BEBAS}` }}>FRANCESCA CONTI</div>
          <div style={{ font: `500 13px ${MS}`, color: '#BFC5C8', marginTop: 4 }}>Cliente dal 2025</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ font: `400 30px/1 ${SERIF}`, marginBottom: 8 }}>I nostri servizi</div>
        {v.services.map(s => (
          <div key={s.name} onClick={s.onPick} role="button" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.14)', cursor: 'pointer', minHeight: 44 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(36,134,171,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Icon name={s.icon} size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: `600 15px ${MS}` }}>{s.name}</div>
              <div style={sub}>{s.sub}</div>
            </div>
            <span style={{ font: `600 12px ${MS}`, color: '#2486AB' }}>Richiedi</span>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 20, background: '#1A1D20', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <img src="/logo.png" alt="B Elite Fitness" width="150" height="93" style={{ width: 150, height: 93, objectFit: 'contain', display: 'block', alignSelf: 'center' }} />
        <BrandRule color="#2486AB" width="100%" />
        <div style={line}><Icon name="map-pin" size={16} color="#2486AB" />Via Aymo Maggi 3, Cazzago San Martino</div>
        <a href="mailto:info@belitefitness.it" style={{ ...line, color: 'inherit', textDecoration: 'none' }}><Icon name="mail" size={16} color="#2486AB" />info@belitefitness.it</a>
        <Button variant="primary" size="md" onClick={v.call}>Chiama Andrea · 339 870 1308</Button>
      </div>
      <button onClick={v.toTrainer} style={{ alignSelf: 'center', border: 0, background: 'none', color: '#6B7479', font: `600 12px ${MS}`, letterSpacing: '.08em', cursor: 'pointer', padding: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="key-round" size={14} color="#6B7479" />ACCESSO STAFF
      </button>
    </div>
  )
}

export function Notifiche({ v }) {
  return (
    <div style={page(18)}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={v.goBack} aria-label="Indietro" style={roundBtn}><Icon name="chevron-left" size={20} color="#fff" /></button>
        <button onClick={v.readAll} style={{ border: 0, background: 'none', color: '#2486AB', font: `600 13px ${MS}`, cursor: 'pointer', padding: '12px 0' }}>Segna tutte come lette</button>
      </div>
      <div style={{ font: `400 48px/.92 ${BEBAS}` }}>NOTIFICHE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {v.notifs.map(x => (
          <button key={x.id} onClick={x.onOpen} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 14, border: 0, borderRadius: 8, textAlign: 'left', color: '#fff', cursor: 'pointer', background: x.bg }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(36,134,171,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <Icon name={x.icon} size={18} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ font: `600 14px ${MS}` }}>{x.t}</span>
                <span style={{ font: `500 11px ${MS}`, color: '#BFC5C8', flex: 'none' }}>{x.time}</span>
              </div>
              <div style={{ font: `500 13px/1.4 ${MS}`, color: '#BFC5C8', marginTop: 4 }}>{x.b}</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: 99, marginTop: 6, flex: 'none', background: x.dot }} />
          </button>
        ))}
      </div>
    </div>
  )
}
