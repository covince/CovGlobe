import React from 'react'
import { IoMdGlobe } from 'react-icons/io'
import classNames from 'classnames'

const CovGlobeLogo = ({ className }) => (
  <span className={classNames('inline-flex items-center text-2xl font-bold', className)}>
    <IoMdGlobe size="1.375em" className="mr-1.5" /><span>CovGlobe</span>
  </span>
)

export default CovGlobeLogo
