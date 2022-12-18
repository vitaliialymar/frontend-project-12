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

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null, error: null });

const channelsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(fetchDatas.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
