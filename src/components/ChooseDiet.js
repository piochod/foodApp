import React, { useEffect } from 'react'
import './ChooseDiet.css'
import { useState } from 'react'
import SearchBar from './SearchBar';
import Modal from './Modal';

const ChooseDiet = () => {

    const [firstFinished,setFirstFinished] = useState(true);
    const [results, setResults] = useState([]);
    const [added, setAdded] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    const fetchdata = async (id) =>{
        const response = await fetch(`https://localhost:7182/api/Recipes/${id}`);
        const responseData = (await response.json());
        setSelectedResult(responseData);
      };




    const toggleModal = (result) =>{
        setSelectedResult(result);
        setModal(!modal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        formData.forEach((value,key) =>{
            data[key] = value;
        });
        console.log(data);
        setFirstFinished(!firstFinished);
    };

    const handleChange = (e) =>{
        setFirstFinished(!firstFinished);
    };


    const handleAdding = (e)=>{
        e.stopPropagation();
        const itemToAdd = e.target.value;
        if (added.includes(itemToAdd)){
            setAdded(added.filter(item => item !== itemToAdd));
        }
        else{
            setAdded([...added,itemToAdd]);
        }
        
    }

    useEffect(() =>{
        if(modal && selectedResult){
            fetchdata(selectedResult.id);
        }
    },[modal,selectedResult])


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
                return <li key={id} onClick={() =>toggleModal(result)}>
                    {result.title} 
                    <button 
                        className = {added.includes(`${result.id}`) ? 'red' : 'green'} 
                        value={result.id} 
                        onClick={(event) => {handleAdding(event)}}
                    >
                        {added.includes(`${result.id}`) ? '✖' : '✚'}
                    </button>
                </li>;
            })}
            </ul>
            <div className='buttons'>
                <button onClick={handleChange}>Back</button>
                <button>Finish</button>
            </div>

            <Modal modal={modal} setModal={toggleModal} selectedResult={selectedResult}/>

        </div>
      
    </div>
  )
}

export default ChooseDiet
