import React, { useEffect, useState } from 'react'


async function getTransactions() {
    const res = await fetch('api/client-orders', {
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

function ClientOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        getTransactions().then((data)=> {
            setOrders(data);
        })
    }, []);

  return (
    <div className="container">
        {orders.length > 0 && orders.map(trans => <div className="card p-5 mb-3">
            <h4>{trans.created_at}</h4>
            <span>{trans.amount}</span> <br />
            <span>{trans.title}</span>
        </div>)}
    </div>
  )
}

export default ClientOrders