// App shell: device frame (desktop) / full screen (phone), status bar, tab bar, overlays.
import { BeliteLogic } from './logic.js'
import { Icon } from './components/ds.jsx'
import { Home, Orari, Percorso, Profilo, Notifiche } from './screens/client.jsx'
import { Oggi, Agenda, Clienti, ClientDetail, PlanEditor, Studio } from './screens/trainer.jsx'
import { Sheet, Offer, Toast } from './screens/sheets.jsx'

// Demo switches (the prototype's Tweaks): ?role=trainer&credits=0&offline=1&race=0
function readProps() {
  const q = new URLSearchParams(window.location.search)
  const num = q.get('credits')
  return {
    role: q.get('role') === 'trainer' ? 'trainer' : 'client',
    packCredits: num !== null && !Number.isNaN(+num) ? Math.max(0, Math.min(10, +num)) : 8,
    offline: q.get('offline') === '1',
    simulateRace: q.get('race') !== '0',
  }
}

class Shell extends BeliteLogic {
  componentDidMount() {
    super.componentDidMount()
    this.syncPageBg()
  }

  componentDidUpdate() {
    this.syncPageBg()
  }

  // On phones the page itself is the app, so the overscroll area follows the active side's colour.
  syncPageBg() {
    const bg = this.role() === 'trainer' ? '#EEF7FB' : '#000'
    document.documentElement.style.setProperty('--be-app-bg', bg)
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', bg)
  }

  render() {
    const v = this.renderVals()
    return (
      <div className="be-stage">
        <div className="be-device" data-screen-label="App" style={{ background: v.appBg, color: v.appFg }}>
          <div className="be-status" style={{ background: v.appBg }}>
            <span>9:41</span>
            <div className="be-island" />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Icon name="signal" size={16} color={v.appFg} />
              <Icon name={v.wifiIcon} size={16} color={v.appFg} />
              <Icon name="battery-full" size={20} color={v.appFg} />
            </div>
          </div>

          <main className="be-scroll" key={v.screenKey}>
            {v.offline && (
              <div role="status" style={{ position: 'sticky', top: 0, zIndex: 5, background: '#283A3E', color: '#fff', padding: '10px 20px', display: 'flex', gap: 10, alignItems: 'center', font: '600 12px Montserrat,sans-serif' }}>
                <Icon name="wifi-off" size={16} color="#fff" />Sei offline · le modifiche sono in pausa
              </div>
            )}
            {v.isHome && <Home v={v} />}
            {v.isOrari && <Orari v={v} />}
            {v.isIo && <Percorso v={v} />}
            {v.isProfile && <Profilo v={v} />}
            {v.isNotifs && <Notifiche v={v} />}
            {v.isToday && <Oggi v={v} />}
            {v.isAgenda && <Agenda v={v} />}
            {v.isClients && <Clienti v={v} />}
            {v.isClientDetail && <ClientDetail v={v} />}
            {v.isEditor && <PlanEditor v={v} />}
            {v.isStudio && <Studio v={v} />}
          </main>

          <nav style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, display: 'flex', padding: '6px 8px 0', boxSizing: 'border-box', zIndex: 20, background: v.tabBg, borderTop: `1px solid ${v.tabBorder}` }}>
            {v.tabs.map(t => (
              <button key={t.label} onClick={t.onPick} aria-label={t.label} aria-current={t.active ? 'page' : undefined} style={{ flex: 1, border: 0, background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0', cursor: 'pointer', height: 52, color: t.color }}>
                <Icon name={t.icon} size={22} color={t.color} />
                <span style={{ font: '600 10px Montserrat,sans-serif', letterSpacing: '.06em' }}>{t.label}</span>
              </button>
            ))}
            <div className="be-homebar" style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 99, background: v.appFg }} />
          </nav>

          <Sheet v={v} />
          <Offer v={v} />
          <Toast v={v} />
        </div>
      </div>
    )
  }
}

export default function App() {
  return <Shell {...readProps()} />
}
