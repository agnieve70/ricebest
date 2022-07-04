import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const auth_token = localStorage.getItem("auth_token");

async function getProduct(id) {
    const res = await fetch(`/api/product/${id}`, {
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

function ProductDetail() {
    const [product, setProduct] = useState({});

    let { id } = useParams();

    useEffect(() => {
        getProduct(id).then((data) => {
            setProduct(data);
        })
    }, []);

    return (
        <div>
            <img src={`/file_storage/product_images/${product.product_image}`} width={'100%'} />
            <div className="container mb-4">
                <h2>{product.title}</h2>
                <small>Avalability: <b>{product.kilo}</b> Kilos Left</small>
                <p>Php. {product.price} /Kilo</p>
                <p>Location: {product.address}</p>
                <p>Description</p>
                <p>{product.description}</p>
                <p> <b>Comments</b> </p>
                <p>No Comment.</p>
                <form action="" method='POST'>
                    <div className="form-group">
                        <textarea className="form-control" name="" id="" cols="30" rows="4"></textarea>
                    </div>
                </form>
                <button className="btn btn-primary">Add Comment</button>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-danger" type="button"><b>ORDER ONLINE</b></button>
            </div>
        </div>
    )
}

export default ProductDetail