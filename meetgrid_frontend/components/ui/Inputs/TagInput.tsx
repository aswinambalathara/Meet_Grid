import React from 'react'
import { Input } from '../input'

function TagInput() {
  return (    
    <div className='container w-full  bg-white/50 p-3 flex flex-col gap-2 rounded'>
    <label>Skills</label>
        <div className="tags-display h-40 min-h-40 basis-3/4 bg-zinc-300/35 rounded">
        </div>
        <div className="tagInputWrapper">
            <label className='text-xs'>Add Skills</label>
        <Input className='border border-blue-950'/>
        </div>
    </div>

  )
}

export default TagInput