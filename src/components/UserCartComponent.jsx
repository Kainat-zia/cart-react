import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCartComponent({ cartCourses, deleteCourseFromCartFunction, totalAmountCalculationFunction, setCartCourses }) {
    const navigate = useNavigate();

    const handleIncrement = (product) => {
        setCartCourses((prevCartCourses) =>
            prevCartCourses.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (product) => {
        setCartCourses((prevCartCourses) => {
            const item = prevCartCourses.find(item => item.product.id === product.id);
            if (item.quantity === 1) {
                return prevCartCourses.filter(item => item.product.id !== product.id);
            }
            return prevCartCourses.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const handleRemove = (product) => {
        deleteCourseFromCartFunction(product);
    };

    const handleCheckout = () => {
        // Clear the cart and navigate to the Thank You page
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartCourses.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <ul>
                    {cartCourses.map(({ product, quantity }) => (
                        <li key={product.id} className="cart-item">
                            <div className="item-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="item-details">
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Quantity: {quantity}</p>
                                <div className="item-actions">
                                    <button onClick={() => handleIncrement(product)}>+</button>
                                    <button onClick={() => handleDecrement(product)}>-</button>
                                    <button onClick={() => handleRemove(product)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cartCourses.length > 0 && (
                <div className="cart-summary">
                    <div className="total">Total: ${totalAmountCalculationFunction()}</div>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default UserCartComponent;
