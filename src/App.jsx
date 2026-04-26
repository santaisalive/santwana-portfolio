import { useState, useEffect, useRef, useCallback } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Anything!'

const INITIAL_CARDS = {
  'Early Story': [
    { id: 'e1', meta: 'Bihar · 2009', title: 'Apollo Hospital', desc: 'Closed my first enterprise account at 15. Door to door. No pedigree. Just persistence.', status: 'CLOSED ✓', statusType: 'closed' },
    { id: 'e2', meta: 'Chhattisgarh · 2013', title: 'BITS Pilani Pilot', desc: 'Built an edtech startup in college. Got a pilot with BITS Pilani. Cofounder left. Shut it down.', status: 'CHURNED', statusType: 'churned' },
    { id: 'e3', meta: 'Chhattisgarh · 2015', title: 'The College Builder', desc: 'Built clubs, earned pocket money from first year. The instinct to build was always there.', status: 'FOUNDATION', statusType: 'learning' },
  ],
  'Career Snapshot': [
    { id: 'c1', meta: 'Outsized · 2021', title: 'MENA & APAC Market', desc: 'Built the entire MENA and APAC B2B business from zero. 2.5 years. First market, first enterprise deals.', status: 'CLOSED ✓', statusType: 'closed' },
    { id: 'c2', meta: 'Greylabs · 2023', title: 'AI Distribution', desc: 'Went specifically to learn how AI is sold and distributed. Learned the motion. Made a clean exit.', status: 'COMPLETE', statusType: 'learning' },
    { id: 'c3', meta: 'ZenStatement · 2024', title: 'Founder\'s Office', desc: 'Investor relations, events, marketing, community, content, legal. Operated as a full generalist.', status: 'IN PROGRESS', statusType: 'inprogress' },
  ],
  'Key Initiatives': [
    { id: 'k1', meta: 'AI · GTM Engineering', title: 'Lead Gen Engine', desc: 'Built a signal-based lead generation engine independently. Python, Apollo, GitHub Actions, Airtable. P0/P1/P2 scoring.', status: 'LIVE', statusType: 'closed' },
    { id: 'k2', meta: 'HomeFlavour · 2024', title: 'B2B GTM — HomeFlavour', desc: 'Co-building B2B go-to-market for a premium Indian sweets brand run from a village in Maharashtra.', status: 'IN PROGRESS', statusType: 'inprogress' },
    { id: 'k3', meta: 'Investor Relations', title: 'MIS & Investor GTM', desc: 'Monthly MIS for investor reviews. Worked with 3one4, Boldcap, Atrium Angels. Ran investor-led GTM.', status: 'COMPLETE', statusType: 'learning' },
  ],
  'Testimonials': [
    { id: 't1', meta: 'Placeholder · Role', title: 'Testimonial One', desc: 'Placeholder testimonial. Replace with a real one from someone who has worked with you.', status: 'VERIFIED', statusType: 'closed' },
    { id: 't2', meta: 'Placeholder · Role', title: 'Testimonial Two', desc: 'Placeholder testimonial. Replace with a real one from someone who has worked with you.', status: 'VERIFIED', statusType: 'closed' },
  ],
}

const COLUMNS = ['Early Story', 'Career Snapshot', 'Key Initiatives', 'Testimonials']

function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.2,
      twinkle: Math.random() > 0.75,
      delay: Math.random() * 8000,
      duration: Math.random() * 4000 + 3000,
    }))
  )

  const [opacities, setOpacities] = useState(() =>
    stars.reduce((acc, star) => {
      acc[star.id] = star.baseOpacity
      return acc
    }, {})
  )

  useEffect(() => {
    const intervals = stars
      .filter(star => star.twinkle)
      .map(star => {
        const timeout = setTimeout(() => {
          const interval = setInterval(() => {
            setOpacities(prev => ({
              ...prev,
              [star.id]: prev[star.id] === star.baseOpacity ? 1 : star.baseOpacity
            }))
          }, star.duration)
          return interval
        }, star.delay)
        return timeout
      })
    return () => intervals.forEach(clearTimeout)
  }, [stars])

  return (
    <div className="stars-container">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: opacities[star.id],
            transition: `opacity ${star.duration / 2}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}

function TypeWriter({ onDone }) {
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
    } else if (!done) {
      setDone(true)
      onDone()
    }
  }, [index, done, onDone])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 500)
    return () => clearInterval(interval)
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

function KanbanBoard() {
  const [cards, setCards] = useState(INITIAL_CARDS)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const handleDragStart = (e, cardId, fromCol) => {
    setDragging({ cardId, fromCol })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, col) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(col)
  }

  const handleDrop = (e, toCol) => {
    e.preventDefault()
    if (!dragging) return
    const { fromCol } = dragging
    if (fromCol === toCol) {
      setDragging(null)
      setDragOver(null)
      return
    }
    setTimeout(() => {
      setCards(prev => ({ ...prev }))
    }, 600)
    setDragging(null)
    setDragOver(null)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setDragOver(null)
  }

  return (
    <div className="pipeline-board">
      {COLUMNS.map(col => (
        <div
          key={col}
          className={`pipeline-col ${dragOver === col ? 'drag-over' : ''}`}
          onDragOver={e => handleDragOver(e, col)}
          onDrop={e => handleDrop(e, col)}
          onDragLeave={() => setDragOver(null)}
        >
          <div className="col-header">
            <span className={`col-dot ${col.toLowerCase().replace(' ', '-')}`}></span>
            {col}
            <span className="col-count">{cards[col].length}</span>
          </div>
          {cards[col].map(card => (
            <div
              key={card.id}
              className={`pipeline-card ${dragging?.cardId === card.id ? 'dragging' : ''} ${col === 'Key Initiatives' ? 'active' : ''}`}
              draggable
              onDragStart={e => handleDragStart(e, card.id, col)}
              onDragEnd={handleDragEnd}
            >
              <div className="card-meta">{card.meta}</div>
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.desc}</div>
              <div className={`card-status ${card.statusType}`}>{card.status}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function App() {
  const pipelineRef = useRef(null)
  const [subtitleDone, setSubtitleDone] = useState(false)

  const handleTypewriterDone = useCallback(() => {
    setTimeout(() => setSubtitleDone(true), 300)
  }, [])

  const scrollToPipeline = () => {
    pipelineRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site">
      <Stars />

      <nav>
        <div className="nav-pill">
          <a href="#journey">My Journey</a>
          <a href="#refs">Wall of Ref</a>
          <a href="#work">Best Work</a>
          <a href="#santa">Ask Cosmos</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-status">
            <div className="status-dot"></div>
            <span>Open to Founder's Office roles · Bengaluru</span>
          </div>
          <h1 className="hero-title">
            Will Build<br />
            <TypeWriter onDone={handleTypewriterDone} />
          </h1>
          <p className={`hero-subtitle ${subtitleDone ? 'subtitle-pulse' : ''}`}>
            GTM. AI. Ops. Growth.{' '}
            <span className={`subtitle-highlight ${subtitleDone ? 'underline-in' : ''}`}>
              Yes, all of it.
            </span>
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToPipeline} className="btn-primary">
              Check Pipeline →
            </button>
          </div>
        </div>
        <div className="hero-right">
          <Player
            autoplay
            loop
            src="/astronaut.json"
            style={{ height: '420px', width: '420px' }}
          />
        </div>
      </section>

      <section className="pipeline-section" ref={pipelineRef} id="journey">
        <div className="pipeline-label">CAREER PIPELINE · DRAG TO EXPLORE</div>
        <KanbanBoard />
      </section>

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
