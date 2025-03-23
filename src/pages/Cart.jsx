import Button from "../components/Button";
import { useContext } from "react";
import { pricer, capitalizer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";

export default function Cart({ cuponPromo }) {
  const {
    carro,
    promo,
    addPizza,
    totalisimo,
    deletePizza,
    cantidad,
    cupon,
    stock,
    aplicarCupon,
    setCupon,
  } = useContext(CartContext);

  // reemplazando la clave de la promocion de movistar (posible mejora para agregar cupones)
  promo.movistar.clave = cuponPromo;

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
          <>
            <p>Neto: ${pricer(totalisimo / 1.19)}</p>
            <p>Iva: ${pricer(totalisimo * 0.19)}</p>
            <p>Total: ${pricer(totalisimo)}</p>
          </>
        </div>
      </div>

      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}
