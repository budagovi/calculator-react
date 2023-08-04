import { configureStore, createSlice } from "@reduxjs/toolkit";

const outputChecker = (num) => {
  num = parseFloat((+num).toFixed(4)).toString();

  if (num.length > 9) return 'ERROR';
  else return num
}

const outputSlice = createSlice({
  name: 'output',
  initialState: {
    prevOperand: null,
    prevSecOperand: null,
    operator: null,
    currOperand: 0,
    switched: false,
    evaluated: false
  },
  reducers: {
    addDigit(state, action) {
      if (state.currOperand.length > 8)
        return
      const digit = action.payload.substr(3, 1);
      if (state.evaluated) {
        state.evaluated = false;
        state.currOperand = digit;
        state.prevOperand = null;
        state.prevSecOperand = null;
        state.operator = null;

      }
      else if ((state.currOperand == 0 && state.currOperand !== '0.') || state.currOperand === 'ERROR') {
        state.currOperand = digit;
      }
      else if (state.operator && state.switched) {
        state.currOperand = digit;
        state.switched = false;
      } else {
        state.currOperand += digit;
      }
    },
    removeCurrent(state) {
      state.currOperand = 0;

      if (state.evaluated) {
        state.evaluated = false;
        state.prevSecOperand = null;
        state.prevOperand = null;
        state.operator = null;
      }
    },
    removeAll(state) {
      state.operator = null;
      state.prevOperand = null;
      state.currOperand = 0;
      state.switched = false;
      state.evaluated = false;
      state.prevSecOperand = null;
    },
    backspaceBtn(state) {
      if (state.currOperand.length === 1 || state.currOperand === 'ERROR')
        state.currOperand = 0
      else if (state.currOperand.length === 3 && Math.abs(state.currOperand) < 1)
        state.currOperand = 0
      else if (state.currOperand)
        state.currOperand = state.currOperand.substring(0, state.currOperand.length - 1);

      state.evaluated = false;
    },
    operationBtn(state, action) {
      const id = action.payload;
      state.prevSecOperand = null;

      if (id === 'DIV')
        state.operator = '÷';
      else if (id === 'MUL')
        state.operator = '×';
      else if (id === 'PLUS')
        state.operator = '+';
      else if (id === 'MINUS') {
        state.operator = '-';
        console.log(state.currOperand)
      }

      state.prevOperand = state.currOperand;
      state.switched = true;
      state.evaluated = false;
    },
    evaluationBtn(state) {

      if(state.currOperand === 'ERROR')
        return;      
      
      if (state.evaluated) {
        if(state.prevSecOperand.toString().includes('/') || state.prevSecOperand.toString().includes('q')) {
          state.prevSecOperand = +state.currOperand;
        }
        else {
          state.prevOperand = state.currOperand;
        }
      }
      else
        state.prevSecOperand = state.currOperand;


      const previous = +state.prevSecOperand;
      const current = +state.prevOperand;
      
      if (state.operator === '÷') {
        if (state.currOperand == 0) {
          state.currOperand = 'ERROR';
          return;
        }
        state.currOperand = current / previous;
      }
      else if (state.operator === '×')
        state.currOperand = previous * current;
      else if (state.operator === '+')
        state.currOperand = previous + current;
      else if (state.operator === '-') {
        state.currOperand = current - previous;
      }
      else if (!state.evaluated)
        state.prevOperand = null;
      
      
      state.evaluated = true;
      state.switched = false;

      state.currOperand = outputChecker(state.currOperand);
    },
    fractionBtn(state) {
      if(state.currOperand === 'ERROR')
        return;  

      if(state.evaluated) {
        state.operator = null;
        state.prevOperand = null;
      }

      if (state.currOperand === 0 || state.currOperand === 'ERROR')
        state.currOperand = 'ERROR'
      else {
        state.prevSecOperand = `1/(${state.currOperand})`;
        state.currOperand = 1 / state.currOperand;
        state.currOperand = state.currOperand;
        state.evaluated = true;
      }
      if (state.currOperand.length > 9)
        state.currOperand = 'ERROR';

      state.currOperand = outputChecker(state.currOperand);
    },
    percentBtn(state) {

      if (state.evaluated) {
        state.evaluated = false;
        state.currOperand = 0;
        state.prevOperand = 0;
        state.prevSecOperand = null;
        state.operator = null;
      }
      else if (state.prevOperand == null)
        state.prevOperand = 0;
      else
        state.currOperand = (state.prevOperand * state.currOperand) / 100;
    },
    squareBtn(state) {
      if(state.currOperand === 'ERROR')
        return;  

      if(state.evaluated) {
        state.operator = null;
        state.prevOperand = null;
      }
      state.prevSecOperand = `sqr(${state.currOperand})`;
      state.currOperand = state.currOperand * state.currOperand;
      state.evaluated = true;
      state.currOperand = outputChecker(state.currOperand);
    },
    squareRootBtn(state) {
      if(state.currOperand === 'ERROR')
        return;  

      if(state.evaluated) {
        state.operator = null;
        state.prevOperand = null;
      }
      state.prevSecOperand = `sqrt(${parseFloat((+state.currOperand).toFixed(4)).toString()})`;
      state.currOperand = Math.sqrt(state.currOperand);
      state.evaluated = true;
      state.currOperand = outputChecker(state.currOperand);
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