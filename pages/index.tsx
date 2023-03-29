import { GetServerSideProps } from 'next'
import Head from 'next/head'
// Import Components =============>
import ModalCom from '@/components/Modal'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Row from '@/components/Row'
// Imported Types ============>
import { Movie, userT } from '@/typing'
// Imported Utils ============>
import { verifyToken } from '@/utils/functions'
import requests from '@/utils/request'
// Imported Contexts ============>
import { useList } from '@/contexts/ListContextProvider'

interface props {
  netflixOriginals: Movie[],
  trendingNow: Movie[],
  topRated: Movie[],
  actionMovies: Movie[],
  comedyMovies: Movie[],
  horrorMovies: Movie[],
  romanceMovies: Movie[],
  documentaries: Movie[],
  user: userT
}
const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries, user }: props) => {
  const { list } = useList()



  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix - Home</title>
      </Head>
      <Header user={user} />
      <main>
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          <Row title="trendingNow" movies={trendingNow} />
          <Row title="topRated" movies={topRated} />
          <Row title="actionMovies" movies={actionMovies} />
          {
            list.length > 0 && (<Row title="My List" movies={list} />)
          }
          <Row title="comedyMovies" movies={comedyMovies} />
          <Row title="horrorMovies" movies={horrorMovies} />
          <Row title="romanceMovies" movies={romanceMovies} />
          <Row title="documentaries" movies={documentaries} />
        </section>
      </main>
      <hr className='my-5 border-2' />
      <Footer />
      <ModalCom />
    </div>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies
  const verifiedToken = await verifyToken(token || '')
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      user: verifiedToken
    }
  }
}