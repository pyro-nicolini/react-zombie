import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { pricer } from "../utilities/helper";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";


function Pagar() {
  const { carrito, totalisimo, descuentoAplicado, neto, iva } =
    useContext(CartContext);


    
  return (
    <div className="form">
      <div className="pagar white">
        <img src={logo} alt="pizzaZombieLogo" className="navLogo2"/>
        <h1>Pedido confirmado</h1>
        <ul>
          {carrito.map(
            (pizza) =>
              pizza.count > 0 && (
                <li key={pizza.id}>
                  {pizza.name} - {pizza.count} x {pricer(pizza.price)}
                </li>
              )
          )}
        </ul>
        <div className="resumen">
          {descuentoAplicado == 0 ? null : (
            <>
              <s>Total: {pricer(totalisimo + descuentoAplicado)}</s>
              <p>Descuento aplicado: {pricer(descuentoAplicado)}</p>
            </>
          )}
          <p>Neto: {pricer(parseFloat(neto))}</p>
          <p>IVA (19%): {pricer(parseFloat(iva))}</p>
          <p>Total a pagar: {pricer(totalisimo)}</p>
        </div>
          <h2>Gracias por su compra!</h2>
      </div>
    </div>
  );
}

export default Pagar;
