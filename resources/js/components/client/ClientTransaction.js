import React, { useEffect, useState } from 'react'

const auth_token = localStorage.getItem("auth_token");

async function getTransactions() {
    
    const res = await fetch('api/client-transactions', {
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

function ClientTransaction() {
    const [transactions, setTransactions] = useState([]);

    useEffect(()=> {
        getTransactions().then((data)=> {
            setTransactions(data);
        })
    }, []);

  return (
    <div className="container">
        {transactions.length > 0 && transactions.map(trans => <div className="card p-5 mb-3">
            <h4>{trans.created_at}</h4>
            <span>{trans.amount}</span> <br />
            <span>{trans.title}</span>
        </div>)}
    </div>
  )
}

export default ClientTransaction