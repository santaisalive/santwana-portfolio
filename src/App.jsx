import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import './App.css'

const TYPEWRITER_TEXT = 'Almost Everything!'

const INITIAL_CARDS = {
  'Early Story': [
    {
      id: 'e1',
      meta: 'Bihar & Jharkhand · 2013',
      title: 'The First Sale',
      desc: 'Selling phenyl door to door at 15 to keep the family going.',
      status: 'CLOSED',
      statusType: 'closed',
      thumbnail: '/card-door-to-door.png',
      images: [],
      links: [],
      story: 'When I was in 10th grade, my father met with an accident. Almost overnight, things at home changed and I had to step in to support the family businessWhen I was in 10th grade, my father met with an accident. Almost overnight, things at home changed and I had to step in to support the family businessWhen I was in 10th grade, my father met with an accident. Almost overnight, things at home changed and I had to step in to support the family business. I began going door to door, selling phenyl and toilet cleaners to hotels and hospitals. Those early days were not easy. I still remember standing in front of storekeepers and supervisors, waiting for them to even acknowledge me. Many times they spoke harshly, and sometimes conversations would turn almost abusive. One day my father told me the best way to respond was not to argue or react, but to make sure I walked away with a deal. That shifted something in me. I stopped seeing those interactions as insults and started seeing them as challenges. Slowly I started observing people more closely, understanding what they actually cared about, and adjusting the way I spoke. What once felt uncomfortable began to feel interesting.',
      learning: 'Resilience is not just about pushing harder. It is about trying differently when something does not work.'
    },
    {
      id: 'e2',
      meta: 'Chhattisgarh · 2014',
      title: 'College Ventures',
      desc: 'Built clubs, a peer learning platform, and repaid my education loan.',
      status: 'FOUNDATION',
      statusType: 'learning',
      thumbnail: '/card-college-ventures.jpg',
      images: [],
      links: [],
      story: 'When I landed in college, I came with a clear thought in my mind. I wanted to build something of my own. I started with a robotics venture but it was high capital and we had to let it go. I shifted focus and built Nexus, the first alumni-student interaction cell in the college, and set up the first student-driven placement cell. For the first time, the college saw campus placements with the highest package going up to 24 LPA. I then built a peer-to-peer learning platform called SkillEva, got our first institutional pilot with BITS Pilani, and students started paying for courses. But my CTO left to pursue higher studies and I had to shut it down. Alongside all this I was writing content for companies which turned into a steady side income. It helped me manage my expenses and eventually repay my education loan.',
      learning: 'I enjoy building things from scratch. More than anything, I learned how to juggle multiple priorities and keep moving forward even when things do not go as planned.'
    },
    {
      id: 'e3',
      meta: 'Bengaluru · 2017',
      title: 'Winning in Ambiguity',
      desc: 'Won a national debate on DApps with 24 hours of preparation.',
      status: 'WON',
      statusType: 'closed',
      thumbnail: '/card-ambiguity.png',
      images: [],
      links: [],
      story: 'I had applied for a debate competition called Brainium Face-Off at BMS Institute of Technology. When the topic was revealed I realized I had stepped into completely unfamiliar territory. It was on DApps, decentralized applications built on blockchain. I had 24 hours. I knew I could not compete on technical depth so instead I focused on how I could think better. I built a simple framework of core arguments, supporting arguments, counterpoints, and objection handling. I reached out to friends working on blockchain projects to understand how they thought about it. When the debate happened I focused on clarity. I was not trying to sound the smartest in the room. I was trying to make the most sense. And that worked. The prize money was 10,000 rupees. I used it to repair a second-hand laptop I depended on for everything.',
      learning: 'You do not always need to know everything to win. The ability to think clearly, structure your approach, and learn quickly is enough to put you ahead.'
    },
    {
      id: 'e4',
      meta: 'Chhattisgarh · 2018',
      title: 'Research Paper Published',
      desc: 'Published in Springer via Journal of Institution of Engineers.',
      status: 'PUBLISHED',
      statusType: 'closed',
      thumbnail: '/card-research.jpg',
      images: [],
      links: [
        { label: 'Published Paper', url: 'https://link.springer.com' }
      ],
      story: 'In my final year, most people were focused on completing their projects and moving on. My mentor suggested I explore research on green manufacturing practices. Almost everyone advised me against it. But I was curious. I started reading research papers to understand how arguments were built and conclusions drawn. I found a physical directory of local manufacturing firms, visited a few in person, and shaped my understanding into a thesis. My professor connected me with a research scholar from NIT Raipur and the three of us worked together every night after 10pm till 1am. We designed a survey using a five-point Likert scale and submitted our work. It got selected in the Journal of The Institution of Engineers India Series C. A few weeks later we received confirmation from Springer. Our paper had been accepted and published.',
      learning: 'Structured evidence-based research taught me the difference between having an idea and proving it with data.'
    },
  ],
  'Career Snapshot': [
    {
      id: 'c1',
      meta: 'Outsized · 2021',
      title: 'Building MENA and APAC',
      desc: 'Built the entire B2B business from zero. 480K dollars in revenue.',
      status: 'CLOSED',
      statusType: 'closed',
      thumbnail: '/card-outsized.jpg',
      images: [],
      links: [],
      story: 'My journey at Outsized did not start with a big role. I was manually reviewing profiles, filling in missing data, and writing content. Things changed when I was asked to work directly with the MENA Managing Director. The goal was simple on paper but difficult in reality. Build the MENA business from scratch. We started with the MD network and went very specific. We noticed many senior stakeholders were into golf so we built a list of leaders across target companies who played golf. We built a key life events calendar, tracking movements and announcements to reach out when it actually mattered. That is how we started closing deals. We worked with top consulting firms, banks, and financial institutions across MENA, building the business to around 480,000 dollars in revenue.',
      learning: 'Growth is rarely about one big move. It is a series of small thoughtful actions. Understanding people, timing conversations well, and staying consistent can compound into something much bigger.'
    },
    {
      id: 'c2',
      meta: 'Greylabs · 2023',
      title: 'AI Distribution',
      desc: '4 months that felt like a year. Sales, LLMs, and a clean exit.',
      status: 'COMPLETE',
      statusType: 'learning',
      thumbnail: '/card-greylabs.png',
      images: [],
      links: [],
      story: 'My 4 months at Greylabs felt like time near a black hole. Compressed from the outside, but inside it stretched into what felt like a year. I ran demos, closed a deal with a real estate firm at a premium price point, and began learning how to train LLM models for specific use cases. I built a proof of concept for a wealth management firm that most people had avoided because of its complexity. From there I shifted into lead generation. We built an AI-driven automation system and ran around 400 outbound messages a week targeting 200 BFSI companies. That translated into 40 to 50 MQLs every month. But in the first couple of months I noticed a cultural misalignment. So I made a decision and moved on.',
      learning: 'Knowing when to leave is as important as knowing where to go. A short stint done right teaches more than a long one done wrong.'
    },
    {
      id: 'c3',
      meta: 'ZenStatement · 2024',
      title: 'Founders Office',
      desc: 'Community led sales, ABM, D and D card game, US GTM and more.',
      status: 'IN PROGRESS',
      statusType: 'inprogress',
      thumbnail: '/card-zenstatement.jpeg',
      images: [],
      links: [],
      story: 'I joined ZenStatement with a clear intent. To work closely with an early-stage team building from scratch. From day one my role was not limited to a function. I built CFO Ledger, a not-for-profit community of finance leaders that became our starting point for relationships. We layered in a strong account-based approach, tracking fundraises, product launches, and leadership changes as entry points. For the US GTM I designed a card game inspired by Dungeons and Dragons tailored to our problem space. Along with a comic-style sheet it became a strong conversation starter. I started a short video series engaging finance leaders with fun and insightful questions. I drove revenue end to end from building pipeline to closing deals, drafting agreements, and handing over to customer success.',
      learning: 'Relationships compound. Distribution is built slowly. Execution across multiple fronts is what drives real growth.'
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
      images: [],
      links: [],
      story: 'Placeholder — write your lead gen engine story here.',
      learning: 'The best proof of work is something you built without being asked to.'
    },
    {
      id: 'k2',
      meta: 'HomeFlavour · 2024',
      title: 'B2B GTM HomeFlavour',
      desc: 'Co-building GTM for a premium Indian sweets brand.',
      status: 'IN PROGRESS',
      statusType: 'inprogress',
      thumbnail: '#16213e',
      images: [],
      links: [],
      story: 'Placeholder — write your HomeFlavour story here.',
      learning: 'The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea.'
    },
    {
      id: 'k3',
      meta: 'Investor Relations',
      title: 'MIS and Investor GTM',
      desc: 'Managed investor relations across three funds.',
      status: 'COMPLETE',
      statusType: 'learning',
      thumbnail: '#0f3460',
      images: [],
      links: [],
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
      images: [],
      links: [],
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
      images: [],
      links: [],
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
  "Hey You! He doesnt pay me. Isnt unpaid internship illegal on your earth? 👀",
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
            left: star.x + '%',
            top: star.y + '%',
            width: star.size + 'px',
            height: star.size + 'px',
            opacity: opacities[star.id],
            transition: 'opacity ' + (star.duration / 2) + 'ms ease-in-out',
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
    <span className={done ? 'hero-title-accent compiled' : 'hero-title-accent'}>
      {displayed}
      <span style={{
        borderRight: '3px solid ' + (done ? '#4ade80' : 'rgba(255,255,255,0.8)'),
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
    <div className={visible ? 'speech-bubble visible' : 'speech-bubble hidden'}>
      {FUN_FACTS[current]}
      <div className="speech-bubble-tail"></div>
    </div>
  )
}

function CardModal({ card, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return function() {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  var thumbnailStyle = card.thumbnail.startsWith('/')
    ? { backgroundImage: 'url(' + card.thumbnail + ')', backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: card.thumbnail }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={function(e) { e.stopPropagation() }}>
        <div className="modal-thumbnail" style={thumbnailStyle}>
          <div className="modal-thumbnail-overlay">
            <div className="modal-meta">{card.meta}</div>
            <div className="modal-title">{card.title}</div>
            <div className={'card-status ' + card.statusType}>{card.status}</div>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-story">{card.story}</p>
          {card.images && card.images.length > 0 && (
            <div className="modal-images-stack">
              {card.images.map(function(img, i) {
                return (
                  <div key={i}>
                    <div className="modal-image-item" style={{ backgroundImage: 'url(' + img.src + ')' }}></div>
                    {img.caption && <div className="modal-image-caption">{img.caption}</div>}
                  </div>
                )
              })}
            </div>
          )}
          {card.links && card.links.length > 0 && (
            <div className="modal-links">
              {card.links.map(function(link, i) {
                return (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                    {link.label} — Check it! ↗
                  </a>
                )
              })}
            </div>
          )}
          {card.learning && (
            <div className="modal-learning">
              <div className="modal-learning-label">THE RECKONING</div>
              <div className="modal-learning-text">"{card.learning}"</div>
            </div>
          )}
        </div>
        <button className="modal-close" onClick={onClose}>x</button>
      </div>
    </div>,
    document.body
  )
}

function KanbanBoard() {
  const [cards] = useState(INITIAL_CARDS)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [activeCard, setActiveCard] = useState(null)

  function handleDragStart(e, cardId, fromCol) {
    setDragging({ cardId: cardId, fromCol: fromCol })
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, col) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(col)
  }

  function handleDrop(e, toCol) {
    e.preventDefault()
    setDragging(null)
    setDragOver(null)
  }

  function handleDragEnd() {
    setDragging(null)
    setDragOver(null)
  }

  return (
    <div>
      <div className="pipeline-board">
        {COLUMNS.map(function(col) {
          return (
            <div
              key={col}
              className={dragOver === col ? 'pipeline-col drag-over' : 'pipeline-col'}
              onDragOver={function(e) { handleDragOver(e, col) }}
              onDrop={function(e) { handleDrop(e, col) }}
              onDragLeave={function() { setDragOver(null) }}
            >
              <div className="col-header">
                <span className={'col-dot ' + col.toLowerCase().replace(' ', '-')}></span>
                {col}
                <span className="col-count">{cards[col].length}</span>
              </div>
              {cards[col].map(function(card) {
                var isActive = col === 'Key Initiatives'
                var isDragging = dragging && dragging.cardId === card.id
                var cardClass = 'pipeline-card' + (isDragging ? ' dragging' : '') + (isActive ? ' active' : '')
                var thumbStyle = card.thumbnail.startsWith('/')
                  ? { backgroundImage: 'url(' + card.thumbnail + ')' }
                  : { background: card.thumbnail }
                return (
                  <div
                    key={card.id}
                    className={cardClass}
                    draggable
                    onDragStart={function(e) { handleDragStart(e, card.id, col) }}
                    onDragEnd={handleDragEnd}
                    onClick={function() { setActiveCard(card) }}
                  >
                    <div className="card-thumbnail" style={thumbStyle}></div>
                    <div className="card-meta">{card.meta}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-desc">{card.desc}</div>
                    <div className={'card-status ' + card.statusType}>{card.status}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {activeCard && (
        <CardModal card={activeCard} onClose={function() { setActiveCard(null) }} />
      )}
    </div>
  )
}

function App() {
  const pipelineRef = useRef(null)
  const [subtitleDone, setSubtitleDone] = useState(false)

  const handleTypewriterDone = useCallback(function() {
    setTimeout(function() { setSubtitleDone(true) }, 300)
  }, [])

  function scrollToPipeline() {
    if (pipelineRef.current) pipelineRef.current.scrollIntoView({ behavior: 'smooth' })
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
            <span>Open to Founders Office roles · Bengaluru</span>
          </div>
          <div className="hero-greeting">Hi!</div>
          <div className="hero-greeting">I am Santwana.</div>
          <h1 className="hero-title">
            I Build<br />
            <TypeWriter onDone={handleTypewriterDone} />
          </h1>
          <p className={subtitleDone ? 'hero-subtitle subtitle-pulse' : 'hero-subtitle'}>
            GTM. AI. Ops. Growth.{' '}
            <span className={subtitleDone ? 'subtitle-highlight underline-in' : 'subtitle-highlight'}>
              Yes, all of it.
            </span>
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToPipeline} className="btn-primary">
              Check Pipeline
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
              <div className="cosmos-title">Chief Intern @ Santas</div>
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
