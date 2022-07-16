import React from 'react'

function PlusButton({handlePlusClick}) {

  return (
    <span className='plus'title='New Remote' onClick={handlePlusClick}>+</span>
  )
}

export default PlusButton