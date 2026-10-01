// Static data and helpers, ported from 'B Elite App v3.dc.html'. All content is placeholder until real studio data arrives.
export const DAYS=[{k:'LUN',n:28,full:'Lunedì 28 settembre'},{k:'MAR',n:29,full:'Martedì 29 settembre'},{k:'MER',n:30,full:'Mercoledì 30 settembre'},{k:'GIO',n:1,full:'Giovedì 1 ottobre'},{k:'VEN',n:2,full:'Venerdì 2 ottobre'},{k:'SAB',n:3,full:'Sabato 3 ottobre'}];
export const TYPES={reformer:{name:'Pilates Reformer',kind:'REFORMER',color:'#A9D2E8'},matwork:{name:'Pilates Matwork',kind:'MATWORK',color:'#3F9CC4'},yoga:{name:'Yoga',kind:'YOGA',color:'#E7B6F0'}};
export const SLOTS=[['07:30','reformer','Andrea'],['09:00','matwork','Sara'],['10:30','reformer','Sara'],['12:30','reformer','Andrea'],['18:00','yoga','Marta'],['19:15','reformer','Andrea'],['20:30','matwork','Sara']];
export const PLAN=[[0,1,3,4,5,6],[0,2,3,5],[1,3,4,5,6],[0,2,3,5,6],[0,1,3,4,5],[1,2,4]];
export const FULL={'0-07:30':1,'0-19:15':1,'2-12:30':1,'3-19:15':1};
export const cls=(d,i)=>{const s0=SLOTS[i];const id=d+'-'+s0[0];let s=0;for(const ch of id)s+=ch.charCodeAt(0);return Object.assign({id:id,d:d,time:s0[0],type:s0[1],trainer:s0[2]},TYPES[s0[1]],{full:!!FULL[id],seed:s});};
export const ALL={};
PLAN.forEach((ix,d)=>ix.forEach(i=>{const c=cls(d,i);ALL[c.id]=c;}));
export const LIB=[['Roll Up al Reformer','10'],['Plank con knee tuck','30 sec'],['Bridge su jumpboard','12'],['Side kick in serie','12 per lato'],['Stretching catena posteriore','5 min'],['Footwork al Reformer','12'],['Swan','8'],['Dead bug','10 per lato'],['Squat con elastico','15'],['Bird dog','10 per lato'],['Mermaid','6 per lato'],['Hundred','100 battute']];
export const TIMES=['07:30','09:00','10:30','12:30','17:00','18:00','19:15','20:30'];
export const ADD_TIMES=['07:00','08:30','11:00','14:00','17:00','21:00'];
export const CLIENTS=[['Francesca Conti','Tonificazione e postura',6,null],['Marco Bianchi','Forza funzionale',3,3],['Elena Ferri','Pilates Reformer',7,1],['Luca Moretti','Mobilità e schiena',2,7],['Sofia Galli','Post-parto',4,5]];
export const POOL=['Marco B.','Elena F.','Luca M.','Sofia G.','Chiara V.'];
export const MEAS=[['w','PESO','kg',0.1],['v','VITA','cm',0.5],['h','FIANCHI','cm',0.5]];
export const TEAM=[['Andrea','Titolare · Personal trainer'],['Sara','Pilates Reformer e Matwork'],['Marta','Yoga']];
let NID=0;
export const mk=(icon,t,b,time,go)=>({id:++NID,icon:icon,t:t,b:b,time:time,go:go||{},read:false});
export const ini=n=>{const w=n.trim().split(/\s+/);return (w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase();};
export const fmt=x=>(Math.round(x*10)/10).toFixed(1).replace('.',',');
export const sgn=x=>Math.abs(x)<0.05?'±0':(x>0?'+':'−')+fmt(Math.abs(x));
export const initPlan=i=>{const s=(i*2)%LIB.length;return [0,1,2,3,4].map(k=>{const e=LIB[(s+k)%LIB.length];return {name:e[0],sets:k===4?1:3,reps:e[1]};});};
export const det=e=>e.sets+' × '+e.reps;
export const ck=on=>({ring:on?'#2486AB':'#6B7479',fill:on?'#2486AB':'transparent',tick:on?'#fff':'transparent'});
export const lc=on=>({bg:on?'#2486AB':'#fff',fg:on?'#fff':'#0B0D0F',bd:on?'#2486AB':'rgba(11,13,15,.14)'});
export const dayShort=d=>DAYS[d].full.split(' ').slice(0,2).join(' ');

// Studio configuration: everything the owner can customise from Studio. Saved on the device.
export const OWNER_ID='t1';
export const BASE_TRAINER={Andrea:'t1',Sara:'t2',Marta:'t3'};
export const SERVICES=[['pt','Personal Training'],['fisio','Fisioterapia'],['osteo','Osteopatia'],['nutri','Nutrizione'],['recep','Reception'],['admin','Amministrazione']];
export const PERMS=[['agenda','Gestisce l’agenda','Aggiunge, sposta e annulla corsi'],['clients','Vede tutti i clienti','Schede, pacchetti e progressi'],['plans','Modifica i piani','Esercizi e note per i clienti'],['renew','Conferma i rinnovi','Aggiunge lezioni ai pacchetti']];
export const PALETTE=['#A9D2E8','#3F9CC4','#E7B6F0','#F3C98B','#9FD8B5','#F2A7A0','#C9C2F2','#BFC5C8'];
export const DEFAULT_CFG={
  types:{reformer:{name:'Pilates Reformer',color:'#A9D2E8',cap:2,dur:50},matwork:{name:'Pilates Matwork',color:'#3F9CC4',cap:4,dur:50},yoga:{name:'Yoga',color:'#E7B6F0',cap:4,dur:60}},
  team:[{id:'t1',name:'Andrea',role:'Titolare · Personal trainer',owner:true,tasks:['reformer','matwork','pt'],perms:{agenda:1,clients:1,plans:1,renew:1}},
    {id:'t2',name:'Sara',role:'Istruttrice Pilates',tasks:['reformer','matwork'],perms:{agenda:1,plans:1}},
    {id:'t3',name:'Marta',role:'Insegnante Yoga',tasks:['yoga'],perms:{agenda:1}}],
  extraTasks:[],
  rules:{cancel:24,latePenalty:true,waitOn:true,wait:30,maxWeek:4,minBefore:2,bookAhead:14},
};
export const shortName=n=>n.replace(/^Pilates\s+/i,'');
const CFG_KEY='belite.studio.v1';
export const loadCfg=()=>{try{const s=JSON.parse(localStorage.getItem(CFG_KEY));if(s&&s.types&&s.team&&s.rules)return Object.assign({},DEFAULT_CFG,s,{rules:Object.assign({},DEFAULT_CFG.rules,s.rules)});}catch{/* storage unavailable */}return DEFAULT_CFG;};
export const saveCfg=c=>{try{localStorage.setItem(CFG_KEY,JSON.stringify(c));}catch{/* storage unavailable */}};
export const clearCfg=()=>{try{localStorage.removeItem(CFG_KEY);}catch{/* storage unavailable */}};
