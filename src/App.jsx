import './App.css'

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
            <span className="hero-title-accent">Almost Anything.</span>
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
            <p>Planned and executed internal team events, community building initiatives, and marketing campaigns across multiple companies. End to end ownership.</p>
            <div className="pow-card-outcome">Built culture and community from the inside out.</div>
          </div>
          <div className="pow-card">
            <div className="pow-card-tag">Investor Relations</div>
            <h3>MIS & Investor Relations — ZenStatement</h3>
            <p>Prepared monthly MIS for investor review calls. Attended reviews with 3one4, Boldcap, Atrium Angels. Ran investor-led GTM connecting portfolio companies to investor networks.</p>
            <div className="pow-card-outcome">Investor relationships managed across three funds.</div>
          </div>
        </div>
      </section>

      {/* SKILLS — MALGUDI SECTION */}
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
