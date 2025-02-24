import Button from "./Button";

function CardPizza({ name, price, ingredients, img }) {
  return (
    <>
      <div
        className="card shadow btn btn-outline-danger border-black text-white"
        style={{ maxWidth: "18rem" }}
      >
        <img
          className="card-img-top rounded"
          src={img}
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <h4 className="card-subtitle mb-2 text-warning">
            ${price.toLocaleString().replace(",", ".")}
          </h4>
          <p className="card-text">{ingredients.join(", ")}</p>
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <Button
            buttonText={`ver más...`}
            className={"btn-outline-warning px-4"}
          />
          <Button
            buttonText={`Añadir 🛒`}
            className={"bg-success2 text-white px-4"}
          />
        </div>
      </div>
    </>
  );
}

export default CardPizza;
