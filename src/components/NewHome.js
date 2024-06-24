import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './NewHome.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const NewHome = () => {
  const [modal, setModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleModal = (result) =>{
    if(!modal){
        fetchdata(result);
    }
    setModal(!modal);
  };

  const fetchdata = async (result) => {
    setLoading(true);
    try {
      const response = await fetch(result);
      const responseData = await response.json();
      console.log(responseData);
      setSelectedResult(responseData);
    } catch (error) {
      console.error('Error fetching', error);
    } finally {
      setLoading(false);
    }
  };

  const [shoppingLists, setShoppingLists] = useState([]);
  const [selected, setSelected] = useState(window.localStorage.getItem("selected") === null ? 1 : Number(window.localStorage.getItem("selected")));
  const [mode, setMode] = useState(0);
  const modeToggle = () => {
    setMode((prevMode) => (prevMode === 0 ? 1 : 0));
  };

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
  };

  useEffect(() => {
    FetchLists();
  }, []);

  return (
    <div className='homeSection' id='home'>

      {shoppingLists.length != 0 ?
      <>
      <div className='left'>
        <div className='title'>
          <h2>Your Lists</h2>
        </div>
        <ul className='recipeList'>
          {shoppingLists.map((data, index) => {
            const _key = data.listDetails[0].recipeList;
            return (
              <li key={`${_key}-${index}`} className={_key === selected ? "active" : null} onClick={() => { setSelected(_key) }}>
                {data.name === null ? "Shopping List #" + data.listDetails[0].recipeList : data.name}
                <button className="red" value="">✖</button>
              </li>
            );
          })}
        </ul>
        <button>
          <Link to='http://localhost:3000/foodApp/addList'>Add a new list</Link>
        </button>
      </div>
      <div className='right'>
        <div className='title'>
          {mode === 0 ? <h2>Your Shopping List</h2> : <h2>Your Recipes</h2>}
        </div>
        <div className='shoppingList'>
          {mode === 0 ? shoppingLists?.map((data, listIndex) => {
            if (data.listDetails[0].recipeList === selected) {
              return data.listDetails.map((detail, detailIndex) => (
                <li key={`${listIndex}-${detailIndex}`}>
                  <div className="ingredientBox">{detail.ingredient.charAt(0).toUpperCase() + detail.ingredient.slice(1)}</div>
                  <div className="quantityBox">{Math.round(detail.quantity)} g</div>
                </li>
              ));
            }
            return null;
          }) : shoppingLists?.map((data, listIndex) => {
            if (data.listDetails[0].recipeList === selected) {
              return data.recipesNames.map((recipeName, recipeIndex) => (
                <li className='recipe' key={`${listIndex}-${recipeIndex}`} onClick={() => { toggleModal(data.urLs[recipeIndex]) }}>
                  {recipeName}
                </li>
              ));
            }
            return null;
          })}
        </div>
        <button className="green" value="" onClick={() => modeToggle()}>
          {mode === 0 ? "Show Recipes" : "Show Shopping List"}
        </button>
      </div>
      <Modal modal={modal} setModal={toggleModal} loading={loading} selectedResult={selectedResult} />
      </> : <>
        <div className='listEmpty'>
          <div className='inner'>
            <h2>No lists have been found!</h2>
            <button>
              <Link to='http://localhost:3000/foodApp/addList'>Add a new list</Link>
            </button>
          </div>

        </div>
      </>
      }

    </div>
  );
};

export default NewHome;