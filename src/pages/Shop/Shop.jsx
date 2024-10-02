import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/shopPage/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";



const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
       <div className="w-full mdl:w-[100%] lgl:w-[75%]  h-full flex flex-col items-center gap-10">
         
          <Pagination itemsPerPage={itemsPerPage} />
        </div>
      </div>
      
    
  );
};

export default Shop;
