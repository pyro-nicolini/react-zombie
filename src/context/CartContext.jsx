import { createContext, useState, useEffect, useMemo } from "react";
import { pizzasJS } from "../data/pizzas";
import { createBrowserRouter } from "react-router-dom";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cuponMsg, setCuponMsg] = useState("");
  const [cartMsg, setCartMsg] = useState('')
  const [listaDeProductos, setListaDeProductos] = useState(pizzasJS);
  const [cupon, setCupon] = useState("");
  const [stock, setStock] = useState([]);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [totalisimo, setTotalisimo] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [promo, setPromo] = useState({
    aplicado: false,
    movistar: {
      clave: "movistar",
      minimo: 15000,
      porcentaje: 0.2,
      descuento: 12000,
      promocion:
        "20% OFF con MOVISTAR ❤️ Excluye promos, combos y Holy Cheese. Mínimo de compra $15.000, descuento máximo $12.000.*",
    },
  });
  useEffect(() => {
    if (carrito.length > 0) {
      carro();
    }
  }, [carrito]);

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
      setCartMsg('Producto agregado al carro')
      setTimeout(() => {
        setCartMsg('')
      }, 1000)
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    }
  }

  const cantidad = useMemo(
    () => carrito.reduce((acc, pizza) => acc + pizza.count, 0),
    [carrito]
  );

  const total = useMemo(
    () => carrito.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0),
    [carrito]
  );

  useEffect(() => {
    if (promo.aplicado && total < promo.movistar.minimo) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      setTotalConDescuento(0);
      setCuponMsg("❌ Cupón removido: Total menor al mínimo.");
    } else if (promo.aplicado) {
      setTotalConDescuento(calcularDescuento(total));
    }
  }, [carrito, total, promo.aplicado]);

  useEffect(() => {
    const nuevoTotal = total - totalConDescuento;
    setTotalisimo(nuevoTotal);
  }, [total, totalConDescuento]);

  useEffect(() => {
    const updatedStock = listaDeProductos.map((pizza) => {
      const pizzaEnCarrito = carrito.find((item) => item.id === pizza.id);
      const stockDisponible = pizzaEnCarrito
        ? pizza.stock - pizzaEnCarrito.count
        : pizza.stock;

      return { id: pizza.id, stock: stockDisponible };
    });

    setStock(updatedStock);
  }, [carrito, listaDeProductos]);

  function addPizza(id) {
    setCarrito((prevPizzas) => {
      const pizzaEncontrada = listaDeProductos.find(
        (pizza) => pizza.id.toLowerCase() === id.toLowerCase()
      );
      if (!pizzaEncontrada) return prevPizzas;

      const pizzaEnCarrito = prevPizzas.find(
        (pizza) => pizza.id.toLowerCase() === id.toLowerCase()
      );

      if (pizzaEnCarrito) {
        if (pizzaEnCarrito.count < pizzaEncontrada.stock) {
          return prevPizzas.map((pizza) =>
            pizza.id.toLowerCase() === id.toLowerCase()
              ? { ...pizza, count: pizza.count + 1 }
              : pizza
          );
        } else {
          return prevPizzas;
        }
      }

      return [...prevPizzas, { ...pizzaEncontrada, count: 1 }];
    });
  }

  function deletePizza(id) {
    setCarrito((prevPizzas) =>
      prevPizzas
        .map((pizza) =>
          pizza.id.toLowerCase() === id.toLowerCase()
            ? { ...pizza, count: pizza.count - 1 }
            : pizza
        )
        .filter((pizza) => pizza.count > 0)
    );
  }

  function calcularDescuento(total) {
    if (total < promo.movistar.minimo) return 0;
    return Math.floor(
      Math.min(total * promo.movistar.porcentaje, promo.movistar.descuento)
    );
  }

  const descuentoAplicado = promo.aplicado ? totalConDescuento : 0;

  function aplicarCupon() {
    if (
      cupon.toLowerCase() === promo.movistar.clave &&
      total >= promo.movistar.minimo
    ) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: true }));
      setCuponMsg(`✅ Descuento ${cupon} aplicado`);
      setTotalConDescuento(calcularDescuento(total));
    } else {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      setCuponMsg("❌ Cupón inválido o monto insuficiente.");
      setTotalConDescuento(0);
    }
  }

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
    <CartContext.Provider
      value={{
        carrito,
        totalisimo,
        cantidad,
        addPizza,
        totalConDescuento,
        descuentoAplicado,
        deletePizza,
        cupon,
        cuponMsg,
        promo,
        setCupon,
        neto,
        iva,
        setTotalisimo,
        stock,
        aplicarCupon,
        cartMsg,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
