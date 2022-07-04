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

async function getComments(id) {
    const res = await fetch(`/api/comments/${id}`, {
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

async function createComment(id, content) {
    const res = await fetch(`/api/comment/create`, {
        method: 'POST',
        body: JSON.stringify({
            product_id: id,
            content: content
        }),
        headers: {
            'Content-Type': 'application/json',
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

async function addOrder(product_id, amount, quantity) {
    const res = await fetch(`/api/product/order`, {
        method: 'POST',
        body: JSON.stringify({
            product_id: product_id,
            amount: amount,
            quantity: quantity
        }),
        headers: {
            'Content-Type': 'application/json',
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
    const [comments, setComments] = useState({});
    const [content, setContent] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [quantity, setQuantity] = useState(0);

    let { id } = useParams();

    useEffect(() => {
        getProduct(id).then((data) => {
            setProduct(data);
        });

        getComments(id).then((data) => {
            setComments(data);
        })
    }, [trigger]);

    async function submitHandler(e) {
        e.preventDefault();
        alert("Saved!");
        const result = await createComment(id, content);
        console.log("ADD RESULT", result);
        if (result) {
            setTrigger(trigger + 1);
        }
    }

    async function orderHandler(e){
        e.preventDefault();
        const result = await addOrder(product.id, (quantity * product.price), quantity);
        console.log("Add Order: ", result);
        if(result){
            window.location.href=result.invoice_url;
        }
    }

    return (
        <div>
            <img src={`/file_storage/product_images/${product.product_image}`} width={'100%'} />
            <div className="container mb-5">
                <h2>{product.title}</h2>
                <small>Avalability: <b>{product.kilo}</b> Kilos Left</small>
                <p>Php. {product.price} /Kilo</p>
                <p>Location: {product.address}</p>
                <p>Description</p>
                <p>{product.description}</p>
                <p> <b>Comments</b> </p>
                {comments.length > 0 && comments.map(comment =>
                    <>
                        <span>{comment.content}</span> <br />
                        <span className='me-3'><b>{comment.name}</b></span>
                        <span>{comment.created_at}</span><br /> <br />
                    </>)}
                <form action="" method='POST' onSubmit={submitHandler}>
                    <div className="form-group">
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control" name="" id="" cols="30" rows="4"></textarea>
                    </div>
                    <button type='submit' className="btn btn-primary">Add Comment</button>
                </form>
            </div>
            <br />
            <br />
            <br />
            <div class="fixed-bottom">
                <form action="" onSubmit={orderHandler}>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity <b>(Total Amount: {quantity * product.price})</b></label>
                        <input id="quantity" className='form-control' value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-danger" type="submit"><b>ORDER ONLINE</b></button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ProductDetail