import React from "react";
import { useState, useEffect } from "react";
// import styles from "./counter.module.scss";
import ShowResult from "../ShowResult";

export default function Counter() {

  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [mode, setMode] = useState('додавання');
  

  useEffect(() => {
    console.log("Додано ефект")
    let timerId = null;
   if(isRunning) {
    timerId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + step)
    }, 1000)
   } else {
    clearInterval(timerId);
   }

    return () => {
      clearInterval(timerId);
      console.log("Видалено ефект")
    }
  },[step, isRunning]);

  const handlerCounterStepChange = ( {target} ) => {
    const newStep = Number(target.value);
    setStep(newStep);
  };

  const handlerStop = () => {
    setIsRunning(false);
    setIsDisabled(false);
  }

  const hahdlerStart =() => {
    setCounter(0);
    setIsRunning(true);
    setIsDisabled(true);
  }

  const handlerModeChahge = ({ target }) => {
    setMode(target.value);
  }

  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button disabled={isDisabled} onClick={hahdlerStart}>{mode}</button>
        <button onClick={handlerStop}>Зупинити</button>
        <input type="number" 
               name='counterStep'
                value={step} 
                onChange={handlerCounterStepChange}></input>
        <select name='counterMode' value={mode} onChange={handlerModeChahge}>
          <option value='додавання'>додавання</option>
          <option value='віднімання'>віднімання</option>
        </select>
        <ShowResult result={counter}/>
      </div>
    </div>
  )
}