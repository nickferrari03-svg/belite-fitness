// Bottom sheets (class, renew, measures, manage class, new class) plus waitlist offer and toast.
import { Icon, Button } from '../components/ds.jsx'
import { Check, caps } from './client.jsx'
import { Chip } from './trainer.jsx'

const MS = 'Montserrat,sans-serif'
const BEBAS = "'Bebas Neue',sans-serif"
const col = gap => ({ display: 'flex', flexDirection: 'column', gap })
const field = c => ({ ...caps(c, 10), marginBottom: 4 })
const kindTag = color => ({ display: 'inline-block', font: `700 10px ${MS}`, letterSpacing: '.12em', padding: '5px 10px', borderRadius: 999, color: '#0B0D0F', background: color, marginBottom: 10 })

function Head({ children, light, onClose }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Chiudi" style={{ width: 44, height: 44, borderRadius: 999, border: 0, background: light ? '#EEF7FB' : '#283A3E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
        <Icon name="x" size={18} color={light ? '#0B0D0F' : '#fff'} />
      </button>
    </div>
  )
}

function SheetError({ v, light }) {
  if (!v.hasSheetErr) return null
  return (
    <div role="alert" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', borderRadius: 8, background: light ? '#EEF7FB' : '#283A3E', font: `500 13px/1.45 ${MS}` }}>
      <Icon name="circle-alert" size={18} color={light ? '#2486AB' : '#3F9CC4'} />
      <span>{v.sheetErr}</span>
    </div>
  )
}

const Title = ({ children }) => <div style={{ font: `400 40px/.95 ${BEBAS}` }}>{children}</div>

function ClassSheet({ v }) {
  const sh = v.sh
  return (
    <div style={col(18)}>
      <Head onClose={v.closeSheet}>
        <div style={kindTag(sh.color)}>{sh.kind}</div>
        <Title>{sh.name}</Title>
      </Head>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px', font: `500 14px ${MS}` }}>
        <div><div style={field('#BFC5C8')}>QUANDO</div>{sh.day}, {sh.dtime}</div>
        <div><div style={field('#BFC5C8')}>ISTRUTTORE</div>{sh.trainer}</div>
        <div><div style={field('#BFC5C8')}>DURATA</div>50 minuti</div>
        <div>
          <div style={field('#BFC5C8')}>POSTI · {sh.spotsLabel}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {sh.dots.map((p, k) => <div key={k} style={{ width: 14, height: 14, borderRadius: 99, background: p.bg, border: '1.5px solid #3F9CC4', boxSizing: 'border-box' }} />)}
          </div>
        </div>
      </div>
      <div style={{ font: `500 12px/1.45 ${MS}`, color: '#BFC5C8' }}>{sh.note}</div>
      <SheetError v={v} />
      {sh.canBook && <Button variant="primary" size="lg" onClick={sh.onBook} style={{ width: '100%' }}>{sh.bookLabel}</Button>}
      {sh.isBooked && <Button variant="outline" size="lg" onClick={sh.onCancel} style={{ width: '100%' }}>Annulla prenotazione</Button>}
      {sh.isFull && <Button variant="inverse" size="lg" onClick={sh.onWait} style={{ width: '100%' }}>{sh.waitLabel}</Button>}
    </div>
  )
}

function RenewSheet({ v }) {
  return (
    <div style={col(18)}>
      <Head onClose={v.closeSheet}><Title>RINNOVA PACCHETTO</Title></Head>
      <div style={{ font: `500 14px/1.5 ${MS}`, color: '#BFC5C8' }}>Scegli il pacchetto: Andrea conferma la richiesta e saldi direttamente in studio.</div>
      <div style={col(10)}>
        {v.renewOpts.map(o => (
          <button key={o.n} onClick={o.onPick} aria-pressed={o.fill !== 'transparent'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, padding: '0 18px', borderRadius: 8, cursor: 'pointer', color: '#fff', transition: 'background .24s ease-out', border: `1.5px solid ${o.border}`, background: o.bg }}>
            <span style={{ font: `400 30px/1 ${BEBAS}` }}>{o.n} LEZIONI</span>
            <Check {...o} />
          </button>
        ))}
      </div>
      <Button variant="primary" size="lg" onClick={v.sendRenew} style={{ width: '100%' }}>Invia richiesta ad Andrea</Button>
    </div>
  )
}

function MeasureSheet({ v }) {
  const step = { width: 44, height: 44, borderRadius: 999, border: 0, background: '#283A3E', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }
  return (
    <div style={col(14)}>
      <Head onClose={v.closeSheet}><Title>AGGIORNA MISURE</Title></Head>
      {v.measRows.map(m => (
        <div key={m.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
          <span style={{ font: `600 15px ${MS}` }}>{m.label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 'none' }}>
            <button onClick={m.onMinus} aria-label="Diminuisci" style={step}><Icon name="minus" size={16} color="#fff" /></button>
            <span style={{ minWidth: 80, textAlign: 'center', font: `600 15px ${MS}` }}>{m.val}</span>
            <button onClick={m.onPlus} aria-label="Aumenta" style={step}><Icon name="plus" size={16} color="#fff" /></button>
          </div>
        </div>
      ))}
      <Button variant="primary" size="lg" onClick={v.saveMeasure} style={{ width: '100%', marginTop: 6 }}>Salva misure</Button>
    </div>
  )
}

const outlineDark = { minHeight: 48, borderRadius: 999, border: '2px solid #0B0D0F', background: 'transparent', color: '#0B0D0F', font: `700 13px ${MS}`, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', padding: '0 18px', width: '100%' }
const full = { width: '100%', justifyContent: 'center' }

function ManageSheet({ v }) {
  const sh = v.sh
  return (
    <div style={col(18)}>
      <Head light onClose={v.closeSheet}>
        <div style={kindTag(sh.color)}>{sh.kind}</div>
        <div style={{ font: `700 26px/1.1 ${MS}` }}>{sh.name}</div>
      </Head>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px', font: `600 14px ${MS}` }}>
        <div><div style={field('#6B7479')}>QUANDO</div>{sh.day}, {sh.dtime}</div>
        <div><div style={field('#6B7479')}>ISCRITTI</div>{sh.taken} su {sh.cap} · {sh.trainer}</div>
      </div>
      <SheetError v={v} light />
      {sh.showMove && (
        <>
          <div style={col(10)}>
            <div style={caps('#6B7479')}>SPOSTA ORARIO</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{sh.moves.map(t => <Chip key={t.label} c={t} />)}</div>
            <div style={{ font: `500 12px ${MS}`, color: '#6B7479' }}>Gli iscritti ricevono una notifica del nuovo orario.</div>
          </div>
          <button onClick={sh.onAskCancel} style={outlineDark}>Annulla corso</button>
        </>
      )}
      {sh.confirming && (
        <>
          <div style={{ font: `500 14px/1.45 ${MS}` }}>{sh.cancelText}</div>
          <Button variant="primary" size="lg" onClick={sh.onCancelClass} style={full}>Conferma annullamento</Button>
          <Button variant="ghost" size="lg" onClick={sh.onBackCancel} style={full}>Indietro</Button>
        </>
      )}
      {sh.isCancelled && (
        <>
          <div style={{ font: `500 14px/1.45 ${MS}`, color: '#6B7479' }}>Corso annullato. Gli iscritti sono stati avvisati.</div>
          <Button variant="primary" size="lg" onClick={sh.onRestore} style={full}>Ripristina corso</Button>
        </>
      )}
    </div>
  )
}

function AddSheet({ v }) {
  const group = (label, items) => (
    <div style={col(10)}>
      <div style={caps('#6B7479')}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{items.map(t => <Chip key={t.label} c={t} />)}</div>
    </div>
  )
  return (
    <div style={col(18)}>
      <Head light onClose={v.closeSheet}><div style={{ font: `700 26px/1.1 ${MS}` }}>Nuovo corso</div></Head>
      {group('GIORNO', v.addDays)}
      {group('TIPO', v.addTypes)}
      {group('ORARIO', v.addTimes)}
      <SheetError v={v} light />
      <Button variant="primary" size="lg" onClick={v.addClass} style={full}>{v.addLabel}</Button>
    </div>
  )
}

export function Sheet({ v }) {
  if (!v.sheetOpen) return null
  return (
    <>
      <div onClick={v.closeSheet} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 40, animation: 'beFade .24s ease-out' }} />
      <div role="dialog" aria-modal="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 41, borderRadius: '20px 20px 0 0', padding: '10px 22px calc(34px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: '88%', overflowY: 'auto', scrollbarWidth: 'none', boxSizing: 'border-box', animation: 'beUp .28s cubic-bezier(.2,.8,.2,1)', background: v.sheetBg, color: v.appFg }}>
        <div style={{ alignSelf: 'center', width: 40, height: 5, borderRadius: 99, background: '#BFC5C8', flex: 'none' }} />
        {v.isClassSheet && <ClassSheet v={v} />}
        {v.isRenewSheet && <RenewSheet v={v} />}
        {v.isMeasureSheet && <MeasureSheet v={v} />}
        {v.isManageSheet && <ManageSheet v={v} />}
        {v.isAddSheet && <AddSheet v={v} />}
      </div>
    </>
  )
}

export function Offer({ v }) {
  if (!v.hasOffer) return null
  return (
    <div role="alert" className="be-offer" style={{ position: 'absolute', left: 14, right: 14, zIndex: 48, background: '#2486AB', color: '#fff', borderRadius: 20, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 16px 40px rgba(0,0,0,.5)', animation: 'beFade .24s ease-out' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Icon name="bell-ring" size={20} color="#fff" />
        <div style={{ flex: 1 }}>
          <div style={caps('inherit')}>SI È LIBERATO UN POSTO</div>
          <div style={{ font: `400 28px/1 ${BEBAS}`, marginTop: 4 }}>{v.offer.name}</div>
          <div style={{ font: `500 13px ${MS}`, marginTop: 2 }}>{v.offer.when} · conferma entro {v.offerLeft}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="inverse" size="md" onClick={v.acceptOffer} style={{ flex: 1 }}>Conferma posto</Button>
        <button onClick={v.declineOffer} style={{ flex: 1, height: 44, borderRadius: 999, border: '1.5px solid #fff', background: 'transparent', color: '#fff', font: `600 14px ${MS}`, cursor: 'pointer' }}>Rinuncia</button>
      </div>
    </div>
  )
}

export function Toast({ v }) {
  if (!v.hasToast) return null
  return (
    <div role="status" aria-live="polite" style={{ position: 'absolute', left: 20, right: 20, bottom: 100, zIndex: 50, borderRadius: 999, padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'center', font: `600 13px ${MS}`, boxShadow: '0 12px 30px rgba(0,0,0,.3)', animation: 'beFade .24s ease-out', background: v.toastBg, color: v.toastFg }}>
      <Icon name="circle-check" size={18} color="#2486AB" />{v.toast}
    </div>
  )
}
