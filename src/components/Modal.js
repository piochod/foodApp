import React from 'react'
import './Modal.css'

const Modal = ({modal,setModal, selectedResult}) => {
    
    





  return (
    <div className={modal ? 'modal' : 'modal hidden'}>
        <div className='overlay'>
            <div className='modal-content'>
            <div className='top'><h2>{selectedResult?.title}</h2><button className='close-modal' onClick={setModal}>✖</button></div>
                <p>
                     {selectedResult?.summary}     
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default Modal
