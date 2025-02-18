import React from 'react'
import { assets } from '../app/assets/assets'
import Image from 'next/image'

const AdminNavbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <Image className='w-[max(8%,70px)]' src={assets.logo_light} alt="" />
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs'>Logout</button>
    </div>
  )
}

export default AdminNavbar
