import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"

import {Auth0Provider} from "@auth0/auth0-react"

import 'bootstrap/dist/css/bootstrap.min.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENTID

const providerConfig = {
    domain: domain,
    clientId: clientId,
    redirectUri: window.location.origin

}


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Auth0Provider {...providerConfig}>
            <App />
        </Auth0Provider>
    </BrowserRouter>
)
