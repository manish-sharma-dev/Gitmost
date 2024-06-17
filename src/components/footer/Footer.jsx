import React from 'react'
import { Linkedin, GitHub, Mail ,Twitter} from 'react-feather'

export default function Footer() {
  return (
    <div className='m-6 mb-1 '>
        <div style={{color:'white',backgroundColor : '#1E1E1E' }}>
           <h1 style={{color:'white',backgroundColor : '#1E1E1E' }} className='text-center p-5 pt-7 pb-2 text-4xl font-medium font-serif opacity-80' >Get in Touch</h1>
           
           <ul  style={{color:'white',backgroundColor : '#1E1E1E' }} className='flex justify-center gap-5 pt-3'>
            <li className='opacity-70 hover:opacity-100'><GitHub size={18} /></li>
            <li className='opacity-100 hover:opacity-70'><Linkedin size={18}  /></li>
            <li className='opacity-70 hover:opacity-100'><Mail size={18} /></li>
            <li className='opacity-100 hover:opacity-70'><Twitter size={18} /></li>
           </ul>

           <p  style={{color:'white',backgroundColor : '#1E1E1E' }} className='p-3  pl-5 text-sm opacity-50 text-center'>Starting developer, thriving in the joy of coding ,and eager to learn new technologies .....</p>
        </div>
    </div>
  )
}
