import { useSelector, useDispatch } from 'react-redux';
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
        variant={ch.id === currentChannelId ? 'secondary' : 'light'}
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

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <ButtonGroup>
          <Button
            variant={ch.id === currentChannelId ? 'secondary' : 'light'}
            className="w-100 rounded-0 text-start btn"
            type="button"
            onClick={() => dispatch(actions.changeChannel(ch.id))}
          >
            <span className="me-1">#</span>
            {ch.name}
          </Button>
          <DropdownButton variant={ch.id === currentChannelId ? 'secondary' : 'light'} as={ButtonGroup} title="" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" onClick={() => showModal({ type: 'removing', item: ch.id })}>Удалить</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => showModal({ type: 'renaming', item: ch.id })}>Переименовать</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    </li>
  );
};

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const showModal = (type, item = null) => dispatch(show(type, item));

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button onClick={() => showModal({ type: 'adding', item: null })} variant="outline-primary" size="sm" type="button" className="p-1 text-primary btn btn-group-vertical">
          +
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
