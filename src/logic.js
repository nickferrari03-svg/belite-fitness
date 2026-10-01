// App state and behaviour, ported from the v3 prototype's DC logic.
import { Component } from 'react'
import { DAYS, TYPES, SLOTS, PLAN, ALL, LIB, TIMES, ADD_TIMES, CLIENTS, POOL, MEAS, TEAM, mk, ini, fmt, sgn, initPlan, det, ck, lc, dayShort } from './data.js'

export class BeliteLogic extends Component {
  state={role:null,tab:null,sub:'piano',prev:null,day:0,filter:'all',sheet:null,booked:['0-12:30','2-18:00'],used:0,bonus:0,toast:null,
    done:{'Roll Up al Reformer':1,'Plank con knee tuck':1},sessions:23,doneToday:false,checkin:{},client:0,
    notifs:{client:[mk('bell-ring','Promemoria lezione','Pilates Reformer lunedì alle 12:30 con Andrea.','2 h',{tab:'home'}),mk('dumbbell','Piano aggiornato','Andrea ha aggiornato il tuo piano: settimana 6.','Ieri',{tab:'io',sub:'piano'}),mk('package','Il tuo pacchetto','Le tue lezioni sono valide fino al 31 dicembre.','3 g',{tab:'home'})],
      trainer:[mk('user-plus','Nuova prenotazione','Giulia R. · Pilates Reformer, lunedì 12:30.','10 min',{tab:'agenda'}),mk('calendar-x','Cancellazione','Marco B. ha annullato Reformer martedì 07:30.','1 h',{tab:'agenda'}),mk('circle-alert','Pacchetto in esaurimento','Elena F. ha 1 lezione rimasta.','Ieri',{tab:'clientDetail',client:2})]},
    waitlist:[],offer:null,now:0,raced:{},raceUsed:false,pending:false,sheetErr:null,confirmCancel:false,
    cancelled:{},moved:{},added:[],addType:'reformer',addTime:'17:00',caps:{reformer:2,matwork:4,yoga:4},rules:{cancel:24,wait:30},q:'',cfilter:'all',
    plans:{},notes:{0:'Ottimo controllo nel Roll Up. Questa settimana aumentiamo la tenuta del plank.'},draft:[],draftNote:'',
    renewPick:10,renewReq:null,measStart:{w:64.5,v:75,h:99},measNow:{w:62.4,v:71,h:96},measDate:'22 settembre',measDraft:null,loading:false};
  componentDidMount(){this._i=setInterval(()=>{const o=this.state.offer;if(!o)return;if(Date.now()>=o.end){this.setState(s=>({offer:null,waitlist:s.waitlist.filter(w=>w!==o.id)}));this.flash('Tempo scaduto · il posto è passato al prossimo');}else this.setState({now:Date.now()});},1000);}
  componentWillUnmount(){clearInterval(this._i);[this._t,this._w,this._l,this._p].forEach(clearTimeout);}
  flash(m){clearTimeout(this._t);this.setState({toast:m});this._t=setTimeout(()=>this.setState({toast:null}),2600);}
  push(role,icon,t,b,go){this.setState(s=>({notifs:Object.assign({},s.notifs,{[role]:[mk(icon,t,b,'Ora',go)].concat(s.notifs[role])})}));}
  role(){return this.state.role||this.props.role||'client';}
  tab(){return this.state.tab||(this.role()==='trainer'?'today':'home');}
  total(){return 10+this.state.bonus;}
  credits(){return Math.max(0,(this.props.packCredits??8)+this.state.bonus-this.state.used);}
  get(id){return ALL[id]||this.state.added.find(a=>a.id===id);}
  plan(i){return this.state.plans[i]||initPlan(i);}
  dt(c){return this.state.moved[c.id]||c.time;}
  dayList(d){return PLAN[d].map(i=>ALL[d+'-'+SLOTS[i][0]]).concat(this.state.added.filter(a=>a.d===d)).sort((a,b)=>this.dt(a).localeCompare(this.dt(b)));}
  info(c){const st=this.state;const cap=st.caps[c.type];const mine=st.booked.includes(c.id);const cancelled=!!st.cancelled[c.id];
    let base=(st.raced[c.id]||c.full)?cap:(c.added?0:c.seed%cap);if(mine)base=Math.min(base,cap-1);const taken=base+(mine?1:0);const free=cap-taken;
    const status=cancelled?'cancelled':mine?'booked':free<=0?'full':'open';
    return Object.assign({},c,{cap:cap,mine:mine,taken:taken,free:free,status:status,waiting:st.waitlist.includes(c.id),dtime:this.dt(c),day:dayShort(c.d),
      spotsLabel:cancelled?'Annullato':status==='full'?'Completo':free===1?'1 posto libero':free+' posti liberi'});}
  openSheet(s){this.setState({sheet:s,sheetErr:null,confirmCancel:false,pending:false});}
  row(c){const i=this.info(c);
    const T={booked:['PRENOTATO','#2486AB','#fff'],full:i.waiting?['IN ATTESA','#283A3E','#fff']:['COMPLETO','#283A3E','#BFC5C8'],open:['PRENOTA','#fff','#0B0D0F'],cancelled:['ANNULLATO','#283A3E','#BFC5C8']}[i.status];
    return Object.assign(i,{tag:T[0],tagBg:T[1],tagFg:T[2],sub:i.trainer+' · '+i.spotsLabel,opacity:i.status==='cancelled'?0.5:i.status==='full'?0.6:1,onOpen:()=>this.openSheet({kind:'class',id:c.id})});}
  book(id){const st=this.state;if(st.pending)return;
    if(this.props.offline){this.setState({sheetErr:'Sei offline. Controlla la connessione e riprova.'});return;}
    if(this.credits()<=0){this.setState({sheetErr:'Hai finito le lezioni del pacchetto. Richiedi il rinnovo dalla Home.'});return;}
    this.setState({pending:true,sheetErr:null});
    this._p=setTimeout(()=>{const i=this.info(this.get(id));
      if((this.props.simulateRace??true)&&!this.state.raceUsed&&i.free===1){this.setState(s=>({pending:false,raceUsed:true,raced:Object.assign({},s.raced,{[id]:true}),sheetErr:'Qualcuno ti ha preceduto: il corso è appena diventato completo. Puoi entrare in lista d’attesa.'}));return;}
      this.setState(s=>({booked:s.booked.concat(id),used:s.used+1,sheet:null,pending:false}));this.flash('Prenotazione confermata');
      this.push('trainer','user-plus','Nuova prenotazione','Giulia R. · '+i.name+', '+i.day+' '+i.dtime+'.',{tab:'agenda'});},700);}
  cancel(id){const i=this.info(this.get(id));this.setState(s=>({booked:s.booked.filter(b=>b!==id),used:s.used-1,sheet:null}));this.flash('Lezione annullata · credito restituito');
    this.push('trainer','calendar-x','Cancellazione','Giulia R. ha annullato '+i.name+', '+i.day+' '+i.dtime+'.',{tab:'agenda'});}
  wait(id){if(this.state.waitlist.includes(id)){this.setState(s=>({waitlist:s.waitlist.filter(w=>w!==id),sheet:null}));this.flash('Sei uscita dalla lista d’attesa');return;}
    this.setState(s=>({waitlist:s.waitlist.concat(id),sheet:null}));this.flash('Sei in lista d’attesa · ti avvisiamo noi');
    clearTimeout(this._w);this._w=setTimeout(()=>{const s=this.state;if(s.waitlist.includes(id)&&!s.offer){const i=this.info(this.get(id));const m=s.rules.wait;this.setState({offer:{id:id,end:Date.now()+m*60000},now:Date.now()});
      this.push('client','bell-ring','Si è liberato un posto',i.name+', '+i.day+' '+i.dtime+'. Hai '+m+' minuti per confermare.',{tab:'home'});}},5000);}
  move(id,t){const i=this.info(this.get(id));if(i.dtime===t)return;
    if(this.dayList(i.d).some(c=>c.id!==id&&this.dt(c)===t)){this.setState({sheetErr:'C’è già un corso alle '+t+' in questo giorno.'});return;}
    this.setState(s=>({moved:Object.assign({},s.moved,{[id]:t}),sheetErr:null}));this.flash('Spostato alle '+t+' · iscritti avvisati');
    if(i.mine)this.push('client','clock','Orario modificato',i.name+' di '+i.day+' ora è alle '+t+'.',{tab:'home'});}
  cancelClass(id){const i=this.info(this.get(id));
    this.setState(s=>({cancelled:Object.assign({},s.cancelled,{[id]:true}),booked:s.booked.filter(b=>b!==id),used:s.used-(i.mine?1:0),waitlist:s.waitlist.filter(w=>w!==id),sheet:null}));
    this.flash('Corso annullato · '+(i.taken===1?'1 iscritto avvisato':i.taken+' iscritti avvisati'));
    if(i.mine)this.push('client','calendar-x','Lezione annullata dallo studio',i.name+', '+i.day+' '+i.dtime+'. La lezione è tornata nel tuo pacchetto.',{tab:'home'});}
  renderVals(){
    const st=this.state;const role=this.role();const tab=this.tab();const credits=this.credits();const total=this.total();const tr=role==='trainer';const R=st.rules;
    const go=t=>()=>this.setState({tab:t,sheet:null});
    const dayClasses=this.dayList(st.day).filter(c=>st.filter==='all'||c.type===st.filter).map(c=>this.row(c));
    const mine=st.booked.map(id=>this.get(id)).filter(Boolean).map(c=>this.info(c)).sort((a,b)=>a.d-b.d||a.dtime.localeCompare(b.dtime)).map(c=>Object.assign(c,{k:DAYS[c.d].k,n:DAYS[c.d].n,onOpen:()=>this.openSheet({kind:'class',id:c.id})}));
    const n=mine[0];
    const sk=st.sheet&&st.sheet.kind;let sh={};
    if(sk==='class'||sk==='manage'){const i=this.info(this.get(st.sheet.id));const id=i.id;
      sh=Object.assign(i,{dots:Array.from({length:i.cap},(_,k)=>({bg:k<i.taken?'#3F9CC4':'transparent'})),canBook:i.status==='open',isBooked:i.status==='booked',isFull:i.status==='full',
        bookLabel:st.pending?'Prenotazione in corso…':'Conferma · usa 1 lezione',waitLabel:i.waiting?'Esci dalla lista d’attesa':'Entra in lista d’attesa',
        note:i.status==='cancelled'?'Questo corso è stato annullato dallo studio.':i.mine?'Cancellazione gratuita fino a '+R.cancel+' ore prima della lezione.':i.status==='full'?(i.waiting?'Sei in lista d’attesa. Quando si libera un posto hai '+R.wait+' minuti per confermarlo.':'Corso a numero chiuso. Se si libera un posto ti avvisiamo: avrai '+R.wait+' minuti per confermarlo.'):'Hai '+credits+' lezioni nel pacchetto. Cancellazione gratuita fino a '+R.cancel+' ore prima.',
        onBook:()=>this.book(id),onCancel:()=>this.cancel(id),onWait:()=>this.wait(id),
        moves:TIMES.map(t=>Object.assign({label:t,onPick:()=>this.move(id,t)},lc(i.dtime===t))),
        showMove:i.status!=='cancelled'&&!st.confirmCancel,confirming:i.status!=='cancelled'&&st.confirmCancel,isCancelled:i.status==='cancelled',
        cancelText:i.taken===0?'Nessun iscritto da avvisare.':i.taken===1?'L’iscritto riceve una notifica e la lezione torna nel suo pacchetto.':'I '+i.taken+' iscritti ricevono una notifica e la lezione torna nel loro pacchetto.',
        onAskCancel:()=>this.setState({confirmCancel:true}),onBackCancel:()=>this.setState({confirmCancel:false}),onCancelClass:()=>this.cancelClass(id),
        onRestore:()=>{this.setState(s=>{const c=Object.assign({},s.cancelled);delete c[id];return {cancelled:c,sheet:null};});this.flash('Corso ripristinato');}});}
    const md=st.measDraft||st.measNow;
    const tabDefs=tr?[['today','Oggi','layout-dashboard'],['agenda','Agenda','calendar-range'],['clients','Clienti','users'],['studio','Studio','settings']]:[['home','Home','house'],['orari','Prenota','calendar-plus'],['io','Percorso','dumbbell'],['profile','Profilo','user-round']];
    const active=tab==='clientDetail'||tab==='planEditor'?'clients':tab==='notifs'?'home':tab;
    const pl=this.plan(0);const exDoneN=pl.filter(e=>st.done[e.name]).length;
    const exercises=pl.map(e=>{const d=!!st.done[e.name];return Object.assign({name:e.name,detail:det(e),done:d,op:d?0.6:1,onToggle:()=>this.setState(s=>({done:Object.assign({},s.done,{[e.name]:!s.done[e.name]})}))},ck(d));});
    const week=[1,2,2,1,2,3,2,st.doneToday?2:1];
    const nl=st.notifs[role].map(x=>Object.assign({},x,{bg:x.read?'transparent':'#1A1D20',dot:x.read?'transparent':'#2486AB',
      onOpen:()=>this.setState(s=>Object.assign({notifs:Object.assign({},s.notifs,{[role]:s.notifs[role].map(y=>y.id===x.id?Object.assign({},y,{read:true}):y)}),prev:null,sheet:null},x.go))}));
    const unread=st.notifs[role].filter(x=>!x.read).length;
    // trainer
    const agenda=this.dayList(0).filter(c=>c.trainer==='Andrea'&&!st.cancelled[c.id]).map(c=>{const i=this.info(c);const s=c.seed||0;
      const names=(i.mine?['Giulia R.']:[]).concat(POOL.slice(s%3,s%3+i.taken-(i.mine?1:0)));
      const people=names.map(nm=>{const k=c.id+'|'+nm;const on=!!st.checkin[k];return Object.assign({name:nm,init:ini(nm),on:on,onToggle:()=>this.setState(x=>({checkin:Object.assign({},x.checkin,{[k]:!x.checkin[k]})}))},ck(on));});
      return Object.assign(i,{people:people,count:people.length,present:people.filter(p=>p.on).length,empty:!people.length});});
    const ppl=agenda.reduce((t,a)=>t+a.count,0);const pres=agenda.reduce((t,a)=>t+a.present,0);
    const todo=nl.filter(x=>!x.read);
    const times=[];DAYS.forEach((_,d)=>this.dayList(d).forEach(c=>{const t=this.dt(c);if(!times.includes(t))times.push(t);}));times.sort();
    let occT=0,occC=0;
    const grid=times.map(t=>({t:t,cells:DAYS.map((_,d)=>{const c=this.dayList(d).find(x=>this.dt(x)===t);
      if(!c)return {label:'+',aria:'Aggiungi corso '+dayShort(d)+' '+t,bg:'transparent',fg:'#BFC5C8',bd:'1px dashed rgba(11,13,15,.14)',deco:'none',onTap:()=>{this.setState({day:d,addTime:t});this.openSheet({kind:'add'});}};
      const i=this.info(c);const canc=i.status==='cancelled';if(!canc){occT+=i.taken;occC+=i.cap;}
      return {label:canc?'ANN.':i.taken+'/'+i.cap,aria:i.name+' '+i.day+' '+t,bg:canc?'#E6E4E1':i.color,fg:canc?'#6B7479':'#0B0D0F',bd:!canc&&i.free<=0?'2px solid #0B0D0F':'0',deco:canc?'line-through':'none',onTap:()=>this.openSheet({kind:'manage',id:c.id})};})}));
    const allClients=CLIENTS.map((r,i)=>{const c=i===0?credits:r[3];const renew=i===0&&!!st.renewReq;const low=c<=1;
      return {i:i,name:r[0],plan:r[1],week:r[2],pct:(r[2]/8*100)+'%',credits:c,renew:renew,low:low,init:ini(r[0]),tag:renew?'RINNOVO':c+' LEZ.',tagBg:renew?'#2486AB':low?'#0B0D0F':'#EEF7FB',tagFg:renew||low?'#fff':'#0B0D0F',onOpen:()=>this.setState({tab:'clientDetail',client:i})};});
    const q=st.q.trim().toLowerCase();
    const clients=allClients.filter(c=>(!q||c.name.toLowerCase().includes(q))&&(st.cfilter==='all'||(st.cfilter==='renew'&&(c.renew||c.low))));
    const cc=allClients[st.client]||allClients[0];const first=cc.name.split(' ')[0];
    const cd=Object.assign({},cc,{firstUpper:first.toUpperCase(),saveLabel:'Salva e invia a '+first,
      note:cc.credits<=1?'Pacchetto quasi esaurito: proponi il rinnovo.':'In linea con gli obiettivi del piano.',
      hasRenew:st.client===0&&!!st.renewReq,renewText:st.renewReq?st.renewReq.pack+' lezioni':'',
      sessions:[['Pilates Reformer','Ven 26 set'],['Personal Training','Mer 24 set'],['Pilates Reformer','Lun 22 set']].map(r=>({name:r[0],when:r[1]})),
      onRemind:()=>this.flash('Promemoria inviato a '+first),
      onRenew:()=>{const k=st.renewReq.pack;this.setState(s=>({bonus:s.bonus+k,renewReq:null,notifs:Object.assign({},s.notifs,{trainer:s.notifs.trainer.map(y=>y.t==='Richiesta di rinnovo'?Object.assign({},y,{read:true}):y)})}));this.flash('Rinnovo confermato · +'+k+' lezioni a '+first);
        this.push('client','circle-check','Rinnovo confermato','Andrea ha aggiunto '+k+' lezioni al tuo pacchetto. Saldo in studio.',{tab:'home'});}});
    const draft=st.draft.map((e,idx)=>({name:e.name,sets:e.sets,detail:det(e),
      onMinus:()=>this.setState(s=>({draft:s.draft.map((x,j)=>j===idx?Object.assign({},x,{sets:Math.max(1,x.sets-1)}):x)})),
      onPlus:()=>this.setState(s=>({draft:s.draft.map((x,j)=>j===idx?Object.assign({},x,{sets:Math.min(6,x.sets+1)}):x)})),
      onRemove:()=>this.setState(s=>({draft:s.draft.filter((_,j)=>j!==idx)}))}));
    const rule=(label,sub,val,fn,min,max,step)=>({label:label,sub:sub,val:val,onMinus:()=>fn(Math.max(min,(typeof val==='number'?val:parseInt(val))-step)),onPlus:()=>fn(Math.min(max,(typeof val==='number'?val:parseInt(val))+step))});
    const setCap=k=>v=>this.setState(s=>({caps:Object.assign({},s.caps,{[k]:v})}));
    const setRule=k=>v=>this.setState(s=>({rules:Object.assign({},s.rules,{[k]:v})}));
    const left=st.offer?Math.max(0,st.offer.end-(st.now||Date.now())):0;const oc=st.offer?this.info(this.get(st.offer.id)):null;
    const switchRole=r=>()=>{this.setState({role:r,tab:null,sheet:null});this.flash(r==='trainer'?'Accesso staff · ciao Andrea':'Vista cliente');};
    const addTimes=ADD_TIMES.includes(st.addTime)?ADD_TIMES:ADD_TIMES.concat(st.addTime).sort();
    return {screenKey:role+'-'+tab,n14:14,n15:15,n16:16,n18:18,n20:20,n22:22,n30:30,
      appBg:tr?'#EEF7FB':'#000',appFg:tr?'#0B0D0F':'#fff',tabBg:tr?'#fff':'rgba(11,13,15,.96)',tabBorder:tr?'rgba(11,13,15,.08)':'rgba(255,255,255,.14)',
      sheetBg:tr?'#fff':'#1A1D20',toastBg:tr?'#0B0D0F':'#fff',toastFg:tr?'#fff':'#0B0D0F',
      offline:!!this.props.offline,wifiIcon:this.props.offline?'wifi-off':'wifi',
      isHome:!tr&&tab==='home',isOrari:!tr&&tab==='orari',isIo:!tr&&tab==='io',isProfile:!tr&&tab==='profile',isNotifs:!tr&&tab==='notifs',
      isToday:tr&&tab==='today',isAgenda:tr&&tab==='agenda',isClients:tr&&tab==='clients',isClientDetail:tr&&tab==='clientDetail',isEditor:tr&&tab==='planEditor',isStudio:tr&&tab==='studio',
      subs:[['piano','Piano'],['prog','Progressi']].map(d=>({label:d[1],active:st.sub===d[0],bg:st.sub===d[0]?'#2486AB':'transparent',fg:st.sub===d[0]?'#fff':'#BFC5C8',onPick:()=>this.setState({sub:d[0]})})),subPiano:st.sub!=='prog',subProg:st.sub==='prog',
      toTrainer:switchRole('trainer'),toClient:switchRole('client'),
      goOrari:go('orari'),goNotifs:()=>this.setState({tab:'notifs',prev:tab}),
      goBack:()=>this.setState({tab:tab==='clientDetail'?'clients':tab==='planEditor'?'clientDetail':(st.prev||null),prev:null}),
      readAll:()=>this.setState(s=>({notifs:Object.assign({},s.notifs,{[role]:s.notifs[role].map(y=>Object.assign({},y,{read:true}))})})),
      notifs:nl,unread:unread,hasUnread:unread>0,todo:todo,todoCount:todo.length,hasTodo:todo.length>0,todoEmpty:!todo.length,
      call:()=>this.flash('Chiamata a 339 870 1308'),
      hasNext:!!n,noNext:!n,openNext:()=>n&&this.openSheet({kind:'class',id:n.id}),
      next:n?{name:n.name.toUpperCase(),day:DAYS[n.d].k.charAt(0)+DAYS[n.d].k.slice(1).toLowerCase()+' '+n.n,time:n.dtime,trainer:n.trainer}:{},
      others:mine.slice(1),hasOthers:mine.length>1,
      credits:credits,total:total,
      renewPending:!!st.renewReq,renewAvail:!st.renewReq,renewText:st.renewReq?'Rinnovo da '+st.renewReq.pack+' lezioni richiesto':'',
      openRenew:()=>this.openSheet({kind:'renew'}),
      creditDots:Array.from({length:total},(_,k)=>({bg:k<credits?'#2486AB':'#D8ECF6'})),
      cancelRuleText:'Cancellazione gratuita fino a '+R.cancel+' ore prima: la lezione torna nel tuo pacchetto.',
      waitRuleText:'Se si libera un posto ti avvisiamo: hai '+R.wait+' minuti per confermarlo.',
      days:DAYS.map((d,i)=>Object.assign({},d,{active:i===st.day,bg:i===st.day?'#2486AB':'#1A1D20',onPick:()=>{if(i===st.day)return;this.setState({day:i,loading:true});clearTimeout(this._l);this._l=setTimeout(()=>this.setState({loading:false}),450);}})),
      filters:[['all','Tutti'],['reformer','Reformer'],['matwork','Matwork'],['yoga','Yoga']].map(r=>({label:r[1],active:st.filter===r[0],onPick:()=>this.setState({filter:r[0]})})),
      dayFull:DAYS[st.day].full,classes:dayClasses,emptyDay:dayClasses.length===0,loading:st.loading,notLoading:!st.loading,skel:[1,2,3],
      waits:st.waitlist.map(id=>{const i=this.info(this.get(id));return {id:id,name:i.name,when:i.day+' · '+i.dtime,onLeave:()=>this.wait(id)};}),hasWaits:st.waitlist.length>0,
      kpis:[{v:agenda.length,l:'lezioni oggi'},{v:ppl,l:'clienti attesi'},{v:pres+'/'+ppl,l:'presenti'}],
      agenda:agenda,
      legend:Object.keys(TYPES).map(k=>({label:k.charAt(0).toUpperCase()+k.slice(1),color:TYPES[k].color})),
      weekDays:DAYS.map((d,i)=>({k:d.k,n:d.n,fg:i===0?'#2486AB':'#0B0D0F'})),grid:grid,
      occPct:(occC?Math.round(occT/occC*100):0)+'%',occText:occT+' posti prenotati su '+occC+' disponibili',
      openAdd:()=>this.openSheet({kind:'add'}),
      addDays:DAYS.map((d,i)=>Object.assign({label:d.k+' '+d.n,onPick:()=>this.setState({day:i,sheetErr:null})},lc(st.day===i))),
      addTypes:Object.keys(TYPES).map(k=>Object.assign({label:k.charAt(0).toUpperCase()+k.slice(1),onPick:()=>this.setState({addType:k})},lc(st.addType===k))),
      addTimes:addTimes.map(t=>Object.assign({label:t,onPick:()=>this.setState({addTime:t,sheetErr:null})},lc(st.addTime===t))),
      addLabel:'Aggiungi · '+dayShort(st.day)+' '+st.addTime,
      addClass:()=>{const t=st.addTime;if(this.dayList(st.day).some(c=>this.dt(c)===t)){this.setState({sheetErr:'C’è già un corso alle '+t+' in questo giorno.'});return;}
        const c=Object.assign({id:st.day+'-'+t+'-n'+(st.added.length+1),d:st.day,time:t,type:st.addType,trainer:'Andrea'},TYPES[st.addType],{added:true,seed:0});
        this.setState(s=>({added:s.added.concat(c),sheet:null}));this.flash(TYPES[st.addType].name+' aggiunto · '+dayShort(st.day)+' '+t);},
      clientCount:CLIENTS.length,clients:clients,clientsEmpty:!clients.length,q:st.q,onQ:e=>this.setState({q:e.target.value}),
      cfilters:[['all','Tutti'],['renew','Da rinnovare']].map(r=>Object.assign({label:r[1],onPick:()=>this.setState({cfilter:r[0]})},lc(st.cfilter===r[0]))),
      cd:cd,
      openEditor:()=>this.setState({tab:'planEditor',draft:this.plan(st.client).map(e=>Object.assign({},e)),draftNote:st.notes[st.client]||''}),
      draft:draft,draftEmpty:!draft.length,draftNote:st.draftNote,onNote:e=>this.setState({draftNote:e.target.value}),
      lib:LIB.filter(l=>!st.draft.some(e=>e.name===l[0])).map(l=>Object.assign({label:'+ '+l[0],onPick:()=>this.setState(s=>({draft:s.draft.concat({name:l[0],sets:3,reps:l[1]})}))},lc(false))),
      saveDraft:()=>{if(!st.draft.length){this.flash('Aggiungi almeno un esercizio');return;}const i=st.client;
        this.setState(s=>({plans:Object.assign({},s.plans,{[i]:s.draft}),notes:Object.assign({},s.notes,{[i]:s.draftNote}),tab:'clientDetail'}));this.flash('Piano salvato · '+first+' riceve una notifica');
        if(i===0)this.push('client','dumbbell','Piano aggiornato','Andrea ha aggiornato il tuo piano di allenamento.',{tab:'io',sub:'piano'});},
      ruleRows:[rule('Posti Reformer','Per lezione',st.caps.reformer,setCap('reformer'),1,4,1),rule('Posti Matwork e Yoga','Per lezione',st.caps.matwork,v=>this.setState(s=>({caps:Object.assign({},s.caps,{matwork:v,yoga:v})})),2,10,1),
        Object.assign(rule('Cancellazione gratuita','Ore prima della lezione',st.rules.cancel,setRule('cancel'),6,48,6),{val:st.rules.cancel+' h'}),
        Object.assign(rule('Conferma lista d’attesa','Tempo per accettare il posto',st.rules.wait,setRule('wait'),10,120,10),{val:st.rules.wait+' min'})],
      team:TEAM.map(t=>{let k=0;DAYS.forEach((_,d)=>this.dayList(d).forEach(c=>{if(c.trainer===t[0]&&!st.cancelled[c.id])k++;}));return {name:t[0],role:t[1],init:t[0].slice(0,2).toUpperCase(),count:k};}),
      exercises:exercises,exDoneN:exDoneN,exTotal:pl.length,exPct:(pl.length?exDoneN/pl.length*100:0)+'%',
      completeVariant:st.doneToday?'outline':'primary',completeLabel:st.doneToday?'Allenamento completato':'Completa allenamento',
      completeWorkout:()=>{if(st.doneToday)return;const all={};pl.forEach(e=>all[e.name]=true);this.setState(s=>({doneToday:true,done:all,sessions:s.sessions+1}));this.flash('Allenamento registrato · ottimo lavoro');},
      trainerNote:st.notes[0]||'Buon allenamento!',
      totalSessions:st.sessions,bars:week.map((v,i)=>({v:v,l:'S'+(i+1),h:(v/3*72)+'%',bg:i===7?'#2486AB':'#3F9CC4'})),
      meas:MEAS.map(m=>({label:m[1],unit:m[2],val:fmt(st.measNow[m[0]]),delta:sgn(st.measNow[m[0]]-st.measStart[m[0]])})),measDate:st.measDate,
      openMeasure:()=>{this.setState({measDraft:Object.assign({},st.measNow)});this.openSheet({kind:'measure'});},
      measRows:MEAS.map(m=>({label:m[1].charAt(0)+m[1].slice(1).toLowerCase(),val:fmt(md[m[0]])+' '+m[2],
        onMinus:()=>this.setState(s=>({measDraft:Object.assign({},s.measDraft,{[m[0]]:Math.round((s.measDraft[m[0]]-m[3])*10)/10})})),
        onPlus:()=>this.setState(s=>({measDraft:Object.assign({},s.measDraft,{[m[0]]:Math.round((s.measDraft[m[0]]+m[3])*10)/10})}))})),
      saveMeasure:()=>{this.setState(s=>({measNow:s.measDraft,measDate:'oggi',sheet:null}));this.flash('Misure salvate');},
      photos:[{label:'Inizio percorso'},{label:'Oggi'}].map(p=>Object.assign(p,{onPick:()=>this.flash('Apertura fotocamera…')})),
      services:[['Personal Training','Allenamento individuale, su misura per te','dumbbell'],['Fisioterapia','Valutazione e trattamento','activity'],['Osteopatia','Su appuntamento','hand'],['Nutrizione','Piano alimentare personalizzato','apple']].map(r=>({name:r[0],sub:r[1],icon:r[2],onPick:()=>this.flash('Richiesta '+r[0]+' inviata · ti ricontattiamo')})),
      renewOpts:[5,10,20].map(k=>{const on=st.renewPick===k;return Object.assign({n:k,onPick:()=>this.setState({renewPick:k}),border:on?'#2486AB':'rgba(255,255,255,.14)',bg:on?'rgba(36,134,171,.28)':'transparent'},ck(on));}),
      sendRenew:()=>{const k=st.renewPick;this.setState({renewReq:{pack:k},sheet:null});this.flash('Richiesta inviata ad Andrea');
        this.push('trainer','package','Richiesta di rinnovo','Giulia R. chiede un pacchetto da '+k+' lezioni.',{tab:'clientDetail',client:0});},
      hasOffer:!tr&&!!st.offer,offer:oc?{name:oc.name.toUpperCase(),when:oc.day+' '+oc.dtime}:{},offerLeft:Math.floor(left/60000)+':'+String(Math.floor(left/1000)%60).padStart(2,'0'),
      acceptOffer:()=>{if(this.props.offline){this.flash('Sei offline · riprova tra poco');return;}if(credits<=0){this.flash('Pacchetto esaurito · richiedi il rinnovo');return;}const id=st.offer.id;
        this.setState(s=>({booked:s.booked.concat(id),used:s.used+1,waitlist:s.waitlist.filter(w=>w!==id),offer:null}));this.flash('Posto confermato · ci vediamo in studio');},
      declineOffer:()=>{const id=st.offer.id;this.setState(s=>({offer:null,waitlist:s.waitlist.filter(w=>w!==id)}));this.flash('Posto passato al prossimo in lista');},
      tabs:tabDefs.map(d=>({label:d[1],icon:d[2],active:active===d[0],color:active===d[0]?'#2486AB':(tr?'#6B7479':'#BFC5C8'),onPick:go(d[0])})),
      sheetOpen:!!st.sheet,sh:sh,isClassSheet:sk==='class',isManageSheet:sk==='manage',isAddSheet:sk==='add',isRenewSheet:sk==='renew',isMeasureSheet:sk==='measure',
      hasSheetErr:!!st.sheetErr,sheetErr:st.sheetErr,closeSheet:()=>this.setState({sheet:null}),hasToast:!!st.toast,toast:st.toast};
  }
}
