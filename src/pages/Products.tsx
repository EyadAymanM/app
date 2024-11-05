import { useEffect, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface IProduct {
  sku: string;
  name: string;
  price: string;
  type: string;
  attribute_value: string;
}
export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<string[]>([]);
  const [data, setData] = useState<[]>([]);
  const getData = async () => {
    const res = await axios.get(
      "https://php-api-gilt.vercel.app",
      // "https://scandiweb-task-eyad.rf.gd/api/index.php",
      // "http://localhost/ecommerce-task/api/index.php",
    );
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async () => {
    if (products.length == 0) {
      toast("no products selected");
      return;
    }
    const res = await axios.delete(
      "https://php-api-gilt.vercel.app",
      // "https://scandiweb-task-eyad.rf.gd/api/index.php",
      // "http://localhost/ecommerce-task/api/index.php",
      {
        data: { skus: products }, 
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (res.data.status == 204) toast(res.data.message);
    setTimeout(() => navigate(0), 1800);
  };
  return (
    <>
      <Toaster />
      <div className="container mx-auto font-mono">
        <div className="flex flex-col min-h-screen mx-20">
          <div className="flex p-4 border-b-2 border-black gap-2 sticky top-0 right-0 left-0 bg-white">
            <h1 className="grow text-4xl">Product List</h1>
            <Button
              title="ADD"
              className="hover:bg-gray-300"
              onClick={() => navigate("/add")}
            />
            <Button
              title="MASS DELETE"
              id="delete-product-btn"
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            />
          </div>
          <div className="grow">
            <div className="h-fit px-4 py-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((product: IProduct) => (
                <ProductCard
                  key={product.sku}
                  sku={product.sku}
                  name={product.name}
                  price={product.price}
                  type={product.type}
                  attribute={product.attribute_value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.checked
                      ? setProducts([...products, e.target.name])
                      : setProducts(
                        products.filter((prd) => prd != e.target.name)
                      )
                  }
                />
              ))}
            </div>
          </div>

          <div className="text-center p-4 border-t-2 border-black gap-2 sticky bottom-0 right-0 left-0 bg-white">
            Scandiweb Test assignment
          </div>
        </div>
      </div>
    </>
  );
}
