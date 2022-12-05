import { useContext } from 'react';

import ServerClientContext from '../contexts/ServerClientContext.jsx';

const useServerClient = () => useContext(ServerClientContext);

export default useServerClient;
