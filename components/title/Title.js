import React from 'react';
import './title.css'
const Title = ({title}) => {
  return (
    <div className='text'>
      <h2 className="neonText"> {title}</h2>
      
    </div>
  )
}

export default Title;