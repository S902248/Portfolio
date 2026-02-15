import React, { useState, useRef } from 'react';
import './developer-desk.css';

const PROJECT_PREVIEW_URL = 'https://your-project-preview-url.com'; // Replace with your live project or a demo
const RESUME_URL = '/image/shubh.pdf';
const LOFI_URL = '/music/bgm.mp3'; // Use local music file

const MINI_GAMES = [
  { key: 'catch', name: 'Catch the Stack' },
  { key: 'quiz', name: 'Coding Quiz' },
  { key: 'memory', name: 'Memory Match' },
];

const DeveloperDesk = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [surgeMode, setSurgeMode] = useState(false);
  const [surgeTimer, setSurgeTimer] = useState(10);
  const surgeInterval = useRef(null);
  const [typing, setTyping] = useState('');
  const [showMusic, setShowMusic] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const [showGames, setShowGames] = useState(false);
  const [gamepadAnim, setGamepadAnim] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gamesPlayed') || '{}');
    } catch { return {}; }
  });
  const [bonusUnlocked, setBonusUnlocked] = useState(false);

  // Surge Mode logic
  const enterSurgeMode = () => {
    setSurgeMode(true);
    setTyping('');
    let code = 'code --focus';
    let idx = 0;
    const typeInt = setInterval(() => {
      setTyping(code.slice(0, idx + 1));
      idx++;
      if (idx >= code.length) clearInterval(typeInt);
    }, 80);
    setSurgeTimer(10);
    surgeInterval.current = setInterval(() => {
      setSurgeTimer(t => {
        if (t <= 1) {
          exitSurgeMode();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  const exitSurgeMode = () => {
    setSurgeMode(false);
    setTyping('');
    clearInterval(surgeInterval.current);
  };

  // Music logic
  const toggleMusic = () => {
    setShowMusic(true);
    if (!musicPlaying) {
      audioRef.current.play();
      setMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };
  const handleMusicEnd = () => {
    setMusicPlaying(false);
  };

  // Gamepad logic
  const openGames = () => {
    setGamepadAnim(true);
    setTimeout(() => setGamepadAnim(false), 400);
    setShowGames(true);
  };
  const playGame = (key) => {
    const updated = { ...gamesPlayed, [key]: true };
    setGamesPlayed(updated);
    localStorage.setItem('gamesPlayed', JSON.stringify(updated));
    if (Object.keys(updated).length === MINI_GAMES.length && Object.values(updated).every(Boolean)) {
      setBonusUnlocked(true);
    }
  };
  const closeGames = () => setShowGames(false);

  return (
    <section className={`devdesk-section${surgeMode ? ' surge-blur' : ''}`}>
      <h2>💻 Developer Desk Simulator</h2>
      <div className="desk-setup">
        {/* Monitor */}
        <div className="desk-monitor">
          <iframe
            src={PROJECT_PREVIEW_URL}
            title="Project Preview"
            className="monitor-iframe"
            sandbox="allow-scripts allow-same-origin"
          />
          <div className="monitor-label">Monitor</div>
        </div>
        {/* Laptop */}
        <div className="desk-laptop" onClick={() => setShowTerminal(true)}>
          <div className="laptop-screen" />
          <div className="laptop-label">Laptop</div>
        </div>
        {/* Coffee Mug */}
        <div className="desk-mug" onClick={() => setShowEasterEgg(true)}>
          <div className="mug-body" />
          <div className="mug-handle" />
          <div className="mug-label">Coffee Mug</div>
        </div>
        {/* Sticky Note */}
        <a className="desk-sticky" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          <span>Resume</span>
        </a>
        {/* Mouse */}
        <div className="desk-mouse" title="Mouse" onClick={enterSurgeMode}>
          <div className="mouse-body" />
          <div className="mouse-wheel" />
          <div className="mouse-label">Mouse</div>
        </div>
        {/* Headphone */}
        <div className={`desk-headphone${musicPlaying ? ' headphone-glow' : ''}`} title="Headphone" onClick={toggleMusic}>
          <div className="headband" />
          <div className="earpad left" />
          <div className="earpad right" />
          <div className="headphone-label">Headphone</div>
        </div>
        {/* Gamepad */}
        <div className={`desk-gamepad${gamepadAnim ? ' gamepad-anim' : ''}`} title="Gamepad" onClick={openGames}>
          <div className="gamepad-body" />
          <div className="gamepad-stick left" />
          <div className="gamepad-stick right" />
          <div className="gamepad-btn a" />
          <div className="gamepad-btn b" />
          <div className="gamepad-label">Gamepad</div>
        </div>
      </div>
      {/* Surge Mode Overlay */}
      {surgeMode && (
        <div className="surge-overlay">
          <div className="surge-terminal-glow">
            <div className="surge-terminal-bar">Surge Mode <span style={{ float: 'right', cursor: 'pointer' }} onClick={exitSurgeMode}>✖</span></div>
            <div className="surge-terminal-content">
              <pre>{`$ ${typing}${typing.length < 12 ? '_' : ''}`}</pre>
              <div className="surge-popup">Entering Developer Surge Mode...</div>
              <div className="surge-timer">⏳ {surgeTimer}s</div>
              <button className="surge-exit-btn" onClick={exitSurgeMode}>Exit Surge Mode</button>
            </div>
          </div>
        </div>
      )}
      {/* Music Player Overlay */}
      {showMusic && (
        <div className="music-panel">
          <audio ref={audioRef} src={LOFI_URL} loop onEnded={handleMusicEnd} />
          <button onClick={toggleMusic} className="music-play-btn">
            {musicPlaying ? '❚❚ Pause' : '► Play'}
          </button>
          <span className="music-logo" role="img" aria-label="music" style={{ fontSize: '1.6rem', marginLeft: '0.7rem', marginRight: '0.5rem' }}>
            🎵
          </span>
          <input type="range" min="0" max="1" step="0.01" defaultValue="1" onChange={e => { audioRef.current.volume = e.target.value; }} />
          <span style={{ marginLeft: '0.5rem' }}>Lofi Coding Music</span>
          <button className="music-close-btn" style={{ marginLeft: '1rem', fontSize: '1.2rem', background: 'none', border: 'none', color: '#b721ff', cursor: 'pointer' }} onClick={() => { setShowMusic(false); audioRef.current.pause(); setMusicPlaying(false); }} title="Close">✖</button>
        </div>
      )}
      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="terminal-overlay" onClick={() => setShowTerminal(false)}>
          <div className="terminal-window" onClick={e => e.stopPropagation()}>
            <div className="terminal-bar">Fake CLI <span style={{ float: 'right', cursor: 'pointer' }}>✖</span></div>
            <div className="terminal-content">
              <pre>$ npm start
                Starting the dev server...
                ✔ Compiled successfully!

                $ _</pre>
            </div>
          </div>
        </div>
      )}
      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="easteregg-overlay" onClick={() => setShowEasterEgg(false)}>
          <div className="easteregg-message" onClick={e => e.stopPropagation()}>
            ☕ You found the coffee! Take a break, developer!<br />
            <span style={{ fontSize: '2rem' }}>😄</span>
          </div>
        </div>
      )}
      {/* Gamepad Mini-Game Modal */}
      {showGames && (
        <div className="games-modal" onClick={closeGames}>
          <div className="games-window" onClick={e => e.stopPropagation()}>
            <div className="games-bar">Mini-Game Portal <span style={{ float: 'right', cursor: 'pointer' }} onClick={closeGames}>✖</span></div>
            <div className="games-list">
              {MINI_GAMES.map(g => (
                <button key={g.key} className={`game-btn${gamesPlayed[g.key] ? ' played' : ''}`} onClick={() => playGame(g.key)}>{g.name} {gamesPlayed[g.key] && '✔'}</button>
              ))}
            </div>
            <div className="games-progress">Games played: {Object.values(gamesPlayed).filter(Boolean).length} / {MINI_GAMES.length}</div>
            {bonusUnlocked && <div className="games-bonus">🎉 Secret Bonus Unlocked! You completed all mini-games!</div>}
          </div>
        </div>
      )}
    </section>
  );
};

export default DeveloperDesk;
