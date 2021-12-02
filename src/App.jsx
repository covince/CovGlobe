import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import NavBar from './components/NavBar'
import Spinner from 'covince/src/components/Spinner'
import AppContainer from 'covince/src/components/AppContainer'
// import Covince from './Covince'
import CovInce from 'covince/src/DynamicCovInce'

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
  <div className='fixed inset-0 grid place-content-center'>
    <Spinner className='w-6 h-6 text-gray-500' />
  </div>
)

const avgFunction = count => count / 3

function App () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <NavBar />
          <AppContainer>
            <CovInce
              tiles_url="/map-50m.json"
              config_url="/config.json"
              avg={avgFunction}
            />
          </AppContainer>
          <div className="text-center p-2 md:pt-0 md:pb-4 mx-5 text-sm">
            GISAID data provided on this website are subject to <a className="underline" href="https://www.gisaid.org/registration/terms-of-use/">GISAID's Terms and Conditions</a>.
          </div>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
