import Folder from "./components/Folder"
import File from "./components/File"
import OpenedFile from "./components/OpenedFile"
import OpenedFolder from "./components/OpenedFolder"
import OpenedFolderMobile from "./components/OpenedFolderMobile"
import OpenedFileMobile from "./components/OpenedFileMobile"
import { useSelect } from "./context/SelectContext"
import "./App.css"
import { portfolio, bio } from "./assets/mocks"
import { createRef, useEffect, useState, useRef } from "react"
import Header from "./components/Header"

const App = () => {
  const { setSelected, openWindows } = useSelect()
  const [words] = useState(['Developer', 'Designer', 'Artist']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(1);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [visible, setVisible] = useState(true);

  const textRef = createRef<HTMLSpanElement>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = textRef.current;

    if (!target) return;

    const interval = setInterval(() => {
      if (letterCount === 0 && !waiting) {
        setWaiting(true);
        target.innerHTML = words[currentWordIndex].substring(0, letterCount);
        setTimeout(() => {
          const newWords = [...words];
          const usedWord = newWords.shift();
          newWords.push(usedWord!);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setLetterCount(1);
          setX(1);
          setWaiting(false);
        }, 1000);
      } else if (letterCount === words[currentWordIndex].length + 1 && !waiting) {
        setWaiting(true);
        setTimeout(() => {
          setX(-1);
          setLetterCount((prevCount) => prevCount + x);
          setWaiting(false);
        }, 1000);
      } else if (!waiting) {
        target.innerHTML = words[currentWordIndex].substring(0, letterCount);
        setLetterCount((prevCount) => prevCount + x);
      }
    }, 120);

    const underscoreInterval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(underscoreInterval);
    };
  }, [letterCount, waiting, x, words, currentWordIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };

  // const handleClick = () => {
  //   setSelected('none')
  // }

  const isMobile = window.innerWidth < 768

  return (
    <div
      className="dot-grid-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="dot-grid-base" />
      <div className="dot-grid-glow" style={{ pointerEvents: 'none' }} />
      <div className="App" id="app" style={{ position: 'relative', zIndex: 10 }}>
        <Header />
        <div className="grid" id='grid'>
          <Folder {...portfolio} />
          <File {...bio} />
          <div className='main-container'>
            <div className="home-subtitle-container">
              <h2 className="home-subtitle">web</h2>
              <div className="console-container">
                <span id="motion-text" ref={textRef}></span>
                <span id="console" className={`console-underscore ${visible ? '' : 'hidden'}`}>_</span>
              </div>
            </div>
            <h1 className="home-title">iago</h1>
            <div className='text' >
              <span>
                Desenvolvedor Full-stack ✦︎
                Artista multidisciplinar
              </span>
            </div>
          </div>
        </div>
        {openWindows.map((win) => {
          if (win.type === 'folder') {
            return isMobile ? (
              <OpenedFolderMobile key={win.id} windowData={win} />
            ) : (
              <OpenedFolder key={win.id} windowData={win} />
            )
          } else {
            return isMobile ? (
              <OpenedFileMobile key={win.id} windowData={win} />
            ) : (
              <OpenedFile key={win.id} windowData={win} />
            )
          }
        })}
      </div>
    </div>
  )
}

export default App