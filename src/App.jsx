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
      story: 'When I was in 10th grade, my father met with an accident. Almost overnight, things at home changed and I had to step in to support the family business. I began going door to door, selling phenyl and toilet cleaners to hotels and hospitals. Those early days were not easy. I still remember standing in front of storekeepers and supervisors, waiting for them to even acknowledge me. Many times they spoke harshly, and sometimes conversations would turn almost abusive. One day my father told me the best way to respond was not to argue or react, but to make sure I walked away with a deal. That shifted something in me. I stopped seeing those interactions as insults and started seeing them as challenges. Slowly I started observing people more closely, understanding what they actually cared about, and adjusting the way I spoke. What once felt uncomfortable began to feel interesting.',
      learning: 'Resilience is not just about pushing harder. It is about trying differently when something does not work.'
    },
    {
      id: 'e2',
      meta: 'Chhattisgarh · 2018',
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
      meta: 'Bengaluru · 2021',
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
      meta: 'Chhattisgarh · 2022',
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
      meta: 'Outsized · 2022',
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
      meta: 'Greylabs · 2025',
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
      meta: 'ZenStatement · 2025',
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
      links: [
        { label: 'View on Airtable', url: 'https://airtable.com/appWeUeqGjpAqxbr/shrU9VthTOdInW0GC' }
      ],
      story: 'In my sales journey, one thing became very clear to me. ABM does not work without intent. You either build something so strong that demand naturally forms at the top of the funnel, or you go the other way. You pick a small set of high-value accounts and go deep. But then comes the real question. What makes an account high value? Most people say firmographics. Some say funding. Others say hiring trends. But none of these truly capture intent. Intent is contextual. Imagine you are selling an AI-based third-party risk management tool. What signal actually matters? Funding? Not really. Hiring? Maybe. A recent data breach? That changes everything. That is the moment when the problem becomes real. Platforms like Apollo, Clay, or Bombora are good at aggregating broad signals. They tell you who is likely in market. They do not tell you why now. And they cannot go deep into signals that are highly specific to your problem space. Even if you identify a data breach, there is still timing to consider. A company does not immediately buy a solution. First comes investigation, then temporary fixes, and only after that does the actual buying journey begin. That cycle alone can take months. So the real problem is not just identifying intent. It is identifying the right signal, at the right time, for the right problem. There is no tool that wakes you up and tells you these 10 companies are entering your exact buying window over the next 60 to 90 days. That is the gap I am trying to solve. What I am building is an early attempt at creating a system that captures nuanced signals, maps them to problem-specific intent, and surfaces high-probability accounts before they become obvious to everyone else.',
      learning: 'The best proof of work is something you built without being asked to.'
    },
    {
      id: 'k2',
      meta: 'HomeFlavour · 2024',
      title: 'HomeFlavour',
      desc: 'Co-building GTM for a premium Indian sweets brand.',
      status: 'IN PROGRESS',
      statusType: 'inprogress',
      thumbnail: '/homeflavour.jpg',
      images: [],
      links: [
        { label: 'Visit HomeFlavour', url: 'https://homeflavour.store/' }
      ],
      story: 'Home Flavour started with a simple meeting. I met a friends mother, and like most such visits, it began with food. She made ladoos and a variety of South Indian sweets, all from natural and healthier ingredients. But what stood out was not just the taste, it was her intent. She had already started exploring the idea of turning this into a digital business with her daughter. There was clarity in her thought and a strong will to build something of her own. That stayed with me. I felt like I had to contribute in some way. Not as a founder, but as someone who could help her take the next step. I built their e-commerce store, set up payments through PhonePe, and partnered with Shiprocket for last-mile delivery. Today the store has six live SKUs that can be shipped across India. We are also exploring channel partnerships, white-label opportunities, and new distribution avenues. One ABM practice that we are following for our B2B effort is writing letters to our prospects as that is a highly untapped channel nowadays. I contribute whenever I can, alongside everything else I am doing. Because this is not just about building a business. It is about backing someone who has the skill, the intent, and the courage to start.',
      learning: 'The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea.'
    },
  ],
  'Ref Wall': [
    {
      id: 't1',
      meta: 'Outsized · Feb 2025',
      title: 'Yashraj Wade',
      desc: 'Building Partnerships at Outsized | MoE Fellow',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#16213e',
      images: [],
      links: [],
      story: 'Santwana was instrumental in building the MENA business. His delivery on projects yielded us results as he was quick in understanding the needs of clients. He goes beyond his scope of work to help level up the business and can be an asset in competitor analysis, strategic planning. He could be a value add to any organisation with the right responsibilities.',
      learning: ''
    },
    {
      id: 't2',
      meta: 'Outsized · Feb 2025',
      title: 'Meenakshi Menon',
      desc: 'Founders Office | Strategy and Operations | 0-to-1 Project Delivery',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#16213e',
      images: [],
      links: [],
      story: 'From the moment I joined Outsized, Santwana was my go-to person for understanding the workplace culture, always ready to guide me with patience and insight. Beyond being a fantastic colleague, he is incredibly efficient, hardworking, and self-motivated. His drive to excel is inspiring, and his ability to navigate challenges with a solutions-focused mindset makes him an asset to any team. What truly sets him apart, though, is his kindness. He goes out of his way to support his colleagues.',
      learning: ''
    },
    {
      id: 't3',
      meta: 'Outsized · Feb 2025',
      title: 'Palak Yerpudey',
      desc: 'Team Lead, Client Solutions MENA at Outsized',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#0f3460',
      images: [],
      links: [],
      story: 'I had the pleasure of working with Santwana for a little over three years, and he was truly a great teammate. He always found new and better ways to get things done. What stood out the most was how much he cared about the team. He always went the extra mile to support his colleagues, making sure everyone felt comfortable and had what they needed to get the work done. His positive attitude and teamwork made a big difference in creating a great work environment.',
      learning: ''
    },
    {
      id: 't4',
      meta: 'Synaptic · Feb 2025',
      title: 'Tanya Shankar',
      desc: 'Product Marketing at Synaptic | Growth',
      status: 'VERIFIED',
      statusType: 'closed',
      thumbnail: '#1a2e1a',
      images: [],
      links: [],
      story: 'I have had the pleasure of working with Santwana and have been consistently impressed by his work ethic, strategic mindset, and entrepreneurial spirit. He doesnt just focus on completing day-to-day tasks - he has a remarkable ability to see the bigger picture, aligning his efforts with long-term business goals. Santwana possesses strong business acumen and treats every challenge with the ownership mindset of a founder. He approaches his work as if the business were his own, demonstrating a deep commitment to driving growth, optimizing processes, and identifying opportunities beyond the immediate scope of his responsibilities.',
      learning: ''
    },
  ],
}

const COLUMNS = ['Early Story', 'Career Snapshot', 'Key Initiatives', 'Ref Wall']

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
                    <div className={'card-thumbnail' + (col === 'Ref Wall' ? ' face' : '')} style={thumbStyle}></div>
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
function DMModal({ onClose }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return function() {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleSend() {
    if (!name.trim() || !message.trim()) return
    setSending(true)
    try {
      await fetch('https://formsubmit.co/ajax/santwana2597@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name,
          message: message,
          _subject: 'New DM from portfolio site'
        })
      })
      setSent(true)
    } catch (err) {
      setSent(true)
    }
    setSending(false)
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="cosmos-modal" onClick={function(e) { e.stopPropagation() }}>
        <button className="modal-close" onClick={onClose}>x</button>
        <div className="cosmos-modal-header">
          <div className="cosmos-modal-avatar">✉</div>
          <div className="cosmos-modal-title">Send a DM</div>
          <div className="cosmos-modal-subtitle">Santwana will receive this on email</div>
        </div>
        <div className="cosmos-modal-body">
          {sent ? (
            <div className="cosmos-response" style={{ textAlign: 'center' }}>
              Message sent. Santwana will get back to you soon.
            </div>
          ) : (
            <div className="dm-form">
              <input
                type="text"
                className="cosmos-input"
                placeholder="Your name"
                value={name}
                onChange={function(e) { setName(e.target.value) }}
                style={{ marginBottom: '12px', width: '100%' }}
              />
              <textarea
                className="cosmos-input"
                placeholder="Your message..."
                value={message}
                onChange={function(e) { setMessage(e.target.value) }}
                rows={5}
                style={{ width: '100%', resize: 'none' }}
              />
              <button
                className="cosmos-send"
                onClick={handleSend}
                disabled={sending}
                style={{ width: '100%', height: '44px', marginTop: '12px', borderRadius: '8px', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px' }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function Navbar({ onAskCosmos }) {
  const [showGetInTouch, setShowGetInTouch] = useState(false)
  const [showDM, setShowDM] = useState(false)

  return (
    <>
      <nav>
        <div className="nav-pill">
          <a href="#journey" onClick={function(e) { e.preventDefault(); document.getElementById('journey').scrollIntoView({ behavior: 'smooth' }) }}>My Journey</a>
          <button className="nav-btn" onClick={onAskCosmos}>Ask Cosmos</button>
          <div className="nav-dropdown-wrapper">
            <button
              className="nav-btn"
              onClick={function() { setShowGetInTouch(function(p) { return !p }) }}
            >
              Get in Touch {showGetInTouch ? '▲' : '▼'}
            </button>
            {showGetInTouch && (
              <div className="nav-dropdown">
                <a href="https://calendly.com/santwanajsingh/30min" target="_blank" className="nav-dropdown-item">
                  📅 Schedule a Call
                </a>
                <a href="mailto:santwana2597@gmail.com" className="nav-dropdown-item">
                  ✉ Email
                </a>
                <button className="nav-dropdown-item" onClick={function() { setShowDM(true); setShowGetInTouch(false) }}>
                  💬 Send a DM
                </button>
                <a href="https://www.linkedin.com/in/santwana-j-singh-8428b5163/" target="_blank" className="nav-dropdown-item">
                  🔗 LinkedIn
                </a>
              </div>
            )}
          </div>
          <a href="/resume.pdf" download className="nav-btn">Download Resume</a>
        </div>
      </nav>
      {showDM && <DMModal onClose={function() { setShowDM(false) }} />}
    </>
  )
}

function AskCosmosModal({ onClose }) {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

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

  async function handleAsk() {
    if (!question.trim()) return
    setLoading(true)
    setResponse('')

    const systemPrompt = `You are Cosmos, the AI assistant on Santwana's portfolio website. You only answer questions about Santwana's professional experience, skills, stories, and background. If someone asks about anything unrelated, respond with: "I only speak about Santwana's experience. Ask me something about her work, skills, or journey."

Here is everything you know about Santwana:

BACKGROUND:
Santwana is a GTM Engineer and Sales Operator with 3.5 years of experience. She is based in Bengaluru and is open to Founders Office roles. She has roots in Bihar and Jharkhand.

EARLY LIFE:
At age 15 in 10th grade, her father met with an accident. She stepped in to support the family business by selling phenyl and toilet cleaners door to door to hotels and hospitals in Bihar and Jharkhand. She learned to separate rejection from the person, and to walk away with a deal rather than argue. She eventually built a distribution model using housekeeping staff to promote and sell products.

COLLEGE:
She built Nexus, the first alumni-student interaction cell in her college. She set up the first student-driven placement cell which resulted in campus placements with highest package of 24 LPA. She built SkillEva, a peer-to-peer learning platform, got a pilot with BITS Pilani, and generated revenue before shutting it down when her CTO left. She wrote content for companies as a side income and repaid her education loan.

DEBATE WIN:
She won the Brainium Face-Off debate at BMS Institute of Technology on DApps and blockchain with only 24 hours of preparation. She built a structured framework instead of competing on technical depth. Prize was 10,000 rupees which she used to repair her laptop.

RESEARCH PAPER:
She published a research paper on green manufacturing practices in the Journal of The Institution of Engineers India Series C, published by Springer. She worked with a research scholar from NIT Raipur, running nightly sessions from 10pm to 1am. They used a five-point Likert scale survey.

OUTSIZED:
She built the MENA and APAC B2B business from scratch over 2.5 years. Key tactics included golf-based targeting of senior stakeholders and a key life events calendar to time outreach. Generated 480,000 dollars in revenue. Also organized team events like Bollywood nights and murder mystery events.

GREYLABS:
Spent 4 months at Greylabs AI. Closed a deal with a real estate firm, built an LLM proof of concept for a wealth management firm, and ran outbound campaigns targeting 200 BFSI companies generating 40-50 MQLs per month. Left due to cultural misalignment.

ZENSTATEMENT:
Works in the Founders Office. Built CFO Ledger, a community of finance leaders for community-led sales. Used ABM tracking fundraises and leadership changes. Designed a Dungeons and Dragons inspired card game for US GTM. Drove revenue end to end from pipeline to close.

HOMEFLAVOUR:
Helping her aunt build a premium Indian sweets D2C brand. Built the e-commerce store, set up PhonePe payments, partnered with Shiprocket for delivery. Six live SKUs. Exploring channel partnerships and white-label opportunities.

LEAD GEN ENGINE:
Built a signal-based lead generation engine using Python, Apollo APIs, GitHub Actions, and Airtable. Scores companies as P0/P1/P2 based on hiring signals, tech stack, fundraise activity, and ad signals. Focused on identifying intent at the right time for the right problem.

SKILLS:
GTM strategy, account-based marketing, community-led sales, outbound automation, lead generation, RevOps, CRM, Python, Airtable, GitHub Actions, Apollo, LLM training, investor relations, event management, content writing, research.

TESTIMONIALS:
Yashraj Wade (Building Partnerships at Outsized): Santwana was instrumental in building the MENA business. Quick at understanding client needs. Goes beyond scope to help level up the business. Asset in competitor analysis and strategic planning.
Meenakshi Menon (Founders Office, Strategy and Operations): Santwana was her go-to person for understanding workplace culture. Incredibly efficient, hardworking, self-motivated. Navigates challenges with a solutions-focused mindset. Known for kindness and going out of the way to support colleagues.
Palak Yerpudey (Team Lead Client Solutions MENA at Outsized): Great teammate for over three years. Always found new and better ways to get things done. Cared deeply about the team. Positive attitude made a big difference.
Tanya Shankar (Product Marketing at Synaptic): Consistently impressed by work ethic, strategic mindset, and entrepreneurial spirit. Sees the bigger picture. Treats every challenge with the ownership mindset of a founder.

Always respond in third person. Keep responses to 3-5 sentences. Be warm, direct, and specific. Never make up information not listed above.`

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + import.meta.env.VITE_GROQ_API_KEY
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      })

      const data = await res.json()
      setResponse(data.choices[0].message.content)
    } catch (err) {
      setResponse('Cosmos is having trouble connecting. Try again in a moment.')
    }

    setLoading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAsk()
    }
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="cosmos-modal" onClick={function(e) { e.stopPropagation() }}>
        <button className="modal-close" onClick={onClose}>x</button>
        <div className="cosmos-modal-header">
          <div className="cosmos-modal-avatar">✦</div>
          <div className="cosmos-modal-title">Ask Cosmos</div>
          <div className="cosmos-modal-subtitle">Chief Intern @ Santa's — knows everything about Santwana</div>
        </div>
        <div className="cosmos-modal-body">
          {!response && !loading && (
            <div className="cosmos-placeholder">
              Ask me anything about Santwana's work, skills, or journey.
            </div>
          )}
          {loading && (
            <div className="cosmos-loading">
              <span>Cosmos is thinking</span>
              <span className="cosmos-dots">...</span>
            </div>
          )}
          {response && (
            <div className="cosmos-response">{response}</div>
          )}
        </div>
        <div className="cosmos-modal-input">
          <input
            type="text"
            className="cosmos-input"
            placeholder="Ask about Santwana's experience..."
            value={question}
            onChange={function(e) { setQuestion(e.target.value) }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="cosmos-send"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? '...' : '↑'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
function App() {
  const pipelineRef = useRef(null)
  const [subtitleDone, setSubtitleDone] = useState(false)
  const [showCosmos, setShowCosmos] = useState(false)
  const handleTypewriterDone = useCallback(function() {
    setTimeout(function() { setSubtitleDone(true) }, 300)
  }, [])

  function scrollToPipeline() {
    if (pipelineRef.current) pipelineRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site">
      <Stars />
      <Navbar onAskCosmos={function() { setShowCosmos(true) }} />
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
{showCosmos && (
  <AskCosmosModal onClose={function() { setShowCosmos(false) }} />
)}
export default App
