import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from 'firebase/firestore';


function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (postDetails?.userId) {
          const q = query(collection(db, 'user'), where('uid', '==', postDetails.userId));
          
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; 
            setUserDetails(userDoc.data()); 
            console.log("User details fetched:", userDoc.data());
          } else {
            console.log("No matching user found for userId:", postDetails?.userId);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [postDetails, db]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl || "../../../Images/R15V3.jpg"}
          alt={postDetails?.name || "Product Image"}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price}</p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || "No name"}</p>
          <p>{userDetails?.phone || "1234567890"}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
