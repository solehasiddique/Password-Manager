import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 fixed bottom-0 w-full text-white flex flex-col justify-center items-center'>
        <div className='logo font-bold text-2xl'>
            <span className='text-green-700'> &lt;</span>
            Pass
            <span className='text-green-700'>OP&gt;</span>
            </div>
      <div className='flex justify-center items-center'>
        Created with<img className='w-9 mx-1' src="/heart.png" alt="heart"/>by Soleha Siddique
      </div>
    </div>
  )
}

export default Footer
