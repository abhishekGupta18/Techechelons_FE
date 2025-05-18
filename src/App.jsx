import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('/api/data')
    .then((response) => {setData(response.data)})
    .catch((error) => {console.log(error)})
},[])
  return (
    <>
      <h1 className='p-4 font-light mx-auto text-center text-2xl bg-neutral-200'>HoLA</h1>
      <div className='flex flex-col justify-center p-3 font-semibold text-xl'>
        <h1 className='pb-4'>Total users : {data.length}</h1>
        {data.map(a =>
         <div key = {a.id}>
          <h1>{a.name}</h1>
         </div>
        )}
      </div>
    </>
  )
}

export default App
