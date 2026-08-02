import { useState, useEffect, useCallback } from "react";

const SUPABASE_URL = "https://ttnmiccugyhgqtretcbm.supabase.co";
const SUPABASE_KEY = "sb_publishable_-q-JHeeKoQ9EocsOrFdIbw_Q0O6FI8A";

// ─── COLORS ───────────────────────────────────────────────────
const G="#D4AF37",DARK="#1A1814",MUTED="#9A9080",IVORY="#F7F4EF",BRONZE="#6B523B";

// ─── SEED DATA ────────────────────────────────────────────────
const USERS=[
  {id:1,email:"miga@instylebl.com",   phone:"+15714847341",pw:"miga2026",   nick:"Miga",   role:"Owner",   fn:"Miga Tugendhat",   title:"Owner",    sch:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],sales:0,  tips:0,   queue_pos:null},
  {id:2,email:"amanda@instylebl.com", phone:"+17037869810",pw:"amanda2026", nick:"Amanda", role:"Manager", fn:"Amanda B",         title:"Manager",  sch:["Mon","Tue","Wed","Thu","Fri","Sat"],      sales:0,  tips:0,   queue_pos:null},
  {id:3,email:"alsu@instylebl.com",   phone:"+15714571086",pw:"alsu2026",   nick:"Alsu",   role:"Employee",fn:"Alsu Baatar",      title:"Nail Tech",sch:["Mon","Tue","Wed","Thu","Fri"],            sales:480,tips:96,  queue_pos:1},
  {id:4,email:"ari@instylebl.com",    phone:"+15713522456",pw:"ari2026",    nick:"Ari",    role:"Employee",fn:"Ari -",            title:"Nail Tech",sch:["Tue","Wed","Thu","Fri","Sat"],            sales:310,tips:60,  queue_pos:2},
  {id:5,email:"erica@instylebl.com",  phone:"+15716573335",pw:"erica2026",  nick:"Erica",  role:"Employee",fn:"Baterdene Batkhuyag",title:"Nail Tech",sch:["Mon","Wed","Fri","Sat"],              sales:392,tips:72,  queue_pos:3},
  {id:6,email:"carina@instylebl.com", phone:"+13014377636",pw:"carina2026", nick:"Carina", role:"Employee",fn:"Carina Q",         title:"Nail Tech",sch:["Mon","Tue","Thu","Fri"],               sales:275,tips:50,  queue_pos:4},
  {id:7,email:"donna@instylebl.com",  phone:"+12025538445",pw:"donna2026",  nick:"Donna",  role:"Employee",fn:"Donna Doogii",     title:"Nail Tech",sch:["Tue","Wed","Thu","Sat"],               sales:340,tips:68,  queue_pos:5},
  {id:8,email:"emy@instylebl.com",    phone:"+16465873677",pw:"emy2026",    nick:"Emy",    role:"Employee",fn:"Emy -",            title:"Nail Tech",sch:["Mon","Fri","Sat","Sun"],               sales:220,tips:40,  queue_pos:6},
  {id:9,email:"hanna@instylebl.com",  phone:"+15712201753",pw:"hanna2026",  nick:"Hanna",  role:"Employee",fn:"Hanna H",          title:"Nail Tech",sch:["Mon","Tue","Wed","Thu"],               sales:418,tips:80,  queue_pos:7},
  {id:10,email:"heidi@instylebl.com", phone:"+15713388781",pw:"heidi2026",  nick:"Heidi",  role:"Employee",fn:"Heidi N",          title:"Nail Tech",sch:["Wed","Thu","Fri","Sat","Sun"],         sales:195,tips:38,  queue_pos:8},
  {id:11,email:"jenny@instylebl.com", phone:"+15712251811",pw:"jenny2026",  nick:"Jenny",  role:"Employee",fn:"Jenny T",          title:"Nail Tech",sch:["Mon","Tue","Wed","Thu","Fri"],          sales:512,tips:102, queue_pos:9},
  {id:12,email:"luna@instylebl.com",  phone:"+15714782874",pw:"luna2026",   nick:"Luna",   role:"Employee",fn:"Luna .",           title:"Nail Tech",sch:["Tue","Thu","Fri","Sat"],               sales:360,tips:70,  queue_pos:10},
  {id:13,email:"frontdesk@instylebl.com",phone:"+15719924006",pw:"desk2026",  nick:"Desk",   role:"FrontDesk",fn:"Front Desk",       title:"Front Desk",sch:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],sales:0,tips:0,queue_pos:null},
];

const CLIENTS=[
  {id:1, n:"Abigail Stallworth",ph:"(585) 794-0660",em:"",v:1, b:56, st:"active",lv:"2023-07-10",r:4,segment:"at-risk"},
  {id:2, n:"Abraham A",         ph:"(917) 903-9879",em:"",v:6, b:222,st:"active",lv:"2024-11-25",r:5,segment:"return"},
  {id:3, n:"Angela Park",       ph:"(301) 228-5541",em:"angela@gmail.com",v:20,b:310,st:"vip",lv:"2026-05-28",r:5,segment:"return"},
  {id:4, n:"Aigerim Bekova",    ph:"(703) 882-1234",em:"aigerim@gmail.com",v:12,b:180,st:"vip",lv:"2026-05-20",r:5,segment:"return"},
  {id:5, n:"Bella Thompson",    ph:"(202) 993-1155",em:"bella@gmail.com",v:15,b:200,st:"vip",lv:"2026-05-25",r:5,segment:"return"},
  {id:6, n:"Christina Wu",      ph:"(301) 558-7712",em:"cwu@email.com",v:11,b:145,st:"vip",lv:"2026-05-22",r:4,segment:"return"},
  {id:7, n:"Diana Nguyen",      ph:"(571) 883-6601",em:"diana@gmail.com",v:18,b:250,st:"vip",lv:"2026-05-30",r:5,segment:"return"},
  {id:8, n:"Grace Kim",         ph:"(301) 445-7789",em:"grace.kim@gmail.com",v:22,b:380,st:"vip",lv:"2026-05-31",r:5,segment:"return"},
  {id:9, n:"Hannah Lee",        ph:"(202) 882-5566",em:"",v:10,b:130,st:"active",lv:"2026-05-15",r:4,segment:"return"},
  {id:10,n:"Jasmine Brown",     ph:"(703) 667-3312",em:"jasmine@gmail.com",v:14,b:195,st:"vip",lv:"2026-05-27",r:5,segment:"return"},
  {id:11,n:"Karen Mitchell",    ph:"(202) 556-1123",em:"karen.m@email.com",v:16,b:220,st:"vip",lv:"2026-05-29",r:5,segment:"return"},
  {id:12,n:"Linda Johnson",     ph:"(202) 771-3345",em:"linda.j@gmail.com",v:25,b:420,st:"vip",lv:"2026-05-31",r:5,segment:"return"},
  {id:13,n:"Maya Patel",        ph:"(202) 445-3378",em:"maya.p@gmail.com",v:13,b:175,st:"vip",lv:"2026-05-24",r:4,segment:"return"},
  {id:14,n:"Natasha Ivanova",   ph:"(202) 882-1234",em:"natasha@gmail.com",v:19,b:280,st:"vip",lv:"2026-05-31",r:5,segment:"return"},
  {id:15,n:"Lisa Park",         ph:"(571) 336-7712",em:"",v:11,b:150,st:"active",lv:"2026-05-18",r:4,segment:"return"},
  {id:16,n:"Maria Garcia",      ph:"(301) 882-9901",em:"",v:9, b:115,st:"active",lv:"2026-05-11",r:4,segment:"return"},
  {id:17,n:"Michelle Adams",    ph:"(571) 667-2289",em:"",v:7, b:80, st:"active",lv:"2026-04-30",r:3,segment:"at-risk"},
  {id:18,n:"Emily Carter",      ph:"(202) 667-4433",em:"",v:4, b:40, st:"active",lv:"2026-01-10",r:4,segment:"at-risk"},
  {id:19,n:"Julia Santos",      ph:"(301) 992-6634",em:"",v:8, b:100,st:"active",lv:"2026-05-08",r:5,segment:"return"},
  {id:20,n:"Aby T",             ph:"(614) 900-2604",em:"abbytibebe@gmail.com",v:1,b:70,st:"active",lv:"2023-08-05",r:5,segment:"at-risk"},
  {id:21,n:"Sarah Johnson",     ph:"(202) 334-5678",em:"sarah.j@gmail.com",v:0,b:0,st:"active",lv:null,r:0,segment:"new"},
  {id:22,n:"Emma Wilson",       ph:"(571) 445-6789",em:"",v:0,b:0,st:"active",lv:null,r:0,segment:"new"},
];

const TX=[
  {id:1, c:"Grace Kim",      e:"Jenny", s:"Classic Pedicure",     sb:46, tip:10,tot:56, pay:"Card", d:"2026-05-31",supply:2,  commission:0.6},
  {id:2, c:"Linda Johnson",  e:"Alsu",  s:"Gel Mani + Pedi",      sb:95, tip:20,tot:115,pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:3, c:"Diana Nguyen",   e:"Luna",  s:"Acrylic Full Set",     sb:76, tip:15,tot:91, pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:4, c:"Angela Park",    e:"Erica", s:"Builder Gel",          sb:70, tip:14,tot:84, pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:5, c:"Natasha Ivanova",e:"Donna", s:"Apres Gel-X Full Set", sb:86, tip:18,tot:104,pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:6, c:"Bella Thompson", e:"Hanna", s:"Manicure",             sb:30, tip:8, tot:38, pay:"Cash", d:"2026-05-31",supply:2,  commission:0.6},
  {id:7, c:"Karen Mitchell", e:"Jenny", s:"Classic Pedicure",     sb:46, tip:10,tot:56, pay:"Card", d:"2026-05-31",supply:2,  commission:0.6},
  {id:8, c:"Maya Patel",     e:"Carina",s:"Gel Manicure",         sb:45, tip:10,tot:55, pay:"Zelle",d:"2026-05-31",supply:2,  commission:0.6},
  {id:9, c:"Jasmine Brown",  e:"Alsu",  s:"Mani and Pedi",        sb:75, tip:15,tot:90, pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:10,c:"Aigerim Bekova", e:"Heidi", s:"Kid Manicure",         sb:17, tip:5, tot:22, pay:"Cash", d:"2026-05-31",supply:2,  commission:0.6},
  {id:11,c:"Christina Wu",   e:"Luna",  s:"Builder Gel",          sb:70, tip:15,tot:85, pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:12,c:"Lisa Park",      e:"Emy",   s:"Classic Pedicure",     sb:46, tip:9, tot:55, pay:"Card", d:"2026-05-31",supply:2,  commission:0.6},
  {id:13,c:"Hannah Lee",     e:"Hanna", s:"Acrylic Full Set",     sb:76, tip:16,tot:92, pay:"Card", d:"2026-05-31",supply:5,  commission:0.6},
  {id:14,c:"Walk-in",        e:"Jenny", s:"Manicure",             sb:30, tip:5, tot:35, pay:"Cash", d:"2026-05-30",supply:2,  commission:0.6},
  {id:15,c:"Angela Park",    e:"Donna", s:"Gel Mani + Pedi",      sb:95, tip:20,tot:115,pay:"Card", d:"2026-05-29",supply:5,  commission:0.6},
];

const APPTS=[
  {id:1, c:"Grace Kim",       e:"Jenny", s:"Classic Pedicure",    d:"2026-05-31",t:"09:00",st:"completed", dur:60, src:"online"},
  {id:2, c:"Linda Johnson",   e:"Alsu",  s:"Gel Mani + Pedi",     d:"2026-05-31",t:"09:30",st:"completed", dur:90, src:"request"},
  {id:3, c:"Diana Nguyen",    e:"Luna",  s:"Acrylic Full Set",    d:"2026-05-31",t:"10:15",st:"in-service",dur:75, src:"walk-in"},
  {id:4, c:"Angela Park",     e:"Erica", s:"Builder Gel",         d:"2026-05-31",t:"11:00",st:"confirmed", dur:60, src:"request"},
  {id:5, c:"Natasha Ivanova", e:"Donna", s:"Apres Gel-X Full Set",d:"2026-05-31",t:"11:30",st:"confirmed", dur:75, src:"online"},
  {id:6, c:"Bella Thompson",  e:"Hanna", s:"Manicure",            d:"2026-05-31",t:"12:00",st:"confirmed", dur:45, src:"walk-in"},
  {id:7, c:"Karen Mitchell",  e:"Jenny", s:"Classic Pedicure",    d:"2026-05-31",t:"13:00",st:"pending",   dur:60, src:"online"},
  {id:8, c:"Maya Patel",      e:"Carina",s:"Gel Manicure",        d:"2026-05-31",t:"13:30",st:"pending",   dur:60, src:"non-request"},
  {id:9, c:"Jasmine Brown",   e:"Alsu",  s:"Mani and Pedi",       d:"2026-05-31",t:"14:00",st:"pending",   dur:90, src:"request"},
  {id:10,c:"Aigerim Bekova",  e:"Heidi", s:"Kid Manicure",        d:"2026-05-31",t:"14:30",st:"pending",   dur:30, src:"walk-in"},
  {id:11,c:"Christina Wu",    e:"Luna",  s:"Builder Gel",         d:"2026-06-01",t:"10:00",st:"confirmed", dur:60, src:"online"},
  {id:12,c:"Hannah Lee",      e:"Hanna", s:"Acrylic Full Set",    d:"2026-06-01",t:"11:00",st:"confirmed", dur:75, src:"request"},
];

const FEEDBACK=[
  {id:1,tp:"client",  fr:"Grace Kim",      fe:"Jenny",r:5,msg:"Jenny did an amazing job! Very gentle and precise.",d:"2026-05-31",st:"new",internal:true},
  {id:2,tp:"client",  fr:"Angela Park",    fe:"Erica", r:5,msg:"Erica is always so professional!",d:"2026-05-30",st:"new",internal:true},
  {id:3,tp:"client",  fr:"Natasha Ivanova",fe:"Donna", r:4,msg:"Great service. Donna was friendly and fast.",d:"2026-05-29",st:"read",internal:true},
  {id:4,tp:"client",  fr:"Bella Thompson", fe:"Hanna", r:5,msg:"Hanna is my absolute favorite!",d:"2026-05-28",st:"read",internal:true},
  {id:5,tp:"employee",fr:"Alsu",           fe:"",      r:0,msg:"Would love a locker in the break room.",d:"2026-05-28",st:"new",internal:false},
  {id:6,tp:"employee",fr:"Jenny",          fe:"",      r:0,msg:"Suggestion: update the SMS template.",d:"2026-05-27",st:"read",internal:false},
  {id:7,tp:"employee",fr:"Hanna",          fe:"",      r:0,msg:"Sterilizer in station 3 not working.",d:"2026-05-26",st:"new",internal:false},
];

const AUDIT_LOG=[
  {id:1,action:"VoidItem",  by:"Amanda",emp:"Jenny", ticket:"#1031",station:"iPad-1",note:"Void Gel Color Add-on — client request",time:"2026-05-31 09:45"},
  {id:2,action:"ChangeTech",by:"Amanda",emp:"Heidi", ticket:"#1028",station:"iPad-2",note:"Change Tech for CLASSIC PEDICURE from HEIDI to CARINA",time:"2026-05-31 10:20"},
  {id:3,action:"VoidTicket",by:"Miga",  emp:"Emy",   ticket:"#1019",station:"Mgr",  note:"Duplicate charge — refunded",time:"2026-05-30 15:00"},
  {id:4,action:"Refund",    by:"Amanda",emp:"Luna",  ticket:"#1015",station:"iPad-1",note:"Client dissatisfied — partial refund $15",time:"2026-05-30 13:30"},
  {id:5,action:"AdjustTurn",by:"Miga",  emp:"Alsu",  ticket:"#1010",station:"Mgr",  note:"Manual turn adjustment +1 for missed walk-in",time:"2026-05-29 11:00"},
];

const LEAVE=[
  {id:1,e:"Emy",   dates:"June 14-15",reason:"Family event",       st:"pending", sub:"2026-05-28"},
  {id:2,e:"Carina",dates:"June 20",    reason:"Medical appointment",st:"approved",sub:"2026-05-20"},
  {id:3,e:"Heidi", dates:"July 4",     reason:"Personal",          st:"pending", sub:"2026-05-30"},
];

const SUPPLY_MATRIX=[
  {min:0,   max:50,  charge:2.00},
  {min:50.01,max:100, charge:5.00},
  {min:100.01,max:200,charge:8.00},
  {min:200.01,max:99999,charge:12.00},
];

const HAZARD_DB=[
  {id:1,name:"Formaldehyde",category:"Polish/Remover",risk:"Carcinogen. Eye and respiratory irritation. Asthma-like symptoms.",products:["Nail Polish","Hardener"]},
  {id:2,name:"Toluene",     category:"Polish/Remover",risk:"Nervous system effects. Skin and eye irritation.",products:["Nail Polish","Gel"]},
  {id:3,name:"Acetone",     category:"Polish/Remover",risk:"Flammable. Skin dryness. Eye and respiratory irritation.",products:["Remover","Dehydrator"]},
  {id:4,name:"MMA (Methyl Methacrylate)",category:"Adhesive/Acrylic",risk:"Banned for nail use in many states. Severe respiratory tract irritation. Skin sensitizer.",products:["Acrylic Powder"]},
  {id:5,name:"EMA (Ethyl Methacrylate)",category:"Adhesive/Acrylic",risk:"Respiratory and skin sensitizer. Use with proper ventilation.",products:["Acrylic Monomer"]},
  {id:6,name:"Cyanoacrylate",category:"Adhesive/Acrylic",risk:"Bonds skin instantly. Eye irritant. Use with caution.",products:["Nail Glue","Tip Adhesive"]},
  {id:7,name:"Dibutyl Phthalate (DBP)",category:"Polish/Remover",risk:"Reproductive toxin. Skin and eye irritation.",products:["Older Nail Polish"]},
  {id:8,name:"Benzoyl Peroxide",category:"Adhesive/Acrylic",risk:"Oxidizer. Skin and eye irritant. Flammable.",products:["Acrylic Initiator"]},
];

// Turn calculation engine (§2.2)
function calcTurns(serviceTotal, threshold, method="divide"){
  if(method==="divide") return Math.floor(serviceTotal/threshold);
  if(method==="flat")   return serviceTotal>=threshold?1:0;
  return Math.floor(serviceTotal/threshold);
}

// Supply charge lookup (§3.1)
function getSupplyCharge(amount){
  const tier=SUPPLY_MATRIX.find(t=>amount>=t.min&&amount<=t.max);
  return tier?tier.charge:0;
}

// Net pay formula (§3.2): Net = (Gross*commission - supply - surcharge) + adjustments
function calcNetPay(gross, commRate=0.6, supply=0, surcharge=0, adjustment=0){
  return (gross*commRate - supply - surcharge) + adjustment;
}

// Client auto-segmentation (§7.1)
function getSegment(lastVisit){
  if(!lastVisit) return "new";
  const days=Math.floor((new Date("2026-05-31")-new Date(lastVisit))/(1000*60*60*24));
  if(days<=30)  return "return";
  if(days<=99999) return "at-risk";
  return "new";
}

// ─── SUPABASE ─────────────────────────────────────────────────
const db={
  from:(table)=>({
    select:async(cols="*",opts={})=>{
      let url=`${SUPABASE_URL}/rest/v1/${table}?select=${cols}`;
      if(opts.eq) url+=`&${opts.eq[0]}=eq.${opts.eq[1]}`;
      if(opts.order) url+=`&order=${opts.order}`;
      if(opts.limit) url+=`&limit=${opts.limit}`;
      try{const r=await fetch(url,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});const d=await r.json();return{data:Array.isArray(d)?d:[],error:r.ok?null:d};}
      catch(e){return{data:[],error:e.message};}
    },
    insert:async(body)=>{
      try{const r=await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(body)});return{data:await r.json(),error:r.ok?null:"error"};}
      catch(e){return{data:null,error:e.message};}
    },
    update:async(body,opts={})=>{
      let url=`${SUPABASE_URL}/rest/v1/${table}`;
      if(opts.eq) url+=`?${opts.eq[0]}=eq.${opts.eq[1]}`;
      try{const r=await fetch(url,{method:"PATCH",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(body)});return{error:r.ok?null:"error"};}
      catch(e){return{error:e.message};}
    },
    delete:async(opts={})=>{
      let url=`${SUPABASE_URL}/rest/v1/${table}`;
      if(opts.eq) url+=`?${opts.eq[0]}=eq.${opts.eq[1]}`;
      try{const r=await fetch(url,{method:"DELETE",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});return{error:r.ok?null:"error"};}
      catch(e){return{error:e.message};}
    },
  }),
};

// ─── STYLE TOKENS ─────────────────────────────────────────────
const NAV={
  Owner:   [{id:"dash",l:"Dashboard",s:"Home"},{id:"frontdesk",l:"Front Desk",s:"Desk"},{id:"queue",l:"Employee Queue",s:"Queue"},{id:"revenue",l:"Revenue",s:"Revenue"},{id:"schedule",l:"All Schedules",s:"Schedule"},{id:"employees",l:"Employees",s:"Staff"},{id:"clients",l:"Clients",s:"Clients"},{id:"appts",l:"Appointments",s:"Appts"},{id:"pos",l:"POS Checkout",s:"POS"},{id:"payroll",l:"Payroll",s:"Payroll"},{id:"reports",l:"Reports",s:"Reports"},{id:"feedback",l:"Feedback",s:"Feedback"},{id:"audit",l:"Audit Log",s:"Audit"},{id:"safety",l:"Safety / SDS",s:"Safety"},{id:"giftcards",l:"Gift Cards",s:"Gifts"}],
  Manager: [{id:"staff",l:"Staff Overview",s:"Staff"},{id:"frontdesk",l:"Front Desk",s:"Desk"},{id:"queue",l:"Employee Queue",s:"Queue"},{id:"schedule",l:"Schedules",s:"Schedule"},{id:"appts",l:"Appointments",s:"Appts"},{id:"feedback",l:"Feedback",s:"Feedback"},{id:"leave",l:"Leave Requests",s:"Leave"},{id:"reports",l:"Reports",s:"Reports"},{id:"audit",l:"Audit Log",s:"Audit"}],
  Employee:[{id:"my_dash",l:"My Dashboard",s:"Home"},{id:"my_sched",l:"My Schedule",s:"Schedule"},{id:"my_queue",l:"My Queue Position",s:"Queue"},{id:"my_fb",l:"My Feedback",s:"Feedback"},{id:"my_leave",l:"Request Leave",s:"Leave"},{id:"my_imp",l:"Suggest Improvement",s:"Suggest"}],

  FrontDesk:[{id:"frontdesk",l:"Front Desk",s:"Desk"},{id:"appts",l:"Appointments",s:"Appts"},{id:"queue",l:"Employee Queue",s:"Queue"},{id:"pos",l:"POS Checkout",s:"POS"}],
  Client:  [{id:"client_home",l:"My Appointments",s:"Home"},{id:"client_book",l:"Book Appointment",s:"Book"}],
};
const MOBILE_PRIMARY={Owner:["dash","frontdesk","pos","queue"],Manager:["staff","frontdesk","queue","appts"],Employee:["my_dash","my_sched","my_queue","my_leave"],FrontDesk:["frontdesk","appts","queue","pos"],Client:["client_home","client_book"]};
// US formats: 12-hour time + MM/DD/YYYY dates
const fmt12=t=>{if(!t)return t;const p=String(t).split(":");const h=Number(p[0]);if(isNaN(h)||p[1]===undefined)return t;return `${h%12||12}:${p[1]} ${h>=12?"PM":"AM"}`;};
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const isISO=d=>/^\d{4}-\d{2}-\d{2}/.test(String(d||""));
const fmtMD=d=>{if(!isISO(d))return d;const s=String(d);return `${MON[Number(s.slice(5,7))-1]} ${Number(s.slice(8,10))}`;};
const fmtY=d=>String(d).slice(0,4);
const fmtD=d=>isISO(d)?`${fmtMD(d)}, ${fmtY(d)}`:d;
function DateCell({d,t}){
  if(!isISO(d))return <>{d||"—"}</>;
  return(
    <div style={{lineHeight:1.35,whiteSpace:"nowrap"}}>
      <div>{fmtMD(d)}{t?<span> · {fmt12(t)}</span>:null}</div>
      <div style={{fontSize:10,color:MUTED}}>{fmtY(d)}</div>
    </div>
  );
}

// Live Supabase helpers (shared backbone: website + staff app + OS)
const qraw=async(path)=>{try{const r=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});const d=await r.json();return r.ok&&Array.isArray(d)?d:[];}catch(e){return[];}};
const todayStr=()=>{const n=new Date();return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;};
const hmOf=ts=>{const d=new Date(ts);return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;};
const dStrOf=ts=>{const d=new Date(ts);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
const isTechRole=r=>/tech|artist|stylist/i.test(r||"");

const card={background:"#fff",border:"0.5px solid rgba(212,175,55,0.18)",borderRadius:10,padding:"14px 18px",marginBottom:12};
const inpS={width:"100%",padding:"8px 10px",border:"0.5px solid rgba(0,0,0,0.15)",borderRadius:7,fontSize:12,background:IVORY,color:DARK,outline:"none",fontFamily:"inherit",marginBottom:8};
const btnP={background:G,color:"#fff",border:"none",borderRadius:7,padding:"8px 16px",fontSize:12,fontWeight:600,cursor:"pointer"};
const btnO={background:"transparent",border:"0.5px solid rgba(0,0,0,0.15)",borderRadius:7,padding:"7px 14px",fontSize:12,cursor:"pointer",color:DARK};
const btnD={background:"transparent",border:"0.5px solid #F09595",borderRadius:7,padding:"7px 14px",fontSize:12,cursor:"pointer",color:"#A32D2D"};
const pill=(t,c,bg)=>({display:"inline-block",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,background:bg,color:c});

const SP={
  completed: pill("completed","#185FA5","#E6F1FB"),
  "in-service": pill("in-service","#3B6D11","#EAF3DE"),
  confirmed: pill("confirmed","#854F0B","#FAEEDA"),
  pending: pill("pending","#5F5E5A","#F1EFE8"),
  cancelled: pill("cancelled","#A32D2D","#FCEBEB"),
  approved: pill("approved","#3B6D11","#EAF3DE"),
  rejected: pill("rejected","#A32D2D","#FCEBEB"),
  new: pill("new","#3C3489","#EEEDFE"),
  read: pill("read","#5F5E5A","#F1EFE8"),
  vip: pill("vip","#3C3489","#EEEDFE"),
  active: pill("active","#3B6D11","#EAF3DE"),
  "at-risk": pill("at-risk","#854F0B","#FAEEDA"),
  return: pill("return","#3B6D11","#EAF3DE"),
};

// ─── SHARED COMPONENTS ────────────────────────────────────────
function Av({name,size=32}){
  const ini=(name||"").split(" ").map(w=>w[0]||"").join("").slice(0,2).toUpperCase();
  return <div className="os-av" style={{width:size,height:size,borderRadius:"50%",background:"rgba(212,175,55,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color:BRONZE,flexShrink:0}}>{ini}</div>;
}

function Pill({status}){
  const s=SP[status];
  if(!s) return <span style={{...pill(status,"#5F5E5A","#F1EFE8")}}>{status}</span>;
  return <span style={s}>{status}</span>;
}

function Stat({label,value,sub,accent}){
  return(
    <div style={{background:"#fff",border:"0.5px solid rgba(212,175,55,0.2)",borderRadius:9,padding:"12px 14px"}}>
      <div style={{fontSize:10,color:MUTED,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{label}</div>
      <div style={{fontSize:20,fontWeight:300,color:accent||DARK}}>{value}</div>
      {sub&&<div style={{fontSize:10,color:MUTED,marginTop:2}}>{sub}</div>}
    </div>
  );
}

function Tbl({cols,rows,empty="No data"}){
  return(
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
      <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{cols.map(c=><th key={c} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontWeight:500,fontSize:10}}>{c}</th>)}</tr></thead>
      <tbody>{rows.length?rows:<tr><td colSpan={cols.length} style={{padding:16,textAlign:"center",color:MUTED}}>{empty}</td></tr>}</tbody>
    </table>
  );
}

function Sec({t}){return <div style={{fontSize:11,fontWeight:600,color:DARK,letterSpacing:"0.05em",marginBottom:10}}>{t}</div>;}
function Ptitle({t}){return <div style={{fontSize:16,fontWeight:300,color:DARK,marginBottom:14,letterSpacing:"0.04em"}}>{t}</div>;}

// ─── RE-AUTH MODAL (§3.3) ─────────────────────────────────────
function ReAuthModal({action,onSuccess,onCancel}){
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const ADMIN_PW="miga2026";
  const check=()=>{
    if(pw===ADMIN_PW||pw==="amanda2026"){onSuccess();setErr("");}
    else setErr("Incorrect password. Manager or Owner required.");
  };
  return(
    <div style={{position:"absolute",inset:0,background:"rgba(26,24,20,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,borderRadius:10,padding:16}}>
      <div style={{background:"#fff",borderRadius:12,padding:24,width:"min(320px, 100%)"}}>
        <div style={{fontSize:14,fontWeight:500,color:DARK,marginBottom:4}}>Authorization Required</div>
        <div style={{fontSize:12,color:MUTED,marginBottom:16}}>Action: <strong>{action}</strong> requires Manager or Owner login.</div>
        {err&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:7,padding:"8px 12px",fontSize:11,color:"#A32D2D",marginBottom:12}}>{err}</div>}
        <input type="password" style={{...inpS}} placeholder="Enter password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} autoFocus/>
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button style={{...btnP,flex:1}} onClick={check}>Confirm</button>
          <button style={{...btnO}} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE (email-only; staff + client) ──────────────────
const gcalUrl=(title,dateStr,timeStr,durMin=60,details="")=>{
  const s=`${String(dateStr).replace(/-/g,"")}T${String(timeStr).slice(0,5).replace(":","")}00`;
  const [h,m]=String(timeStr).split(":").map(Number);
  const endM=h*60+m+(durMin||60);
  const e=`${String(dateStr).replace(/-/g,"")}T${String(Math.floor(endM/60)).padStart(2,"0")}${String(endM%60).padStart(2,"0")}00`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${s}/${e}&ctz=America/New_York&details=${encodeURIComponent(details)}&location=${encodeURIComponent("InStyle Nail Bar, 980 Maine Ave SW, Washington DC")}`;
};
const notifyBooking=(payload)=>{try{fetch("/api/notify-booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}).catch(()=>{});}catch(e){}};

function Login({onLogin}){
  const isDeskHost=typeof window!=="undefined"&&window.location.hostname.startsWith("desk.");
  const [mode,setMode]=useState("staff");   // staff | client | register
  const [email,setEmail]=useState(isDeskHost?"frontdesk@instylebl.com":"");
  const [pw,setPw]=useState("");
  const [cEmail,setCEmail]=useState("");
  const [cName,setCName]=useState("");
  const [cPhone,setCPhone]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const staffLogin=()=>{
    if(!pw){setErr("Please enter your password.");return;}
    const cred=email.trim().toLowerCase();
    if(!cred){setErr("Enter your email address.");return;}
    setLoading(true);setErr("");
    setTimeout(()=>{
      const user=USERS.find(u=>u.email===cred&&u.pw===pw);
      setLoading(false);
      if(user) onLogin(user);
      else setErr("Incorrect credentials. Check your email and password.");
    },600);
  };

  const asClientUser=c=>({id:c.id,email:c.email,phone:c.phone,nick:(c.name||"Client").split(" ")[0],fn:c.name,role:"Client",title:"Client"});

  const clientLogin=async()=>{
    const em=cEmail.trim().toLowerCase();
    if(!em||!em.includes("@")){setErr("Enter your email address.");return;}
    setLoading(true);setErr("");
    const rows=await qraw(`clients?select=id,name,email,phone&email=eq.${encodeURIComponent(em)}&limit=1`);
    setLoading(false);
    if(rows.length) onLogin(asClientUser(rows[0]));
    else{setErr("No account found with this email — please register below.");setMode("register");}
  };

  const clientRegister=async()=>{
    const em=cEmail.trim().toLowerCase();
    if(!cName.trim()){setErr("Enter your full name.");return;}
    if(!em||!em.includes("@")){setErr("Enter a valid email address.");return;}
    if(!cPhone.trim()||cPhone.replace(/\D/g,"").length<10){setErr("Enter a valid phone number (used for appointment reminders and offers).");return;}
    setLoading(true);setErr("");
    const existing=await qraw(`clients?select=id,name,email,phone&email=eq.${encodeURIComponent(em)}&limit=1`);
    if(existing.length){setLoading(false);onLogin(asClientUser(existing[0]));return;}
    const {data,error}=await db.from("clients").insert({name:cName.trim(),email:em,phone:cPhone.trim(),tier:"new",points:0});
    setLoading(false);
    if(error||!data||!data[0]){setErr("Could not create your account — please try again.");return;}
    onLogin(asClientUser(data[0]));
  };

  const tabBtn=(id,label)=>(
    <button key={id} onClick={()=>{setMode(id);setErr("");}} style={{flex:1,padding:"6px",border:"none",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"inherit",background:(mode===id||(id==="client"&&mode==="register"))?"#fff":"transparent",color:(mode===id||(id==="client"&&mode==="register"))?DARK:MUTED,fontWeight:(mode===id||(id==="client"&&mode==="register"))?600:400,transition:"all 0.12s"}}>{label}</button>
  );
  const lbl={fontSize:11,color:BRONZE,fontWeight:500,display:"block",marginBottom:4};

  return(
    <div style={{minHeight:"100vh",background:DARK,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:22,fontWeight:300,color:G,letterSpacing:"0.3em"}}>INSTYLE</div>
        <div style={{fontSize:9,color:"rgba(255,255,255,0.28)",letterSpacing:"0.18em",marginTop:5}}>BEAUTY LOUNGE OS</div>
      </div>
      <div style={{background:"#fff",borderRadius:14,padding:"28px 24px",width:"min(400px, 100%)"}}>
        <div style={{fontSize:14,fontWeight:500,color:DARK,marginBottom:3}}>Welcome back</div>
        <div style={{fontSize:11,color:MUTED,marginBottom:20}}>Sign in to your account</div>
        <div style={{display:"flex",background:IVORY,borderRadius:8,padding:3,marginBottom:16}}>
          {tabBtn("staff","Staff")}
          {tabBtn("client","Client")}
        </div>
        {err&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:7,padding:"8px 12px",fontSize:11,color:"#A32D2D",marginBottom:12}}>{err}</div>}

        {mode==="staff"&&(<>
          <label style={lbl}>Email address</label>
          <input style={inpS} type="email" placeholder="you@instylebl.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&staffLogin()}/>
          <label style={lbl}>Password</label>
          <input style={inpS} type="password" placeholder="Enter your password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&staffLogin()}/>
          <button style={{...btnP,width:"100%",padding:"10px",fontSize:13,marginTop:6}} onClick={staffLogin} disabled={loading}>
            {loading?"Signing in...":"Sign In →"}
          </button>
          <div style={{marginTop:16,padding:12,background:IVORY,borderRadius:8,fontSize:10,color:MUTED}}>
            <strong style={{color:DARK}}>Demo accounts:</strong><br/>
            miga@instylebl.com / miga2026 (Owner)<br/>
            amanda@instylebl.com / amanda2026 (Manager)<br/>
            jenny@instylebl.com / jenny2026 (Staff)<br/>
            frontdesk@instylebl.com / desk2026 (Front Desk)
          </div>
        </>)}

        {mode==="client"&&(<>
          <label style={lbl}>Email address</label>
          <input style={inpS} type="email" placeholder="you@gmail.com" value={cEmail} onChange={e=>setCEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&clientLogin()}/>
          <button style={{...btnP,width:"100%",padding:"10px",fontSize:13,marginTop:6}} onClick={clientLogin} disabled={loading}>
            {loading?"Checking...":"Continue →"}
          </button>
          <div style={{fontSize:11,color:MUTED,textAlign:"center",marginTop:14}}>
            First time here? <button onClick={()=>{setMode("register");setErr("");}} style={{background:"none",border:"none",color:BRONZE,fontWeight:600,cursor:"pointer",fontSize:11,fontFamily:"inherit",textDecoration:"underline"}}>Create an account</button>
          </div>
        </>)}

        {mode==="register"&&(<>
          <div style={{fontSize:12,fontWeight:600,color:DARK,marginBottom:10}}>Create your client account</div>
          <label style={lbl}>Full name</label>
          <input style={inpS} placeholder="Your name" value={cName} onChange={e=>setCName(e.target.value)}/>
          <label style={lbl}>Email address</label>
          <input style={inpS} type="email" placeholder="you@gmail.com" value={cEmail} onChange={e=>setCEmail(e.target.value)}/>
          <label style={lbl}>Phone number</label>
          <input style={inpS} type="tel" placeholder="(571) 000-0000" value={cPhone} onChange={e=>setCPhone(e.target.value)}/>
          <div style={{fontSize:10,color:MUTED,marginBottom:8,lineHeight:1.5}}>We'll never call or text you with reminders — confirmations arrive by email and Google Calendar. Your number is kept for occasional offers and events from InStyle.</div>
          <button style={{...btnP,width:"100%",padding:"10px",fontSize:13}} onClick={clientRegister} disabled={loading}>
            {loading?"Creating...":"Register & Sign In →"}
          </button>
          <div style={{fontSize:11,color:MUTED,textAlign:"center",marginTop:12}}>
            Already registered? <button onClick={()=>{setMode("client");setErr("");}} style={{background:"none",border:"none",color:BRONZE,fontWeight:600,cursor:"pointer",fontSize:11,fontFamily:"inherit",textDecoration:"underline"}}>Sign in</button>
          </div>
        </>)}

        <div style={{fontSize:10,color:MUTED,textAlign:"center",marginTop:14,lineHeight:1.5}}>
          Account managed by <strong>Instyle Nail Bar</strong>.<br/>
          Contact manager if you have trouble signing in.
        </div>
      </div>
    </div>
  );
}

// ─── EMPLOYEE QUEUE PAGE (§2) ─────────────────────────────────
function QueuePage({user}){
  const [queue,setQueue]=useState(USERS.filter(u=>u.role==="Employee"&&u.queue_pos!==null).sort((a,b)=>a.queue_pos-b.queue_pos));
  const [threshold,setThreshold]=useState(50);
  const [method,setMethod]=useState("divide");
  const [reauth,setReauth]=useState(null);
  const [jumpTarget,setJumpTarget]=useState(null);
  const isAdmin=user.role==="Owner"||user.role==="Manager";

  const moveUp=(nick)=>{
    setQueue(prev=>{
      const q=[...prev];
      const i=q.findIndex(e=>e.nick===nick);
      if(i<=0)return q;
      [q[i-1],q[i]]=[ q[i],q[i-1]];
      return q.map((e,idx)=>({...e,queue_pos:idx+1}));
    });
  };

  const jumpTurn=(nick)=>{
    if(!isAdmin){setReauth({action:"Jump Turn",cb:()=>jumpTurn(nick)});return;}
    setQueue(prev=>{
      const q=[...prev];
      const i=q.findIndex(e=>e.nick===nick);
      if(i<=0)return q;
      const item=q.splice(i,1)[0];
      q.unshift(item);
      return q.map((e,idx)=>({...e,queue_pos:idx+1}));
    });
  };

  const today=TX.filter(t=>t.d==="2026-05-31");

  return(
    <div style={{position:"relative"}}>
      {reauth&&<ReAuthModal action={reauth.action} onSuccess={()=>{setReauth(null);reauth.cb&&reauth.cb();}} onCancel={()=>setReauth(null)}/>}
      <Ptitle t="Employee Queue (FIFO)"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <div style={{...card,marginBottom:0}}>
          <Sec t="TURN SETTINGS (§2.2)"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Turn Threshold ($)</label>
              <input style={{...inpS,marginBottom:0}} type="number" value={threshold} onChange={e=>setThreshold(Number(e.target.value))}/>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Calculation Method</label>
              <select style={{...inpS,marginBottom:0}} value={method} onChange={e=>setMethod(e.target.value)}>
                <option value="divide">Divide Service Total</option>
                <option value="flat">Flat Turn (Qualifying)</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{...card,marginBottom:0}}>
          <Sec t="SUPPLY CHARGE MATRIX (§3.1)"/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
            <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}><th style={{textAlign:"left",padding:"3px 6px",color:MUTED}}>Service Range</th><th style={{textAlign:"right",padding:"3px 6px",color:MUTED}}>Charge</th></tr></thead>
            <tbody>{SUPPLY_MATRIX.map((t,i)=><tr key={i} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}><td style={{padding:"4px 6px"}}>${t.min} – ${t.max===99999?"∞":t.max}</td><td style={{padding:"4px 6px",textAlign:"right",color:G,fontWeight:600}}>${t.charge.toFixed(2)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <div style={card}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <Sec t="QUEUE ORDER"/>
          <span style={{fontSize:10,color:MUTED}}>FIFO · Position 1 serves next</span>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Pos","Staff","Today Sales","Turns Earned","Remainder","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>
            {queue.map((e,i)=>{
              const empTx=today.filter(t=>t.e===e.nick);
              const gross=empTx.reduce((s,t)=>s+t.sb,0);
              const turns=calcTurns(gross,threshold,method);
              const rem=(gross%threshold).toFixed(2);
              return(
                <tr key={e.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)",background:i===0?"rgba(212,175,55,0.05)":""}}>
                  <td style={{padding:"8px",fontWeight:700,color:i===0?G:MUTED,fontSize:14}}>{i+1}</td>
                  <td style={{padding:"8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <Av name={e.nick} size={26}/>
                      <div><div style={{fontWeight:500}}>{e.nick}</div><div style={{fontSize:10,color:MUTED}}>{e.fn}</div></div>
                    </div>
                  </td>
                  <td style={{padding:"8px",color:G,fontWeight:600}}>${gross.toFixed(2)}</td>
                  <td style={{padding:"8px"}}><span style={{...pill(turns+" turns",G,"rgba(212,175,55,0.12)"),fontWeight:700}}>{turns} turns</span></td>
                  <td style={{padding:"8px",color:MUTED}}>${rem}</td>
                  <td style={{padding:"8px"}}>
                    <div style={{display:"flex",gap:5}}>
                      {isAdmin&&i>0&&<button style={{...btnO,padding:"3px 9px",fontSize:10}} onClick={()=>moveUp(e.nick)}>▲ Up</button>}
                      {isAdmin&&<button style={{...btnO,padding:"3px 9px",fontSize:10,color:"#854F0B",borderColor:"#854F0B"}} onClick={()=>jumpTurn(e.nick)}>Jump Turn</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAYROLL PAGE (§3.2) ──────────────────────────────────────
function PayrollPage(){
  const [reauth,setReauth]=useState(false);
  const [unlocked,setUnlocked]=useState(false);
  const [surcharge,setSurcharge]=useState(5);
  const techs=USERS.filter(u=>u.title==="Nail Tech");
  const today=TX.filter(t=>t.d==="2026-05-31");

  const rows=techs.map(e=>{
    const empTx=today.filter(t=>t.e===e.nick);
    const gross=empTx.reduce((s,t)=>s+t.sb,0);
    const tips=empTx.reduce((s,t)=>s+t.tip,0);
    const supply=getSupplyCharge(gross);
    const net=calcNetPay(gross,0.6,supply,surcharge,0);
    return{...e,gross,tips,supply,net,tickets:empTx.length};
  });

  return(
    <div style={{position:"relative"}}>
      {reauth&&<ReAuthModal action="View Full Payroll" onSuccess={()=>{setReauth(false);setUnlocked(true);}} onCancel={()=>setReauth(false)}/>}
      <Ptitle t="Payroll Summary"/>
      <div style={{...card,background:"rgba(212,175,55,0.05)",borderColor:"rgba(212,175,55,0.35)",marginBottom:14}}>
        <div style={{fontSize:11,color:DARK,lineHeight:1.7}}>
          <strong>Formula (§3.2):</strong> Net Pay = (Gross × 60% commission) − Supply Charge − Daily Surcharge + Adjustments
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <label style={{fontSize:11,color:MUTED}}>Daily Surcharge ($)</label>
        <input type="number" style={{...inpS,width:100,marginBottom:0}} value={surcharge} onChange={e=>setSurcharge(Number(e.target.value))}/>
        {!unlocked&&<button style={btnP} onClick={()=>setReauth(true)}>Unlock Full View</button>}
        {unlocked&&<span style={{...SP.approved}}>Unlocked</span>}
      </div>
      <div style={card}>
        <Sec t="TODAY — MAY 31, 2026"/>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Staff","Tickets","Gross","Tips","Supply Charge","Surcharge","Net Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{rows.map(r=>(
            <tr key={r.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"8px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Av name={r.nick} size={24}/><span style={{fontWeight:500}}>{r.nick}</span></div></td>
              <td style={{padding:"8px",textAlign:"center"}}>{r.tickets}</td>
              <td style={{padding:"8px",color:G,fontWeight:600}}>${r.gross.toFixed(2)}</td>
              <td style={{padding:"8px"}}>${r.tips.toFixed(2)}</td>
              <td style={{padding:"8px",color:"#A32D2D"}}>-${r.supply.toFixed(2)}</td>
              <td style={{padding:"8px",color:"#A32D2D"}}>-${surcharge.toFixed(2)}</td>
              <td style={{padding:"8px",fontWeight:700,color:unlocked?DARK:"#9A9080",fontSize:unlocked?13:11}}>
                {unlocked?`$${r.net.toFixed(2)}`:"****"}
              </td>
            </tr>
          ))}</tbody>
        </table>
        {!unlocked&&<div style={{fontSize:10,color:MUTED,marginTop:8,textAlign:"center"}}>Net Pay requires Manager/Owner authorization to view (§3.3)</div>}
      </div>
    </div>
  );
}

// ─── AUDIT LOG PAGE (§7.3) ────────────────────────────────────
function AuditPage(){
  const actionColor={VoidItem:"#A32D2D",VoidTicket:"#A32D2D",ChangeTech:"#854F0B",Refund:"#185FA5",AdjustTurn:"#3C3489"};
  const actionBg={VoidItem:"#FCEBEB",VoidTicket:"#FCEBEB",ChangeTech:"#FAEEDA",Refund:"#E6F1FB",AdjustTurn:"#EEEDFE"};
  return(
    <div>
      <Ptitle t="Audit Log"/>
      <div style={{fontSize:11,color:MUTED,marginBottom:14}}>Tracks: VoidItem · ChangeTech · VoidTicket · Refund · AdjustTurn — with Action By vs Employee distinction (§7.3)</div>
      <div style={card}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Time","Action","Action By","Employee Affected","Ticket","Station","Notes"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{AUDIT_LOG.map(a=>(
            <tr key={a.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"7px 8px",color:MUTED,fontSize:10}}><DateCell d={String(a.time).split(" ")[0]} t={String(a.time).split(" ")[1]}/></td>
              <td style={{padding:"7px 8px"}}><span style={{...pill(a.action,actionColor[a.action]||MUTED,actionBg[a.action]||IVORY)}}>{a.action}</span></td>
              <td style={{padding:"7px 8px",fontWeight:500}}>{a.by}</td>
              <td style={{padding:"7px 8px",color:MUTED}}>{a.emp}</td>
              <td style={{padding:"7px 8px",color:MUTED}}>{a.ticket}</td>
              <td style={{padding:"7px 8px",color:MUTED,fontSize:10}}>{a.station}</td>
              <td style={{padding:"7px 8px",fontSize:11,color:DARK}}>{a.note}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SAFETY / SDS PAGE (§5) ──────────────────────────────────
function SafetyPage(){
  const [sel,setSel]=useState(null);
  return(
    <div>
      <Ptitle t="Safety & SDS Database"/>
      <div style={{fontSize:11,color:MUTED,marginBottom:14}}>Chemical hazard database for salon products. Click any row to view health risks (§5.1 / §5.2)</div>
      <div style={card}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Chemical","Category","Common In","Risk Level"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{HAZARD_DB.map(h=>{
            const risk=h.name.includes("MMA")||h.name.includes("Formaldehyde")?"High":h.name.includes("DBP")||h.name.includes("Toluene")?"Medium":"Low";
            const rc={High:"#A32D2D",Medium:"#854F0B",Low:"#3B6D11"};
            const rb={High:"#FCEBEB",Medium:"#FAEEDA",Low:"#EAF3DE"};
            return(
              <tr key={h.id} onClick={()=>setSel(sel?.id===h.id?null:h)} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)",cursor:"pointer",background:sel?.id===h.id?IVORY:""}}>
                <td style={{padding:"8px",fontWeight:500}}>{h.name}</td>
                <td style={{padding:"8px",color:MUTED}}>{h.category}</td>
                <td style={{padding:"8px",color:MUTED,fontSize:10}}>{h.products.join(", ")}</td>
                <td style={{padding:"8px"}}><span style={{...pill(risk,rc[risk],rb[risk])}}>{risk}</span></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
      {sel&&(
        <div style={{...card,borderColor:"rgba(212,175,55,0.4)",background:"rgba(212,175,55,0.03)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:14,fontWeight:500,color:DARK,marginBottom:4}}>{sel.name} — Safety Data Sheet</div>
              <div style={{fontSize:11,color:MUTED,marginBottom:10}}>{sel.category} · Used in: {sel.products.join(", ")}</div>
              <div style={{fontSize:12,color:DARK,lineHeight:1.7,maxWidth:480}}>
                <strong>Health Risks (§5.2.1):</strong> {sel.risk}
              </div>
            </div>
            <button style={{...btnO,fontSize:11}} onClick={()=>setSel(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GIFT CARDS PAGE (§3.4) ──────────────────────────────────
function GiftCardsPage(){
  const [reauth,setReauth]=useState(false);
  const [form,setForm]=useState({amount:50,discount:10,discountType:"percent",fee:2.5});
  const [issued,setIssued]=useState([
    {id:"GC-1001",amount:50,balance:32,issued:"2026-05-15",redeemed:18,status:"active"},
    {id:"GC-1002",amount:100,balance:100,issued:"2026-05-20",redeemed:0,status:"active"},
    {id:"GC-1003",amount:25,balance:0,issued:"2026-05-01",redeemed:25,status:"used"},
  ]);
  const presets=[10,25,50,100,200];
  const finalAmt=form.discountType==="percent"?form.amount*(1-form.discount/100):form.amount-form.discount;

  return(
    <div style={{position:"relative"}}>
      {reauth&&<ReAuthModal action="Issue Gift Card" onSuccess={()=>{setReauth(false);setIssued(prev=>[{id:"GC-"+Date.now().toString().slice(-4),amount:form.amount,balance:form.amount,issued:"2026-05-31",redeemed:0,status:"active"},...prev]);}} onCancel={()=>setReauth(false)}/>}
      <Ptitle t="Gift Card Management"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={card}>
          <Sec t="ISSUE NEW GIFT CARD (§3.4)"/>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {presets.map(p=><button key={p} onClick={()=>setForm(f=>({...f,amount:p}))} style={{...btnO,padding:"4px 10px",fontSize:11,background:form.amount===p?G:"transparent",color:form.amount===p?"#fff":DARK,borderColor:form.amount===p?G:"rgba(0,0,0,0.15)"}}>${p}</button>)}
          </div>
          <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Custom Amount ($)</label>
          <input style={inpS} type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:Number(e.target.value)}))}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Discount</label>
              <input style={inpS} type="number" value={form.discount} onChange={e=>setForm(f=>({...f,discount:Number(e.target.value)}))}/>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Type</label>
              <select style={inpS} value={form.discountType} onChange={e=>setForm(f=>({...f,discountType:e.target.value}))}>
                <option value="percent">Percent (%)</option>
                <option value="amount">Amount ($)</option>
              </select>
            </div>
          </div>
          <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Convenience Fee ($)</label>
          <input style={inpS} type="number" step="0.5" value={form.fee} onChange={e=>setForm(f=>({...f,fee:Number(e.target.value)}))}/>
          <div style={{background:IVORY,borderRadius:7,padding:"10px 12px",marginBottom:10,fontSize:11}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:MUTED}}>Face value</span><span>${form.amount.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:MUTED}}>Discount</span><span style={{color:"#3B6D11"}}>-${(form.amount-finalAmt).toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:MUTED}}>Convenience fee</span><span>+${form.fee.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:600,marginTop:4,paddingTop:4,borderTop:"0.5px solid rgba(0,0,0,0.08)"}}><span>Client pays</span><span style={{color:G}}>${(finalAmt+form.fee).toFixed(2)}</span></div>
          </div>
          <button style={{...btnP,width:"100%"}} onClick={()=>setReauth(true)}>Issue Gift Card</button>
        </div>
        <div style={card}>
          <Sec t="ACTIVE GIFT CARDS"/>
          {issued.map(g=>(
            <div key={g.id} style={{padding:"9px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:500,fontSize:12}}>{g.id}</div>
                  <div style={{fontSize:10,color:MUTED}}>Issued {g.issued} · Redeemed ${g.redeemed}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:700,color:G,fontSize:13}}>${g.balance} left</div>
                  <Pill status={g.status}/>
                </div>
              </div>
              <div style={{marginTop:5,height:4,background:"#F1EFE8",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(g.balance/g.amount)*100}%`,background:G,borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CRM / CLIENTS PAGE (§7.1 auto-segmentation) ─────────────
function ClientsPage(){
  const [tab,setTab]=useState("All");
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);

  const enriched=CLIENTS.map(c=>({...c,segment:getSegment(c.lv)}));
  let list=enriched.filter(c=>(c.n||"").toLowerCase().includes(search.toLowerCase()));
  if(tab==="VIP")    list=list.filter(c=>c.st==="vip");
  if(tab==="New")    list=list.filter(c=>c.segment==="new");
  if(tab==="Return") list=list.filter(c=>c.segment==="return");
  if(tab==="At Risk")list=list.filter(c=>c.segment==="at-risk");

  const counts={All:enriched.length,VIP:enriched.filter(c=>c.st==="vip").length,New:enriched.filter(c=>c.segment==="new").length,Return:enriched.filter(c=>c.segment==="return").length,"At Risk":enriched.filter(c=>c.segment==="at-risk").length};

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <Ptitle t="Clients"/>
        <input style={{...inpS,marginBottom:0,width:200}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {Object.entries(counts).map(([t,n])=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"5px 12px",borderRadius:5,fontSize:10,cursor:"pointer",border:"0.5px solid rgba(0,0,0,0.12)",fontFamily:"inherit",background:tab===t?G:"transparent",color:tab===t?"#fff":MUTED,fontWeight:tab===t?600:400}}>
            {t} <span style={{opacity:0.7}}>({n})</span>
          </button>
        ))}
      </div>
      {sel&&(
        <div style={{...card,borderColor:"rgba(212,175,55,0.4)",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:15,fontWeight:500}}>{sel.n}</div>
              <div style={{color:MUTED,fontSize:11,marginTop:2}}>{sel.ph} · {sel.em||"no email"}</div>
            </div>
            <button style={{...btnO,fontSize:11}} onClick={()=>setSel(null)}>Close</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:12}}>
            {[{l:"Total Visits",v:sel.v},{l:"Balance",v:`$${sel.b}`},{l:"Segment",v:<Pill status={sel.segment}/>},{l:"Last Visit",v:sel.lv?fmtD(sel.lv):"—"}].map((s,i)=>(
              <div key={i} style={{background:IVORY,borderRadius:7,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:MUTED}}>{s.l}</div>
                <div style={{fontSize:14,fontWeight:400,color:DARK,marginTop:3}}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <div style={{fontSize:10,color:MUTED,marginBottom:6}}>VISIT HISTORY</div>
            {TX.filter(t=>t.c===sel.n).map((t,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"5px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
                <span>{t.s} · <span style={{color:MUTED}}>{t.e}</span></span>
                <span style={{color:G}}>${t.tot} · {t.pay}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={card}>
        <div style={{fontSize:10,color:MUTED,marginBottom:6}}>{list.length} clients</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Name","Phone","Visits","Last Visit","Balance","Segment","Status"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{list.map(c=>(
            <tr key={c.id} onClick={()=>setSel(c)} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=IVORY} onMouseLeave={e=>e.currentTarget.style.background=""}>
              <td style={{padding:"8px",fontWeight:500}}>{c.n}</td>
              <td style={{padding:"8px"}}>{c.ph}</td>
              <td style={{padding:"8px",textAlign:"center"}}>{c.v}</td>
              <td style={{padding:"8px",color:MUTED,fontSize:10}}>{c.lv?<DateCell d={c.lv}/>:"—"}</td>
              <td style={{padding:"8px",color:G,fontWeight:600}}>${c.b}</td>
              <td style={{padding:"8px"}}><Pill status={c.segment}/></td>
              <td style={{padding:"8px"}}><Pill status={c.st}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── APPOINTMENTS PAGE (§6 with conflict check) ───────────────
function ApptsPage(){
  const [appts,setAppts]=useState([]);
  const [emps,setEmps]=useState([]);
  const [clis,setClis]=useState([]);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({c:"",e:"",s:"",d:todayStr(),t:"09:00",dur:60,src:"walk-in"});
  const [conflict,setConflict]=useState(null);
  const [filterD,setFilterD]=useState("");
  const BUFFER=15; // minutes before/after

  const load=useCallback(()=>{
    qraw("appointments?select=id,service,scheduled_at,status,notes,clients(name),employees(name)&order=scheduled_at.desc&limit=120").then(rows=>{
      setAppts(rows.map(a=>({id:a.id,c:(a.clients&&a.clients.name)||a.notes||"Client",e:(a.employees&&a.employees.name)||"",s:a.service,d:dStrOf(a.scheduled_at),t:hmOf(a.scheduled_at),dur:60,src:"booked",st:a.status==="scheduled"?"confirmed":a.status})));
    });
    qraw("employees?select=id,name,role&status=eq.active&order=name.asc").then(setEmps);
    qraw("clients?select=id,name&order=name.asc&limit=200").then(setClis);
  },[]);
  useEffect(()=>{load();},[load]);

  const checkConflict=(empNick,date,time,dur)=>{
    const [h,m]=time.split(":").map(Number);
    const start=h*60+m;
    const end=start+dur;
    return appts.filter(a=>a.e===empNick&&a.d===date).find(a=>{
      const [ah,am]=a.t.split(":").map(Number);
      const aStart=ah*60+am-BUFFER;
      const aEnd=ah*60+am+a.dur+BUFFER;
      return start<aEnd&&end>aStart;
    });
  };

  const addAppt=async()=>{
    if(!form.c||!form.e||!form.s){setConflict("Please fill all fields.");return;}
    const cf=checkConflict(form.e,form.d,form.t,form.dur);
    if(cf){setConflict(`Conflict! ${form.e} has ${cf.s} at ${fmt12(cf.t)} (±${BUFFER}min buffer). Choose different time or technician.`);return;}
    const emp=emps.find(x=>x.name===form.e);
    const cli=clis.find(x=>x.name===form.c);
    const iso=new Date(`${form.d}T${form.t}:00`).toISOString();
    const {error}=await db.from("appointments").insert({service:form.s,scheduled_at:iso,status:"scheduled",employee_id:emp?emp.id:null,client_id:cli?cli.id:null,notes:cli?null:form.c});
    if(error){setConflict("Could not save appointment — check connection.");return;}
    setShowForm(false);setConflict(null);setForm({c:"",e:"",s:"",d:todayStr(),t:"09:00",dur:60,src:"walk-in"});
    load();
  };

  const list=filterD?appts.filter(a=>a.d===filterD):appts;
  const times=["09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00","19:15"];

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <Ptitle t="Appointments"/>
        <div style={{display:"flex",gap:8}}>
          <input type="date" style={{...inpS,marginBottom:0,width:160}} value={filterD} onChange={e=>setFilterD(e.target.value)}/>
          <button style={btnP} onClick={()=>setShowForm(!showForm)}>+ New</button>
        </div>
      </div>
      {showForm&&(
        <div style={{...card,borderColor:"rgba(212,175,55,0.4)",marginBottom:14}}>
          <Sec t="NEW APPOINTMENT — 15-min intervals (§6.1) · Conflict check ±15min"/>
          {conflict&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:7,padding:"9px 12px",fontSize:11,color:"#A32D2D",marginBottom:10}}>{conflict}</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Client</label>
              <input style={inpS} list="os-clients" placeholder="Client name" value={form.c} onChange={e=>setForm(f=>({...f,c:e.target.value}))}/>
              <datalist id="os-clients">{clis.map(c=><option key={c.id} value={c.name}/>)}</datalist>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Technician</label>
              <select style={inpS} value={form.e} onChange={e=>setForm(f=>({...f,e:e.target.value}))}>
                <option value="">Select tech</option>
                {emps.filter(u=>isTechRole(u.role)).map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Source</label>
              <select style={inpS} value={form.src} onChange={e=>setForm(f=>({...f,src:e.target.value}))}>
                {["walk-in","online","request","non-request"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Service</label>
              <input style={inpS} placeholder="Service name" value={form.s} onChange={e=>setForm(f=>({...f,s:e.target.value}))}/>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Time (15-min intervals)</label>
              <select style={inpS} value={form.t} onChange={e=>setForm(f=>({...f,t:e.target.value}))}>
                {times.map(t=><option key={t} value={t}>{fmt12(t)}</option>)}
              </select>
            </div>
            <div>
              <label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Duration (min)</label>
              <select style={inpS} value={form.dur} onChange={e=>setForm(f=>({...f,dur:Number(e.target.value)}))}>
                {[15,30,45,60,75,90,105,120].map(d=><option key={d} value={d}>{d} min</option>)}
              </select>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={btnP} onClick={addAppt}>Save Appointment</button>
            <button style={btnO} onClick={()=>{setShowForm(false);setConflict(null);}}>Cancel</button>
          </div>
        </div>
      )}
      <div style={card}>
        <div style={{fontSize:10,color:MUTED,marginBottom:8}}>{list.length} appointments</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Date","Time","Client","Service","Staff","Duration","Source","Status"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{list.map((a,i)=>(
            <tr key={i} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"8px"}}><DateCell d={a.d}/></td>
              <td style={{padding:"8px",color:MUTED}}>{fmt12(a.t)}</td>
              <td style={{padding:"8px",fontWeight:500}}>{a.c}</td>
              <td style={{padding:"8px"}}>{a.s}</td>
              <td style={{padding:"8px",color:MUTED}}>{a.e}</td>
              <td style={{padding:"8px",color:MUTED}}>{a.dur} min</td>
              <td style={{padding:"8px"}}><span style={{...pill(a.src,MUTED,IVORY)}}>{a.src}</span></td>
              <td style={{padding:"8px"}}><Pill status={a.st}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── POS PAGE ─────────────────────────────────────────────────
function POSPage({user}){
  const [prods,setProds]=useState([]);
  const [emps,setEmps]=useState([]);
  const [cart,setCart]=useState([]);
  const [client,setClient]=useState("");
  const [emp,setEmp]=useState(user.title==="Nail Tech"?user.nick:"");
  const [pay,setPay]=useState("Card");
  const [tip,setTip]=useState("");
  const [ok,setOk]=useState(false);
  const [search,setSearch]=useState("");
  const [reauth,setReauth]=useState(false);

  useEffect(()=>{ db.from("products").select("*").then(({data})=>setProds(data||[])); qraw("employees?select=id,name,role&status=eq.active&order=name.asc").then(setEmps); },[]);

  const addToCart=p=>{const ex=cart.find(i=>i.id===p.id);ex?setCart(cart.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i)):setCart([...cart,{...p,qty:1}]);};
  const sub=cart.reduce((s,i)=>s+parseFloat(i.price||0)*i.qty,0);
  const tipA=parseFloat(tip)||0;
  const supply=getSupplyCharge(sub);
  const filtered=prods.filter(p=>!search||(p.name||"").toLowerCase().includes(search.toLowerCase()));

  const checkout=async()=>{
    if(!cart.length) return;
    const empRow=emps.find(x=>x.name===emp);
    await db.from("transactions").insert({employee_id:empRow?empRow.id:null,total:(sub+tipA).toFixed(2),payment_method:pay});
    if(empRow) await db.from("earnings").insert({employee_id:empRow.id,earned_date:todayStr(),service_name:cart.map(i=>i.name).join(", "),amount:sub.toFixed(2),tip:tipA.toFixed(2),source:"pos"});
    setCart([]);setTip("");setOk(true);setTimeout(()=>setOk(false),3000);
  };

  const doVoid=()=>setReauth(true);

  return(
    <div style={{position:"relative"}}>
      {reauth&&<ReAuthModal action="Void Ticket" onSuccess={()=>{setReauth(false);setCart([]);}} onCancel={()=>setReauth(false)}/>}
      <Ptitle t="POS Checkout"/>
      {ok&&<div style={{background:"#EAF3DE",border:"0.5px solid #3B6D11",borderRadius:8,padding:"10px 14px",marginBottom:12,color:"#27500A",fontWeight:500,fontSize:12}}>Sale completed and saved!</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16}}>
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <select style={inpS} value={client} onChange={e=>setClient(e.target.value)}>
              <option value="">Walk-in / Select Client</option>
              {CLIENTS.map(c=><option key={c.id} value={c.n}>{c.n}</option>)}
            </select>
            <select style={inpS} value={emp} onChange={e=>setEmp(e.target.value)}>
              <option value="">Select Staff</option>
              {emps.filter(u=>isTechRole(u.role)).map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
            </select>
          </div>
          <input style={inpS} placeholder="Search service..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,maxHeight:340,overflowY:"auto"}}>
            {filtered.map(p=>(
              <button key={p.id} onClick={()=>addToCart(p)} style={{background:"#fff",border:"0.5px solid rgba(212,175,55,0.2)",borderRadius:9,padding:"12px 10px",cursor:"pointer",textAlign:"left"}}>
                <div style={{fontSize:10,color:MUTED,marginBottom:3}}>{p.category}</div>
                <div style={{fontSize:12,fontWeight:500,color:DARK,marginBottom:5}}>{p.name}</div>
                <div style={{fontSize:14,fontWeight:700,color:G}}>${parseFloat(p.price||0).toFixed(2)}</div>
              </button>
            ))}
            {filtered.length===0&&<div style={{gridColumn:"1/-1",padding:20,color:MUTED,textAlign:"center",fontSize:12}}>Add services in Supabase → products table</div>}
          </div>
        </div>
        <div style={{...card,alignSelf:"start"}}>
          <Sec t="CART"/>
          {cart.length===0?<p style={{color:MUTED,fontSize:12}}>No items</p>:(
            <>
              {cart.map(i=>(
                <div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"0.5px solid rgba(0,0,0,0.05)"}}>
                  <div><div style={{fontSize:12,fontWeight:500}}>{i.name}</div><div style={{fontSize:10,color:MUTED}}>x{i.qty}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:G,fontWeight:700}}>${(parseFloat(i.price||0)*i.qty).toFixed(2)}</span>
                    <button onClick={()=>setCart(cart.filter(c=>c.id!==i.id))} style={{background:"none",border:"none",color:"#A32D2D",cursor:"pointer",fontSize:16}}>×</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:12,paddingTop:12,borderTop:"0.5px solid rgba(212,175,55,0.2)"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}><span style={{color:MUTED}}>Subtotal</span><span>${sub.toFixed(2)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}><span style={{color:MUTED}}>Supply charge</span><span style={{color:"#A32D2D"}}>-${supply.toFixed(2)}</span></div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <span style={{color:MUTED,fontSize:11,width:36}}>Tip</span>
                  <input style={{...inpS,marginBottom:0,flex:1}} type="number" placeholder="$0" value={tip} onChange={e=>setTip(e.target.value)}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:700,color:DARK,marginBottom:10}}><span>Total</span><span style={{color:G}}>${(sub+tipA).toFixed(2)}</span></div>
                <select style={inpS} value={pay} onChange={e=>setPay(e.target.value)}>
                  {["Card","Cash","Gift Card","Venmo","Zelle","Split"].map(m=><option key={m}>{m}</option>)}
                </select>
                <button style={{...btnP,width:"100%",padding:"10px",fontSize:13}} onClick={checkout}>Complete Sale</button>
                <button style={{...btnD,width:"100%",marginTop:6,padding:"7px"}} onClick={doVoid}>Void Ticket</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED PAGES ─────────────────────────────────────────────
function DashPage(){
  const today=TX.filter(t=>t.d==="2026-05-31");
  const ts=today.reduce((s,t)=>s+t.tot,0);
  const tt=today.reduce((s,t)=>s+t.tip,0);
  const ta=APPTS.filter(a=>a.d==="2026-05-31");
  const byEmp={};
  USERS.filter(u=>u.title==="Nail Tech").forEach(u=>{
    const et=today.filter(t=>t.e===u.nick);
    byEmp[u.nick]={s:et.reduce((a,t)=>a+t.tot,0),t:et.reduce((a,t)=>a+t.tip,0),c:et.length};
  });
  return(
    <div>
      <Ptitle t="Owner Dashboard"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9,marginBottom:14}}>
        <Stat label="Revenue Today" value={`$${ts.toFixed(0)}`} sub={`${today.length} transactions`} accent={G}/>
        <Stat label="Tips Today" value={`$${tt.toFixed(0)}`}/>
        <Stat label="Appointments" value={ta.length} sub={`${ta.filter(a=>a.st==="completed").length} completed`}/>
        <Stat label="Clients" value={CLIENTS.length} sub={`${CLIENTS.filter(c=>c.st==="vip").length} VIP`}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={card}>
          <Sec t="STAFF PERFORMANCE — TODAY"/>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Staff","Tickets","Sales","Tips"].map(h=><th key={h} style={{textAlign:"left",padding:"4px 7px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
            <tbody>{Object.entries(byEmp).sort((a,b)=>b[1].s-a[1].s).map(([n,v])=>(
              <tr key={n} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
                <td style={{padding:"7px"}}><div style={{display:"flex",alignItems:"center",gap:5}}><Av name={n} size={22}/><span>{n}</span></div></td>
                <td style={{padding:"7px",textAlign:"center"}}>{v.c}</td>
                <td style={{padding:"7px",color:G,fontWeight:600}}>${v.s}</td>
                <td style={{padding:"7px"}}>${v.t}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={card}>
          <Sec t="TODAY'S APPOINTMENTS"/>
          {ta.map(a=>(
            <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <div><div style={{fontSize:11,fontWeight:500}}>{a.c}</div><div style={{fontSize:10,color:MUTED}}>{a.s} · {a.e} · {fmt12(a.t)}</div></div>
              <Pill status={a.st}/>
            </div>
          ))}
        </div>
      </div>
      <div style={card}>
        <Sec t="RECENT TRANSACTIONS"/>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Client","Staff","Service","Total","Tip","Pay","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"4px 7px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{TX.slice(0,8).map(t=>(
            <tr key={t.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"7px",fontWeight:500}}>{t.c}</td>
              <td style={{padding:"7px",color:MUTED}}>{t.e}</td>
              <td style={{padding:"7px",color:MUTED,fontSize:10}}>{t.s}</td>
              <td style={{padding:"7px",color:G,fontWeight:700}}>${t.tot}</td>
              <td style={{padding:"7px"}}>${t.tip}</td>
              <td style={{padding:"7px"}}>{t.pay}</td>
              <td style={{padding:"7px",color:MUTED}}><DateCell d={t.d}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function RevenuePage(){
  const tot=TX.reduce((s,t)=>s+t.tot,0);
  const tps=TX.reduce((s,t)=>s+t.tip,0);
  const byE={};TX.forEach(t=>{if(!byE[t.e])byE[t.e]={tot:0,c:0};byE[t.e].tot+=t.tot;byE[t.e].c++;});
  const byP={};TX.forEach(t=>{byP[t.pay]=(byP[t.pay]||0)+t.tot;});
  return(
    <div>
      <Ptitle t="Revenue Overview"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9,marginBottom:14}}>
        <Stat label="Total Revenue" value={`$${tot.toFixed(0)}`} accent={G}/>
        <Stat label="Total Tips" value={`$${tps.toFixed(0)}`}/>
        <Stat label="Transactions" value={TX.length}/>
        <Stat label="Avg Ticket" value={`$${Math.round(tot/TX.length)}`}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={card}>
          <Sec t="BY STAFF"/>
          {Object.entries(byE).sort((a,b)=>b[1].tot-a[1].tot).map(([n,v])=>{
            const pct=Math.round(v.tot/tot*100);
            return(<div key={n} style={{marginBottom:9}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}><span style={{fontWeight:500}}>{n}</span><span style={{color:G}}>${v.tot} <span style={{color:MUTED,fontWeight:400}}>({v.c} tkts)</span></span></div>
              <div style={{height:5,background:"#F1EFE8",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:G,borderRadius:3}}/></div>
            </div>);
          })}
        </div>
        <div style={card}>
          <Sec t="BY PAYMENT METHOD"/>
          {Object.entries(byP).map(([m,amt])=>{
            const pct=Math.round(amt/tot*100);
            return(<div key={m} style={{marginBottom:9}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}><span>{m}</span><span style={{color:G}}>${amt} ({pct}%)</span></div>
              <div style={{height:5,background:"#F1EFE8",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:BRONZE,borderRadius:3}}/></div>
            </div>);
          })}
        </div>
      </div>
    </div>
  );
}

function SchedulePage(){
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return(
    <div>
      <Ptitle t="All Staff Schedules"/>
      <div style={{...card,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:480}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>
            <th style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>Staff</th>
            <th style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>Role</th>
            {days.map(d=><th key={d} style={{textAlign:"center",padding:"5px 4px",color:MUTED,fontSize:10,fontWeight:500}}>{d}</th>)}
          </tr></thead>
          <tbody>{USERS.map(u=>{
            const rp=u.role==="Owner"?"#3C3489":u.role==="Manager"?"#854F0B":"#3B6D11";
            const rb=u.role==="Owner"?"#EEEDFE":u.role==="Manager"?"#FAEEDA":"#EAF3DE";
            return(
              <tr key={u.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
                <td style={{padding:"9px 8px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Av name={u.nick} size={24}/><div><div style={{fontWeight:500}}>{u.nick}</div><div style={{fontSize:10,color:MUTED}}>{u.fn}</div></div></div></td>
                <td style={{padding:"9px 8px"}}><span style={{...pill(u.role,rp,rb)}}>{u.role}</span></td>
                {days.map(d=>(
                  <td key={d} style={{padding:"9px 4px"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:u.sch.includes(d)?"rgba(212,175,55,0.15)":"rgba(0,0,0,0.04)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:u.sch.includes(d)?G:"#D3D1C7"}}/>
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeesPage(){
  const [sel,setSel]=useState(null);
  return(
    <div>
      <Ptitle t="Employees"/>
      {sel&&(
        <div style={{...card,borderColor:"rgba(212,175,55,0.4)",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Av name={sel.nick} size={42}/>
              <div>
                <div style={{fontSize:15,fontWeight:500}}>{sel.fn}</div>
                <div style={{color:MUTED,fontSize:11,marginTop:2}}>{sel.ph}</div>
                <div style={{marginTop:5}}><span style={{...pill(sel.role,sel.role==="Owner"?"#3C3489":sel.role==="Manager"?"#854F0B":"#3B6D11",sel.role==="Owner"?"#EEEDFE":sel.role==="Manager"?"#FAEEDA":"#EAF3DE")}}>{sel.role}</span></div>
              </div>
            </div>
            <button style={{...btnO,fontSize:11}} onClick={()=>setSel(null)}>Close</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:12}}>
            {[{l:"Today Sales",v:`$${sel.sales}`},{l:"Today Tips",v:`$${sel.tips}`},{l:"Schedule",v:sel.sch.join(", ")},{l:"Today Tickets",v:TX.filter(t=>t.e===sel.nick&&t.d==="2026-05-31").length}].map((s,i)=>(
              <div key={i} style={{background:IVORY,borderRadius:7,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:MUTED}}>{s.l}</div>
                <div style={{fontSize:13,fontWeight:400,color:DARK,marginTop:3}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={card}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["","Full Name","Nick","Phone","Role","Sales","Schedule"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{USERS.map(u=>(
            <tr key={u.id} onClick={()=>setSel(u)} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=IVORY} onMouseLeave={e=>e.currentTarget.style.background=""}>
              <td style={{padding:"9px 8px"}}><Av name={u.nick} size={26}/></td>
              <td style={{padding:"9px 8px",fontWeight:500}}>{u.fn}</td>
              <td style={{padding:"9px 8px",color:MUTED}}>{u.nick}</td>
              <td style={{padding:"9px 8px"}}>{u.ph}</td>
              <td style={{padding:"9px 8px"}}><span style={{...pill(u.role,u.role==="Owner"?"#3C3489":u.role==="Manager"?"#854F0B":"#3B6D11",u.role==="Owner"?"#EEEDFE":u.role==="Manager"?"#FAEEDA":"#EAF3DE")}}>{u.role}</span></td>
              <td style={{padding:"9px 8px",color:G,fontWeight:600}}>${u.sales}</td>
              <td style={{padding:"9px 8px",fontSize:10,color:MUTED}}>{u.sch.join(", ")}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsPage(){
  const tot=TX.reduce((s,t)=>s+t.tot,0);
  const tps=TX.reduce((s,t)=>s+t.tip,0);
  return(
    <div>
      <Ptitle t="Reports"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9,marginBottom:14}}>
        <Stat label="Total Revenue" value={`$${tot.toFixed(0)}`} accent={G}/>
        <Stat label="Total Tips" value={`$${tps.toFixed(0)}`}/>
        <Stat label="Avg Ticket" value={`$${Math.round(tot/TX.length)}`}/>
        <Stat label="Transactions" value={TX.length}/>
      </div>
      <div style={card}>
        <Sec t="ALL TRANSACTIONS"/>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Client","Staff","Service","Sub","Tip","Total","Supply","Pay","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"4px 7px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{TX.map(t=>(
            <tr key={t.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"7px",fontWeight:500}}>{t.c}</td>
              <td style={{padding:"7px",color:MUTED}}>{t.e}</td>
              <td style={{padding:"7px",color:MUTED,fontSize:10}}>{t.s}</td>
              <td style={{padding:"7px"}}>${t.sb}</td>
              <td style={{padding:"7px"}}>${t.tip}</td>
              <td style={{padding:"7px",color:G,fontWeight:700}}>${t.tot}</td>
              <td style={{padding:"7px",color:"#A32D2D"}}>-${getSupplyCharge(t.sb).toFixed(2)}</td>
              <td style={{padding:"7px"}}>{t.pay}</td>
              <td style={{padding:"7px",color:MUTED,fontSize:10}}><DateCell d={t.d}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function FeedbackPage(){
  const [ftab,setFtab]=useState("Client");
  const items=FEEDBACK.filter(f=>ftab==="Client"?f.tp==="client":f.tp==="employee");
  return(
    <div>
      <Ptitle t="Feedback"/>
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {["Client","Staff"].map(t=>(
          <button key={t} onClick={()=>setFtab(t)} style={{padding:"5px 14px",borderRadius:5,fontSize:11,cursor:"pointer",border:"0.5px solid rgba(0,0,0,0.12)",fontFamily:"inherit",background:ftab===t?G:"transparent",color:ftab===t?"#fff":MUTED,fontWeight:ftab===t?600:400}}>
            {t} Reviews
          </button>
        ))}
      </div>
      {items.map(f=>(
        <div key={f.id} style={{...card,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <Av name={f.fr} size={32}/>
              <div>
                <div style={{fontWeight:500,fontSize:12}}>{f.fr}{f.fe&&<span style={{color:MUTED,fontSize:10,fontWeight:400}}> → {f.fe}</span>}</div>
                {f.r>0&&<div style={{color:G,fontSize:12,marginTop:2}}>{"★".repeat(f.r)}{"☆".repeat(5-f.r)}</div>}
                <div style={{fontSize:11,color:DARK,marginTop:5,lineHeight:1.5}}>{f.msg}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0,marginLeft:10}}>
              <span style={{fontSize:10,color:MUTED}}>{fmtD(f.d)}</span>
              <Pill status={f.st}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StaffOverviewPage(){
  const [sel,setSel]=useState(null);
  const techs=USERS.filter(u=>u.title==="Nail Tech");
  return(
    <div>
      <Ptitle t="Staff Overview"/>
      {sel&&(
        <div style={{...card,borderColor:"rgba(212,175,55,0.4)",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Av name={sel.nick} size={38}/>
              <div>
                <div style={{fontSize:14,fontWeight:500}}>{sel.fn}</div>
                <div style={{color:MUTED,fontSize:11}}>{sel.ph}</div>
                <div style={{fontSize:10,color:MUTED,marginTop:3}}>Schedule: {sel.sch.join(", ")}</div>
              </div>
            </div>
            <button style={{...btnO,fontSize:11}} onClick={()=>setSel(null)}>Close</button>
          </div>
          <div style={{marginTop:10}}>
            <div style={{fontSize:10,color:MUTED,marginBottom:5}}>TODAY'S APPOINTMENTS</div>
            {APPTS.filter(a=>a.e===sel.nick&&a.d==="2026-05-31").map(a=>(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"5px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
                <span>{fmt12(a.t)} · <strong>{a.c}</strong> · {a.s}</span>
                <Pill status={a.st}/>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={card}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["","Name","Nick","Phone","Sales Today","Schedule"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{techs.map(u=>(
            <tr key={u.id} onClick={()=>setSel(u)} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=IVORY} onMouseLeave={e=>e.currentTarget.style.background=""}>
              <td style={{padding:"9px 8px"}}><Av name={u.nick} size={24}/></td>
              <td style={{padding:"9px 8px",fontWeight:500}}>{u.fn}</td>
              <td style={{padding:"9px 8px",color:MUTED}}>{u.nick}</td>
              <td style={{padding:"9px 8px"}}>{u.ph}</td>
              <td style={{padding:"9px 8px",color:G,fontWeight:700}}>${u.sales}</td>
              <td style={{padding:"9px 8px",fontSize:10,color:MUTED}}>{u.sch.join(", ")}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function LeavePage(){
  const [leaveData,setLeaveData]=useState(LEAVE);
  return(
    <div>
      <Ptitle t="Leave Requests"/>
      {leaveData.map(r=>(
        <div key={r.id} style={{...card,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:9,alignItems:"center"}}>
              <Av name={r.e} size={34}/>
              <div>
                <div style={{fontWeight:500,fontSize:12}}>{r.e}</div>
                <div style={{fontSize:11,color:DARK,marginTop:2}}>{r.dates}</div>
                <div style={{fontSize:10,color:MUTED,marginTop:2}}>{r.reason} · Submitted {r.sub}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <Pill status={r.st}/>
              {r.st==="pending"&&(
                <>
                  <button style={{...btnP,padding:"4px 10px",fontSize:11}} onClick={()=>setLeaveData(leaveData.map(x=>x.id===r.id?{...x,st:"approved"}:x))}>Approve</button>
                  <button style={{...btnD,padding:"4px 10px",fontSize:11}} onClick={()=>setLeaveData(leaveData.map(x=>x.id===r.id?{...x,st:"rejected"}:x))}>Reject</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── EMPLOYEE SELF-SERVICE PAGES ─────────────────────────────
function MyDash({user}){
  const myTx=TX.filter(t=>t.e===user.nick&&t.d==="2026-05-31");
  const myA=APPTS.filter(a=>a.e===user.nick&&a.d==="2026-05-31");
  const ms=myTx.reduce((s,t)=>s+t.tot,0);
  const mt=myTx.reduce((s,t)=>s+t.tip,0);
  return(
    <div>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}>
        <Av name={user.nick} size={42}/>
        <div>
          <div style={{fontSize:16,fontWeight:300,color:DARK}}>Welcome, {user.nick}</div>
          <div style={{fontSize:11,color:MUTED}}>{user.fn} · {user.title}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>
        <Stat label="Today's Sales" value={`$${ms}`} accent={G}/>
        <Stat label="Today's Tips" value={`$${mt}`}/>
        <Stat label="Appointments Today" value={myA.length}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={card}>
          <Sec t="TODAY'S APPOINTMENTS"/>
          {myA.length?myA.map(a=>(
            <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <div><div style={{fontSize:11,fontWeight:500}}>{a.c}</div><div style={{fontSize:10,color:MUTED}}>{a.s} · {fmt12(a.t)} · {a.dur}min</div></div>
              <Pill status={a.st}/>
            </div>
          )):<p style={{color:MUTED,fontSize:11}}>No appointments today</p>}
        </div>
        <div style={card}>
          <Sec t="TODAY'S TICKETS"/>
          {myTx.length?<table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Client","Total","Tip","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"4px 6px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
            <tbody>{myTx.map(t=>(
              <tr key={t.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
                <td style={{padding:"6px",fontWeight:500}}>{t.c}</td>
                <td style={{padding:"6px",color:G,fontWeight:700}}>${t.tot}</td>
                <td style={{padding:"6px"}}>${t.tip}</td>
                <td style={{padding:"6px"}}>{t.pay}</td>
              </tr>
            ))}</tbody>
          </table>:<p style={{color:MUTED,fontSize:11}}>No tickets today</p>}
        </div>
      </div>
    </div>
  );
}

function MySched({user}){
  const myA=APPTS.filter(a=>a.e===user.nick);
  return(
    <div>
      <Ptitle t="My Schedule"/>
      <div style={{...card,marginBottom:12}}>
        <Sec t="MY WORKING DAYS"/>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
            <span key={d} style={{...pill(d,user.sch.includes(d)?BRONZE:MUTED,user.sch.includes(d)?"rgba(212,175,55,0.15)":IVORY)}}>{d}</span>
          ))}
        </div>
      </div>
      <div style={card}>
        <Sec t="MY APPOINTMENTS"/>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"0.5px solid rgba(0,0,0,0.07)"}}>{["Date","Time","Client","Service","Duration","Status"].map(h=><th key={h} style={{textAlign:"left",padding:"5px 8px",color:MUTED,fontSize:10,fontWeight:500}}>{h}</th>)}</tr></thead>
          <tbody>{myA.length?myA.map(a=>(
            <tr key={a.id} style={{borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <td style={{padding:"8px"}}><DateCell d={a.d}/></td>
              <td style={{padding:"8px",color:MUTED}}>{fmt12(a.t)}</td>
              <td style={{padding:"8px",fontWeight:500}}>{a.c}</td>
              <td style={{padding:"8px"}}>{a.s}</td>
              <td style={{padding:"8px",color:MUTED}}>{a.dur}min</td>
              <td style={{padding:"8px"}}><Pill status={a.st}/></td>
            </tr>
          )):<tr><td colSpan={6} style={{padding:16,textAlign:"center",color:MUTED}}>No appointments scheduled</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
}

function MyQueuePos({user}){
  const queue=USERS.filter(u=>u.queue_pos!==null).sort((a,b)=>a.queue_pos-b.queue_pos);
  const myPos=queue.findIndex(u=>u.nick===user.nick)+1;
  const today=TX.filter(t=>t.d==="2026-05-31"&&t.e===user.nick);
  const gross=today.reduce((s,t)=>s+t.sb,0);
  const turns=calcTurns(gross,50);
  const rem=(gross%50).toFixed(2);
  return(
    <div>
      <Ptitle t="My Queue Position"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:14}}>
        <Stat label="My Position" value={`#${myPos}`} accent={myPos===1?G:DARK} sub={myPos===1?"You're next!":""}/>
        <Stat label="Turns Earned Today" value={`${turns} turns`}/>
        <Stat label="Remainder Credit" value={`$${rem}`} sub="carries to next turn"/>
      </div>
      <div style={card}>
        <Sec t="CURRENT QUEUE ORDER"/>
        {queue.map((e,i)=>(
          <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)",background:e.nick===user.nick?"rgba(212,175,55,0.05)":""}}>
            <div style={{fontSize:16,fontWeight:700,color:i===0?G:MUTED,width:24,textAlign:"center"}}>{i+1}</div>
            <Av name={e.nick} size={28}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:e.nick===user.nick?600:400,color:e.nick===user.nick?DARK:MUTED}}>{e.nick} {e.nick===user.nick&&<span style={{...SP.new}}>You</span>}</div></div>
            <div style={{fontSize:11,color:MUTED}}>${ TX.filter(t=>t.d==="2026-05-31"&&t.e===e.nick).reduce((s,t)=>s+t.tot,0)} today</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyFb({user}){
  const items=FEEDBACK.filter(f=>f.fe===user.nick||f.fr===user.nick);
  return(
    <div>
      <Ptitle t="My Feedback"/>
      {items.length===0?<p style={{color:MUTED,fontSize:12}}>No feedback yet</p>:items.map(f=>(
        <div key={f.id} style={{...card,marginBottom:8}}>
          <div style={{fontSize:10,color:MUTED,marginBottom:4}}>{f.tp==="client"?"Client review for you":"Your submission"}</div>
          {f.r>0&&<div style={{color:G,fontSize:12,marginBottom:4}}>{"★".repeat(f.r)}{"☆".repeat(5-f.r)}</div>}
          <div style={{fontSize:11,fontWeight:500,marginBottom:3}}>From: {f.fr}</div>
          <div style={{fontSize:11,color:DARK,lineHeight:1.5}}>{f.msg}</div>
          <div style={{fontSize:10,color:MUTED,marginTop:5}}>{fmtD(f.d)} · <Pill status={f.st}/></div>
        </div>
      ))}
    </div>
  );
}

function MyLeave({user}){
  const [leaveData,setLeaveData]=useState(LEAVE);
  const [form,setForm]=useState({dates:"",reason:""});
  const [done,setDone]=useState(false);
  const mine=leaveData.filter(r=>r.e===user.nick);
  const submit=()=>{
    if(!form.dates||!form.reason)return;
    setLeaveData(prev=>[...prev,{id:Date.now(),e:user.nick,dates:form.dates,reason:form.reason,st:"pending",sub:"2026-05-31"}]);
    setForm({dates:"",reason:""});setDone(true);setTimeout(()=>setDone(false),4000);
  };
  return(
    <div>
      <Ptitle t="Request Leave"/>
      {done&&<div style={{background:"#EAF3DE",border:"0.5px solid #97C459",borderRadius:7,padding:"9px 13px",fontSize:11,color:"#27500A",fontWeight:500,marginBottom:12}}>Leave request submitted! Manager will review it.</div>}
      <div style={{...card,borderColor:"rgba(212,175,55,0.3)",marginBottom:12}}>
        <Sec t="NEW REQUEST"/>
        <input style={inpS} placeholder="Dates (e.g. June 14-15, 2026)" value={form.dates} onChange={e=>setForm(f=>({...f,dates:e.target.value}))}/>
        <textarea style={{...inpS,height:64}} placeholder="Reason for leave..." value={form.reason} onChange={e=>setForm(f=>({...f,reason:e.target.value}))}/>
        <button style={btnP} onClick={submit}>Submit Request</button>
      </div>
      {mine.length>0&&(
        <div style={card}>
          <Sec t="MY REQUESTS"/>
          {mine.map(r=>(
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <div><div style={{fontSize:11,fontWeight:500}}>{r.dates}</div><div style={{fontSize:10,color:MUTED}}>{r.reason} · {r.sub}</div></div>
              <Pill status={r.st}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MyImp({user}){
  const [form,setForm]=useState({cat:"Equipment",msg:""});
  const [done,setDone]=useState(false);
  const mine=FEEDBACK.filter(f=>f.fr===user.nick&&f.tp==="employee");
  const submit=()=>{
    if(!form.msg)return;
    setForm({cat:"Equipment",msg:""});setDone(true);setTimeout(()=>setDone(false),4000);
  };
  return(
    <div>
      <Ptitle t="Suggest Improvement"/>
      {done&&<div style={{background:"#EAF3DE",border:"0.5px solid #97C459",borderRadius:7,padding:"9px 13px",fontSize:11,color:"#27500A",fontWeight:500,marginBottom:12}}>Suggestion sent to manager!</div>}
      <div style={{...card,borderColor:"rgba(212,175,55,0.3)",marginBottom:12}}>
        <Sec t="NEW SUGGESTION"/>
        <select style={inpS} value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}>
          {["Equipment","Scheduling","Products","Workplace","Client Experience","Other"].map(c=><option key={c}>{c}</option>)}
        </select>
        <textarea style={{...inpS,height:80}} placeholder="Describe your suggestion..." value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))}/>
        <button style={btnP} onClick={submit}>Submit</button>
      </div>
      {mine.length>0&&(
        <div style={card}>
          <Sec t="MY PREVIOUS SUBMISSIONS"/>
          {mine.map(f=>(
            <div key={f.id} style={{padding:"8px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}><span>{f.msg}</span><Pill status={f.st}/></div>
              <div style={{fontSize:10,color:MUTED,marginTop:3}}>{fmtD(f.d)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ─── FRONT DESK (tablet dashboard, live data) ─────────────────
let DESK_SEQ=100;
let DESK_TICKETS=[];      // open tickets (module-level: survives page switches)
let DESK_DONE=[];         // completed sales this session
let DESK_CHECKED=[];      // appt/booking ids already checked in

const bigBtn={...btnP,padding:"14px 18px",fontSize:15,borderRadius:10};
const bigBtnO={...btnO,padding:"13px 18px",fontSize:14,borderRadius:10};
const nowHM=()=>{const n=new Date();return `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;};

function FrontDeskPage({user}){
  const [,force]=useState(0);
  const rerender=()=>force(x=>x+1);
  const [prods,setProds]=useState([]);
  const [prodsLoaded,setProdsLoaded]=useState(false);
  const [emps,setEmps]=useState([]);
  const [liveAppts,setLiveAppts]=useState([]);
  const [bookings,setBookings]=useState([]);
  const [clocked,setClocked]=useState([]);
  const [dayEarn,setDayEarn]=useState(null);
  const [walkName,setWalkName]=useState("");
  const [walkSvcs,setWalkSvcs]=useState([]);
  const [walkTech,setWalkTech]=useState("");
  const [svcSearch,setSvcSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [tipPct,setTipPct]=useState(null);
  const [tipCustom,setTipCustom]=useState("");
  const [helcim,setHelcim]=useState(null);
  const [okMsg,setOkMsg]=useState("");
  const [reauth,setReauth]=useState(null);

  const loadAll=useCallback(()=>{
    db.from("products").select("*").then(({data})=>{setProds((data||[]).filter(p=>p.active!==false&&(!p.type||/service/i.test(p.type))));setProdsLoaded(true);});
    qraw("employees?select=id,name,role,status&status=eq.active&order=name.asc").then(setEmps);
    qraw("appointments?select=id,service,scheduled_at,status,notes,clients(name),employees(id,name)&status=in.(scheduled,confirmed,pending)&order=scheduled_at.asc&limit=100").then(setLiveAppts);
    qraw("booking_requests?select=*&status=eq.pending&order=created_at.desc&limit=25").then(setBookings);
    qraw(`timeclock?select=employee_name,clock_out&date=eq.${todayStr()}`).then(setClocked);
    qraw(`earnings?select=amount,tip&earned_date=eq.${todayStr()}`).then(rows=>setDayEarn({amt:rows.reduce((s,r)=>s+(parseFloat(r.amount)||0),0),tip:rows.reduce((s,r)=>s+(parseFloat(r.tip)||0),0),count:rows.length}));
  },[]);
  useEffect(()=>{loadAll();const iv=setInterval(loadAll,60000);return()=>clearInterval(iv);},[loadAll]);

  const techs=emps.filter(e=>isTechRole(e.role));
  const clockedIn=clocked.filter(c=>!c.clock_out).map(c=>c.employee_name);
  const busy=DESK_TICKETS.map(t=>t.tech);
  const avail=clockedIn.length?techs.filter(t=>clockedIn.includes(t.name)):techs;
  const freeTechs=avail.filter(t=>!busy.includes(t.name));
  const nextTech=freeTechs[0]||techs[0];
  const empIdByName=n=>{if(!n)return null;const e=emps.find(e=>e.name===n)||emps.find(e=>(e.name||"").toLowerCase().startsWith(String(n).toLowerCase()));return e?e.id:null;};
  const priceOf=name=>{const p=prods.find(p=>(p.name||"").toLowerCase()===String(name||"").toLowerCase())||prods.find(p=>(p.name||"").toLowerCase().includes(String(name||"").toLowerCase()));return p?parseFloat(p.price||0):0;};

  const toggleSvc=p=>setWalkSvcs(s=>s.find(x=>x.id===p.id)?s.filter(x=>x.id!==p.id):[...s,p]);

  const startWalkIn=()=>{
    if(!walkSvcs.length)return;
    DESK_TICKETS=[...DESK_TICKETS,{id:++DESK_SEQ,client:walkName.trim()||"Walk-in",tech:walkTech||(nextTech?nextTech.name:""),items:walkSvcs.map(p=>({name:p.name,price:parseFloat(p.price||0)})),start:nowHM(),src:"walk-in"}];
    setWalkName("");setWalkSvcs([]);setWalkTech("");
    setOkMsg("Service started!");setTimeout(()=>setOkMsg(""),2500);
    rerender();
  };

  // check-in feed: pending website bookings + real appointments
  const tToday=todayStr();
  const apptCards=liveAppts.map(a=>({id:a.id,c:(a.clients&&a.clients.name)||a.notes||"Client",e:(a.employees&&a.employees.name)||"",s:a.service,d:dStrOf(a.scheduled_at),t:hmOf(a.scheduled_at),st:a.status,kind:"appt"})).filter(a=>!DESK_CHECKED.includes(a.id));
  const todays=apptCards.filter(a=>a.d===tToday);
  const upcoming=todays.length?todays:apptCards.slice(-8).reverse();
  const bookingCards=bookings.filter(b=>!DESK_CHECKED.includes(b.id)).map(b=>({id:b.id,c:b.client_name,e:b.technician||"",s:b.service_name,d:b.appt_date,t:(b.appt_time||"").slice(0,5),st:"pending",kind:"booking"}));

  const checkIn=a=>{
    DESK_CHECKED=[...DESK_CHECKED,a.id];
    const tech=techs.find(t=>t.name===a.e)?a.e:(nextTech?nextTech.name:a.e||"");
    DESK_TICKETS=[...DESK_TICKETS,{id:++DESK_SEQ,client:a.c,tech,items:[{name:a.s,price:priceOf(a.s)}],start:nowHM(),src:a.kind==="booking"?"website":"appointment",ref:a}];
    if(a.kind==="booking") db.from("booking_requests").update({status:"confirmed"},{eq:["id",a.id]});
    else db.from("appointments").update({status:"in-service"},{eq:["id",a.id]});
    rerender();
  };

  const ticket=DESK_TICKETS.find(t=>t.id===sel);
  const sub=ticket?ticket.items.reduce((s,i)=>s+(parseFloat(i.price)||0),0):0;
  const supply=getSupplyCharge(sub);
  const tipA=tipPct==="custom"?(parseFloat(tipCustom)||0):tipPct?sub*tipPct/100:0;
  const total=sub+supply+tipA;

  const addItem=p=>{if(!ticket)return;ticket.items=[...ticket.items,{name:p.name,price:parseFloat(p.price||0)}];rerender();};
  const rmItem=i=>{if(!ticket)return;ticket.items=ticket.items.filter((_,x)=>x!==i);rerender();};
  const resetPay=()=>{setTipPct(null);setTipCustom("");setHelcim(null);};
  const selectTicket=id=>{setSel(id===sel?null:id);resetPay();};

  const finalize=async(method)=>{
    if(!ticket)return;
    const empId=empIdByName(ticket.tech);
    await db.from("transactions").insert({employee_id:empId,total:total.toFixed(2),payment_method:method});
    if(empId) await db.from("earnings").insert({employee_id:empId,earned_date:todayStr(),service_name:ticket.items.map(i=>i.name).join(", "),amount:sub.toFixed(2),tip:tipA.toFixed(2),source:"frontdesk"});
    if(ticket.ref&&ticket.ref.kind==="appt") db.from("appointments").update({status:"completed"},{eq:["id",ticket.ref.id]});
    if(ticket.ref&&ticket.ref.kind==="booking") db.from("booking_requests").update({status:"completed"},{eq:["id",ticket.ref.id]});
    DESK_DONE=[...DESK_DONE,{client:ticket.client,tech:ticket.tech,total,tip:tipA,method,at:nowHM()}];
    DESK_TICKETS=DESK_TICKETS.filter(t=>t.id!==ticket.id);
    setSel(null);resetPay();
    setOkMsg(`Payment received — $${total.toFixed(2)} (${method})`);setTimeout(()=>setOkMsg(""),3500);
    loadAll();rerender();
  };

  const chargeCard=async()=>{
    setHelcim("sending");
    try{
      const r=await fetch("/api/terminal-purchase",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:total.toFixed(2)})});
      const d=await r.json().catch(()=>null);
      if(r.ok&&d&&d.ok===true){setHelcim("approved");await finalize("Card (Helcim)");}
      else if(r.status===501||(d&&d.error==="not_configured")){setHelcim("unconfigured");}
      else{setHelcim("failed");}
    }catch(e){setHelcim("failed");}
  };

  const cancelTicket=id=>{const t=DESK_TICKETS.find(x=>x.id===id);if(t&&t.ref){if(t.ref.kind==="appt")db.from("appointments").update({status:"scheduled"},{eq:["id",t.ref.id]});DESK_CHECKED=DESK_CHECKED.filter(x=>x!==t.ref.id);}DESK_TICKETS=DESK_TICKETS.filter(t=>t.id!==id);if(sel===id){setSel(null);resetPay();}rerender();};

  const kpi=(label,val,sub2)=>(
    <div style={{...card,marginBottom:0,textAlign:"center",padding:"14px 10px"}}>
      <div style={{fontSize:10,color:MUTED,letterSpacing:"0.08em",marginBottom:4}}>{label}</div>
      <div style={{fontSize:22,fontWeight:700,color:DARK}}>{val}</div>
      {sub2?<div style={{fontSize:10,color:MUTED,marginTop:2}}>{sub2}</div>:null}
    </div>
  );

  const checkinRow=a=>(
    <div key={a.kind+a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"0.5px solid rgba(0,0,0,0.05)"}}>
      <div style={{minWidth:0}}>
        <div style={{fontSize:14,fontWeight:500}}>{a.c} {a.kind==="booking"&&<span style={{...pill("web","#185FA5","#E6F1FB"),marginLeft:4}}>WEBSITE</span>}</div>
        <div style={{fontSize:11,color:MUTED}}>{a.s} · {a.e||"any tech"} · {a.d!==tToday?fmtMD(a.d)+" · ":""}{fmt12(a.t)} <Pill status={a.st==="scheduled"?"confirmed":a.st}/></div>
      </div>
      <button style={{...bigBtnO,padding:"10px 16px",flexShrink:0}} onClick={()=>checkIn(a)}>Check In</button>
    </div>
  );

  return(
    <div style={{position:"relative"}}>
      {reauth!==null&&<ReAuthModal action="Cancel Ticket" onSuccess={()=>{cancelTicket(reauth);setReauth(null);}} onCancel={()=>setReauth(null)}/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <Ptitle t="Front Desk"/>
        <span style={{fontSize:11,color:MUTED}}>Next available: <strong style={{color:G}}>{freeTechs.length?freeTechs[0].name:"—"}</strong></span>
      </div>
      {okMsg&&<div style={{background:"#EAF3DE",border:"0.5px solid #3B6D11",borderRadius:8,padding:"12px 16px",marginBottom:12,color:"#27500A",fontWeight:600,fontSize:14}}>{okMsg}</div>}

      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:9,marginBottom:14}}>
        {kpi("REVENUE — TODAY",dayEarn?`$${dayEarn.amt.toFixed(2)}`:"…",dayEarn?`${dayEarn.count} services · $${dayEarn.tip.toFixed(2)} tips`:"loading")}
        {kpi("IN SERVICE",DESK_TICKETS.length,"open tickets")}
        {kpi("TO CHECK IN",bookingCards.length+upcoming.length,`${bookingCards.length} from website`)}
        {kpi("FREE TECHS",freeTechs.length,(clockedIn.length?"clocked in: ":"")+ (freeTechs.slice(0,3).map(t=>t.name.split(" ")[0]).join(", ")||"none"))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <div style={{...card,borderColor:"rgba(212,175,55,0.45)"}}>
            <Sec t="WALK-IN — START SERVICE"/>
            <input style={{...inpS,padding:"12px 14px",fontSize:14}} placeholder="Client name (optional)" value={walkName} onChange={e=>setWalkName(e.target.value)}/>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <select style={{...inpS,marginBottom:0,padding:"12px 10px",fontSize:14}} value={walkTech} onChange={e=>setWalkTech(e.target.value)}>
                <option value="">Tech: {nextTech?`${nextTech.name} (next available)`:"—"}</option>
                {techs.map(t=><option key={t.id} value={t.name}>{t.name}{busy.includes(t.name)?" — busy":""}{clockedIn.includes(t.name)?" ⏱":""}</option>)}
              </select>
            </div>
            <div style={{fontSize:10,color:MUTED,marginBottom:6}}>Tap services:</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:12,maxHeight:190,overflowY:"auto"}}>
              {prods.map(p=>{
                const on=!!walkSvcs.find(x=>x.id===p.id);
                return <button key={p.id} onClick={()=>toggleSvc(p)} style={{padding:"10px 13px",borderRadius:20,border:`1px solid ${on?G:"rgba(0,0,0,0.15)"}`,background:on?"rgba(212,175,55,0.15)":"#fff",color:on?BRONZE:DARK,fontSize:13,fontWeight:on?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p.name} · ${parseFloat(p.price||0).toFixed(0)}</button>;
              })}
              {prods.length===0&&<span style={{fontSize:11,color:MUTED}}>{prodsLoaded?"No services found — add them in Supabase → products table.":"Loading services…"}</span>}
            </div>
            <button style={{...bigBtn,width:"100%",opacity:walkSvcs.length?1:0.45}} disabled={!walkSvcs.length} onClick={startWalkIn}>
              Start Service{walkSvcs.length?` — $${walkSvcs.reduce((s,p)=>s+parseFloat(p.price||0),0).toFixed(2)}`:""} →
            </button>
          </div>

          <div style={card}>
            <Sec t="CHECK IN — WEBSITE BOOKINGS & APPOINTMENTS"/>
            {bookingCards.length===0&&upcoming.length===0&&<p style={{color:MUTED,fontSize:12}}>Nothing waiting for check-in.</p>}
            {bookingCards.map(checkinRow)}
            {upcoming.map(checkinRow)}
          </div>
        </div>

        <div>
          <div style={card}>
            <Sec t="IN SERVICE — TAP TO CHECK OUT"/>
            {DESK_TICKETS.length===0&&<p style={{color:MUTED,fontSize:12}}>No open tickets. Start a walk-in or check in an appointment.</p>}
            {DESK_TICKETS.map(t=>(
              <div key={t.id} onClick={()=>selectTicket(t.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 12px",marginBottom:7,borderRadius:10,cursor:"pointer",border:`1.5px solid ${sel===t.id?G:"rgba(0,0,0,0.08)"}`,background:sel===t.id?"rgba(212,175,55,0.08)":"#fff"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600}}>{t.client}</div>
                  <div style={{fontSize:11,color:MUTED}}>{t.items.map(i=>i.name).join(", ")} · {t.tech} · since {fmt12(t.start)}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,fontWeight:700,color:G}}>${t.items.reduce((s,i)=>s+(parseFloat(i.price)||0),0).toFixed(2)}</div>
                  <div style={{fontSize:10,color:MUTED}}>{t.src}</div>
                </div>
              </div>
            ))}
          </div>

          {ticket&&(
            <div style={{...card,borderColor:G,borderWidth:1.5}}>
              <Sec t={`CHECKOUT — ${ticket.client.toUpperCase()} (${ticket.tech})`}/>
              {ticket.items.map((i,x)=>(
                <div key={x} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"0.5px solid rgba(0,0,0,0.05)"}}>
                  <span style={{fontSize:13}}>{i.name}</span>
                  <span style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontWeight:600}}>${(parseFloat(i.price)||0).toFixed(2)}</span>
                    <button onClick={()=>rmItem(x)} style={{background:"none",border:"none",color:"#A32D2D",cursor:"pointer",fontSize:18,padding:"0 4px"}}>×</button>
                  </span>
                </div>
              ))}
              <input style={{...inpS,marginTop:8}} placeholder="+ Add service…" value={svcSearch} onChange={e=>setSvcSearch(e.target.value)}/>
              {svcSearch&&(
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  {prods.filter(p=>(p.name||"").toLowerCase().includes(svcSearch.toLowerCase())).slice(0,6).map(p=><button key={p.id} onClick={()=>{addItem(p);setSvcSearch("");}} style={{padding:"8px 12px",borderRadius:16,border:"1px solid rgba(0,0,0,0.15)",background:"#fff",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{p.name} · ${parseFloat(p.price||0).toFixed(0)}</button>)}
                </div>
              )}
              <div style={{fontSize:12,color:MUTED,display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
              <div style={{fontSize:12,color:MUTED,display:"flex",justifyContent:"space-between",padding:"2px 0 8px"}}><span>Supply charge</span><span>${supply.toFixed(2)}</span></div>
              <div style={{fontSize:11,color:MUTED,marginBottom:5}}>Tip:</div>
              <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap"}}>
                {[18,20,25].map(p=>(
                  <button key={p} onClick={()=>{setTipPct(p);setTipCustom("");}} style={{flex:1,minWidth:64,padding:"12px 6px",borderRadius:9,border:`1.5px solid ${tipPct===p?G:"rgba(0,0,0,0.13)"}`,background:tipPct===p?"rgba(212,175,55,0.14)":"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{p}%<div style={{fontSize:10,fontWeight:400,color:MUTED}}>${(sub*p/100).toFixed(2)}</div></button>
                ))}
                <button onClick={()=>setTipPct(0)} style={{flex:1,minWidth:56,padding:"12px 6px",borderRadius:9,border:`1.5px solid ${tipPct===0?G:"rgba(0,0,0,0.13)"}`,background:tipPct===0?"rgba(212,175,55,0.14)":"#fff",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>No tip</button>
                <input style={{...inpS,marginBottom:0,width:90,padding:"10px"}} type="number" placeholder="Custom $" value={tipCustom} onChange={e=>{setTipCustom(e.target.value);setTipPct("custom");}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderTop:"1px solid rgba(0,0,0,0.1)",marginBottom:10}}>
                <span style={{fontSize:15,fontWeight:600}}>TOTAL</span>
                <span style={{fontSize:24,fontWeight:800,color:G}}>${total.toFixed(2)}</span>
              </div>
              {helcim==="sending"&&<div style={{background:"#FAEEDA",border:"0.5px solid #854F0B",borderRadius:8,padding:"11px 14px",fontSize:13,color:"#854F0B",marginBottom:9,fontWeight:500}}>Sending ${total.toFixed(2)} to Helcim terminal… ask client to tap/insert card.</div>}
              {helcim==="unconfigured"&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:8,padding:"11px 14px",fontSize:12,color:"#A32D2D",marginBottom:9}}>Helcim terminal not connected yet (API token missing). Take the card on the terminal manually, then record it: <button onClick={()=>finalize("Card")} style={{...btnP,padding:"7px 12px",marginLeft:6}}>Record Card Sale</button></div>}
              {helcim==="failed"&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:8,padding:"11px 14px",fontSize:12,color:"#A32D2D",marginBottom:9}}>Terminal error / declined. Retry or record manually: <button onClick={()=>finalize("Card")} style={{...btnP,padding:"7px 12px",marginLeft:6}}>Record Card Sale</button></div>}
              <div style={{display:"flex",gap:9}}>
                <button style={{...bigBtn,flex:1.4,opacity:helcim==="sending"?0.5:1}} disabled={helcim==="sending"} onClick={chargeCard}>💳 Card — Terminal</button>
                <button style={{...bigBtnO,flex:1}} onClick={()=>finalize("Cash")}>Cash</button>
                <button style={{...btnD,padding:"13px 14px",borderRadius:10}} onClick={()=>setReauth(ticket.id)}>Cancel</button>
              </div>
            </div>
          )}

          {DESK_DONE.length>0&&(
            <div style={card}>
              <Sec t="COMPLETED TODAY (THIS DEVICE)"/>
              {DESK_DONE.slice().reverse().map((d,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)",fontSize:12}}>
                  <span>{d.client} <span style={{color:MUTED}}>· {d.tech} · {fmt12(d.at)} · {d.method}</span></span>
                  <span style={{fontWeight:600,color:G}}>${d.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT PORTAL ────────────────────────────────────────────
function ClientHome({user}){
  const [appts,setAppts]=useState([]);
  const [books,setBooks]=useState([]);
  const load=useCallback(()=>{
    if(user.id) qraw(`appointments?select=id,service,scheduled_at,status,employees(name)&client_id=eq.${user.id}&order=scheduled_at.desc&limit=60`).then(setAppts);
    qraw(`booking_requests?select=*&client_email=eq.${encodeURIComponent((user.email||"").toLowerCase())}&order=created_at.desc&limit=30`).then(setBooks);
  },[user]);
  useEffect(()=>{load();},[load]);

  const now=new Date();
  const items=[
    ...books.filter(b=>b.status==="pending"||b.status==="confirmed").map(b=>({key:"b"+b.id,s:b.service_name,d:b.appt_date,t:(b.appt_time||"").slice(0,5),who:b.technician||"any technician",st:b.status,kind:"request"})),
    ...appts.map(a=>({key:"a"+a.id,s:a.service,d:dStrOf(a.scheduled_at),t:hmOf(a.scheduled_at),who:(a.employees&&a.employees.name)||"—",st:a.status==="scheduled"?"confirmed":a.status,kind:"appt",past:new Date(a.scheduled_at)<now||a.status==="completed"})),
  ];
  const upcoming=items.filter(i=>!i.past&&i.st!=="completed"&&i.st!=="cancelled");
  const history=items.filter(i=>i.past||i.st==="completed");

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div>
          <div style={{fontSize:18,fontWeight:400,color:DARK}}>Welcome, {user.nick}</div>
          <div style={{fontSize:11,color:MUTED}}>{user.email}</div>
        </div>
      </div>
      <div style={{...card,borderColor:"rgba(212,175,55,0.4)"}}>
        <Sec t="UPCOMING"/>
        {upcoming.length===0&&<p style={{color:MUTED,fontSize:12}}>No upcoming appointments — book one from the Book Appointment tab.</p>}
        {upcoming.map(i=>(
          <div key={i.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"0.5px solid rgba(0,0,0,0.05)",gap:8,flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:14,fontWeight:500}}>{i.s}</div>
              <div style={{fontSize:11,color:MUTED}}>{fmtMD(i.d)}, {fmtY(i.d)} · {fmt12(i.t)} · {i.who} <Pill status={i.st}/></div>
            </div>
            <a href={gcalUrl(`InStyle Nail Bar — ${i.s}`,i.d,i.t,60,`Your ${i.s} appointment at InStyle Nail Bar.`)} target="_blank" rel="noreferrer" style={{...btnO,textDecoration:"none",display:"inline-block",fontSize:11,padding:"8px 12px"}}>📅 Add to Google Calendar</a>
          </div>
        ))}
      </div>
      {history.length>0&&(
        <div style={card}>
          <Sec t="HISTORY"/>
          {history.slice(0,10).map(i=>(
            <div key={i.key} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid rgba(0,0,0,0.04)",fontSize:12}}>
              <span>{i.s} <span style={{color:MUTED}}>· {i.who}</span></span>
              <span style={{color:MUTED}}>{fmtMD(i.d)}, {fmtY(i.d)}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{...card,background:IVORY}}>
        <div style={{fontSize:11,color:MUTED,lineHeight:1.6}}>Confirmations and reminders arrive by <strong>email</strong> and <strong>Google Calendar</strong> — we never call or text. Questions? Call us at (571) 992-4006.</div>
      </div>
    </div>
  );
}

function ClientBook({user,go}){
  const [prods,setProds]=useState([]);
  const [svc,setSvc]=useState(null);
  const [d,setD]=useState(todayStr());
  const [t,setT]=useState("10:00");
  const [ok,setOk]=useState(null);
  const [err,setErr]=useState("");
  const [saving,setSaving]=useState(false);
  useEffect(()=>{db.from("products").select("*").then(({data})=>setProds((data||[]).filter(p=>p.active!==false&&(!p.type||/service/i.test(p.type)))));},[]);
  const times=["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"];

  const submit=async()=>{
    if(!svc){setErr("Please choose a service.");return;}
    if(!d||d<todayStr()){setErr("Please choose a date from today onward.");return;}
    setSaving(true);setErr("");
    const {error}=await db.from("booking_requests").insert({client_name:user.fn,client_phone:user.phone||"",client_email:(user.email||"").toLowerCase(),service_name:svc.name,service_id:svc.id||null,appt_date:d,appt_time:t+":00",status:"pending",source:"portal"});
    setSaving(false);
    if(error){setErr("Could not send your booking — please try again.");return;}
    notifyBooking({email:user.email,name:user.fn,service:svc.name,date:d,time:t,durMin:svc.duration||60});
    setOk({svc:svc.name,d,t});
  };

  if(ok) return(
    <div>
      <Ptitle t="Booking Received!"/>
      <div style={{...card,borderColor:"#3B6D11"}}>
        <div style={{fontSize:14,fontWeight:600,color:"#27500A",marginBottom:6}}>✓ {ok.svc}</div>
        <div style={{fontSize:12,color:MUTED,marginBottom:14}}>{fmtMD(ok.d)}, {fmtY(ok.d)} · {fmt12(ok.t)} — we'll confirm shortly. A confirmation email is on its way.</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <a href={gcalUrl(`InStyle Nail Bar — ${ok.svc}`,ok.d,ok.t,60,"Your appointment at InStyle Nail Bar.")} target="_blank" rel="noreferrer" style={{...btnP,textDecoration:"none",display:"inline-block"}}>📅 Add to Google Calendar</a>
          <button style={btnO} onClick={()=>{setOk(null);setSvc(null);go&&go();}}>View My Appointments</button>
        </div>
      </div>
    </div>
  );

  return(
    <div>
      <Ptitle t="Book Appointment"/>
      {err&&<div style={{background:"#FCEBEB",border:"0.5px solid #F09595",borderRadius:7,padding:"9px 12px",fontSize:11,color:"#A32D2D",marginBottom:10}}>{err}</div>}
      <div style={card}>
        <Sec t="1 · CHOOSE SERVICE"/>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {prods.map(p=>{
            const on=svc&&svc.id===p.id;
            return <button key={p.id} onClick={()=>setSvc(p)} style={{padding:"11px 14px",borderRadius:20,border:`1px solid ${on?G:"rgba(0,0,0,0.15)"}`,background:on?"rgba(212,175,55,0.15)":"#fff",color:on?BRONZE:DARK,fontSize:13,fontWeight:on?600:400,cursor:"pointer",fontFamily:"inherit"}}>{p.name} · ${parseFloat(p.price||0).toFixed(0)}</button>;
          })}
          {prods.length===0&&<span style={{fontSize:11,color:MUTED}}>Loading services…</span>}
        </div>
      </div>
      <div style={card}>
        <Sec t="2 · PICK DATE & TIME"/>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <div><label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Date</label>
          <input type="date" style={{...inpS,width:170,marginBottom:0}} min={todayStr()} value={d} onChange={e=>setD(e.target.value)}/></div>
          <div><label style={{fontSize:10,color:MUTED,display:"block",marginBottom:3}}>Time</label>
          <select style={{...inpS,width:140,marginBottom:0}} value={t} onChange={e=>setT(e.target.value)}>
            {times.map(x=><option key={x} value={x}>{fmt12(x)}</option>)}
          </select></div>
        </div>
      </div>
      <button style={{...btnP,width:"100%",padding:"13px",fontSize:14,opacity:svc?1:0.5}} disabled={!svc||saving} onClick={submit}>
        {saving?"Sending…":`Request Booking${svc?` — ${svc.name}`:""} →`}
      </button>
      <div style={{fontSize:10,color:MUTED,marginTop:10,textAlign:"center"}}>You'll get an email confirmation and can add it to Google Calendar. No calls or texts.</div>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────
function MobileNav({nav,page,setPage,user,onSignOut}){
  const [open,setOpen]=useState(false);
  const prim=(MOBILE_PRIMARY[user.role]||[]).map(id=>nav.find(n=>n.id===id)).filter(Boolean);
  const go=id=>{setPage(id);setOpen(false);window.scrollTo(0,0);};
  const tabBtn=(key,label,active,onClick)=>(
    <button key={key} onClick={onClick} style={{flex:1,background:"none",border:"none",padding:"10px 2px 8px",cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:0}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:active?G:"transparent",transition:"background 0.15s"}}/>
      <span style={{fontSize:10,letterSpacing:"0.04em",fontWeight:active?600:400,color:active?G:"rgba(255,255,255,0.45)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{label}</span>
    </button>
  );
  return(<>
    {open&&(
      <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(26,24,20,0.55)",zIndex:60}}>
        <div onClick={e=>e.stopPropagation()} style={{position:"absolute",left:0,right:0,bottom:0,background:DARK,borderRadius:"16px 16px 0 0",padding:"14px 14px calc(78px + env(safe-area-inset-bottom))",maxHeight:"75vh",overflowY:"auto"}}>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.2)",margin:"0 auto 10px"}}/>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 2px 12px"}}>
            <Av name={user.nick} size={30}/>
            <div>
              <div style={{fontSize:12,fontWeight:500,color:"rgba(255,255,255,0.85)"}}>{user.nick}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{user.role} · {user.email}</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {nav.map(n=>(
              <button key={n.id} onClick={()=>go(n.id)} style={{textAlign:"left",padding:"12px",borderRadius:9,border:`0.5px solid ${page===n.id?"rgba(212,175,55,0.5)":"rgba(255,255,255,0.08)"}`,background:page===n.id?"rgba(212,175,55,0.12)":"rgba(255,255,255,0.03)",color:page===n.id?G:"rgba(255,255,255,0.75)",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{n.l}</button>
            ))}
          </div>
          <button onClick={onSignOut} style={{marginTop:12,width:"100%",padding:"12px",borderRadius:9,border:"0.5px solid rgba(240,149,149,0.35)",background:"transparent",color:"#F09595",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Sign Out</button>
        </div>
      </div>
    )}
    <nav className="os-bottomnav" style={{position:"fixed",left:0,right:0,bottom:0,zIndex:65,background:DARK,borderTop:"1px solid rgba(212,175,55,0.18)",paddingBottom:"env(safe-area-inset-bottom)"}}>
      {prim.map(n=>tabBtn(n.id,n.s||n.l,page===n.id&&!open,()=>go(n.id)))}
      {tabBtn("__more","More ≡",open,()=>setOpen(o=>!o))}
    </nav>
  </>);
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [page,setPage]=useState(null);

  const handleLogin=u=>{
    setUser(u);
    setPage(u.role==="Owner"?"dash":u.role==="Manager"?"staff":u.role==="FrontDesk"?"frontdesk":u.role==="Client"?"client_home":"my_dash");
  };

  if(!user) return <Login onLogin={handleLogin}/>;

  const nav=NAV[user.role]||[];
  const rp=user.role==="Owner"?"#3C3489":user.role==="Manager"?"#854F0B":user.role==="FrontDesk"?"#0E6E6E":user.role==="Client"?"#185FA5":"#3B6D11";
  const rb=user.role==="Owner"?"#EEEDFE":user.role==="Manager"?"#FAEEDA":user.role==="FrontDesk"?"#DFF3F3":user.role==="Client"?"#E6F1FB":"#EAF3DE";

  const PAGES={
    dash:       <DashPage/>,
    frontdesk:  <FrontDeskPage user={user}/>,
    client_home:<ClientHome user={user}/>,
    client_book:<ClientBook user={user} go={()=>setPage("client_home")}/>,
    revenue:    <RevenuePage/>,
    schedule:   <SchedulePage/>,
    employees:  <EmployeesPage/>,
    clients:    <ClientsPage/>,
    appts:      <ApptsPage/>,
    pos:        <POSPage user={user}/>,
    payroll:    <PayrollPage/>,
    reports:    <ReportsPage/>,
    feedback:   <FeedbackPage/>,
    audit:      <AuditPage/>,
    safety:     <SafetyPage/>,
    giftcards:  <GiftCardsPage/>,
    queue:      <QueuePage user={user}/>,
    staff:      <StaffOverviewPage/>,
    leave:      <LeavePage/>,
    my_dash:    <MyDash user={user}/>,
    my_sched:   <MySched user={user}/>,
    my_queue:   <MyQueuePos user={user}/>,
    my_fb:      <MyFb user={user}/>,
    my_leave:   <MyLeave user={user}/>,
    my_imp:     <MyImp user={user}/>,
  };

  return(
    <div style={{display:"flex",minHeight:"100vh",background:IVORY,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
      <div className="os-sidebar" style={{width:200,minWidth:200,background:DARK,display:"flex",flexDirection:"column",position:"fixed",top:0,bottom:0,left:0,overflowY:"auto"}}>
        <div style={{padding:"18px 16px 12px",borderBottom:"1px solid rgba(212,175,55,0.1)"}}>
          <div style={{fontSize:13,fontWeight:300,color:G,letterSpacing:"0.2em"}}>INSTYLE</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.12em",marginTop:3}}>BEAUTY LOUNGE OS</div>
        </div>
        <div style={{padding:"10px 16px",borderBottom:"1px solid rgba(212,175,55,0.07)",display:"flex",alignItems:"center",gap:8}}>
          <Av name={user.nick} size={28}/>
          <div>
            <div style={{fontSize:11,fontWeight:500,color:"rgba(255,255,255,0.8)"}}>{user.nick}</div>
            <div style={{marginTop:2}}><span style={{...pill(user.role,rp,rb)}}>{user.role}</span></div>
          </div>
        </div>
        <nav style={{flex:1,padding:"6px 0"}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 16px",border:"none",background:page===n.id?"rgba(212,175,55,0.1)":"transparent",color:page===n.id?G:"rgba(255,255,255,0.35)",fontSize:11,cursor:"pointer",borderLeft:`2px solid ${page===n.id?G:"transparent"}`,transition:"all 0.1s",fontWeight:page===n.id?500:400,fontFamily:"inherit",letterSpacing:"0.03em"}}>
              {n.l}
            </button>
          ))}
        </nav>
        <div style={{padding:"10px 16px",borderTop:"1px solid rgba(212,175,55,0.07)"}}>
          <button onClick={()=>setUser(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.25)",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>← Sign Out</button>
        </div>
      </div>
      <div className="os-main" style={{marginLeft:200,flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <div className="os-topbar" style={{background:"#fff",borderBottom:"0.5px solid rgba(212,175,55,0.12)",padding:"9px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:11,fontWeight:500,color:DARK,letterSpacing:"0.05em"}}>INSTYLE NAIL BAR</div>
            <div style={{fontSize:10,color:MUTED,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>980 Maine Ave SW, Washington DC · {user.fn}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
            <span className="os-email" style={{fontSize:10,color:MUTED}}>{user.email}</span>
            <Av name={user.nick} size={28}/>
          </div>
        </div>
        <div className="os-content" style={{flex:1,padding:"24px 28px 60px",maxWidth:1100}}>
          {PAGES[page]||<DashPage/>}
        </div>
      </div>
      <MobileNav nav={nav} page={page} setPage={setPage} user={user} onSignOut={()=>setUser(null)}/>
    </div>
  );
}