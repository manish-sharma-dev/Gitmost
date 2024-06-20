import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo2.png'
// github link : - https://github.com/manish-sharma-dev/Gitmost

export default function Navbar() {

  // to open the github link of the project
function openURL(){
  window.open('https://github.com/manish-sharma-dev/Gitmost');
}

  return (

      <div className='w-full h-auto pt-8 pb-4 pl-10 pr-10 flex justify-between '>

          <div className=" flex g-20 ">
                <img src={logo} width={80} height={100} alt='gitmostLogo' />

                    <div className='logoName_description'>
                      <h2 className='text-2xl font-bold text-white text-nowrap'>GitMost</h2>
                      <p className='text-white opacity-60 cursor-pointer text-sm pt-2 font-sans text-nowrap'>Git Most Trending Projects</p>
                    </div>
          </div>
          
          <div className=" flex gap-8">

            <button style={{ backgroundColor:'#DAF971', color: 'black', borderRadius:'10px'}} className='mt-6 mb-6 mr-0 ml-0 pt-1 pb-1 pr-4 pl-5 text-sm' onClick={openURL}>Check On Github</button>

            {/* <button className='mt-6 mb-6 mr-1 ml-0 pt-1 pb-1 pr-4 pl-5 text-xs'style={{ backgroundColor:'#5f5f5f', color: 'white', borderRadius:'10px', borderStyle:'none' }} ><Star size={15} /></button> */}

          </div>
      </div>
  )
}
