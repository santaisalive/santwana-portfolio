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
      status: 'CLOSED',
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
      statusType: 'CLOSED',
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
      statusType: 'LIVE',
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
      meta: 'Outsized · 2022 to 2025',
      title: 'Building MENA and APAC',
      desc: 'Built the entire B2B business from zero. 480K dollars in revenue.',
      status: 'CLOSED',
      statusType: 'closed',
      thumbnail: '/card-outsized.jpg',
      images: [],
      links: [],
      story: 'My journey at Outsized did not start with a big role. I was manually reviewing profiles, filling in missing data, and writing content. Things changed when I was asked to work directly with the MENA Managing Director. The goal was simple on paper but difficult in reality. Build the MENA business from scratch. We started with the MD network and went very specific. We noticed many senior stakeholders were into golf and the MD was a golf-player so we built a list of leaders across target companies who played golf. So one way is to reach out to them digitally, another way is where our MD is to meet them during a golf-game, so a casual setting allowed more insight into their thoughts. We also built a key life events calendar, tracking movements and announcements to reach out when it actually mattered for our ABM approach. That is how we started closing deals. We worked with top consulting firms, banks, and financial institutions across MENA, building the business to around 480,000 dollars in revenue.',
      learning: 'Growth is rarely about one big move. It is a series of small thoughtful actions. Understanding people, timing conversations well, and staying consistent can compound into something much bigger.'
    },
    {
      id: 'c2',
      meta: 'Greylabs · 2025',
      title: 'AI Distribution',
      desc: '4 months that felt like a year. Sales, LLMs, and a clean exit.',
      status: 'ClOSED',
      statusType: 'learning',
      thumbnail: '/greylabs.jpg',
      images: [],
      links: [],
      story: 'My 4 months at Greylabs felt like time near a black hole. Compressed from the outside, but inside it stretched into what felt like a year. I ran demos, closed a deal with a real estate firm at a premium price point, and began learning how to train LLM models for specific use cases. I built a proof of concept for a wealth management firm that most people had avoided because of its complexity. From there I shifted into lead generation. We built an AI-driven automation system and ran around 400 outbound messages a week targeting 200 BFSI companies. That translated into 40 to 50 MQLs every month. But in the first couple of months I noticed a cultural misalignment. So I made a decision and moved on.',
      learning: 'Knowing when to leave is as important as knowing where to go. A short stint done right teaches more than a long one done wrong.'
    },
    {
      id: 'c3',
      meta: 'ZenStatement · 2025 to 2026',
      title: "Founder's Office",
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
      statusType: 'learning',
      thumbnail: '/airtable.png',
      images: [],
      links: [
        { label: 'View on Airtable', url: 'https://airtable.com/apppWeUeqGjpAqxbr/shrU9VthTOdInW0GC/tblugFgtY26JD4jrt/viwwhDQgt1GIMzbap' }
      ],
      story: 'In my sales journey, one thing became very clear to me. ABM does not work without intent. You either build something so strong that demand naturally forms at the top of the funnel, or you go the other way. You pick a small set of high-value accounts and go deep. But then comes the real question. What makes an account high value? Most people say firmographics. Some say funding. Others say hiring trends. But none of these truly capture intent. Intent is contextual. Imagine you are selling an AI-based third-party risk management tool. What signal actually matters? Funding? Not really. Hiring? Maybe. A recent data breach? That changes everything. That is the moment when the problem becomes real. Platforms like Apollo, Clay, or Bombora are good at aggregating broad signals. They tell you who is likely in market. They do not tell you why now. And they cannot go deep into signals that are highly specific to your problem space. Even if you identify a data breach, there is still timing to consider. A company does not immediately buy a solution. First comes investigation, then temporary fixes, and only after that does the actual buying journey begin. That cycle alone can take months. So the real problem is not just identifying intent. It is identifying the right signal, at the right time, for the right problem. There is no tool that wakes you up and tells you these 10 companies are entering your exact buying window over the next 60 to 90 days. That is the gap I am trying to solve. What I am building is an early attempt at creating a system that captures nuanced signals, maps them to problem-specific intent, and surfaces high-probability accounts before they become obvious to everyone else.',
      learning: 'The best proof of work is something you built without being asked to.'
    },
    {
      id: 'k2',
      meta: 'HomeFlavour · 2024',
      title: 'HomeFlavour',
      desc: 'Co-building GTM for a premium Indian sweets brand.',
      status: 'LIVE',
      statusType: 'inprogress',
      thumbnail: '/homeflavour.jpg',
      images: [],
      links: [
        { label: 'Visit HomeFlavour', url: 'https://homeflavour.store/' }
      ],
      story: 'Home Flavour started with a simple meeting. I met a friends mother, and like most such visits, it began with food. She made ladoos and a variety of South Indian sweets, all from natural and healthier ingredients. But what stood out was not just the taste, it was her intent. She had already started exploring the idea of turning this into a digital business with her daughter. There was clarity in her thought and a strong will to build something of her own. That stayed with me. I felt like I had to contribute in some way. Not as a founder, but as someone who could help her take the next step. I built their e-commerce store, set up payments through PhonePe, and partnered with Shiprocket for last-mile delivery. Today the store has six live SKUs that can be shipped across India. We are also exploring channel partnerships, white-label opportunities, and new distribution avenues. One ABM practice that we are following for our B2B effort is writing letters to our prospects as that is a highly untapped channel nowadays. I contribute whenever I can, alongside everything else I am doing. Because this is not just about building a business. It is about backing someone who has the skill, the intent, and the courage to start.',
      learning: 'The most meaningful co-builds are rooted in genuine belief in the founder. Not the idea.'
    },
    {
      id: 'k3',
      meta: 'ZenStatement · 2025',
      title: 'CFO Ledger',
      desc: 'Built a community of 100 finance leaders from scratch.',
      status: 'LIVE',
      statusType: 'Ongoing',
      thumbnail: '/cfo-ledger.png',
      images: [],
      links: [
        { label: 'Watch Content', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7377215724173340672?utm_source=share&utm_medium=member_desktop&rcm=ACoAACccMXIBmD97Y9xz_T21Mn-wpekPyKhgbAE' }
      ],
      story: 'CFO Ledger started as a simple idea. What if finance leaders had a space where they could actually talk to each other? Not just for networking, but to share opportunities, discuss real problems, and build their own voice in the ecosystem. We did not start with scale. We started small and intentional. We introduced invite-only breakfast sessions bringing together five to ten finance leaders. The goal was not to pitch anything. It was to listen. We heard their stories, understood their journeys, and involved them in shaping what CFO Ledger could become. It was not just a community we were building for them. It was something we were co-building with them. After each session, we brought them into our LinkedIn group to continue the conversation. Today, we have around 100 finance leaders as part of the community. Alongside this, I started experimenting with content. We created short reel-style videos where we asked finance leaders a few quick but meaningful questions. The format was simple, but it worked.',
      learning: 'Communities are not built by adding people. They are built by making people feel like they belong and have a reason to come back.'
    },
    {
      id: 'k4',
      meta: 'ZenStatement · US · 2025',
      title: 'US ABM Card Games',
      desc: 'Designed two card games for US roadshows. CFO Quest and Finance Frenzy.',
      status: 'CLOSED',
      statusType: 'closed',
      thumbnail: '/card-game.png',
      images: [],
      links: [
        { label: 'Finance Frenzy', url: 'https://canva.link/r71m4krxruqlf7v' },
        { label: 'The CFO Quest', url: 'https://canva.link/t0ifql34jon6ulf' }
      ],
      story: 'When we were preparing for our US roadshows, we faced a simple but important question. What do we take with us that people will actually remember? The brief from my founder was clear. It had to engage finance teams. It had to make them talk to each other. Not just polite conversations, but real discussions, maybe even debates. So I started thinking differently. What actually gets people to engage with each other? Games. We explored multiple ideas and eventually landed on two formats. The first was inspired by Taboo, simple and fast. The second was more layered, inspired by Dungeons and Dragons, designed for finance professionals with roles, scenarios, and decisions that mirrored real-world finance situations. I designed the structure, the flow, the characters, and the experience using Gen AI tools and Canva. We got it printed in the US and shipped it to our event venues. At the event, people did not just walk past our booth. They stopped. Teams began interacting with each other, exactly the way we had imagined. It was no longer just a booth. It became an experience.',
      learning: 'The most memorable GTM is the one that makes people feel something. Not just see something.'
    },
    {
      id: 'k5',
      meta: 'Wiom · 2025',
      title: 'Wiom Distribution Strategy',
      desc: 'Built an evidence-based WiFi distribution strategy for an untapped market.',
      status: 'CLOSED',
      statusType: 'learning',
      thumbnail: '/wiom.jpg',
      images: [],
      links: [
        { label: 'View Deck', url: 'https://canva.link/643ffch1jmznx4k' }
      ],
      story: 'I was speaking with Guneet, the Head of Growth at Wiom, and he shared a challenge they were thinking about. Wiom was building an affordable WiFi solution, but the real question was distribution. How do you take something like this to the right audience, at scale? That stayed with me. I started exploring it on my own. I went through different distribution models, read business case studies, and tried to understand what had worked in similar contexts. But more importantly, I wanted to understand the ground reality. So I spoke to people within RWAs, especially in lower middle-class segments. I wanted to see how decisions were made, who influenced them, and what would actually drive adoption. Slowly, a plan started taking shape. It was not just about selling a product. It was about identifying the right entry points, building trust within communities, and creating a model that could scale through existing social structures rather than fighting them. I shared this with Guneet, and it resonated.',
      learning: 'Good distribution is not about reach. It is about understanding how decisions actually happen on the ground and designing your approach around that.'
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
      thumbnail: '/yash.png',
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
      thumbnail: '/meenakshi.png',
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
      thumbnail: '/palak.png',
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
      thumbnail: '/tanya.png',
      images: [],
      links: [],
      story: 'I have had the pleasure of working with Santwana and have been consistently impressed by his work ethic, strategic mindset, and entrepreneurial spirit. He doesnt just focus on completing day-to-day tasks - he has a remarkable ability to see the bigger picture, aligning his efforts with long-term business goals. Santwana possesses strong business acumen and treats every challenge with the ownership mindset of a founder. He approaches his work as if the business were his own, demonstrating a deep commitment to driving growth, optimizing processes, and identifying opportunities beyond the immediate scope of his responsibilities.',
      learning: ''
    },
  ],
}

const COLUMNS = ['Early Story', 'Career Snapshot', 'Key Initiatives', 'Ref Wall']

const FUN_FACTS = [
  'Ask me anything about him',
  'People call him Santa, hehe I find it silly',
  'Btw, you can ask me anything about Santwana',
  'Santwana means to console. I am working for a guy named consolation lol',
  'My job as an intern is to answer any question regarding Santwana',
  'He used to cycle 18 kms a day for maths tuition, a typical dad story',
  'If you ask me questions about Santwana, maybe I will get paid one day',
  'He loves climbing mountains. He should have asked me, I would have flown him to the top',
  'I hate resumes, those old white sheets'
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
    <div className="cosmos-overlay" onClick={onClose}>
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
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(function() {
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

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function handleAsk() {
    if (!question.trim() || loading) return
    var userMessage = question.trim()
    setQuestion('')
    setMessages(function(prev) {
      return prev.concat({ role: 'user', content: userMessage })
    })
    setLoading(true)

    const systemPrompt = `You are Cosmos, a witty AI assistant on Santwana's portfolio website. You ONLY answer questions using the facts provided below. Do NOT add any information not explicitly listed. Do NOT speculate or infer. If you do not have enough information to answer, say "I do not have that detail about Santwana."

If someone asks about anything unrelated to Santwana, say: "I only speak about Santwana's experience. Ask me something about his work, skills, or journey."

STRICT RULES:
- Always respond in third person if asked about Santwana. Respond in first person if and only if asked about you.
- Do NOT entertain any question apart from basic greeting, what you do and Santwana. If anything asked is beyond these three topics, say you only do these things.
- Do NOT give any information about Santwana unprompted. Ask the user what they want to know.
- If someone says "Hi", "Hello", "Hey" or any greeting, just respond with a friendly greeting back and ask what they would like to know about Santwana. Do NOT give any information about Santwana unprompted. Wait for them to ask.
- Never speculate about what Santwana "probably" did or "likely" felt.
- If unsure, say you do not have that detail.
- If someone says "Hi" or greets you, respond warmly. Do NOT speak about Santwana while responding to greetings.
- If someone says "share something else" or "tell me more" or "what else", pick an interesting fact from the list and share it in an engaging way. Do not deflect.
- Never repeat the phrase "I only speak about Santwana's experience" more than once in a conversation. If you already said it, just say "Ask me something specific about his work."
- Vary your sentence starters. Do not begin every response with "Santwana".

FACTS ABOUT SANTWANA:

Santwana is a GTM Engineer and Sales Operator with more than 4 years of experience based in Bengaluru, open to Founders Office roles in India, with roots in Bihar and Jharkhand.

At age 15, his father had an accident. He sold phenyl and toilet cleaners door to door to hotels and hospitals. He learned to walk away with a deal rather than argue. He built a distribution model using housekeeping staff.

In college he built Nexus, the first alumni-student interaction cell. He set up the first student-driven placement cell with placements up to 24 LPA. He built SkillEva, a peer-to-peer learning platform, got a pilot with BITS Pilani, generated revenue, then shut it down when his CTO left. He repaid his education loan through content writing.

He won the Brainium Face-Off debate at BMS Institute of Technology on DApps with 24 hours of preparation. He won 10,000 rupees and used it to repair his laptop.

He published a research paper on green manufacturing in the Journal of The Institution of Engineers India Series C via Springer. He worked with a researcher from NIT Raipur with nightly sessions from 10pm to 1am using a five-point Likert scale survey.

At Outsized he built the MENA and APAC B2B business from scratch over 2.5 years. He used a list of golf-playing senior stakeholders as an ABM targeting approach because the MD of MENA was a golf player and that allowed them to meet this people and built rapport and sell in-person. He also built a key life events calendar to time outreach for ABM and used to send gifts or at least connect with them on crucial dates. He generated 480,000 dollars in revenue. Internally, he also organized team events like Bollywood nights and murder mystery events to bring the remote and on-site team together.

At Greylabs he spent 4 months. He closed a real estate deal, built an LLM proof of concept for a wealth management firm, ran 400 outbound messages a week targeting 200 BFSI companies, generating 40-50 MQLs per month. He left due to cultural misalignment.

At ZenStatement he works in the Founders Office. He built CFO Ledger, a community of finance leaders. He used ABM tracking fundraises and leadership changes. He designed 2 card games for US GTM that can be checked in the pipeline below. These card games were used at multiple places. He also drove revenue from pipeline to close.

For HomeFlavour he built an e-commerce store, set up PhonePe payments, partnered with Shiprocket. Six live SKUs. Currently he is exploring channel partnerships and white-label opportunities. He has started his ABM for these via sending letters and enabling physical outreach as a channel rather than digital.

He built a lead generation engine using Python, Apollo APIs, GitHub Actions, and Airtable scoring companies P0/P1/P2 based on hiring signals, tech stack, fundraise activity, and ad signals.

Skills: GTM strategy, ABM, community-led sales, outbound automation, lead generation, RevOps, CRM, Python, Airtable, GitHub Actions, Apollo, LLM training, investor relations, event management, content writing, research.
Hobbies: climbing mountains, he climbed kuari pass and aims to do a 6000m summit soon, cycling, he used to cycle 18 km one-way for math tutions as he was living in a remote village that time, he loves singing, he loves cooking and he loves playing cricket and learning new sports.

Testimonials:
Yashraj Wade said Santwana was instrumental in building the MENA business, quick at understanding client needs, goes beyond scope, asset in competitor analysis and strategic planning.
Meenakshi Menon said Santwana was her go-to person for workplace culture, incredibly efficient, hardworking, self-motivated, navigates challenges with solutions-focused mindset, known for kindness.
Palak Yerpudey said Santwana was a great teammate for over three years, always found better ways to get things done, cared deeply about the team.
Tanya Shankar said she was consistently impressed by his work ethic, strategic mindset, and entrepreneurial spirit, sees the bigger picture, treats every challenge with a founder mindset.`
    var apiMessages = [{ role: 'system', content: systemPrompt }]
    setMessages(function(prev) {
      prev.forEach(function(m) {
        apiMessages.push({ role: m.role, content: m.content })
      })
      return prev
    })
    apiMessages.push({ role: 'user', content: userMessage })

    try {
      var res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + import.meta.env.VITE_GROQ_API_KEY
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          max_tokens: 300,
          temperature: 0.7
        })
      })
      var data = await res.json()
      var reply = data.choices[0].message.content
      setMessages(function(prev) {
        return prev.concat({ role: 'assistant', content: reply })
      })
    } catch (err) {
      setMessages(function(prev) {
        return prev.concat({ role: 'assistant', content: 'Cosmos is having trouble connecting. Try again in a moment.' })
      })
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
    <div className="cosmos-overlay" onClick={onClose}>
      <div className="cosmos-modal" onClick={function(e) { e.stopPropagation() }}>
        <button className="modal-close" onClick={onClose}>x</button>
        <div className="cosmos-modal-header">
          <div className="cosmos-modal-avatar">✦</div>
          <div className="cosmos-modal-title">Ask Cosmos</div>
          <div className="cosmos-modal-subtitle">Chief Intern @ Santa's — knows everything about Santwana</div>
        </div>
        <div className="cosmos-modal-body">
          {messages.length === 0 && !loading && (
            <div className="cosmos-placeholder">
              Ask me anything about Santwana's work, skills, or journey.
            </div>
          )}
          {messages.length > 0 && (
            <div className="cosmos-thread">
              {messages.map(function(msg, i) {
                return (
                  <div key={i} className={msg.role === 'user' ? 'cosmos-msg user' : 'cosmos-msg assistant'}>
                    {msg.content}
                  </div>
                )
              })}
              {loading && (
                <div className="cosmos-msg assistant cosmos-typing">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          )}
        </div>
        <div className="cosmos-modal-input">
          <input
            type="text"
            className="cosmos-input"
            placeholder="Ask about Santwana..."
            value={question}
            onChange={function(e) { setQuestion(e.target.value) }}
            onKeyDown={handleKeyDown}
          />
          <button className="cosmos-send" onClick={handleAsk} disabled={loading}>
            {loading ? '...' : 'Send'}
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
  <div
    className="astronaut-wrapper"
    onClick={function() { setShowCosmos(true) }}
    style={{ cursor: 'pointer' }}
  >
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
        <div className="pipeline-label">CAREER PIPELINE · CLICK ON CARD TO EXPLORE</div>
        <KanbanBoard />
      </section>
      <footer>
        <span>Santwana · Bengaluru</span>
        <div className="footer-links">
          <a href="https://github.com/santaisalive" target="_blank">GitHub</a>
          <a href="mailto:santwana2597@gmail.com">Email</a>
        </div>
      </footer>
      {showCosmos && (
        <AskCosmosModal onClose={function() { setShowCosmos(false) }} />
      )}
    </div>
  )
}

export default App
