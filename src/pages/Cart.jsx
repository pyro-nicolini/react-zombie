import { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import { pricer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";
import { userContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Cart({ cuponPromo }) {
  const {
    carrito,
    addPizza,
    totalisimo,
    deletePizza,
    cantidad,
    descuentoAplicado,
    cupon,
    stock,
    cuponMsg,
    aplicarCupon,
    setCupon,
    neto,
    iva,
  } = useContext(CartContext);

  const { auth } = useContext(userContext);

  return (
    <div className="cart">
      <h3>Detalle del pedido</h3>
      {carrito.map(
        (pizza) =>
          pizza.count > 0 && (
            <div key={pizza.id} className="cart-item">
              <img src={pizza.img} alt={pizza.name} />
              <div className="column">
                <p>{pizza.name}</p>
                <p>{pricer(pizza.price)}</p>
              </div>
              <div className="botones">
                <Button
                  buttonText="➕"
                  className="addPizza"
                  onClick={() => addPizza(pizza.id)}
                />
                <p>{pizza.count}</p>
                <Button
                  buttonText="➖"
                  className="deletePizza"
                  onClick={() => deletePizza(pizza.id)}
                />
              </div>
              <div>
                {stock
                  .filter((item) => item.id === pizza.id)
                  .map((item) => (
                    <p key={item.id}>
                      {item.stock > 0 ? `Quedan: ${item.stock}` : "Sin Stock"}
                    </p>
                  ))}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          lineHeight: "0",
        }}
      >
        <div>
          <p>Cantidad: {cantidad}</p>
          <p>Cupon: {cuponMsg}</p>
          <p>Dscto: {pricer(parseFloat(descuentoAplicado))}</p>
        </div>
        <div>
          <div>
            <p>Neto: {pricer(parseFloat(neto))}</p>
            <p>Iva: {pricer(parseFloat(iva))}</p>
          </div>
          <p>Total: {pricer(totalisimo)}</p>
        </div>
      </div>
      <div className="column" style={{ gap: "1rem" }}>
        {cantidad === 0 ? (
          <>
            <p className="white">Debes agregar productos</p>
            <Link to="/pagar">
              <Button buttonText="PAGAR 🍕" className="form" disabled={true} />
            </Link>
          </>
        ) : (
          <>
            {!auth.autorizado && (
              <p className="white">Debes iniciar sesión para comprar</p>
            )}
            <Link to="/pagar">
              <Button
                buttonText="PAGAR 🍕"
                className="form"
                disabled={!auth.autorizado}
              />
            </Link>
            {!auth.autorizado && (
              <Link to="/login">
                <Button buttonText="Inicia Sesión 🔒" className="alert" />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
