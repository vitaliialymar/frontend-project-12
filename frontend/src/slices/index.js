import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReduser from './messageSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReduser,
  },
});
