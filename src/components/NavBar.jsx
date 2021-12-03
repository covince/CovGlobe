import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { BsInfoCircleFill, BsPhone } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

import CovGlobeLogo from './CovGlobeLogo'
import ThemeSwitcher from './ThemeSwitcher'
import Acknowledgements from './Acknowledgements'

import { useMobile } from 'covince/src/hooks/useMediaQuery'

const NavBar = ({ darkMode }) => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <header className={classNames(
      'transition-all duration-500 ease-in-out bg-blue-900',
      aboutOpen ? 'h-auto md:h-80 xl:h-64' : 'h-header md:h-header-md'
    )}
    >
      <div className="container text-white px-4 py-2 md:py-0">
        <div className="h-12 md:h-14 flex justify-between items-center">
          <NavLink to="/" className='flex'>
            <CovGlobeLogo />
          </NavLink>
          <div className="text-sm flex items-center space-x-4">
            <span className='hidden sm:inline'>
              { !aboutOpen && <Acknowledgements /> }
            </span>
            { aboutOpen
              ? <button className="font-bold flex items-center space-x-1" onClick={x => setAboutOpen(false)}>
                <AiFillCloseCircle size="1.5em"/>
                <span>Close</span>
              </button>
              : <button className="font-bold flex items-center space-x-1" onClick={x => setAboutOpen(true)}>
                <BsInfoCircleFill size="1.5em"/>
                <span>About this site</span>
              </button> }
          </div>
        </div>
        <div className={classNames('justify-between items-start hidden', { 'md:flex': !aboutOpen })}>
          <p className='text-sm opacity-95 hover:opacity-100'>
            <span>Enabled by data from</span>
            <a href="//gisaid.org" >
              <img src="/schild.png" className="inline-block h-6 ml-2" />
            </a>
          </p>
          <ThemeSwitcher {...darkMode} className='space-x-3' />
        </div>
      </div>
      <div className={classNames(
        'px-3 pb-3 space-y-3 transition-all duration-1000 container text-white text-sm md:text-base',
        aboutOpen ? 'opacity-100' : 'hidden opacity-0'
      )}>
        { isMobile &&
          <ThemeSwitcher
            {...darkMode}
            className='text-center space-x-5'
            SystemIcon={BsPhone}
          /> }
        <p>
          This site displays genome data from SARS-CoV-2 sequences deposited in the GISAID global database.
          We aggregate three week rolling averages of PANGO lineages in different locations. The selected set of lineages are plotted, with other lineages grouped into their parental lineages within the selection.
        </p>
        <p>
          <strong>Important caveat:</strong> global sequencing databases are subject to various biases. Within a country, the genomes sampled may represent only a particular region of the country, or predominantly samples identified at the border, or be enriched for samples that have shown a particular testing result such as SGTF.
        </p>
        <p>
          Enabled by data from <a href="//gisaid.org"><img src="/schild.png" className="inline-block h-6 ml-1" /></a>.
          Source code and more information <a href="https://github.com/covince/covglobe" className="underline whitespace-nowrap">available on GitHub</a>.
        </p>
      </div>
    </header>
  )
}

export default NavBar
