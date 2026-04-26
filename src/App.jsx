import { useState, useEffect, useRef } from 'react'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Anything!'

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
      }}></span>
    </span>
  )
}

function ShipWheel() {
  const wheelRef = useRef(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const lastAngle = useRef(null)
  const animRef = useRef(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    if (autoRotate) {
      const animate = () => {
        rotationRef.current += 0.03
        setRotation(rotationRef.current)
        animRef.current = requestAnimationFrame(animate)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    return () => cancelAnimationFrame(animRef.current)
  }, [autoRotate])

  const getAngle = (e, rect) => {
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
  }

  const handleMouseDown = (e) => {
    setAutoRotate(false)
    setIsDragging(true)
    const rect = wheelRef.current.getBoundingClientRect()
    lastAngle.current = getAngle(e, rect)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const rect = wheelRef.current.getBoundingClientRect()
    const currentAngle = getAngle(e, rect)
    const delta = currentAngle - lastAngle.current
    rotationRef.current += delta
    setRotation(rotationRef.current)
    lastAngle.current = currentAngle
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setAutoRotate(true), 2000)
  }

  return (
    <div
      className="wheel-container"
      ref={wheelRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotation}deg)` }}
        className="ship-wheel"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="#8B4513" strokeWidth="8"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="#8B4513" strokeWidth="2"/>
        <circle cx="100" cy="100" r="18" fill="#EDE0CC" stroke="#8B4513" strokeWidth="5"/>
        <circle cx="100" cy="100" r="8" fill="#8B4513"/>
        <line x1="100" y1="18" x2="100" y2="82" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="100" y1="118" x2="100" y2="182" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="18" y1="100" x2="82" y2="100" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="118" y1="100" x2="182" y2="100" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="36" y1="36" x2="82" y2="82" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="118" y1="118" x2="164" y2="164" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="164" y1="36" x2="118" y2="82" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <line x1="36" y1="164" x2="82" y2="118" stroke="#8B4513" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="100" cy="12" r="7" fill="#8B4513"/>
        <circle cx="100" cy="188" r="7" fill="#8B4513"/>
        <circle cx="12" cy="100" r="7" fill="#8B4513"/>
        <circle cx="188" cy="100" r="7" fill="#8B4513"/>
        <circle cx="29" cy="29" r="7" fill="#8B4513"/>
        <circle cx="171" cy="171" r="7" fill="#8B4513"/>
        <circle cx="171" cy="29" r="7" fill="#8B4513"/>
        <circle cx="29" cy="171" r="7" fill="#8B4513"/>
      </svg>
    </div>
  )
}

const cards = [
  {
    type: 'work',
    tag: 'AI · GTM Engineering',
    title: 'Signal-Based Lead Gen Engine',
    desc: 'Built independently. Python, JSearch, Apollo, GitHub Actions, Airtable. Scores leads P0/P1/P2 based on hiring and fundraise signals.'
  },
  {
    type: 'journey',
    tag: 'Bihar · 2009',
    title: 'The First Sale',
    desc: 'Started selling door to door at 15. Closed Apollo Hospital Ranchi. Learned enterprise sales before I knew what it was called.'
  },
  {
    type: 'work',
    tag: 'GTM · ABM',
    title: 'HomeFlavour B2B GTM',
    desc: 'Building go-to-market from scratch for a premium Indian sweets brand in rural Maharashtra. Corporate gifting, wellness studios, weddings.'
  },
  {
    type: 'journey',
    tag: 'Chhattisgarh · 2013',
    title: 'The College Builder',
    desc: 'Built clubs, earned pocket money from first year, attempted an edtech startup, got a pilot with BITS Pilani. Never just studied.'
  },
  {
    type: 'work',
    tag: 'GTM · Growth',
    title: 'MENA & APAC — Outsized',
    desc: 'Built the entire MENA and APAC B2B market from zero. 2.5 years, zero to enterprise accounts. First market, first deals, full stack GTM.'
  },
  {
    type: 'journey',
    tag: 'Bengaluru · 2024',
    title: 'The Generalist',
    desc: 'Joined as sales. Ended up doing investor relations, events, marketing, community, content, legal. Then built an AI engine on the side.'
  },
  {
    type: 'work',
    tag: 'Investor Relations',
    title: 'MIS & Investor GTM',
    desc: 'Monthly MIS for investor reviews. Worked with 3one4, Boldcap, Atrium Angels. Ran investor-led GTM connecting portfolio to networks.'
  },
]

function SwipeCards() {
  const scrollRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDown(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      className="cards-scroll"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDown(false)}
      onMouseLeave={() => setIsDown(false)}
      style={{ cursor: isDown ? 'grabbing' : 'grab' }}
    >
      {cards.map((card, i) => (
        <div className={`swipe-card ${card.type}`} key={i}>
          <div className="swipe-card-tag">{card.tag}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="site">

      {/* NAV */}
      <nav>
        <div className="nav-pill">
          <a href="#journey">My Journey</a>
          <a href="#refs">Wall of Ref</a>
          <a href="#work">Best Work</a>
          <a href="#contact">Let's Speak</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Will Build<br />
            <TypeWriter />
          </h1>
          <p className="hero-subtitle">GTM. AI. Ops. Growth. Yes, all of it.</p>
          <div className="hero-buttons">
            <a href="/santa" className="btn-primary">
              <span className="santa-wave">🎅</span> Ask Santa
            </a>
            <a href="#journey" className="btn-secondary">Know My Story →</a>
          </div>
        </div>
        <div className="hero-right">
          <ShipWheel />
        </div>
      </section>

      {/* SWIPE CARDS */}
      <section className="cards-section">
        <div className="cards-label">DRAG TO EXPLORE</div>
        <SwipeCards />
      </section>

      {/* SKILLS */}
      <section className="skills-section" id="work">
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
