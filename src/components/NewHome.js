import React from 'react'
import './NewHome.css'


const NewHome = () => {
  return (
    <div className='homeSection' id='home'>
      <div className='left'>
        <div className='title'>
          <h2>Your Lists</h2>
        </div>
        <ul className='recipeList'>
          <li>Recipe #1<button className="red" value="">✖</button></li>
          <li>Recipe #2<button className="red" value="">✖</button></li>
          <li>Recipe #3<button className="red" value="">✖</button></li>
          <li>Recipe #4<button className="red" value="">✖</button></li>
          <li>Recipe #5<button className="red" value="">✖</button></li>
          <li>Recipe #6<button className="red" value="">✖</button></li>
          <li>Recipe #7<button className="red" value="">✖</button></li>
          <li>Recipe #8<button className="red" value="">✖</button></li>
          <li>Recipe #9<button className="red" value="">✖</button></li>
          <li>Recipe #10<button className="red" value="">✖</button></li>
          <li>Recipe #11<button className="red" value="">✖</button></li>
          <li>Recipe #12<button className="red" value="">✖</button></li>
        </ul>
        
      </div>
      <div className='right'>
        <div className='title'>
          <h2>Your Shopping List</h2>
        </div>
        <ul className='shoppingList'>

        </ul>
      </div>
    </div>
  )
}

export default NewHome
