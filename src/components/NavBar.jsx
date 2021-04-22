import React, { useState, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdGlobe } from 'react-icons/io'
import classNames from 'classnames'

import { BsInfoCircleFill } from 'react-icons/bs'

const NavBar = () => {
  const [aboutOpen, setAboutOpen] = useState(false)
  console.log(aboutOpen)
  const height = useMemo(x => {
    if (aboutOpen) {
      return ('h-72')
    } else {
      return ('h-header md:h-header-md')
    }
  })

  const display_extra = useMemo(x => {
    if (aboutOpen) {
      return ('opacity-100')
    } else {
      return ('hidden opacity-0')
    }
  })

  const display_gisaid = useMemo(x => {
    if (aboutOpen) {
      return ('hidden')
    } else {
      return (' lg:inline-block')
    }
  })

  return (
  <header className={classNames('transition-all duration-500 ease-in-out bg-gradient-to-r from-blue-900 to-blue-900', height)}>
    <div className="h-16 flex items-center justify-between container text-white px-4 pt-2">
      <NavLink className="font-bold text-2xl" to="/">
        <span><IoMdGlobe size="1.3em" className="inline-block mr-1 mb-1 "/>CovGlobe</span>
      </NavLink>
      <div className="text-right mr-1  lg:pt-8">
      <div className="text-sm font-bold "><span className=" cursor-pointer" onClick={x => setAboutOpen(!aboutOpen)}><BsInfoCircleFill className="inline-block mb-1" size="1.5em"/> About this site</span></div>

<div className={classNames('mt-5 ', display_gisaid)}>
      <a href="//gisaid.org"><div className="text-sm opacity-90 hover:opacity-100" to="/">
        <span className="hidden xl:inline">Enabled by data from</span>
        <img src="/schild.png" className="inline-block h-6 ml-1" /><br />
        </div> </a>
<p></p>
      </div></div></div>

      <div className={classNames('transition-all duration-1000 container text-white text-sm', display_extra)}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem odio, pellentesque mattis ante ut, maximus tempus felis. Vestibulum id felis non enim luctus dictum. Donec blandit tortor sit amet laoreet tincidunt. Cras condimentum sapien tortor, vel tempor ante dictum eu. Nam pellentesque libero et elit cursus euismod. Suspendisse potenti. Aenean vel dolor vulputate, blandit elit eu, suscipit orci. Sed quam nibh, faucibus ac erat nec, rhoncus euismod metus. Praesent eu tempus enim. Nulla laoreet scelerisque facilisis.</p>

<p>Morbi sapien sapien, laoreet quis nisl et, vehicula suscipit ante. Morbi luctus, turpis a eleifend vehicula, tortor velit hendrerit ligula, sit amet iaculis risus mauris vel neque. Phasellus rhoncus ante elit, non venenatis nibh scelerisque nec. Sed quis justo orci. Cras et finibus dui. Donec sit amet egestas ipsum, eget pellentesque lacus. Quisque leo ante, congue in ultricies eget, posuere vitae augue. Suspendisse venenatis turpis vitae urna efficitur, et lobortis nibh iaculis. Sed eget ipsum et sapien blandit commodo. Cras finibus maximus placerat. Aliquam erat volutpat. Quisque ut venenatis nulla. Duis hendrerit laoreet mi convallis posuere. Nullam ut elementum elit.</p>
</div>
  </header>
  )
}

export default NavBar
