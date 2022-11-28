import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Channel = ({ name, removable }) => {
  if (removable === false) {
    return (
      <li className="nav-item w-100">
        <Button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          {name}
        </Button>
      </li>
    );
  }
  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <Button type="button" className="w-100 rounded-0 text-start text-truncate btn">
          <span className="me-1">#</span>
          {name}
        </Button>
        <Button type="button" id="react-aria3463576104-3" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
          <span className="visually-hidden">Управление каналом</span>
        </Button>
      </div>
    </li>
  );
};

export const CurrentChannel = () => {
  const data = useSelector((state) => state.data.datas);
  console.log(data);
  const cur = data.channels.find((ch) => ch.id === data.currentChannelId);
  // console.log(data);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`# ${cur.name}`}
        </b>
      </p>
      <span className="text-muted">{`${data.messages.length} сообщений`}</span>
    </div>
  );
};

const ChannelsList = () => {
  const { channels } = useSelector((state) => state.data.datas);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map((ch) => (
        <Channel
          key={ch.id}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...ch}
        />
      ))}
    </ul>
  );
};

export default ChannelsList;
