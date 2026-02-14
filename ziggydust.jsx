import { useState, useEffect } from "react";

const P = {
  bg:"#F5F0E8",cream:"#F5F0E8",warm:"#EDE6D8",sand:"#D9CFC0",
  ink:"#1A1814",inkSoft:"#3D3832",inkMid:"#6B6358",inkLight:"#9A9285",
  amber:"#C8762D",amberLight:"#E8A654",amberFaint:"#F5E6D0",
  red:"#C44B3F",redFaint:"#FCEAE8",green:"#3A7D5C",greenFaint:"#E5F2EC",
  violet:"#6B5CA5",white:"#fff",
};
const CURRENCIES = {
  USD: { symbol:"$", locale:"en-US", rate:1 },
  INR: { symbol:"₹", locale:"en-IN", rate:85 },
};
let _cur = "USD";
const fmt = n => {
  const c = CURRENCIES[_cur] || CURRENCIES.USD;
  const v = Number(n) * c.rate;
  return `${c.symbol}${v.toLocaleString(c.locale, {maximumFractionDigits:0})}`;
};
const csym = () => CURRENCIES[_cur]?.symbol || "$";

const CAMPS = [
  { id:"ZD-001",name:"Midnight Raga",artist:"Priya Sharma",contentTitle:"Midnight Raga (Official Video)",videoId:"dQw4w9WgXcQ",status:"active",totalBudget:150000,artistCoPay:30000,backerGoal:120000,backerFunded:95000,minTicket:10000,revSharePct:30,cap:1.8,tenorMonths:6,baselineDaily:850,currentDaily:2340,totalRevenue:42500,totalSettled:12750,daysActive:34,adSpent:78000,
    rd:[850,890,920,870,1100,1450,1800,2100,2340,2200,2500,2800,2340,2600,2750],
    backers:[{name:"Arjun Mehta",amount:50000,returned:6800,linkedin:"https://linkedin.com/in/arjunmehta",headline:"Angel Investor · Music Tech",campaigns:3,totalBacked:175000,avgReturn:1.4},{name:"Neha Kapoor",amount:25000,returned:3400,linkedin:"https://linkedin.com/in/nehakapoor",headline:"Producer at Sony Music India",campaigns:1,totalBacked:25000,avgReturn:0},{name:"Rahul Prasad",amount:20000,returned:2550,linkedin:"https://linkedin.com/in/rahulprasad",headline:"Musician · Tabla Player",campaigns:2,totalBacked:55000,avgReturn:1.2}],
    settlements:[{month:"Jan 2026",revenue:28500,baseline:25500,uplift:3000,share:900,status:"paid"},{month:"Feb 2026",revenue:42500,baseline:25500,uplift:17000,share:5100,status:"pending"}],
    genre:"Indie / Classical Fusion",tagline:"where tradition meets the tremolo",artistLinkedin:"https://linkedin.com/in/priyasharmamusic",artistHeadline:"Independent Artist · Classical-Electronic Fusion",
    yt:{subscribers:12400,totalViews:890000,channelAge:"3 years",monthlyViews:145000,verified:true},artistTrack:{campaigns:1,totalRaised:95000,paybackRate:100,avgUplift:175},
    adReceipts:[{date:"Jan 5",type:"Pre-Roll",spend:18000,impressions:245000,views:82000,ctr:"3.4%",ref:"INV-88291"},{date:"Jan 12",type:"Discovery",spend:22000,impressions:310000,views:104000,ctr:"3.1%",ref:"INV-88445"},{date:"Jan 20",type:"Pre-Roll",spend:20000,impressions:278000,views:91000,ctr:"3.3%",ref:"INV-88612"},{date:"Feb 2",type:"Shorts",spend:18000,impressions:520000,views:156000,ctr:"2.8%",ref:"INV-88890"}],
  },
  { id:"ZD-002",name:"Concrete Dreams",artist:"MC Vikram",contentTitle:"Concrete Dreams (Official Music Video)",videoId:"abc123",status:"funding",totalBudget:200000,artistCoPay:50000,backerGoal:150000,backerFunded:67000,minTicket:20000,revSharePct:25,cap:2.0,tenorMonths:8,baselineDaily:1200,currentDaily:1200,totalRevenue:0,totalSettled:0,daysActive:0,adSpent:0,
    rd:[1200,1180,1220,1190,1210,1200,1230,1200],
    backers:[{name:"Suresh Tiwari",amount:40000,returned:0,linkedin:"https://linkedin.com/in/sureshtiwari",headline:"Founder, BeatVault Studios",campaigns:5,totalBacked:320000,avgReturn:1.6},{name:"Anita Verma",amount:27000,returned:0,linkedin:"https://linkedin.com/in/anitaverma",headline:"Music Journalist · Rolling Stone",campaigns:2,totalBacked:52000,avgReturn:1.3}],
    settlements:[],genre:"Hip-Hop",tagline:"bars from the building site",artistLinkedin:"https://linkedin.com/in/mcvikram",artistHeadline:"MC · Songwriter · Delhi Underground",
    yt:{subscribers:34200,totalViews:2800000,channelAge:"5 years",monthlyViews:380000,verified:true},artistTrack:{campaigns:0,totalRaised:0,paybackRate:0,avgUplift:0},adReceipts:[],
  },
  { id:"ZD-003",name:"Tidal",artist:"Aasha",contentTitle:"Tidal (Lyric Video)",videoId:"xyz789",status:"funding",totalBudget:80000,artistCoPay:20000,backerGoal:60000,backerFunded:18000,minTicket:5000,revSharePct:35,cap:1.5,tenorMonths:4,baselineDaily:420,currentDaily:420,totalRevenue:0,totalSettled:0,daysActive:0,adSpent:0,
    rd:[420,430,410,425,440,420],
    backers:[{name:"Dev Raghavan",amount:18000,returned:0,linkedin:"https://linkedin.com/in/devraghavan",headline:"Sound Engineer · Independent",campaigns:1,totalBacked:18000,avgReturn:0}],
    settlements:[],genre:"Electronic / Ambient",tagline:"sound between the silences",artistLinkedin:"https://linkedin.com/in/aashamusic",artistHeadline:"Electronic Producer · Ambient Sound Designer",
    yt:{subscribers:2800,totalViews:120000,channelAge:"1 year",monthlyViews:18000,verified:true},artistTrack:{campaigns:0,totalRaised:0,paybackRate:0,avgUplift:0},adReceipts:[],
  },
];

const Badge = ({status}) => {
  const m={active:{bg:P.ink,c:P.cream,t:"⚡ LIVE"},funding:{bg:P.amber,c:P.white,t:"◉ SEEKING BACKERS"},pending:{bg:P.amberFaint,c:P.amber,t:"PENDING"},paid:{bg:P.greenFaint,c:P.green,t:"✓ PAID"},overdue:{bg:P.redFaint,c:P.red,t:"OVERDUE"}};
  const s=m[status]||m.pending;
  return <span style={{display:"inline-block",padding:"4px 12px",fontFamily:"monospace",fontSize:10,fontWeight:600,letterSpacing:".08em",background:s.bg,color:s.c}}>{s.t}</span>;
};
const Bar = ({value,max,color=P.ink,h=8}) => <div style={{height:h,background:P.sand,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min((value/max)*100,100)}%`,background:color,transition:"width .6s ease"}}/></div>;
const Spark = ({data,w=200,h=50,color=P.ink}) => {
  if(!data||data.length<2) return null;
  const mn=Math.min(...data)*.9,mx=Math.max(...data)*1.05,rng=mx-mn||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-mn)/rng)*(h-6)-3}`);
  return <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{display:"block"}}><polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/></svg>;
};
const LiIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill={P.ink}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const M = ({children,s}) => <span style={{fontFamily:"monospace",...s}}>{children}</span>;
const TH = ({children}) => <th style={{textAlign:"left",padding:"10px 16px",fontFamily:"monospace",fontSize:9,fontWeight:600,color:P.inkLight,textTransform:"uppercase",letterSpacing:".1em",borderBottom:`1px solid ${P.sand}`}}>{children}</th>;
const TD = ({children,s}) => <td style={{padding:"10px 16px",fontSize:12,borderBottom:`1px solid ${P.sand}`,...s}}>{children}</td>;
const Hdr = ({children,right}) => <div style={{padding:"14px 24px",borderBottom:`1.5px solid ${P.ink}`,background:P.warm,display:"flex",justifyContent:"space-between",alignItems:"center"}}><M s={{fontSize:11,fontWeight:600,color:P.ink,textTransform:"uppercase",letterSpacing:".08em"}}>{children}</M>{right&&<M s={{fontSize:10,color:P.inkLight}}>{right}</M>}</div>;
const Init = ({name,sz=40}) => <div style={{width:sz,height:sz,background:P.ink,color:P.cream,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:sz*.32,fontWeight:600,flexShrink:0}}>{name.split(" ").map(w=>w[0]).join("")}</div>;

const Sidebar = ({view,setView,role,setRole,cur,setCur}) => {
  const nav=[{id:"dash",n:"01",l:"Home"},{id:"camps",n:"02",l:"Drops"},{id:"create",n:"03",l:"New Drop"},{id:"agree",n:"04",l:"The Deal"},{id:"settle",n:"05",l:"Payouts"}];
  return <div style={{width:220,background:P.cream,borderRight:`2px solid ${P.ink}`,position:"fixed",top:0,left:0,bottom:0,display:"flex",flexDirection:"column",zIndex:100}}>
    <div style={{padding:"24px 20px 20px",borderBottom:`2px solid ${P.ink}`}}>
      <div style={{fontSize:28,color:P.ink,lineHeight:.9,letterSpacing:"-.03em",fontWeight:700}}>ziggy<br/><span style={{color:P.amber}}>dust</span></div>
      <M s={{fontSize:8,color:P.inkMid,textTransform:"uppercase",letterSpacing:".2em",marginTop:8,display:"block"}}>back your artiste</M>
      <M s={{fontSize:8,color:P.inkLight,letterSpacing:".15em",marginTop:2,display:"block"}}>back your music</M>
    </div>
    <div style={{padding:"14px 16px",borderBottom:`2px solid ${P.ink}`}}>
      <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8,display:"block"}}>Viewing as</M>
      <div style={{display:"flex"}}>{["artist","backer","platform"].map((r,i)=><button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:"7px 0",border:`1.5px solid ${P.ink}`,borderLeft:i===0?undefined:"none",background:role===r?P.ink:"transparent",color:role===r?P.cream:P.ink,fontFamily:"monospace",fontSize:9,fontWeight:600,textTransform:"uppercase",cursor:"pointer"}}>{r}</button>)}</div>
      <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".12em",marginTop:12,marginBottom:6,display:"block"}}>Currency</M>
      <div style={{display:"flex"}}>{["USD","INR"].map((c,i)=><button key={c} onClick={()=>setCur(c)} style={{flex:1,padding:"7px 0",border:`1.5px solid ${P.ink}`,borderLeft:i===0?undefined:"none",background:cur===c?P.ink:"transparent",color:cur===c?P.cream:P.ink,fontFamily:"monospace",fontSize:9,fontWeight:600,textTransform:"uppercase",cursor:"pointer"}}>{CURRENCIES[c].symbol} {c}</button>)}</div>
    </div>
    <nav style={{padding:"12px 0",flex:1}}>{nav.map(n=><button key={n.id} onClick={()=>setView(n.id)} style={{display:"flex",alignItems:"center",width:"100%",padding:"11px 20px",background:view===n.id?P.ink:"transparent",border:"none",borderBottom:`1px solid ${view===n.id?P.ink:P.sand}`,cursor:"pointer",textAlign:"left"}}>
      <M s={{fontSize:10,color:view===n.id?P.amber:P.inkLight,marginRight:12,minWidth:18}}>{n.n}</M>
      <span style={{fontSize:14,fontWeight:view===n.id?600:400,color:view===n.id?P.cream:P.ink}}>{n.l}</span>
      {view===n.id&&<M s={{marginLeft:"auto",fontSize:14,color:P.amber}}>→</M>}
    </button>)}</nav>
    <div style={{padding:"16px 20px",borderTop:`2px solid ${P.ink}`}}><M s={{fontSize:8,color:P.inkLight,letterSpacing:".1em",textTransform:"uppercase"}}>Experimental · v0.1</M></div>
  </div>;
};

const Dashboard = ({cs,go,pick}) => {
  const ac=cs.filter(c=>c.status==="active").length;
  return <div>
    <div style={{overflow:"hidden",borderBottom:`1px solid ${P.ink}`,padding:"8px 0",background:P.ink,color:P.cream,whiteSpace:"nowrap"}}><M s={{fontSize:11,letterSpacing:".15em",textTransform:"uppercase"}}>{"ziggy dust · back your artiste · youtube · escrow-controlled · revenue-linked · indie music deserves a push · ".repeat(3)}</M></div>
    <div style={{padding:"48px 48px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48}}>
        <div>
          <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:8}}>Dashboard</M>
          <h1 style={{fontSize:48,color:P.ink,lineHeight:.95,letterSpacing:"-.03em",fontWeight:700,fontStyle:"normal"}}>Back your<br/>artiste.<br/><em style={{color:P.amber}}>Push their sound.</em></h1>
        </div>
        <div style={{textAlign:"right",paddingBottom:8}}>
          <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:4}}>Total funded</M>
          <div style={{fontSize:38,fontWeight:700,color:P.ink}}>{fmt(cs.reduce((s,c)=>s+c.backerFunded,0))}</div>
          <M s={{fontSize:11,color:P.inkLight,display:"block",marginTop:4}}>across {cs.length} drops</M>
        </div>
      </div>
      <div style={{display:"flex",borderTop:`2px solid ${P.ink}`,borderBottom:`2px solid ${P.ink}`,marginBottom:48}}>
        {[{l:"Active",v:ac,s:"drops live"},{l:"Backers",v:cs.reduce((s,c)=>s+c.backers.length,0),s:"people"},{l:"Ad Spend",v:fmt(cs.reduce((s,c)=>s+c.adSpent,0)),s:"deployed"},{l:"Revenue",v:fmt(cs.reduce((s,c)=>s+c.totalRevenue,0)),s:"earned"}].map((s,i)=><div key={i} style={{flex:1,padding:"20px 24px",borderRight:i<3?`1px solid ${P.sand}`:undefined}}>
          <M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",letterSpacing:".12em",display:"block",marginBottom:8}}>{s.l}</M>
          <div style={{fontSize:28,fontWeight:700,color:P.ink}}>{s.v}</div>
          <M s={{fontSize:10,color:P.inkMid,display:"block",marginTop:4}}>{s.s}</M>
        </div>)}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <span style={{fontSize:24,fontWeight:700,color:P.ink}}>Now Playing</span>
        <button onClick={()=>go("camps")} style={{padding:"6px 16px",border:`1.5px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:11,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>All drops →</button>
      </div>
      {cs.map((c,i)=>{
        const fp=Math.round((c.backerFunded/c.backerGoal)*100);
        const up=c.baselineDaily>0?Math.round(((c.currentDaily-c.baselineDaily)/c.baselineDaily)*100):0;
        return <div key={c.id} onClick={()=>{pick(c);go("detail");}} style={{border:`2px solid ${P.ink}`,marginBottom:20,cursor:"pointer",background:P.white,transform:`rotate(${[-0.5,0.3,-0.2][i]}deg)`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:`1.5px solid ${P.ink}`,background:i===0?P.ink:P.warm}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}><M s={{fontSize:11,color:i===0?P.amber:P.inkMid,fontWeight:600}}>{c.id}</M><Badge status={c.status}/></div>
            <M s={{fontSize:10,color:i===0?P.cream+"90":P.inkLight}}>{c.genre}</M>
          </div>
          <div style={{display:"flex"}}>
            <div style={{flex:1,padding:"20px 24px",borderRight:`1.5px solid ${P.ink}`}}>
              <div style={{fontSize:30,fontWeight:700,color:P.ink,lineHeight:1,marginBottom:4}}>{c.name}</div>
              <div style={{fontSize:14,color:P.inkMid,marginBottom:4}}>{c.artist}</div>
              <div style={{fontSize:14,color:P.inkLight,fontStyle:"italic",marginBottom:16}}>"{c.tagline}"</div>
              <div style={{display:"flex",gap:24,marginBottom:16}}>
                {[["Goal",fmt(c.backerGoal)],["Funded",fmt(c.backerFunded)],["Min Ticket",fmt(c.minTicket)],["Share",c.revSharePct+"%"],["Cap",c.cap+"x"]].map(([l,v],j)=><div key={j}><M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",letterSpacing:".1em",display:"block"}}>{l}</M><M s={{fontSize:15,fontWeight:600,color:P.ink}}>{v}</M></div>)}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><M s={{fontSize:10,color:P.inkMid}}>{fp}% funded</M><M s={{fontSize:10,color:P.inkMid}}>{c.backers.length} backers</M></div>
              <Bar value={c.backerFunded} max={c.backerGoal} color={c.status==="active"?P.ink:P.amber}/>
            </div>
            <div style={{width:220,padding:20,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              {c.status==="active"?<><div><M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:4}}>Revenue</M><Spark data={c.rd} w={180} h={60}/></div>
                <div style={{display:"flex",gap:16,marginTop:12}}><div><M s={{fontSize:9,color:P.inkLight,display:"block"}}>DAILY</M><M s={{fontSize:16,fontWeight:600}}>{fmt(c.currentDaily)}</M></div><div><M s={{fontSize:9,color:P.inkLight,display:"block"}}>UPLIFT</M><M s={{fontSize:16,fontWeight:600,color:up>0?P.green:P.inkMid}}>{up>0?"+":""}{up}%</M></div></div>
              </>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}><div style={{textAlign:"center"}}><div style={{fontSize:36,fontWeight:700,color:P.amber}}>{fp}%</div><M s={{fontSize:10,color:P.inkMid}}>of goal</M></div></div>}
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
};
const Detail = ({c,go,role}) => {
  const [po,setPo]=useState(false);
  const [pa,setPa]=useState("");
  const up=c.baselineDaily>0?Math.round(((c.currentDaily-c.baselineDaily)/c.baselineDaily)*100):0;
  const fp=Math.round((c.backerFunded/c.backerGoal)*100);
  const capAmt=c.backerFunded*c.cap;
  const rp=capAmt>0?Math.round((c.totalSettled/capAmt)*100):0;
  const cpPct=Math.round((c.artistCoPay/c.totalBudget)*100);
  return <div style={{padding:"40px 48px"}}>
    <button onClick={()=>go("dash")} style={{padding:"8px 20px",border:`2px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:11,cursor:"pointer",textTransform:"uppercase",marginBottom:24}}>← Back</button>
    <div style={{borderBottom:`2px solid ${P.ink}`,paddingBottom:32,marginBottom:32}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}><M s={{fontSize:12,color:P.inkMid}}>{c.id}</M><Badge status={c.status}/></div>
          <h1 style={{fontSize:48,fontWeight:700,color:P.ink,lineHeight:.95,letterSpacing:"-.03em"}}>{c.name}</h1>
          <div style={{fontSize:16,color:P.inkMid,marginTop:8}}>{c.artist} · {c.genre}</div>
          <div style={{fontSize:16,color:P.inkLight,fontStyle:"italic",marginTop:4}}>"{c.tagline}"</div>
        </div>
        <div style={{textAlign:"right",paddingTop:8}}>
          <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:4}}>Backer Goal</M>
          <div style={{fontSize:42,fontWeight:700,color:P.ink}}>{fmt(c.backerGoal)}</div>
          <M s={{fontSize:11,color:P.inkMid,display:"block",marginTop:8}}>{c.revSharePct}% · {c.cap}x · {c.tenorMonths}mo · min {fmt(c.minTicket)}</M>
        </div>
      </div>
    </div>
    <div style={{display:"flex",border:`2px solid ${P.ink}`,marginBottom:32}}>
      {[{l:"Channel Daily",v:fmt(c.currentDaily),s:`${up>0?"+":""}${up}%`},{l:"Baseline",v:fmt(c.baselineDaily),s:"30d channel avg"},{l:"Total Rev",v:fmt(c.totalRevenue),s:`${c.daysActive}d`},{l:"Ad Spend",v:fmt(c.adSpent),s:`of ${fmt(c.totalBudget)}`},{l:"Paid Out",v:fmt(c.totalSettled),s:`${rp}% of cap`}].map((s,i)=><div key={i} style={{flex:1,padding:"18px 20px",borderRight:i<4?`1px solid ${P.sand}`:undefined}}>
        <M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>{s.l}</M>
        <span style={{fontSize:22,fontWeight:700,color:P.ink}}>{s.v}</span>
        <M s={{fontSize:10,color:P.inkMid,display:"block",marginTop:4}}>{s.s}</M>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:32}}>
      <div style={{border:`2px solid ${P.ink}`,padding:24}}><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".12em",display:"block",marginBottom:16}}>Channel Revenue Trend</M><Spark data={c.rd} w={400} h={120}/></div>
      <div style={{border:`2px solid ${P.ink}`,padding:24}}>
        <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".12em",display:"block",marginBottom:16}}>Funding</M>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><M s={{fontSize:11,color:P.inkMid}}>Artist Co-Pay ({cpPct}%)</M><M s={{fontSize:12,fontWeight:600,color:P.green}}>{fmt(c.artistCoPay)} ✓</M></div>
        <Bar value={1} max={1} color={P.green} h={6}/>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,marginTop:24}}><M s={{fontSize:11,color:P.inkMid}}>Backer Funding</M><M s={{fontSize:12,fontWeight:600}}>{fmt(c.backerFunded)} / {fmt(c.backerGoal)}</M></div>
        <Bar value={c.backerFunded} max={c.backerGoal} color={P.amber}/>
        <M s={{fontSize:10,color:P.inkLight,display:"block",marginTop:8}}>{fp}% · {c.backers.length} backers</M>
        {role==="backer"&&c.status==="funding"&&<button onClick={()=>setPo(true)} style={{width:"100%",marginTop:20,padding:"12px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>Back this drop</button>}
      </div>
    </div>
    <div style={{border:`2px solid ${P.ink}`,marginBottom:24}}>
      <Hdr>The Artiste</Hdr>
      <div style={{display:"flex"}}>
        <div style={{flex:1,padding:"20px 24px",borderRight:`1px solid ${P.sand}`}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}><Init name={c.artist} sz={48}/><div><span style={{fontSize:18,fontWeight:700}}>{c.artist}</span><div style={{fontSize:12,color:P.inkMid,marginTop:2}}>{c.artistHeadline}</div></div></div>
          <a href={c.artistLinkedin} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",border:`1.5px solid ${P.ink}`,color:P.ink,fontFamily:"monospace",fontSize:11,textDecoration:"none",textTransform:"uppercase"}}><LiIcon/> LinkedIn Profile</a>
          {c.artistTrack.campaigns>0&&<div style={{marginTop:16,padding:12,background:P.greenFaint,border:`1px solid ${P.green}30`}}>
            <M s={{fontSize:9,color:P.green,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Track Record</M>
            <div style={{display:"flex",gap:20}}>{[[c.artistTrack.campaigns+" done","drops"],[c.artistTrack.paybackRate+"%","payback"],["+"+c.artistTrack.avgUplift+"%","uplift"]].map(([v,l],j)=><div key={j}><M s={{fontSize:14,fontWeight:600,color:P.green}}>{v}</M><M s={{fontSize:9,color:P.inkMid,display:"block"}}>{l}</M></div>)}</div>
          </div>}
          {c.artistTrack.campaigns===0&&<div style={{marginTop:16,padding:12,background:P.amberFaint,border:`1px solid ${P.amber}30`}}><M s={{fontSize:11,color:P.amber}}>⚡ First drop on ZiggyDust</M></div>}
        </div>
        <div style={{width:280,padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em"}}>YouTube</M>{c.yt.verified&&<M s={{fontSize:9,color:P.green,background:P.greenFaint,padding:"2px 8px",border:`1px solid ${P.green}30`}}>✓ OAUTH</M>}</div>
          {[["Subscribers",c.yt.subscribers.toLocaleString()],["Total Views",c.yt.totalViews.toLocaleString()],["Monthly",c.yt.monthlyViews.toLocaleString()],["Age",c.yt.channelAge]].map(([l,v],j)=><div key={j} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:j<3?`1px solid ${P.sand}`:undefined}}><M s={{fontSize:11,color:P.inkMid}}>{l}</M><M s={{fontSize:12,fontWeight:600}}>{v}</M></div>)}
        </div>
      </div>
    </div>
    <div style={{border:`2px solid ${P.ink}`,marginBottom:24}}>
      <Hdr right={c.backers.length+" verified"}>Backer Wall</Hdr>
      {c.backers.map((b,i)=>{const bc=b.amount*c.cap,bp=bc>0?Math.round((b.returned/bc)*100):0;return <div key={i} style={{display:"flex",alignItems:"stretch",borderBottom:i<c.backers.length-1?`1px solid ${P.sand}`:undefined}}>
        <div style={{flex:1,padding:"16px 24px",display:"flex",alignItems:"center",gap:14}}>
          <Init name={b.name}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:600}}>{b.name}</span><a href={b.linkedin} target="_blank" rel="noopener noreferrer" style={{opacity:.7}}><LiIcon/></a></div><M s={{fontSize:11,color:P.inkMid,display:"block",marginTop:2}}>{b.headline}</M></div>
        </div>
        <div style={{width:160,padding:16,borderLeft:`1px solid ${P.sand}`,display:"flex",flexDirection:"column",justifyContent:"center"}}><M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",display:"block",marginBottom:4}}>Record</M><M s={{fontSize:11,color:P.ink}}>{b.campaigns} · {fmt(b.totalBacked)}</M>{b.avgReturn>0&&<M s={{fontSize:11,color:P.green,display:"block",marginTop:2}}>{b.avgReturn}x avg</M>}</div>
        <div style={{width:180,padding:"16px 20px",borderLeft:`1px solid ${P.sand}`,display:"flex",alignItems:"center",gap:12}}>
          <div><M s={{fontSize:9,color:P.inkLight,display:"block"}}>IN</M><M s={{fontSize:15,fontWeight:600}}>{fmt(b.amount)}</M></div>
          <div style={{textAlign:"right",flex:1}}><M s={{fontSize:14,fontWeight:600,color:b.returned>0?P.green:P.inkLight}}>{fmt(b.returned)}</M><M s={{fontSize:9,color:P.inkLight,display:"block"}}>{bp}%</M><div style={{marginTop:4}}><Bar value={b.returned} max={bc||1} color={P.green} h={3}/></div></div>
        </div>
      </div>;})}
    </div>
    <div style={{border:`2px solid ${P.ink}`,marginBottom:24}}>
      <Hdr right="money can only become ads">⬒ The Lockbox</Hdr>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Type</TH><TH>From</TH><TH>Amount</TH><TH>Status</TH></tr></thead><tbody>
        <tr><TD s={{fontFamily:"monospace",color:P.green}}>● Co-Pay</TD><TD>{c.artist}</TD><TD s={{fontFamily:"monospace",fontWeight:600}}>{fmt(c.artistCoPay)}</TD><TD><Badge status="paid"/></TD></tr>
        {c.backers.map((b,i)=><tr key={i}><TD s={{fontFamily:"monospace",color:P.amber}}>● Backer</TD><TD>{b.name}</TD><TD s={{fontFamily:"monospace",fontWeight:600}}>{fmt(b.amount)}</TD><TD><Badge status="paid"/></TD></tr>)}
        {c.adSpent>0&&<tr><TD s={{fontFamily:"monospace",color:P.red}}>↗ Deploy</TD><TD>Escrow → Google Ads</TD><TD s={{fontFamily:"monospace",fontWeight:600,color:P.red}}>−{fmt(c.adSpent)}</TD><TD><Badge status="active"/></TD></tr>}
      </tbody></table>
    </div>
    {c.adReceipts&&c.adReceipts.length>0&&<div style={{border:`2px solid ${P.ink}`,marginBottom:24}}>
      <Hdr right="every rupee accounted for">📋 Ad Receipts</Hdr>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Date</TH><TH>Type</TH><TH>Spend</TH><TH>Impressions</TH><TH>Views</TH><TH>CTR</TH><TH>Ref</TH></tr></thead><tbody>
        {c.adReceipts.map((r,i)=><tr key={i}><TD>{r.date}</TD><TD s={{fontFamily:"monospace"}}>{r.type}</TD><TD s={{fontFamily:"monospace",fontWeight:600,color:P.amber}}>{fmt(r.spend)}</TD><TD s={{fontFamily:"monospace"}}>{r.impressions.toLocaleString()}</TD><TD s={{fontFamily:"monospace"}}>{r.views.toLocaleString()}</TD><TD s={{fontFamily:"monospace"}}>{r.ctr}</TD><TD s={{fontFamily:"monospace",fontSize:10,color:P.inkLight}}>{r.ref}</TD></tr>)}
      </tbody></table>
      <div style={{padding:"12px 16px",background:P.warm,display:"flex",justifyContent:"space-between"}}><M s={{fontSize:11,color:P.inkMid}}>Deployed: <strong style={{color:P.ink}}>{fmt(c.adReceipts.reduce((s,r)=>s+r.spend,0))}</strong></M><M s={{fontSize:11,color:P.inkMid}}>Views: <strong style={{color:P.ink}}>{c.adReceipts.reduce((s,r)=>s+r.views,0).toLocaleString()}</strong></M></div>
    </div>}
    {c.settlements.length>0&&<div style={{border:`2px solid ${P.ink}`,marginBottom:24}}>
      <Hdr>Payout History</Hdr>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Period</TH><TH>Revenue</TH><TH>Baseline</TH><TH>Uplift</TH><TH>Share</TH><TH>Status</TH></tr></thead><tbody>
        {c.settlements.map((s,i)=><tr key={i}><TD>{s.month}</TD><TD s={{fontFamily:"monospace"}}>{fmt(s.revenue)}</TD><TD s={{fontFamily:"monospace",color:P.inkLight}}>{fmt(s.baseline)}</TD><TD s={{fontFamily:"monospace",color:P.green}}>+{fmt(s.uplift)}</TD><TD s={{fontFamily:"monospace",fontWeight:600,color:P.amber}}>{fmt(s.share)}</TD><TD><Badge status={s.status}/></TD></tr>)}
      </tbody></table>
    </div>}
    {po&&<div style={{position:"fixed",inset:0,background:"rgba(26,24,20,.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setPo(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:P.cream,border:`3px solid ${P.ink}`,padding:36,width:420}}>
        <span style={{fontSize:24,fontWeight:700,display:"block",marginBottom:4}}>Back: {c.name}</span>
        <p style={{fontSize:13,color:P.inkMid,marginBottom:4}}>Your funds enter escrow. They can only become YouTube ads.</p>
        <p style={{fontSize:12,color:P.inkMid,marginBottom:24}}>Revenue share applies to the artist's entire YouTube channel — capturing cross-views and discovery of older content.</p>
        <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Amount ({csym()}) — minimum {fmt(c.minTicket)}</M>
        <input value={pa} onChange={e=>setPa(e.target.value)} placeholder={String(c.minTicket)} type="number" style={{width:"100%",padding:"12px 16px",border:`2px solid ${pa&&Number(pa)<c.minTicket?P.red:P.ink}`,background:P.white,color:P.ink,fontSize:20,fontWeight:600,outline:"none",marginBottom:4,boxSizing:"border-box"}}/>
        {pa&&Number(pa)<c.minTicket&&<M s={{fontSize:10,color:P.red,display:"block",marginBottom:12}}>Minimum ticket is {fmt(c.minTicket)}</M>}
        <div style={{padding:14,background:P.warm,border:`1px solid ${P.sand}`,marginBottom:20,marginTop:12,fontFamily:"monospace",fontSize:11,color:P.inkMid,lineHeight:1.7}}>
          Share: <strong style={{color:P.ink}}>{c.revSharePct}%</strong> of channel uplift · Cap: <strong style={{color:P.ink}}>{c.cap}x</strong>{pa?` (${fmt(Number(pa)*c.cap)})`:""} · Tenor: <strong style={{color:P.ink}}>{c.tenorMonths}mo</strong>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setPo(false)} style={{flex:1,padding:"12px",border:`2px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:12,cursor:"pointer",textTransform:"uppercase"}}>Cancel</button>
          <button disabled={!pa||Number(pa)<c.minTicket} style={{flex:1,padding:"12px",border:`2px solid ${!pa||Number(pa)<c.minTicket?P.sand:P.ink}`,background:!pa||Number(pa)<c.minTicket?P.sand:P.ink,color:!pa||Number(pa)<c.minTicket?P.inkLight:P.cream,fontFamily:"monospace",fontSize:12,fontWeight:600,cursor:!pa||Number(pa)<c.minTicket?"not-allowed":"pointer",textTransform:"uppercase"}}>I'm In</button>
        </div>
      </div>
    </div>}
  </div>;
};

const Create = ({go,cs}) => {
  const hasOpen=cs.some(c=>c.status==="funding"||c.status==="active");
  const [step,setStep]=useState(1);
  const [f,setF]=useState({videoUrl:"",channelName:"",contentTitle:"",totalBudget:"",artistCoPay:"",backerGoal:"",minTicket:"",revSharePct:"25",cap:"1.5",tenorMonths:"6",escrowType:"designated",adAccountId:""});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  const F=({label,field,placeholder,type="text"})=><div style={{marginBottom:20}}><M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>{label}</M><input style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,color:P.ink,fontSize:14,outline:"none",boxSizing:"border-box"}} type={type} value={f[field]} onChange={e=>u(field,e.target.value)} placeholder={placeholder}/></div>;
  const steps=["Content","Funding","Terms","Escrow"];
  const cpPct=f.totalBudget>0?Math.round((Number(f.artistCoPay)/Number(f.totalBudget))*100):0;
  const cpUnder=f.totalBudget&&f.artistCoPay&&cpPct<20;
  return <div style={{padding:"40px 48px"}}>
    <h1 style={{fontSize:36,fontWeight:700,marginBottom:4}}>New Drop</h1>
    <p style={{color:P.inkMid,fontSize:14,marginBottom:28}}>Set up your next drop</p>
    {hasOpen&&<div style={{border:`2px solid ${P.red}`,background:P.redFaint,padding:"16px 20px",marginBottom:24}}><M s={{fontSize:12,fontWeight:600,color:P.red}}>You already have an active or funding drop.</M><p style={{fontSize:12,color:P.inkMid,marginTop:6,marginBottom:0}}>One active drop per artist at a time. Complete or close your current drop before creating a new one.</p></div>}
    <div style={{display:"flex",border:`2px solid ${P.ink}`,marginBottom:28}}>{steps.map((s,i)=><div key={i} style={{flex:1,padding:"10px 16px",borderRight:i<3?`1px solid ${P.sand}`:undefined,background:step===i+1?P.ink:step>i+1?P.warm:"transparent",display:"flex",alignItems:"center",gap:8}}>
      <M s={{fontSize:11,fontWeight:700,color:step===i+1?P.amber:step>i+1?P.green:P.inkLight}}>{step>i+1?"✓":i+1}</M><M s={{fontSize:11,color:step===i+1?P.cream:P.ink,fontWeight:step===i+1?600:400}}>{s}</M>
    </div>)}</div>
    <div style={{border:`2px solid ${P.ink}`,padding:28,background:P.white,maxWidth:560}}>
      {step===1&&<><h2 style={{fontSize:22,fontWeight:700,marginBottom:20}}>Content</h2><F label="YouTube Video URL" field="videoUrl" placeholder="https://youtube.com/watch?v=..."/><F label="Channel Name" field="channelName" placeholder="Your channel"/><F label="Content Title" field="contentTitle" placeholder="Song / video title"/><div style={{padding:14,background:P.warm,border:`1px solid ${P.sand}`,fontSize:12,color:P.inkMid,lineHeight:1.6}}><strong style={{color:P.ink}}>YPP Required</strong> — Active YouTube Partner Program. Verified via OAuth.</div></>}
      {step===2&&<><h2 style={{fontSize:22,fontWeight:700,marginBottom:20}}>Funding</h2><F label={`Total Budget (${csym()})`} field="totalBudget" placeholder="150000" type="number"/><F label={`Your Co-Pay (${csym()}) — min 20%`} field="artistCoPay" placeholder="30000" type="number"/><F label={`Backer Goal (${csym()})`} field="backerGoal" placeholder="120000" type="number"/><F label={`Minimum Ticket (${csym()}) — per backer`} field="minTicket" placeholder="5000" type="number"/>
        {f.totalBudget&&f.artistCoPay?<div style={{padding:12,background:cpUnder?P.redFaint:P.warm,border:`1px solid ${cpUnder?P.red+"40":P.sand}`,fontSize:13,color:cpUnder?P.red:P.inkMid}}>Co-pay is <strong style={{color:cpUnder?P.red:P.ink}}>{cpPct}%</strong>{cpUnder?" — minimum 20% required. Your skin in the game.":" — first-in, first-loss."}</div>:null}</>}
      {step===3&&<><h2 style={{fontSize:22,fontWeight:700,marginBottom:20}}>Terms</h2><F label="Revenue Share %" field="revSharePct" placeholder="25" type="number"/><F label="Cap (Multiple)" field="cap" placeholder="1.5"/><F label="Tenor (Months)" field="tenorMonths" placeholder="6" type="number"/><div style={{padding:14,background:P.amberFaint,border:`1px solid ${P.sand}`,fontSize:13,lineHeight:1.6}}>Backers get <strong>{f.revSharePct}%</strong> of channel-wide uplift, capped at <strong>{f.cap}x</strong>, over <strong>{f.tenorMonths} months</strong>.{f.minTicket?` Min ticket: ${csym()}${f.minTicket}.`:""}</div></>}
      {step===4&&<><h2 style={{fontSize:22,fontWeight:700,marginBottom:20}}>Escrow</h2><div style={{marginBottom:20}}><M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Escrow Type</M><select style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,fontSize:14,outline:"none"}} value={f.escrowType} onChange={e=>u("escrowType",e.target.value)}><option value="designated">Artist-Controlled Account</option><option value="third_party">Third-Party Agent</option></select></div><F label="Google Ads Account ID" field="adAccountId" placeholder="xxx-xxx-xxxx"/><div style={{padding:14,background:P.amberFaint,border:`1px solid ${P.sand}`,fontSize:12,color:P.inkMid,lineHeight:1.6}}><strong style={{color:P.ink}}>Constraint:</strong> Funds only flow to Google Ads. No personal transfers.</div></>}
      <div style={{display:"flex",justifyContent:"space-between",marginTop:28}}>
        {step>1?<button onClick={()=>setStep(step-1)} style={{padding:"10px 24px",border:`2px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:12,cursor:"pointer",textTransform:"uppercase"}}>Back</button>:<div/>}
        <button onClick={()=>{if(step===2&&cpUnder)return;if(step===4&&hasOpen)return;step<4?setStep(step+1):go("agree");}} style={{padding:"10px 24px",border:`2px solid ${(step===2&&cpUnder)||(step===4&&hasOpen)?P.sand:P.ink}`,background:(step===2&&cpUnder)||(step===4&&hasOpen)?P.sand:P.ink,color:(step===2&&cpUnder)||(step===4&&hasOpen)?P.inkLight:P.cream,fontFamily:"monospace",fontSize:12,fontWeight:600,cursor:(step===2&&cpUnder)||(step===4&&hasOpen)?"not-allowed":"pointer",textTransform:"uppercase"}}>{step===2&&cpUnder?"Min 20% co-pay":step===4&&hasOpen?"One drop at a time":step<4?"Continue →":"Review The Deal →"}</button>
      </div>
    </div>
  </div>;
};

const Agree = ({role}) => {
  const [a,setA]=useState({tos:false,fund:false,term:false});
  const all=a.tos&&a.fund&&a.term;
  const docs=[
    {key:"tos",n:"01",title:"House Rules",desc:"Platform is facilitator only. No custody. Not a label.",cl:["Platform provides listing, analytics, payout reporting.","No custody of funds at any point.","Active YouTube Partner Program required.","Co-pay minimum 20% of budget — first-in, first-loss.","Backer funds are a performance-linked loan to the artist — not equity, not a royalty purchase. Revenue share payments are interest.","Default triggers: missed payments, OAuth revocation.","Dispute resolution via arbitration."]},
    {key:"fund",n:"02",title:"The Pact",desc:"Performance-linked loan from Backers to Artist. Interest tied to channel-wide YouTube uplift.",cl:["Backer funds constitute a loan to the artist. Repayment is tied to the performance of the campaign and the artist's channel during the period the ad spend is live.","Revenue share payments are interest on the loan. Principal is repaid first per the waterfall.","Share applies to incremental channel-wide uplift above baseline — capturing cross-views and older content discovery.","Waterfall: escrow → loan principal → interest → artist.","Ends at cap or tenor expiry.","Backer acknowledges total loss of loan possible.","Artist must not delete content during tenor."]},
    {key:"term",n:"03",title:"The Numbers",desc:"Per-drop specifics. Locked at activation.",cl:["Budget, co-pay (min 20%), min ticket, share %, cap, tenor locked.","Loan terms: backer commitment is a performance-linked loan; revenue share payments are interest; principal returned first per waterfall.","Channel-wide baseline computed at launch — final.","Monthly payout reports; due within 15 days.","Escrow controller identified; proof of spend required.","Security licence optional, dormant unless default."]},
  ];
  return <div style={{padding:"40px 48px"}}>
    <h1 style={{fontSize:36,fontWeight:700,marginBottom:4}}>The Deal</h1>
    <p style={{color:P.inkMid,fontSize:14,marginBottom:32}}>Three parts. Read them. Accept them. Then we move.</p>
    {docs.map((d,i)=><div key={d.key} style={{border:`2px solid ${a[d.key]?P.green:P.ink}`,marginBottom:16,background:P.white,transition:"border-color .3s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px",borderBottom:`1.5px solid ${a[d.key]?P.green:P.ink}`,background:a[d.key]?P.greenFaint:P.warm}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:a[d.key]?P.green:P.ink}}>{d.n}</span><span style={{fontSize:18,fontWeight:700}}>{d.title}</span></div>
        {a[d.key]&&<M s={{fontSize:12,color:P.green,fontWeight:600}}>✓ I'M IN</M>}
      </div>
      <div style={{padding:"16px 24px"}}>
        <p style={{fontSize:13,color:P.inkMid,marginBottom:14,lineHeight:1.6}}>{d.desc}</p>
        <div style={{background:P.warm,padding:14,marginBottom:16}}>{d.cl.map((cl,j)=><div key={j} style={{display:"flex",gap:10,marginBottom:5,fontSize:12,lineHeight:1.5}}><M s={{color:P.inkLight,fontSize:10,minWidth:16}}>§{j+1}</M>{cl}</div>)}</div>
        <button onClick={()=>setA(p=>({...p,[d.key]:!p[d.key]}))} style={{width:"100%",padding:"11px",border:`2px solid ${a[d.key]?P.green:P.ink}`,background:a[d.key]?P.green:"transparent",color:a[d.key]?P.white:P.ink,fontFamily:"monospace",fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"uppercase",transition:"all .2s"}}>{a[d.key]?"✓ I'm in":"Accept "+d.title}</button>
      </div>
    </div>)}
    {all&&<div style={{border:`3px solid ${P.green}`,padding:36,textAlign:"center",background:P.greenFaint}}>
      <div style={{fontSize:28,fontWeight:700,color:P.green,marginBottom:8}}>You're all in.</div>
      <p style={{fontSize:13,color:P.inkMid,marginBottom:20}}>{role==="artist"?"Ready once co-pay lands in escrow.":"You can now back drops."}</p>
      <button style={{padding:"12px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>{role==="artist"?"Go Live":"Find Drops"}</button>
    </div>}
  </div>;
};

const Settle = ({cs}) => {
  const ac=cs.filter(c=>c.settlements.length>0);
  return <div style={{padding:"40px 48px"}}>
    <h1 style={{fontSize:36,fontWeight:700,marginBottom:4}}>Payouts</h1>
    <p style={{color:P.inkMid,fontSize:14,marginBottom:32}}>Monthly reports and what's been paid</p>
    {ac.map(c=><div key={c.id} style={{border:`2px solid ${P.ink}`,marginBottom:20,background:P.white}}>
      <div style={{padding:"14px 24px",borderBottom:`1.5px solid ${P.ink}`,background:P.warm,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><span style={{fontSize:18,fontWeight:700}}>{c.name}</span><M s={{fontSize:11,color:P.inkMid,marginLeft:12}}>{c.id} · {c.revSharePct}% · {c.cap}x</M></div><Badge status={c.status}/>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Period</TH><TH>Revenue</TH><TH>Baseline</TH><TH>Uplift</TH><TH>Share</TH><TH>Status</TH><TH></TH></tr></thead><tbody>
        {c.settlements.map((s,i)=><tr key={i}><TD>{s.month}</TD><TD s={{fontFamily:"monospace"}}>{fmt(s.revenue)}</TD><TD s={{fontFamily:"monospace",color:P.inkLight}}>{fmt(s.baseline)}</TD><TD s={{fontFamily:"monospace",color:P.green}}>+{fmt(s.uplift)}</TD><TD s={{fontFamily:"monospace",fontWeight:600,color:P.amber}}>{fmt(s.share)}</TD><TD><Badge status={s.status}/></TD>
          <TD><button style={{padding:"4px 14px",border:`1.5px solid ${P.ink}`,background:"transparent",fontFamily:"monospace",fontSize:10,cursor:"pointer",textTransform:"uppercase"}}>{s.status==="pending"?"Mark Paid":"Receipt"}</button></TD></tr>)}
      </tbody></table>
      <div style={{display:"flex",justifyContent:"space-between",padding:"12px 20px",background:P.warm}}><M s={{fontSize:11,color:P.inkMid}}>Total paid out: <strong style={{color:P.green}}>{fmt(c.totalSettled)}</strong></M><M s={{fontSize:11,color:P.inkMid}}>{Math.round((c.totalSettled/(c.backerFunded*c.cap))*100)}% of cap</M></div>
    </div>)}
    {ac.length===0&&<div style={{border:`2px dashed ${P.sand}`,padding:48,textAlign:"center",color:P.inkLight,fontSize:18,fontStyle:"italic"}}>No payout data yet.</div>}
  </div>;
};

const Camps = ({cs,go,pick,role}) => <div style={{padding:"40px 48px"}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28}}>
    <div><h1 style={{fontSize:36,fontWeight:700}}>Drops</h1><p style={{color:P.inkMid,fontSize:14,marginTop:4}}>{role==="backer"?"Find music to back":"Your active drops"}</p></div>
    {role==="artist"&&<button onClick={()=>go("create")} style={{padding:"10px 20px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>+ New Drop</button>}
  </div>
  {cs.map((c,i)=>{const fp=Math.round((c.backerFunded/c.backerGoal)*100);return <div key={c.id} onClick={()=>{pick(c);go("detail");}} style={{border:`2px solid ${P.ink}`,marginBottom:14,cursor:"pointer",background:P.white,display:"flex"}}>
    <div style={{width:80,background:P.ink,color:P.cream,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"12px 0"}}><M s={{fontSize:9,color:P.amber,letterSpacing:".1em"}}>{c.id}</M><div style={{fontSize:28,fontWeight:700,marginTop:4}}>{fp}%</div></div>
    <div style={{flex:1,padding:"16px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><span style={{fontSize:20,fontWeight:700}}>{c.name}</span><div style={{fontSize:13,color:P.inkMid,marginTop:2}}>{c.artist} · {c.genre}</div></div><Badge status={c.status}/></div>
      <div style={{display:"flex",gap:20,marginTop:12}}>{[["Goal",fmt(c.backerGoal)],["Funded",fmt(c.backerFunded)],["Min",fmt(c.minTicket)],["Share",c.revSharePct+"%"],["Cap",c.cap+"x"],["Tenor",c.tenorMonths+"mo"]].map(([l,v],j)=><div key={j}><M s={{fontSize:9,color:P.inkLight,letterSpacing:".08em",display:"block"}}>{l}</M><M s={{fontSize:13,fontWeight:600}}>{v}</M></div>)}</div>
      <div style={{marginTop:12}}><Bar value={c.backerFunded} max={c.backerGoal} color={P.amber}/></div>
    </div>
  </div>;})}
</div>;

export default function App(){
  const [view,setView]=useState("dash");
  const [role,setRole]=useState("platform");
  const [cur,setCur]=useState("USD");
  const [sel,setSel]=useState(null);
  const go=v=>setView(v);
  const pick=c=>setSel(c);
  _cur = cur;
  const V={
    dash:<Dashboard cs={CAMPS} go={go} pick={pick}/>,
    camps:<Camps cs={CAMPS} go={go} pick={pick} role={role}/>,
    detail:sel?<Detail c={sel} go={go} role={role}/>:<Dashboard cs={CAMPS} go={go} pick={pick}/>,
    create:<Create go={go} cs={CAMPS}/>,
    agree:<Agree role={role}/>,
    settle:<Settle cs={CAMPS}/>,
  };
  return <div style={{minHeight:"100vh",background:P.bg,color:P.ink,fontFamily:"system-ui,sans-serif"}}>
    <Sidebar view={view} setView={setView} role={role} setRole={setRole} cur={cur} setCur={setCur}/>
    <div style={{marginLeft:220,minHeight:"100vh"}}>{V[view]||V.dash}</div>
  </div>;
}
