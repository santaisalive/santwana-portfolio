import { useState, useEffect, useRef, useCallback } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Everything!'

const INITIAL_CARDS = {
  'Early Story': [
    {
      id: 'e1',
      meta: 'Bihar & Jharkhand · 2009',
      title: 'The First Sale',
      desc: 'Selling phenyl door to door at 15 to keep the family going.',
      status: 'CLOSED ✓',
      statusType: 'closed',
      thumbnail: '/card-door-to-door.png',
      story: 'When I was in 10th grade, my father met with an accident. Almost overnight, things at home changed and I had to step in to support the family business. I began going door to door, selling phenyl and toilet cleaners to hotels and hospitals. Those early days were not easy. I still remember standing in front of storekeepers and supervisors, waiting for them to even acknowledge me. Many times they spoke harshly, and sometimes conversations would turn almost abusive. One day my father told me the best way to respond was not to argue or react, but to make sure I walked away with a deal. That shifted something in me. I stopped seeing those interactions as insults and started seeing them as challenges. Slowly I started observing people more closely, understanding what they actually cared about, and adjusting the way I spoke. What once felt uncomfortable began to feel interesting.',
      learning: 'Resilience is not just about pushing harder. It is about trying differently when something does not work.'
    },
    {
      id: 'e2',
      meta: 'Chhattisgarh · 2013',
      title: 'BITS Pilani Pilot',
      desc: 'Built an edtech startup. Got a pilot. Shut it down.',
      status: 'CHURNED',
      statusType: 'churned',
      thumbnail: '#16213e',
      story: 'Placeholder — write your edtech startup story here.',
      learning: 'Momentum is everything. The moment it halts, bouncing back becomes nearly impossible.'
    },
    {
      id: 'e3',
      meta: 'Chhattisgarh · 2015',
      title: 'The College Builder',
      desc: 'Built clubs, earned pocket money from first year.',
      status: 'FOUNDATION',
      statusType: 'learning',
      thumbnail: '#0f3460',
      story: 'Placeholder — write your college builder story here.',
      learning: 'The builder instinct was always there. College just gave it space to breathe.'
    },
  ],
  'Career Snapshot': [
    {
      id: 'c1',
      meta: 'Outsized · 2021',
      title: 'MENA & APAC Market',
      desc: 'Built the entire B2B business from zero.',
      status: 'CLOSED ✓',
      statusType: 'closed',
      thumbnail: '#1a1a2e',
      story: 'Placeholder — write your Outsized story here.',
      learning: 'Building a market from nothing teaches you patience and precision that nothing else can.'
    },
    {
      id: 'c2',
      meta: 'Greylabs · 2023',
      title: 'AI Distribution',
      desc: 'Went to learn how AI is sold. Made a clean exit.',
      status: 'COMPLETE',
      statusType: 'learning',
      thumbnail: '#16213e',
      story: 'Placeholder — write your Greylabs story here.',
      learning: 'Knowing when to leave is as important as knowing where to go.'
    },
    {
      id: 'c3',
      meta: 'ZenStatement · 2024',
      title: "Founder's Office",
      desc: 'Generalist. Investor relations to lead gen engine.',
      status: 'IN PROGRESS',
      statusType: 'inprogress',
      thumbnail: '#0f3460',
      story: 'Placeholder — write your ZenStatement story here.',
      learning: 'Operating across functions showed me what I actually want to be. Not a salesperson. A builder.'
    },
  ],
  'Key Initiatives': [
    {
      id: 'k1',
      meta: 'AI · GTM Engineering',
      title: 'Lead Gen Engine',
      desc: 'Signal-based engine. Python, Apollo, Airtable.',
      status: 'LIVE',
      statusType: 'closed',
      thumbnail: '#1a1a2e',
      story: 'Placeholder — write your lead gen engine story here.',
      learning: 'The best proof of work is something you built without being asked to.'
    },
    {
      id: 'k2',
      meta: 'HomeFlavour · 2024',
      title: 'B2B GTM — HomeFlavour',
      desc: 'Co-building GTM for a village sweet brand.',
      status: 'IN PROGRESS',
      statusType: 'inprogress',
      thumbnail: '#16213e',
      story: 'Placeholder — write your HomeFlavour story here.',
      learning: 'The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea.'
    },
    {
      id: 'k3',
      meta: 'Investor Relations',
      title: 'MIS & Investor GTM',
      desc: 'Managed investor relations across three funds.',
      status: 'COMPLETE',
      statusType: 'learning',
      thumbnail: '#0f3460',
      story: 'Placeholder — write your investor relations story here.',
      learning: 'Investors are not just capital. They are distribution if you activate them right.'
    },
  ],
  'Testimonials': [
    {
      id: 't1',
      meta: 'Placeholder · Role',
      title: 'Testimonial One',
      desc: 'Replace with a real testimonial.',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#1a1a2e',
      story: 'Placeholder — paste the full testimonial text here.',
      learning: ''
    },
    {
      id: 't2',
      meta: 'Placeholder · Role',
      title: 'Testimonial Two',
      desc: 'Replace with a real testimonial.',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#16213e',
      story: 'Placeholder — paste the full testimonial text here.',
      learning: ''
    },
  ],
}

const COLUMNS = ['Early Story', 'Career Snapshot', 'Key Initiatives', 'Testimonials']

const FUN_FACTS = [
  "People call him Santa, hehe I find it silly 😄",
  "Santwana means to console, well I am working for a guy named consolation, lol 😂",
  "This guy cycled 18 kms a day for 2 years for maths tuition. Crazier than I thought 🚲",
  "He loves climbing mountains. He should have asked me, I would have flown him to the top 🚀",
  "Hey You! He doesn't pay me. Isn't unpaid internship illegal on your earth? 👀",
]

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

function SpeechBubble() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % FUN_FACTS.length)
        setVisible(true)
      }, 500)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`speech-bubble ${visible ? 'visible' : 'hidden'}`}>
      {FUN_FACTS[current]}
      <div className="speech-bubble-tail"></div>
    </div>
  )
}

function CardModal({ card, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const thumbnailStyle = card.thumbnail.startsWith('/')
    ? { backgroundImage: `url(${card.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: card.thumbnail }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-thumbnail" style={thumbnailStyle}>
          <div className="modal-thumbnail-overlay">
            <div className="modal-meta">{card.meta}</div>
            <div className="modal-title">{card.title}</div>
            <div className={`card-status ${card.statusType}`}>{card.status}</div>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-story">{card.story}</p>
          {card.learning && (
            <div className="modal-learning">
              <div className="modal-learning-label">THE RECKONING</div>
              <div className="modal-learning-text">"{card.learning}"</div>
            </div>
          )}
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  )
}

function KanbanBoard() {
  const [cards] = useState(INITIAL_CARDS)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [activeCard, setActiveCard] = useState(null)

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
    setDragging(null)
    setDragOver(null)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setDragOver(null)
  }

  return (
    <>
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
                onClick={() => setActiveCard(card)}
              >
                <div
                  className="card-thumbnail"
                  style={card.thumbnail.startsWith('/')
                    ? { backgroundImage: `url(${card.thumbnail})` }
                    : { background: card.thumbnail }
                  }
                ></div>
                <div className="card-meta">{card.meta}</div>
                <div className="card-title">{card.title}</div>
                <div className="card-desc">{card.desc}</div>
                <div className={`card-status ${card.statusType}`}>{card.status}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </>
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
          <div className="hero-greeting">Hi!</div>
          <div className="hero-greeting">I'm Santwana.</div>
          <h1 className="hero-title">
            I Build<br />
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
          <div className="astronaut-wrapper">
            <SpeechBubble />
            <Player
              autoplay
              loop
              src="/astronaut.json"
              style={{ height: '320px', width: '320px' }}
            />
            <div className="cosmos-tag">
              <div className="cosmos-name">Cosmos</div>
              <div className="cosmos-title">Chief Intern @ Santa's</div>
            </div>
          </div>
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
