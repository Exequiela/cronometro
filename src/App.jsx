
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]); // Estado para almacenar tiempos parciales
  const [lapCount, setLapCount] = useState(0); // Estado para contar las vueltas

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    } else {
      clearInterval(interval); 
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = () => {
    setIsActive((prev) => !prev); 
  };

  const reset = () => {
    setIsActive(false); 
    setTime(0); 
    setLaps([]); // Reiniciar los tiempos parciales al reiniciar
    setLapCount(0); // Reiniciar el conteo de vueltas
  };

  const recordLap = () => {
    const formattedTime = formatTime(time); // Formatear el tiempo actual
    setLaps((prevLaps) => [
      ...prevLaps, 
      { lap: lapCount + 1, time: formattedTime, total: formatTime(time) }
    ]); // Agregar la vuelta, tiempo parcial y total a la lista
    setLapCount((prevCount) => prevCount + 1); // Incrementar el conteo de vueltas
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 600); // Calcular minutos
    const seconds = Math.floor((time % 600) / 10); // Calcular segundos
    const centiseconds = time % 10; // Calcular centésimas

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Cronómetro</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={toggle} className="button">
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={recordLap} className="button" disabled={!isActive}>
          Parcial
        </button>
        <button onClick={reset} className="button reset">
          Reiniciar
        </button>
      </div>
      <div className="laps">
        <h2></h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Vuelta {lap.lap}: {lap.time} (Total: {lap.total})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;