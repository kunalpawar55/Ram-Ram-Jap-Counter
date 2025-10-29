import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../CssFolder/Maincounter.css';
import Footer from './Footer';

export default function MainCounter() {
  const [showconter, setcounter] = useState(0);
  const [mala, setmala] = useState(0);
  const [allcounter, setallcounter] = useState(0);
  const [showRam, setShowRam] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const savedShow = localStorage.getItem('showconter');
    const savedMala = localStorage.getItem('mala');
    const savedAll = localStorage.getItem('allcounter');

    if (savedShow !== null) setcounter(Number(savedShow));
    if (savedMala !== null) setmala(Number(savedMala));
    if (savedAll !== null) setallcounter(Number(savedAll));
  }, []);

  useEffect(() => {
    localStorage.setItem('showconter', showconter);
    localStorage.setItem('mala', mala);
    localStorage.setItem('allcounter', allcounter);
  }, [showconter, mala, allcounter]);

  const managecounter = () => {
    if (isDisabled) return; 
    setShowRam(true); 

    setTimeout(() => setShowRam(false), 800);
    setTimeout(() => setIsDisabled(false), 700);

    setcounter((prev) => prev + 1);
    setallcounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (showconter === 108) {
      setcounter(0);
      setmala((prev) => prev + 1);
    }
  }, [showconter]);

  const progress = (showconter / 108) * 100;

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}>
      <Header />
      <div className="maincounterdiv">

        <div className="progress-ring">
          <svg className="progress-svg" viewBox="0 0 120 120">
            <circle className="progress-bg" cx="60" cy="60" r="54" />
            <circle
              className="progress-bar"
              cx="60"
              cy="60"
              r="54"
              style={{
                strokeDashoffset: 339.292 - (339.292 * progress) / 100,
              }}
            />
          </svg>

          {showRam && <div className="ram-text">राम 🙏</div>}

          <div className="progress-text">
            <h1>{showconter}</h1>
            <p>Mala {mala}</p>
          </div>
        </div>

        <ul>
          <li>Mala: {mala}</li>
          <li>Total: {allcounter}</li>
        </ul>

        <button onClick={managecounter} >
          " राम..."
        </button>
      </div>
      <Footer/>
    </div>
  );
}
