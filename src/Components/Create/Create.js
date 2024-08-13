import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const {user} = useContext(AuthContext);
  const {storage, db} = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!image) {
        console.log("No image is selected");
        return;
      }
      // reference to the storage location
      const storageRef = ref(storage, `/images/${image.name}`);
      // uploading the image
      const snapshot = await uploadBytes(storageRef, image);
      // getting the url of the uploaded
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      const date = new Date();
      
      // adding product data to the firestore
      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl: url,
        createdAt: date.toDateString(),
        userId: user.uid
      })

      console.log("Product added successfully!");

      navigate('/');

    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              type="number" 
              id="fname" 
              name="Price" 
            />
            <br />
          <br />
          <img 
            alt="Posts" 
            width="200px" 
            height="200px" 
            src={image ? URL.createObjectURL(image):""}>
          </img>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
