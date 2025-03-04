'use client'

import IEvent from '@/interfaces/IEvent'
import React from 'react'

function EditEvent({event}:{event:IEvent | null}) {
  return (
    <div className='min-h-screen bg-white/50 border border-zinc-200 rounded p-10'>
      <div className="edit-basic-details text-yellow-800">
        <h2 className='font-semibold text-lg '>Edit Event Basic Details</h2>

      </div>
    </div>
  )
}

export default EditEvent