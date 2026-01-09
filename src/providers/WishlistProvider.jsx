import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext(undefined);

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    const already = wishlist.find((m) => m.id === movie.id);
    if (!already) {
      setWishlist([...wishlist, movie]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((m) => m.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((m) => m.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
