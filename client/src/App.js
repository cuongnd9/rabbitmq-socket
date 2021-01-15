import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:1234';
let socket = socketIOClient(ENDPOINT);

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      task: {},
      id: '',
    }
  }

  componentDidMount() {
    const id = uuid();
    socket.on('connect', () => {
      socket.emit('USER_CONNECTION', { id, socketId: socket.id });
    })

    socket.on('TASK_ASSIGNMENT', (data) => {
      console.log('13123424')
      this.setState({
        task: data,
      });
      console.log(data);
    });
    window.addEventListener('beforeunload', this.handleUnload);
  }


  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUnload);
  }

  handleUnload = (e) => {
    const { task } = this.state;
    if (task.id) {
      let result = {};
      result = {
        status: 'faile',
        ...task,
        count: task.count ? task.count + 1 : 1,
      };
      socket.emit('USER_CLOSE_TAB', {
        socketId: socket.id,
        status: 'ready'
      }, result);
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // handle task assigned
  handleSubmit = (e) => {
    e.preventDefault();
    const { task } = this.state;
    if (task.id) {
      let result = {};
      if (task.text % 2 === 0) {
        result = {
          status: 'oke',
        }
        this.setState({ task: {} })
      } else {
        result = {
          status: 'faile',
          ...task,
          count: task.count ? task.count + 1 : 1,
        }
        this.setState({ task: {} })
        console.log('failed');
      }
      socket.emit('TASK_HANDLER', {
        socketId: socket.id,
        status: 'ready'
      }, result);
    } else {
      console.log('have not task');
    }
    
  }

  render() {
    return (
      <div className="App" style={{ marginTop: '30px' }}>
        <div>
          <input name="input" style={{ marginRight:'20px' }} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
     </div>
    )
  }
}


export default App;
