import { useEffect } from 'react'

import './App.css'
import axios from 'axios';
import Index from './pages/Index';

function App() {

  

 useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BACKEND_API_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log('Success:', res.data))
    .catch(err => console.error('Error:', err));
  }, []);


  return (
    <>
      <Index />
    </>
  )
}

export default App
