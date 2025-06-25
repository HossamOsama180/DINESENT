import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../components/NavBar';
import { increment, decrement, removeFromCart, Clear, selectTotalPrice } from '../store/cartSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector(selectTotalPrice);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
    if (selectedProducts.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    navigate('/checkOut', { state: { selectedProducts } });
  };

  return (
    <>
      <NavBar />
      <h2>YOUR Cart</h2>
      <button style={{ display: "flex", justifyContent: "center", margin: "auto", marginBottom: "10px", background: "red" }} onClick={() => dispatch(Clear())}>
        Clear Cart</button>

      <div className="cart-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}>
        {cartItems.map((item) => (
          <div className="card" key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              style={{ marginBottom: '10px' }}
            />

            <img src={item.image} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "contain" }}
            />
            <h3 className="product-title">{item.title}</h3>

            <div className="product-footer">
              <span style={{ color: "black" }} className="product-price">
                price: ${item.price}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", margin: "15px" }}>
              <button
                onClick={() => dispatch(decrement(item.id))}
                className="btn"
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => dispatch(increment(item.id))}
                className="btn"
              >
                +
              </button>
            </div>

            <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
            <button className='remove-item' style={{ display: "flex", justifyContent: "center", margin: "auto", marginBottom: "10px",background:"#2C2C2CC7" }} onClick={() => dispatch(removeFromCart(item.id))}><FaTrashAlt /></button>
          </div>
        ))}

      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <button
          style={{
            background: "green",
            color: "white",
            fontSize: "16px",
            margin: "10px"
          }}
        >Total Price: {total} </button>

        <button
          onClick={handleCheckout}
          style={{

            background: "green",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            margin: "10px"

          }}
        >
          Check Out
        </button>
      </div>
    </>
  );
};

export default Cart;
