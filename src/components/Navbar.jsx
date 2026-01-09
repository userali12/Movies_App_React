import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { Film, Heart } from "lucide-react";
import { WishlistContext } from "../providers/WishlistProvider";

const Navbar = () => {
  const location = useLocation();
  const { wishlist } = useContext(WishlistContext);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-purple-400 transition hover:text-purple-300">
            <Film className="h-7 w-7" />
            <span className="hidden sm:inline">MovieApp</span>
          </Link>
          
          <ul className="flex items-center gap-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive('/') 
                    ? 'bg-purple-600 text-white' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Films populaires</span>
                <span className="sm:hidden">Films</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/wishlist" 
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive('/wishlist') 
                    ? 'bg-purple-600 text-white' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Ma Wishlist</span>
                <span className="sm:hidden">Wishlist</span>
                
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;