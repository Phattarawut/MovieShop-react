import { useEffect, useState } from "react";

const PaymentPopup = ({ onClose, finalTotal }) => {
  const [countdown, setCountdown] = useState(60); // 60 วินาที

  useEffect(() => {
    if (countdown <= 0) {
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Transfer to this phone number</h2>
        <p className="phone">081-234-5678</p>
        <h3>Total payment: {finalTotal} ฿</h3>
        <p className="countdown">Remaining time: {countdown} </p>
      </div>
    </div>
  );
};

export default PaymentPopup;
