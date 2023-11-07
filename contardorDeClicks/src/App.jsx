import React, { useState , useEffect} from 'react'
import './App.css'

function App() {
  
  const tiempoDeJuego = 5000
  const tiempoDePresentacion = 1000

  const [count, setCount] = useState(0)
  const [habilitarClickStart, setHabilitarClickStart] = useState(false)
  const [habilitarClickConunt, setHabilitarClickConunt] = useState(true)
  const [puntajeMax, setPuntajeMax] = useState(0)
  const [cronometro, setCronometro] = useState(tiempoDeJuego) 
  const presentacion = ["Preparados", "Listos" , "Ya"]
  const [indexPresentacion, setIndexPresentacion] = useState(0)


  // la funcion le suma 1 a count cada vez que se llama
  const sumarAlCount = function () {
    setCount((prevCount) => prevCount + 1);
  };

  // la funcion ejecuta la presentacion para empezar el juego
  const mostrarCuentaregresiva = () => {

    let incremento = 0;

    const intervalId = setInterval(() => {
      setIndexPresentacion((prevIndex) => (prevIndex + 1));
      incremento++;

      if (incremento >= (presentacion.length - 1)) {
        clearInterval(intervalId);
          
        setHabilitarClickConunt(false);
        
        
      }
    }, tiempoDePresentacion/presentacion.length);
    
  };


  //esta funcion es la principal donde se muestra el cronometro y se habiletan los botones
  const empiezarJuego = function() {
    
    setHabilitarClickStart(true);

    mostrarCuentaregresiva();

    let tiempoTranscurrido = 0;

    const cronometroIntervalId = setInterval(() => {
      
      setCronometro((prevCronometro) => prevCronometro - 1000 );
      
      tiempoTranscurrido++;

      if(tiempoTranscurrido >= (tiempoDeJuego/1000)){
        
        clearInterval(cronometroIntervalId); 

        setHabilitarClickStart(false);
        setHabilitarClickConunt(true);

        setCount((prevCount) => {
          if (prevCount > puntajeMax) {
            setPuntajeMax(prevCount);
          }
          return prevCount;
        });

        setCount(0);
        setIndexPresentacion(0);
        setCronometro(tiempoDeJuego);
      } 
    }, 1000);
      
  }

  return (
    <>
      <h1>Contador de clicks</h1>
      <p>El puntaje maximo es {puntajeMax}</p>
      <p >{presentacion[indexPresentacion]}</p>
      <p className='temporizador'>{cronometro / 1000}</p>
      <div className="card">
        <button className='bottom' onClick={empiezarJuego} disabled={habilitarClickStart}>
            Empezar 
        </button>
        <button className='bottom' onClick={sumarAlCount} disabled={habilitarClickConunt}>
          {count}
        </button>
      </div>
     
    </>
  )
}

export default App
