import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, DropdownButton, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { selectors, actions } from '../slices/channelsSlice';
import { show } from '../slices/modalsSlice';

const Channel = ({ data: { ch, currentChannelId } }) => {
  const dispatch = useDispatch();
  return (
    <li className="nav-item w-100">
      <Button
        variant={ch.id === currentChannelId ? 'secondary' : ''}
        onClick={() => dispatch(actions.changeChannel(ch.id))}
        type="button"
        className="w-100 rounded-0 text-start btn"
      >
        <span className="me-1">#</span>
        {ch.name}
      </Button>
    </li>
  );
};

const RemovableChannel = ({ data: { ch, currentChannelId, showModal } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <li className="nav-item w-100">
      <ButtonGroup role="group" className="d-flex dropdown">
        <Button
          variant={ch.id === currentChannelId ? 'secondary' : ''}
          className="w-100 rounded-0 text-start text-truncate"
          type="button"
          onClick={() => dispatch(actions.changeChannel(ch.id))}
        >
          <span className="me-1">#</span>
          {ch.name}
        </Button>
        <DropdownButton variant={ch.id === currentChannelId ? 'secondary' : ''} as={ButtonGroup} title="" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" onClick={() => showModal({ type: 'removing', item: ch.id })}>{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => showModal({ type: 'renaming', item: ch.id })}>{t('channels.rename')}</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </li>
  );
};

const ChannelsList = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const showModal = (type, item = null) => dispatch(show(type, item));

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.ch')}</span>
        <Button onClick={() => showModal({ type: 'adding', item: null })} variant="outline-light" type="button" className="p-0 text-primary btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((ch) => (
          ch.removable ? (
            <RemovableChannel
              data={{ ch, currentChannelId, showModal }}
              key={ch.id}
            />
          ) : (
            <Channel
              data={{ ch, currentChannelId }}
              key={ch.id}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
