import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(FirebaseContext); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("User logged in successfully");
      navigate('/'); 
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img alt='logo-image' width="200px" height="200px" src={Logo} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup" className='signup-link'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
