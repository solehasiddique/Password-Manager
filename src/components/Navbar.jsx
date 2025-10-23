import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className='mycontainer flex justify-between px-4 py-5 items-center h-15'>
        <div className='logo font-bold text-2xl'>
            <span className='text-green-700'> &lt;</span>
            Pass
            <span className='text-green-700'>OP&gt;</span>
            </div>
        {/* <ul>
            <li className='flex gap-6'>
        <a className='hover:font-bold'href="/">Home</a>
        <a className='hover:font-bold' href="/">About</a>
        <a className='hover:font-bold'href="/">Contact</a>
        </li>
        </ul> */}
        <button className='bg-green-500 my-5 mx-2 rounded-md flex justify-center items-center text-white ring-white ring-1'>
            <img className='invert p-1 w-10' src="/gitnub.png" alt="github logo" />
            <span className='font-bold px-4'>GitHub</span>
       </button>
</div>
    </nav>
  )
}

export default Navbar
