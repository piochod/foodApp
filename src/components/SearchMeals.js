import React, { useState } from 'react'
import Modal from './Modal';
import SearchBar from './SearchBar';
import './SearchMeals.css';
import Cookies from 'js-cookie';

const SearchMeals = ({firstFinished, handleChange, restrictions}) => {
    const [results, setResults] = useState([]);
    const [added, setAdded] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [final,setFinal]= useState([]);
    const [secondFinished,setSecondFinished] = useState(false);
    const [name, setName] = useState('');
    
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

      const handleFinish = async () => {
        const finalResults = await Promise.all(
            added.map(async (url) => {
                const response = await fetch(url);
                return response.json();
            })
        );
        setFinal(finalResults);
        setSecondFinished(true);
    };

    const toggleModalFetched = (result) =>{
        if(!modal){
            setSelectedResult(result);
        }
        setModal(!modal);

    };

    const handleFinishBack = () =>{
        setSecondFinished(false);
    };

    const handleInputChange = (e) =>{
        setName(e.target.value);
    };

    const handlePost = async () =>{
        let ingredients = [];
        let urls = [];
        let names = [];

        final.forEach(result => {
            urls = [...urls, result._links.self.href];
            names = [...names, result.recipe.label];
            result.recipe.ingredients.forEach(ingredient => {
        // Check if the ingredient is already in the ingredients array
            let existingIngredient = ingredients.find(item => item.ingredient === ingredient.food);
        
            if (existingIngredient) {
            // If the ingredient is found, add the weight to the existing quantity
                existingIngredient.quantity = parseFloat(existingIngredient.quantity) + parseFloat(ingredient.weight);
            } else {
            // If the ingredient is not found, add a new object to the ingredients array
                    let res = {
                    "ingredient": ingredient.food,
                    "quantity": ingredient.weight
                    };
                ingredients = [...ingredients, res];
                }
            });
        });
        const jsonObject = {
            name: name==='' ? null : name,
            urLs: urls,
            recipesNames: names,
            listDetails: ingredients,
            creationDate: new Date().toISOString()
        };
        const token = Cookies.get('accessToken');
        const response = await fetch('https://localhost:7182/api/List',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jsonObject)
        });
        if(response.status === 200){
            window.location.href = 'http://localhost:3000/foodApp/home';
        }
        
    }

  return (
    <div className='searchContainer'>
        <div className={firstFinished && !secondFinished ? 'searchMeals' : 'searchMeals hidden'}>
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
                <button onClick={handleFinish}>Finish</button>
            </div>

            
        </div>
        <div className={secondFinished ? 'finished' : 'finished hidden'}>
                <h1>Summary</h1>
                <div className='inputContainer'>
                    <input placeholder='Name the List' value={name} onChange={handleInputChange} ></input>
                </div>
                <ul className='searchMealsList'>
                    {final?.map((result,id) =>{
                    return <li key={id} onClick={() => toggleModalFetched(result)}>
                                {result.recipe.label} 
                            </li>;
                }) }
                </ul>
                
                <div className='buttons'>
                    <button onClick={handleFinishBack}>Back</button>
                    <button onClick={handlePost}>Finish</button>
                </div>
        </div>
        <Modal modal={modal} setModal={toggleModal} loading = {loading} selectedResult={selectedResult}/>
    </div>
  )
}

export default SearchMeals
