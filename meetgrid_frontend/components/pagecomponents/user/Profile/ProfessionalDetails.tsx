'use client'
import { Button } from '@/components/ui/button'
import ProfileFormInput from '@/components/ui/Inputs/ProfileFormInput'
import TagInput from '@/components/ui/Inputs/TagInput'
import IUser from '@/interfaces/IUser'
import React, { useState } from 'react'

function ProfessionalDetails() {
  const [professionalDetails,setProfessionalDetails] = useState<Partial<IUser>>()
  const handleInputChange = () =>{

  }

  return (
    <div className="container overflow-y-auto h-full p-10 text-black flex flex-col">
    <form className="form-section flex flex-col gap-3">
      <ProfileFormInput
        label="Company name"
        id="companyName"
        value={professionalDetails?.professionalInfo?.companyName!}
        inputType="text"
        name="companyName"
        placeholder="Company name"
        onChange={()=>{}}
      />
      <ProfileFormInput
        inputType="string"
        label="Job Title"
        id="jobTitle"
        name="jobTitle"
        placeholder="Job Title"
        onChange={()=>{}}
        value={professionalDetails?.professionalInfo?.jobTitle!}
      />
      <ProfileFormInput
        id="linkedinUrl"
        name="linkedinUrl"
        inputType="text"
        label="Linkedin URL"
        onChange={()=>{}}
        value={professionalDetails?.professionalInfo?.linkedinUrl!}
        placeholder="Linkedin URL"
      />
      <TagInput/>
      <div className="flex items-center justify-center mt-3">
      <Button size={"lg"} className="bg-violet-700 text-white ">Update Professional Details</Button>
      </div>
    </form>
  </div>
  )
}

export default ProfessionalDetails