import React from "react";
import "bulma/css/bulma.css";

import Teams from "./Teams";

function App() {
  return (
    <div className="App">
      <div className="box">
        <h1 className="title">Bundesliga</h1>

        <Teams />
      </div>
    </div>
  );
}

export default App;
