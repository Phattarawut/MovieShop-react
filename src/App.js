import { useEffect, useState, useCallback } from 'react';
import './App.css';
import MoviePoster from './components/MoviePoster';
import CartPopUp from './components/CartPopUp';
import PaymentPopup from "./components/PaymentPopup";
import { FaShoppingCart } from "react-icons/fa";

function App() {

  const getLocalCart = () => {
    let itemCart = localStorage.getItem("movie-shop")
    if (itemCart) {
      return JSON.parse(itemCart);
    } else {
      return [];
    }
  }

  const keyApi = '633a491dc168935e817590a2edd64f8d'
  const [word, setword] = useState("")
  const [movies, setMovies] = useState([])
  const [cart, setCart] = useState(getLocalCart)
  const [amountCart, setAmountCart] = useState("0")
  const [showCart, setShowCart] = useState(false)
  const [showClearBtn, setShowClearBtn] = useState(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [finalTotal, setFinalTotal] = useState(0)

  const handleClosePayment = useCallback(() => {
    setShowPaymentPopup(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("movie-shop", JSON.stringify(cart))
  })

  useEffect(() => {
    const fetchMovies = async () => {
      const urlApi = `https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&query=${word || 'a'}`;
      const res = await fetch(urlApi);
      const data = await res.json();

      const moviesSetPrice = (data.results || []).map(movie => ({
        ...movie,
        price: 250
      }))

      setMovies(moviesSetPrice);
    };

    fetchMovies();
  }, [word]);

  useEffect(() => {
    if (cart.length > 0) {
      setShowClearBtn(true)
    } else if (cart.length === 0) {
      setShowClearBtn(false)
    }
    setAmountCart(cart.length.toString());
  }, [cart]);

  const addToCart = (movie) => {
    if (!cart.find(item => item.id === movie.id)) {
      setCart([...cart, { id: movie.id, title: movie.title, price: movie.price }]);
    }
  };

  const clearCart = () => {
    setCart([])
  }

  const editPrice = (movie) => {
    const newPrice = prompt(`Enter new price for "${movie.title}" (current: ${movie.price} ฿):`, movie.price);

    if (newPrice && !isNaN(newPrice)) {
      const parsedPrice = parseFloat(newPrice);

      setMovies(prevMovies =>
        prevMovies.map(m =>
          m.id === movie.id ? { ...m, price: parsedPrice } : m
        )
      );

      setCart(prevCart =>
        prevCart.map(item =>
          item.id === movie.id
            ? { ...item, price: parseFloat(newPrice) }
            : item
        )
      );
    }
  };

  return (
    <div className="container">
      <div className='nav'>
        <h2>Movie Shop</h2>
        <div className='search-cart'>
          <div className='cart-icon'>
            <p className='amount-cart'>{amountCart}</p>
            <span className='icon' onClick={() => setShowCart(!showCart)}>
              <FaShoppingCart />
            </span>
          </div>
          <label className='search-box'>
            <input
              className='search-input'
              type='text'
              value={word}
              placeholder='search a movie'
              onChange={(e) => setword(e.target.value)}
            />
          </label>

          {showCart &&
            <CartPopUp
              cart={cart}
              setShowCart={setShowCart}
              clearCart={clearCart}
              showClearBtn={showClearBtn}
              setShowPaymentPopup={setShowPaymentPopup}
              setFinalTotal={setFinalTotal}
            />}

        </div>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <MoviePoster
            key={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            id={movie.id}
            price={movie.price}
            addToCart={() => addToCart(movie)}
            editPrice={() => editPrice(movie)}
          />
        ))}
      </div>

      {showPaymentPopup &&
        <PaymentPopup
          onClose={handleClosePayment}
          finalTotal={finalTotal}
        />
      }

    </div>
  );
}

export default App;