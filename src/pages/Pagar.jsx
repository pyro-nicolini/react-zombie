import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { pricer } from "../utilities/helper";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Pagar() {
  const { carro, totalisimo, descuentoAplicado, neto, iva } = useContext(CartContext);

  return (
    <div className="form">
    <div className="pagar white">
      <h1>Confirmar Pedido</h1>
      <ul>
        {carro.map((pizza) => (
            pizza.count > 0 && (
                <li key={pizza.id}>
              {pizza.name} - {pizza.count} x {pricer(pizza.price)}
            </li>
          )
        ))}
      </ul>
      
      <div className="resumen">
        <p>Descuento aplicado: {pricer(descuentoAplicado)}</p>
        <p>Neto: {pricer(parseFloat(neto))}</p>
        <p>IVA (19%): {pricer(parseFloat(iva))}</p>
        <p>Total a pagar: {pricer(totalisimo)}</p>
      </div>
      
      <div className="column" style={{gap: '2rem'}}>
        <Link to="/checkout">
          <Button buttonText="Proceder al pago 💳" className="total" />
        </Link>
        <Link to="/cart">
          <Button buttonText="Volver al carrito 🔙" className="form" />
        </Link>
      </div>
    </div>
        </div>
  );
}

export default Pagar;
