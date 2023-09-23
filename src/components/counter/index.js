import React from "react";
import { useState, useEffect, useReducer } from "react";
import styles from "./Counter.module.css";
import ShowResult from "../ShowResult";

function reducer(state, action) {
  switch (action.type) {
    case 'додавання':
      return {
        ...action,
        count: (state.count + action.step)
      };
    case 'віднімання':
      return {
        ...action,
        count: (state.count - action.step)
      };
    default: throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
    type: 'додавання'
  });

  const [isRunning, setIsRunning] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [duration, setDuration] = useState(15000);
  const [durationCount, setDurationCount] = useState(0)
  
  

  useEffect(() => {
    let timerId = null;
    console.log("Додано ефект");

    if(isRunning && (durationCount !== duration)) {
      
      timerId = setInterval(() => {
        const action = {
          ...state
        }
        dispatch(action);
        setDurationCount((prev) => prev +=1000);
      }, 1000)
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
      console.log("Видалено ефект")
    }
  },[state.step, isRunning, state.type, duration, durationCount]);


  const handlerStop = () => {
    setIsRunning(false);
    setIsDisabled(false);

    const action = {
      ...state,
      count: 0
    }

    dispatch(action);
  }

  const hahdlerStart =() => {
    const action = {
      ...state,
      count: 0
    }
    dispatch(action);
    setIsRunning(true);
    setIsDisabled(true);
  }

  const handlerCounterStepChange = ( {target} ) => {
    const newStep = Number(target.value);
    const action = {
      ...state,
      count: 0,
      step: newStep
    }
   dispatch(action);
  };

  const handlerModeChahge = ({ target }) => {
    const action = {
      ...state,
      type: target.value,
    }; 
    // setMode(target.value);
    dispatch(action);
  }

  const handlerCounterDurationChange = ( {target} ) => {
    const newTime = Number(target.value);
    const TimeMs  = newTime * 1000;
    const action = {
      ...state,
      count: 0
    }
   dispatch(action);
   setDuration(TimeMs);
   setIsRunning(false);
   setIsDisabled(false);
   setDurationCount(0);
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Counter</h2>
        <div className={styles.group}>
          <button className={styles.group_button}
                  disabled={isDisabled} 
                  onClick={hahdlerStart}
          >
            {state.type}
          </button>
          <button className={styles.group_button}
                  onClick={handlerStop}>
                    зупинити
          </button>
        </div>
       <div className={styles.group}>
        <label className={styles.group_label} for="counterStep">Оберіть крок лічильника:</label>
        <input type="number" 
                name='counterStep'
                value={state.step} 
                onChange={handlerCounterStepChange}
                className={styles.group_input}>
        </input>
       </div>
       <div className={styles.group}>
       <label className={styles.group_label} for="counterMode">Оберіть режим лічильника:</label>
        <select name='counterMode' 
                value={state.type} 
                onChange={handlerModeChahge}
                className={styles.group_input}
        >
          <option value='додавання'>додавання</option>
          <option value='віднімання'>віднімання</option>
        </select>
       </div>
       <div className={styles.group}>
       <label className={styles.group_label} for="counterDuration">Оберіть час дії лічильника:</label>
        <input type="number" 
               name='counterDuration'
               value={duration/1000} 
               onChange={handlerCounterDurationChange}
               className={styles.group_input}>
        </input>
       </div>
       <div className={styles.group}></div>
        <ShowResult result={state.count}/>
      </div>
    </div>
  )
}