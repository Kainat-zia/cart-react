import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
    const [courses] = useState([
        { id: 1, name: 'Bag', price: 699, image: 'https://th.bing.com/th/id/OIP.ERVQSMA7K7jLHFLzp2vn6gAAAA?rs=1&pid=ImgDetMain' },
        { id: 2, name: 'Hoodie', price: 799, image: 'https://th.bing.com/th/id/OIP.4-nl5nXRIqCOzjvBUUrMPAHaJQ?rs=1&pid=ImgDetMain' },
        { id: 3, name: 'Shoes', price: 999, image: 'https://th.bing.com/th/id/OIP.vUEtb_7EDqh_7ZyNKc7zFQAAAA?rs=1&pid=ImgDetMain' },
        { id: 4, name: 'Watch', price: 1499, image: 'https://th.bing.com/th/id/OIP.Ukpbo7nhSqiRN-ejZpyMXgHaHa?rs=1&pid=ImgDetMain' },
        { id: 5, name: 'Jacket', price: 1999, image: 'https://th.bing.com/th/id/OIP.np4d-xEZAhOA9XdJqHQsnAAAAA?rs=1&pid=ImgDetMain' },
        { id: 6, name: 'Wallet', price: 799, image: 'https://th.bing.com/th/id/OIP.9gYRIPfpjh-woA5jFW8QOwAAAA?rs=1&pid=ImgDetMain' },
    ]);

    const [cartCourses, setCartCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCartNotification, setShowCartNotification] = useState(false);

    const addToCart = (selectedProduct) => {
        setCartCourses((prevCartCourses) => {
            const existingItem = prevCartCourses.find(item => item.product.id === selectedProduct.id);
            if (existingItem) {
                return prevCartCourses.map(item =>
                    item.product.id === selectedProduct.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            setShowCartNotification(true); // Show notification when a new item is added
            return [...prevCartCourses, { product: selectedProduct, quantity: 1 }];
        });
    };

    const removeFromCart = (productToRemove) => {
        setCartCourses((prevCartCourses) => prevCartCourses.filter(item => item.product.id !== productToRemove.id));
    };

    const totalAmountCalculation = () => {
        return cartCourses.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourses = courses.filter((course) => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewCart = () => {
        setShowCartNotification(false);
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/cart">My Cart ({cartCourses.length})</Link>
                </nav>

                {showCartNotification && (
                    <div className="cart-notification">
                        <span>Item added to cart!</span>
                        <button onClick={handleViewCart}>
                            <Link to="/cart">View Cart</Link>
                        </button>
                    </div>
                )}

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <SearchComponent searchCourse={searchTerm} courseSearchUserFunction={handleSearchChange} />
                                <ShowCourseComponent courses={courses} filterCourseFunction={filteredCourses} addCourseToCartFunction={addToCart} />
                            </>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <UserCartComponent
                                cartCourses={cartCourses}
                                deleteCourseFromCartFunction={removeFromCart}
                                totalAmountCalculationFunction={totalAmountCalculation}
                                setCartCourses={setCartCourses}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
