import React, { useState, useEffect } from "react";
import ProductCard from "../../UI/product-card";
import Input from "../../UI/input";

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

    return data.data;
}

async function addProduct(title, description, address, price, product_image, kilo, farmer_id) {
    let bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("description", description);
    bodyFormData.append("address", address);
    bodyFormData.append("price", price);
    bodyFormData.append("product_image", product_image);
    bodyFormData.append("kilo", kilo);
    bodyFormData.append("farmer_id", farmer_id);

    const res = await fetch('api/product/create', {
        method: 'POST',
        body: bodyFormData,
        headers: {
            'Authorization': `Bearer ${auth_token}`
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something wnt wrong");
    }

    return data;
}

async function getFarmers() {
    const res = await fetch('api/farmers', {
        headers: {
            'Authorization': `Bearer ${auth_token}`
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something wnt wrong");
    }

    return data.data;
}

function Products() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [product_image, setProductImage] = useState();
    const [kilo, setKilo] = useState("");
    const [farmer_id, setFarmerId] = useState("");
    const [farmers, setFarmers] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getFarmers().then((data) => {
            console.log("FARMERS: ", data);
            setFarmers(data);

        });

        getProducts().then((data) => {
            console.log("PRODUCTS: ", data);
            setProducts(data);
        setIsLoading(false);

        });
    }, []);

    async function submitHandler(e) {
        e.preventDefault();
        const result = await addProduct(title, description, address, price, product_image, kilo, farmer_id);
        if (result) {
            alert("OKAY!");
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>

                <div className="row mt-5">
                    <h4>Product</h4>
                    {isLoading ? (
                            <div
                                style={{ margin: "auto" }}
                                className="spinner-border"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : null}
                    <div className="col-md-6">
                        <Input
                            label_id={"title"}
                            label={"Title"}
                            type={"text"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                name=""
                                id="description"
                                cols="30"
                                rows="5"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                name=""
                                id="address"
                                cols="30"
                                rows="2"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                            <Input
                                label_id={"price"}
                                label={"Price"}
                                type={"text"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Input
                                label_id={"product_image"}
                                label={"Product Image"}
                                type={"file"}
                                onChange={(e) => {
                                    setProductImage(e.target.files[0])
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="farmer">Select Farmer</label>
                        <select name="" value={farmer_id} onChange={(e) => setFarmerId(e.target.value)} id="farmer" className="form-control">
                            <option selected>Select Farmer Owner</option>
                            {
                               farmers.length > 0 && farmers.map((farmer)=> <option key={farmer.id} value={farmer.id}>{farmer.firstname} {farmer.lastname}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-md-4">
                        <Input
                            label_id={"kilo"}
                            label={"Kilo"}
                            type={"number"}
                            value={kilo}
                            onChange={(e) => setKilo(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary px-5">SAVE</button>
                    </div>
                </div>
            </form>
            {isLoading ? (
                            <div
                                style={{ margin: "auto" }}
                                className="spinner-border"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : null}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-5">
                
                {products && products.map(product => <div className="col">
                    <ProductCard
                        title={product.title}
                        image={`/file_storage/product_images/${product.product_image}`}
                        description={product.description}
                        address={product.address}
                    />
                </div>)}
                
            </div>
        </div>
    );
}

export default Products;
