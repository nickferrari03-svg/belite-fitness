/* @ds-bundle: {"format":4,"namespace":"BEliteFitnessDesignSystem_fb8647","components":[{"name":"BrandRule","sourcePath":"components/brand/BrandRule.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"DayCard","sourcePath":"components/schedule/DayCard.jsx"},{"name":"ScheduleGrid","sourcePath":"components/schedule/ScheduleGrid.jsx"},{"name":"CaptionTag","sourcePath":"components/social/CaptionTag.jsx"},{"name":"ContactBar","sourcePath":"components/social/ContactBar.jsx"},{"name":"ReviewCard","sourcePath":"components/social/ReviewCard.jsx"},{"name":"ServicePill","sourcePath":"components/social/ServicePill.jsx"}],"sourceHashes":{"components/brand/BrandRule.jsx":"aa05dc366bc0","components/brand/Logo.jsx":"a399eb59621d","components/core/Button.jsx":"f593ee6d9219","components/core/Icon.jsx":"d7d3973b112b","components/schedule/DayCard.jsx":"f8f58a4d99f4","components/schedule/ScheduleGrid.jsx":"4268d9b63582","components/social/CaptionTag.jsx":"85e164b7adda","components/social/ContactBar.jsx":"d5983a7a09af","components/social/ReviewCard.jsx":"014d9ac5101e","components/social/ServicePill.jsx":"845adf7f3352","ui_kits/instagram/Feed.jsx":"ceee151c7296","ui_kits/instagram/Posts.jsx":"096f7d6a0318"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BEliteFitnessDesignSystem_fb8647 = window.BEliteFitnessDesignSystem_fb8647 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandRule.jsx
try { (() => {
function BrandRule({
  color = 'var(--be-blue)',
  thickness = 3,
  dot = 13,
  width = '100%',
  style
}) {
  const d = {
    position: 'absolute',
    top: -(dot - thickness) / 2,
    width: dot,
    height: dot,
    borderRadius: '50%',
    background: color
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: thickness,
      background: color,
      width,
      margin: '0 ' + dot / 2 + 'px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      ...d,
      left: -dot / 2
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      ...d,
      right: -dot / 2
    }
  }));
}
Object.assign(__ds_scope, { BrandRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandRule.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
const SRC = {
  full: 'logo.png',
  lockup: 'logo-lockup.png',
  mark: 'logo-mark.png'
};
function Logo({
  variant = 'lockup',
  height = 80,
  base = 'assets/',
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: base + SRC[variant],
    alt: "B Elite Fitness",
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const V = {
  primary: {
    background: 'var(--be-blue)',
    color: '#fff',
    border: '2px solid var(--be-blue)'
  },
  inverse: {
    background: '#fff',
    color: 'var(--be-ink)',
    border: '2px solid #fff'
  },
  outline: {
    background: 'transparent',
    color: '#fff',
    border: '2px solid #fff'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--be-blue)',
    border: '2px solid transparent'
  }
};
const S = {
  sm: {
    padding: '8px 16px',
    fontSize: 12
  },
  md: {
    padding: '12px 24px',
    fontSize: 14
  },
  lg: {
    padding: '16px 32px',
    fontSize: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled,
  onClick,
  iconRight,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      transition: 'filter var(--dur-fast) var(--ease-out), transform var(--dur-fast)',
      filter: h && !disabled ? 'brightness(1.12)' : 'none',
      ...V[variant],
      ...S[size],
      ...style
    },
    onMouseDown: e => e.currentTarget.style.transform = 'scale(.97)',
    onMouseUp: e => e.currentTarget.style.transform = 'none'
  }, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const CDN = 'https://unpkg.com/lucide-static@0.456.0/icons/';
function Icon({
  name = 'phone',
  size = 20,
  color = 'currentColor',
  style
}) {
  const url = 'url(' + CDN + name + '.svg)';
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: 'none',
      background: color,
      WebkitMask: url + ' center/contain no-repeat',
      mask: url + ' center/contain no-repeat',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/schedule/DayCard.jsx
try { (() => {
function DayCard({
  day,
  slots = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-soft)',
      overflow: 'hidden',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--be-blue)',
      color: '#fff',
      textAlign: 'center',
      font: '600 16px/1 var(--font-sans)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      padding: '10px 8px',
      borderRadius: 'var(--radius-md)',
      margin: 4
    }
  }, day), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, slots.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderTop: i ? '1px solid var(--be-blue-100)' : 'none',
      paddingTop: i ? 10 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.2 var(--font-sans)',
      color: 'var(--be-blue-700)'
    }
  }, s.time), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 10px/1.3 var(--font-sans)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: 'var(--be-blue)'
    }
  }, s.label)))));
}
Object.assign(__ds_scope, { DayCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/schedule/DayCard.jsx", error: String((e && e.message) || e) }); }

// components/schedule/ScheduleGrid.jsx
try { (() => {
const FILL = {
  reformer: 'var(--class-reformer)',
  matwork: 'var(--class-matwork)',
  yoga: 'var(--class-yoga)'
};
function ScheduleGrid({
  days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
  rows = [],
  style
}) {
  const cell = {
    border: '1px solid rgba(255,255,255,.55)',
    padding: 4,
    height: 40,
    verticalAlign: 'top'
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%',
      tableLayout: 'fixed',
      color: '#fff',
      ...style
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, days.map(d => /*#__PURE__*/React.createElement("th", {
    key: d,
    style: {
      ...cell,
      height: 'auto',
      font: '600 10px var(--font-sans)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '6px 4px'
    }
  }, d)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, days.map((_, j) => {
    const c = r[j];
    return /*#__PURE__*/React.createElement("td", {
      key: j,
      style: {
        ...cell,
        background: c ? FILL[c.type] : 'transparent',
        color: c ? 'var(--be-ink)' : '#fff'
      }
    }, c && /*#__PURE__*/React.createElement("div", {
      style: {
        font: '600 9px/1.25 var(--font-sans)',
        textTransform: 'uppercase'
      }
    }, c.time, /*#__PURE__*/React.createElement("br", null), c.label));
  })))));
}
Object.assign(__ds_scope, { ScheduleGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/schedule/ScheduleGrid.jsx", error: String((e && e.message) || e) }); }

// components/social/CaptionTag.jsx
try { (() => {
function CaptionTag({
  children,
  variant = 'block',
  size = 28,
  style
}) {
  if (variant === 'outline') return /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 ' + size + 'px/1.05 var(--font-sans)',
      textTransform: 'uppercase',
      color: 'var(--be-sky)',
      WebkitTextStroke: '1px #fff',
      textAlign: 'center',
      ...style
    }
  }, children);
  const words = String(children).split(' ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      ...style
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: '#000',
      color: '#fff',
      font: size + 'px/1 var(--font-display)',
      padding: '3px 6px 1px'
    }
  }, w)));
}
Object.assign(__ds_scope, { CaptionTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/CaptionTag.jsx", error: String((e && e.message) || e) }); }

// components/social/ContactBar.jsx
try { (() => {
function Item({
  icon,
  label,
  value,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--be-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 11px/1.2 var(--font-sans)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: dark ? '#fff' : 'var(--be-blue-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 13px/1.3 var(--font-sans)',
      color: dark ? 'var(--be-gray-300)' : 'var(--be-blue-700)'
    }
  }, value)));
}
function ContactBar({
  phone = '339 870 1308',
  address = 'Via Aymo Maggi 3 – Calino',
  dark,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Item, {
    icon: "map-pin",
    label: "B Elite Fitness",
    value: address,
    dark: dark
  }), /*#__PURE__*/React.createElement(Item, {
    icon: "phone",
    label: "Info e prenotazioni",
    value: phone,
    dark: dark
  }));
}
Object.assign(__ds_scope, { ContactBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/ContactBar.jsx", error: String((e && e.message) || e) }); }

// components/social/ReviewCard.jsx
try { (() => {
function ReviewCard({
  quote,
  author,
  stars = 5,
  source = 'Google',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#000',
      color: '#fff',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 32px',
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 22px var(--font-sans)',
      color: 'var(--be-blue-200)'
    }
  }, source === 'Google' ? 'G' : source), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flex: 1,
      justifyContent: 'center'
    }
  }, Array.from({
    length: stars
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: 16,
    color: "#fff"
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.55 var(--font-sans)',
      textAlign: 'center',
      textWrap: 'pretty'
    }
  }, "\u201C", quote, "\u201D"), author && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'italic 700 14px var(--font-sans)'
    }
  }, "- ", author));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/social/ServicePill.jsx
try { (() => {
function ServicePill({
  children,
  active,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'var(--be-blue)' : 'rgba(36,134,171,.28)',
      color: active ? '#fff' : 'var(--be-blue-200)',
      font: '400 15px/1.3 var(--font-serif)',
      letterSpacing: '.02em',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur-base) var(--ease-out)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ServicePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/social/ServicePill.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/Feed.jsx
try { (() => {
const {
  Logo,
  Icon
} = window.BEliteFitnessDesignSystem_fb8647;
const POSTS = [{
  id: 'servizi',
  el: /*#__PURE__*/React.createElement(ServicesPost, null),
  h: 1080
}, {
  id: 'cose',
  el: /*#__PURE__*/React.createElement(WhatIsPost, null),
  h: 1080
}, {
  id: 'entrance',
  el: /*#__PURE__*/React.createElement(PhotoPost, {
    photo: "studio-entrance"
  }),
  h: 1350
}, {
  id: 'equip',
  el: /*#__PURE__*/React.createElement(PhotoPost, {
    photo: "equipment-detail"
  }),
  h: 1350
}, {
  id: 'reel1',
  el: /*#__PURE__*/React.createElement(ReelCover, {
    photo: "reformer-class",
    title: "Pilates Reformer"
  }),
  h: 1350,
  reel: true
}, {
  id: 'floor',
  el: /*#__PURE__*/React.createElement(PhotoPost, {
    photo: "studio-floor"
  }),
  h: 1350
}, {
  id: 'reel2',
  el: /*#__PURE__*/React.createElement(ReelCover, {
    photo: "mirror-training",
    title: "Come funziona il nostro personal training?",
    sub: "Visto che a settembre"
  }),
  h: 1350,
  reel: true
}, {
  id: 'flyer',
  el: /*#__PURE__*/React.createElement(PilatesFlyer, null),
  h: 1080
}, {
  id: 'yoga',
  el: /*#__PURE__*/React.createElement(PhotoPost, {
    photo: "yoga"
  }),
  h: 1350
}, {
  id: 'orari',
  el: /*#__PURE__*/React.createElement(OrariPost, null),
  h: 1080
}, {
  id: 'reel3',
  el: /*#__PURE__*/React.createElement(ReelCover, {
    photo: "reformer-room",
    title: "Cosa cambia dopo le prime lezioni",
    sub: "Dopo le prime settimane"
  }),
  h: 1350,
  reel: true
}, {
  id: 'review',
  el: /*#__PURE__*/React.createElement(ReviewPost, null),
  h: 1080
}];
function Tile({
  p,
  w,
  onOpen
}) {
  const s = w / 1080;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: w,
      height: w * 1.25,
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'scale(' + s + ')',
      transformOrigin: 'top left',
      width: 1080,
      position: 'absolute',
      top: p.h === 1080 ? w * 0.125 : 0
    }
  }, p.el), p.reel && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      right: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clapperboard",
    size: 20,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,.35)',
      opacity: h ? 1 : 0,
      transition: 'opacity var(--dur-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      font: '700 16px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 20,
    color: "#fff"
  }), "42"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 20,
    color: "#fff"
  }), "1")));
}
function App() {
  const [open, setOpen] = React.useState(null);
  const [vw, setVw] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const f = () => setVw(window.innerWidth);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const w = Math.min(236, Math.floor((Math.min(vw, 960) - 44) / 4));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      padding: '28px 16px'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      padding: '0 12px 24px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: '#000',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    height: 62,
    base: "../../assets/"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontSize: 14,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600
    }
  }, "belitefitness"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, "B Elite Fitness"), /*#__PURE__*/React.createElement("div", null, "Allenamento individuale. Su misura per te.", /*#__PURE__*/React.createElement("br", null), "\uD83E\uDDD8Personal Training | Pilates | Yoga"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 14
  }), "339 870 1308"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), "Via Aymo Maggi 3, Cazzago San Martino 25046")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,' + w + 'px)',
      gap: 4,
      justifyContent: 'center',
      marginTop: 4
    }
  }, POSTS.map(p => /*#__PURE__*/React.createElement(Tile, {
    key: p.id,
    p: p,
    w: w,
    onOpen: () => setOpen(p)
  }))), open && /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(null),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.82)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 540,
      height: open.h / 2,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'scale(.5)',
      transformOrigin: 'top left',
      width: 1080
    }
  }, open.el)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(null),
    style: {
      position: 'absolute',
      top: 20,
      right: 24,
      background: 'none',
      border: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 28,
    color: "#fff"
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/Feed.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/Posts.jsx
try { (() => {
const {
  Logo,
  BrandRule,
  ServicePill,
  CaptionTag,
  ReviewCard,
  ContactBar,
  DayCard,
  ScheduleGrid,
  Icon
} = window.BEliteFitnessDesignSystem_fb8647;
const A = '../../assets/';
const sq = {
  width: 1080,
  height: 1080,
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--font-sans)'
};
function ServicesPost() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 170,
      width: 620,
      height: 910,
      background: 'url(' + A + 'photos/mirror-training.png) center/cover',
      borderTopLeftRadius: 620,
      opacity: .85
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      top: 70,
      font: '96px/1 var(--font-serif)',
      color: 'var(--be-blue-700)'
    }
  }, "I NOSTRI SERVIZI"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      top: 250,
      color: '#fff',
      font: '400 30px var(--font-serif)'
    }
  }, "Scopri tutti i nostri servizi:"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      top: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      alignItems: 'flex-start'
    }
  }, ['Allenamento individuale', 'Pilates Reformer', 'Pilates Matwork', 'Fisioterapia', 'Osteopatia', 'Nutrizione'].map(s => /*#__PURE__*/React.createElement(ServicePill, {
    key: s,
    style: {
      fontSize: 34,
      padding: '8px 26px'
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      bottom: 60,
      color: 'var(--be-gray-300)',
      font: '400 22px/1.4 var(--font-serif)'
    }
  }, "www.belitefitness.it", /*#__PURE__*/React.createElement("br", null), "info@belitefitness.it"));
}
function WhatIsPost() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -1300,
      top: -420,
      width: 1920,
      height: 1920,
      borderRadius: '50%',
      background: 'var(--be-blue)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 70,
      top: 150,
      color: '#fff',
      font: '136px/.92 var(--font-display)'
    }
  }, "COS'\xC8 IL PERSONAL", /*#__PURE__*/React.createElement("br", null), "TRAINING DI", /*#__PURE__*/React.createElement("br", null), "B ELITE FITNESS?"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 70,
      top: 600,
      color: '#fff',
      font: '400 50px/1.35 var(--font-sans)'
    }
  }, "Non il solito allenamento.", /*#__PURE__*/React.createElement("br", null), "Una nuova esperienza,", /*#__PURE__*/React.createElement("br", null), "pensata solo per te."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 90,
      top: 480
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 96,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: 70,
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    height: 130,
    base: A
  })));
}
function PilatesFlyer() {
  const days = [['Lunedì', [{
    time: '18:00–19:00',
    label: 'Pilates Reformer'
  }]], ['Martedì', [{
    time: '18:00–19:00',
    label: 'Pilates Matwork'
  }, {
    time: '19:15–20:15',
    label: 'Pilates Reformer'
  }]], ['Giovedì', [{
    time: '17:15–18:15',
    label: 'Pilates Reformer'
  }, {
    time: '18:30–19:30',
    label: 'Pilates Matwork'
  }]]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      background: 'linear-gradient(180deg,#fff 0%,var(--be-blue-50) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 40,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#000',
      display: 'inline-block',
      padding: '10px 20px',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    height: 90,
    base: A
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '150px/.9 var(--font-display)',
      color: 'var(--be-blue)',
      marginTop: 20
    }
  }, "PILATES"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 64px/1 var(--font-sans)',
      color: 'var(--be-blue)',
      letterSpacing: '.06em'
    }
  }, "CON SARA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      marginTop: 18,
      background: 'var(--be-blue)',
      color: '#fff',
      font: '600 22px var(--font-sans)',
      letterSpacing: '.14em',
      padding: '8px 26px',
      borderRadius: 999
    }
  }, "CORSI A NUMERO CHIUSO")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      right: 60,
      top: 520,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--be-blue)',
      color: '#fff',
      padding: '18px 32px',
      borderRadius: 14,
      textAlign: 'center',
      boxShadow: 'var(--shadow-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 34px var(--font-sans)'
    }
  }, "REFORMER:"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 18px var(--font-sans)'
    }
  }, "PI\xD9 ATTENZIONE, PI\xD9 PRECISIONE, PI\xD9 RISULTATI."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '48px var(--font-display)',
      marginTop: 6
    }
  }, "SOLO 2 PARTECIPANTI."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 40,
      right: 40,
      top: 720,
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, days.map(([d, s]) => /*#__PURE__*/React.createElement(DayCard, {
    key: d,
    day: d,
    slots: s,
    style: {
      transform: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 60,
      right: 60,
      bottom: 30
    }
  }, /*#__PURE__*/React.createElement(ContactBar, null)));
}
function OrariPost() {
  const R = (t, l, y) => ({
    time: t,
    label: l,
    type: y
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 50
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "full",
    height: 170,
    base: A
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: '#fff',
      font: '600 46px var(--font-sans)',
      letterSpacing: '.08em',
      margin: '24px 0 30px'
    }
  }, "ORARI CORSI"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 90px',
      transform: 'scale(1)'
    }
  }, /*#__PURE__*/React.createElement(ScheduleGrid, {
    style: {
      fontSize: 14
    },
    rows: [[null, R('11:30–12:30', 'Reformer pilates', 'reformer'), null, null, R('10:00–11:00', 'Reformer pilates', 'reformer')], [null, R('12:30–13:30', 'Reformer pilates', 'reformer'), null, null, R('11:00–12:00', 'Reformer pilates', 'reformer')], [null, null, null, null, R('13:00–14:00', 'Reformer pilates', 'reformer')], [null, null, R('17:00–18:00', 'Pilates reformer', 'reformer'), R('17:15–18:15', 'Pilates reformer', 'reformer'), null], [R('18:00–19:00', 'Pilates reformer', 'reformer'), R('18:00–19:00', 'Pilates matwork', 'reformer'), R('18:00–19:00', 'Pilates reformer', 'reformer'), R('18:30–19:30', 'Pilates matwork soft', 'matwork'), null], [null, R('19:15–20:15', 'Matwork reformer', 'reformer'), R('19:00–20:00', 'Yoga', 'yoga'), null, null]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 60,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: '#fff',
      font: '600 22px var(--font-sans)',
      letterSpacing: '.14em'
    }
  }, "Per info e prenotazioni: 3398701308 - Andrea", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      marginTop: 14
    }
  }, "www.belitefitness.it")));
}
function ReviewPost() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      background: 'var(--be-blue)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'url(' + A + 'logo-mark.png) -120px 200px/900px no-repeat',
      opacity: .12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: '#fff',
      font: 'italic 150px/1 var(--font-serif)',
      marginTop: 80
    }
  }, "Review"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 110,
      right: 110,
      top: 330
    }
  }, /*#__PURE__*/React.createElement(ReviewCard, {
    style: {
      padding: '56px 64px',
      gap: 30
    },
    quote: "Studio personal ottimo: personale preparato, gentile e disponibile, attrezzature di ultima generazione, percorsi di miglioramento personalizzati e sempre rivalutati dai personal trainer.",
    author: "L.R."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 40,
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "mark",
    height: 80,
    base: A
  })));
}
function ReelCover({
  photo,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      height: 1350,
      width: 1080,
      background: 'url(' + A + 'photos/' + photo + '.png) center/cover'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 90,
      left: 60,
      right: 60
    }
  }, /*#__PURE__*/React.createElement(CaptionTag, {
    variant: "outline",
    size: 64
  }, title)), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 120,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(CaptionTag, {
    size: 60
  }, sub)));
}
function PhotoPost({
  photo
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...sq,
      height: 1350,
      background: 'url(' + A + 'photos/' + photo + '.png) center/cover'
    }
  });
}
Object.assign(window, {
  ServicesPost,
  WhatIsPost,
  PilatesFlyer,
  OrariPost,
  ReviewPost,
  ReelCover,
  PhotoPost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/Posts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BrandRule = __ds_scope.BrandRule;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.DayCard = __ds_scope.DayCard;

__ds_ns.ScheduleGrid = __ds_scope.ScheduleGrid;

__ds_ns.CaptionTag = __ds_scope.CaptionTag;

__ds_ns.ContactBar = __ds_scope.ContactBar;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.ServicePill = __ds_scope.ServicePill;

})();
