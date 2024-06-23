import React, { useEffect } from 'react'
import { ReactTyped } from 'react-typed'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Modal from './Modal'
import './NewHome.css'
import { Component } from 'react'


const NewHome = () => {

  const [shoppingLists, setShoppingLists] = useState([]);
  const [selected, setSelected] = useState(window.localStorage.getItem("selected") === null ? 1 : Number(window.localStorage.getItem("selected")));

  useEffect(() => {
    window.localStorage.setItem("selected", selected);
  }, [selected]);

  const FetchLists = async () => {
    const token = 'CfDJ8BdjEk0vnStMhBNVFNbBqWTLpVNJxmNPKq1Oxcu1BFMQwsdMckOR9uTJzZbhbYQmG5jcjyw7Iwh7LpkEb53SbnKwcFCwdyj5qlRwUlFY2J4tqyxd-FrcuSm5RmEfDzp6WsybhG5zAWCkpKxy-RV7C5xbn_V4mnROAHNiEVFZEPX3ncObLHOKhUl0pKjq-ITkMH8wo7f4Hf9aS6OQiN696aEHOGjTy2mgJYdq6QKJtuO5ntd1-6zOjcbbcAN0O47KoEMjLBcMBn1fu_qLQwHY_mb2HChIRjYTRMC6TDxgxd7iQyGhTFTm4DcPnRkDIDI18SydL7l9ASuGn-0lidyxwV5TgTpn_cE2zwjCYYtyDlW4LWv_2iPrm9qdq7_Wcm6TvGHW_88dwzHFZ8jIB2lMfJ9n6qPVi2HlYFK-kSm5Qv_xN7NYavRjD-_6s3eZ2Cf83Wk0CqvCgYK0mywzG10KaIzNMiXwAbOp_4BMlMuK6DNR0x_MesE33fXNJUQX3yVohGELzfkN2dxgjl68Wd2KY-eOkvOr87hsBHtVsj8LAXnEJxkK1wHQL9DqcARa1HquQCQkxK5y4koTwVhHmM-hetrXjVHt-5dHdkbY_mTsZRfudaP22wQN2sriz2XAqAmrhzY0UHchFoNu3unKFEvhEkth3mRv72Q9d2Irg6BX7h0Jls9ZTBrxdk0rHhvLoFCcpw';
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
