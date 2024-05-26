import React from 'react'
import './AboutSection.css'

const AboutSection = () => {
  return (
    <div className='aboutSection' id='about'>
        <h1>How does it work?</h1>
        <div className='steps'>
          <div className='step'>
            <div className='number'>1</div>
            <h2>Choose your calorie intake</h2>
          </div>
          <div className='step'>
            <div className='number'>2</div>
            <h2>Select number of meals</h2>
          </div>
          <div className='step'>
            <div className='number'>3</div>
            <h2>Enjoy your weekly menu!</h2>
          </div>
        </div>
    </div>
  )
}

export default AboutSection
