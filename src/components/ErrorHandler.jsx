import React from 'react'

import Dialog from 'covince/src/components/Dialog'
import Card from 'covince/src/components/Card'

const Link = props => <a {...props} className='text-primary font-medium underline hover:no-underline'/>

class Error extends React.Component {
  constructor () {
    super()
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return {
      hasError: true
    }
  }

  render () {
    if (this.state.hasError) {
      return (
        <Dialog isOpen onClose={() => {}}>
          <Card className='p-6 relative'>
            <p className='font-bold'>We&rsquo;re sorry, something went wrong.</p>
            <p><Link href=''>Refreshing the page</Link> might fix the problem.</p>
            <p className='text-sm mt-6'>
              If it doesn&rsquo;t, please <Link href='https://github.com/covince/CovGlobe/issues'>contact us</Link>.
            </p>
          </Card>
        </Dialog>
      )
    }
    return this.props.children
  }
}

export default Error
