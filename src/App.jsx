import React, { Suspense } from 'react'
import NavBar from './components/NavBar'
import Spinner from './components/Spinner'
import AppContainer from './components/AppContainer'
import Covince from 'covince/src/Covince'
import { QueryClient, QueryClientProvider } from 'react-query'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      staleTime: twentyFourHoursInMs * 0.5
    }
  }
})

const Loading = () => (
  <div className='fixed inset-0 grid place-content-center'>
    <Spinner className='w-6 h-6 text-gray-500' />
  </div>
)

function App () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <NavBar />
          <AppContainer>
            <Covince />
          </AppContainer>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
