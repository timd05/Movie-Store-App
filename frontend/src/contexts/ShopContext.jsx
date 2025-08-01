import {createContext, useState, useContext, useEffect} from "react";

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopProvider = ({children}) => {
    const [shopItems, setShopItems] = useState(() => JSON.parse(localStorage.getItem('shopItems') ?? '[]'));
    
    useEffect(() => {
        const storedShopItems = localStorage.getItem("shopItems");
        if (storedShopItems) setShopItems(JSON.parse(storedShopItems));
    }, []);

    useEffect(() => {
        localStorage.setItem("shopItems", JSON.stringify(shopItems))
    }, [shopItems]);

    const addToShop = (movie) => {
        setShopItems((prev) => [...prev, movie]);
    }
    const removeFromShop = (movieId) => {
        setShopItems((prev) => prev.filter(movie => movie.id !== movieId));
    }
    const isInShop = (movieId) => {
        return shopItems.some(movie => movie.id === movieId);
    }

    const value = {
        shopItems,
        addToShop,
        removeFromShop,
        isInShop
    };

    return <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
}