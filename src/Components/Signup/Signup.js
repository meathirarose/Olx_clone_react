import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const [signState, setSignState] = useState("Sign In");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, login } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateFields = () => {
    if (!username) {
      setError('Username is required');
      return false;
    }
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    if (!/\S+@gmail\.com$/.test(email)) {
      setError('Email must be a valid mail address');
      return false;
    }
    if (!phone) {
      setError('Phone number is required');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      await user_auth();
    }
  }

  const user_auth = async () => {
    try {
      if (signState === "Sign In") {
        await login(email, password);
        navigate('/');
      } else {
        await signup(username, email, phone, password);
        console.log("User signed up successfully");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img alt='logo-image' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
          />
          <br />
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
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="phone"
            name="phone"
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
          {error && <p className="error">{error}</p>}
          <br />
          <button type="submit" onClick={() => { setSignState("Sign Up") }}>Signup</button>
        </form>
        <Link to="/login" className='signin-link'>Sign In Now</Link>
      </div>
    </div>
  );
}
