import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectors } from '../slices/channelsSlice';

const Channel = ({ data: { ch } }) => (
  <li className="nav-item w-100">
    <Button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
      <span className="me-1">#</span>
      {ch.name}
    </Button>
  </li>
);

const RemovableChannel = ({ data: { ch } }) => (
  <li className="nav-item w-100">
    <div role="group" className="d-flex dropdown btn-group">
      <Button type="button" className="w-100 rounded-0 text-start text-truncate btn">
        <span className="me-1">#</span>
        {ch.name}
      </Button>
      <Button type="button" id="react-aria3463576104-3" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
        <span className="visually-hidden">Управление каналом</span>
      </Button>
    </div>
  </li>
);

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button variant="outline-primary" type="button" className="p-1 text-primary btn btn-group-vertical">
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((ch) => (
          ch.removable ? (
            <RemovableChannel
              data={{ ch }}
              key={ch.id}
            />
          ) : (
            <Channel
              data={{ ch }}
              key={ch.id}
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
