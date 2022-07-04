import React from 'react'
import { Link } from 'react-router-dom';

function ProductCard(props) {
  return (
      <div className="card h-100 shadow">
          <Link to={`/product-detail/${props.id}`}>
            <img src={props.image} className="card-img-top" alt={props.title} height={200} />
          </Link>

          <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="text-muted">{props.address}</p>
              <p className="card-text">{props.description}</p>
              <p className="card-text">{props.price}</p>
          </div>
      </div>
  );
}

export default ProductCard