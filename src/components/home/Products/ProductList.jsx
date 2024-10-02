import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/features/productSlice"; 
import Product from "./Product";
import Loader from "../../loader/Loader";
import {toast} from "react-toastify"; 


const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return  toast.error(error);

  return (
    <div className="grid grid-cols-1 bg-gray-100 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
      {products.map((product) => (
        <Product key={product.id} {...product} /> 
      ))}
    </div>
  );
};

export default ProductList;
