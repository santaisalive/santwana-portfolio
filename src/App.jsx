import './App.css'

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
    story: "Placeholder — aunt running a premium Indian sweets brand from a village in Maharashtra. Supporting her B2B GTM because you believe in her will to build something of her own after a lifetime of giving to her family.",
    learning: "The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea."
  },
  {
    num: "VIII",
    prop: "⭐",
    tag: "What Comes Next",
    title: "The Next Chapter",
    story: "Placeholder — operating as a founder minus one. Owning GTM strategy and the full motion, not just a slice of it. AI native distribution. Building systems not just running them.",
    learning: "The uncharted path is not a problem to solve. It is the point."
  }
]

function App() {
  return (
    <div>
      {/* Nav */}
      <nav>
        <span className="name">Santwana</span>
        <a href="#oracle" className="oracle-link">Consult The Oracle</a>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="label">Portfolio · 2026</div>
        <h1>Builder. <em>Seller.</em><br />GTM Operator.</h1>
        <p className="intro">
          I started selling door to door in Bihar at 15. 
          Today I build GTM systems, lead generation engines, 
          and growth motions for B2B companies. This is the story in between.
        </p>
        <div className="tags">
          <span className="tag">B2B Sales</span>
          <span className="tag">GTM</span>
          <span className="tag">AI Automation</span>
          <span className="tag">Founder's Office</span>
          <span className="tag">Bengaluru</span>
        </div>
        <div className="scroll-hint">↓ Scroll to read</div>
      </div>

      {/* Chapters */}
      <div className="chapters">
        {chapters.map((chapter) => (
          <div className="chapter" key={chapter.num}>
            <div className="chapter-meta">
              <div className="chapter-num">Chapter {chapter.num}</div>
              <span className="chapter-prop">{chapter.prop}</span>
              <div className="chapter-tag">{chapter.tag}</div>
            </div>
            <div className="chapter-content">
              <h2>{chapter.title}</h2>
              <p className="story">{chapter.story}</p>
              <p className="learning">"{chapter.learning}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Oracle CTA */}
      <div className="oracle-cta" id="oracle">
        <h2>Consult The Oracle</h2>
        <p>
          Tell the Oracle what you are looking for. 
          It will tell you honestly whether I am the right fit.
        </p>
        <a href="/oracle" className="oracle-btn">Ask The Oracle</a>
      </div>

      {/* Footer */}
      <footer>
        <span className="footer-name">Santwana</span>
        <div className="footer-links">
          <a href="https://github.com/santaisalive" target="_blank">GitHub</a>
          <a href="mailto:your@email.com">Email</a>
        </div>
      </footer>
    </div>
  )
}

export default App
