import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Axios} from "axios";

function App() {
    const axios = new Axios();
    const urlParams = new URLSearchParams(window.location.search);
    const params = new URLSearchParams(window.location.hash.slice(1));

    const handleOwnFlow = async () => {
        // redirect to nestjs app to controller /own/connect/keycloak
        window.location.href = "http://localhost:3001/own/connect/keycloak";
    }

    const handleImplicitFlow = async () => {
        // redirect to keycloak to login
        window.location.href = "http://localhost:8088/realms/intranet-local-test/protocol/openid-connect/auth?response_type=id_token&client_id=cms-strapi-app&redirect_uri=http://localhost:3000&nonce=RANDOM_STRING";
        //window.location.href = "http://localhost:8088/realms/intranet-local-test/protocol/openid-connect/auth?response_type=token&client_id=cms-strapi-app&redirect_uri=http://localhost:3000";
    }

  return (
    <div className="App">
      elooo
        <div>
            <button onClick={handleOwnFlow}>Own Flow</button>
            <button onClick={handleImplicitFlow}>Implicit flow</button>
        </div>
        {/* display urlParams as a json object */}
        <div>
            <p>own flow</p>
            {JSON.stringify(Object.fromEntries(urlParams), null, 2)}
        </div>
        <div>
            <p>implicit flow</p>
            {JSON.stringify(Object.fromEntries(params), null, 2)}
        </div>
    </div>
  );
}

export default App;
