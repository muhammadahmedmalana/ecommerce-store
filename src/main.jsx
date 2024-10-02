
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import {ToastContainer} from 'react-toastify'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    
      <App />
    <ToastContainer/>
  </Provider>

    
 
)
