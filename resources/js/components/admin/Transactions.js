import React, { useEffect, useState } from 'react';

const auth_token = localStorage.getItem("auth_token");

async function getTransactions() {
    const res = await fetch('api/transactions', {
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

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(()=> {
        getTransactions().then((data)=> {
            setTransactions(data);
        })
    }, []);

  return (
      <div className="row mt-5 mb-5">
          <table class="table">
              <thead class="table-dark">
                  <tr>
                      <th className="py-3 px-2">#</th>
                      <th className="py-3 px-2">Invoice #</th>
                      <th className="py-3 px-2">Product</th>
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Client</th>
                      <th className="py-3 px-2">Status</th>
                  </tr>
              </thead>
              <tbody>
                {transactions && transactions.map(trans => <tr>
                    <td>{trans.id}</td>
                    <td>{trans.invoice_no}</td>
                    <td>{trans.title}</td>
                    <td>{trans.created_at}</td>
                    <td>{trans.name}</td>
                    <td>{trans.status === 1 ? 'PAID' : 'PENDING'}</td>
                </tr>)}
              </tbody>
          </table>
      </div>
  );
}

export default Transactions