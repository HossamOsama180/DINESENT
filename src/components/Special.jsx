import React from 'react'
import "../Style/Special.css"
import {  useDispatch } from 'react-redux';
const Special = () => {
        const dispatch = useDispatch();
    
    return (
        <>
            <div>
                <h2 className='title-special'>Special Food</h2>
            </div>
            <div className='product-grid'>
                
                <div className='product-cardd '>
                    <div className='image-container' >
                        <img src="WhatsApp Image 2025-05-03 at 20.25.19_1cd594fc.jpg" class="product-image" alt="Product" />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title"> Grilled Chicken</h3>
                        <p className="card-description">
                            (Lorem ipsum dolor sit amet, consectetur adipiscing elit).
                        </p>
                        <div className="card-rate">⭐⭐⭐⭐⭐</div>
                        <button className="btns"  > Add To cart  </button>
                    </div>
                </div>

                <div className='product-cardd '>
                    <div className='image-container' >
                        <img src="WhatsApp Image 2025-05-03 at 20.25.19_1cd594fc.jpg" class="product-image" alt="Product" />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title"> Grilled Chicken</h3>
                        <p className="card-description">
                            (Lorem ipsum dolor sit amet, consectetur adipiscing elit).
                        </p>
                        <div className="card-rate">⭐⭐⭐⭐⭐</div>
                        <button className="btns"> Add To cart </button>
                    </div>

                </div>
                <div className='product-cardd '>
                    <div className='image-container' >
                        <img src="WhatsApp Image 2025-05-03 at 20.25.19_1cd594fc.jpg" class="product-image" alt="Product" />

                    </div>
                    <div className="card-body">
                        <h3 className="card-title"> Grilled Chicken</h3>
                        <p className="card-description">
                            (Lorem ipsum dolor sit amet, consectetur adipiscing elit).
                        </p>
                        <div className="card-rate">⭐⭐⭐⭐⭐</div>
                        <button className="btns"> Add To cart </button>
                    </div>

                </div>
                <div className='product-cardd '>
                    <div className='image-container' >
                        <img src="WhatsApp Image 2025-05-03 at 20.25.19_1cd594fc.jpg" class="product-image" alt="Product" />

                    </div>
                    <div className="card-body">
                        <h3 className="card-title"> Grilled Chicken</h3>
                        <p className="card-description">
                            (Lorem ipsum dolor sit amet, consectetur adipiscing elit).
                        </p>
                        <div className="card-rate">⭐⭐⭐⭐⭐</div>
                        <button className="btns"> Add To cart </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Special
