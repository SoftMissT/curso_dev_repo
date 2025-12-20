import React, { useState, useEffect } from 'react';

function Home() {
  const diaFinal = 6; // O objetivo
  const totalDias = 50;

  const [displayDay, setDisplayDay] = useState(0);
  const [isTearing, setIsTearing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    // Se estiver no processo de reset, espera um pouco e volta ao zero
    if (isResetting) {
      const timer = setTimeout(() => {
        setDisplayDay(0);
        setIsResetting(false);
      }, 2000); // Pausa no dia final antes de resetar
      return () => clearTimeout(timer);
    }

    // Lógica de animação fluida
    if (displayDay < diaFinal) {
      const timer = setTimeout(() => {
        setIsTearing(true);

        // Tempo para a animação de "voar" completar
        setTimeout(() => {
          setDisplayDay(prev => prev + 1);
          setIsTearing(false);
        }, 400); 
      }, 150); // Intervalo curto entre uma folha e outra para fluidez
      return () => clearTimeout(timer);
    } else {
      // Chegou no dia atual, ativa o estado de reset
      setIsResetting(true);
    }
  }, [displayDay, diaFinal, isResetting]);

  const progress = (displayDay / totalDias) * 100;

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes tearAndFly {
            0% { 
              transform: rotateX(0deg) rotateZ(0deg) translateY(0);
              opacity: 1;
              transform-origin: top;
            }
            30% {
              transform: rotateX(-20deg) rotateZ(-5deg) translateY(-10px);
            }
            100% { 
              transform: rotateX(-50deg) rotateZ(-30deg) translateY(400px) translateX(150px);
              opacity: 0;
              transform-origin: top;
            }
          }
          @keyframes shadowPulse {
            0% { box-shadow: 0 0 0px rgba(79, 70, 229, 0); }
            50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.4); }
            100% { box-shadow: 0 0 0px rgba(79, 70, 229, 0); }
          }
          .leaf-tear {
            animation: tearAndFly 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.statusBadge}>
            <div style={styles.pulseDot} />
            ESTUDOS EM FLUXO
          </div>
        </div>

        <h1 style={styles.title}>Jornada de Aprendizado</h1>

        {/* CALENDÁRIO COM PILHA DE FOLHAS */}
        <div style={styles.calendarWrapper}>
          <div style={styles.spiral}>
            {[...Array(5)].map((_, i) => <div key={i} style={styles.ring} />)}
          </div>
          
          <div style={styles.calendarBase}>
            {/* Folha de fundo (próximo número que aparecerá) */}
            <div style={styles.sheetStatic}>
               <div style={styles.sheetHeader}>DIA</div>
               <span style={styles.sheetNumber}>{displayDay + (isTearing ? 1 : 0)}</span>
            </div>

            {/* Folha que voa */}
            {isTearing && (
              <div style={styles.sheetFalling} className="leaf-tear">
                <div style={styles.sheetHeader}>DIA</div>
                <span style={styles.sheetNumber}>{displayDay}</span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.statsContainer}>
          <h2 style={styles.counterText}>
            Dia <span style={styles.highlight}>{displayDay}</span> 
            <small style={styles.totalText}> / {totalDias}</small>
          </h2>
          
          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }}>
              <div style={styles.progressGlow} />
            </div>
          </div>
          <span style={styles.percentText}>{Math.round(progress)}% Concluído</span>
        </div>

        <p style={styles.footer}>
          {isResetting ? "Ciclo completo! Reiniciando..." : "Rancando páginas do tédio..."}
        </p>
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
    backgroundColor: '#050505',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  card: {
    backgroundColor: '#111',
    padding: '40px',
    borderRadius: '32px',
    width: '350px',
    textAlign: 'center',
    border: '1px solid #222',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1a1a1a',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#4f46e5',
    letterSpacing: '1px',
    marginBottom: '20px',
    border: '1px solid #333',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#4f46e5',
    borderRadius: '50%',
    boxShadow: '0 0 8px #4f46e5',
  },
  title: {
    color: '#eee',
    fontSize: '1.2rem',
    fontWeight: '400',
    marginBottom: '30px',
  },
  calendarWrapper: {
    position: 'relative',
    width: '140px',
    height: '160px',
    margin: '0 auto 40px',
  },
  spiral: {
    position: 'absolute',
    top: '-12px',
    left: '10%',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    zIndex: 10,
  },
  ring: {
    width: '10px',
    height: '24px',
    background: 'linear-gradient(#333, #666, #333)',
    borderRadius: '5px',
  },
  calendarBase: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: '12px',
    position: 'relative',
    boxShadow: '0 10px 0 #999',
    overflow: 'hidden',
  },
  sheetStatic: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetFalling: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    borderTop: '2px solid #eee',
  },
  sheetHeader: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#e11d48',
    marginBottom: '5px',
  },
  sheetNumber: {
    fontSize: '4rem',
    fontWeight: '900',
    color: '#111',
    lineHeight: '1',
  },
  statsContainer: {
    marginTop: '20px',
  },
  counterText: {
    color: '#fff',
    fontSize: '2rem',
    margin: '0 0 15px 0',
  },
  highlight: {
    color: '#4f46e5',
  },
  totalText: {
    fontSize: '1rem',
    color: '#444',
  },
  progressContainer: {
    height: '8px',
    backgroundColor: '#222',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4f46e5',
    transition: 'width 0.3s ease',
    position: 'relative',
  },
  progressGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '20px',
    boxShadow: '0 0 15px #4f46e5',
  },
  percentText: {
    fontSize: '11px',
    color: '#666',
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: '30px',
    fontSize: '0.8rem',
    color: '#444',
    fontStyle: 'italic',
  }
};

export default Home;