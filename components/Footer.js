import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
export default function Footer() {
  const {
    location,
    runningTotal,
    setRunningTotal,
    cart,
    setCartModule,
    payment,
  } = useContext(Context);

  useEffect(() => {
    if (cart.length === 0) return setRunningTotal(0);

    const deliveryFee =
      payment.method === "Delivery" ? (deliveryFee = 6) : (deliveryFee = 0);
    setRunningTotal(
      Intl.NumberFormat().format(
        cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0) *
          1.06 +
          deliveryFee
      )
    );
  }, [cart, setRunningTotal, payment]);
  return (
    <Container className="text-center sticky bottom-0 bg-white">
      <p> Gwinnett Dinner {location?`@ ${location}`:''}</p>
    </Container>
  );
}
