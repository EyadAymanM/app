import React, { useState } from "react";
import Button from "../components/Button";
// import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface IProduct {
  sku: string;
  name: string;
  price: number;
  type: string;
  attribute_value: string;
  size?: string;
  height?: string;
  width?: string;
  length?: string;
  weight?: string;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [typeForm, setTypeForm] = useState<string>("");
  const [product, setProduct] = useState<IProduct>({
    sku: "",
    name: "",
    price: 0,
    type: "",
    attribute_value: "",
  });

  const addProduct = async () => {
    if (product.sku.length == 0) {
      toast(`please provide SKU`);
      return;
    }
    if (product.name.length == 0) {
      toast(`please provide name`);
      return;
    }
    if (!(product.price > 0)) {
      toast("Please provide a price");
      return;
    }
    if (product.type.length == 0) {
      toast(`please pick a type`);
      return;
    }
    switch (product.type) {
      case "DVD":
        product.attribute_value = product.size || "";
        break;
      case "Furniture":
        product.attribute_value = [
          product.height,
          product.width,
          product.length,
        ].join("x");
        break;
      case "Book":
        product.attribute_value = product.weight || "";
        break;
    }
    if (
      product.attribute_value.length == 0 ||
      product.attribute_value.includes("xx")
    ) {
      toast(`something wrong with product attribute`);
      return;
    }
    const res = await axios.post(
      "https://php-api-gilt.vercel.app",
      // "https://scandiweb-task-eyad.rf.gd/api/index.php",
      // "http://localhost/ecommerce-task/api/index.php",
      product,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (res.data.id) {
      toast(`product added redirecting to products page`);
      setTimeout(() => navigate("/"), 1800);
    }else{
      toast(`can't have two products with the same sku`);
    }
  };
  return (
    <>
      <Toaster />
      <div className="container mx-auto font-mono">
        <div className="flex flex-col min-h-screen mx-20">
          <div className="flex p-4 border-b-2 border-black gap-2 sticky top-0 right-0 left-0 bg-white">
            <h1 className="grow text-4xl">Product Add</h1>
            <Button
              title="Save"
              className="hover:bg-green-500"
              onClick={addProduct}
            />
            <Button
              title="Cancel"
              id="delete-product-btn"
              className="hover:bg-gray-500"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="grow ">
            <form id="product_form">
              <div className="flex flex-col gap-10 mt-10">
                {/* SKU */}
                <div className="flex gap-8 w-[450px] items-center">
                  <label htmlFor="sku" className="w-[100px]">
                    SKU
                  </label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProduct({ ...product, sku: e.target.value })
                    }
                    type="text"
                    name="sku"
                    id="sku"
                    className="px-2 border border-black rounded-sm w-[300px] h-8"
                  />
                </div>
                {/* Name */}
                <div className="flex gap-8 w-[450px] items-center">
                  <label htmlFor="name" className="w-[100px]">
                    Name
                  </label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    type="text"
                    name="name"
                    id="name"
                    className="px-2 border border-black rounded-sm w-[300px] h-8"
                  />
                </div>
                {/* Price */}
                <div className="flex gap-8 w-[450px] items-center">
                  <label htmlFor="price" className="w-[100px]">
                    Price ($)
                  </label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProduct({ ...product, price: +e.target.value })
                    }
                    type="number"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key == "-" || e.key == "+" ? e.preventDefault() : null
                    }
                    name="price"
                    id="price"
                    className="px-2 border border-black rounded-sm w-[300px] h-8"
                  />
                </div>
                {/* Type Switcher */}
                <div className="flex gap-8 w-[400px] items-center">
                  <label htmlFor="productType" className="w-fit">
                    Type Switcher
                  </label>
                  <select
                    onChangeCapture={(
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => setProduct({ ...product, type: e.target.value })}
                    name="type"
                    id="productType"
                    defaultValue=""
                    className="border border-black rounded-sm h-8"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setTypeForm(e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Type Switcher
                    </option>
                    <option value="DVD" id="DVD">
                      DVD
                    </option>
                    <option value="Furniture" id="Furniture">
                      Furniture
                    </option>
                    <option value="Book" id="Book">
                      Book
                    </option>
                  </select>
                </div>
                {typeForm == "DVD" ? (
                  // DVD
                  <>
                    <div className="flex gap-8 w-[450px] items-center">
                      <label htmlFor="size" className="w-[100px]">
                        Size (MB)
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({ ...product, size: e.target.value })
                        }
                        type="number"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          e.key == "-" || e.key == "+"
                            ? e.preventDefault()
                            : null
                        }
                        name="size"
                        id="size"
                        className="px-2 border border-black rounded-sm w-[300px] h-8"
                      />
                    </div>
                    <p className="font-bold">Plpease, provide DVD size in MB</p>
                  </>
                ) : typeForm == "Furniture" ? (
                  // Furniture
                  <>
                    <div className="flex gap-8 w-[450px] items-center">
                      <label htmlFor="height" className="w-[100px]">
                        Height (CM)
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({ ...product, height: e.target.value })
                        }
                        type="number"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          e.key == "-" || e.key == "+"
                            ? e.preventDefault()
                            : null
                        }
                        name="height"
                        id="height"
                        className="px-2 border border-black rounded-sm w-[300px] h-8"
                      />
                    </div>
                    <div className="flex gap-8 w-[450px] items-center">
                      <label htmlFor="width" className="w-[100px]">
                        Width (CM)
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({ ...product, width: e.target.value })
                        }
                        type="number"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          e.key == "-" || e.key == "+"
                            ? e.preventDefault()
                            : null
                        }
                        name="width"
                        id="width"
                        className="px-2 border border-black rounded-sm w-[300px] h-8"
                      />
                    </div>
                    <>
                      <div className="flex gap-8 w-[450px] items-center">
                        <label htmlFor="length" className="w-[100px]">
                          Length (CM)
                        </label>
                        <input
                          onChange={(e) =>
                            setProduct({ ...product, length: e.target.value })
                          }
                          type="number"
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) =>
                            e.key == "-" || e.key == "+"
                              ? e.preventDefault()
                              : null
                          }
                          name="length"
                          id="length"
                          className="px-2 border border-black rounded-sm w-[300px] h-8"
                        />
                      </div>
                      <p className="font-bold">
                        Please, provide Furniture Dimensions in CM
                      </p>
                    </>
                  </>
                ) : typeForm == "Book" ? (
                  // Book
                  <>
                    <div className="flex gap-8 w-[450px] items-center">
                      <label htmlFor="weight" className="w-[100px]">
                        weight (KG)
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({ ...product, weight: e.target.value })
                        }
                        type="number"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          e.key == "-" || e.key == "+"
                            ? e.preventDefault()
                            : null
                        }
                        name="weight"
                        id="weight"
                        className="px-2 border border-black rounded-sm w-[300px] h-8"
                      />
                    </div>
                    <p className="font-bold">
                      Please, provide book weight in KG
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>

          <div className="text-center p-4 border-t-2 border-black gap-2 sticky bottom-0 right-0 left-0 bg-white">
            Scandiweb Test assignment
          </div>
        </div>
      </div>
    </>
  );
}
