import React, { useEffect } from 'react'
import { ReactTyped } from 'react-typed'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Modal from './Modal'
import './NewHome.css'
import { Component } from 'react'
import Cookies from 'js-cookie'


const NewHome = () => {

  const [shoppingLists, setShoppingLists] = useState([]);
  const [selected, setSelected] = useState(window.localStorage.getItem("selected") === null ? 1 : Number(window.localStorage.getItem("selected")));

  useEffect(() => {
    window.localStorage.setItem("selected", selected);
  }, [selected]);

  const FetchLists = async () => {
    const token = Cookies.get('accessToken');
    const response = await fetch('https://localhost:7182/api/List/all', {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    setShoppingLists(await response.json());
  }

  useEffect(() => {
    FetchLists();
  }, [])

  return (
    <div className='homeSection' id='home'>
      <div className='left'>
        <div className='title'>
          <h2>Your Lists</h2>
        </div>
        {/* <ul className='recipeList'>
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
        </ul> */}
        <ul className='recipeList'>
          {shoppingLists.map((data) => {
            let _key = data.listDetails[0].recipeList;
            return(
              <li key={_key} className={_key === selected ? "active" : null} onClick={() => {setSelected(_key)}}>{data.name === null ? "Shopping List #"+data.listDetails[0].recipeList : data.name}<button className="red" value="">✖</button></li>
            );
          })}
        </ul>
        
        
      </div>
      <div className='right'>
        <div className='title'>
          <h2>Your Shopping List</h2>
        </div>
        <ul className='shoppingList'>
        {shoppingLists.map((data) => {
          let ingredientList = [];
          for(let i = 0; i < data.listDetails.length; i++)
          {
            ingredientList.push(<li>{data.listDetails[i].ingredient} &emsp; {data.listDetails[i].quantity} g</li>)
          }
          if(data.listDetails[0].recipeList === selected)
          {
            return ingredientList;
          }
        })}
        </ul>
        <button className="green" value="">Show Recipies</button>
      </div>
    </div>
  )
}

export default NewHome
