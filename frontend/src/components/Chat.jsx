import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../slices/messageSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.jsx';
import useServerClient from '../hooks/useServerClient.jsx';

const CurrentChannel = ({ data: { channelMessages, currentChannelId } }) => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel && currentChannel.name}`}</b>
      </p>
      <span className="text-muted">{t('chat.key', { count: channelMessages.length })}</span>
    </div>
  );
};

const MessagesList = ({ data: { channelMessages, scollToRef } }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    {channelMessages.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        {`: ${message.body}`}
      </div>
    ))}
    <div ref={scollToRef} />
  </div>
);

const Chat = () => {
  const { t } = useTranslation();
  const { getUsername } = useAuth();
  const { newMessage } = useServerClient();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  const [message, setMessage] = useState('');

  const inputRef = useRef();
  const scollToRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    scollToRef.current.scrollIntoView();
  });

  const responseHandler = (status) => {
    if (status === 'ok') {
      setMessage('');
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();

    const messageState = {
      body: message,
      username: getUsername(),
      channelId: currentChannelId,
    };

    newMessage(messageState, responseHandler);
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <CurrentChannel data={{ channelMessages, currentChannelId }} />
        <MessagesList data={{ channelMessages, scollToRef }} />
        <div className="mt-auto px-5 py-3">
          <Form noValidate="" className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                ref={inputRef}
                name="body"
                aria-label={t('chat.new')}
                placeholder={t('chat.placeholder')}
                className="border-0 p-0 ps-2"
              />
              <Button onClick={sendMessageHandler} type="submit" variant="outline-light" disabled={!message.length} className="text-secondary btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">{t('chat.send')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
