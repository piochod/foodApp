import React, { useState } from 'react'
import Modal from './Modal';
import SearchBar from './SearchBar';
import './SearchMeals.css';

const SearchMeals = ({firstFinished, handleChange, restrictions}) => {
    const [results, setResults] = useState([]);
    const [added, setAdded] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAdding = (e)=>{
        e.stopPropagation();
        const itemToAdd = e.target.value;
        if (added.includes(itemToAdd)){
            setAdded(added.filter(item => item !== itemToAdd));
        }
        else{
            setAdded([...added,itemToAdd]);
        }
    };
    const toggleModal = (result) =>{
        if(!modal){
            fetchdata(result);
        }
        setModal(!modal);
    };
    const fetchdata = async (result) =>{
        setLoading(true);
        try{const response = await fetch(result._links.self.href);
            const responseData = (await response.json());
            console.log(responseData);
            setSelectedResult(responseData);}
        catch(error){
            console.error('Error fetching', error);
        }
        finally{
            setLoading(false);
        }
      };

  return (
    <div className={firstFinished ? 'searchMeals' : 'searchMeals hidden'}>
        <SearchBar setResults={setResults} restrictions={restrictions}/>
        <ul className='searchMealsList'>
            {results?.map((result,id) => {
                return <li key={id} onClick={() =>toggleModal(result)}>
                            {result.recipe.label} 
                            <button 
                                className = {added.includes(`${result._links.self.href}`) ? 'red' : 'green'} 
                                value={result._links.self.href} 
                                onClick={(event) => {handleAdding(event)}}
                            >
                             {added.includes(`${result._links.self.href}`) ? '✖' : '✚'}
                            </button>
                        </li>;
            })}
        </ul>
        <div className='buttons'>
            <button onClick={handleChange}>Back</button>
            <button>Finish</button>
        </div>

        <Modal modal={modal} setModal={toggleModal} loading = {loading} selectedResult={selectedResult}/>

    </div>
  )
}

export default SearchMeals
