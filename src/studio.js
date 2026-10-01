// Studio settings (staff side): booking rules, class types and team, all editable and saved on the device.
import { OWNER_ID, SERVICES, PERMS, PALETTE, DEFAULT_CFG, ini, lc, shortName, clearCfg } from './data.js'

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const step = (label, sub, val, fmt, set, lo, hi, by) => ({
  kind: 'step', label, sub, val: fmt(val),
  onMinus: () => set(clamp(val - by, lo, hi)), onPlus: () => set(clamp(val + by, lo, hi)),
})
const toggle = (label, sub, on, set) => ({ kind: 'toggle', label, sub, on, onToggle: () => set(!on) })

export function studioVals(app) {
  const st = app.state
  const cfg = st.cfg
  const R = cfg.rules
  const setRule = k => v => app.setCfg(c => ({ ...c, rules: { ...c.rules, [k]: v } }))
  const live = app.allClasses().filter(c => !st.cancelled[c.id])
  const countBy = fn => live.filter(fn).length
  const taskLabels = Object.fromEntries([
    ...Object.entries(cfg.types).map(([k, t]) => [k, shortName(t.name)]),
    ...SERVICES, ...cfg.extraTasks.map(t => [t.id, t.label]),
  ])

  const openMember = m => {
    app.setState({ mDraft: m ? { ...m, tasks: [...(m.tasks || [])], perms: { ...(m.perms || {}) } } : { id: null, name: '', role: '', tasks: [], perms: { agenda: 1 } }, newTask: '', confirmRemove: false })
    app.openSheet({ kind: 'member' })
  }
  const openType = k => {
    const t = k ? cfg.types[k] : { name: '', color: PALETTE[3], cap: 4, dur: 50 }
    app.setState({ tDraft: { key: k, ...t } })
    app.openSheet({ kind: 'type' })
  }

  const vals = {
    owner: (() => { const o = app.member(OWNER_ID); return { name: o.name, role: o.role, init: ini(o.name) } })(),
    ruleRows: [
      step('Cancellazione gratuita', 'Ore prima della lezione', R.cancel, v => v + ' h', setRule('cancel'), 0, 72, 6),
      toggle('Lezione scalata se annulli tardi', 'Dopo il limite la lezione viene persa', R.latePenalty, setRule('latePenalty')),
      step('Prenotazione fino a', 'Ore prima dell’inizio', R.minBefore, v => v + ' h', setRule('minBefore'), 0, 24, 1),
      step('Calendario aperto', 'Giorni prenotabili in anticipo', R.bookAhead, v => v + ' gg', setRule('bookAhead'), 7, 60, 7),
      step('Limite settimanale', 'Lezioni prenotabili per cliente', R.maxWeek, v => String(v), setRule('maxWeek'), 1, 14, 1),
      toggle('Lista d’attesa', 'Avvisa i clienti quando si libera un posto', R.waitOn, setRule('waitOn')),
      ...(R.waitOn ? [step('Tempo per confermare', 'Dopo l’avviso di posto libero', R.wait, v => v + ' min', setRule('wait'), 10, 120, 10)] : []),
    ],
    typeRows: Object.entries(cfg.types).map(([k, t]) => ({
      key: k, name: t.name, color: t.color,
      sub: `${t.cap} ${t.cap === 1 ? 'posto' : 'posti'} · ${t.dur} min · ${countBy(c => c.type === k)} corsi/sett.`,
      onOpen: () => openType(k),
    })),
    addType: () => openType(null),
    teamRows: cfg.team.map(m => ({
      id: m.id, name: m.name, init: ini(m.name), owner: !!m.owner,
      role: m.role || 'Nessun ruolo',
      tasks: (m.tasks || []).map(t => taskLabels[t]).filter(Boolean).join(' · ') || 'Nessun incarico',
      count: countBy(c => app.trainerId(c) === m.id),
      onOpen: () => openMember(m),
    })),
    addMember: () => openMember(null),
    resetCfg: () => { clearCfg(); app.setState({ cfg: DEFAULT_CFG, trainerOf: {}, addType: 'reformer', addTrainer: OWNER_ID, filter: 'all' }); app.flash('Impostazioni iniziali ripristinate') },
    isMemberSheet: st.sheet?.kind === 'member',
    isTypeSheet: st.sheet?.kind === 'type',
  }

  const d = st.mDraft
  if (vals.isMemberSheet && d) {
    const setD = patch => app.setState(s => ({ mDraft: { ...s.mDraft, ...patch }, sheetErr: null }))
    const toggleTask = id => setD({ tasks: d.tasks.includes(id) ? d.tasks.filter(t => t !== id) : d.tasks.concat(id) })
    const chip = ([id, label]) => ({ label, onPick: () => toggleTask(id), ...lc(d.tasks.includes(id)) })
    const theirs = d.id ? countBy(c => app.trainerId(c) === d.id) : 0
    const ownerName = app.member(OWNER_ID).name
    Object.assign(vals, {
      md: {
        title: d.id ? 'Modifica membro' : 'Nuovo membro del team',
        name: d.name, role: d.role, isOwner: !!d.owner,
        onName: e => setD({ name: e.target.value }), onRole: e => setD({ role: e.target.value }),
        classChips: Object.entries(cfg.types).map(([k, t]) => chip([k, shortName(t.name)])),
        serviceChips: SERVICES.concat(cfg.extraTasks.map(t => [t.id, t.label])).map(chip),
        newTask: st.newTask, onNewTask: e => app.setState({ newTask: e.target.value }),
        addTask: () => {
          const label = st.newTask.trim()
          if (!label) return
          const id = 'x' + Date.now()
          app.setCfg(c => ({ ...c, extraTasks: c.extraTasks.concat({ id, label }) }))
          app.setState(s => ({ newTask: '', mDraft: { ...s.mDraft, tasks: s.mDraft.tasks.concat(id) } }))
        },
        perms: PERMS.map(([k, label, sub]) => ({
          kind: 'toggle', label, sub, on: !!d.perms[k] || !!d.owner, locked: !!d.owner,
          onToggle: () => { if (!d.owner) setD({ perms: { ...d.perms, [k]: d.perms[k] ? 0 : 1 } }) },
        })),
        save: () => {
          const name = d.name.trim()
          if (!name) { app.setState({ sheetErr: 'Inserisci il nome.' }); return }
          if (cfg.team.some(m => m.id !== d.id && m.name.toLowerCase() === name.toLowerCase())) { app.setState({ sheetErr: 'C’è già un membro con questo nome.' }); return }
          const m = { ...d, name, role: d.role.trim(), id: d.id || 't' + Date.now() }
          app.setCfg(c => ({ ...c, team: d.id ? c.team.map(x => (x.id === d.id ? m : x)) : c.team.concat(m) }))
          app.setState({ sheet: null })
          app.flash(d.id ? 'Modifiche salvate' : name + ' aggiunto al team')
        },
        canRemove: !!d.id && !d.owner,
        confirming: st.confirmRemove,
        askRemove: () => app.setState({ confirmRemove: true }),
        backRemove: () => app.setState({ confirmRemove: false }),
        removeText: theirs
          ? `${d.name} ha ${theirs} ${theirs === 1 ? 'corso' : 'corsi'} in agenda: ${theirs === 1 ? 'passa' : 'passano'} a ${ownerName}. Potrai riassegnarli dall’Agenda.`
          : `${d.name} non ha corsi in agenda.`,
        remove: () => {
          const moved = {}
          app.allClasses().forEach(c => { if (app.trainerId(c) === d.id) moved[c.id] = OWNER_ID })
          app.setCfg(c => ({ ...c, team: c.team.filter(x => x.id !== d.id) }))
          app.setState(s => ({ trainerOf: { ...s.trainerOf, ...moved }, sheet: null, addTrainer: s.addTrainer === d.id ? OWNER_ID : s.addTrainer }))
          app.flash(d.name + ' rimosso dal team')
        },
      },
    })
  }

  const t = st.tDraft
  if (vals.isTypeSheet && t) {
    const setT = patch => app.setState(s => ({ tDraft: { ...s.tDraft, ...patch }, sheetErr: null }))
    const used = t.key ? countBy(c => c.type === t.key) : 0
    Object.assign(vals, {
      td: {
        title: t.key ? 'Modifica corso' : 'Nuovo tipo di corso',
        name: t.name, onName: e => setT({ name: e.target.value }),
        swatches: PALETTE.map(color => ({ color, on: t.color === color, onPick: () => setT({ color }) })),
        cap: { val: String(t.cap), onMinus: () => setT({ cap: clamp(t.cap - 1, 1, 20) }), onPlus: () => setT({ cap: clamp(t.cap + 1, 1, 20) }) },
        dur: { val: t.dur + ' min', onMinus: () => setT({ dur: clamp(t.dur - 5, 20, 120) }), onPlus: () => setT({ dur: clamp(t.dur + 5, 20, 120) }) },
        save: () => {
          const name = t.name.trim()
          if (!name) { app.setState({ sheetErr: 'Inserisci il nome del corso.' }); return }
          const key = t.key || 'c' + Date.now()
          app.setCfg(c => ({ ...c, types: { ...c.types, [key]: { name, color: t.color, cap: t.cap, dur: t.dur } } }))
          app.setState({ sheet: null })
          app.flash(t.key ? 'Corso aggiornato' : name + ' creato · aggiungilo dall’Agenda')
        },
        canDelete: !!t.key && Object.keys(cfg.types).length > 1,
        remove: () => {
          if (used) { app.setState({ sheetErr: `Ci sono ${used} ${used === 1 ? 'lezione' : 'lezioni'} di questo corso in agenda: annullale prima di eliminarlo.` }); return }
          app.setCfg(c => { const types = { ...c.types }; delete types[t.key]; return { ...c, types, team: c.team.map(m => ({ ...m, tasks: (m.tasks || []).filter(x => x !== t.key) })) } })
          app.setState(s => ({ sheet: null, filter: s.filter === t.key ? 'all' : s.filter, addType: s.addType === t.key ? Object.keys(cfg.types).find(k => k !== t.key) : s.addType }))
          app.flash('Corso eliminato')
        },
      },
    })
  }
  return vals
}

