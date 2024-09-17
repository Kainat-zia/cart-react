import React, { useState, useEffect } from 'react';

function SearchComponent({ searchCourse, courseSearchUserFunction }) {
    const [searchTerm, setSearchTerm] = useState(searchCourse);

    // Debouncing function to avoid excessive function calls on every keystroke
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log("Debounced Search Term:", searchTerm); // Debugging line
            courseSearchUserFunction(searchTerm);
        }, 300); // 300ms delay before calling the function

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout
    }, [searchTerm, courseSearchUserFunction]);

    return (
        <header className="App-header">
            <h1>Shopping Cart</h1>
            <div className="search-bar">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search for Products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search for products"
                />
            </div>
        </header>
    );
}

export default SearchComponent;
