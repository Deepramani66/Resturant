import Navbar from '../Components/Layout/Navbar'
import HeroSection from '../Components/LandingPage/HeroSection'
import Images from '../Components/LandingPage/Images'
import Footer from '../Components/Layout/Footer'
import '../index.css'

const Home = () => {
  return (
    <div>
      
      <Navbar />

      <HeroSection />

      <Images />

      <Footer />
    </div>
  )
}

export default Home