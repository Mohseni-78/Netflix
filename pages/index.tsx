import Head from 'next/head'
// Import Components =============>
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Row from '@/components/Row'
// Imported Utils ============>
import requests from '@/utils/request'
// Imported Types ============>
import { Movie } from '@/typing'

interface props {
  netflixOriginals: Movie[],
  trendingNow: Movie[],
  topRated: Movie[],
  actionMovies: Movie[],
  comedyMovies: Movie[],
  horrorMovies: Movie[],
  romanceMovies: Movie[],
  documentaries: Movie[],
}
const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries, }: props) => {

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix - Home</title>
      </Head>
      <Header />
      <main>
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          <Row title="trendingNow" movies={trendingNow} />
          <Row title="topRated" movies={topRated} />
          <Row title="actionMovies" movies={actionMovies} />
          <Row title="comedyMovies" movies={comedyMovies} />
          <Row title="horrorMovies" movies={horrorMovies} />
          <Row title="romanceMovies" movies={romanceMovies} />
          <Row title="documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
  )
}
export default Home

export const getServerSideProps = async () => {

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
    }
  }
}