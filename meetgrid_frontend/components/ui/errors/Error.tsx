import React from 'react'

function Error({error}:{error:string}) {
  return (
    <div className='flex items-center text-red-800'>
        <small>{error}</small>
    </div>
  )
}

export default Error