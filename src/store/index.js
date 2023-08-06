import { configureStore, createSlice } from "@reduxjs/toolkit";

const outputChecker = (num) => {
  num = parseFloat((+num).toFixed(4)).toString();

  if (num.length > 9) return 'ERROR';
  else return num
}

const evaluate = (num1, num2, operator) => {

  console.log('evaluated');
  console.log(num1, num2);

  if (num2 === 0 && operator === '÷')
    return 'ERROR';

  switch (operator) {
    case '÷':
      return num1 / num2;
    case '×':
      return num1 * num2;
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
  }
}

const outputSlice = createSlice({
  name: 'output',
  initialState: {
    prevOperand: null,
    operator: null,
    prevSecOperand: null,
    evaluated: false,
    currOperand: '0',
    switched: false,
    disabled: false
  },
  reducers: {
    addDigit(state, action) {

      if (state.disabled) 
        state.prevOperand = null;

      state.disabled = false;

      if (state.currOperand.length > 8 && !state.switched && !state.evaluated) 
        return;

      const digit = action.payload.substr(3, 1);
      if (state.currOperand === '0' || state.currOperand === 0 || state.switched || state.currOperand === 'ERROR') {
        if (state.prevSecOperand)
          state.prevSecOperand = null;
        state.currOperand = digit;
      }
      else
        state.currOperand += digit;

      if (state.evaluated) {
        state.evaluated = false;
        state.prevOperand = null;
        state.prevSecOperand = null;
        state.operator = null;
        state.currOperand = digit;
      }

      state.switched = false;
    },
    removeBtn(state, action) {
      state.disabled = false;

      if (state.evaluated || action.payload === 'C' || state.currOperand === 'ERROR') {
        state.prevOperand = null;
        state.prevSecOperand = null;
        state.operator = null;
        state.currOperand = '0';
        state.switched = false;
        state.evaluated = false;
      }
      else {
        state.currOperand = '0';
      }
    },
    backspaceBtn(state) {
      state.disabled = false;

      if ((state.currOperand == 0 && state.evaluated) || state.currOperand === 'ERROR') {
        state.prevOperand = null;
        state.prevSecOperand = null;
        state.operator = null;
        state.evaluated = false;
        state.currOperand = '0';
        state.switched = false;
      }
      else if (state.currOperand.toString().length === 1 || (state.currOperand.toString().length === 2 && +state.currOperand < 0))
        state.currOperand = '0';
      else if (state.currOperand.toString().at(-2) === '.')
        state.currOperand = state.currOperand.toString().slice(0, -2);
      else
        state.currOperand = state.currOperand.toString().slice(0, -1);
    },
    operationBtn(state, action) {

      if (state.operator && !state.switched && !state.evaluated) {
        state.currOperand = evaluate(+state.prevOperand, +state.currOperand, state.operator)
      }

      if (!state.evaluated && !state.switched) {
        if (!state.prevOperand && state.prevSecOperand) {
          state.prevOperand = state.prevOperand;
          state.prevSecOperand = null;
        }
        state.prevOperand = state.currOperand;
      }
      else if (state.prevSecOperand) {

      }
      else if (state.switched) {
        state.currOperand = evaluate(+state.prevOperand, +state.prevSecOperand, state.operator)
        state.prevOperand = state.currOperand;
        state.prevSecOperand = null;
      }
      else {
        state.evaluated = false;
        state.prevOperand = state.currOperand;
        state.prevSecOperand = null;
      }

      switch (action.payload) {
        case 'DIV':
          state.operator = '÷'
          break;
        case 'MUL':
          state.operator = '×'
          break;
        case 'PLUS':
          state.operator = '+'
          break;
        case 'MINUS':
          state.operator = '-'
          break;
      }

      state.switched = true;
      state.currOperand = outputChecker(state.currOperand);
    },
    evaluationBtn(state) {

      state.disabled = false;
      if (state.currOperand === 'ERROR') {
        state.prevOperand = null;
        state.prevSecOperand = null;
        state.operator = null;
        state.currOperand = '0';
        state.switched = false;
        state.evaluated = false;
        return;
      }

      if (state.prevSecOperand && !state.prevOperand) {
        state.prevOperand = state.prevOperand;
        state.prevSecOperand = null;
      }

      if (state.prevSecOperand && state.prevOperand) {
        if (!state.evaluated) {
          if (state.prevSecOperand.includes('/') || state.prevSecOperand.includes('q'))
            state.prevSecOperand = state.currOperand;
          state.currOperand = evaluate(+state.prevOperand, +state.prevSecOperand, state.operator);
        } else {
          state.prevOperand = state.currOperand;
          state.currOperand = evaluate(+state.currOperand, +state.prevSecOperand, state.operator);
        }
      }
      else if (state.prevOperand && !state.evaluated) {
        state.prevSecOperand = state.currOperand;
        state.currOperand = evaluate(+state.prevOperand, +state.currOperand, state.operator);
      }
      else
        state.prevOperand = state.currOperand;


      state.evaluated = true;
      if (state.currOperand === 'ERROR')
        state.disabled = true;
      else
        state.currOperand = outputChecker(state.currOperand);
    },
    fractionBtn(state) {
      state.switched = true;
      state.prevSecOperand = `1/(${state.currOperand})`


      if (state.currOperand == 0) {
        state.currOperand = 'ERROR';
        state.disabled = true;
      }
      else
        state.currOperand = outputChecker(1 / state.currOperand);
    },
    percentBtn(state) {
      state.switched = true;

      if (!state.prevOperand) {
        state.prevOperand = '0';
        state.currOperand = '0'
        state.prevSecOperand = null;
      }
      else {
        if (state.operator === '+' || state.operator === '-') {
          state.currOperand = state.prevOperand * state.currOperand / 100;
          state.prevSecOperand = state.currOperand;
        }
        else {
          state.currOperand = state.currOperand / 100;
          state.prevSecOperand = state.currOperand;
        }
      }
    },
    squareBtn(state) {
      state.switched = true;
      state.prevSecOperand = `sqr(${state.currOperand})`;
      state.currOperand = outputChecker(Math.pow(state.currOperand, 2));
    },
    squareRootBtn(state) {
      state.switched = true;
      state.prevSecOperand = `sqrt(${state.currOperand})`;


      if (state.currOperand < 0) {
        state.currOperand = 'ERROR';
        state.disabled = true;
      }
      else
        state.currOperand = outputChecker(Math.sqrt(state.currOperand));
    },
    negativeBtn(state) {
      state.currOperand = 0 - state.currOperand;
    },
    dotBtn(state) {
      if (state.currOperand.toString().at(-1) === '.')
        return;
      if (state.switched) {
        state.prevOperand = state.currOperand;
        state.currOperand = '0.';
        state.switched = false;
      }
      else
        state.currOperand += '.';
    }
  }
})

const store = configureStore({
  reducer: outputSlice.reducer
});

export default store;
export const outputActions = outputSlice.actions;