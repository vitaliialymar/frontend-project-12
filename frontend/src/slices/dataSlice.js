/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utilites/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('token'));
  console.log(userId);

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchDatas = createAsyncThunk(
  'data/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return data;
  },
);

const initialState = {
  datas: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, action) => {
        state.datas = { ...state.datas, ...action.payload };
      });
  },
});

export const { actions } = dataSlice;

export default dataSlice.reducer;
