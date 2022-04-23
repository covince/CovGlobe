import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
// import { BsInfoCircleFill, BsPhone } from 'react-icons/bs'
// import { AiFillCloseCircle } from 'react-icons/ai'

// import CovGlobeLogo from './CovGlobeLogo'
// import ThemeSwitcher from './ThemeSwitcher'
// import Acknowledgements from './Acknowledgements'

// import { useMobile } from 'covince/src/hooks/useMediaQuery'

const NavBar = ({ darkMode }) => {
  // const [aboutOpen, setAboutOpen] = useState(false)
  // const isMobile = useMobile()

  return (
    <header className={classNames(
      'transition-all duration-500 ease-in-out bg-white md:shadow h-header md:h-header-md'
      // aboutOpen ? 'h-auto md:h-80 xl:h-64' : 'h-header md:h-header-md'
    )}
    >
      <div className="container text-white px-4 py-2 md:py-0">
        <div className="h-12 md:h-20 flex items-center space-x-6">
          <NavLink to="/" className=''>
            <img src='/paho-logo.webp' alt='PAHO' className='h-full md:h-16'/>
          </NavLink>
          <h2 className='font-bold font-heading text-xl text-primary proportional-nums hidden md:block'>
            Covid-19 Genomic Surveillance
          </h2>
        </div>
      </div>
    </header>
  )
}

export default NavBar
