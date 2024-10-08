import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {

  const {user} = useContext(AuthContext);
  const {auth} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
    auth.signOut()
    .then(()=>{
      console.log("user signed out");
    })
    .catch((error) =>{
      console.log(error);
    })
  };

  const handleLogin = () =>{
    navigate('/login');
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={!user? handleLogin: null}>
            {user ? `Welcome, ${user.displayName || user.email}` : "Login"}
          </span>
          <hr />
        </div>
        {/* handling user signout */}
        {user && <span onClick={handleLogout}>Logout</span>}
        <div className="sellMenu" >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus/>
            {user?(<Link to="/create"><span>SELL</span></Link>):(<Link to="/"><span>SELL</span></Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
