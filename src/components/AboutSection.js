import React from 'react'
import './AboutSection.css'

const AboutSection = () => {
  return (
    <div className='aboutSection'>
      <div className='left'>
        <img src={require("./img/food.png")} alt="food"/>
      </div>
      <div className='right'>
        <h1>How does it work?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla aliquet nibh sed hendrerit. Nunc imperdiet lorem vitae vulputate maximus. Vivamus nec erat egestas, vehicula mauris eu, hendrerit justo. Mauris eget est vitae dui semper aliquam vel quis nibh. Praesent sodales nec lectus id tincidunt. Aenean arcu sem, lacinia eu suscipit non, tristique eget libero. Pellentesque vitae turpis rutrum, pretium sem nec, auctor est. Fusce congue sem ac commodo elementum. Aliquam a laoreet tellus, non cursus magna. Sed nec leo pretium nunc dictum porttitor ac sed ligula. Curabitur rutrum non lectus nec blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer sed ligula aliquam, tincidunt purus vel, hendrerit velit. Vestibulum id risus accumsan, vehicula magna at, vulputate dui. In consectetur at purus at viverra. Sed sagittis turpis id erat condimentum, ac lacinia turpis ultricies.</p>
      </div>
    </div>
  )
}

export default AboutSection
