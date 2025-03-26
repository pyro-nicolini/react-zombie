import { createContext, useState, useEffect, useMemo } from "react";
import { pizzasJS } from "../data/pizzas";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cuponMsg, setCuponMsg] = useState('');
  const [listaDeProductos, setListaDeProductos] = useState(pizzasJS);
  const [cupon, setCupon] = useState("");
  const [stock, setStock] = useState([]);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [totalisimo, setTotalisimo] = useState(0);
  const [carro, setCarro] = useState([]);
  const [promo, setPromo] = useState({
    aplicado: false,
    movistar: {
      clave: "movistar",
      minimo: 15000,
      porcentaje: 0.20,
      descuento: 12000,
      promocion: "20% OFF con MOVISTAR ❤️ Excluye promos, combos y Holy Cheese. Mínimo de compra $15.000, descuento máximo $12.000.*",
    },
  });

  const cantidad = useMemo(
    () => carro.reduce((acc, pizza) => acc + pizza.count, 0),
    [carro]
  );

  const total = useMemo(
    () => carro.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0),
    [carro]
  );

  useEffect(() => {
    if (promo.aplicado && total < promo.movistar.minimo) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      setTotalConDescuento(0);
      setCuponMsg("❌ Cupón removido: Total menor al mínimo.");
    } else if (promo.aplicado) {
      setTotalConDescuento(calcularDescuento(total));
    }
  }, [carro, total, promo.aplicado]);

  useEffect(() => {
    const nuevoTotal = total - totalConDescuento;
    setTotalisimo(nuevoTotal);
  }, [total, totalConDescuento]);

  function addPizza(id) {
    setCarro((prevPizzas) => {
      const pizzaEncontrada = listaDeProductos.find(
        (pizza) => pizza.id.toLowerCase() === id.toLowerCase()
      );
      if (!pizzaEncontrada) return prevPizzas;

      return prevPizzas.some((pizza) => pizza.id.toLowerCase() === id.toLowerCase())
        ? prevPizzas.map((pizza) =>
            pizza.id.toLowerCase() === id.toLowerCase()
              ? { ...pizza, count: pizza.count + 1 }
              : pizza
          )
        : [...prevPizzas, { ...pizzaEncontrada, count: 1 }];
    });
  }

  function deletePizza(id) {
    setCarro((prevPizzas) =>
      prevPizzas
        .map((pizza) =>
          pizza.id.toLowerCase() === id.toLowerCase() ? { ...pizza, count: pizza.count - 1 } : pizza
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
    if (cupon.toLowerCase() === promo.movistar.clave && total >= promo.movistar.minimo) {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: true }));
      setCuponMsg(`✅ Descuento ${cupon} aplicado`);
      setTotalConDescuento(calcularDescuento(total));
    } else {
      setPromo((prevPromo) => ({ ...prevPromo, aplicado: false }));
      setCuponMsg("❌ Cupón inválido o monto insuficiente.");
      setTotalConDescuento(0);
    }
  }

  return (
    <CartContext.Provider
      value={{
        carro,
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
        setTotalisimo,
        stock,
        aplicarCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;