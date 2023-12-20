import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from './firebase.config.js';
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
      style={{ zIndex: "999999" }}
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      ></ToastContainer>
    </BrowserRouter>
  </Provider>
</React.StrictMode>,
)