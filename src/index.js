import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { signup, login } from './firebase/config';
import { FirebaseContext } from './store/FirebaseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <FirebaseContext.Provider value={{ signup, login }} >
        <App />
      </FirebaseContext.Provider>
    </React.StrictMode>,
  )
