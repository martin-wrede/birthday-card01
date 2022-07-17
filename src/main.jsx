import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <div className="meindiv">
    <div className="meindiv2"><h1> - Happy -
     </h1></div>
    <div className="meindiv3"><h2>  Birthday</h2>  
    </div>
    <div className="meindiv4">
    
    <h3>Dear Sarah!</h3>
    <br/><br/>
    <div className="meindiv5">
       
   
    </div>
    </div>
    </div>
    <App className="app1" scale="0.27" modelPath={"gltf/zahlen-gold-1-v1.glb"} /> 
    </>
  </React.StrictMode>
)
