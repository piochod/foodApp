

import React, { useEffect } from 'react'
import { ReactTyped } from 'react-typed'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Modal from './Modal'

import './NewHome.css'
import { Component } from 'react'


const NewHome = () => {

  const [shoppingLists, setShoppingLists] = useState([]);
  const [selected, setSelected] = useState(1);

  const FetchLists = async () => {
    const token = 'CfDJ8BdjEk0vnStMhBNVFNbBqWS7BIdKsVwMdnjrfXqfTfYCO9d0ZiuZZF3N0OTqLQgxDUv7OE0JlTLrhvpLm_2e1kh1_siVVv1xAxS1WyiV3-NLTb8pkTgupEvnoTXHEvwrSTowFuxJ_EfObYfxnz-2IZvSE62J3pB_wN2gXUNiPleY4eItDlB94PYS_O4xduNu8aooWJH5jRHVHXrrlciDnFwopqqHT19F_RM1mcdbiHIL0CrBIJGYJY8GET20jTwDapOsT_3VE21mN3j01F0Jw-4Okkhs6hrGdhS4Lld9lpK5_tqpelaGcjUF0EujVQ9oMlj7tpCq6Tf3ReAtaO_qaHnsKR0oQmWxYs4VjUuDdpLVkZ_wwPW8E9CYr4nDAOCKASb2X-40waFmmrc1IN4hQRYML0TkkhXLAuhcP58J9-x7URvuuP-8cBKdlU2-HJBbbTB0L52zMZUcw3mY_SHBEeQr7DVK8J3IgcPk2YgcfvgKJijoyUMScEvkYLbW9_PRfCrc9dP3FTv1bhHhLIqSMucaMT1uUCfH189hpfBJXJz-ZDj729nps071XlVGlO3f0q7fbuS5j0w0dmA-OIF-qCn3zzTkEfgrg6xKdZvz_X8AApUwVQxlSFTcJqVlQIq0pdV8p3pRCr8jDdHDpE7z8o-19yZUGsFIHedj5CDwR21Ei29BjX3-aigt8svWf1k1HQ';
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
          if(data.listDetails[0].recipeList == selected)
          {
            return ingredientList;
          }
        })}
        </ul>
      </div>
    </div>
  )
}

export default NewHome
