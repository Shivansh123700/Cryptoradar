import React from 'react'
import './About.css'
import about_img from "../../assets/about.png"
import play_icon from "../../assets/play-icon.png"

const About = () => {
  return (
    <div className='about'>
      <div className='about-left'>
        <img src={about_img} className='about-img' alt=""/>
      </div>
      <div className='about-right'>
        <h3>Why CryptoRadar</h3>
        <h2>Why Store Crypto Price Alerts in Smart Contracts?</h2>
        <p>Crypto price alerts are stored in smart contracts to ensure decentralization, transparency, and automation.</p>
        <p>Smart contracts allow users to trust the system without relying on intermediaries, as the rules for triggering alerts are immutable and verifiable. They securely automate alerts based on real-time price data from decentralized oracles, ensuring accurate execution.</p>
        <p>This approach prevents tampering, reduces reliance on centralized systems, and provides a tamper-proof record of all actions, making it ideal for decentralized finance (DeFi) applications</p>
    </div>
    </div>
  )
}

export default About
