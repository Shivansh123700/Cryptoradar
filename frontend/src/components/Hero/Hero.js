import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
            <h1>Stay Ahead of the Curve</h1>
            <p>Your Crypto, Your Control. Set price alerts, stay informed, and never miss a market move</p>
        <button className='btn'>Get Started<img src={dark_arrow} alt="" /> </button>
        </div>
    </div>
  )
}

export default Hero
