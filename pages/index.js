import React, { useState, useEffect } from 'react';

function Home() {
  const diaAtual = 6;
  const totalDias = 50;
  const porcentagemFinal = (diaAtual / totalDias) * 100;

  const [progress, setProgress] = useState(0);
  const [displayDay, setDisplayDay] = useState(0);
  const [isTearing, setIsTearing] = useState(false);

  useEffect(() => {
    // Animação da barra de progresso
    const timerProgress = setTimeout(() => {
      setProgress(porcentagemFinal);
    }, 500);

    // Animação das folhas rasgando uma por uma
    if (displayDay < diaAtual) {
      const timerDay = setTimeout(() => {
        setIsTearing(true); // Inicia animação de rasgar
        
        // Espera a animação terminar para trocar o número e resetar a posição
        setTimeout(() => {
          setDisplayDay(prev => prev + 1);
          setIsTearing(false);
        }, 400); 
      }, 600);
      return () => clearTimeout(timerDay);
    }

    return () => clearTimeout(timerProgress);
  }, [displayDay, diaAtual, porcentagemFinal]);

  return (
    <div style={styles.container}>
      {/* Injeção de Keyframes CSS */}
      <style>
        {`
          @keyframes tearOff {
            0% { transform: rotate(0deg) translateY(0); opacity: 1; }
            30% { transform: rotate(-5deg) translateY(-10px); }
            100% { transform: rotate(45deg) translateY(200px) translateX(100px); opacity: 0; }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
          .leaf-animation {
            animation: tearOff 0.5s forwards ease-in;
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={{...styles.pulseIcon, animation: 'pulse 1.5s infinite'}}>🟢</span>
          <span style={styles.statusText}>Sistema de Estudos: Ativo</span>
        </div>

        <h1 style={styles.title}>Desafio Focado</h1>

        {/* --- CALENDÁRIO ANIMADO --- */}
        <div style={styles.calendarContainer}>
          {/* Espiral do Calendário */}
          <div style={styles.spiral}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={styles.spiralRing}></div>
            ))}
          </div>

          {/* Folha que está sendo rasgada (Sombra/Anterior) */}
          {isTearing && (
            <div style={{ ...styles.calendarSheet, ...styles.tearingSheet }} className="leaf-animation">
              <span style={styles.calendarNumber}>{displayDay}</span>
            </div>
          )}

          {/* Folha Estática (Próximo Número) */}
          <div style={styles.calendarSheet}>
            <div style={styles.calendarHeader}>ESTUDO</div>
            <span style={styles.calendarNumber}>
              {isTearing ? displayDay + 1 : displayDay}
            </span>
          </div>
        </div>
        {/* --------------------------- */}

        <h2 style={styles.dayCounter}>
          Progresso: <span style={styles.highlight}>{displayDay}</span> / {totalDias}
        </h2>

        <div style={styles.progressBarBackground}>
          <div 
            style={{
              ...styles.progressBarFill,
              width: `${(displayDay / totalDias) * 100}%` 
            }}
          >
            <span style={styles.progressText}>{Math.round((displayDay / totalDias) * 100)}%</span>
          </div>
        </div>

        <p style={styles.footerText}>Rancando folhas, acumulando horas...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#161616',
    borderRadius: '24px',
    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.7)',
    border: '1px solid #333',
    position: 'relative',
    overflow: 'hidden',
  },
  calendarContainer: {
    position: 'relative',
    width: '120px',
    height: '140px',
    margin: '0 auto 30px auto',
    perspective: '1000px',
  },
  spiral: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '-10px',
    left: '10%',
    width: '80%',
    zIndex: 10,
  },
  spiralRing: {
    width: '8px',
    height: '20px',
    backgroundColor: '#444',
    borderRadius: '4px',
    border: '1px solid #222',
  },
  calendarSheet: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    color: '#333',
    borderTop: '15px solid #e11d48', // Faixa vermelha de calendário
  },
  tearingSheet: {
    zIndex: 5,
    pointerEvents: 'none',
  },
  calendarHeader: {
    position: 'absolute',
    top: '-12px',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    color: 'white',
  },
  calendarNumber: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#1f2937',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px',
    fontSize: '0.8rem',
    color: '#00ff88',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '300',
    marginBottom: '20px',
    color: '#aaa',
  },
  dayCounter: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '20px 0 10px 0',
  },
  highlight: {
    color: '#e11d48',
  },
  progressBarBackground: {
    height: '12px',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #e11d48, #fb7185)',
    borderRadius: '10px',
    transition: 'width 0.3s ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  progressText: {
    fontSize: '0.6rem',
    fontWeight: 'bold',
    color: 'white',
    paddingRight: '5px',
  },
  footerText: {
    marginTop: '30px',
    fontSize: '0.8rem',
    color: '#555',
  }
};

export default Home;