// React ports of the B Elite Fitness design-system primitives used by the app.
import { useState } from 'react'
import {
  Activity, Apple, BatteryFull, Bell, BellRing, Calendar, CalendarPlus, CalendarRange, CalendarX, Camera,
  Check, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, Clock, Dumbbell, Hand, Hourglass, House, Info,
  KeyRound, LayoutDashboard, Lock, Mail, MapPin, Minus, Package, Plus, Search, Settings, Signal, Trash2,
  UserPlus, UserRound, Users, Wifi, WifiOff, X,
} from 'lucide-react'

const ICONS = {
  activity: Activity, apple: Apple, 'battery-full': BatteryFull, bell: Bell, 'bell-ring': BellRing, calendar: Calendar,
  'calendar-plus': CalendarPlus, 'calendar-range': CalendarRange, 'calendar-x': CalendarX, camera: Camera, check: Check,
  'chevron-left': ChevronLeft, 'chevron-right': ChevronRight, 'circle-alert': CircleAlert, 'circle-check': CircleCheck,
  clock: Clock, dumbbell: Dumbbell, hand: Hand, hourglass: Hourglass, house: House, info: Info, 'key-round': KeyRound,
  'layout-dashboard': LayoutDashboard, lock: Lock, mail: Mail, 'map-pin': MapPin, minus: Minus, package: Package,
  plus: Plus, search: Search, settings: Settings, signal: Signal, 'trash-2': Trash2, 'user-plus': UserPlus,
  'user-round': UserRound, users: Users, wifi: Wifi, 'wifi-off': WifiOff, x: X,
}

export function Icon({ name, size = 20, color = 'currentColor', style }) {
  const C = ICONS[name]
  if (!C) return <span style={{ display: 'inline-block', width: size, height: size, flex: 'none' }} />
  return <C aria-hidden="true" size={size} color={color} strokeWidth={2} style={{ display: 'inline-block', flex: 'none', ...style }} />
}

const V = {
  primary: { background: 'var(--be-blue)', color: '#fff', border: '2px solid var(--be-blue)' },
  inverse: { background: '#fff', color: 'var(--be-ink)', border: '2px solid #fff' },
  outline: { background: 'transparent', color: '#fff', border: '2px solid #fff' },
  ghost: { background: 'transparent', color: 'var(--be-blue)', border: '2px solid transparent' },
}
const S = {
  sm: { padding: '8px 16px', fontSize: 12 },
  md: { padding: '12px 24px', fontSize: 14 },
  lg: { padding: '16px 32px', fontSize: 16 },
}

export function Button({ variant = 'primary', size = 'md', children, disabled, onClick, style }) {
  const [h, setH] = useState(false)
  const up = e => { e.currentTarget.style.transform = 'none' }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={e => { setH(false); up(e) }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(.97)' }}
      onMouseUp={up}
      style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
        borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'filter var(--dur-fast) var(--ease-out), transform var(--dur-fast)',
        filter: h && !disabled ? 'brightness(1.12)' : 'none',
        ...V[variant], ...S[size], ...style,
      }}
    >
      {children}
    </button>
  )
}

export function ServicePill({ children, active, onClick, style }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={!!active}
      style={{
        display: 'inline-flex', alignItems: 'center', padding: '4px 12px', border: 0, borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--be-blue)' : 'rgba(36,134,171,.28)', color: active ? '#fff' : 'var(--be-blue-200)',
        font: '400 15px/1.3 var(--font-serif)', letterSpacing: '.02em', cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-base) var(--ease-out)', ...style,
      }}
    >
      {children}
    </button>
  )
}

export function BrandRule({ color = 'var(--be-blue)', thickness = 3, dot = 13, width = '100%', style }) {
  const d = { position: 'absolute', top: -(dot - thickness) / 2, width: dot, height: dot, borderRadius: '50%', background: color }
  return (
    <div style={{ position: 'relative', height: thickness, background: color, width: `calc(${width} - ${dot}px)`, margin: '0 ' + dot / 2 + 'px', ...style }}>
      <i style={{ ...d, left: -dot / 2 }} />
      <i style={{ ...d, right: -dot / 2 }} />
    </div>
  )
}
