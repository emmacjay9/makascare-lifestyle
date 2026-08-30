"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Facebook, Leaf, MessageCircle, ShieldCheck, Sparkles, Truck, Waves, Menu, X, Instagram } from "lucide-react";

const categories = ["Vitamins & Everyday Health","Collagen & Beauty","Women’s Wellness","Men’s Wellness","Weight Management","Herbal Wellness","Kids’ Vitamins"];
const featured = [
  { name:"Youtheory Collagen", cat:"Beauty from within", image:"/products/youtheory-collagen.jpg", tone:"sage" },
  { name:"Vital Proteins Collagen Peptides", cat:"Daily collagen", image:"/products/vital-proteins.jpg", tone:"sky" },
  { name:"Wellwoman Multi-Vitamin Gummies", cat:"Women’s wellness", image:"/products/wellwoman.jpg", tone:"plum" },
  { name:"NeoCell Grassfed Collagen Peptides", cat:"Skin, hair & nails", image:"/products/neocell.jpg", tone:"rose" },
  { name:"Kids Multi + Omega-3 Gummies", cat:"Kids’ wellness", image:"/products/immunboost-kids.jpg", tone:"amber" },
  { name:"Magnesium Glycinate", cat:"Everyday minerals", image:"/products/magnesium-glycinate.jpg", tone:"blue" },
];
const reviews = [
  {quote:"The products are working o, I sleep like a baby now 😂",product:"Customer feedback"},
  {quote:"Thanks ma’am. I’ve started using my supplement and it’s really working.",product:"Menofix"},
  {quote:"Thanks sis, my children are eating better now 😊",product:"Kids Multi + Omega-3 Gummies"},
];

function Wa({label="Chat on WhatsApp", product, dark=false}:{label?:string;product?:string;dark?:boolean}){
 const text=encodeURIComponent(product?`Hello Makascare Lifestyle, I’m interested in ${product}.`:`Hello Makascare Lifestyle, I’d like to enquire about your products.`);
 return <a className={`button ${dark?"button-dark":"button-green"}`} href={`https://wa.me/2348035218130?text=${text}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}</a>
}

export default function MakascareHome(){
 const [menuOpen,setMenuOpen]=useState(false);
 const {scrollYProgress}=useScroll();
 const y1=useTransform(scrollYProgress,[0,.5],[0,150]);
 const y2=useTransform(scrollYProgress,[0,.5],[0,-90]);
 return <main className="site-shell">
  <div className="announcement" aria-label="Makascare announcements">
   <div className="announcement-track">
    <span>NATIONWIDE DELIVERY ACROSS NIGERIA</span><b>✦</b><span>PERSONAL SUPPORT ON WHATSAPP</span><b>✦</b><span>WELLNESS &amp; BEAUTY ESSENTIALS</span><b>✦</b><span>MAKASCARE LIFESTYLE</span><b>✦</b>
    <span aria-hidden="true">NATIONWIDE DELIVERY ACROSS NIGERIA</span><b aria-hidden="true">✦</b><span aria-hidden="true">PERSONAL SUPPORT ON WHATSAPP</span><b aria-hidden="true">✦</b><span aria-hidden="true">WELLNESS &amp; BEAUTY ESSENTIALS</span><b aria-hidden="true">✦</b><span aria-hidden="true">MAKASCARE LIFESTYLE</span><b aria-hidden="true">✦</b>
   </div>
  </div>
  <header className="nav-shell"><nav className="nav container">
   <a href="#top" className="brand"><span className="brand-seal"><Leaf size={20}/></span><span><strong>MAKASCARE</strong><small>LIFESTYLE</small></span></a>
   <div className="nav-links"><a href="/shop">Shop</a><a href="#categories">Categories</a><a href="#about">Our story</a><a href="#reviews">Reviews</a></div>
   <div className="nav-actions"><Wa label="Let’s talk"/><button className="menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button></div>
  </nav>{menuOpen&&<motion.div className="mobile-menu" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}><a onClick={()=>setMenuOpen(false)} href="/shop">Shop</a><a onClick={()=>setMenuOpen(false)} href="#categories">Categories</a><a onClick={()=>setMenuOpen(false)} href="#about">Our story</a><a onClick={()=>setMenuOpen(false)} href="#reviews">Reviews</a><a onClick={()=>setMenuOpen(false)} href="#contact">Contact</a></motion.div>}</header>

  <section id="top" className="hero-v2">
   <motion.div className="blur-orb orb-one" style={{y:y1}}/><motion.div className="blur-orb orb-two" style={{y:y2}}/>
   <div className="floating-leaves" aria-hidden="true">
    {[
      {x:"7%",y:"16%",s:22,d:8,delay:0,r:-18},
      {x:"18%",y:"70%",s:18,d:10,delay:1.2,r:24},
      {x:"52%",y:"12%",s:16,d:9,delay:.7,r:12},
      {x:"76%",y:"22%",s:24,d:11,delay:2,r:-30},
      {x:"88%",y:"72%",s:19,d:9.5,delay:1.5,r:20},
    ].map((leaf,i)=><motion.span key={i} className={`floating-leaf leaf-${i+1}`} style={{left:leaf.x,top:leaf.y}} initial={{opacity:0,rotate:leaf.r,scale:.85}} animate={{opacity:[0,.26,.18,.3,0],y:[0,-24,-7,-34,-52],x:[0,8,-5,10,2],rotate:[leaf.r,leaf.r+18,leaf.r-8,leaf.r+28,leaf.r+38],scale:[.85,1,.94,1.06,.9]}} transition={{duration:leaf.d,delay:leaf.delay,repeat:Infinity,ease:"easeInOut"}}><Leaf size={leaf.s}/></motion.span>)}
   </div>
   <div className="container hero-v2-grid">
    <motion.div className="hero-copy-v2" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
     <div className="kicker"><span></span> Curated wellness & beauty</div>
     <h1>Feel good.<br/><em>Glow different.</em></h1>
     <p>Thoughtfully selected supplements for beauty, balance and everyday wellbeing — with real, personal support when you need it.</p>
     <div className="hero-actions"><a href="/shop" className="button button-ink">Explore the collection <ArrowRight size={17}/></a><Wa/></div>
     <div className="micro-proof"><div className="avatars"><i>M</i><i>♡</i><i>4+</i></div><div><div className="stars">★★★★★</div><span>4 years serving the Makascare community</span></div></div>
    </motion.div>
    <div className="editorial-stage">
      <motion.div className="editorial-card card-a" initial={{opacity:0,rotate:-5,x:30}} animate={{opacity:1,rotate:-3,x:0}} transition={{delay:.15,duration:.8}} whileHover={{rotate:0,scale:1.02}}><Image src="/products/youtheory-collagen.jpg" fill sizes="420px" alt="Youtheory collagen" priority/></motion.div>
      <motion.div className="editorial-card card-b" initial={{opacity:0,rotate:8,y:30}} animate={{opacity:1,rotate:5,y:0}} transition={{delay:.3,duration:.8}} whileHover={{rotate:0,scale:1.03}}><Image src="/products/wellwoman.jpg" fill sizes="210px" alt="Wellwoman gummies"/></motion.div>
      <motion.div className="editorial-card card-c" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{delay:.45}} whileHover={{y:-8}}><Image src="/products/vital-proteins.jpg" fill sizes="190px" alt="Vital Proteins collagen"/></motion.div>
      <motion.div className="stage-note" animate={{y:[0,-7,0]}} transition={{duration:4,repeat:Infinity}}><Sparkles size={15}/><span>Wellness, made personal.</span></motion.div>
      <div className="stage-ring ring-one"/><div className="stage-ring ring-two"/>
    </div>
   </div>
   <div className="hero-scroll">SCROLL TO DISCOVER <span>↓</span></div>
  </section>

  <section className="ticker"><div className="ticker-track">{[...categories,...categories].map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</div></section>

  <section id="shop" className="section container">
   <div className="section-title-row"><div><div className="kicker"><span></span> Best of Makascare</div><h2>Your wellness shelf,<br/><em>elevated.</em></h2></div><p>Discover customer favourites across collagen, vitamins, minerals and family wellness.</p></div>
   <div className="product-grid-v2">{featured.map((p,i)=><motion.article className={`product-v2 ${p.tone}`} key={p.name} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:(i%3)*.07}}>
     <div className="product-v2-image"><Image src={p.image} fill sizes="(max-width:700px) 90vw, 360px" alt={p.name}/><span className="num">0{i+1}</span><span className="quick">View details <ArrowRight size={14}/></span></div>
     <div className="product-v2-copy"><span>{p.cat}</span><h3>{p.name}</h3><Wa label="Enquire now" product={p.name}/></div>
   </motion.article>)}</div>
  </section>

  <section className="statement"><div className="container"><motion.p initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>Wellness shouldn’t feel <em>complicated.</em><br/>We make finding your everyday essentials feel simple, beautiful and personal.</motion.p></div></section>

  <section id="categories" className="section categories-v2"><div className="container">
   <div className="section-title-row light-title"><div><div className="kicker"><span></span> Shop by need</div><h2>Find your<br/><em>routine.</em></h2></div><p>From daily vitamins to beauty favourites, browse the range in a way that makes sense for you.</p></div>
   <div className="category-list">{categories.map((c,i)=><motion.a href={`/shop?category=${encodeURIComponent(c)}`} key={c} className="category-line" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.035}}><span>0{i+1}</span><strong>{c}</strong><div className="cat-icon"><ArrowRight/></div></motion.a>)}</div>
  </div></section>

  <section id="about" className="section container story-grid">
   <div className="story-visual"><motion.div className="story-card" whileInView={{rotate:-3}} viewport={{once:true}}><Image src="/products/multi-collagen.jpg" fill sizes="480px" alt="Makascare collagen product"/></motion.div><div className="years"><strong>4</strong><span>years of<br/>customer care</span></div><motion.div className="story-scribble" animate={{rotate:[-4,4,-4]}} transition={{duration:6,repeat:Infinity}}><Leaf/></motion.div></div>
   <motion.div className="story-copy" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><div className="kicker"><span></span> The Makascare story</div><h2>More than products.<br/><em>It’s personal.</em></h2><p>Makascare Lifestyle was founded by Amaka Okeke to create a trusted, approachable place for wellness and beauty essentials.</p><p>For four years, the focus has stayed simple: quality products, warm customer care and helping people find what fits their routine.</p><div className="story-points"><span><Check/> Curated selection</span><span><Check/> Direct support</span><span><Check/> Nationwide delivery</span></div><Wa label="Speak with Makascare"/></motion.div>
  </section>

  <section className="service-strip"><div className="container service-grid"><div><ShieldCheck/><span><strong>Curated products</strong><small>A focused wellness range</small></span></div><div><MessageCircle/><span><strong>Human support</strong><small>Talk directly on WhatsApp</small></span></div><div><Truck/><span><strong>Nationwide delivery</strong><small>Delivered across Nigeria</small></span></div><div><Waves/><span><strong>Simple routines</strong><small>Wellness without overwhelm</small></span></div></div></section>

  <section id="reviews" className="section reviews-v2"><div className="container"><div className="review-heading"><div className="kicker"><span></span> Community notes</div><h2>Words from people<br/>who shop <em>Makascare.</em></h2></div><div className="review-track">{reviews.map((r,i)=><motion.blockquote key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="stars">★★★★★</div><p>“{r.quote}”</p><footer><span className="verified"><Check/> Verified customer</span><small>{r.product}</small></footer></motion.blockquote>)}</div><p className="disclaimer">Customer experiences are personal and results vary. Product information is for general information and is not medical advice.</p></div></section>

  <section id="contact" className="contact-v2"><div className="container contact-card"><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="kicker"><span></span> We’re here to help</div><h2>Not sure where<br/>to <em>start?</em></h2><p>Tell us what you’re looking for and we’ll help you browse the available range.</p></motion.div><div className="contact-buttons"><Wa label="Chat on WhatsApp"/><a className="button button-ghost" href="https://www.facebook.com/share/p/1KvrWxub23/" target="_blank" rel="noreferrer"><Facebook size={17}/> Facebook</a><a className="button button-ghost" href="https://www.tiktok.com/@makascare_lifestyle" target="_blank" rel="noreferrer">TikTok</a></div><div className="contact-leaf"><Leaf/></div></div></section>

  <footer className="footer-v2"><div className="container footer-top"><div className="brand footer-brand"><span className="brand-seal"><Leaf size={20}/></span><span><strong>MAKASCARE</strong><small>LIFESTYLE</small></span></div><p>Wellness. Quality. You.</p><div className="footer-links"><a href="/shop">Shop</a><a href="#about">About</a><a href="https://www.tiktok.com/@makascare_lifestyle" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.facebook.com/share/p/1KvrWxub23/" target="_blank" rel="noreferrer">Facebook</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><div className="container footer-bottom"><span>© 2026 Makascare Lifestyle</span><span>Nationwide delivery · Nigeria · Supplements are not a substitute for medical care</span></div></footer>
  <a className="floating-wa" href="https://wa.me/2348035218130" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/></a>
 </main>
}
