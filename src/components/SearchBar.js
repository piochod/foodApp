import React, { useEffect, useState, useCallback, useMemo } from 'react'
import './SearchBar.css'

const SearchBar = ({setResults, restrictions}) => {
  const [query,setQuery] = useState("");

  const addRestrictions = useCallback((url) =>{
      let counter = 0;
      if(restrictions.gluten === 'true'){
        url += '&health=gluten-free';
        counter +=1;     
      }
      if(restrictions.vegan === 'true'){
        url += '&health=vegan';
        counter +=1;
      }
      if(restrictions.vege === 'true'){
        url += '&health=vegetarian';
        counter +=1;
      }
      if(restrictions.lactose === 'true'){
        url+= '&health=dairy-free';
        counter +=1;
      }
      return [url,counter];
  },[restrictions])

  const fetchData = useCallback(async (query) =>{
    if (query === '') {
      const url = addRestrictions(`https://api.edamam.com/api/recipes/v2?type=public&app_id=a86d414f&app_key=8723b0aad81e7c7c9f0b854290d08fd4`);
      let response = [];
      url[1] === 0 ?  response = await fetch(url[0]+'&diet=balanced') : response = await fetch(url[0])
      const responseData = await response.json();
      setResults(responseData.hits);
    } else {
      const url = addRestrictions(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a86d414f&app_key=%208723b0aad81e7c7c9f0b854290d08fd4%09`);
      const response = await fetch(url[0]);
      const responseData = await response.json();
      setResults(responseData.hits);
    }
      },[setResults, addRestrictions]);
      
  const handleChange = (e) =>{
      const inputValue = e.target.value;
      const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
      setQuery(lettersOnly);
    };

  const debounce = (func, delay) => {
      let debounceTimer;
      return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
      };
    };

  const debouncedFetchData = useMemo( () => debounce(fetchData, 500), [fetchData]);

  useEffect(() =>{
    debouncedFetchData(query);
  },[query, debouncedFetchData]);
  
    return (
    <div className='searchBar-container'>
      <input placeholder='Type to search...' value={query} onChange={handleChange}/>
    </div>
  )
}
export default SearchBar