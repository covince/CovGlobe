import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdGlobe } from 'react-icons/io'

import { BsInfoCircleFill } from 'react-icons/bs'

const NavBar = () => (
  <header className="h-header md:h-header-md bg-gradient-to-r from-blue-900 to-blue-900">
    <div className="h-16 flex items-center justify-between container text-white px-4 pt-2">
      <NavLink className="font-bold text-2xl" to="/">
        <span><IoMdGlobe size="1.3em" className="inline-block mr-1 mb-1 "/>CovGlobe</span>
      </NavLink>
      <div className="text-right mr-1  lg:pt-8">
      <div className="text-sm font-bold "><BsInfoCircleFill className="inline-block mb-1" size="1.5em"/> About this site</div>

<div className="mt-5 hidden lg:inline-block ">
      <a href="//gisaid.org"><div className="text-sm opacity-90 hover:opacity-100" to="/">
        Enabled by data from
        <img src="/schild.png" className="inline-block h-6 ml-1" /><br />
        </div> </a>

      </div></div></div>
  </header>
)

export default NavBar
