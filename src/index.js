import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { auth, signup, login, storage, db } from './firebase/config';
import { FirebaseContext, Context } from './store/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <FirebaseContext.Provider value={{ auth, db, signup, login, storage }} >
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </React.StrictMode>,
)
