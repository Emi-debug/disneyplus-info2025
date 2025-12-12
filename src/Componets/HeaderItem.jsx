import React from 'react'
import { Link } from 'react-router';

function HeaderItem({name,Icon, path}) {
  return (
    <div>
      <Link to={path} >
      <div className='text-white flex items-center gap-3
      text-[15px] font-semibold cursor-pointer hover:underline
      underline-offset-8 mb-2'>
        
          <Icon/>
          <h2 className=''>{name}</h2>
        
      </div>
      </Link>
    </div>
  )
}

export default HeaderItem