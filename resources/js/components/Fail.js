import React from 'react'
import { Link } from 'react-router-dom'

function Fail() {
    return (
        <div className="container">
            <h4 className="text-center text-danger">Something went wrong!</h4>
            <center><Link to='/client-dashboard'><a href="" className="btn btn-primary">Go Back</a></Link></center>
        </div>
    )
}

export default Fail