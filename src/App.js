import React from "react";
import Form from "./Form";
import Table from "./Table";
import { useState, useEffect} from 'react';


function App() {
  const API_URL="https://jsonplaceholder.typicode.com/";
  const [reqType,setReqType] = useState('users');
  const [items,setItems] = useState([]);
  const [fetchError,setFetchError] = useState(null);
const [isLoading,setIsLoading] = useState(true);

  useEffect(() =>{
    const fetchItems = async() =>{

      try{
        const finalURL = API_URL  + reqType;
        const response = await fetch(finalURL);
      
        if(!response.ok){
          throw Error ("Didn't receive expected Data");
        }
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      }catch(err){
     
          setFetchError(err.message);
      }finally{
        setIsLoading(false);
      }
   }
   setTimeout(() => {
    (async () => await fetchItems())();
  },1000);
       




    
  },[reqType])
  return (
    <div className="App">
     <Form reqType={reqType} setReqType={setReqType}/>
     <Table items={items}/>
    </div>
  );
}

export default App;
