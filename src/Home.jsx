import { useState, useEffect, useRef } from "react";

const IMG = {
  heroDoctor: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  heroTech:   "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
  about1:     "https://images.unsplash.com/photo-1588776814546-1ffbb56b69ea?w=500&q=80",
  about2:     "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=500&q=80",
  av1:        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=80&q=80",
  av2:        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&q=80",
  av3:        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&q=80",
  av4:        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&q=80",
  case1:      "https://images.unsplash.com/photo-1588776814546-1ffbb56b69ea?w=500&q=80",
  case2:      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=500&q=80",
  case3:      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&q=80",
  case4:      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80",
  case5:      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
  case6:      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&q=80",
  apptThumb:  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=80",
  docCTA:     "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
  blog1:      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=700&q=80",
  blog2:      "https://images.unsplash.com/photo-1588776814546-1ffbb56b69ea?w=700&q=80",
  testi1:     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
};

const YT_ID = "FV6b5UZ4-50";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#1a2e3b;overflow-x:hidden;}

:root{
  --teal:#00b4c8;--teal-dark:#0d6e7a;
  --navy:#0d1f2d;--bg-light:#f0fbfd;
  --text:#1a2e3b;--muted:#5a7080;--r:20px;
  --px:64px;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes blobMorph{
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
  25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}
  50%{border-radius:50% 60% 30% 70%/40% 50% 60% 50%}
  75%{border-radius:70% 30% 60% 40%/60% 40% 50% 60%}
}
@keyframes pulseRing{
  0%{transform:translate(-50%,-50%) scale(.85);opacity:.7}
  50%{transform:translate(-50%,-50%) scale(1.18);opacity:.2}
  100%{transform:translate(-50%,-50%) scale(.85);opacity:.7}
}
@keyframes dotBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes menuSlide{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}

/* ── SCROLL REVEAL ── */
.rv{opacity:0;transform:translateY(32px);transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1);}
.rvL{opacity:0;transform:translateX(-40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.rvR{opacity:0;transform:translateX(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.rv.on,.rvL.on,.rvR.on{opacity:1;transform:none;}
.d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}

/* ═══════════════════════════════
   NAV
═══════════════════════════════ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:300;
  display:flex;align-items:center;justify-content:space-between;
  padding:16px var(--px);
  background:rgba(255,255,255,.95);backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(0,180,200,.1);
  transition:box-shadow .3s;
}
.nav.scrolled{box-shadow:0 4px 32px rgba(0,100,120,.1);}
.nav-logo{display:flex;align-items:center;gap:10px;font-family:'Playfair Display',serif;font-size:21px;font-weight:800;color:var(--teal-dark);cursor:pointer;flex-shrink:0;}
.nav-logo-icon{width:38px;height:38px;background:linear-gradient(135deg,var(--teal),var(--teal-dark));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.nav-links{display:flex;gap:28px;}
.nav-links a{text-decoration:none;color:var(--text);font-size:14px;font-weight:500;cursor:pointer;transition:color .2s;}
.nav-links a:hover{color:var(--teal);}
.nav-cta{background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:11px 22px;border-radius:50px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,180,200,.35);}
/* Hamburger */
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;z-index:301;}
.hamburger span{display:block;width:24px;height:2.5px;background:var(--teal-dark);border-radius:3px;transition:all .3s;}
.hamburger.open span:nth-child(1){transform:translateY(7.5px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;}
.hamburger.open span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg);}
/* Mobile menu */
.mobile-menu{
  display:none;position:fixed;top:70px;left:0;right:0;z-index:299;
  background:rgba(255,255,255,.98);backdrop-filter:blur(20px);
  padding:24px var(--px);
  border-bottom:1px solid rgba(0,180,200,.12);
  flex-direction:column;gap:4px;
  animation:menuSlide .25s ease both;
  box-shadow:0 12px 40px rgba(0,0,0,.1);
}
.mobile-menu.show{display:flex;}
.mobile-menu a{text-decoration:none;color:var(--text);font-size:16px;font-weight:500;padding:12px 0;border-bottom:1px solid rgba(0,180,200,.08);cursor:pointer;transition:color .2s;}
.mobile-menu a:last-of-type{border-bottom:none;}
.mobile-menu a:hover{color:var(--teal);}
.mobile-cta{margin-top:16px;background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:14px;border-radius:50px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;width:100%;}

/* ═══════════════════════════════
   HERO
═══════════════════════════════ */
.hero{
  min-height:100vh;padding:120px var(--px) 60px;
  background:linear-gradient(155deg,#b2f0f8 0%,#7ae3ef 35%,#2ecde0 70%,#0bb3c6 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.hero-blob{position:absolute;width:520px;height:520px;background:rgba(255,255,255,.17);animation:blobMorph 9s ease-in-out infinite;top:-110px;right:-110px;}
.hero-blob2{position:absolute;width:360px;height:360px;background:rgba(255,255,255,.12);animation:blobMorph 11s ease-in-out infinite reverse;bottom:30px;left:-80px;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(44px,8.5vw,118px);font-weight:900;color:#fff;text-align:center;line-height:.95;letter-spacing:-2px;position:relative;z-index:1;animation:fadeUp .9s cubic-bezier(.22,1,.36,1) both;}
.tooth-circle{display:inline-flex;align-items:center;justify-content:center;width:clamp(60px,9vw,115px);height:clamp(60px,9vw,115px);background:#fff;border-radius:50%;border:3px dashed rgba(0,180,200,.45);vertical-align:middle;margin:0 8px;animation:float 3.2s ease-in-out infinite;position:relative;top:-4px;}
.tooth-circle img{width:62%;height:62%;object-fit:contain;}
.hero-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:1020px;margin-top:48px;position:relative;z-index:1;animation:fadeUp .9s .35s cubic-bezier(.22,1,.36,1) both;}
.hcard{background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-radius:var(--r);padding:26px;border:1px solid rgba(255,255,255,.65);transition:transform .3s,box-shadow .3s;}
.hcard:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,100,120,.16);}
.hcard-title{font-size:16px;font-weight:700;color:var(--teal-dark);margin-bottom:5px;}
.hcard-sub{font-size:12.5px;color:var(--muted);margin-bottom:16px;}
.info-row{display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(0,180,200,.2);border-radius:13px;margin-bottom:9px;}
.info-row:last-child{margin-bottom:0;}
.info-icon{width:34px;height:34px;background:rgba(0,180,200,.1);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.info-text strong{display:block;font-size:13px;font-weight:700;color:var(--text);}
.info-text span{font-size:12px;color:var(--muted);}
.chat-bubble{background:rgba(0,0,0,.07);border-radius:18px 18px 18px 4px;padding:9px 15px;font-size:13px;color:var(--text);display:inline-block;margin-bottom:10px;}
.chat-dots{display:flex;gap:5px;padding:4px 0;}
.dot{width:8px;height:8px;background:var(--teal);border-radius:50%;animation:dotBounce 1s ease-in-out infinite;}
.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}
.hero-tech-desc{font-size:12.5px;color:var(--muted);line-height:1.65;margin-bottom:16px;}
.find-btn{width:100%;background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:13px;border-radius:50px;font-size:13px;font-weight:700;cursor:pointer;transition:opacity .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.find-btn:hover{opacity:.86;}

/* ═══════════════════════════════
   MARQUEE
═══════════════════════════════ */
.marquee-wrap{background:var(--navy);padding:20px 0;overflow:hidden;}
.marquee-track{display:flex;animation:marquee 20s linear infinite;white-space:nowrap;}
.m-item{display:inline-flex;align-items:center;gap:18px;padding:0 28px;font-size:21px;font-weight:700;color:#fff;letter-spacing:-.3px;}
.m-star{color:var(--teal);font-size:18px;}

/* ═══════════════════════════════
   SHARED
═══════════════════════════════ */
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,180,200,.14);border:1px solid rgba(0,180,200,.3);color:var(--teal);padding:7px 16px;border-radius:50px;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:18px;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(30px,3.8vw,50px);font-weight:800;line-height:1.15;margin-bottom:18px;}
.sec-title.light{color:#fff;}
.sec-title.dark{color:var(--text);}
.sec-desc{font-size:14.5px;line-height:1.75;margin-bottom:28px;}
.sec-desc.light{color:rgba(255,255,255,.58);}
.sec-desc.dark{color:var(--muted);}
.teal-btn{background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:13px 26px;border-radius:50px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:9px;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.teal-btn:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(0,180,200,.38);}

/* ═══════════════════════════════
   ABOUT
═══════════════════════════════ */
.about{background:var(--navy);padding:96px var(--px);}
.about-inner{display:flex;gap:64px;align-items:flex-start;max-width:1200px;margin:0 auto;}
.about-left{flex:1;}
.about-right{flex:1;}
.stats-top{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;margin-bottom:14px;}
.avatars{display:flex;}
.av{width:40px;height:40px;border-radius:50%;border:2.5px solid var(--navy);overflow:hidden;margin-left:-10px;flex-shrink:0;}
.av:first-child{margin-left:0;}
.av img{width:100%;height:100%;object-fit:cover;}
.stat-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:20px 24px;transition:background .3s;}
.stat-box:hover{background:rgba(0,180,200,.12);}
.stat-num{font-family:'Playfair Display',serif;font-size:40px;font-weight:900;color:var(--teal);}
.stat-lbl{color:rgba(255,255,255,.45);font-size:13px;margin-top:2px;}
.stats-right-col{display:flex;flex-direction:column;gap:12px;}
.about-photos{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px;}
.aph{border-radius:16px;overflow:hidden;height:190px;}
.aph img{width:100%;height:100%;object-fit:cover;transition:transform .45s;}
.aph:hover img{transform:scale(1.06);}

/* ═══════════════════════════════
   SERVICES
═══════════════════════════════ */
.services{padding:96px var(--px);background:var(--bg-light);}
.services-head{text-align:center;margin-bottom:56px;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1060px;margin:0 auto;}
.svc-card{background:#fff;border-radius:var(--r);padding:38px 28px;text-align:center;border:1.5px solid rgba(0,180,200,.1);transition:transform .3s,box-shadow .3s,border-color .3s;cursor:pointer;}
.svc-card:hover{transform:translateY(-8px);box-shadow:0 22px 50px rgba(0,100,120,.11);border-color:var(--teal);}
.svc-card.feat{background:linear-gradient(160deg,#e6fafb,#cdf4f7);border-color:var(--teal);transform:translateY(-14px);box-shadow:0 22px 55px rgba(0,180,200,.18);}
.svc-card.feat:hover{transform:translateY(-18px);}
.svc-icon{width:70px;height:70px;margin:0 auto 22px;background:linear-gradient(135deg,rgba(0,180,200,.13),rgba(0,180,200,.04));border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:32px;}
.svc-name{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--text);margin-bottom:11px;}
.svc-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:22px;}
.more-link{color:var(--teal);font-size:13px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:gap .2s;}
.more-link:hover{gap:11px;}

/* ═══════════════════════════════
   CASES
═══════════════════════════════ */
.cases{padding:96px var(--px);background:var(--navy);}
.cases-inner{display:flex;gap:56px;align-items:flex-start;max-width:1200px;margin:0 auto;}
.cases-left{flex:0 0 280px;}
.cases-desc{color:rgba(255,255,255,.54);font-size:14px;line-height:1.75;margin-bottom:26px;}
.cases-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.case-card{position:relative;border-radius:16px;overflow:hidden;cursor:pointer;}
.case-card img{width:100%;height:190px;object-fit:cover;transition:transform .4s;display:block;}
.case-card:hover img{transform:scale(1.07);}
.case-overlay{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;background:linear-gradient(to top,rgba(0,0,0,.72),transparent);color:#fff;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:space-between;}
.case-arrow{width:28px;height:28px;background:var(--teal);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}

/* ═══════════════════════════════
   APPOINTMENT
═══════════════════════════════ */
.appt{padding:96px var(--px);background:linear-gradient(140deg,#e2f9fc,#c4f0f4);}
.appt-inner{display:grid;grid-template-columns:1fr 1.1fr;gap:52px;align-items:center;max-width:1100px;margin:0 auto;}
.appt-media{position:relative;border-radius:24px;overflow:hidden;height:470px;cursor:pointer;}
.appt-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s;}
.appt-media:hover img{transform:scale(1.03);}
.play-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;}
.play-ring{position:absolute;top:50%;left:50%;width:82px;height:82px;border:2px solid rgba(255,255,255,.5);border-radius:50%;animation:pulseRing 2s ease-in-out infinite;}
.play-btn2{width:64px;height:64px;background:#fff;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 8px 26px rgba(0,0,0,.22);position:relative;z-index:3;transition:transform .2s;}
.play-btn2:hover{transform:scale(1.1);}
.appt-form{background:#fff;border-radius:24px;padding:36px;box-shadow:0 20px 60px rgba(0,100,120,.1);}
.form-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,180,200,.1);color:var(--teal);padding:7px 15px;border-radius:50px;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:14px;}
.form-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:var(--text);margin-bottom:24px;}
.frow{display:grid;gap:10px;margin-bottom:10px;}
.frow.c3{grid-template-columns:1fr 1fr 1fr;}
.fi{padding:11px 15px;border:1.5px solid #daeef1;border-radius:12px;font-size:13px;color:var(--text);background:#f6fbfc;outline:none;transition:border-color .2s;font-family:'Plus Jakarta Sans',sans-serif;width:100%;}
.fi:focus{border-color:var(--teal);}
.fi::placeholder{color:#a0b8be;}
.ftx{padding:11px 15px;border:1.5px solid #daeef1;border-radius:12px;font-size:13px;color:var(--text);background:#f6fbfc;outline:none;resize:vertical;min-height:90px;width:100%;font-family:'Plus Jakarta Sans',sans-serif;transition:border-color .2s;}
.ftx:focus{border-color:var(--teal);}
.fterms{font-size:12px;color:var(--muted);margin:10px 0 14px;}
.sub-btn{background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:10px;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.sub-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,180,200,.4);}

/* YOUTUBE MODAL */
.yt-modal{position:fixed;inset:0;background:rgba(0,0,0,.84);z-index:999;display:flex;align-items:center;justify-content:center;animation:fadeIn .25s ease;padding:20px;}
.yt-inner{position:relative;width:min(860px,100%);aspect-ratio:16/9;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);}
.yt-inner iframe{width:100%;height:100%;border:none;display:block;}
.yt-close{position:absolute;top:-42px;right:0;background:none;border:none;color:#fff;font-size:30px;cursor:pointer;line-height:1;}

/* ═══════════════════════════════
   TESTIMONIALS
═══════════════════════════════ */
.testi{padding:96px var(--px);background:var(--bg-light);}
.testi-head{text-align:center;margin-bottom:56px;}
.testi-inner{display:grid;grid-template-columns:1fr 1.8fr;gap:32px;align-items:center;max-width:940px;margin:0 auto;}
.rating-box{background:#fff;border-radius:24px;padding:32px;text-align:center;box-shadow:0 10px 40px rgba(0,100,120,.08);}
.rating-lbl{font-size:12.5px;color:var(--muted);margin-bottom:6px;}
.rating-big{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:var(--text);line-height:1;}
.stars{font-size:20px;margin:8px 0;letter-spacing:2px;}
.review-cnt{font-size:12px;color:var(--muted);}
.arr-row{display:flex;gap:10px;justify-content:center;margin-top:20px;}
.arr{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:17px;transition:transform .2s;}
.arr.prev{background:var(--navy);color:#fff;}
.arr.next{background:var(--teal);color:#fff;}
.arr:hover{transform:scale(1.1);}
.quote-box{background:#fff;border-radius:24px;padding:36px;box-shadow:0 10px 40px rgba(0,100,120,.08);}
.quote-tag{font-size:13px;color:var(--teal);font-weight:700;margin-bottom:14px;}
.quote-body{font-family:'Playfair Display',serif;font-size:17px;line-height:1.75;color:var(--text);margin-bottom:22px;}
.quote-author{display:flex;align-items:center;gap:12px;}
.qa-img{width:46px;height:46px;border-radius:50%;object-fit:cover;flex-shrink:0;}
.qa-name{font-weight:700;font-size:14px;}
.qa-role{font-size:12px;color:var(--muted);}

/* ═══════════════════════════════
   CTA BANNER
═══════════════════════════════ */
.cta-wrap{padding:0 var(--px) 60px;background:#fff;}
.cta-banner{border-radius:28px;background:linear-gradient(135deg,var(--teal) 0%,var(--teal-dark) 100%);padding:52px 56px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;gap:24px;}
.cta-banner::before{content:'';position:absolute;right:-70px;top:-70px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.08);}
.cta-banner::after{content:'';position:absolute;left:-40px;bottom:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.06);}
.cta-left{position:relative;z-index:1;flex:1;}
.cta-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.32);color:#fff;padding:7px 16px;border-radius:50px;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:14px;}
.cta-title{font-family:'Playfair Display',serif;font-size:clamp(26px,3.2vw,42px);font-weight:800;color:#fff;line-height:1.2;}
.cta-sub{color:rgba(255,255,255,.72);font-size:14px;line-height:1.7;margin-top:12px;max-width:420px;}
.cta-right{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-end;gap:20px;flex-shrink:0;}
.cta-contact{background:#fff;color:var(--teal-dark);border:none;padding:13px 26px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:9px;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;}
.cta-contact:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.22);}
.doc-wrap{position:relative;display:inline-block;}
.doc-img{width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,.4);display:block;}
.hello-tag{position:absolute;top:-8px;right:-14px;background:#fff;color:var(--text);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.1);white-space:nowrap;}
.talk-tag{position:absolute;bottom:10px;right:-70px;background:var(--navy);color:#fff;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;white-space:nowrap;}

/* ═══════════════════════════════
   BLOG
═══════════════════════════════ */
.blog{padding:96px var(--px);background:#fff;}
.blog-head{text-align:center;margin-bottom:56px;}
.blog-grid{display:grid;grid-template-columns:1fr 1fr;gap:26px;max-width:940px;margin:0 auto 38px;}
.blog-card{border-radius:20px;overflow:hidden;border:1.5px solid rgba(0,180,200,.1);cursor:pointer;transition:transform .3s,box-shadow .3s;}
.blog-card:hover{transform:translateY(-6px);box-shadow:0 22px 50px rgba(0,100,120,.1);}
.blog-thumb{height:220px;overflow:hidden;position:relative;}
.blog-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .45s;display:block;}
.blog-card:hover .blog-thumb img{transform:scale(1.06);}
.blog-tag2{position:absolute;top:14px;left:14px;background:#fff;color:var(--teal-dark);padding:4px 12px;border-radius:50px;font-size:11px;font-weight:700;}
.blog-body{padding:22px;background:#fff;}
.blog-meta{display:flex;gap:16px;font-size:12px;color:var(--muted);margin-bottom:11px;}
.blog-title2{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--text);line-height:1.45;}
.blog-btn2{display:block;margin:0 auto;background:linear-gradient(135deg,var(--teal),var(--teal-dark));color:#fff;border:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;transition:transform .2s,box-shadow .2s;font-family:'Plus Jakarta Sans',sans-serif;}
.blog-btn2:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,180,200,.35);}

/* ═══════════════════════════════
   FOOTER
═══════════════════════════════ */
.footer{background:var(--navy);padding:80px var(--px) 0;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.6fr;gap:52px;margin-bottom:60px;}
.f-brand-name{font-family:'Playfair Display',serif;font-size:22px;color:#fff;font-weight:800;margin-bottom:12px;display:flex;align-items:center;gap:9px;}
.f-brand-desc{color:rgba(255,255,255,.42);font-size:13px;line-height:1.75;margin-bottom:22px;max-width:280px;}
.nl-form{display:flex;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:50px;overflow:hidden;}
.nl-input{flex:1;background:none;border:none;padding:11px 18px;color:#fff;font-size:13px;outline:none;font-family:'Plus Jakarta Sans',sans-serif;min-width:0;}
.nl-input::placeholder{color:rgba(255,255,255,.32);}
.nl-btn{width:38px;height:38px;margin:4px;background:var(--teal);border:none;border-radius:50%;color:#fff;cursor:pointer;font-size:15px;flex-shrink:0;}
.nl-btn:hover{background:var(--teal-dark);}
.socials{display:flex;gap:9px;margin-top:20px;flex-wrap:wrap;}
.soc{width:40px;height:40px;border:1px solid rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);cursor:pointer;font-size:13px;transition:border-color .2s,color .2s;flex-shrink:0;}
.soc:hover{border-color:var(--teal);color:var(--teal);}
.f-col h4{color:#fff;font-size:15px;font-weight:700;margin-bottom:18px;}
.f-col ul{list-style:none;}
.f-col ul li{margin-bottom:11px;}
.f-col ul li a{color:rgba(255,255,255,.42);font-size:13px;text-decoration:none;cursor:pointer;transition:color .2s;}
.f-col ul li a:hover{color:var(--teal);}
.sched-row{display:flex;justify-content:space-between;gap:8px;color:rgba(255,255,255,.42);font-size:13px;margin-bottom:10px;}
.footer-wm{text-align:center;font-family:'Playfair Display',serif;font-size:clamp(36px,7vw,80px);font-weight:900;color:rgba(255,255,255,.05);letter-spacing:6px;text-transform:uppercase;position:relative;padding:24px 0;border-top:1px solid rgba(255,255,255,.07);}
.wm-logo{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:62px;height:62px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 6px 24px rgba(0,0,0,.25);}
.footer-bot{padding:20px 0 30px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
.footer-copy{font-size:12px;color:rgba(255,255,255,.28);}
.footer-terms{font-size:12px;color:rgba(255,255,255,.28);cursor:pointer;}
.footer-terms:hover{color:var(--teal);}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
═══════════════════════════════════════════════════════ */

/* ── TABLET: ≤ 1024px ── */
@media(max-width:1024px){
  :root{--px:40px;}

  /* Nav */
  .nav-links{gap:20px;}
  .nav-links a{font-size:13px;}

  /* Hero */
  .hero-cards{grid-template-columns:1fr 1fr;max-width:700px;}
  .hero-cards .hcard:last-child{grid-column:1/-1;}

  /* About */
  .about-inner{gap:40px;}
  .stat-num{font-size:34px;}

  /* Services */
  .svc-grid{gap:16px;}
  .svc-card.feat{transform:translateY(-8px);}

  /* Cases */
  .cases-inner{gap:36px;}
  .cases-left{flex:0 0 240px;}

  /* Appointment */
  .appt-inner{gap:36px;}
  .appt-media{height:380px;}

  /* Testimonials */
  .testi-inner{gap:24px;}

  /* Footer */
  .footer-grid{grid-template-columns:1fr 1fr;gap:36px;}
  .f-brand-desc{max-width:100%;}

  /* CTA */
  .talk-tag{right:-60px;}
}

/* ── SMALL TABLET: ≤ 768px ── */
@media(max-width:768px){
  :root{--px:24px;}

  /* Nav — show hamburger, hide links + cta */
  .nav{padding:14px var(--px);}
  .nav-links,.nav-cta{display:none;}
  .hamburger{display:flex;}
  .mobile-menu{padding:20px var(--px);}

  /* Hero */
  .hero{padding:100px var(--px) 48px;}
  .hero-blob{width:300px;height:300px;}
  .hero-blob2{width:220px;height:220px;}
  .hero-cards{grid-template-columns:1fr;max-width:440px;margin-top:36px;}
  .hero-cards .hcard:last-child{grid-column:auto;}

  /* Marquee */
  .m-item{font-size:17px;padding:0 20px;}

  /* About */
  .about{padding:72px var(--px);}
  .about-inner{flex-direction:column;gap:48px;}
  .about-left,.about-right{width:100%;}
  .sec-desc{max-width:100%;}
  .stats-top{grid-template-columns:1fr;}
  .stats-right-col{flex-direction:row;flex-wrap:wrap;}
  .stats-right-col .stat-box{flex:1;min-width:130px;}
  .about-photos{height:auto;}
  .aph{height:160px;}

  /* Services */
  .services{padding:72px var(--px);}
  .svc-grid{grid-template-columns:1fr;max-width:440px;}
  .svc-card.feat{transform:none;}
  .svc-card.feat:hover{transform:translateY(-8px);}

  /* Cases */
  .cases{padding:72px var(--px);}
  .cases-inner{flex-direction:column;gap:40px;}
  .cases-left{flex:none;width:100%;}
  .cases-grid{grid-template-columns:1fr 1fr;}

  /* Appointment */
  .appt{padding:72px var(--px);}
  .appt-inner{grid-template-columns:1fr;gap:32px;}
  .appt-media{height:300px;}
  .appt-form{padding:28px 24px;}
  .form-title{font-size:24px;}
  .frow.c3{grid-template-columns:1fr;}

  /* Testimonials */
  .testi{padding:72px var(--px);}
  .testi-inner{grid-template-columns:1fr;max-width:480px;}
  .rating-box{display:flex;align-items:center;gap:24px;text-align:left;padding:24px;}
  .arr-row{margin-top:0;}

  /* CTA */
  .cta-wrap{padding:0 var(--px) 48px;}
  .cta-banner{flex-direction:column;align-items:flex-start;padding:36px 32px;gap:32px;}
  .cta-right{align-items:flex-start;flex-direction:row;align-items:center;gap:24px;}
  .talk-tag{right:-54px;bottom:auto;top:-32px;}

  /* Blog */
  .blog{padding:72px var(--px);}
  .blog-grid{grid-template-columns:1fr;max-width:440px;}

  /* Footer */
  .footer{padding:60px var(--px) 0;}
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .footer-wm{font-size:clamp(28px,8vw,60px);letter-spacing:3px;}
}

/* ── MOBILE: ≤ 480px ── */
@media(max-width:480px){
  :root{--px:18px;}

  /* Nav */
  .nav-logo{font-size:18px;}
  .nav-logo-icon{width:32px;height:32px;font-size:17px;}

  /* Hero */
  .hero{padding:90px var(--px) 40px;min-height:auto;padding-bottom:48px;}
  .hero-title{letter-spacing:-1px;}
  .tooth-circle{width:58px;height:58px;}
  .hero-blob{display:none;}
  .hero-blob2{display:none;}

  /* Marquee */
  .m-item{font-size:15px;gap:12px;padding:0 14px;}

  /* Stats */
  .stats-right-col .stat-box{min-width:100px;}
  .stat-num{font-size:28px;}

  /* Services */
  .svc-grid{max-width:100%;}

  /* Cases */
  .cases-grid{grid-template-columns:1fr;}
  .case-card img{height:200px;}

  /* Appointment */
  .appt-media{height:240px;}
  .appt-form{padding:22px 18px;}

  /* Testimonials */
  .rating-box{flex-direction:column;text-align:center;}
  .arr-row{margin-top:16px;}
  .quote-box{padding:24px 20px;}
  .quote-body{font-size:15px;}

  /* CTA */
  .cta-banner{padding:28px 24px;}
  .cta-right{flex-direction:column;align-items:flex-start;}
  .doc-wrap{display:none;}

  /* Blog */
  .blog-grid{max-width:100%;}

  /* Footer */
  .footer-grid{grid-template-columns:1fr;}
  .footer-grid > div:nth-child(3){display:none;}
  .footer-bot{flex-direction:column;align-items:center;text-align:center;gap:8px;}
}
`;

/* ── HOOKS ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("on"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function Rv({ c = "rv", d = "", children, style }) {
  const ref = useReveal();
  return <div ref={ref} className={`${c}${d ? " " + d : ""}`} style={style}>{children}</div>;
}

/* ── DATA ── */
const TESTIMONIALS = [
  { quote: "Visiting this dental clinic completely changed my view of dentistry. The team was professional, caring, and gentle. My treatment was smooth, painless, and successful. Today, I smile with confidence.", name: "Joseph David", role: "CEO at Dental", img: IMG.testi1 },
  { quote: "I was terrified of dentists for years. The warm, skilled staff here turned every visit into a positive experience. The results speak for themselves — my smile has never looked better!", name: "Sarah Mitchell", role: "Marketing Director", img: IMG.av2 },
  { quote: "State-of-the-art equipment, compassionate doctors, and a truly patient-first approach. CuraDent has earned a patient for life.", name: "Michael Chen", role: "Software Engineer", img: IMG.av3 },
];

/* ── MAIN COMPONENT ── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [testiIdx, setTestiIdx] = useState(0);
  const [ytOpen, setYtOpen]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", date:"", dept:"", doc:"", msg:"" });
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    const h = () => {
      const isScrolled = window.scrollY > 28;
      setScrolled(isScrolled);
      if (isScrolled) setMenuOpen(false);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const t = TESTIMONIALS[testiIdx];
  const prev = () => setTestiIdx((testiIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setTestiIdx((testiIdx + 1) % TESTIMONIALS.length);

  return (
    <>
      <style>{CSS}</style>
      <div>

        {/* ── NAV ── */}
        <nav className={`nav${scrolled ? " scrolled" : ""}`}>
          <div className="nav-logo">
            <div className="nav-logo-icon">🦷</div>
            CuraDent
          </div>
          <div className="nav-links">
            {["Demos","About Us","Doctors","Pages","Blog"].map(l => <a key={l}>{l}</a>)}
          </div>
          <button className="nav-cta">Get In Touch ✉</button>
          {/* Hamburger */}
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu show">
            {["Demos","About Us","Doctors","Pages","Blog"].map(l => (
              <a key={l} onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <button className="mobile-cta" onClick={() => setMenuOpen(false)}>Get In Touch ✉</button>
          </div>
        )}

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-blob" />
          <div className="hero-blob2" />
          <h1 className="hero-title">
            Dental{" "}
            <span className="tooth-circle">
              <img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" alt="tooth" />
            </span>
            {" "}Health
          </h1>
          <div className="hero-cards">
            {/* Card 1 – Connect */}
            <div className="hcard">
              <div className="hcard-title">Connect with Us</div>
              <div className="hcard-sub">Get in touch with us anytime for inquiries, support, or collaboration</div>
              <div className="info-row">
                <div className="info-icon">🕐</div>
                <div className="info-text"><strong>Opening Hours</strong><span>Mon to Sat 10:00 – 24:00</span></div>
              </div>
              <div className="info-row">
                <div className="info-icon">📞</div>
                <div className="info-text"><strong>Need Dental Help?</strong><span>Call: +8 880 283 9136</span></div>
              </div>
            </div>
            {/* Card 2 – Doctor */}
            <div className="hcard" style={{ padding:0, overflow:"hidden" }}>
              <img src={IMG.heroDoctor} alt="Doctor" style={{ width:"100%", height:"200px", objectFit:"cover", borderRadius:"20px 20px 0 0", display:"block" }} />
              <div style={{ padding:"16px 20px 20px" }}>
                <div className="chat-bubble">How can I help you?</div>
                <div className="chat-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
              </div>
            </div>
            {/* Card 3 – Tech */}
            <div className="hcard">
              <img src={IMG.heroTech} alt="Dental Tech" style={{ width:"100%", height:"130px", objectFit:"cover", borderRadius:"13px", marginBottom:"14px", display:"block" }} />
              <p className="hero-tech-desc">Digital imaging to AI-assisted diagnosis, modern tools help dentists provide more accurate &amp; efficient care.</p>
              <button className="find-btn">Find Consultation →</button>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[0,1].map(i => (
              <span key={i} style={{ display:"inline-flex" }}>
                {["Pure Pearls","Gleam Bright","Fresh Breath","Smile More","Perfect Teeth","Oral Care","Happy Patients"].map(w => (
                  <span key={w} className="m-item">{w} <span className="m-star">✦</span></span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <section className="about">
          <div className="about-inner">
            <Rv c="rvL">
              <div className="badge">💙 Discover Our Journey</div>
              <h2 className="sec-title light">Your Trusted Partner<br />in Dental Health</h2>
              <p className="sec-desc light">Oral health plays a vital role in overall well-being. Regular dental checkups and proper hygiene practices can help prevent common issues such as cavities and gum disease.</p>
              <button className="teal-btn">More About Us →</button>
            </Rv>
            <Rv c="rvR">
              <div className="stats-top">
                <div>
                  <div className="avatars" style={{ marginBottom:"10px" }}>
                    {[IMG.av1,IMG.av2,IMG.av3,IMG.av4].map((s,i) => (
                      <div key={i} className="av"><img src={s} alt="" /></div>
                    ))}
                  </div>
                  <div className="stat-box">
                    <div className="stat-num">400+</div>
                    <div className="stat-lbl">Expert Doctors</div>
                  </div>
                </div>
                <div className="stats-right-col">
                  <div className="stat-box"><div className="stat-num">30+</div><div className="stat-lbl">Years of Experience</div></div>
                  <div className="stat-box"><div className="stat-num">57k+</div><div className="stat-lbl">Happy Patients</div></div>
                  <div className="stat-box"><div className="stat-num">984+</div><div className="stat-lbl">Professional Dentists</div></div>
                </div>
              </div>
              <div className="about-photos">
                <div className="aph"><img src={IMG.about1} alt="Dentist at work" /></div>
                <div className="aph"><img src={IMG.about2} alt="Happy patient" /></div>
              </div>
            </Rv>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="services">
          <Rv c="rv">
            <div className="services-head">
              <div className="badge" style={{ background:"rgba(0,180,200,.1)", color:"var(--teal-dark)", margin:"0 auto 14px" }}>🦷 Explore Our Solutions</div>
              <h2 className="sec-title dark">Your Trusted Partner</h2>
            </div>
          </Rv>
          <div className="svc-grid">
            {[
              { icon:"🦷", name:"Pure Care Preventive", desc:"Oral hygiene prevents cavities, gum disease, and infections with proper brushing habits.", feat:false },
              { icon:"😁", name:"Smile Glow Whitening", desc:"Brushing twice daily and flossing regularly keeps teeth and gums radiant and strong.", feat:true },
              { icon:"🔬", name:"Renewal Restorations", desc:"Child-friendly clinics and fun education help children build lifelong strong dental habits.", feat:false },
            ].map((s,i) => (
              <Rv key={s.name} c="rv" d={`d${i+1}`}>
                <div className={`svc-card${s.feat ? " feat" : ""}`}>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-name">{s.name}</div>
                  <p className="svc-desc">{s.desc}</p>
                  <span className="more-link">More Details →</span>
                </div>
              </Rv>
            ))}
          </div>
        </section>

        {/* ── CASES ── */}
        <section className="cases">
          <div className="cases-inner">
            <Rv c="rvL">
              <div className="badge">🦷 Smile Success Stories</div>
              <h2 className="sec-title light">Where Healthy<br />Smiles Begin</h2>
              <p className="cases-desc">Cosmetic dentistry is gaining popularity as people seek confident, beautiful smiles. Procedures like teeth whitening, veneers, and digital smile design are now more accessible.</p>
              <button className="teal-btn">Explore More Cases →</button>
            </Rv>
            <Rv c="rvR">
              <div className="cases-grid">
                {[
                  { img:IMG.case6, label:"Gum Disease Monitor" },
                  { img:IMG.case2, label:"Virtual Dental Assistant" },
                  { img:IMG.case3, label:"Smart Brush System" },
                  { img:IMG.case4, label:"Smart Dental Diagnosis" },
                  { img:IMG.case5, label:"Dental Risk Analyzer" },
                  { img:IMG.case6, label:"Pediatric Dental Care" },
                ].map(c => (
                  <div key={c.label} className="case-card">
                    <img src={c.img} alt={c.label} />
                    <div className="case-overlay">{c.label}<div className="case-arrow">→</div></div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
        </section>

        {/* ── APPOINTMENT ── */}
        <section className="appt">
          <div className="appt-inner">
            <Rv c="rvL">
              <div className="appt-media" onClick={() => setYtOpen(true)}>
                <img src={IMG.apptThumb} alt="Clinic Team" />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,30,50,.35),transparent)" }} />
                <div className="play-wrap">
                  <div className="play-ring" />
                  <button className="play-btn2">▶</button>
                </div>
              </div>
            </Rv>
            <Rv c="rvR">
              <div className="appt-form">
                <div className="form-badge">📅 Schedule a Visit</div>
                <div className="form-title">Get Doctor Appointment</div>
                <div className="frow c3">
                  <input className="fi" placeholder="Full Name *" value={form.name} onChange={f("name")} />
                  <input className="fi" placeholder="Email *" type="email" value={form.email} onChange={f("email")} />
                  <input className="fi" placeholder="Phone *" value={form.phone} onChange={f("phone")} />
                </div>
                <div className="frow c3">
                  <input className="fi" type="date" value={form.date} onChange={f("date")} />
                  <select className="fi" value={form.dept} onChange={f("dept")}>
                    <option value="">Department</option>
                    <option>General Dentistry</option>
                    <option>Cosmetic</option>
                    <option>Orthodontics</option>
                    <option>Pediatric</option>
                  </select>
                  <select className="fi" value={form.doc} onChange={f("doc")}>
                    <option value="">Doctors</option>
                    <option>Dr. Emily Smith</option>
                    <option>Dr. James Parker</option>
                    <option>Dr. Priya Nair</option>
                  </select>
                </div>
                <div className="frow" style={{ gridTemplateColumns:"1fr" }}>
                  <textarea className="ftx" placeholder="Type your message..." value={form.msg} onChange={f("msg")} />
                </div>
                <div className="fterms">I have read &amp; accepted Terms &amp; Conditions.</div>
                <button className="sub-btn">Submit Your Request →</button>
              </div>
            </Rv>
          </div>
        </section>

        {/* YouTube Modal */}
        {ytOpen && (
          <div className="yt-modal" onClick={() => setYtOpen(false)}>
            <div className="yt-inner" onClick={e => e.stopPropagation()}>
              <button className="yt-close" onClick={() => setYtOpen(false)}>✕</button>
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Dental Clinic Video"
              />
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS ── */}
        <section className="testi">
          <Rv c="rv">
            <div className="testi-head">
              <div className="badge" style={{ background:"rgba(0,180,200,.1)", color:"var(--teal-dark)", margin:"0 auto 12px" }}>💬 Our Happy Patients</div>
              <h2 className="sec-title dark">Patient Experience Stories</h2>
            </div>
          </Rv>
          <div className="testi-inner">
            <Rv c="rvL">
              <div className="rating-box">
                <div>
                  <div className="rating-lbl">Average Rating</div>
                  <div className="rating-big">4.5</div>
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <div className="review-cnt">(245+) Customer Reviews</div>
                </div>
                <div className="arr-row">
                  <button className="arr prev" onClick={prev}>←</button>
                  <button className="arr next" onClick={next}>→</button>
                </div>
              </div>
            </Rv>
            <Rv c="rvR" key={testiIdx} style={{ animation:"fadeIn .4s ease" }}>
              <div className="quote-box">
                <div className="quote-tag">"They truly care about patients."</div>
                <p className="quote-body">"{t.quote}"</p>
                <div className="quote-author">
                  <img src={t.img} className="qa-img" alt={t.name} />
                  <div><div className="qa-name">{t.name}</div><div className="qa-role">{t.role}</div></div>
                </div>
              </div>
            </Rv>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <div className="cta-wrap">
          <Rv c="rv">
            <div className="cta-banner">
              <div className="cta-left">
                <div className="cta-badge">🛡 Need Emergency Help?</div>
                <div className="cta-title">Keeping Your Smile<br />Healthy &amp; Bright</div>
                <div className="cta-sub">Gum disease, or periodontitis, is a serious infection that can damage the soft tissues and bone that support your teeth.</div>
              </div>
              <div className="cta-right">
                <button className="cta-contact">Contact Us Now →</button>
                <div className="doc-wrap">
                  <img src={IMG.docCTA} alt="Doctor" className="doc-img" />
                  <div className="hello-tag">Hello! 👋</div>
                  <div className="talk-tag">Want to Talk?</div>
                </div>
              </div>
            </div>
          </Rv>
        </div>

        {/* ── BLOG ── */}
        <section className="blog">
          <Rv c="rv">
            <div className="blog-head">
              <div className="badge" style={{ background:"rgba(0,180,200,.1)", color:"var(--teal-dark)", margin:"0 auto 12px" }}>📚 Knowledge and Guidance</div>
              <h2 className="sec-title dark">Learn and Discover</h2>
            </div>
          </Rv>
          <div className="blog-grid">
            {[
              { img:IMG.blog1, title:"Essential Tips for Maintaining Strong Teeth and Healthy Gums" },
              { img:IMG.blog1, title:"How Modern Dental Technology Improves Care & Ensures Oral Health" },
            ].map((b,i) => (
              <Rv key={i} c="rv" d={`d${i+1}`}>
                <div className="blog-card">
                  <div className="blog-thumb">
                    <img src={b.img} alt={b.title} />
                    <span className="blog-tag2">Dental Health</span>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta"><span>👤 By Admin</span><span>⏱ 6 min read</span></div>
                    <div className="blog-title2">{b.title}</div>
                  </div>
                </div>
              </Rv>
            ))}
          </div>
          <button className="blog-btn2">Read More Blogs →</button>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="f-brand-name"><span>🦷</span> CuraDent</div>
              <p className="f-brand-desc">At our dental clinic, we believe every smile deserves the best care, with advanced technology and compassionate professionals.</p>
              <div className="nl-form">
                <input className="nl-input" placeholder="Enter Your Mail Address" />
                <button className="nl-btn">→</button>
              </div>
              <div className="socials">
                {["f","𝕏","📷","in"].map(s => <div key={s} className="soc">{s}</div>)}
              </div>
            </div>
            <div className="f-col">
              <h4>Pages</h4>
              <ul>{["Home","Appointment","Blog","All Pages","Contact Us"].map(l=><li key={l}><a>{l}</a></li>)}</ul>
            </div>
            <div className="f-col">
              <h4>Utility</h4>
              <ul>{["Style Guide","Password","Privacy Policy","License","404 Error"].map(l=><li key={l}><a>{l}</a></li>)}</ul>
            </div>
            <div className="f-col">
              <h4>Time Schedule</h4>
              {[["Monday","08:00–20:00"],["Tuesday","08:00–20:00"],["Wednesday","08:00–20:00"],["Thursday","08:00–20:00"],["Saturday","08:00–20:00"]].map(([d,tm])=>(
                <div key={d} className="sched-row"><span>{d}</span><span>{tm}</span></div>
              ))}
            </div>
          </div>
          <div className="footer-wm">
            CURA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DENT
            <div className="wm-logo">🦷</div>
          </div>
          <div className="footer-bot">
            <span className="footer-copy">© 2025 Dental All Rights Reserved.</span>
            <span className="footer-terms">Terms and Conditions</span>
          </div>
        </footer>

      </div>
    </>
  );
}