import { pizzaCart } from "../data/pizzas";
import Button from "./Button";
import { useState } from "react";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [pizzaCount, setPizzaCount] = useState(0);


return (
    <div className="cart">
      <h2>Detalle del pedido</h2>
      {pizzaCart.map((pizza, index) => (
          <div key={index} className="cart-item">
          <img src={pizza.img} alt={pizza.name} />
          <h3>{pizza.name}</h3>
          <p>${pizza.price}</p>
          <div>
            <Button buttonText="+" className="sumar" onClick={''} />
            {pizza.count}
            <Button buttonText="-" className="restar" onClick={''}/>
          </div>
        </div>
      ))
}
      <p>Total: {total}</p>
      <p>Cantidad: {pizzaCount}</p>
      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}
