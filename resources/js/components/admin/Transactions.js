import React from 'react'

function Transactions() {
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
                      <th className="py-3 px-2">Payment Method</th>
                      <th className="py-3 px-2">Action</th>
                  </tr>
              </thead>
              <tbody>No Data</tbody>
          </table>
      </div>
  );
}

export default Transactions