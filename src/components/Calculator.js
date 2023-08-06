import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../UI/Button";
import { outputActions } from "../store";

import style from './Calculator.module.css'


const Calculator = () => {

  const prevOperand = useSelector(state => state.prevOperand);
  const currOperand = useSelector(state => state.currOperand);
  const prevSecOperand = useSelector(state => state.prevSecOperand);
  const operator = useSelector(state => state.operator);
  const evaluated = useSelector(state => state.evaluated);
  const disabled = useSelector(state => state.disabled);

  const dispatch = useDispatch();

  const addDigitHandler = (e) => {
    dispatch(outputActions.addDigit(e.target.id))
  }

  const operationHandler = (e) => {
    dispatch(outputActions.operationBtn(e.target.id))
  }

  const removeHandler = (e) => {
    dispatch(outputActions.removeBtn(e.target.id))
  }

  //ICONS
  const backspaceIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
      <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
    </svg>
  )
  const fractionIcon = (
    <><sup>1</sup>&frasl;<sub>x</sub></>
  )
  const squareIcon = (
    <>x<sup>2</sup></>
  )
  const squareRootIcon = (
    <>&#x221A;<span>x</span></>
  )
  const negativeIcon = (
    <><sup>+</sup>&frasl;<sub>-</sub></>
  )

  return (
    <Fragment>
      <h2>Calculator:</h2>
      <div className={style.output}>
        <span className={style.prevOperand}>
          {prevOperand} {operator} {prevSecOperand} 
          {evaluated && " ="}
        </span>
        <span className={style.currOperand}>
          {currOperand}
        </span>
      </div>
      <div className={style.btnWrapper}>
        <Button
          disabled={disabled}
          symbol='%'
          id={'PER'}
          onClick={() => { dispatch(outputActions.percentBtn()) }}
        />
        <Button
          symbol='CE'
          id={'CE'}
          onClick={removeHandler}
        />
        <Button
          symbol='C'
          id={'C'}
          onClick={removeHandler}
        />
        <Button
          symbol={backspaceIcon}
          id={'BACKSPACE'}
          onClick={() => { dispatch(outputActions.backspaceBtn()) }}
        />
        <Button
          disabled={disabled}
          symbol={fractionIcon}
          id={'FRAC'}
          onClick={() => { dispatch(outputActions.fractionBtn()) }}
        />
        <Button
          disabled={disabled}
          symbol={squareIcon}
          id={'SQUARE'}
          onClick={() => { dispatch(outputActions.squareBtn()) }}
        />
        <Button
          disabled={disabled}
          symbol={squareRootIcon}
          id={'ROOT'}
          onClick={() => { dispatch(outputActions.squareRootBtn()) }}
        />
        <Button
          disabled={disabled}
          symbol={'÷'}
          id={'DIV'}
          onClick={operationHandler}
        />
        <Button
          id={'num7'}
          onClick={addDigitHandler}
        />
        <Button
          id={'num8'} 
          onClick={addDigitHandler}
        />
        <Button 
          id={'num9'} 
          onClick={addDigitHandler}
        />
        <Button 
          disabled={disabled}
          symbol={'×'} 
          id={'MUL'} 
          onClick={operationHandler}
        />
        <Button 
          id={'num4'} 
          onClick={addDigitHandler}
        />
        <Button 
          id={'num5'} 
          onClick={addDigitHandler}
        />
        <Button 
          id={'num6'} 
          onClick={addDigitHandler}
        />
        <Button 
          disabled={disabled}
          symbol={'-'} 
          id={'MINUS'} 
          onClick={operationHandler}
        />
        <Button 
          id={'num1'} 
          onClick={addDigitHandler}
        />
        <Button 
          id={'num2'} 
          onClick={addDigitHandler}
        />
        <Button 
          id={'num3'} 
          onClick={addDigitHandler}
        />
        <Button
          disabled={disabled}
          symbol='+' 
          id={'PLUS'} 
          onClick={operationHandler}
        />
        <Button 
          disabled={disabled}
          symbol={negativeIcon}
          id={'NEG'} 
          onClick={() => { dispatch(outputActions.negativeBtn()) }}
        />
        <Button 
          id={'num0'} 
          onClick={addDigitHandler}
        />
        <Button 
          disabled={disabled}
          symbol={'.'}
          id={'DOT'} 
          onClick={() => { dispatch(outputActions.dotBtn()) }}
        />
        <Button
          symbol={'='}
          id={'EQUAL'} 
          onClick={() => { dispatch(outputActions.evaluationBtn()) }}
        />
      </div>
    </Fragment>
  )
}

export default Calculator;