/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utilites/routes';

export const fetchDatas = createAsyncThunk(
  'data/fetchData',
  async (header) => {
    const { data } = await axios.get(routes.dataPath(), { headers: header });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, { payload }) => {
        console.log(payload);
        channelsAdapter.addMany(state, payload.channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
