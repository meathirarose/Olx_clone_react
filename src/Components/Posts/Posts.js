import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);
  const { db } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productList = productsSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(product => validateProduct(product))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]);

  const validateProduct = (product) => {
    const isValidString = (value) => value && value.trim() !== '';

    if (!isValidString(product.imageUrl)) {
      console.error("Validation failed: Missing or invalid image URL for product", product);
      return false;
    }
    if (!product.price || isNaN(product.price)) {
      console.error("Validation failed: Invalid price for product", product);
      return false;
    }
    if (!isValidString(product.category)) {
      console.error("Validation failed: Missing or invalid category for product", product);
      return false;
    }
    if (!isValidString(product.name)) {
      console.error("Validation failed: Missing or invalid name for product", product);
      return false;
    }
    if (!isValidString(product.createdAt)) {
      console.error("Validation failed: Missing or invalid creation date for product", product);
      return false;
    }
    return true;
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Fresh Recommendations</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div 
              key={product.id} 
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl.trim()} alt={product.name.trim()} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category.trim()}</span>
                <p className="name">{product.name.trim()}</p>
              </div>
              <div className="date">
                <span>{product.createdAt.trim()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
