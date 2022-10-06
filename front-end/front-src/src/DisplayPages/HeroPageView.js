import React from "react";
import '../Styles.css';


function HeroView() {

  return (

    <section class="hero-view-frame-element">

      <div class="hero-view-content">
        <div class="login-button-element">
          <button  class="login-button">Login</button>
        </div> 
        <div class = "title-section">
          <div class="title-capital-letter-element">
            <text class="title-capital-letter-text">B</text>
          </div>
          <div class="secondary-title-element">
            <text class="title-lowercase-letter">agel</text>
            <text class="subtitle">take back your time</text> 
          </div>
        </div> 
        <div class = "list-section">
          <ul>• Plan</ul>
          <ul>• Prioritize</ul>
          <ul>• Perfect</ul>
        </div> 
        <div class="create-button-element">
          <button class="create-account-button">Make your account now!</button>
        </div> 
      
      </div>

    </section>
  );
}

export default HeroView;