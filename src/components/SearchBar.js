import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({setResults}) => {
  const [input,setInput] = useState("");


    const fetchData = async (value) =>{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = (await response.json());
        const results = data.filter((user) =>{
            return user && user.name && user.name.toLowerCase().includes(value);
        })
        setResults(results);
    }
    const handleChange = (value) =>{
        setInput(value);
        fetchData(value);
      }
    

  
    return (

    <div className='searchBar-container'>
      <input placeholder='Type to search...' value={input} onChange={(e) =>handleChange(e.target.value)}/>
    </div>
  )
}

export default SearchBar
