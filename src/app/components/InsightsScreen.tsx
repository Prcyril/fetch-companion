import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Send, AlertCircle, Calendar, TrendingUp, ShieldCheck, ChevronRight, Pill } from 'lucide-react'
import { pets, events } from './mockData'

const PET_ID = 'bruno'
const activePet = pets.find(p => p.id === PET_ID)!

// ── Data-derived stats ──────────────────────────────────────────────────────

function getBrunoEvents() {
  return events.filter(e => e.petId === PET_ID).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

function getYearsOfHistory(): string {
  const brunoEvents = getBrunoEvents()
  if (!brunoEvents.length) return '0 yrs'
  const firstDate = new Date(brunoEvents[0].date)
  const years = (Date.now() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  return `${Math.floor(years)} yrs`
}

function getTotalClaimed(): string {
  const claimEvents = events.filter(e => e.petId === PET_ID && e.type === 'insurance')
  let total = 0
  claimEvents.forEach(e => {
    const match = e.notes?.match(/\$([0-9,]+)\s+reimbursed/)
    if (match) total += parseInt(match[1].replace(',', ''))
  })
  return total > 0 ? `$${total.toLocaleString()}` : '$0'
}

function getLastVetEvent() {
  return events
    .filter(e => e.petId === PET_ID && e.type === 'vet')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
}

function getLastMedEvent() {
  return events
    .filter(e => e.petId === PET_ID && e.type === 'medication')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
}

function getMonthsSince(dateStr: string): number {
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30)
}

function parseWeights(): { date: string; kg: number }[] {
  return events
    .filter(e => e.petId === PET_ID && e.notes)
    .flatMap(e => {
      const match = e.notes!.match(/(\d+)\s*kg/)
      return match ? [{ date: e.date, kg: parseInt(match[1]) }] : []
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function buildInsightCards() {
  const cards = []
  const lastVet = getLastVetEvent()
  const lastMed = getLastMedEvent()
  const weights = parseWeights()
  const claimEvents = events.filter(e => e.petId === PET_ID && e.type === 'insurance')

  // Vaccination / vet due
  if (lastVet) {
    const monthsSince = getMonthsSince(lastVet.date)
    const isDue = monthsSince > 11
    const formattedDate = new Date(lastVet.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    cards.push({
      icon: Calendar,
      colour: isDue ? '#E05A5A' : '#5B8DEF',
      bg: isDue ? '#FCEAEA' : '#EEF0F8',
      title: isDue ? 'Annual check-up overdue' : 'Annual check-up coming up',
      body: `Bruno's last vet visit was ${formattedDate} at ${lastVet.clinic}. ${isDue ? 'He\'s likely overdue for his annual check-up and C5 vaccination.' : 'His annual check-up and C5 vaccination will be due around April 2025.'}`,
      tag: isDue ? 'Action needed' : 'Upcoming',
      tagBg: isDue ? '#FCEAEA' : '#EEF0F8',
      tagText: isDue ? '#A03030' : '#3A4A9A',
    })
  }

  // Weight trend
  if (weights.length >= 2) {
    const first = weights[0]
    const last = weights[weights.length - 1]
    const trend = last.kg - first.kg
    const trendText = trend > 0 ? `+${trend}kg since first recorded` : `${trend}kg since first recorded`
    cards.push({
      icon: TrendingUp,
      colour: '#1D9E75',
      bg: '#E1F5EE',
      title: `Weight stable at ${last.kg}kg`,
      body: `Bruno's recorded weight: ${weights.map(w => `${w.kg}kg`).join(' → ')}. ${trendText} — levelling off healthily for a 4-year-old Golden Retriever.`,
      tag: 'Healthy trend',
      tagBg: '#E1F5EE',
      tagText: '#0F6E56',
    })
  }

  // Medication gap
  if (lastMed) {
    const monthsSince = getMonthsSince(lastMed.date)
    const isGap = monthsSince > 6
    cards.push({
      icon: Pill,
      colour: '#E8A020',
      bg: '#FFF5E0',
      title: 'Medication check',
      body: isGap
        ? `NexGard was started in June 2021. No recorded updates in over ${Math.floor(monthsSince)} months — worth confirming this is still active at Bruno's next visit.`
        : `Bruno's last recorded medication was ${new Date(lastMed.date).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}.`,
      tag: isGap ? 'Worth checking' : 'Up to date',
      tagBg: '#FFF5E0',
      tagText: '#854F0B',
    })
  }

  // Insurance
  const claimCount = claimEvents.length
  cards.push({
    icon: ShieldCheck,
    colour: '#1D9E75',
    bg: '#E1F5EE',
    title: 'Fetch cover active',
    body: `$30k annual cover in place. ${claimCount > 0 ? `${claimCount} insurance event${claimCount > 1 ? 's' : ''} recorded — ${getTotalClaimed()} reimbursed across Bruno's history.` : 'No claims filed yet.'}`,
    tag: 'Insured',
    tagBg: '#E1F5EE',
    tagText: '#0F6E56',
  })

  return cards
}

// ── AI responses ────────────────────────────────────────────────────────────

const brunoEventCount = events.filter(e => e.petId === PET_ID).length
const weights = parseWeights()
const lastVet = getLastVetEvent()
const lastVetDate = lastVet
  ? new Date(lastVet.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
  : 'unknown'

const AI_RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['vaccine', 'vaccination', 'shot', 'c5', 'annual', 'due', 'check-up', 'checkup'],
    answer: `Based on Bruno's timeline, his last C5 vaccination was on **${lastVetDate}** at ${lastVet?.clinic ?? 'his vet'}. Annual vaccinations are typically due 12 months after the last dose — so Bruno is likely due around **April 2025**.\n\nI'd recommend booking in soon. Would you like me to draft a reminder?`,
  },
  {
    keywords: ['last vet', 'recent visit', 'vet visit', 'summarise', 'summary'],
    answer: `Bruno's most recent vet visit was an **annual check-up on ${lastVetDate}** at ${lastVet?.clinic ?? 'his vet'}.\n\n• Weight: 32kg (stable — same as 2023)\n• Heart and lungs: clear\n• No concerns noted\n• 2 documents attached\n\nOverall a clean bill of health. His weight has been consistent since 2023 — healthy for a 4-year-old Golden Retriever.`,
  },
  {
    keywords: ['pattern', 'notice', 'trend', 'history', 'overall'],
    answer: `Looking across Bruno's **${brunoEventCount} recorded events**, a few things stand out:\n\n📈 **Weight trend**: ${weights.map(w => `${w.kg}kg`).join(' → ')}. Steady growth levelling off — healthy for his age.\n\n⚠️ **GI incident**: The Nov 2022 sock ingestion is worth flagging to your vet. Golden Retrievers can be repeat offenders.\n\n💊 **Medication**: NexGard commenced June 2021. No recorded updates since — worth confirming it's still active.`,
  },
  {
    keywords: ['prep', 'prepare', 'next visit', 'questions', 'bring', 'appointment'],
    answer: `Here's a vet visit prep checklist based on Bruno's history:\n\n**Questions to ask:**\n1. Is his C5 vaccination due?\n2. Should we do a joint assessment given his size and age?\n3. Any follow-up from the 2022 GI incident?\n4. Is his current flea/tick treatment still the right fit?\n\n**Things to bring:**\n• Vaccination certificate (attached to his April 2024 event)\n• Fetch insurance card — $30k annual cover active\n\n**Monitor beforehand:**\n• Changes in appetite, weight, or energy`,
  },
  {
    keywords: ['weight', 'weigh', 'heavy', 'kg', 'size'],
    answer: `Bruno's recorded weight across his timeline:\n\n• **April 2022** — 24kg (first recorded weight)\n• **April 2023** — 30kg\n• **April 2024** — 32kg (most recent)\n\nHis growth has levelled off nicely — 32kg is within the healthy range for a male Golden Retriever. The vet noted his weight as stable at his last check-up.`,
  },
  {
    keywords: ['emergency', 'sock', '2022', 'swallow', 'accident', 'incident'],
    answer: `In **November 2022**, Bruno swallowed a sock and was taken to Sydney Animal Emergency.\n\nThe treatment involved induced vomiting — the sock was successfully retrieved and Bruno was monitored overnight. He made a full recovery.\n\nThe subsequent Fetch insurance claim was approved and **$840 was reimbursed** within about a week.\n\nGolden Retrievers are notorious for eating things they shouldn't. It's worth keeping hazards out of reach and flagging this history with any new vet.`,
  },
  {
    keywords: ['insurance', 'claim', 'cover', 'fetch', 'policy', 'reimburs'],
    answer: `Bruno has been on Fetch insurance since **August 2022** with **$30k annual cover**.\n\nOne claim has been filed:\n• **Nov 2022 emergency** — sock ingestion at Sydney Animal Emergency\n• Claim approved, **$840 reimbursed**\n\nHis policy is currently active. You can view the full policy details in the Profile tab under Insurance.`,
  },
  {
    keywords: ['medication', 'nexgard', 'flea', 'tick', 'worming', 'treatment', 'medicine', 'pill'],
    answer: `Bruno started on **NexGard** (flea & tick treatment) in **June 2021** — a monthly chewable that also covers ticks.\n\nThere are no recorded medication updates after that initial entry. If NexGard is still being given monthly, it's worth logging each dose to keep the history complete.\n\nIf you've switched products or stopped, it's worth noting — and mentioning to your vet at his next visit.`,
  },
  {
    keywords: ['wellness', 'hydrotherapy', 'joint', 'rehab', 'physio'],
    answer: `Bruno started a **hydrotherapy program** in September 2023 at Paws Rehab Centre — an 8-week course for preventative joint care.\n\nThis is a great proactive step for a Golden Retriever, who are prone to hip and elbow dysplasia as they age. There's no follow-up recorded after the 8-week program, so it's worth checking in with your vet about whether ongoing sessions would benefit him.`,
  },
  {
    keywords: ['mochi', 'cat', 'other pet'],
    answer: `Mochi is Bruno's companion — a 2-year-old Domestic Shorthair. She has 3 recorded events:\n\n• **July 2023** — Adoption day 🐱\n• **July 2023** — First vet visit at Newtown Cat Clinic (microchipped)\n• **October 2023** — Desexing procedure (full recovery in 5 days)\n\nSwitch to Mochi's timeline using the pet selector at the top of the Timeline screen to see her full history.`,
  },
]

function getAIResponse(question: string): string {
  const q = question.toLowerCase()
  for (const entry of AI_RESPONSES) {
    if (entry.keywords.some(kw => q.includes(kw))) {
      return entry.answer
    }
  }
  return `That's a great question about Bruno. Based on his ${brunoEventCount} recorded events — spanning from his adoption in March 2021 through to his last check-up in April 2024 — I can see he's been well cared for.\n\nFor a more specific answer to "${question}", I'd recommend checking with his vet at City Road Animal Hospital. They'll have the full clinical picture alongside what's recorded here.`
}

// ── Component ────────────────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  "Is Bruno due for any vaccines?",
  "Summarise Bruno's last vet visit",
  "Any patterns I should know about?",
  "Help me prep for Bruno's next vet visit",
]

type Message = { id: string; role: 'user' | 'assistant'; text: string }

export default function InsightsScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasSentPrefill = useRef(false)

  const insightCards = buildInsightCards()
  const eventCount = events.filter(e => e.petId === PET_ID).length
  const yearsOfHistory = getYearsOfHistory()
  const totalClaimed = getTotalClaimed()

  // Auto-send prefilled question from EventDetailScreen
  useEffect(() => {
    const prefilled = (location.state as { prefilledQuestion?: string } | null)?.prefilledQuestion
    if (prefilled && !hasSentPrefill.current) {
      hasSentPrefill.current = true
      sendMessage(prefilled)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)
    setShowChat(true)

    const delay = 1200 + Math.random() * 600
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: getAIResponse(text),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, delay)
  }

  function formatText(text: string) {
    return text.split('\n').map((line, i, arr) => {
      const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )
      return <span key={i}>{parts}{i < arr.length - 1 && <br />}</span>
    })
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 24, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px 0px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Sparkles size={14} strokeWidth={1.5} color="#F279C5" />
          <p style={{ fontSize: 13, color: '#F279C5', margin: 0, fontWeight: 500 }}>AI insights</p>
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          {activePet.name}'s health summary
        </h1>
      </div>

      {/* Hero card */}
      <div style={{ padding: '16px 20px 4px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            borderRadius: 16,
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%)',
            padding: '18px', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: -20, right: -20,
            width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,121,197,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F279C5, #c94fa0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={14} strokeWidth={2} color="white" />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Fetch AI
            </span>
          </div>

          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', margin: '0 0 14px', lineHeight: 1.6 }}>
            {activePet.name} is a healthy 4-year-old Golden Retriever with{' '}
            <span style={{ color: '#F279C5', fontWeight: 600 }}>{eventCount} health events</span> logged.
            His weight is stable, his cover is active, and his next annual check-up is coming up soon.
          </p>

          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: `${eventCount} events`, sub: 'recorded' },
              { label: yearsOfHistory, sub: 'of history' },
              { label: totalClaimed, sub: 'claimed' },
            ].map(stat => (
              <div key={stat.label} style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '8px 10px',
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'white', margin: '0 0 1px' }}>{stat.label}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Insight cards */}
      <div style={{ padding: '16px 20px 4px' }}>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#6B6B6B',
          textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px',
        }}>
          What I noticed
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {insightCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.06, ease: 'easeOut' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '0.5px solid #DEDEDE',
                  borderLeft: `4px solid ${card.colour}`,
                  padding: '12px 14px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  backgroundColor: card.bg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} strokeWidth={1.5} color={card.colour} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>{card.title}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: card.tagText, backgroundColor: card.tagBg,
                      borderRadius: 9999, padding: '2px 8px',
                      whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8,
                    }}>
                      {card.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{card.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Ask section */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{
          fontSize: 11, fontWeight: 600, color: '#6B6B6B',
          textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px',
        }}>
          Ask about {activePet.name}
        </p>

        <AnimatePresence>
          {!showChat && (
            <motion.div
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12, overflow: 'hidden' }}
            >
              {SUGGESTED_QUESTIONS.map(q => (
                <motion.button
                  key={q}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => sendMessage(q)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF', border: '0.5px solid #DEDEDE',
                    borderRadius: 12, padding: '11px 14px',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#1A1A1A' }}>{q}</span>
                  <ChevronRight size={14} strokeWidth={1.5} color="#B0B0BF" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F279C5, #c94fa0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginRight: 8, marginTop: 2,
                    }}>
                      <Sparkles size={11} strokeWidth={2} color="white" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    backgroundColor: msg.role === 'user' ? '#1A1A1A' : '#FFFFFF',
                    color: msg.role === 'user' ? '#FFFFFF' : '#1A1A1A',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    padding: '10px 13px', fontSize: 13, lineHeight: 1.6,
                    border: msg.role === 'assistant' ? '0.5px solid #DEDEDE' : 'none',
                  }}>
                    {msg.role === 'assistant' ? formatText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F279C5, #c94fa0)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Sparkles size={11} strokeWidth={2} color="white" />
                  </div>
                  <div style={{
                    backgroundColor: '#FFFFFF', border: '0.5px solid #DEDEDE',
                    borderRadius: '4px 16px 16px 16px',
                    padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center',
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                        style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#B0B0BF' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          backgroundColor: '#FFFFFF', border: '0.5px solid #DEDEDE',
          borderRadius: 14, padding: '8px 8px 8px 14px', marginBottom: 8,
        }}>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(inputValue) }}
            placeholder={`Ask anything about ${activePet.name}…`}
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 14, color: '#1A1A1A',
              backgroundColor: 'transparent', fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim()}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              backgroundColor: inputValue.trim() ? '#1A1A1A' : '#F0F0F2',
              border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 200ms ease-out', flexShrink: 0,
            }}
          >
            <Send size={14} strokeWidth={2} color={inputValue.trim() ? 'white' : '#B0B0BF'} />
          </button>
        </div>

        <p style={{ fontSize: 11, color: '#B0B0BF', textAlign: 'center', margin: 0 }}>
          Powered by Claude · Answers based on {activePet.name}'s recorded events
        </p>
      </div>
    </div>
  )
}
