import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";

const router = createBrowserRouter([
  { path: "/", element: <Products />, },
  { path: "add", element: <AddProduct /> }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
