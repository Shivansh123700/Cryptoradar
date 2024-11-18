import React from 'react'
import './Programs.css'
import program_1 from '../../assets/program-1.png'
import program_2 from '../../assets/program-2.png'
import program_3 from '../../assets/program-3.png'
import program_icon_1 from '../../assets/program-icon-1.png'
import program_icon_2 from '../../assets/program-icon-2.png'
import program_icon_3 from '../../assets/program-icon-3.png'


const Programs = () => {
  return (
    <div className="programs" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      <div className="program" style={{ textAlign: 'justify', maxWidth: '200px', margin: '20px' }}>
        <img src={program_1} alt="Program 1" style={{ display: 'block', margin: '0 auto', width: '100%' }} />
        <h3 style={{ marginTop: '10px', fontSize: '1.2em' }}>Create Alerts for Cryptocurrency Prices</h3>
        <p style={{ marginTop: '5px', fontSize: '1em', color: '#555' }}>
          Stay informed on cryptocurrency price changes. Set alerts and get notified instantly when your chosen currency hits your target value.
        </p>
        <div className="captions">
          <img src={program_icon_1} alt="Program Icon 1" style={{ marginTop: '10px' }} />
          <p>Crypto Alert</p>
        </div>
      </div>
      <div className="program" style={{ textAlign: 'justify', maxWidth: '200px', margin: '20px' }}>
        <img src={program_2} alt="Program 2" style={{ display: 'block', margin: '0 auto', width: '100%' }} />
        <h3 style={{ marginTop: '10px', fontSize: '1.2em' }}>Deactivate Alerts Quickly</h3>
        <p style={{ marginTop: '5px', fontSize: '1em', color: '#555' }}>
          Easily manage and deactivate alerts to suit your changing preferences with a single click.
        </p>
        <div className="captions">
          <img src={program_icon_2} alt="Program Icon 2" style={{ marginTop: '10px' }} />
          <p>Deactivate Alert</p>
        </div>
      </div>
      <div className="program" style={{ textAlign: 'justify', maxWidth: '200px', margin: '20px' }}>
        <img src={program_3} alt="Program 3" style={{ display: 'block', margin: '0 auto', width: '100%' }} />
        <h3 style={{ marginTop: '10px', fontSize: '1.2em' }}>Receive SMS Alerts</h3>
        <p style={{ marginTop: '5px', fontSize: '1em', color: '#555' }}>
          Never miss an update! Get real-time cryptocurrency notifications directly to your phone via SMS.
        </p>
        <div className="captions">
          <img src={program_icon_3} alt="Program Icon 3" style={{ marginTop: '10px' }} />
          <p>SMS Alert</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
