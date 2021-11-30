import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdGlobe } from 'react-icons/io'
import classNames from 'classnames'

import { BsInfoCircleFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

const NavBar = () => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [ackOpen, setAckOpen] = useState(false)

  return (
    <header className={classNames(
      'transition-all duration-500 ease-in-out bg-blue-900',
      aboutOpen ? 'h-auto md:h-80 xl:h-64' : 'h-header md:h-header-md'
    )}
    >
      { ackOpen &&
        <div className="fixed right-5 top-14 bg-white z-50 p-8 border-gray-700 rounded-md shadow-lg max-w-3xl">
          <button className="font-bold absolute right-6 top-6 flex items-center space-x-1" onClick={x => setAckOpen(!ackOpen)}>
            <AiFillCloseCircle size="1.5em"/>
            <span>Close</span>
          </button>
          <h2 className="font-bold">CovGlobe</h2>
          <p className="pb-5">
            Find the source code and more information on contributors <a href="https://github.com/theosanderson/covglobe" className="underline">on GitHub</a>.
          </p>
          <h2 className="font-bold">GISAID</h2>
          <p>
            We gratefully acknowledge all data contributors, i.e. the Authors and their Originating laboratories responsible for obtaining the specimens, and their Submitting laboratories for generating the genetic sequence and metadata and sharing via the GISAID Initiative<sup>1</sup> on which this research is based.
          </p>
          <p className='mt-3 text-sm'>
            1. Elbe, S., and Buckland-Merrett, G. (2017) Data, disease and diplomacy: GISAID’s innovative contribution to global health. Global Challenges, 1:33-46. DOI: <a className="underline" href="https://doi.org/10.1002/gch2.1018">10.1002/gch2.1018</a> PMCID: <a className="underline" href="https://pubmed.ncbi.nlm.nih.gov/31565258/">31565258</a>
          </p>
        </div> }
      <div className="container text-white px-4 py-2 md:py-0">
        <div className="h-12 md:h-14 flex justify-between items-center">
          <NavLink className="font-bold text-2xl flex items-center" to="/">
            <IoMdGlobe size="1.375em" className="mr-1.5" /><span>CovGlobe</span>
          </NavLink>
          <div className="text-sm flex items-center">
            <span className='hidden sm:inline'>
              { !aboutOpen &&
                <button className="cursor-pointer pr-4" onClick={x => setAckOpen(!ackOpen)}>
                  Acknowledgements
                </button> }
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
        <div className={classNames('text-sm opacity-95 hover:opacity-100 hidden', { 'md:block': !aboutOpen })} >
          <span>Enabled by data from</span>
          <a href="//gisaid.org" >
            <img src="/schild.png" className="inline-block h-6 ml-2" />
          </a>
        </div>
      </div>
      <div className={classNames(
        'px-3 pb-3 space-y-3 transition-all duration-1000 container text-white text-sm md:text-base',
        aboutOpen ? 'opacity-100' : 'hidden opacity-0'
      )}>
        <p>
          This site displays genome data from SARS-CoV-2 sequences deposited in the GISAID global database.
          We aggregate three week rolling averages of PANGO lineages in different locations. A select set of lineages are plotted, with other lineages grouped into their parental lineages.
        </p>
        <p>
          <strong>Important caveat:</strong> global sequencing databases are subject to various biases. Within a country, the genomes sampled may represent only a particular region of the country, or predominantly samples identified at the border, or be enriched for samples that have shown a particular testing result such as SGTF.
        </p>
        <p>
          Enabled by data from <a href="//gisaid.org"><img src="/schild.png" className="inline-block h-6 ml-1" /></a>.
          Source code and more information <a href="https://github.com/covince/covglobe" className="underline whitespace-nowrap">available on GitHub</a>.
        </p>
        <p>
        </p>
      </div>
    </header>
  )
}

export default NavBar
