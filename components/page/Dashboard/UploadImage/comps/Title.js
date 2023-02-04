import React from 'react';

const Title = ({title,color}) => {
  return (
    <div className='text'>
      <h2 className={color}> {title}</h2>
    </div>
  )
}

export default Title;