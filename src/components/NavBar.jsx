import React, { useState, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdGlobe } from 'react-icons/io'
import classNames from 'classnames'

import { BsInfoCircleFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

const NavBar = () => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [ackOpen, setAckOpen] = useState(false)
  console.log(aboutOpen)
  const height = useMemo(x => {
    if (aboutOpen) {
      return ('h-96 lg:h-72')
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
      return ('hidden md:block')
    }
  })

  return (
  <header className={classNames('transition-all duration-500 ease-in-out bg-gradient-to-r from-blue-900 to-blue-900', height)}>
   {ackOpen && <div className="fixed mx-5 bg-white z-50 p-8 mt-5 border-gray-700 rounded-md shadow-md">
    <div className="font-bold cursor-pointer text-right" onClick={x => setAckOpen(!ackOpen)}><AiFillCloseCircle className="inline-block" size="1.5em"/> Close</div>
    <h2 className="font-bold pb-1">CovGlobe</h2>
    <p className="pb-5">Find the source code and more information on contributors <a href="https://github.com/theosanderson/covglobe" className="underline">on GitHub</a>.</p>
      <h2 className="font-bold pb-1">GISAID</h2>
      We gratefully acknowledge all data contributors, i.e. the Authors and their Originating laboratories responsible for obtaining the specimens, and their Submitting laboratories for generating the genetic sequence and metadata and sharing via the GISAID Initiative<sup>1</sup> on which this research is based. <br /><br />
          1. Elbe, S., and Buckland-Merrett, G. (2017) Data, disease and diplomacy: GISAID’s innovative contribution to global health. Global Challenges, 1:33-46. DOI: <a className="underline" href="https://doi.org/10.1002/gch2.1018">10.1002/gch2.1018</a> PMCID: <a className="underline" href="https://pubmed.ncbi.nlm.nih.gov/31565258/">31565258</a>
    </div>}
    <div className="h-16 flex justify-between container text-white px-4 pt-2">
      <div className="pt-1">
      <NavLink className="font-bold text-2xl" to="/">
        <span><IoMdGlobe size="1.3em" className="inline-block mr-1 mb-1 "/>CovGlobe</span>
      </NavLink>
     <div className={classNames('text-sm opacity-95 hover:opacity-100 mt-2 ', display_gisaid)} >
      <span className="inline">Enabled by data from</span>
      <a href="//gisaid.org" > <img src="/schild.png" className="inline-block h-6 ml-1" /></a><br />
        </div> </div>
      <div className=" h-text-right mr-1  pt-4">
      <div className="text-sm  text-right"><span className='hidden sm:inline'>
      {!aboutOpen && <span onClick={x => setAckOpen(!ackOpen)} className="cursor-pointer pr-4">Acknowledgements</span>
  } </span> {aboutOpen && <div className="font-bold cursor-pointer pb-7" onClick={x => setAboutOpen(!aboutOpen)}><AiFillCloseCircle className="inline-block mb-1" size="1.5em"/> Close</div>}
        {!aboutOpen && <span className="font-bold cursor-pointer" onClick={x => setAboutOpen(!aboutOpen)}><BsInfoCircleFill className="inline-block mb-1" size="1.5em"/> About this site</span>}</div>

</div></div>

      <div className={classNames('px-3 transition-all duration-1000 container text-white text-sm md:text-base', display_extra)}>
        <p className="mb-1 md:mb-3">This site displays genome data from SARS-CoV-2 sequences deposited in the GISAID global database.
          We aggregate three week rolling averages of PANGO lineages in different locations. A select set of lineages are plotted, with other lineages grouped into their parental lineages.</p>

          <p className="mb-1 md:mb-3"><strong>Important caveat:</strong> global sequencing databases are subject to various biases. Within a country, the genomes sampled may represent only a particular region of the country, or predominantly samples identified at the border, or be enriched for samples that have shown a particular testing result such as SGTF. </p>

          <p>Enabled by data from <a href="//gisaid.org"><img src="/schild.png" className="inline-block h-6 ml-1" /></a>.  Source code and more information <a href="https://github.com/theosanderson/covglobe" className="underline">available on GitHub</a>.</p>

        </div>.
  </header>
  )
}

export default NavBar
