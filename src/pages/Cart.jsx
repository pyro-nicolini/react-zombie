import Button from "../components/Button";
import { useState, useEffect, useContext } from "react";
import { pricer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";

export default function Cart({ cuponPromo }) {
  const {
    setTotalisimo,
    pizzaCart,
    addPizza,
    deletePizza,
    descuentoAplicado,
    setDescuentoAplicado,
    cupon,
    setCupon,
    newTotal,
    setNewTotal,
  } = useContext(CartContext);

  const total = pizzaCart.reduce(
    (acc, pizza) => acc + pizza.price * pizza.count,
    0
  );
  const cantidad = pizzaCart.reduce((acc, pizza) => acc + pizza.count, 0);

  function calcularDescuento(total) {
    if (total < 15000) return 0;
    return Math.floor(Math.min(total * 0.35, 12000));
  }

  useEffect(() => {
    if (cupon.toLowerCase() === cuponPromo) {
      const descuento = calcularDescuento(total);
      setDescuentoAplicado(descuento);
    } else {
      setDescuentoAplicado(0);
    }
  }, [total, cupon, cuponPromo, setDescuentoAplicado]);

  useEffect(() => {
    const newTotalCalc = total - descuentoAplicado;
    setNewTotal(newTotalCalc);
    setTotalisimo(pricer(newTotalCalc));
  }, [total, descuentoAplicado, setNewTotal, setTotalisimo]);

  function aplicarCupon() {
    if (cupon.toLowerCase() === cuponPromo) {
      const descuento = calcularDescuento(total);
      setDescuentoAplicado(descuento);
    } else {
      setDescuentoAplicado(0);
      alert("Cupón inválido ❌");
    }
  }

  return (
    <div className="cart">
      <h3>Detalle del pedido</h3>
      {pizzaCart.map(
        (pizza) =>
          pizza.count > 0 && (
            <div key={pizza.id} className="cart-item">
              <img src={pizza.img} alt={pizza.name} />
              <div className="column">
                <p>{pizza.name}</p>
                <p>${pricer(pizza.price)}</p>
              </div>
              <div className="botones">
                <Button
                  buttonText="+"
                  className="addPizza"
                  onClick={() => addPizza(pizza.id)}
                />
                <p>{pizza.count}</p>
                <Button
                  buttonText="-"
                  className="deletePizza"
                  onClick={() => deletePizza(pizza.id)}
                />
              </div>
            </div>
          )
      )}
      <div className="column" style={{ width: "90%" }}>
        <label htmlFor="Cupon">Cupón:</label>
        <input
          type="text"
          id="Cupon"
          placeholder="Ingrese el código del cupón. Ejemplo: 'movistar'"
          value={cupon}
          onChange={(e) => setCupon(e.target.value)}
        />
        <Button
          type="submit"
          className="total"
          buttonText="Aplicar"
          onClick={aplicarCupon}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        <p>Total: ${pricer(total)}</p>
        {descuentoAplicado > 0 && cantidad > 0 && (
          <p>Descuento aplicado: -${pricer(descuentoAplicado)}</p>
        )}
        {descuentoAplicado > 0 && cantidad > 0 && (
          <p>Total a pagar: ${pricer(newTotal)}</p>
        )}
        <p>Cantidad: {cantidad}</p>
      </div>
      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}