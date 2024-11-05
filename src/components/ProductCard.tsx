import React from "react";

interface ProductCardProps {
  sku: string;
  name: string;
  price: string;
  type: string;
  attribute: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
  id?: string;
}
function ProductCard({
  sku,
  name,
  price,
  type,
  attribute,
  onChange,
}: ProductCardProps) {
  return (
    <div className="relative flex flex-col gap-1 border-2 border-black m-2 w-60 px-4 py-9 mb-8 text-center h-fit mx-auto">
      <input
        type="checkbox"
        className="delete-checkbox absolute top-6 left-6"
        name={sku}
        onChange={onChange}
      />
      <span>{sku}</span>
      <span>{name}</span>
      <span>{price} $</span>
      {type == "DVD" ? (
        <span>Size: {attribute} MB</span>
      ) : type == "Book" ? (
        <span>Weight: {attribute} KG</span>
      ) : (
        <span>Dimensions: {attribute}</span>
      )}
    </div>
  );
}
export default ProductCard;
