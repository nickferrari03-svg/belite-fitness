// Trainer (staff) side: functional/light. Oggi, Agenda, Clienti (+ scheda e editor piano), Studio.
import { Icon, Button } from '../components/ds.jsx'
import { Check, caps } from './client.jsx'

const MS = 'Montserrat,sans-serif'
const BEBAS = "'Bebas Neue',sans-serif"
const muted = { font: `500 12px ${MS}`, color: '#6B7479', marginTop: 3 }
const card12 = { borderRadius: 12, background: '#fff', boxShadow: '0 2px 10px rgba(36,134,171,.08)' }
const card20 = { borderRadius: 20, background: '#fff', boxShadow: '0 8px 24px rgba(36,134,171,.10)' }
const divider = '1px solid rgba(11,13,15,.08)'
const h2 = { font: `700 18px ${MS}`, color: '#0B0D0F' }
const page = gap => ({ padding: '12px 20px 32px', display: 'flex', flexDirection: 'column', gap })
const stepBtn = { width: 44, height: 44, borderRadius: 999, border: 0, background: '#EEF7FB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }
const outlineDark = { minHeight: 48, borderRadius: 999, border: '2px solid #0B0D0F', background: 'transparent', color: '#0B0D0F', font: `700 13px ${MS}`, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', padding: '0 18px' }

export function Chip({ c }) {
  return (
    <button onClick={c.onPick} aria-pressed={c.bg === '#2486AB'} style={{ flex: 'none', minHeight: 44, padding: '0 16px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', font: `600 13px ${MS}`, transition: 'background .24s ease-out', border: `1px solid ${c.bd}`, background: c.bg, color: c.fg }}>{c.label}</button>
  )
}

export function Stepper({ val, onMinus, onPlus, minWidth = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 'none' }}>
      <button onClick={onMinus} aria-label="Diminuisci" style={stepBtn}><Icon name="minus" size={16} color="#0B0D0F" /></button>
      <span style={{ minWidth, textAlign: 'center', font: `600 15px ${MS}` }}>{val}</span>
      <button onClick={onPlus} aria-label="Aumenta" style={stepBtn}><Icon name="plus" size={16} color="#0B0D0F" /></button>
    </div>
  )
}

function Header({ meta, title, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ font: `700 10px ${MS}`, letterSpacing: '.14em', padding: '5px 10px', borderRadius: 999, background: '#0B0D0F', color: '#fff' }}>STAFF</span>
          <span style={{ font: `600 12px ${MS}`, color: '#6B7479' }}>{meta}</span>
        </div>
        <div style={{ font: `700 28px/1.1 ${MS}`, marginTop: 10 }}>{title}</div>
      </div>
      {action}
    </div>
  )
}

function BackBtn({ onClick }) {
  return (
    <div>
      <button onClick={onClick} aria-label="Indietro" style={{ width: 44, height: 44, borderRadius: 999, border: 0, background: '#fff', boxShadow: '0 2px 10px rgba(36,134,171,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
        <Icon name="chevron-left" size={20} color="#0B0D0F" />
      </button>
    </div>
  )
}

export function Oggi({ v }) {
  return (
    <div style={page(24)}>
      <Header meta="Lunedì 28 settembre" title="Buongiorno, Andrea" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
        {v.kpis.map(k => (
          <div key={k.l} style={{ ...card12, padding: '14px 12px' }}>
            <div style={{ font: `400 36px/1 ${BEBAS}`, color: '#2486AB' }}>{k.v}</div>
            <div style={{ font: `600 11px/1.3 ${MS}`, color: '#6B7479', marginTop: 4 }}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={h2}>Da gestire</span>
            {v.hasTodo && <span style={{ minWidth: 22, height: 22, borderRadius: 99, background: '#2486AB', color: '#fff', font: `700 11px/22px ${MS}`, textAlign: 'center', padding: '0 6px', boxSizing: 'border-box' }}>{v.todoCount}</span>}
          </div>
          {v.hasTodo && <button onClick={v.readAll} style={{ border: 0, background: 'none', color: '#2486AB', font: `600 13px ${MS}`, cursor: 'pointer', padding: '10px 0' }}>Segna come fatto</button>}
        </div>
        <div style={{ ...card20, overflow: 'hidden' }}>
          {v.todo.map(x => (
            <button key={x.id} onClick={x.onOpen} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', padding: '14px 16px', border: 0, borderBottom: divider, background: '#fff', textAlign: 'left', color: '#0B0D0F', cursor: 'pointer' }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: '#EEF7FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Icon name={x.icon} size={18} color="#2486AB" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ font: `700 14px ${MS}` }}>{x.t}</span>
                  <span style={{ font: `500 11px ${MS}`, color: '#6B7479', flex: 'none' }}>{x.time}</span>
                </div>
                <div style={{ font: `500 13px/1.4 ${MS}`, color: '#6B7479', marginTop: 2 }}>{x.b}</div>
              </div>
              <Icon name="chevron-right" size={16} color="#BFC5C8" />
            </button>
          ))}
          {v.todoEmpty && (
            <div style={{ padding: '18px 16px', display: 'flex', gap: 10, alignItems: 'center', font: `600 14px ${MS}` }}>
              <Icon name="circle-check" size={18} color="#2486AB" />Tutto in ordine.
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={h2}>Programma di oggi</span>
        {v.agenda.map(a => (
          <div key={a.id} style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 46, flex: 'none', font: `400 24px/1 ${BEBAS}`, paddingTop: 16 }}>{a.dtime}</div>
            <div style={{ flex: 1, minWidth: 0, ...card12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px 8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: 99, background: a.color, flex: 'none' }} />
                <div style={{ flex: 1, minWidth: 0, font: `700 14px ${MS}` }}>{a.name}</div>
                <span style={{ font: `600 12px ${MS}`, color: '#6B7479' }}>{a.present}/{a.count} presenti</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '0 6px 6px' }}>
                {a.people.map(p => (
                  <button key={p.name} onClick={p.onToggle} aria-pressed={p.on} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 48, padding: '0 8px', border: 0, borderRadius: 8, background: 'none', color: '#0B0D0F', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 999, background: '#EEF7FB', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 15px/1 ${BEBAS}` }}>{p.init}</div>
                    <span style={{ flex: 1, font: `600 14px ${MS}` }}>{p.name}</span>
                    <Check {...p} />
                  </button>
                ))}
                {a.empty && <div style={{ padding: '4px 8px 10px', font: `500 13px ${MS}`, color: '#6B7479' }}>Nessun iscritto.</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Agenda({ v }) {
  const cols = { display: 'grid', gridTemplateColumns: '40px repeat(6,minmax(0,1fr))', gap: 4 }
  return (
    <div style={page(20)}>
      <Header meta="28 set – 3 ott" title="Agenda" action={<Button variant="primary" size="sm" onClick={v.openAdd}>+ Corso</Button>} />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {v.legend.map(l => (
          <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, font: `600 12px ${MS}`, color: '#6B7479' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />{l.label}
          </span>
        ))}
      </div>
      <div style={{ ...card20, padding: '12px 10px' }}>
        <div style={{ ...cols, marginBottom: 4 }}>
          <div />
          {v.weekDays.map(d => (
            <div key={d.k} style={{ textAlign: 'center', color: d.fg }}>
              <div style={{ font: `700 10px ${MS}`, letterSpacing: '.08em' }}>{d.k}</div>
              <div style={{ font: `400 20px/1 ${BEBAS}` }}>{d.n}</div>
            </div>
          ))}
        </div>
        {v.grid.map(r => (
          <div key={r.t} style={{ ...cols, marginTop: 4 }}>
            <div style={{ font: `600 11px ${MS}`, color: '#6B7479', display: 'flex', alignItems: 'center' }}>{r.t}</div>
            {r.cells.map(c => (
              <button key={c.aria} onClick={c.onTap} aria-label={c.aria} style={{ height: 44, padding: 0, borderRadius: 8, cursor: 'pointer', font: `700 12px ${MS}`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: c.bd, background: c.bg, color: c.fg, textDecoration: c.deco }}>{c.label}</button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ font: `500 12px ${MS}`, color: '#6B7479', marginTop: -8 }}>Il numero indica gli iscritti. Tocca uno slot vuoto per aggiungere un corso.</div>
      <div style={{ ...card12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={caps('#6B7479')}>OCCUPAZIONE SETTIMANA</span>
          <span style={{ font: `400 28px/1 ${BEBAS}` }}>{v.occPct}</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: '#EEF7FB', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#2486AB', borderRadius: 99, width: v.occPct }} />
        </div>
        <div style={{ font: `500 12px ${MS}`, color: '#6B7479' }}>{v.occText}</div>
      </div>
    </div>
  )
}

export function Clienti({ v }) {
  return (
    <div style={page(18)}>
      <Header meta={`${v.clientCount} attivi`} title="Clienti" />
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', borderRadius: 999, background: '#fff', boxShadow: '0 2px 10px rgba(36,134,171,.08)' }}>
        <Icon name="search" size={18} color="#6B7479" />
        <input value={v.q} onChange={v.onQ} placeholder="Cerca un cliente" aria-label="Cerca un cliente" style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', font: `500 15px ${MS}`, color: '#0B0D0F' }} />
      </label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {v.cfilters.map(f => <Chip key={f.label} c={f} />)}
      </div>
      <div style={{ ...card20, overflow: 'hidden' }}>
        {v.clients.map(c => (
          <button key={c.i} onClick={c.onOpen} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', border: 0, borderBottom: divider, background: '#fff', color: '#0B0D0F', textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#EEF7FB', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 20px/1 ${BEBAS}`, flex: 'none' }}>{c.init}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: `700 15px ${MS}` }}>{c.name}</div>
              <div style={muted}>{c.plan}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 99, background: '#EEF7FB', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#2486AB', width: c.pct }} />
                </div>
                <span style={{ font: `600 11px ${MS}`, color: '#6B7479' }}>sett. {c.week}/8</span>
              </div>
            </div>
            <div style={{ font: `700 11px ${MS}`, letterSpacing: '.06em', padding: '6px 10px', borderRadius: 999, background: c.tagBg, color: c.tagFg, flex: 'none' }}>{c.tag}</div>
          </button>
        ))}
        {v.clientsEmpty && <div style={{ padding: '18px 16px', font: `500 14px ${MS}`, color: '#6B7479' }}>Nessun cliente trovato.</div>}
      </div>
    </div>
  )
}

export function ClientDetail({ v }) {
  const cd = v.cd
  const stat = { ...card12, padding: '14px 16px' }
  return (
    <div style={page(20)}>
      <BackBtn onClick={v.goBack} />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: '#2486AB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 30px/1 ${BEBAS}`, flex: 'none' }}>{cd.init}</div>
        <div>
          <div style={{ font: `700 24px/1.1 ${MS}` }}>{cd.name}</div>
          <div style={muted}>{cd.plan}</div>
        </div>
      </div>
      {cd.hasRenew && (
        <div style={{ borderRadius: 20, background: '#2486AB', color: '#fff', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={caps('inherit')}>RICHIESTA DI RINNOVO</div>
          <div style={{ font: `400 32px/1 ${BEBAS}` }}>{cd.renewText}</div>
          <div style={{ font: `500 13px ${MS}` }}>Saldo in studio alla prossima lezione.</div>
          <Button variant="inverse" size="md" onClick={cd.onRenew}>Conferma rinnovo</Button>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={stat}><div style={{ font: `400 40px/1 ${BEBAS}` }}>{cd.credits}</div><div style={muted}>lezioni rimaste</div></div>
        <div style={stat}><div style={{ font: `400 40px/1 ${BEBAS}` }}>{cd.week}/8</div><div style={muted}>settimana del piano</div></div>
      </div>
      <div style={{ ...card12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={caps('#6B7479')}>AVANZAMENTO PIANO</div>
        <div style={{ height: 6, borderRadius: 99, background: '#EEF7FB', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 99, background: '#2486AB', width: cd.pct }} />
        </div>
        <div style={{ font: `500 13px ${MS}`, color: '#6B7479' }}>{cd.note}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ ...h2, marginBottom: 6 }}>Ultime sessioni</div>
        {cd.sessions.map(s => (
          <div key={s.when} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 0', borderBottom: divider, font: `500 14px ${MS}` }}>
            <span>{s.name}</span><span style={{ color: '#6B7479' }}>{s.when}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={cd.onRemind} style={{ ...outlineDark, flex: 1 }}>Promemoria</button>
        <Button variant="primary" size="md" onClick={v.openEditor} style={{ flex: 1, justifyContent: 'center' }}>Modifica piano</Button>
      </div>
    </div>
  )
}

export function PlanEditor({ v }) {
  const cd = v.cd
  return (
    <div style={page(20)}>
      <BackBtn onClick={v.goBack} />
      <div>
        <div style={caps('#6B7479')}>MODIFICA PIANO · SETTIMANA {cd.week}</div>
        <div style={{ font: `700 24px/1.1 ${MS}`, marginTop: 6 }}>{cd.name}</div>
      </div>
      <div style={{ ...card20, padding: '4px 16px' }}>
        {v.draft.map(e => (
          <div key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 0', borderBottom: divider }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: `700 14px ${MS}` }}>{e.name}</div>
              <div style={muted}>{e.detail}</div>
            </div>
            <Stepper val={e.sets} onMinus={e.onMinus} onPlus={e.onPlus} />
            <button onClick={e.onRemove} aria-label="Rimuovi esercizio" style={{ width: 44, height: 44, border: 0, background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
              <Icon name="trash-2" size={18} color="#6B7479" />
            </button>
          </div>
        ))}
        {v.draftEmpty && <div style={{ padding: '16px 0', font: `500 14px ${MS}`, color: '#6B7479' }}>Nessun esercizio nel piano.</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={caps('#6B7479')}>AGGIUNGI ESERCIZIO</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {v.lib.map(l => <Chip key={l.label} c={l} />)}
        </div>
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={caps('#6B7479')}>NOTA PER {cd.firstUpper}</span>
        <textarea value={v.draftNote} onChange={v.onNote} rows={3} style={{ borderRadius: 12, border: '1px solid rgba(11,13,15,.14)', background: '#fff', color: '#0B0D0F', padding: 12, font: `500 14px/1.45 ${MS}`, resize: 'none', outline: 'none' }} />
      </label>
      <Button variant="primary" size="lg" onClick={v.saveDraft} style={{ width: '100%', justifyContent: 'center' }}>{cd.saveLabel}</Button>
    </div>
  )
}

export function Studio({ v }) {
  return (
    <div style={page(22)}>
      <Header meta="Impostazioni" title="Studio" />
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', ...card12, padding: '14px 16px' }}>
        <div style={{ width: 48, height: 48, borderRadius: 999, background: '#2486AB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 22px/1 ${BEBAS}`, flex: 'none' }}>AN</div>
        <div>
          <div style={{ font: `700 16px ${MS}` }}>Andrea</div>
          <div style={muted}>Titolare · Personal trainer</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={h2}>Regole di prenotazione</span>
        <div style={{ ...card20, padding: '4px 16px' }}>
          {v.ruleRows.map(r => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: divider }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `700 14px ${MS}` }}>{r.label}</div>
                <div style={muted}>{r.sub}</div>
              </div>
              <Stepper val={r.val} onMinus={r.onMinus} onPlus={r.onPlus} minWidth={52} />
            </div>
          ))}
        </div>
        <div style={{ font: `500 12px ${MS}`, color: '#6B7479' }}>Le regole si applicano subito a orari e prenotazioni dei clienti.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={h2}>Team</span>
        <div style={{ ...card20, padding: '4px 16px' }}>
          {v.team.map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: divider }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: '#EEF7FB', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 16px/1 ${BEBAS}`, flex: 'none' }}>{m.init}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: `700 14px ${MS}` }}>{m.name}</div>
                <div style={muted}>{m.role}</div>
              </div>
              <span style={{ font: `600 12px ${MS}`, color: '#6B7479' }}>{m.count} corsi/sett.</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={v.toClient} style={{ ...outlineDark, width: '100%' }}>Vista cliente</button>
    </div>
  )
}
