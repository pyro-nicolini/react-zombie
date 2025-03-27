import { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import { pricer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";

export default function Cart({ cuponPromo }) {
  const {
    carro,
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
  } = useContext(CartContext);

  const [neto, setNeto] = useState(0);
  const [iva, setIva] = useState(0);

  useEffect(() => {
    const total = parseFloat(totalisimo); 

    if (!isNaN(total)) {
      const netoCalculado = total / 1.19; 
            const ivaCalculado = netoCalculado * 0.19;

      setNeto(netoCalculado.toFixed(2));
      setIva(ivaCalculado.toFixed(2)); 
    }
  }, [totalisimo]);

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
                <p>{pricer(pizza.price)}</p>
              </div>
              <div className="botones">
                <Button
                  buttonText="➕"
                  className="addPizza"
                  onClick={() => addPizza(pizza.id)}  // la función agregar pizza ahora es condicional con el stock
                />
                <p>{pizza.count}</p>
                <Button
                  buttonText="➖"
                  className="deletePizza"
                  onClick={() => deletePizza(pizza.id)}
                />
                {stock
                  .filter((item) => item.id === pizza.id)
                  .map((item) => (
                    <div key={item.id}>
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

      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}
