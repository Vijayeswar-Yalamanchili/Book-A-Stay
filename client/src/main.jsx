import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import SearchContextComponent from './contextApi/SearchContextComponent'
// import { Provider } from 'react-redux'
// import { store } from './redux/admin/addStayStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchContextComponent>
      <App/>
    </SearchContextComponent>
    <ToastContainer autoClose={2000}/>
  </React.StrictMode>,
)
