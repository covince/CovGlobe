import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { AiFillCloseCircle } from 'react-icons/ai'

const Acknowledgements = () => (
  <Popover>
    {({ open }) => (
      <>
        <Popover.Button>
          Acknowledgements
        </Popover.Button>
        <Transition
          show={open}
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            static
            className='text-base text-gray-800 dark:text-gray-50 fixed right-5 top-14 bg-white dark:bg-gray-600 z-50 p-8 rounded-md shadow-lg max-w-3xl'
          >
            <Popover.Button className="font-bold absolute right-6 top-6 flex items-center space-x-1">
              <AiFillCloseCircle size="1.5em"/>
              <span>Close</span>
            </Popover.Button>
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
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
)

export default Acknowledgements
