import React from 'react'
import RequireAdminAuth from '@/components/wrappers/RequireAdminAuth'
function page() {
  return (
    <RequireAdminAuth>
    <div className='flex items-center justify-center'>DASHBOARD</div>
    </RequireAdminAuth>
  )
}

export default page