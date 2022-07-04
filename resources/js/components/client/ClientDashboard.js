import React, { useEffect, useState } from 'react';
import ProductCard from "../../UI/product-card";

const auth_token = localStorage.getItem("auth_token");

async function getProducts() {
  const res = await fetch('api/products', {
    headers: {
      'Authorization': `Bearer ${auth_token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something wnt wrong");
  }
  console.log(data);
  return data.data;
}

function ClientDashboard() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-5">

        {products && products.map(product => <div className="col">
          <ProductCard
            id={product.id}
            title={product.title}
            image={`/file_storage/product_images/${product.product_image}`}
            description={product.description}
            address={product.address}
            price={product.price}
          />
        </div>)}

      </div>
    </div>
  )
}

export default ClientDashboard