const CartPopUp = ({ cart, setShowCart, clearCart, showClearBtn, setShowPaymentPopup, setFinalTotal}) => {

    const calculateTotalPrice = () => {
        const total = cart.reduce((sum, item) => sum + (item.price || 0), 0)
        let discount = 0;

        if (cart.length > 5) {
            discount = 0.2;
        } else if (cart.length > 3) {
            discount = 0.1;
        }

        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;

        return { discount, discountAmount, finalTotal }
    }

    const { discount, discountAmount, finalTotal } = calculateTotalPrice();

    return (
        <div className="cart-container">
            <div className="header-cart">
                <h3>Your Cart</h3>
                <button onClick={() => setShowCart(false)}>X</button>
            </div>
            {showClearBtn && (
                <button className="clear-btn" onClick={clearCart}>Clear all</button>
            )}
            <ul>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <li key={item.id}>
                            <div className="list-cart">
                                <p>{item.title}</p>
                                <p>{item.price} ฿</p>
                            </div>

                        </li>
                    ))
                ) : (
                    <li>No movie in cart</li>
                )}
            </ul>
            <div className="discount">
                <h4>Discount: ({discount * 100}%)</h4>
                <p>-{discountAmount} ฿</p>
            </div>
            <div className="summary">
                <h4>Total</h4>
                <p>{finalTotal} ฿</p>
            </div>
            {cart.length > 0 && (
                <button className="pay-btn"
                    onClick={() => {
                        setFinalTotal(finalTotal)
                        setShowCart(false);
                        setShowPaymentPopup(true)
                    }}
                >
                    Payment
                </button>
            )}
        </div>
    );
};

export default CartPopUp;