import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { addToCart } from "../store/cartSlice";
import "../Style/Soups.css"

const Soups = () => {


    const [category, setCategory] = useState(null); // الكاتيجوري الواحد
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:8000/api/categories/4')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched category data:", data);
                setCategory(data.category); // 👈 هنا التعديل
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching category:", err);
                setLoading(false);
            });
    }, []);


    if (loading) return <p>Loading...</p>;
    if (!category) return <p>No data found.</p>;

    return (
        <>

            <NavBar />

            <div className="soups-page">
                <h2 className="soups-title">{category.title}</h2>

                <div className="soups-menu">
                    {category.category_dish && category.category_dish.length > 0 ? (
                        category.category_dish.map((dish, index) => (
                            <div key={index} className="soups-item">
                                <img src={dish.image_url} alt={dish.title} />
                                <p><strong>{dish.title}</strong></p>
                                <p>Price: {dish.price}</p>
                                <button
                                    className="soups-add-to-cart"
                                    onClick={() => dispatch(addToCart(dish))}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No dishes available.</p>
                    )}
                </div>
            </div>


        </>
    )
}

export default Soups
