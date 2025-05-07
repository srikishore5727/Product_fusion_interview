import React, { useState } from 'react'

const TotalWeight = () => {

    
  return (
    <div>
      {
        weight == 100 ? <button>Save</button> : <button disabled>Save</button>
      }
    </div>
  )
}

export default TotalWeight
