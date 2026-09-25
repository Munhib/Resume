import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, ArrowRight, Download, Github, Linkedin, Mail, MapPin, Menu, X, ArrowLeft, Pause, Play} from 'lucide-react';
import InteractiveLandscape from './components/InteractiveLandscape';
import InteractiveGrid from './components/InteractiveGrid';
import RoundCarousel from './components/RoundCarousel';
import {groups,projects,tileImage,projectImages} from './data';
import './styles.css';
import {theme} from './theme';

const pages=['Home','About','Stack','Projects','Contact'];
const getPage=()=> {const p=location.hash.slice(1).split('/')[1]||'home';return pages.find(x=>x.toLowerCase()===p)||'Not found';};
function App(){
 const [page,setPage]=useState(getPage),[menu,setMenu]=useState(false),[motion,setMotion]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{
   const jump=()=>{
     const target=getPage();
     const section=document.getElementById(target.toLowerCase());
     setMenu(false);
     section?.scrollIntoView({behavior:'instant',block:'start'});
   };
   const click=e=>{
     const link=e.target.closest('a[href^="#/"]');
     if(!link || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
     if(link.hash===location.hash){e.preventDefault();jump();}
   };
   let frame=0;
   const track=()=>{
     cancelAnimationFrame(frame);
     frame=requestAnimationFrame(()=>{
       const marker=window.innerHeight*.3;
       let current='Home';
       for(const name of pages){if(document.getElementById(name.toLowerCase())?.getBoundingClientRect().top<=marker)current=name;}
       setPage(current);
     });
   };
   const initial=requestAnimationFrame(jump);
   window.addEventListener('hashchange',jump);
   window.addEventListener('scroll',track,{passive:true});
   window.addEventListener('resize',track);
   document.addEventListener('click',click);
   document.title='Munhib Baig — AI & Software Engineer';
   return()=>{cancelAnimationFrame(initial);cancelAnimationFrame(frame);window.removeEventListener('hashchange',jump);window.removeEventListener('scroll',track);window.removeEventListener('resize',track);document.removeEventListener('click',click);};
 },[]);
 return <><a className="skip" href="#main" onClick={e=>{e.preventDefault();document.getElementById("main").focus();}}>Skip to content</a><div className="landscape" aria-hidden="true"><InteractiveLandscape background={theme.base} palette={theme.landscape} speed={motion?24:0} density={90} style={{minWidth:0,minHeight:0}}/></div><div className="scrim"/>
 <header><a href="#/home" className="brand" aria-label="Munhib Baig home">m<span>b</span><i>.</i></a><nav aria-label="Main navigation" className={menu?'open':''}>{pages.map(p=><a key={p} href={`#/${p.toLowerCase()}`} aria-current={page===p?'page':undefined}>{p}</a>)}</nav><a className="header-contact" href="mailto:munhibbaig@gmail.com">Let’s talk <ArrowUpRight size={16}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></header>
 <main id="main" tabIndex={-1}>
   <section id="home" aria-label="Home"><Home/><a className="scroll-cue" href="#/about">Scroll to explore <span aria-hidden="true">↓</span></a></section>
   <section id="about" aria-label="About"><About/></section>
   <section id="stack" aria-label="Stack"><Stack/></section>
   <section id="projects" aria-label="Projects"><Projects motion={motion}/></section>
   <section id="contact" aria-label="Contact"><Contact/></section>
 </main>
 <footer><span>© {new Date().getFullYear()} Munhib Baig</span><span className="footer-note">Thoughtfully engineered. Always evolving.</span><div><button onClick={()=>setMotion(!motion)} aria-label={motion?'Pause animations':'Resume animations'}>{motion?<Pause size={13}/>:<Play size={13}/>} Motion {motion?'on':'off'}</button><a href="https://github.com/Munhib" aria-label="GitHub"><Github size={17}/></a><a href="https://linkedin.com/in/munhib-baig" aria-label="LinkedIn"><Linkedin size={17}/></a></div></footer></>;
}
function Eyebrow({children}){return <div className="eyebrow"><span/> {children}</div>}
function Home(){return <div className="home"><div className="hero"><Eyebrow>AI & SOFTWARE ENGINEER</Eyebrow><h1>Building intelligence.<br/><span>Engineering impact.</span></h1><div className="intro"><span className="intro-line"/><p>I’m <strong>Muhammad Munhib Baig</strong> — turning complex problems into thoughtful software. From machine learning models to the systems that bring them to life.</p></div><div className="actions"><a className="button primary" href="#/projects">Explore my work <ArrowUpRight size={19}/></a><a className="button secondary" href="/resumes/Munhib-Baig-Resume.pdf" download>Download résumé <Download size={17}/></a></div><div className="location"><MapPin size={14}/> Karachi, Pakistan <span>·</span> FAST–NUCES ’26</div></div><div className="hero-bottom"><div className="hero-caption"><span className="tiny-label">AT THE INTERSECTION OF</span><p>Intelligence <span>×</span> Engineering</p></div><a className="featured" href="#/projects"><span className="featured-icon">◎</span><div><span className="tiny-label">FEATURED PROJECT / 01</span><h3>A.R.E.S <ArrowUpRight size={18}/></h3><p>Privacy-first AI. Real-time awareness.</p></div></a></div></div>}
function About(){return <div className="page"><Eyebrow>A LITTLE ABOUT ME</Eyebrow><h2 className="section-title">Curiosity drives me.<br/><span>Building defines me.</span></h2><div className="about-grid"><div><p className="lead">I’m Munhib, a Computer Science graduate from FAST–NUCES, working across AI, backend development, and cloud infrastructure.</p><p className="muted">I enjoy connecting the pieces: training a model, designing the API around it, and delivering an interface people can use. My work spans privacy-preserving computer vision, AI agents, and full-stack applications.</p><a className="text-link" href="/resumes/Munhib-Baig-AI-ML.pdf" download>Download AI / ML résumé <Download size={16}/></a></div><div className="timeline"><span className="tiny-label">EXPERIENCE</span><article><div className="item-meta">JUL 2026 — PRESENT <span>Lahore, Pakistan</span></div><h2>Software Developer Intern</h2><h3>Codify Labs</h3><p>Building OCR and AI grading workflows, including handwritten answer extraction with the Anthropic API, document region detection with PyMuPDF and OpenCV, and interfaces for upload, review, and export.</p></article><span className="tiny-label">EDUCATION</span><article><div className="item-meta">AUG 2022 — JUN 2026</div><h2>BS Computer Science</h2><h3>FAST–NUCES</h3><p>Artificial Intelligence · Machine Learning · Cloud Computing · Database Systems · Software Engineering · Web Technologies</p></article></div></div></div>}
function Stack(){const [filter,setFilter]=useState('All'); const [small,setSmall]=useState(window.innerWidth<650);useEffect(()=>{const fn=()=>setSmall(window.innerWidth<650);window.addEventListener('resize',fn);return()=>window.removeEventListener('resize',fn);},[]);const names=filter==='All'?Object.values(groups).flat():groups[filter];const cols=small?2:Math.min(6,names.length);return <div className="page"><Eyebrow>MY TOOLKIT</Eyebrow><h2 className="section-title">The tools behind<br/><span>the ideas.</span></h2><p className="lead short">From experimentation to deployment. The languages, frameworks, and libraries I build with.</p><div className="filters" aria-label="Filter skills">{['All',...Object.keys(groups)].map(g=><button key={g} className={g===filter?'active':''} onClick={()=>setFilter(g)} aria-pressed={g===filter}>{g}</button>)}</div><div className="skill-grid" style={{height:Math.ceil(names.length/cols)*(small?130:150)}}><InteractiveGrid images={names.map((n,i)=>({src:tileImage(n,i),alt:n}))} columns={cols} rows={Math.ceil(names.length/cols)} padding="0" gap={10} rounded={10} logoScale={4} cardFill="rgba(52,56,64,.96)" cardBorder="rgba(193,198,206,.35)"/></div><p className="grid-note">Explore a tile to see the grid respond.</p></div>}
function Projects({motion}){const [selected,setSelected]=useState(0);const p=projects[selected];return <div className="page projects-page"><div className="project-heading"><div><Eyebrow>SELECTED WORK</Eyebrow><h2 className="section-title">Ideas, made <span>real.</span></h2></div><p className="muted">A few things I’ve built.<br/>Drag to explore the full circle.</p></div><div className="carousel"><RoundCarousel images={projectImages} imageWidth={260} imageHeight={310} spacing={2} speed={motion?1.5:0} background="transparent" tilt={-5}/></div><div className="project-selector">{projects.map((p,i)=><button key={p.name} onClick={()=>setSelected(i)} aria-pressed={i===selected} className={i===selected?'active':''}><span>0{i+1}</span>{p.name}</button>)}</div><article className="project-details" aria-live="polite"><div><span className="tiny-label">{p.category} / {p.year}</span><h2>{p.name}</h2><p className="project-subtitle">{p.subtitle}</p><span className="muted">{p.role}</span></div><div><p>{p.description}</p><p className="muted">{p.detail}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div></article><div className="project-controls"><button onClick={()=>setSelected((selected+3)%4)} aria-label="Previous project"><ArrowLeft size={18}/></button><span>0{selected+1} / 04</span><button onClick={()=>setSelected((selected+1)%4)} aria-label="Next project"><ArrowRight size={18}/></button><a className="text-link" href="https://github.com/Munhib">Explore GitHub <ArrowUpRight size={16}/></a></div></div>}
function Contact(){const [copied,setCopied]=useState(false);async function copy(){try{await navigator.clipboard.writeText('munhibbaig@gmail.com');setCopied(true);}catch{setCopied(false);}}return <div className="page contact-page"><Eyebrow>LET’S CONNECT</Eyebrow><h2 className="section-title">Good things start<br/><span>with a conversation.</span></h2><p className="lead short">Have an interesting problem, a project in mind, or a role where I could contribute? I’d love to hear from you.</p><a className="email-link" href="mailto:munhibbaig@gmail.com">munhibbaig@gmail.com <ArrowUpRight/></a><button className="copy-button" onClick={copy}>{copied?'Email copied':'Copy email address'}</button><span className="sr-only" role="status">{copied?'Email address copied to clipboard':''}</span><div className="contact-links"><a href="https://linkedin.com/in/munhib-baig"><Linkedin/> LinkedIn <ArrowUpRight size={18}/></a><a href="https://github.com/Munhib"><Github/> GitHub <ArrowUpRight size={18}/></a><a href="tel:+923182109157"><span>+92 318 2109157</span><ArrowUpRight size={18}/></a></div><div className="resume-links"><span className="tiny-label">TAKE A CLOSER LOOK</span><a href="/resumes/Munhib-Baig-Resume.pdf" download>Software engineering résumé <Download size={16}/></a><a href="/resumes/Munhib-Baig-AI-ML.pdf" download>AI & machine learning résumé <Download size={16}/></a></div></div>}
createRoot(document.getElementById('root')).render(<App/>);
