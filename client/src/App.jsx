import { io } from 'socket.io-client'
import { useEffect, useMemo, useState } from 'react'

function App() {
  // only doing onChaneg amd then submitting causes the socket to refresh and change the connection on every text change so to prevent this we will be using  useMemo instead of doing just below:

  // const socket = io('http://localhost:3000')
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server')
    })
    socket.on('onboard', (data) => {
      console.log(data);
    })

    socket.on('recieve', (data) => {
      console.log(data);
    })

    return () => {
      socket.disconnect()
    }
    // this return will run when we will refresh our page 
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-black/90'>
      <div className='h-full w-full  flex flex-col items-center p-10'>
        <h1 className="text-white">Hello User</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' required
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
// https://github.com/meabhisingh/socket.io
// visit the above github repo for more on how to make group chats must see