import { useContext, useState, useEffect } from "react";
import Button from "../components/Button";
import { pricer } from "../utilities/helper";
import { CartContext } from "../context/CartContext";
import { userContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import walkin from "../images/walkin.webp";
import giganton from "../images/giganton.gif";




export default function Cart({ cuponPromo }) {
  const [imgPagando, setImgPagando] = useState('')
  const [pagado, setPagado] = useState('')

const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (carrito.length > 0 && token) {
        carro();
    }
}, [carrito]);

let msg2;

  async function carro() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Debe estar Logueado para terminar tú pedido.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: carrito,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json();
      data.cart = carrito;

      msg2 = data.message;
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    } 
  }

  let timeout1, timeout2, timeout3, timeout4;

  function pagando() {
      setPagado('Los Zombies se están preparando');
      setImgPagando(walkin);
  
      timeout1 = setTimeout(() => setPagado('Van marchando a tu casa'), 2500);
      timeout2 = setTimeout(() => {
          setPagado(msg2);
          setImgPagando(giganton);
      }, 5000);
      timeout3 = setTimeout(() => {
        navigate("/pagar", { replace: true });
      }, 7500);
      timeout4 = setTimeout(() => {
        setPagado('');
      }, 8000);
  }
  
  useEffect(() => {
      return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearTimeout(timeout3);
          clearTimeout(timeout4);
      };
  }, []);
  

  return (
    <div className="cart">
      {pagado ?(
        <div className="white">
          <img src={imgPagando} alt="Caminando" />
          <h2>{pagado}</h2>
        </div>
      ): (
        <div>
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
              <Button buttonText="PAGAR 🍕" className="form" disabled={true} onClick={pagando} />
          </>
        ) : (
          <>
            {!auth.autorizado && (
              <p className="white">Debes iniciar sesión para comprar</p>
            )}
              <Button
                buttonText="PAGAR 🍕"
                className="form"
                disabled={!auth.autorizado}
                onClick={pagando}
              />
            {!auth.autorizado && (
              <Link to="/login">
                <Button buttonText="Inicia Sesión 🔒" className="alert" />
              </Link>
            )}
          </>
        )}
      </div>
        </div>
      )}
  
  
    </div>
  );
}
