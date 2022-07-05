import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
    return (
        <div className="container">
            <h4 className="text-center text-success">Thank you for Purchasing!</h4>
            <center><Link to='/client-dashboard'><a href="" className="btn btn-primary">Go Back</a></Link></center>
        </div>
    )
}

export default Success