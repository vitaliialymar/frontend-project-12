/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utilites/routes';

export const fetchDatas = createAsyncThunk(
  'data/fetchData',
  async (header, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: header });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  },
);

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
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
        state.error = null;
      })
      .addCase(fetchDatas.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
