import React from 'react'
import classNames from 'classnames'
import { BsDisplay, BsBrightnessHighFill, BsMoonFill } from 'react-icons/bs'

const ThemeButton = ({ isActive, onClick, children, title }) =>
  <button
    className={classNames('transition-opacity hover:opacity-100 h-5 w-5 inline-flex items-center justify-center', isActive ? 'opacity-100' : 'opacity-60')}
    onClick={onClick}
    title={title}
  >
    {children}
  </button>

const ThemeForm = ({ className, mode, setMode, SystemIcon = BsDisplay }) => (
  <form
    onSubmit={e => e.preventDefault()}
    className={classNames('px-1.5', className)}
  >
    <ThemeButton
      isActive={mode === 'system'}
      onClick={() => setMode('system')}
      title='System preference'
    >
      <span className='sr-only'>System preference</span>
      <SystemIcon className='h-4 w-4' />
    </ThemeButton>
    <ThemeButton
      isActive={mode === 'light'}
      onClick={() => setMode('light')}
      title='Light mode'
    >
      <span className='sr-only'>Light mode</span>
      <BsBrightnessHighFill className='h-4 w-4' />
    </ThemeButton>
    <ThemeButton
      isActive={mode === 'dark'}
      onClick={() => setMode('dark')}
      title='Dark mode'
    >
      <span className='sr-only'>Dark mode</span>
      <BsMoonFill className='h-4 w-4' />
    </ThemeButton>
  </form>
)

export default ThemeForm
