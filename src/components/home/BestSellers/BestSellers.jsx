import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../Products/Heading";
import { fetchProducts } from "../../../redux/features/productSlice";
import { toast } from "react-toastify";

const BestSellers = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    
    const category = "jewelery"; 
    dispatch(fetchProducts( {category} ));
  }, [dispatch]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return toast.error(error);

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="relative group border rounded-lg shadow-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
