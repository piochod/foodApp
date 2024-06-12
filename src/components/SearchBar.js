import React, { useEffect, useState, useCallback } from 'react'
import './SearchBar.css'

const SearchBar = ({setResults}) => {

  const [input,setInput] = useState("");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () =>{
      const response = await fetch(`https://localhost:7182/api/Recipes/query`);
      const responseData = (await response.json());
      console.log(responseData);
        setData(responseData.results);
        setResults(responseData.results);
      },[setResults]);

  const filterData = (value) =>{
    const results = data.filter((user) => {
        return user && user.title && user.title.toLowerCase().includes(value.toLowerCase());});
    setResults(results);
    };

    const handleChange = (value) =>{
      setInput(value);
      filterData(value);
    };
    
    useEffect(() =>{
      fetchData();
    },[fetchData]);
  
    return (
    <div className='searchBar-container'>
      <input placeholder='Type to search...' value={input} onChange={(e) =>handleChange(e.target.value)}/>
    </div>
  )
}

export default SearchBar
