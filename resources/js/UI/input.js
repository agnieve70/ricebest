import React from 'react'

function Input(props) {
    return (
        <div className="form-group mb-3">
            <label htmlFor={props.label_id}>{props.label}</label>
            <input
                name={props.label_id}
                id={props.label_id}
                className="form-control"
                type={props.type}
                {...props}
            />
        </div>
    );
}

export default Input