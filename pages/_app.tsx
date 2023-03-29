import type { AppProps } from 'next/app'
// Imported Context ===========>
import ModalContextProvider from '@/contexts/ModalContextProvider'
import MovieContextProvider from '@/contexts/MovieContextProvider'
import LikedContextProvider from '@/contexts/LikedContextProvider'
import ListContextProvider from '@/contexts/ListContextProvider'
// Imported css ========>
import '@/styles/globals.css'
// Imported reactHotToast
import { Toaster } from 'react-hot-toast'



function App({ Component, pageProps }: AppProps) {

  return <>
    <ListContextProvider>
      <MovieContextProvider>
        <ModalContextProvider>
          <LikedContextProvider>
            <Component {...pageProps} />
            <Toaster />
          </LikedContextProvider>
        </ModalContextProvider>
      </MovieContextProvider>
    </ListContextProvider>
  </>
}
export default App