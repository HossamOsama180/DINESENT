// import React, { useEffect, useState } from 'react';
// import '../Style/Addresses.css';
// import { style } from 'framer-motion/client';

// const Addresses = () => {
//     const [addresses, setAddresses] = useState([]);

//     useEffect(() => {
//         const stored = localStorage.getItem('userAddress');
//         if (stored) {
//             setAddresses([JSON.parse(stored)]); // لو فيه أكتر من عنوان هتعدلها لمصفوفة
//         }
//     }, []);

//     const handleDelete = (index) => {
//         const newList = addresses.filter((_, i) => i !== index);
//         setAddresses(newList);
//         localStorage.setItem('userAddress', JSON.stringify(newList[0] || {})); // مؤقتًا
//     };

//     return (
//         <div className="account-container">
//             <div className="sidebar">
//                 <ul>
//                     <li className="active">Saved Addresses</li>
//                     <li>Account Info</li>
//                     <li>My Orders</li>
//                     <li>Saved Cards</li>
//                     <li>talabat Pay</li>
//                 </ul>
//             </div>

//             <div className="content">
//                 <div className="header">
//                     <h2>My Account</h2>
//                     <button style={{color:"black"}}  className="add-btn">+ ADD ADDRESS</button>
//                 </div>

//                 {addresses.map((item, i) => (
//                     <div className="address-box" key={i}>
//                         <p><strong>Address Name:</strong> {item.fname} {item.lname}</p>
//                         <p><strong>Address:</strong> {item.address.city}, {item.address.district || ''}, {item.address.street_address}</p>
//                         <p><strong>Mobile Number:</strong> {item.phone_number}</p>
//                         <p><strong>Additional directions:</strong> {item.second_phone_number || 'None'}</p>

//                         <div className="action-btns">
//                             <button style={{color:"black"}} onClick={() => handleDelete(i)   }>Delete</button>
//                             <button style={{color:"black"}}  >Edit</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Addresses;


import React, { useEffect, useState } from 'react';
import '../Style/Addresses.css';
import AddressForm from './AddressForm'; // 👈 هننشئ الملف ده

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false); // 👈 تحكم في المودال

    useEffect(() => {
        const stored = localStorage.getItem('userAddress');
        if (stored) {
            const parsed = JSON.parse(stored);
            setAddresses(Array.isArray(parsed) ? parsed : [parsed]);
        }
    }, []);

    const handleDelete = (index) => {
        const newList = addresses.filter((_, i) => i !== index);
        setAddresses(newList);
        localStorage.setItem('userAddress', JSON.stringify(newList));
    };

    const handleAddAddress = (newAddress) => {
        const updated = [...addresses, newAddress];
        setAddresses(updated);
        localStorage.setItem('userAddress', JSON.stringify(updated));
        setShowForm(false);
    };

    return (
        <div className="account-container">
            <div className="sidebar">
                <ul>
                    <li className="active">Saved Addresses</li>
                    <li>Account Info</li>
                    <li>My Orders</li>
                    <li>Saved Cards</li>
                    <li>talabat Pay</li>
                </ul>
            </div>

            <div className="content">
                <div className="header">
                    <h2>My Account</h2>
                    <button style={{color:"black"}}  className="add-btn" onClick={() => setShowForm(true)}>+ ADD ADDRESS</button>
                </div>

                {addresses.map((item, i) => (
                    <div className="address-box" key={i}>
                        {/* <p><strong>Address Name:</strong> {item.fname} {item.lname}</p> */}
                        <p><strong>Address:</strong> {item.address.city}, {item.address.district}, {item.address.street_address}</p>
                        <p><strong>Mobile Number:</strong> {item.phone_number}</p>
                        <p><strong>Additional directions:</strong> {item.second_phone_number || 'None'}</p>

                        <div className="action-btns">
                            <button  style={{color:"black"}} onClick={() => handleDelete(i)}>Delete</button>
                            <button style={{color:"black"}} >Edit</button>
                        </div>
                    </div>
                ))}

                {/* مودال الفورم */}
                {showForm && (
                    <AddressForm
                        onClose={() => setShowForm(false)}
                        onSave={handleAddAddress}
                    />
                )}
            </div>
        </div>
    );
};

export default Addresses;

