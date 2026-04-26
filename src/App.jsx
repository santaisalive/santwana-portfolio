import { useState, useEffect } from 'react'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Anything.'

function TypeWriter() {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (index < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + TYPEWRITER_TEXT[index])
        setIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="hero-title-accent">
      {displayed}
      <span style={{ 
        borderRight: '3px solid #8B4513',
        marginLeft: '2px',
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.1s'
      }}>
      </span>
    </span>
  )
}

const chapters = [
  {
    num: "I",
    prop: "🧴",
    tag: "Bihar & Jharkhand · 2009",
    title: "The First Sale",
    story: "Placeholder — your Bihar and Jharkhand story goes here. The father's accident, selling phenyle and toilet cleaner door to door to hotels and hospitals, standing at reception desks for days, closing Apollo Hospital Ranchi at 15 years old.",
    learning: "What selling at 15 taught you that no business school ever could."
  },
  {
    num: "II",
    prop: "🏏",
    tag: "Chhattisgarh · 2013",
    title: "The College Years",
    story: "Placeholder — engineering college, building clubs, earning pocket money from first year, the instinct to always be doing something beyond just studying.",
    learning: "What building communities from scratch in college taught you."
  },
  {
    num: "III",
    prop: "💡",
    tag: "The Ventures · 2019",
    title: "Two Attempts",
    story: "Placeholder — edtech startup during Covid, peer to peer learning, BITS Pilani pilot, cofounder left, shut it down with no runway.",
    learning: "Momentum is everything. The moment it halts, bouncing back becomes nearly impossible."
  },
  {
    num: "IV",
    prop: "🌍",
    tag: "Outsized · 2021",
    title: "Building From Zero",
    story: "Placeholder — 2.5 years building the MENA and APAC business from scratch. First enterprise deals, global clients, full GTM stack.",
    learning: "What building a market from nothing taught you about patience and precision."
  },
  {
    num: "V",
    prop: "📱",
    tag: "Greylabs · Mumbai · 2023",
    title: "The AI Chapter",
    story: "Placeholder — three months, deliberate. Went specifically to learn how AI distribution works. Made a values based exit when the environment did not match the learning.",
    learning: "Knowing when to leave is as important as knowing where to go."
  },
  {
    num: "VI",
    prop: "📈",
    tag: "ZenStatement · Bengaluru · 2024",
    title: "The Generalist",
    story: "Placeholder — joined as sales, operated as a generalist. Investor relations, events, marketing, community, content, legal. Quietly built a signal based lead generation engine independently on the side.",
    learning: "Operating across functions showed me what I actually want to be. Not a salesperson. A builder."
  },
  {
    num: "VII",
    prop: "✉️",
    tag: "HomeFlavour · Maharashtra · 2024",
    title: "Helping Her Build",
    story: "Placeholder — aunt running a premium Indian sweets brand from a village in Maharashtra. Supporting her B2B GTM because you believe in her will to build something of her own.",
    learning: "The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea."
  },
  {
    num: "VIII",
    prop: "⭐",
    tag: "What Comes Next",
    title: "The Next Chapter",
    story: "Placeholder — operating as a founder minus one. Owning GTM strategy and the full motion. AI native distribution. Building systems not just running them.",
    learning: "The uncharted path is not a problem to solve. It is the point."
  }
]

function App() {
  return (
    <div className="site">

      {/* NAV */}
      <nav>
        <span className="nav-name">Santwana</span>
        <div className="nav-links">
          <a href="/story">Know My Story</a>
          <a href="/santa" className="nav-cta">Ask Santa</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-label">Founder's Office · GTM · AI · Bengaluru</div>
          <h1 className="hero-title">
            Will Build<br />
            <TypeWriter />
          </h1>
          <p className="hero-subtitle">
            GTM. AI. Ops. Growth. Yes, all of it.
          </p>
          <div className="hero-buttons">
            <a href="/santa" className="btn-primary">
              <span className="santa-wave">🎅</span> Ask Santa
            </a>
            <a href="/story" className="btn-secondary">
              Know My Story →
            </a>
          </div>
        </div>
        <div className="hero-tags">
          <span>B2B Sales</span>
          <span>GTM Engineering</span>
          <span>AI Automation</span>
          <span>Founder's Office</span>
          <span>Investor Relations</span>
          <span>0 to 1</span>
        </div>
      </section>

      {/* PROOF OF WORK */}
      <section className="pow-section">
        <div className="pow-label">PROOF OF WORK</div>
        <div className="pow-scroll">
          <div className="pow-card">
            <div className="pow-card-tag">AI · GTM Engineering</div>
            <h3>Signal-Based Lead Generation Engine</h3>
            <p>Built independently. Python, JSearch, Apollo, GitHub Actions, Airtable. Scores leads P0/P1/P2 based on hiring signals, fundraise activity, tech stack, release velocity.</p>
            <div className="pow-card-outcome">Used to pitch founders directly. Secured call with Fore.ai.</div>
          </div>
          <div className="pow-card">
            <div className="pow-card-tag">GTM · ABM</div>
            <h3>HomeFlavour B2B GTM</h3>
            <p>Building B2B go-to-market from scratch for a premium Indian sweets brand run by a woman in rural Maharashtra. Targeting corporate gifting, wellness studios, wedding planners.</p>
            <div className="pow-card-outcome">First B2B deals in progress. ICP defined. Outreach live.</div>
          </div>
          <div className="pow-card">
            <div className="pow-card-tag">GTM · Growth</div>
            <h3>MENA & APAC Business — Outsized</h3>
            <p>Built the entire MENA and APAC B2B market from zero at Outsized. Sales, partnerships, GTM strategy, first enterprise accounts. 2.5 years, zero to meaningful revenue.</p>
            <div className="pow-card-outcome">Market built from scratch. Multiple enterprise accounts closed.</div>
          </div>
          <div className="pow-card">
            <div className="pow-card-tag">Events · Community</div>
            <h3>Internal Events — Outsized & ZenStatement</h3>
            <p>Planned and executed internal team events, community building initiatives, and marketing campaigns. End to end ownership.</p>
            <div className="pow-card-outcome">Built culture and community from the inside out.</div>
          </div>
          <div className="pow-card">
            <div className="pow-card-tag">Investor Relations</div>
            <h3>MIS & Investor Relations — ZenStatement</h3>
            <p>Prepared monthly MIS for investor review calls. Attended reviews with 3one4, Boldcap, Atrium Angels. Ran investor-led GTM.</p>
            <div className="pow-card-outcome">Investor relationships managed across three funds.</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <div className="skills-label">WHAT I BRING</div>
        <div className="skills-content">
          <div className="skills-deep">
            <div className="skills-deep-item">
              <h3>GTM</h3>
              <p>ICP research, outbound, ABM, positioning, pipeline, first customers. From zero to repeatable motion.</p>
            </div>
            <div className="skills-deep-item">
              <h3>AI & Automation</h3>
              <p>Claude, GPT, n8n, Python, GitHub Actions, Apollo, Clay. Builder not just user. I see a manual process and build the system to eliminate it.</p>
            </div>
          </div>
          <div className="skills-broad">
            <span>Fundraise Support</span>
            <span>Investor Relations</span>
            <span>Hiring</span>
            <span>Events</span>
            <span>Community</span>
            <span>Content</span>
            <span>Operations</span>
            <span>Legal Exposure</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>Santwana · Bengaluru</span>
        <div className="footer-links">
          <a href="https://github.com/santaisalive" target="_blank">GitHub</a>
          <a href="mailto:your@email.com">Email</a>
        </div>
      </footer>

    </div>
  )
}

export default App
