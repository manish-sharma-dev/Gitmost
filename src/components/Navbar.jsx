import React from 'react'
import './Navbar.css'
export default function Navbar() {
  return (
      <div className='navbar'>

          <div className="navbar_first_part">
                <img src='#' alt='gitmostLogo' />
                    <div className='logoName_description'>
                      <h2 className='logoName'>GitMost</h2>
                      <p className='description'>Git Most Trending Projects</p>
                    </div>
          </div>
          
          <div className="navbar_second_component">
            <button className='view_source_code'> Check On Github</button>
            <button className='toggle'>Dark</button>
          </div>
      </div>
  )
}
