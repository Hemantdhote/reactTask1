import React,{useState,useEffect} from 'react'

const App = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setdata(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  const submitHandler=()=>{
    if(edit!==null){

      setdata(data.map((elem)=>elem.id===edit?{id:edit,name,email,number}:elem))
      setedit(null);
    }
    else{
      setdata([...data,{id:data.length+1,name,email,number}])


    }
    setname("")
    setemail("")
    setnumber("")
    
  }

  const deleteHandler=(id)=>{
    const filterData=data.filter((elem)=>elem.id !=id)
    setdata(filterData)
  }

  const editHandler=(id)=>{
    const editData=data.find((elem)=>elem.id===id);
    if(editData){
      setname(editData.name)
      setemail(editData.email)
      setnumber(editData.number)
      setedit(editData.id)
    }

   
    
    
    
  }
  
  
  

  return (
    <div>

      <div className='h-screen w-screen flex'>
        <div className='h-full w-1/3 bg-neutral-700 p-4 text-white flex items-center justify-center flex-col gap-3'>

        <div>
          <p>Name</p>
          <input value={name} onChange={(e)=>setname(e.target.value) } className='w-80 border outline-none px-1 py-1 rounded' placeholder='Enter your name' type="text" />
        </div>
        <div>
          <p>Email</p>
          <input value={email} onChange={(e)=>setemail(e.target.value)} className='w-80 border outline-none px-1 py-1 rounded' placeholder='Enter your email ' type="text" />
        </div>
        <div>
          <p>Number</p>
          <input value={number} onChange={(e)=>setnumber(e.target.value)} className='w-80 border outline-none px-1 py-1 rounded' placeholder='Enter your number ' type="text" />
        </div>

        <button onClick={submitHandler} className='mt-3 w-80 border-none outline-none px-1 py-1 rounded bg-green-700'>submit</button>

        </div>
        <div className='h-full w-2/3 bg-neutral-800 text-white p-3 flex gap-3 flex-wrap'>
    
        {data.map((elem,idx)=>(
            <div key={idx} className='card bg-neutral-700 p-5 rounded-md w-62 h-40 '>
            <h3 className='font-bold text-lg'>{elem.name}</h3>
            
            <h3>Email: {elem.email} </h3>
            <h3>Number: {elem.number} </h3>
            <div className='flex gap-3 mt-2'>
            <button onClick={()=>deleteHandler(elem.id)}  className='bg-red-500 px-2 py-1 rounded-md'>Delete</button>
            <button onClick={()=>editHandler(elem.id)} className='bg-blue-800 px-2 py-1 rounded-md'>Edit</button>
            </div>
            </div>
        ))}
        
        
        </div>

      </div>

    </div>
  )
}

export default App
