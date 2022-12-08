import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utilites/routes';
import { actions } from './channelsSlice';

export const fetchDatas = createAsyncThunk(
  'data/fetchData',
  async (header) => {
    const { data } = await axios.get(routes.dataPath(), { headers: header });
    return data;
  },
);

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
    builder.addCase(actions.removeChannel, (state, { payload }) => {
      const channelId = payload;
      const restEntities = Object.values(state.entities).filter((e) => e.id !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
