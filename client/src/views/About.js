import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const About = () => (
  <div>
    <h2>About Us</h2>
    <p>This is #1 service for golfers.</p>
    <p>Measure your drives and add details (fairway, left, right, short, long, OB or hazard). Have all statics!</p>
    <p>You are also able to compare your statics with other users.</p>
    <p>Have fun!</p>
    <button onClick={() => window.location.href = '/'}>Back</button>
  </div>
);

export default About;