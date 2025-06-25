import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Menu.css"

const Menu = () => {
    return (
        <>
            <div className='menu'>
                <div>
                    <h2 className='head'>our menu</h2>
                    
                </div>
                <div>
                    <Link >
                        <button className='btns'>Customize Your Order</button>
                    </Link>
                </div>
                <div className='menu-type'>
                <div >
                    <div className="item">
                        <img src="WhatsApp Image 2025-05-03 at 21.41.14_780153c4.jpg"  className='image-menu' alt="" />
                        <Link to="/desert">Desert</Link>
                    </div>
                </div>
                <div>
                    <div className="item">
                        <img src="WhatsApp Image 2025-05-03 at 21.28.27_747e6c2a.jpg"  className='image-menu' alt="" />
                        <Link to='/drink'>drink</Link>
                    </div>
                </div>
                <div>
                    <div className="item">
                        <img src="WhatsApp Image 2025-05-03 at 21.41.31_f7487027.jpg"  className='image-menu' alt="" />
                        <Link to="/food">FOOD</Link>
                    </div>
                </div>

                </div>
                


            </div>

        </>
    )
}

export default Menu
