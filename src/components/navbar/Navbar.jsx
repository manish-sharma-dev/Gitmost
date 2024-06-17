import React from 'react'
import './Navbar.css'
export default function Navbar() {
  return (

      <div className='w-full h-auto mr-10 ml-6 pt-10 pb-9 pl-10 pr-10 flex justify-between '>

          <div className=" flex g-20 ">
                <img src='#' alt='gitmostLogo' />

                    <div className='logoName_description'>
                      <h2 className='text-4xl font-bold text-white '>GitMost</h2>
                      <p className='text-white opacity-60 cursor-pointer text-base pt-2 font-sans'>Git Most Trending Projects</p>
                    </div>
          </div>
          
          <div className=" flex gap-8">

            <button style={{ backgroundColor:'#DAF971', color: 'black', borderRadius:'10px'}} className='mt-4 mb-4 mr-0 ml-0 pt-1 pb-1 pr-4 pl-5 text-base'> Check On Github</button>

            <button className='mt-4 mb-4 mr-1 ml-0 pt-1 pb-1 pr-4 pl-5 text-base'
            style={{ backgroundColor:'#5f5f5f', color: 'white', borderRadius:'10px', borderStyle:'none' }}>Dark</button>
          </div>
      </div>
  )
}
