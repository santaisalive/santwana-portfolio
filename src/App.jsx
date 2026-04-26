import { useState, useEffect, useRef } from 'react'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Anything!'

function Stars() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    twinkle: Math.random() > 0.8
  }))

  return (
    <div className="stars-container">
      {stars.map(star => (
        <div
          key={star.id}
          className={`star ${star.twinkle ? 'twinkle' : ''}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

function TypeWriter() {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (index < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + TYPEWRITER_TEXT[index])
        setIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else if (index === TYPEWRITER_TEXT.length && !done) {
      setDone(true)
    }
  }, [index, done])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={`hero-title-accent ${done ? 'compiled' : ''}`}>
      {displayed}
      <span style={{
        borderRight: `3px solid ${done ? '#4ade80' : 'rgba(255,255,255,0.8)'}`,
        marginLeft: '2px',
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.1s, border-color 0.3s'
      }}></span>
    </span>
  )
}

function App() {
  const pipelineRef = useRef(null)

  const scrollToPipeline = () => {
    pipelineRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site">
      <Stars />

      {/* NAV */}
      <nav>
        <div className="nav-pill">
          <a href="#journey">My Journey</a>
          <a href="#refs">Wall of Ref</a>
          <a href="#work">Best Work</a>
          <a href="#santa">Ask Santa</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-status">
            <div className="status-dot"></div>
            <span>Open to Founder's Office roles · Bengaluru</span>
          </div>
          <h1 className="hero-title">
            Will Build<br />
            <TypeWriter />
          </h1>
          <p className="hero-subtitle">
            GTM. AI. Ops. Growth. Yes, all of it.
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToPipeline} className="btn-primary">
              Check Pipeline →
            </button>
            <a href="#santa" className="btn-secondary">
              <span className="santa-wave">🎅</span> Ask Santa
            </a>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="pipeline-section" ref={pipelineRef} id="journey">
        <div className="pipeline-label">CAREER PIPELINE</div>
        <div className="pipeline-board">

          <div className="pipeline-col">
            <div className="col-header">
              <span className="col-dot origin"></span>
              Origin
            </div>
            <div className="pipeline-card">
              <div className="card-meta">Bihar · 2009</div>
              <div className="card-title">Apollo Hospital</div>
              <div className="card-desc">Closed my first enterprise account at 15. Door to door. No pedigree. Just persistence.</div>
              <div className="card-status closed">CLOSED ✓</div>
            </div>
            <div className="pipeline-card">
              <div className="card-meta">Chhattisgarh · 2013</div>
              <div className="card-title">BITS Pilani Pilot</div>
              <div className="card-desc">Built an edtech startup in college. Got a pilot with BITS Pilani. Cofounder left. Shut it down.</div>
              <div className="card-status churned">CHURNED</div>
            </div>
          </div>

          <div className="pipeline-col">
            <div className="col-header">
              <span className="col-dot building"></span>
              Building
            </div>
            <div className="pipeline-card">
              <div className="card-meta">Outsized · 2021</div>
              <div className="card-title">MENA & APAC Market</div>
              <div className="card-desc">Built the entire MENA and APAC B2B business from zero. 2.5 years. First market, first enterprise deals.</div>
              <div className="card-status closed">CLOSED ✓</div>
            </div>
            <div className="pipeline-card">
              <div className="card-meta">Greylabs · 2023</div>
              <div className="card-title">AI Distribution</div>
              <div className="card-desc">Went specifically to learn how AI is sold and distributed. Learned the motion. Made a clean exit.</div>
              <div className="card-status learning">LEARNING</div>
            </div>
          </div>

          <div className="pipeline-col">
            <div className="col-header">
              <span className="col-dot now"></span>
              Now
            </div>
            <div className="pipeline-card active">
              <div className="card-meta">ZenStatement · 2024</div>
              <div className="card-title">Lead Gen Engine</div>
              <div className="card-desc">Built a signal-based lead generation engine independently. Python, Apollo, GitHub Actions, Airtable.</div>
              <div className="card-status inprogress">IN PROGRESS</div>
            </div>
            <div className="pipeline-card active">
              <div className="card-meta">HomeFlavour · 2024</div>
              <div className="card-title">B2B GTM</div>
              <div className="card-desc">Co-building B2B go-to-market for a premium Indian sweets brand run from a village in Maharashtra.</div>
              <div className="card-status inprogress">IN PROGRESS</div>
            </div>
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
