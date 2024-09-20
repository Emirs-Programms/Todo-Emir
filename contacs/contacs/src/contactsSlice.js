import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    dob: (state, action) => {
      state.push(action.payload);
    },
    izm: (state, action) => {
      const { id, name,  } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.name = name;
        
      }
    },
    udalit: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    }
    
  },
});

export const { dob, izm, udalit } = contactsSlice.actions;
export default contactsSlice.reducer;
