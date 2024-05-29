import React from 'react'
import './ChooseDiet.css'
import { useState } from 'react'
import SearchBar from './SearchBar';

const ChooseDiet = () => {

    const [firstFinished,setFirstFinished] = useState(false);
    const [results, setResults] = useState([]);
    const [added, setAdded] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value,key) =>{
            data[key] = value;
        });
        console.log(data);
        setFirstFinished(!firstFinished);
    }

    const handleChange = (e) =>{
        setFirstFinished(!firstFinished);
    }


    const handleAdding = (e)=>{
        const itemToAdd = e.target.value;
        console.log(itemToAdd);
        if (added.includes(itemToAdd)){
            setAdded(added.filter(item => item !== itemToAdd));
        }
        else{
            setAdded([...added,itemToAdd]);
        }
        
    }
  return (
    <div className='chooseDiet'>
        <h1>Choose your diet!</h1>
        <div className={firstFinished ?'choiceScreen hidden' : 'choiceScreen'}>
            <form onSubmit={handleSubmit}>                              
                <div className='choiceCol'>
                    <label >Are you a vegetarian? </label>
                    <div>
                        <input type='radio' id='VegeYes' name='vege' value={true} required/>
                        <label  >Yes</label>
                        <input type='radio' id='VegeNo' name='vege' value={false} required/>
                        <label >No</label>
                    </div>
                </div>

                <div className='choiceCol'>
                    <label >Are you vegan? </label>
                    <div>
                        <input type='radio' id='VeganYes' name='vegan' value={true} required/>
                        <label >Yes</label>
                        <input type='radio' id='VeganNo' name='vegan' value ={false} required/>
                        <label >No</label>
                    </div>
                </div>
                <div className='choiceCol'>
                    <label >Do you want your meals to be gluten free? </label>
                    <div>
                        <input type='radio' id='GlutenYes' name='gluten' value = {true} required/>
                        <label >Yes</label>
                        <input type='radio' id='GlutenNo' name='gluten' value = {false} required/>
                        <label >No</label>
                    </div>
                </div>
                <div className='choiceCol'>
                    <label >Are you lactose intolerant? </label>
                    <div>
                        <input type='radio' name='lactose' value = {true} required/>
                        <label >Yes</label>
                        <input type='radio' name='lactose' value = {false} required/>
                        <label >No</label>
                    </div>
                </div>
                <button>Next</button>
            </form>
            <div>

            </div>

        </div>
        <div className={firstFinished ? 'searchMeals' : 'searchMeals hidden'}>
            <SearchBar setResults={setResults}/>
            <ul>
            {results.map((result,id) => {
                return <li key={id}>{result.name} <button className = {added.includes(result.name) ? 'red' : 'green'} value={result.name} onClick={handleAdding}>{added.includes(result.name) ? 'x' : '+'}</button></li>;
            })}
            </ul>
            <div className='buttons'>
                <button onClick={handleChange}>Back</button>
                <button>Finish</button>
            </div>
        </div>
      
    </div>
  )
}

export default ChooseDiet
