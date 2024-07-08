import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import SearchContextComponent from './contextApi/SearchContextComponent'
import UserAuthContextComponent from './contextApi/UserAuthContextComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextComponent>
      <UserAuthContextComponent>
        <App/>
      </UserAuthContextComponent>
    </SearchContextComponent>
    <ToastContainer autoClose={2000}/>
  </React.StrictMode>,
)
