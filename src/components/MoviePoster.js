import { FaCartPlus, FaRegEdit } from "react-icons/fa";

const MoviePoster = ({ poster_path, title, addToCart, price, editPrice }) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="card">
            <div className="movie-card">
                <div className="header-price">
                    <p className="price">{price} ฿</p>
                    <span className="edit" onClick={editPrice}><FaRegEdit /></span>
                </div>
                <span className="add-cart" onClick={addToCart}><FaCartPlus /></span>
                <img 
                src={poster_path ? baseImageUrl + poster_path : "https://via.placeholder.com/150"}
                alt={title || "Movie Poster"}
                />
                <p className="title">{title}</p>
            </div>
        </div>
    );
}

export default MoviePoster