import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState(null);
  const [clean, setClean] = useState(false);

  const fetchApi = async () => {
    let url;
    if (logged){
      url = '/api/auth';
    } else {
      url = '/api';
    }
    try {
      const respuesta = await axios.get(url);
      
      if (respuesta.data.success == true) {
        setMessage(respuesta.data.data.message);
      } else {
        console.log('Response success is false', respuesta);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setMessage(null);
    setClean(false);
  }, [logged, clean]);

  return (
    <>
      <div className='grid grid-cols-3 w-full bg-slate-200'>
        <div className='flex justify-center col-start-2'>
          <p className='font-bold text-4xl py-5'>KUBI TEST</p>
        </div>
        <div className='flex justify-end px-60 col-start-3'>
          {logged ? (
            <button onClick={() => setLogged(false)} className='bg-red-500/75 hover:opacity-50 w-auto h-auto my-4 px-4 py-2 rounded-md border border-black'>Log Out</button>
          ) : (
            <button onClick={() => setLogged(true)} className='bg-sky-500/75 hover:opacity-50 w-auto h-auto my-4 px-4 py-2 rounded-md border border-black'>Log In</button>
          )}
        </div>
      </div>
      <div className='h-screen w-screen flex justify-center mt-10'>
          <div className='flex flex-col w-3/4 h-3/4 bg-slate-200 flex justify-start p-10 rounded-md'>
            <div className='grid grid-cols-3 w-full'>
              <div className='flex col-start-2 justify-center'>
                <button className='bg-emerald-500/75 hover:opacity-75 h-16 w-32 px-4 py-2 rounded-md border border-black col-start-2' onClick={fetchApi}>¡LLAME A LA API!</button>
              </div>
              <div className='flex col-start-3 justify-center'>
                <button className='bg-sky-500/75 hover:opacity-75 h-16 w-32 px-4 py-2 rounded-md border border-black col-start-2' onClick={() => setClean(true)}>LIMPIA EL TEXTO</button>
              </div>
            </div>
            <div className='flex flex-col justify-start items-center mt-10 h-full w-full rounded-md border border-black bg-white'>
              {message && logged && <p className='mt-5 text-xl'>Respuesta de la API loggeado:</p>}
              {message && !logged && <p className='mt-5 text-xl'>Respuesta de la API sin loggearse:</p>}
              <p className='mt-5'>{message}</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
