import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/features/productSlice";
import Product from "../../home/Products/Product"; // Adjust the import based on your structure

const Pagination = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const limit = 12;

  useEffect(() => {
    dispatch(fetchProducts(limit)); // Fetch all products without limit
  }, [dispatch, limit]);

  const [itemOffset, setItemOffset] = useState(0);

  // Calculate the current items to display
  const endOffset = itemOffset + limit;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / limit);

  // Handle page change
  const handlePageClick = (event) => {
    const newOffset = event.selected * limit;
    setItemOffset(newOffset);
  };

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-3 ml-3 text-base font-semibold font-titleFont"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to {Math.min(endOffset, products.length)} of {products.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
