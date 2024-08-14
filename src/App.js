import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/Context';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/postContext';

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
