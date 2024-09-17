import React from 'react';

function ShowCourseComponent({ courses, filterCourseFunction, addCourseToCartFunction }) {

    if (filterCourseFunction.length === 0) {
        return <p className="no-results">Sorry, no matching products found.</p>;
    }

    return (
        <div className="product-list">
            {filterCourseFunction.map((product) => (
                <div className="product-card" key={product.id}>
                    <div className="product-image-container">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            loading="lazy"
                            onError={(e) => e.target.src = 'default-image.jpg'} // Fallback image
                        />
                    </div>
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-price">Price: ₹{product.price}</p>
                    <button
                        className="add-to-cart-button"
                        onClick={() => addCourseToCartFunction(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ShowCourseComponent;
