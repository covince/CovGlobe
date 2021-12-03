import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Spinner from 'covince/src/components/Spinner'
import AppContainer from 'covince/src/components/AppContainer'
import CovInce from 'covince/src/DynamicCovInce'

import NavBar from './components/NavBar'
import CovGlobeLogo from './components/CovGlobeLogo'
import ErrorHandler from './components/ErrorHandler'

import useDarkMode from 'covince/src/hooks/useDarkMode'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      staleTime: twentyFourHoursInMs * 100
    }
  }
})

const Loading = () => (
  <div className='fixed inset-0 grid place-content-center bg-blue-900 text-white'>
    <div className='flex flex-col space-y-5 items-center mb-6'>
      <Spinner className='w-6 h-6' />
      <CovGlobeLogo />
    </div>
  </div>
)

const avgFunction = count => count / 3

function App () {
  const darkMode = useDarkMode()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar darkMode={darkMode} />
        <ErrorHandler>
          <Suspense fallback={<Loading />}>
            <AppContainer>
              <CovInce
                tiles_url="/map-50m.json"
                config_url="/config.json"
                avg={avgFunction}
                darkMode={darkMode.isDark}
              />
            </AppContainer>
            <div className="text-center p-2 md:pt-0 md:pb-4 mx-5 text-sm">
              GISAID data provided on this website are subject to <a className="underline" href="https://www.gisaid.org/registration/terms-of-use/">GISAID's Terms and Conditions</a>.
            </div>
          </Suspense>
        </ErrorHandler>
      </QueryClientProvider>
    </>
  )
}

export default App
