import {React, useState} from 'react';
import styles from './Calculator.module.css';
import { evaluateExpression } from '../../config/helper-methods';
import { buttonValues } from '../../config/helper-config';


const Calculator = ()=>{
    const [currrentExpression, setCurrentExpression] = useState('');
    const [evaluatedValue, setEvaluatedValue] = useState(null);

    const buttonClickHandler = (e)=>{
        if(e.target.value!=='C' && e.target.value!=='='){
            setCurrentExpression((prev)=>prev+e.target.value)
            setEvaluatedValue(null)
        }
        else if(e.target.value==='C'){
            setCurrentExpression('');
            setEvaluatedValue(null)
        }
        else{
            setEvaluatedValue(evaluateExpression(currrentExpression))
        }
        
    }

    return (
        <>
            <h1>React Calculator</h1>
            <input type="text" value={currrentExpression} readOnly/>
            {evaluatedValue?
                (<div className={styles.evaluatedValue}>{evaluatedValue}</div>)
                :
                (<></>)
            }
            <div className={styles.buttonGrid_wrapper}>
                {buttonValues.map((value)=>{
                    return <button className={styles.buttonElement} onClick={(e)=>{buttonClickHandler(e)}} key={value} value={value}>{value}</button>
                })}
            </div>
        </>
    )
}
export default Calculator;