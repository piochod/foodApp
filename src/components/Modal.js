import React from 'react'
import './Modal.css'

const Modal = ({modal,setModal, selectedResult, loading}) => {
    


  return (
    <div className={modal ? 'modal' : 'modal hidden'}>
        <div className='overlay'>
        {loading ? ( // Render loading state if loading is true
            <div className='loading-spinner' />
          ) : (
            <div className='modal-content'>
              <div className='top'><h2>{selectedResult?.recipe.label}</h2><button className='close-modal' onClick={setModal}>✖</button></div>
              
              <div className='container'>
                <ul>
                    <h3>Ingredients: </h3>
                    {selectedResult?.recipe.ingredientLines.map((ingredient,id) =>{
                      return <li key = {id}>{ingredient} </li>
                    })}
                    <h4>Calories: {Math.round(selectedResult?.recipe.calories)}</h4>
                    <a href={selectedResult?.recipe.url} rel="noreferrer" target='_blank'>Get the recipe</a>
                </ul>
                <div className='image'>
                  <img src={selectedResult?.recipe.images.REGULAR.url} alt ={selectedResult?.recipe.label}/>
                </div>
              </div>
                
            </div>)}
        </div>
    </div>
  )
}

export default Modal
