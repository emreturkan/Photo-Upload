import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {

  const [name,setName] = useState('')
  const [author,setAuthor] = useState('')
  const [file,setFile] = useState('')
  const [data,setData] = useState([])

  const changeFile = async(e)=>{
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('image',imageFile)
    try {
      const {data:{image:{src}}} = await axios.post('https://pacific-lake-73728.herokuapp.com/api/v1/uploads',formData,{
        headers:{
         'Content-Type':'multipart/form-data'
        }})
      setFile(src)
      setTimeout(()=>{
        e.target.value = ''
      },7000)
    } catch (error) {
      
    }
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const galeryTask = {name:name,author:author,image:file}
      await axios.post(`https://pacific-lake-73728.herokuapp.com/api/v1/`,galeryTask)
      setName('')
      setAuthor('')
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async()=>{
    try {
      const response = await axios.get('https://pacific-lake-73728.herokuapp.com/api/v1')
      const data = response.data.galery
      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div className='max-w-4xl mx-auto mt-20'>
      <div className='flex items-center justify-center'>
        <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
          <input className='px-3 py-2 rounded-md outline-none shadow-md font-semibold' type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
          <input className='px-3 py-2 rounded-md outline-none shadow-md font-semibold' type="text" placeholder='Author' value={author} onChange={(e)=>setAuthor(e.target.value)} />
          <input className='outline-none shadow-md font-semibold text-white' type="file" onChange={changeFile} />
          <button className='w-24 py-2 bg-blue-500/20 text-blue-100 rounded-md hover:bg-blue-100 hover:text-blue-900 font-semibold transition-all disabled:bg-gray-500/20 disabled:text-gray-600' type='submit' disabled={!file}>Ekle</button>
        </form>
      </div>
      <div className='mt-16 flex gap-x-6 flex-wrap justify-center items-center'>
       {data?.map((item)=>(
        <div className='card w-96 h-60 flex gap-y-3 flex-col my-20' key={item._id}>
          <img className='w-full h-full object-cover rounded shadow-md' src={item.image} alt={item.name} />
          <div className='flex justify-between items-center'><h2 className='text-white font-bold text-3xl'>{item.name}</h2>
          <h2 className='text-white font-semibold'>{item.author}</h2></div>
        </div>
       ))}
      </div>
    </div>
  )
}

export default App