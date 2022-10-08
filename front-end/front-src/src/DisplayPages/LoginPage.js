import React, { useState } from "react";
//import ReactDOM from "react-dom";

import '../Styles.css';

function LoginPage() {
  // React States
  const [errorMessage, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    u_name: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { u_name, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === u_name.value);

    // Check user info
    if (userData) {
      if (userData.password !== pass.value) {
        // pass doesnt match
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // user not in system
      setErrorMessages({ name: "u_name", message: errors.u_name });
    }
  };

  // error message
  const renderErrorMessage = (name) =>
    name === errorMessage.name && (
      <div className="error">{errorMessage.message}</div>
    );

  //login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="userName" name="u_name" required />
          {renderErrorMessage("u_name")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="submitButtonContainer">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="Login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default LoginPage;
