import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useSelector, useDispatch, useStore } from 'react-redux';
import { increment, decrement } from './reducers'

import { io } from 'socket.io-client';



function App() {

  const [count, setCount] = useState(0)

  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const store = useStore();

  const handleIncrement = () => {
    dispatch(increment());
    console.log('Increment action dispatched', store.getState());
  };

  const handleDecrement = () => {
    dispatch(decrement());
    console.log('Decrement action dispatched', store.getState());
  };

  useEffect(() => {
  
    const socket = io("http://localhost:3001")
    
    socket.on('stateChanged', (data) => {
      console.log('state change recieved on client', data)

      console.log(data.type)
      if(data.type === 'counter/increment') handleIncrement()
      if(data.type === 'counter/decrement') handleDecrement()
    })

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('stateChanged');
      socket.disconnect();
    }
  },[handleDecrement, handleIncrement]);





  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React hot reload</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        <h1>Redux Counter: {counter}</h1>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
