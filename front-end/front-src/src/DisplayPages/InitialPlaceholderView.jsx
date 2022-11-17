import React from "react";
import '../styles.css';

const BACKEND_URL = "http://localhost:8000";

function InitialView() {
  const [server_response, set_server_response] = React.useState("");

  const talk_to_server = async function() {
    let http_response = await fetch(BACKEND_URL, {
      method: "get",
      mode: "cors"
    });

    let response_body = await http_response.text();
    set_server_response(response_body);
    return;
  }

  const show_response = function() {
    if (server_response.length > 0) { 
      return (<p>{server_response}</p>);
    }
    else { return (null); }
  }

  return (
    <div>
      <p>Press the button to get the server to do something.</p>

      <button onClick = {talk_to_server}>
        Press Me!
      </button>

      {show_response()}
    </div>
  );
}

export default InitialView;