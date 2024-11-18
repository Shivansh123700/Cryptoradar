import React from 'react'
import './Contact.css'
import msg_icon from "../../assets/msg-icon.png"
import mail_icon from "../../assets/mail-icon.png"
import phone_icon from "../../assets/phone-icon.png"
import location_icon from "../../assets/location-icon.png"
import whiet_arrow from "../../assets/white-arrow.png"

const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8e6ca144-f99a-4b0b-a782-a5538f78045b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum est quasi repellendus quidem sapiente dolorem. Officia eaque sequi quod tempore laboriosam velit, ad, labore ipsam, vero qui sapiente animi esse?</p>
      <ul>
        <li><img src={mail_icon} alt="" /> hello@gmail.com</li>
        <li><img src={phone_icon} alt="" /> +911234567</li>
        <li><img src={location_icon} alt="" /> hello</li>
      </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label htmlFor="">Your name</label>
            <input type="text" name="name" placeholder='Enter your name' required />
            <label htmlFor="">Phone Number</label>
            <input type="tel" name="phone" placeholder='Enter your mobile number' required />
            <label htmlFor="">Write your message here</label>
            <textarea name="message" rows="6" placeholder='Enter your message' id="" required></textarea>
            <button type="submit" className="btn dark-btn">Submit Now <img src={whiet_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact
