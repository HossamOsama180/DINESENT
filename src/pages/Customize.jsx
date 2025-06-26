
import React, { useEffect, useState } from 'react';
import '../Style/CalorieFilter.css';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { addToCart } from "../store/cartSlice";



const MealSuggestion = () => {



    const [categoriesData, setCategoriesData] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxCalories, setMaxCalories] = useState('');
    const [meals, setMeals] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        fetch('http://localhost:8000/api/suggest-meals')
            .then(res => res.json())
            .then(data => {
                console.log("DATA FROM API:", data); // ⬅️ دي تهمنا

                setCategoriesData(data.category_dishes);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);



    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const generateMeals = () => {
        if (selectedCategories.length === 0 || !maxCalories) return;

        // Get all arrays of items from selected categories
        const arrays = selectedCategories.map((cat) => categoriesData[cat]);

        // Generate combinations (cartesian product)
        const combine = (arrays, prefix = []) => {
            if (!arrays.length) return [prefix];
            const [first, ...rest] = arrays;
            return first.flatMap((item) => combine(rest, [...prefix, item]));
        };

        const combinations = combine(arrays);

        // Filter by calories
        const filtered = combinations.filter((combo) => {
            const total = combo.reduce((sum, item) => sum + item.calories, 0);
            return total <= parseInt(maxCalories);
        });

        // Sort by total calories then show first 10
        const sorted = filtered
            .sort(
                (a, b) =>
                    a.reduce((s, i) => s + i.calories, 0) -
                    b.reduce((s, i) => s + i.calories, 0)
            )
            .slice(0, 10);

        setMeals(sorted);
    };

    return (
        <>
            <NavBar />
            <div className="meal-container">
                <h1>Generate Meals</h1>

                <div className="filters">
                    <input
                        type="number"
                        placeholder="Enter max calories"
                        value={maxCalories}
                        onChange={(e) => setMaxCalories(e.target.value)}
                    />

                    <div className="checkboxes">
                        {Object.keys(categoriesData).length > 0 ? (
                            Object.keys(categoriesData).map((cat) => (
                                <label key={cat}>
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                    {cat}
                                </label>
                            ))
                        ) : (
                            <p className="loading-msg">جاري تحميل التصنيفات...</p>
                        )}
                    </div>

                    <button onClick={generateMeals}>Show Meals</button>
                </div>


                <div className="meal-results">
                    {meals.map((meal, idx) => (
                        <div className="meal-card" key={idx}>
                            <h3>Meal #{idx + 1}</h3>
                            <ul>
                                {meal.map((item, i) => (
                                    <li key={i}>{item.name} - {item.calories} cal</li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> {meal.reduce((sum, i) => sum + i.calories, 0)} cal</p>
                            <button
                                className="add-to-cart"
                                onClick={() =>
                                    dispatch(addToCart({
                                        id: Date.now(), // Unique ID
                                        title: meal.map(i => i.name).join(" + "),
                                        quantity: 1,
                                        price: meal.reduce((sum, i) => sum + i.calories, 0) / 10,
                                        image: "WhatsApp Image 2025-05-03 at 21.28.27_747e6c2a.jpg",
                                    }))
                                }
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MealSuggestion;
