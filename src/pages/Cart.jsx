import Button from "../components/Button";
import { useState, useEffect, useContext } from "react";
import { pricer, capitalizer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";

export default function Cart({ cuponPromo }) {
  const {
    setTotalisimo,
    carro,
    totalisimo,
    addPizza,
    deletePizza,
    descuentoAplicado,
    setDescuentoAplicado,
    cupon,
    stock,
    setCupon,
    newTotal,
    setNewTotal,
  } = useContext(CartContext);

  const total = carro.reduce(
    (acc, pizza) => acc + pizza.price * pizza.count,
    0
  );
  const cantidad = carro.reduce((acc, pizza) => acc + pizza.count, 0);

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
      {carro.map(
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
                {stock
                  .filter((item) => item.id === pizza.id)
                  .map((item, index) => (
                    <div key={index}>
                      <p>
                        {item.stock > 0 ? `Quedan: ${item.stock}` : "Sin Stock"}
                      </p>
                    </div>
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
  <p>Cantidad: {cantidad}</p>
  <div>
    {/* Si hay descuento, mostramos los precios ajustados */}
    {descuentoAplicado > 0 && cantidad > 0 ? (
      <>
        <p>Neto: ${pricer(((total - descuentoAplicado) / 1.19))}</p>
        <p>Iva: ${pricer(((total - descuentoAplicado) - (total - descuentoAplicado) / 1.19))}</p>
        {descuentoAplicado > 0 && cantidad > 0 && (
          <p>
            Descuento {capitalizer(cupon)} aplicado: -$
            {pricer(descuentoAplicado)}
          </p>
        )}
        <p>Total con descuento: ${pricer((total - descuentoAplicado))}</p>
      </>
    ) : (
      // Si no hay descuento, mostramos los precios originales
      <>
        <p>Neto: ${pricer((total / 1.19))}</p>
        <p>Iva: ${pricer((total - total / 1.19))}</p>
        <p>Total: ${pricer(total)}</p>
      </>
    )}

    {/* Si hay descuento, mostramos el detalle del descuento */}
  </div>
</div>



      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}
