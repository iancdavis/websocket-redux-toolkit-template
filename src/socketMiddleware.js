import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server address

const socketMiddleware = (store) => {
  console.log('applying socket middleware')
  return (next) => (action) => {

    console.log('action dispatched', action)
    // When an action is dispatched, emit the event with the current state
    // socket.emit('stateChanged', store.getState());
    socket.emit('stateChanged', action);


    return next(action);
  };
};

export default socketMiddleware;