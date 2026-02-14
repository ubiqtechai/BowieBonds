import { useState } from "react";

const P = {
  bg:"#F5F0E8",cream:"#F5F0E8",warm:"#EDE6D8",sand:"#D9CFC0",
  ink:"#1A1814",inkMid:"#6B6358",inkLight:"#9A9285",
  amber:"#C8762D",amberFaint:"#F5E6D0",
  red:"#C44B3F",redFaint:"#FCEAE8",green:"#3A7D5C",greenFaint:"#E5F2EC",
  white:"#fff",
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

const M = ({children,s}) => <span style={{fontFamily:"monospace",...s}}>{children}</span>;
const LiIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill={P.ink}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

const Nav = ({page,setPage,setAuth,cur,setCur}) => (
  <div style={{borderBottom:`2px solid ${P.ink}`,background:P.cream,position:"sticky",top:0,zIndex:100}}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
      <div style={{display:"flex",alignItems:"center",gap:32}}>
        <div onClick={()=>setPage("home")} style={{cursor:"pointer"}}>
          <span style={{fontSize:22,fontWeight:700,letterSpacing:"-.03em"}}>ziggy<span style={{color:P.amber}}>dust</span></span>
        </div>
        <div style={{display:"flex",gap:0}}>
          {[["how","How It Works"],["artists","For Artists"],["backers","For Backers"],["bowie","Bowie Bonds"],["economics","The Economics"],["trust","Trust"],["faq","FAQ"]].map(([id,label])=>(
            <button key={id} onClick={()=>setPage(id)} style={{padding:"8px 14px",border:"none",background:page===id?P.ink:"transparent",color:page===id?P.cream:P.ink,fontFamily:"monospace",fontSize:10,fontWeight:page===id?600:400,cursor:"pointer",textTransform:"uppercase",letterSpacing:".06em"}}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{display:"flex",marginRight:8}}>{["USD","INR"].map((c,i)=><button key={c} onClick={()=>setCur(c)} style={{padding:"6px 12px",border:`1.5px solid ${P.ink}`,borderLeft:i===0?undefined:"none",background:cur===c?P.ink:"transparent",color:cur===c?P.cream:P.ink,fontFamily:"monospace",fontSize:9,fontWeight:600,cursor:"pointer"}}>{CURRENCIES[c].symbol} {c}</button>)}</div>
        <button onClick={()=>setAuth("login")} style={{padding:"8px 20px",border:`1.5px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:11,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>Log In</button>
        <button onClick={()=>setAuth("signup")} style={{padding:"8px 20px",border:`1.5px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:11,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>Sign Up</button>
      </div>
    </div>
  </div>
);

const Footer = ({setPage}) => (
  <div style={{borderTop:`2px solid ${P.ink}`,background:P.ink,color:P.cream,padding:"48px 40px 32px"}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between"}}>
      <div>
        <div style={{fontSize:24,fontWeight:700,letterSpacing:"-.03em",marginBottom:8}}>ziggy<span style={{color:P.amber}}>dust</span></div>
        <M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase",letterSpacing:".15em",display:"block"}}>back your artiste</M>
        <M s={{fontSize:9,color:P.inkLight,letterSpacing:".15em",display:"block",marginTop:2}}>back your music</M>
        <M s={{fontSize:9,color:P.inkLight,letterSpacing:".1em",display:"block",marginTop:16}}>Experimental · Not financial advice · Not a security</M>
      </div>
      <div style={{display:"flex",gap:48}}>
        <div>
          <M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:12}}>Learn</M>
          {[["how","How It Works"],["bowie","Bowie Bonds"],["economics","The Economics"],["trust","Trust Architecture"]].map(([id,l])=><div key={id} onClick={()=>setPage(id)} style={{fontFamily:"monospace",fontSize:11,color:P.sand,cursor:"pointer",marginBottom:6}}>{l}</div>)}
        </div>
        <div>
          <M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:12}}>Join</M>
          {[["artists","For Artists"],["backers","For Backers"],["faq","FAQ"]].map(([id,l])=><div key={id} onClick={()=>setPage(id)} style={{fontFamily:"monospace",fontSize:11,color:P.sand,cursor:"pointer",marginBottom:6}}>{l}</div>)}
        </div>
      </div>
    </div>
    <div style={{maxWidth:1100,margin:"32px auto 0",borderTop:`1px solid ${P.inkMid}`,paddingTop:16}}><M s={{fontSize:9,color:P.inkMid}}>© 2026 ZiggyDust. Platform facilitator only. No custody of funds.</M></div>
  </div>
);

const AuthModal = ({mode,setAuth}) => {
  const [tab,setTab]=useState(mode);
  const [role,setRole]=useState("artist");
  return <div style={{position:"fixed",inset:0,background:"rgba(26,24,20,.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setAuth(null)}>
    <div onClick={e=>e.stopPropagation()} style={{background:P.cream,border:`3px solid ${P.ink}`,padding:0,width:440}}>
      <div style={{display:"flex",borderBottom:`2px solid ${P.ink}`}}>
        {["login","signup"].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"14px",border:"none",background:tab===t?P.ink:"transparent",color:tab===t?P.cream:P.ink,fontFamily:"monospace",fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:".08em"}}>{t==="login"?"Log In":"Sign Up"}</button>)}
      </div>
      <div style={{padding:32}}>
        {tab==="signup"&&<div style={{marginBottom:20}}>
          <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:8}}>I am a</M>
          <div style={{display:"flex",gap:0}}>{["artist","backer"].map((r,i)=><button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:"10px",border:`2px solid ${P.ink}`,borderLeft:i===0?undefined:"none",background:role===r?P.ink:"transparent",color:role===r?P.cream:P.ink,fontFamily:"monospace",fontSize:11,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>{r}</button>)}</div>
        </div>}
        {tab==="signup"&&<div style={{marginBottom:20}}>
          <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Full Name</M>
          <input placeholder="Your name" style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        </div>}
        <div style={{marginBottom:20}}>
          <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Email</M>
          <input placeholder="you@email.com" type="email" style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>Password</M>
          <input placeholder="••••••••" type="password" style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        </div>
        {tab==="signup"&&<div style={{marginBottom:20}}>
          <M s={{fontSize:9,fontWeight:600,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:6}}>LinkedIn Profile URL (mandatory)</M>
          <input placeholder="https://linkedin.com/in/..." style={{width:"100%",padding:"10px 14px",border:`2px solid ${P.ink}`,background:P.white,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
          <M s={{fontSize:10,color:P.inkMid,display:"block",marginTop:6}}>Everyone on ZiggyDust is a real person. No anons.</M>
        </div>}
        {tab==="signup"&&role==="artist"&&<div style={{marginBottom:20}}>
          <button style={{width:"100%",padding:"12px",border:`2px solid ${P.ink}`,background:P.white,color:P.ink,fontFamily:"monospace",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="red"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="white"/></svg>
            Connect YouTube (OAuth)
          </button>
          <M s={{fontSize:10,color:P.inkMid,display:"block",marginTop:6}}>We verify your YPP status and pull channel stats. Read-only.</M>
        </div>}
        <button style={{width:"100%",padding:"14px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>{tab==="login"?"Log In":"Create Account"}</button>
        <div style={{textAlign:"center",marginTop:16}}>
          <M s={{fontSize:11,color:P.inkMid}}>{tab==="login"?"No account? ":"Already in? "}<span onClick={()=>setTab(tab==="login"?"signup":"login")} style={{color:P.ink,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>{tab==="login"?"Sign Up":"Log In"}</span></M>
        </div>
      </div>
    </div>
  </div>;
};

const Sec = ({children,dark,id}) => <div id={id} style={{background:dark?P.ink:P.cream,color:dark?P.cream:P.ink,padding:"80px 40px"}}><div style={{maxWidth:1100,margin:"0 auto"}}>{children}</div></div>;
const H1 = ({children,c}) => <h1 style={{fontSize:52,fontWeight:700,lineHeight:.95,letterSpacing:"-.03em",color:c||P.ink,marginBottom:16}}>{children}</h1>;
const H2 = ({children,c}) => <h2 style={{fontSize:32,fontWeight:700,lineHeight:1,letterSpacing:"-.02em",color:c||P.ink,marginBottom:12}}>{children}</h2>;
const Sub = ({children,c}) => <p style={{fontSize:16,color:c||P.inkMid,lineHeight:1.6,maxWidth:600}}>{children}</p>;

// ══════════════════════════════════════════════════════
// HOME / LANDING
// ══════════════════════════════════════════════════════
const Home = ({setPage,setAuth}) => <div>
  {/* Hero */}
  <Sec><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",paddingBottom:48,borderBottom:`2px solid ${P.ink}`}}>
    <div style={{maxWidth:600}}>
      <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".2em",display:"block",marginBottom:16}}>YouTube Promotion for Independent Artists</M>
      <H1>Your music<br/>deserves a<br/><em style={{color:P.amber}}>push.</em></H1>
      <Sub>ZiggyDust connects indie artists with backers who loan funds for YouTube ad campaigns. Backers earn interest tied to the campaign's performance. Artists keep their rights, their music, their independence.</Sub>
      <div style={{display:"flex",gap:12,marginTop:32}}>
        <button onClick={()=>setAuth("signup")} style={{padding:"14px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>Get Started</button>
        <button onClick={()=>setPage("how")} style={{padding:"14px 32px",border:`2px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:13,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>How It Works →</button>
      </div>
    </div>
    <div style={{textAlign:"right"}}>
      <div style={{fontSize:72,fontWeight:700,color:P.amber,lineHeight:.85,letterSpacing:"-.04em"}}>{fmt(2600)}</div>
      <M s={{fontSize:11,color:P.inkMid,display:"block",marginTop:8}}>funded across 3 drops</M>
      <div style={{marginTop:24,display:"flex",gap:16,justifyContent:"flex-end"}}>
        {[["3","drops"],["6","backers"],[fmt(780),"ad spend"]].map(([v,l],i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700}}>{v}</div><M s={{fontSize:9,color:P.inkLight,textTransform:"uppercase"}}>{l}</M></div>)}
      </div>
    </div>
  </div></Sec>

  {/* How strip */}
  <Sec dark><div style={{display:"flex",gap:0}}>
    {[{n:"01",t:"Artist drops",d:"Artist sets up a YouTube promotion campaign, puts in ≥20% co-pay, sets revenue share terms. One active drop per artist at a time."},{n:"02",t:"Backers loan",d:"Real people with real LinkedIn profiles loan funds to the artist. All money goes into a lockbox."},{n:"03",t:"Ads deploy",d:"Escrow funds go only to Google Ads for YouTube. Every rupee becomes an ad impression."},{n:"04",t:"Revenue flows",d:"YouTube AdSense revenue is tracked via OAuth. Incremental channel-wide uplift above baseline goes to backers — including cross-views to older content."}].map((s,i)=><div key={i} style={{flex:1,padding:"0 28px",borderRight:i<3?`1px solid ${P.inkMid}`:undefined}}>
      <M s={{fontSize:28,fontWeight:700,color:P.amber,display:"block",marginBottom:12}}>{s.n}</M>
      <div style={{fontSize:18,fontWeight:700,color:P.cream,marginBottom:8}}>{s.t}</div>
      <div style={{fontSize:13,color:P.inkLight,lineHeight:1.6}}>{s.d}</div>
    </div>)}
  </div></Sec>

  {/* Trust */}
  <Sec><div style={{borderBottom:`2px solid ${P.ink}`,paddingBottom:48}}>
    <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>Why it works</M>
    <H2>Trust is the product.</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,marginTop:32,border:`2px solid ${P.ink}`}}>
      {[{t:"Real identities",d:"Every artist and backer has a mandatory LinkedIn profile. No anons. You know who you're dealing with.",icon:"👤"},{t:"Verified numbers",d:"YouTube stats pulled via OAuth — not self-reported. Subscriber counts, views, revenue — all verified.",icon:"✓"},{t:"The Lockbox",d:"Funds can only become Google Ads. No personal transfers, no withdrawals. Every rupee accounted for with receipts.",icon:"⬒"},{t:"20% skin in the game",d:"Artists put in minimum 20% co-pay. First-in, first-loss. They eat before their backers do.",icon:"🎯"},{t:"Track records",d:"Every artist and backer builds a public history. Past drops, payback rates, average returns — all visible.",icon:"📊"},{t:"Ad receipts",d:"Google Ads invoice references, impression counts, view counts — proof that your money became promotion.",icon:"📋"}].map((s,i)=><div key={i} style={{padding:"24px 28px",borderRight:(i%3)<2?`1px solid ${P.sand}`:undefined,borderBottom:i<3?`1px solid ${P.sand}`:undefined}}>
        <div style={{fontSize:20,marginBottom:8}}>{s.icon}</div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>{s.t}</div>
        <div style={{fontSize:13,color:P.inkMid,lineHeight:1.5}}>{s.d}</div>
      </div>)}
    </div>
  </div></Sec>

  {/* Bowie tease */}
  <Sec dark><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <div style={{maxWidth:560}}>
      <M s={{fontSize:10,color:P.amber,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>The precedent</M>
      <div style={{fontSize:32,fontWeight:700,color:P.cream,lineHeight:1.05,marginBottom:12}}>In 1997, David Bowie turned his future royalties into $55 million.</div>
      <div style={{fontSize:14,color:P.inkLight,lineHeight:1.6}}>Bowie Bonds were the first celebrity-backed securities — and the intellectual ancestor of what we're building. Same idea, different scale, new technology.</div>
      <button onClick={()=>setPage("bowie")} style={{marginTop:24,padding:"12px 28px",border:`1.5px solid ${P.cream}`,background:"transparent",color:P.cream,fontFamily:"monospace",fontSize:12,cursor:"pointer",textTransform:"uppercase",letterSpacing:".05em"}}>Read the full story →</button>
    </div>
    <div style={{textAlign:"right"}}><div style={{fontSize:80,fontWeight:700,color:P.amber,lineHeight:.8,letterSpacing:"-.04em"}}>$55M</div><M s={{fontSize:11,color:P.inkLight,display:"block",marginTop:8}}>Bowie Bonds, 1997</M></div>
  </div></Sec>

  {/* CTA */}
  <Sec><div style={{textAlign:"center",padding:"32px 0"}}>
    <H2 c={P.ink}>Ready to push some sound?</H2>
    <Sub c={P.inkMid} style={{maxWidth:500,margin:"0 auto"}}>Whether you make music or back it — this is your platform.</Sub>
    <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:32}}>
      <button onClick={()=>setAuth("signup")} style={{padding:"14px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>Sign Up</button>
      <button onClick={()=>setPage("faq")} style={{padding:"14px 32px",border:`2px solid ${P.ink}`,background:"transparent",color:P.ink,fontFamily:"monospace",fontSize:13,cursor:"pointer",textTransform:"uppercase"}}>Read the FAQ</button>
    </div>
  </div></Sec>
</div>;

// ══════════════════════════════════════════════════════
// BOWIE BONDS
// ══════════════════════════════════════════════════════
const Bowie = ({setPage}) => <div>
  <Sec>
    <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>The Precedent</M>
    <H1>Bowie Bonds</H1>
    <Sub>How David Bowie invented celebrity-backed securities — and why it matters for indie music today.</Sub>
  </Sec>
  <Sec dark>
    <div style={{maxWidth:700}}>
      <div style={{fontSize:20,fontWeight:700,color:P.cream,lineHeight:1.5,marginBottom:24}}>In January 1997, David Bowie did something no musician had ever done. He walked into a room with investment banker David Pullman and emerged with $55 million — not from a record deal, not from a tour, but from the future.</div>
      <div style={{fontSize:15,color:P.inkLight,lineHeight:1.7}}>Bowie securitised the future royalties of his first 25 albums — everything from "Space Oddity" to "Let's Dance." The bonds paid 7.9% annually over 10 years, backed entirely by the income those recordings would generate. Prudential Insurance bought the entire issue. It was, at the time, unprecedented.</div>
    </div>
  </Sec>
  <Sec>
    <H2>The Timeline</H2>
    <div style={{marginTop:32}}>
      {[{year:"1997",title:"The Issue",desc:"$55 million in asset-backed securities issued. Prudential Insurance Company buys the entire offering. Annual coupon: 7.9%. Maturity: 10 years. Collateral: royalties from 25 Bowie albums (287 songs)."},{year:"1998–2003",title:"The Peak",desc:"Bonds perform as expected. Royalty income covers coupon payments. Moody's rates them A3 — investment grade. Other artists take notice: James Brown, Ashford & Simpson, the Isley Brothers explore similar deals."},{year:"2004",title:"The Downgrade",desc:"The music industry shifts. Napster, then iTunes, then streaming reshape how people consume music. Moody's downgrades Bowie Bonds to Baa3 — one notch above junk. The underlying revenue model is under pressure."},{year:"2007",title:"The Maturity",desc:"Bonds mature and are repaid in full. Despite the downgrade, every bondholder got their principal back plus all coupon payments. Bowie, meanwhile, had his $55 million for a decade — and used it to buy back masters and fund new work."},{year:"2016",title:"The Legacy",desc:"Bowie passes away in January 2016. His estate retains full ownership of his catalogue — partly because the Bowie Bonds model let him buy back rights rather than sell them. The bonds proved that creative output could function as a financial asset."}].map((t,i)=>(
        <div key={i} style={{display:"flex",gap:0,borderBottom:i<4?`1px solid ${P.sand}`:undefined}}>
          <div style={{width:120,padding:"24px 0",flexShrink:0}}><M s={{fontSize:24,fontWeight:700,color:P.amber}}>{t.year}</M></div>
          <div style={{padding:"24px 0 24px 32px",borderLeft:`2px solid ${P.ink}`,paddingLeft:32}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:6}}>{t.title}</div>
            <div style={{fontSize:14,color:P.inkMid,lineHeight:1.6,maxWidth:600}}>{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </Sec>
  <Sec dark>
    <H2 c={P.cream}>What Bowie Bonds proved</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:24}}>
      {[["Creative output has financial value","A song isn't just art — it generates measurable, recurring revenue. That revenue stream can be the basis for financial instruments."],["You don't have to sell to monetise","Bowie didn't sell his catalogue. He borrowed against it. He kept ownership, got liquidity, and bought back even more rights."],["Revenue-backed = risk-bounded","The bonds were backed by actual revenue, not speculation. When the music industry changed, the bonds still paid out — just with more stress."],["Scale matters less than structure","Bowie was a superstar, but the structure works at any scale. The key ingredients are: predictable revenue, transparent reporting, and aligned incentives."]].map(([t,d],i)=><div key={i}>
        <div style={{fontSize:16,fontWeight:700,color:P.cream,marginBottom:6}}>{t}</div>
        <div style={{fontSize:13,color:P.inkLight,lineHeight:1.6}}>{d}</div>
      </div>)}
    </div>
  </Sec>
  <Sec>
    <div style={{border:`2px solid ${P.ink}`,padding:36}}>
      <H2>From Bowie Bonds to ZiggyDust</H2>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:24,marginTop:24,alignItems:"start"}}>
        <div>
          <M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:12}}>Bowie Bonds (1997)</M>
          {["$55M single issue","25 albums, 287 songs","Prudential (institutional)","10-year maturity","7.9% annual coupon","Traditional securitisation"].map((t,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${P.sand}`,fontSize:13,color:P.inkMid}}>{t}</div>)}
        </div>
        <div style={{display:"flex",alignItems:"center",paddingTop:32}}><M s={{fontSize:24,color:P.amber}}>→</M></div>
        <div>
          <M s={{fontSize:10,color:P.amber,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:12}}>ZiggyDust (2026)</M>
          {[`${fmt(500)}–${fmt(2500)} per drop`,"1 video per drop","Individual backers","4–8 month tenor","Revenue share on uplift","Platform-facilitated, no custody"].map((t,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${P.sand}`,fontSize:13,fontWeight:600}}>{t}</div>)}
        </div>
      </div>
      <div style={{marginTop:24,padding:16,background:P.amberFaint,border:`1px solid ${P.amber}40`,fontSize:14,lineHeight:1.6}}>
        <strong>Same DNA, different organism.</strong> Bowie Bonds proved the concept at institutional scale. ZiggyDust applies the same logic — revenue-backed, time-bounded, transparent — to independent artists and individual backers. No banks. No intermediaries. Just music, ads, and math.
      </div>
    </div>
  </Sec>
</div>;
// ══════════════════════════════════════════════════════
// HOW IT WORKS
// ══════════════════════════════════════════════════════
const How = ({setAuth}) => <div>
  <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>The Mechanics</M><H1>How It Works</H1><Sub>Four steps. Artist creates, backers fund, ads deploy, revenue flows.</Sub></Sec>
  {[{n:"01",t:"Artist creates a drop",bg:false,items:["Upload your YouTube video link and connect via OAuth",`Set your total budget (e.g. ${fmt(1500)})`,`Put in your co-pay — minimum 20% of budget (e.g. ${fmt(300)})`,"Set backer terms: revenue share %, return cap, tenor, minimum ticket size","Your co-pay goes into the Lockbox first — you eat before backers do","One active drop per artist at a time — complete or close your current drop before creating a new one"]},
    {n:"02",t:"Backers loan funds",bg:true,items:["Browse live drops — see artist profiles, YouTube stats (OAuth-verified), and terms","Every backer has a mandatory LinkedIn profile — real people only","Loan funds to drops you believe in. Your money is a performance-linked loan to the artist","See who else is backing — full Backer Wall with names, LinkedIn, track records","Once the goal is hit, the drop goes live"]},
    {n:"03",t:"Ads deploy to YouTube",bg:false,items:["Lockbox funds are released exclusively to Google Ads","Pre-roll, discovery, Shorts — all YouTube ad formats","Every deployment tracked: spend, impressions, views, CTR","Google Ads invoice references visible to all backers","Zero discretion — the money can only become ads for this specific video"]},
    {n:"04",t:"Interest flows back",bg:true,items:["Channel-wide YouTube AdSense revenue tracked via OAuth API — daily","Baseline established: 30-day channel average before campaign launch","Only incremental uplift above baseline counts — including cross-views to older content","Artist repays loan principal first, then pays interest (share % of channel uplift) monthly","Obligation ends when cap is hit (e.g. 1.5x) or tenor expires — whichever comes first"]}
  ].map((s,i)=><Sec key={i} dark={s.bg}>
    <div style={{display:"flex",gap:48,alignItems:"flex-start"}}>
      <div style={{flexShrink:0}}><M s={{fontSize:56,fontWeight:700,color:P.amber}}>{s.n}</M></div>
      <div style={{flex:1}}>
        <div style={{fontSize:28,fontWeight:700,color:s.bg?P.cream:P.ink,marginBottom:20}}>{s.t}</div>
        {s.items.map((item,j)=><div key={j} style={{display:"flex",gap:12,marginBottom:10,fontSize:14,color:s.bg?P.inkLight:P.inkMid,lineHeight:1.6}}>
          <M s={{color:P.amber,flexShrink:0}}>→</M>{item}
        </div>)}
      </div>
    </div>
  </Sec>)}
  <Sec><div style={{textAlign:"center"}}><H2>Convinced?</H2><Sub c={P.inkMid}>Join as an artist or a backer.</Sub><button onClick={()=>setAuth("signup")} style={{marginTop:24,padding:"14px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>Sign Up</button></div></Sec>
</div>;

// ══════════════════════════════════════════════════════
// FOR ARTISTS
// ══════════════════════════════════════════════════════
const Artists = ({setAuth}) => <div>
  <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>For Artists</M><H1>Get your music<br/><em style={{color:P.amber}}>heard.</em></H1><Sub>You've made something great. Now it needs ears. ZiggyDust funds YouTube promotion for your release — backed by people who believe in your sound.</Sub></Sec>
  <Sec dark>
    <H2 c={P.cream}>What you need</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,marginTop:24,border:`2px solid ${P.inkMid}`}}>
      {[{t:"YouTube Partner Program",d:"Active monetisation on your channel. We verify via OAuth — no self-reporting."},{t:"A release to promote",d:"One video per drop, one active drop at a time. Could be a single, EP track, music video, lyric video — anything on YouTube."},{t:"20% co-pay",d:"You put in at least 20% of the budget. First-in, first-loss. This is your skin in the game."},{t:"LinkedIn profile",d:"Real identity required. Your backers can see you. You can see them."},{t:"Revenue share terms",d:"You decide: what % of uplift, what cap (e.g. 1.5x), what tenor (e.g. 6 months). You set the deal."},{t:"Google Ads account",d:"You need a verified Google Ads account. This is where the lockbox funds deploy to."}].map((s,i)=><div key={i} style={{padding:"20px 24px",borderRight:(i%3)<2?`1px solid ${P.inkMid}`:undefined,borderBottom:i<3?`1px solid ${P.inkMid}`:undefined}}>
        <div style={{fontSize:15,fontWeight:700,color:P.cream,marginBottom:6}}>{s.t}</div>
        <div style={{fontSize:13,color:P.inkLight,lineHeight:1.5}}>{s.d}</div>
      </div>)}
    </div>
  </Sec>
  <Sec>
    <H2>What you keep</H2>
    <div style={{marginTop:20,fontSize:15,lineHeight:1.8,color:P.inkMid,maxWidth:600}}>
      <div style={{marginBottom:12}}><strong style={{color:P.ink}}>Your rights.</strong> ZiggyDust never touches your IP. No licence transfers, no ownership changes, no creative control.</div>
      <div style={{marginBottom:12}}><strong style={{color:P.ink}}>Your revenue above the share.</strong> After backers get their cut of the uplift, everything else is yours.</div>
      <div style={{marginBottom:12}}><strong style={{color:P.ink}}>Your relationship with fans.</strong> Backers are music people — investors, producers, fellow musicians. They're your community, not your creditors.</div>
      <div><strong style={{color:P.ink}}>Your freedom.</strong> Once cap is hit or tenor expires, you're done. No ongoing obligations.</div>
    </div>
    <button onClick={()=>setAuth("signup")} style={{marginTop:32,padding:"14px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>Create your first drop</button>
  </Sec>
</div>;

// ══════════════════════════════════════════════════════
// FOR BACKERS
// ══════════════════════════════════════════════════════
const Backers = ({setAuth}) => <div>
  <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>For Backers</M><H1>Back the music<br/>you <em style={{color:P.amber}}>believe in.</em></H1><Sub>Loan funds for YouTube promotion of independent artists. Earn interest tied to campaign performance. See exactly where your money goes.</Sub></Sec>
  <Sec dark>
    <H2 c={P.cream}>What you get</H2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:24}}>
      {[["Interest on your loan","Your funds are a performance-linked loan. You earn interest as a percentage of the incremental channel-wide YouTube revenue above the pre-campaign baseline — including cross-views to older content. Principal is repaid first."],["Capped returns","Every drop has a return cap (e.g. 1.5x or 2.0x). This bounds your interest but also clarifies the deal."],["Full transparency","OAuth-verified YouTube stats, Google Ads receipts with invoice numbers, monthly payout reports. You see everything."],["Real people, real identities","Every artist has a LinkedIn profile and verified YouTube channel. You know exactly who you're backing and what their track record looks like."]].map(([t,d],i)=><div key={i}>
        <div style={{fontSize:16,fontWeight:700,color:P.cream,marginBottom:6}}>{t}</div>
        <div style={{fontSize:13,color:P.inkLight,lineHeight:1.6}}>{d}</div>
      </div>)}
    </div>
  </Sec>
  <Sec>
    <H2>The risks — plainly stated</H2>
    <div style={{border:`2px solid ${P.red}`,padding:28,marginTop:20}}>
      {[["Total loss is possible","If the YouTube ads don't generate uplift above baseline, your loan may not be repaid. This is not a guaranteed return."],["Revenue depends on external factors","YouTube algorithm changes, ad market fluctuations, audience behaviour — none of these are in anyone's control."],["Artist default risk","If an artist stops repaying the loan, enforcement is through platform exclusion and public record — not through courts. There's no repo man for music."],["This is not a security","ZiggyDust is a platform facilitator. Your funds are a performance-linked loan to the artist — not an equity stake, not a royalty purchase. We don't hold your money."]].map(([t,d],i)=><div key={i} style={{marginBottom:i<3?16:0,paddingBottom:i<3?16:0,borderBottom:i<3?`1px solid ${P.sand}`:undefined}}>
        <div style={{fontSize:15,fontWeight:700,color:P.red,marginBottom:4}}>{t}</div>
        <div style={{fontSize:13,color:P.inkMid,lineHeight:1.6}}>{d}</div>
      </div>)}
    </div>
    <button onClick={()=>setAuth("signup")} style={{marginTop:32,padding:"14px 32px",border:`2px solid ${P.ink}`,background:P.ink,color:P.cream,fontFamily:"monospace",fontSize:13,fontWeight:600,cursor:"pointer",textTransform:"uppercase"}}>Start backing</button>
  </Sec>
</div>;

// ══════════════════════════════════════════════════════
// THE ECONOMICS
// ══════════════════════════════════════════════════════
const Economics = () => <div>
  <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>Deep Dive</M><H1>The Economics</H1><Sub>How YouTube ad revenue works, what uplift means, and realistic return scenarios.</Sub></Sec>
  <Sec dark>
    <H2 c={P.cream}>How YouTube AdSense works</H2>
    <div style={{marginTop:20,fontSize:14,color:P.inkLight,lineHeight:1.7,maxWidth:650}}>
      <p style={{marginBottom:16}}>When a monetised video plays an ad, the creator earns revenue. YouTube takes ~45% and the creator keeps ~55%. Revenue is measured as RPM (Revenue Per Mille) — how much you earn per 1,000 views.</p>
      <p style={{marginBottom:16}}>Music content typically generates RPMs between $0.25–$4.00, depending on the audience, genre, and ad market conditions. An artist with 10,000 daily views at $2.00 RPM earns roughly $20/day or $600/month.</p>
      <p>ZiggyDust tracks this revenue through YouTube's Analytics API, authenticated via OAuth. The artist grants read-only access. We observe, we don't touch.</p>
    </div>
  </Sec>
  <Sec>
    <H2>The baseline</H2>
    <div style={{fontSize:14,color:P.inkMid,lineHeight:1.7,maxWidth:650,marginTop:12}}>
      <p style={{marginBottom:16}}>Before a drop goes live, we compute the artist's baseline: the average daily channel-wide YouTube AdSense revenue over the 30 days before campaign activation. This is the "before" number.</p>
      <p>Only channel-wide revenue above this baseline counts as uplift — this captures cross-views and discovery of older content driven by the campaign. If an artist's channel was earning $5/day before the campaign and earns $12/day during, the uplift is $7/day. Backers get their share of the $7 — not the full $12.</p>
    </div>
  </Sec>
  <Sec dark>
    <H2 c={P.cream}>Scenario modelling</H2>
    <div style={{border:`2px solid ${P.inkMid}`,marginTop:24}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`2px solid ${P.inkMid}`}}>
        <div style={{padding:"16px 20px",borderRight:`1px solid ${P.inkMid}`}}><M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em"}}>Conservative</M></div>
        <div style={{padding:"16px 20px",borderRight:`1px solid ${P.inkMid}`}}><M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em"}}>Base Case</M></div>
        <div style={{padding:"16px 20px"}}><M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em"}}>Optimistic</M></div>
      </div>
      {[["Budget",fmt(1000),fmt(1000),fmt(1000)],["Co-pay (20%)",fmt(200),fmt(200),fmt(200)],["Backer pool",fmt(800),fmt(800),fmt(800)],["Daily uplift",fmt(2),fmt(5),fmt(12)],["Monthly uplift",fmt(60),fmt(150),fmt(360)],["Rev share (25%)",fmt(15)+"/mo",fmt(37.5)+"/mo",fmt(90)+"/mo"],["Cap (1.5x)",fmt(1200),fmt(1200),fmt(1200)],["Time to cap","80 months","32 months","13 months"],["Tenor (6mo) payout",fmt(90),fmt(225),fmt(540)],["Backer return","0.11x ⚠️","0.28x","0.68x"]].map((row,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${P.inkMid}`}}>
        {row.slice(0).map((cell,j)=><div key={j} style={{padding:"10px 20px",borderRight:j<2?`1px solid ${P.inkMid}`:undefined,fontFamily:j>0?"monospace":undefined,fontSize:j===0?13:12,fontWeight:j===0?600:400,color:j===0?P.cream:cell.includes("⚠️")?P.red:P.inkLight}}>{cell}</div>)}
      </div>)}
    </div>
    <div style={{marginTop:20,padding:16,border:`1px solid ${P.inkMid}`,fontSize:13,color:P.inkLight,lineHeight:1.6}}>
      <strong style={{color:P.cream}}>Key insight:</strong> In a 6-month tenor, only the optimistic scenario approaches cap. Most drops will return a fraction of the cap. Backers should think of this as supporting music with a potential upside — not as an investment with expected returns.
    </div>
  </Sec>
  <Sec>
    <H2>The waterfall</H2>
    <div style={{marginTop:20,border:`2px solid ${P.ink}`}}>
      {[{n:"1",t:"Escrow admin costs",d:"Any fees for maintaining the lockbox account. Typically minimal."},{n:"2",t:"Loan principal",d:"Before any interest, backers get their original loan amount returned first."},{n:"3",t:"Interest (revenue share)",d:"After principal is repaid, the revenue share continues as interest until cap or tenor expiry."},{n:"4",t:"Artist retains remainder",d:"Everything above the backer share stays with the artist. Their music, their revenue."}].map((s,i)=><div key={i} style={{display:"flex",borderBottom:i<3?`1px solid ${P.sand}`:undefined}}>
        <div style={{width:60,padding:16,display:"flex",alignItems:"center",justifyContent:"center",borderRight:`1px solid ${P.sand}`}}><M s={{fontSize:20,fontWeight:700,color:P.amber}}>{s.n}</M></div>
        <div style={{padding:"14px 20px",flex:1}}><div style={{fontSize:15,fontWeight:700,marginBottom:4}}>{s.t}</div><div style={{fontSize:13,color:P.inkMid}}>{s.d}</div></div>
      </div>)}
    </div>
  </Sec>
</div>;

// ══════════════════════════════════════════════════════
// TRUST ARCHITECTURE
// ══════════════════════════════════════════════════════
const Trust = () => <div>
  <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>Design Philosophy</M><H1>Trust<br/>Architecture</H1><Sub>Every design decision on ZiggyDust is a trust decision. Here's why we built it this way.</Sub></Sec>
  {[{t:"Mandatory LinkedIn",why:"Anonymous money creates bad incentives. When everyone is a real person with a real professional reputation, behaviour changes. You don't stiff someone whose LinkedIn you can see.",how:"LinkedIn URL required at signup. Displayed on Backer Wall and Artist profiles. Clickable links — full transparency."},
    {t:"YouTube OAuth (read-only)",why:"Self-reported numbers are meaningless. If an artist says they have 50K subscribers, you should be able to verify that. If they say their daily revenue is $20, you should see the API data.",how:"Artist connects YouTube via OAuth during signup. We pull subscriber count, total views, monthly views, channel age. Revenue data tracked daily. All read-only — we can't touch their channel."},
    {t:"The Lockbox",why:"Trust in money handling is the hardest problem. Our solution: we don't handle money. The lockbox is an escrow that can only release funds to a verified Google Ads account. No personal transfers. No withdrawals.",how:"Funds go in from artist co-pay and backers. Funds come out only as Google Ads deployments. Every deployment generates a receipt with Google invoice reference, impressions, views, CTR."},
    {t:"20% artist co-pay",why:"If someone asks you to fund their promotion but won't put their own money in, that's a red flag. The 20% minimum co-pay ensures the artist has genuine skin in the game — and it's first-in, first-loss.",how:"Enforced at drop creation. Cannot submit with less than 20%. Displayed prominently on every drop. Backers can see exactly how much the artist committed."},
    {t:"Track records",why:"Past behaviour predicts future behaviour. If an artist has completed 3 drops with 100% payback, that means something. If a backer has backed 5 drops, that means something too.",how:"Every completed drop updates the participant's track record. Visible on profiles and the Backer Wall. Includes: drops completed, payback rate, average uplift, average return."},
    {t:"Ad receipts",why:"'Your money became ads' is a claim. Receipts make it a fact. Every backer should be able to see exactly how their funds were deployed, down to the Google Ads invoice number.",how:"Displayed on every active drop. Columns: date, ad type, spend, impressions, views, CTR, Google reference. Totals at bottom. Updated after each deployment."},
  ].map((s,i)=><Sec key={i} dark={i%2===1}>
    <div style={{display:"flex",gap:48}}>
      <div style={{width:40,flexShrink:0}}><M s={{fontSize:24,fontWeight:700,color:P.amber}}>{String(i+1).padStart(2,"0")}</M></div>
      <div style={{flex:1}}>
        <H2 c={i%2===1?P.cream:P.ink}>{s.t}</H2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:16}}>
          <div><M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:8}}>Why</M><div style={{fontSize:14,color:i%2===1?P.inkLight:P.inkMid,lineHeight:1.6}}>{s.why}</div></div>
          <div><M s={{fontSize:9,color:P.amber,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:8}}>How</M><div style={{fontSize:14,color:i%2===1?P.inkLight:P.inkMid,lineHeight:1.6}}>{s.how}</div></div>
        </div>
      </div>
    </div>
  </Sec>)}
</div>;

// ══════════════════════════════════════════════════════
// FAQ
// ══════════════════════════════════════════════════════
const FAQ = () => {
  const [open,setOpen]=useState(null);
  const qs=[
    {c:"General",items:[
      ["What is ZiggyDust?","ZiggyDust is a platform that connects independent music artists with backers who loan funds for YouTube ad campaigns. Backers earn interest — a share of the incremental channel-wide YouTube AdSense revenue generated by the promotion. The platform facilitates the arrangement but does not hold funds or provide financial advice."],
      ["Is this like crowdfunding?","Not exactly. Crowdfunding (like Kickstarter) is donation or reward-based — you give money and get a t-shirt. ZiggyDust is a performance-linked loan — backers loan funds that go exclusively to YouTube ads, and earn interest from the revenue uplift those ads create. Principal is repaid first, then interest accrues. There's real risk of loss."],
      ["Is this a security?","ZiggyDust facilitates performance-linked loans between artists and backers. Backer funds are a loan — not an equity stake, not a royalty purchase. We are not a broker, exchange, or investment platform. However, the regulatory landscape is evolving. We recommend backers consult their own legal and financial advisors."],
    ]},
    {c:"For Artists",items:[
      ["What do I need to get started?","An active YouTube channel with YouTube Partner Program (monetisation enabled), a LinkedIn profile, a Google Ads account, and your co-pay (minimum 20% of your total campaign budget)."],
      ["Do I give up any rights to my music?","No. ZiggyDust never takes any ownership, licence, or control over your content. You retain full rights. The only obligation is the revenue share on incremental uplift for the duration of your drop's tenor."],
      ["What happens if the ads don't work?","If there's no uplift above your baseline, there's nothing to share. Backers may lose their entire commitment. Your co-pay has already been deployed as ads. There's no refund mechanism post-deployment."],
      ["What's the 20% co-pay?","You must contribute at least 20% of the total campaign budget from your own funds. This goes into the lockbox first and is deployed as ads first. It demonstrates genuine commitment and aligns your incentives with your backers."],
      ["Can I run multiple drops at once?","No. One active drop per artist at a time. Complete or close your current drop before creating a new one. This keeps you focused and gives backers confidence that your attention isn't split."],
    ]},
    {c:"For Backers",items:[
      ["How do I earn money?","Your funds are a performance-linked loan. The artist repays your principal first, then you earn interest — a percentage of the incremental channel-wide YouTube AdSense revenue above the pre-campaign baseline. This captures cross-views and discovery of older content. Paid monthly until your return cap is hit or the tenor expires."],
      ["Can I lose money?","Yes. If the YouTube ads don't generate sufficient uplift, your loan may not be fully repaid — potentially not at all. The artist's 20% co-pay is first-loss, but there's no guarantee of return."],
      ["How do I know my money becomes ads?","Every ad deployment is tracked with Google Ads invoice references, impression counts, view counts, and click-through rates. These receipts are visible on the drop page to all backers."],
      ["Who are the other backers?","Every backer has a mandatory LinkedIn profile. The Backer Wall on each drop shows all backers' names, LinkedIn profiles, professional headlines, and track records. Full transparency."],
    ]},
    {c:"Platform",items:[
      ["Does ZiggyDust hold my money?","No. ZiggyDust is a technology facilitator. Backer funds are a loan to the artist, not a deposit with us. Funds flow directly between participants and the escrow/lockbox. We have no custody at any point."],
      ["What happens if an artist defaults?","Default triggers include: missed monthly payments, YouTube OAuth revocation, content deletion, and misrepresentation. Consequences include platform exclusion, public disclosure on their track record, and late payment penalties. Optional conditional security licence provisions may apply."],
      ["What's the baseline and how is it calculated?","The baseline is the artist's average daily channel-wide YouTube AdSense revenue over the 30 days before the drop goes live. It's computed at launch and is non-disputable. Only channel-wide revenue above this baseline counts as uplift — capturing cross-views and discovery of older content driven by the campaign."],
    ]},
  ];
  return <div>
    <Sec><M s={{fontSize:10,color:P.inkMid,textTransform:"uppercase",letterSpacing:".15em",display:"block",marginBottom:12}}>Questions</M><H1>FAQ</H1><Sub>Plain answers to the questions you should be asking.</Sub></Sec>
    <Sec>{qs.map((cat,ci)=><div key={ci} style={{marginBottom:32}}>
      <M s={{fontSize:10,color:P.amber,textTransform:"uppercase",letterSpacing:".12em",display:"block",marginBottom:16}}>{cat.c}</M>
      {cat.items.map(([q,a],qi)=>{const key=`${ci}-${qi}`;return <div key={key} style={{border:`1.5px solid ${open===key?P.ink:P.sand}`,marginBottom:8,background:P.white,transition:"border-color .2s"}}>
        <button onClick={()=>setOpen(open===key?null:key)} style={{width:"100%",padding:"14px 20px",border:"none",background:"transparent",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",textAlign:"left"}}>
          <span style={{fontSize:15,fontWeight:600,color:P.ink}}>{q}</span>
          <M s={{fontSize:18,color:P.amber,flexShrink:0,marginLeft:12}}>{open===key?"−":"+"}</M>
        </button>
        {open===key&&<div style={{padding:"0 20px 16px",fontSize:14,color:P.inkMid,lineHeight:1.6,borderTop:`1px solid ${P.sand}`,paddingTop:14}}>{a}</div>}
      </div>;})}
    </div>)}</Sec>
  </div>;
};

// ══════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════
export default function App() {
  const [page,setPage]=useState("home");
  const [auth,setAuth]=useState(null);
  const [cur,setCur]=useState("USD");
  _cur = cur;
  const pages={home:<Home setPage={setPage} setAuth={setAuth}/>,how:<How setAuth={setAuth}/>,artists:<Artists setAuth={setAuth}/>,backers:<Backers setAuth={setAuth}/>,bowie:<Bowie setPage={setPage}/>,economics:<Economics/>,trust:<Trust/>,faq:<FAQ/>};
  return <div style={{minHeight:"100vh",background:P.bg,color:P.ink,fontFamily:"system-ui,sans-serif"}}>
    <Nav page={page} setPage={setPage} setAuth={setAuth} cur={cur} setCur={setCur}/>
    <div>{pages[page]||pages.home}</div>
    <Footer setPage={setPage}/>
    {auth&&<AuthModal mode={auth} setAuth={setAuth}/>}
  </div>;
}
