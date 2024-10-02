import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import { fetchProducts } from "../../../redux/features/productSlice"; 
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { toast } from "react-toastify";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const limit = 12; 
    
    dispatch(fetchProducts({ limit})); 
  }, [dispatch]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return toast.error(error);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="relative group border rounded-lg shadow-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
