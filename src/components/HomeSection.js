import React from 'react'
import {ReactTyped} from 'react-typed'
import './HomeSection.css'

const HomeSection = () => {
  return (
    <div className='homeSection'>
      <div className='left'>
          <h1>Food App</h1>
          <h2><ReactTyped 
            strings={["Ready to take your diet to the next level?","Join us now!"]}
            typeSpeed={70}
            startDelay={1000}
            backDelay={2000}
            backSpeed={60}
            loop
          /></h2>
          <button>Sign Up</button>
        </div>
        <div className='right'>
          <img src={require("./img/food.png")}></img>
        </div>
        
    </div>
  )
}

export default HomeSection
