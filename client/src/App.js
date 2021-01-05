import React, { useState, useEffect } from 'react';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://server:9000';

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('TOPIC', data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      {response}
    </p>
  );
}


export default App;
