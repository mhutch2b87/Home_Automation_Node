const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const express = require('express');
const app = express();
 
const USERNAME = 'P8rXBRl2pPPMBJd7ACSM0swpDPGlRZ7XZoluQWGc'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 1
;


// TURN LIGHT on **************************************************// 
function turnOnAdv() {

  v3.discovery.nupnpSearch()
    .then(searchResults => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(USERNAME);
    })
    .then(api => {
      // Using a LightState object to build the desired state
      const state = new LightState()
        .on() //ON State
        .ct(500) // Min: 153 - Max: 500 
        .brightness(100) //Min: 0 - Max:100
      ;
      
      return api.lights.setLightState(LIGHT_ID, state);
    })
    .then(result => {
      console.log(`Light state change was successful? ${result}`);
    });
}



// TURN LIGHT OFF *************************************************// 

function turnOffAdv() {
  v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(USERNAME);
  })
  .then(api => {
    // Using a LightState object to build the desired state
    const state = new LightState()
      .off() // OFF state
      .ct(200)
      .brightness(100)
    ;
    
    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  });
}


app.listen(3005, () => {  
  console.log("Server is running, listening on port 3005")
})

app.get('/turnon', (req,res,next) => { // turnon is the function (AKA endpoint) that we are calling
  turnOnAdv()
  res.json("On")
})

app.get('/turnoff', (req,res,next) => {
  turnOffAdv()
  res.json('Off')
})
