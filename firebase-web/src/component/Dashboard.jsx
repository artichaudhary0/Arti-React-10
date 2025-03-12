import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import AddProduct from "./AddProduct";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // access collection

        const productList = querySnapshot.docs.map((doc) => ({
          // documents
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(productList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  });

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(handleAuthError(error));
    }
  }

  return (
    <div>
      <h1>My Website</h1>

      <div className="dashboard">
        <h2>Add product</h2>
        <AddProduct />

        <h2>Product List</h2>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              {product.name} -${product.price}
            </li>
          ))}
        </ul>
      </div>

      <LogOut size={32} />
      <button onClick={handleLogout}>Logout</button>

      <User size={48} />
      <div>
        <p>{currentUser?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;
