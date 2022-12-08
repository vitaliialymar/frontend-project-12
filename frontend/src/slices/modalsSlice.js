/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state, { payload }) => {
      console.log(payload);
      state.item = payload.item;
      state.type = payload.type;
    },
    hide: (state) => {
      state.item = null;
      state.type = null;
    },
  },
});

export const { show, hide } = modalsSlice.actions;
export default modalsSlice.reducer;
