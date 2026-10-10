import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BarChart3, Binary, BrainCircuit, Braces, Check, CircleHelp, Code2, Database, GitBranch, Github, GraduationCap, Layers, Lightbulb, Linkedin, Mail, MapPin, Menu, MessageSquare, Search, Sparkles, Target, X } from 'lucide-react'
import { AnalyticsWorkspace, ChurnVisual, IncomeVisual } from './DataVisuals'
import { ContactForm } from './ContactForm'

const github = 'https://github.com/tamim7081'
const linkedin = 'https://linkedin.com/in/tamim-hossain-6992412a5'
const email = 'mailto:tamim4346@gmail.com'
const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact']

function Logo() {
  return <a href="#home" className="brand" aria-label="Tamim Hossain, back to home"><span className="monogram">TH<span/></span><span>Tamim Hossain<span className="brand-period">.</span></span></a>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onResize = () => { if (window.innerWidth > 850) setOpen(false) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })
    navItems.forEach(item => { const section = document.getElementById(item.toLowerCase()); if (section) observer.observe(section) })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); observer.disconnect() }
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const links = drawerRef.current?.querySelectorAll<HTMLAnchorElement>('a')
    links?.[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
      if (event.key === 'Tab' && links?.length) {
        const first = links[0]
        const last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggleRef.current?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggleRef.current?.focus() }
        else if (document.activeElement === toggleRef.current) { event.preventDefault(); (event.shiftKey ? last : first)?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey) }
  }, [open])
  return <header className={`site-header ${scrolled || open ? 'scrolled' : ''}`}><div className="container nav-inner"><Logo/><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <a href={`#${item.toLowerCase()}`} className={active === item.toLowerCase() ? 'active' : ''} aria-current={active === item.toLowerCase() ? 'location' : undefined} key={item}>{item}</a>)}</nav><a className="button nav-cta" href="#contact">Let’s Connect <ArrowUpRight size={15}/></a><button className="mobile-toggle" ref={toggleRef} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>{open && <div className="mobile-drawer" id="mobile-navigation" ref={drawerRef}><nav aria-label="Mobile navigation">{navItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} className={active === item.toLowerCase() ? 'active' : ''} onClick={() => { setOpen(false); toggleRef.current?.focus() }}><span className="nav-number">0{index + 1}</span>{item}<ArrowUpRight size={18}/></a>)}</nav><p>Curiosity. Code. Meaningful insights.</p></div>}</header>
}

function SectionHeading({ label, title, description, centered = false }: { label: string; title: ReactNode; description?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}><span className="eyebrow"><span/>{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={`social-links ${compact ? 'compact' : ''}`}><a href={github} target="_blank" rel="noopener noreferrer" aria-label="Tamim Hossain on GitHub"><Github size={17}/>{!compact && <span>GitHub</span>}</a><a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Tamim Hossain on LinkedIn"><Linkedin size={17}/>{!compact && <span>LinkedIn</span>}</a><a href={email} aria-label="Email Tamim Hossain"><Mail size={17}/>{!compact && <span>Email</span>}</a></div>
}

const skills = [
  { icon: Code2, name: 'Programming', number: '01', tags: ['Python', 'SQL'], caption: 'The foundation of my work.' },
  { icon: Database, name: 'Data Analysis', number: '02', tags: ['NumPy', 'Pandas', 'Exploratory Data Analysis'], caption: 'Finding the story in the data.' },
  { icon: BrainCircuit, name: 'Machine Learning', number: '03', tags: ['scikit-learn', 'Regression', 'Classification', 'Feature Engineering', 'Model Evaluation'], caption: 'From patterns to predictions.' },
  { icon: Layers, name: 'Deep Learning', number: '04', tags: ['TensorFlow', 'PyTorch', 'Artificial Neural Networks (ANN)', 'Recurrent Neural Networks (RNN)'], caption: 'Exploring the next layer.' },
  { icon: BarChart3, name: 'Data Visualization', number: '05', tags: ['Matplotlib', 'Seaborn'], caption: 'Making insights easier to see.' },
  { icon: GitBranch, name: 'Tools & Workflow', number: '06', tags: ['Git', 'GitHub'], caption: 'Keeping experiments organized.' },
]

const projects = [
  { number: '01', category: 'MACHINE LEARNING • CLASSIFICATION', title: 'Customer Churn Prediction', tags: ['Python', 'scikit-learn', 'Telco Customer Churn Dataset'], description: 'Built a customer churn classification project using the Telco customer dataset. The work includes a documented methodology, a literature review supporting the modeling choices, structured notebook experiments, and a branch-based Git workflow.', contributions: ['Developed a churn classification workflow.', 'Documented the modeling methodology and relevant literature.', 'Conducted structured experiments in a notebook.', 'Managed the work using a branch-based Git workflow.'], url: 'https://github.com/tamim7081/Experiment', visual: ChurnVisual },
  { number: '02', category: 'DATA ANALYSIS • EXPLORATORY ANALYSIS', title: 'Income Analysis Report', tags: ['Python', 'scikit-learn', 'U.S. Census Data'], description: 'Conducted an income analysis using U.S. Census data, following a documented methodology and using exploratory data analysis to visualize the dataset and investigate patterns.', contributions: ['Explored a real-world public dataset.', 'Used exploratory data analysis.', 'Created data visualizations.', 'Documented the analysis methodology.'], url: 'https://github.com/tamim7081/Adult-census-Income', visual: IncomeVisual },
]

const workflow = [
  { name: 'Understand', icon: CircleHelp, text: 'Clarify the business problem, goals, constraints, and success criteria.' },
  { name: 'Explore', icon: Search, text: 'Understand the dataset, investigate distributions, and identify patterns.' },
  { name: 'Prepare', icon: Database, text: 'Clean the data and prepare suitable features for analysis and modeling.' },
  { name: 'Model', icon: BrainCircuit, text: 'Choose an appropriate analytical or machine learning approach.' },
  { name: 'Evaluate', icon: Target, text: 'Use relevant evaluation metrics to assess model performance.' },
  { name: 'Communicate', icon: MessageSquare, text: 'Present findings, limitations, and practical implications clearly.' },
]

export function Portfolio() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
    }), { threshold: .08 })
    elements.forEach(element => { element.classList.add('reveal-ready'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation/>
    <main id="main">
      <section id="home" className="hero"><div className="hero-grid"/><div className="container hero-inner"><div className="hero-copy"><div className="hero-status"><span/> DATA SCIENCE <b>·</b> MACHINE LEARNING <b>·</b> ANALYTICS</div><div className="hero-intro">Hi, I’m Tamim <span className="intro-line"/></div><h1>Turning Data<br/>Into Meaningful<br/><span className="gradient-text">Insights.</span></h1><p>I’m <strong>Md. Tamim Hossain</strong>, an aspiring Data Scientist passionate about exploring data, building machine learning models, and transforming complex information into actionable insights.</p><div className="hero-actions"><a href="#projects" className="button button-primary">Explore My Projects <ArrowUpRight size={18}/></a><a href="#contact" className="button button-secondary">Let’s Connect <ArrowRight size={17}/></a></div><SocialLinks/><div className="availability"><span className="live-dot"/> Open to opportunities <span className="availability-divider">/</span><MapPin size={13}/> Dhaka, Bangladesh</div></div><AnalyticsWorkspace/></div><div className="container hero-bottom"><a href="#about"><span className="scroll-icon"><ArrowDown size={13}/></span> SCROLL TO EXPLORE</a><span>WHERE CURIOSITY MEETS POSSIBILITY <Sparkles size={13}/></span></div></section>

      <div className="tool-ribbon"><div className="container"><span className="ribbon-label">MY EVERYDAY TOOLKIT</span><span><Braces size={21}/> Python</span><span><Database size={20}/> SQL</span><span><Binary size={22}/> Pandas</span><span><BrainCircuit size={22}/> scikit-learn</span><span><BarChart3 size={21}/> Matplotlib</span><span><Github size={21}/> GitHub</span></div></div>

      <section id="about" className="section container"><div className="about-layout" data-reveal><SectionHeading label="ABOUT ME" title={<>Curious About Data.<br/><span className="text-soft">Focused on Solving Problems.</span></>}/><div className="about-text"><p>I’m an entry-level Data Scientist with hands-on experience in <strong>Python, SQL, data analysis, and machine learning.</strong> I use NumPy and Pandas to explore and prepare data, scikit-learn to build and evaluate regression and classification models, and Matplotlib and Seaborn to visualize insights.</p><p>I’m also familiar with deep learning concepts, including ANN and RNN models using TensorFlow and PyTorch. Through projects in customer churn prediction and income analysis, I’ve developed my approach to exploring datasets, documenting methodology, conducting structured experiments, and communicating findings.</p><p>I’m eager to continue learning and contribute to data-driven solutions that solve real business problems.</p></div></div><div className="about-cards">{[{ icon: Search, title: 'Data Analysis', text: 'Explore, clean, and interpret datasets to discover patterns and useful insights.' }, { icon: BrainCircuit, title: 'Machine Learning', text: 'Develop predictive modeling workflows and evaluate models using appropriate metrics.' }, { icon: Lightbulb, title: 'Continuous Learning', text: 'Build on my knowledge of machine learning, deep learning, and applied data science.' }].map((card, index) => <article className="approach-card hover-card" data-reveal key={card.title}><div className="card-top"><card.icon size={24}/><span className="card-number">0{index + 1}</span></div><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></section>

      <section id="skills" className="section section-tinted"><div className="container"><div data-reveal><SectionHeading label="THE TOOLKIT" title={<>My Technical <span className="text-cyan">Toolkit</span></>} description="Tools and techniques I use to explore data and develop machine learning solutions." centered/></div><div className="skills-grid">{skills.map(skill => <article className="skill-card hover-card" data-reveal key={skill.name}><div className="skill-header"><span className="icon-box"><skill.icon size={21}/></span><h3>{skill.name}</h3><span className="card-number">{skill.number}</span></div><div className="tags">{skill.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>{skill.caption}</p></article>)}</div><p className="section-note"><Sparkles size={14}/> Always learning. Always adding to the toolkit.</p></div></section>

      <section id="projects" className="section container"><div className="section-header-row" data-reveal><SectionHeading label="SELECTED WORK" title={<>Projects That Turn<br/>Data Into <span className="text-cyan">Insight</span></>} description="A closer look at how I approach data exploration, machine learning, and analytical problem-solving."/><a href={github} target="_blank" rel="noopener noreferrer" className="text-link">More on GitHub <ArrowUpRight size={17}/></a></div><div className="projects-grid">{projects.map(project => <article className="project-card hover-card" data-reveal key={project.number}><project.visual/><div className="project-content"><div className="project-category"><span>PROJECT {project.number}</span><span>{project.category}</span></div><h3>{project.title}</h3><div className="tags project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="project-description">{project.description}</p><h4>KEY CONTRIBUTIONS</h4><ul>{project.contributions.map(contribution => <li key={contribution}><Check size={13}/>{contribution}</li>)}</ul><a href={project.url} target="_blank" rel="noopener noreferrer" className="repository-link" aria-label={`View ${project.title} GitHub repository`}><Github size={17}/> View GitHub Repository <ArrowUpRight size={17}/></a></div></article>)}</div></section>

      <section className="section section-tinted" id="process"><div className="container"><div data-reveal><SectionHeading label="THE PROCESS" title={<>From Raw Data to <span className="text-cyan">Meaningful Results</span></>} description="A thoughtful process. A clear purpose. One step at a time." centered/></div><ol className="workflow">{workflow.map((step, index) => <li key={step.name} data-reveal><span className="workflow-number">0{index + 1}</span><div className="workflow-node"><step.icon size={21}/></div><h3>{step.name}</h3><p>{step.text}</p></li>)}</ol><p className="section-note">The exact workflow depends on the problem, dataset, and project requirements.</p></div></section>

      <section id="education" className="section container"><div className="education-layout"><div><div data-reveal><SectionHeading label="LEARNING & GROWTH" title="Education" description="A strong foundation. A lifelong learning mindset."/></div><div className="education-cards">{[{ title: 'Higher Secondary Certificate (HSC)', school: 'Birshreshtha Munshi Abdur Rouf Public College' }, { title: 'Secondary School Certificate (SSC)', school: 'Bright School and College' }].map(education => <article className="education-card hover-card" data-reveal key={education.title}><span className="icon-box"><GraduationCap size={24}/></span><div><div className="education-meta"><span>SCIENCE</span><span>2023–2024</span></div><h3>{education.title}</h3><p>{education.school}</p><span className="gpa"><span className="live-dot"/> GPA: <strong>5.00 / 5.00</strong></span></div></article>)}</div></div><div className="certification-column" data-reveal><SectionHeading label="CONTINUED LEARNING" title="Certification" description="Turning learning into practical knowledge."/><article className="certificate-card"><div className="certificate-top"><Award size={35}/><span>APPLIED LEARNING<br/><span>PROFESSIONAL DEVELOPMENT</span></span></div><div className="certificate-divider"/><h3>Data Science Certificate</h3><p>Issued by <strong>Ostad</strong></p><div className="certificate-bottom"><span>DATA SCIENCE</span><GraduationCap size={18}/></div></article><p className="learning-note"><Lightbulb size={16}/> The best investment is in what you learn next.</p></div></div></section>

      <section id="contact" className="section contact-section"><div className="container contact-layout"><div className="contact-copy" data-reveal><SectionHeading label="LET’S CONNECT" title={<>Let’s Build Something<br/><span className="gradient-text">Meaningful</span> With Data.</>} description="I’m open to entry-level Data Scientist opportunities, collaborations, and conversations about data analytics and machine learning."/><a href={email} className="contact-email">tamim4346@gmail.com <ArrowUpRight size={22}/></a><div className="contact-details"><a href={linkedin} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Linkedin size={18}/></span><div>LinkedIn<span>Let’s connect professionally</span></div><ArrowUpRight size={16}/></a><a href={github} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Github size={18}/></span><div>GitHub<span>Explore my code and experiments</span></div><ArrowUpRight size={16}/></a><div><span className="contact-icon"><MapPin size={18}/></span><div>Dhaka, Bangladesh<span>Open to meaningful opportunities</span></div></div></div><div className="contact-availability"><span className="live-dot"/> A conversation is a great place to start.</div></div><div data-reveal><ContactForm/></div></div></section>
    </main>
    <footer><div className="container footer-main"><div><Logo/><p>Md. Tamim Hossain<br/><span>Data Scientist | Machine Learning Enthusiast.</span></p></div><nav aria-label="Footer navigation">{['Home', 'About', 'Projects', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav><SocialLinks compact/></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Md. Tamim Hossain.</span><span>Built with curiosity and a passion for data.<span className="text-cyan"> ✦</span></span><a href="#home" aria-label="Back to top">Back to top <ArrowUpRight size={14}/></a></div></footer>
  </>
}
