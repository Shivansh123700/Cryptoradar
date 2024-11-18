import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Title from '../Title/Title'
import Programs from '../Programs/Programs'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Title subTitle="" title="What we offer"/>
        <Programs/>
        <About/>
        <Title subTitle="Contact Us" title="Get in Touch"/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  )
}

export default App
