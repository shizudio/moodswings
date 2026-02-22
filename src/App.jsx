import { useState, useEffect } from 'react'

// --- Data (all your moods, images, and pile positions) ---

const moods = ['Happy', 'Locked in', 'Like an uncle', 'Shiba mode', 'Handsome Otah', 'Fed', 'Sick', 'Found the one','Sleepy']

const moodMedia = {
  'Happy':          '/moodswings/moods/happy.JPG',
  'Locked in':      '/moodswings/moods/locked-in.mp4',
  'Like an uncle':  '/moodswings/moods/uncle-mode.jpg',
  'Shiba mode':     '/moodswings/moods/shiba-mode.JPG',
  'Handsome Otah':  '/moodswings/moods/handsome-otah.JPG',
  'Fed':            '/moodswings/moods/fed.JPG',
  'Sick':           '/moodswings/moods/sick.JPG',
  'Found the one':  '/moodswings/moods/found-the-one.mp4',
  'Sleepy':  '/moodswings/moods/sleepy.JPG',
}

const pilePositions = {
  'Happy':          { rotate: -6,  x: -20, y: 10   },
  'Locked in':      { rotate: 4,   x: 15,  y: -8   },
  'Like an uncle':  { rotate: -3,  x: -10, y: 5    },
  'Shiba mode':     { rotate: 7,   x: 20,  y: -12  },
  'Handsome Otah':  { rotate: -5,  x: -18, y: -6   },
  'Fed':            { rotate: 3,   x: 12,  y: 14   },
  'Sick':           { rotate: -8,  x: -25, y: -3   },
  'Found the one':  { rotate: 5,   x: 22,  y: 8    },
  'Sleepy':         { rotate: -7,  x: -16, y: 9    },
}

// --- Components ---

function MoodMedia({ src, alt, isActive }) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')

  if (isVideo) {
    return (
      <video
        src={src}
        alt={alt}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '2px',
          display: 'block',
        }}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '2px',
        display: 'block',
      }}
    />
  )
}

function PhotoPile({ activeMood }) {
  return (
    <div style={{
      position: 'relative',
      width: 'min(400px, 80vw)',
      aspectRatio: '4 / 3',
    }}>
      {moods.map((m) => {
        const isActive = m === activeMood
        const pos = pilePositions[m]

        return (
          <div
            key={m}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: isActive
                ? 'rotate(0deg) translate(0px, 0px) scale(1.05)'
                : `rotate(${pos.rotate}deg) translate(${pos.x}px, ${pos.y}px) scale(0.95)`,
              zIndex: isActive ? 10 : 1,
              opacity: isActive ? 1 : 0.6,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              background: '#fff',
              padding: '10px 10px 40px 10px',
              borderRadius: '4px',
              boxShadow: isActive
                ? '0 12px 40px rgba(0,0,0,0.25)'
                : '0 4px 12px rgba(0,0,0,0.12)',
              boxSizing: 'border-box',
            }}
          >
            <MoodMedia
              src={moodMedia[m]}
              alt={`${m} mood`}
              isActive={isActive}
            />
            <span style={{
              position: 'absolute',
              bottom: '12px',
              left: '0',
              right: '0',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: '#5a5250',
              letterSpacing: '0.02em',
            }}>
              {m}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Label({ text }) {
  return (
    <p style={{
      fontSize: '0.7rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: '#A49C9B',
      fontFamily: 'courier new, monospace',
      position: 'relative',
      zIndex: 2,
    }}>
      {text}
    </p>
  )
}

function MoodDisplay({ mood }) {
  return (
    <h1 style={{
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: '300',
      fontStyle: 'italic',
      color: '#1a1614',
      letterSpacing: '-0.02em',
      position: 'relative',
      zIndex: 2,
      marginBottom: '32px',
    }}>
      {mood}
    </h1>
  )
}

function MoodButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 20px',
        border: isActive ? '1px solid #7F1F12' : '1px solid #d0cbc4',
        background: isActive ? 'rgba(127, 31, 18, 0.05)' : 'transparent',
        color: isActive ? '#7F1F12' : '#A49C9B',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: 'courier new, monospace',
        transition: 'all 0.2s ease',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {label}
    </button>
  )
}

function MoodHistory({ history }) {
  if (history.length === 0) return null

  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      marginTop: '8px',
      position: 'relative',
      zIndex: 2,
    }}>
      <span style={{
        fontSize: '0.6rem',
        color: '#A49C9B',
        fontFamily: 'courier new, monospace',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        history:
      </span>
      {history.map((m, i) => (
        <span
          key={i}
          style={{
            fontSize: '0.6rem',
            color: '#c4b8b0',
            fontFamily: 'courier new, monospace',
            fontStyle: 'italic',
          }}
        >
          {m}{i < history.length - 1 ? ' → ' : ''}
        </span>
      ))}
    </div>
  )
}

// --- Main App ---

function App() {
  const [mood, setMood] = useState('Happy')
  const [history, setHistory] = useState([])

  useEffect(() => {
    document.title = `Feeling ${mood}`
  }, [mood])

  const handleMoodChange = (newMood) => {
    if (newMood !== mood) {
      setHistory((prev) => [...prev.slice(-4), mood])
      setMood(newMood)
    }
  }

  return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        fontFamily: 'Georgia, serif',
        background: '#FFFAF4',
        padding: '40px 20px',
        boxSizing: 'border-box',
      }}>
        {/* Top: Label + Mood name */}
        <Label text="currently feeling" />
        <MoodDisplay mood={mood} />
  
        {/* Middle: Photo pile */}
        <PhotoPile activeMood={mood} />
  
        {/* Bottom: Buttons in 2 rows */}
        <div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'center',
  maxWidth: '500px',
  margin: '40px auto 0',
  position: 'relative',
  zIndex: 2,
}}>
          {moods.map((m) => (
            <MoodButton
              key={m}
              label={m}
              isActive={m === mood}
              onClick={() => handleMoodChange(m)}
            />
          ))}
        </div>
  
        <MoodHistory history={history} />
      </div>
    
  )
}

export default App