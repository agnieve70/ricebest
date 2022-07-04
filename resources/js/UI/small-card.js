import React from "react";

function SmallCard(props) {
    return (
        <div className={`card px-3 py-4 shadow bg-${props.color}`}>
            <div className="row">
                <div className="col-md-4">
                    <h1 style={{ fontSize: 60 }} className="text-light">
                        {props.value}
                    </h1>
                </div>
                <div className="col-md-8">
                    <h4 className="text-light">{props.title}</h4>
                    <h4 className="text-light text-muted">{props.subtitle}</h4>
                </div>
            </div>
        </div>
    );
}

export default SmallCard;
