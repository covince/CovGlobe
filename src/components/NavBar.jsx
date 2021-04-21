import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdGlobe } from 'react-icons/io'

const NavBar = () => (
  <header className="h-header md:h-header-md bg-gradient-to-r from-blue-900 to-indigo-900">
    <div className="h-16 flex items-center container text-white px-4">
      <NavLink className="font-bold text-xl" to="/">
        <span><IoMdGlobe size="1.3em" className="inline-block mr-1 mb-1 "/>CovGlobe</span>
      </NavLink>
    </div>
  </header>
)

export default NavBar
