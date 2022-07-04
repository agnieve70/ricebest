import React, { useState, useEffect } from "react";
import Input from "../../UI/input";

const auth_token = localStorage.getItem("auth_token");

async function addFarmer(firstname, lastname, address, user_id) {
    const res = await fetch('api/farmer/create', {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            address: address,
            user_id: user_id
        }),
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something wnt wrong");
    }

    return data;
}

async function updateFarmer(firstname, lastname, address, id) {
    const res = await fetch('api/farmer/update', {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            address: address,
            id: id
        }),
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json'
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

async function addUser(username, email, profile_picture, password, password_confirmation, role) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", username);
    bodyFormData.append("email", email);
    bodyFormData.append("profile_picture", profile_picture);
    bodyFormData.append("password", password);
    bodyFormData.append("password_confirmation", password_confirmation);
    bodyFormData.append("role", role);

    const res = await fetch('api/register', {
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

async function getFarmer(id) {
    const res = await fetch(`api/farmer/${id}`, {
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

function Farmers() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profile_picture, setProfilePicture] = useState();
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("farmer");
    const [farmers, setFarmers] = useState([]);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getFarmers().then((data) => {
            console.log("FARMERS: ", data);
            setFarmers(data);
            setIsLoading(false);

        });
    }, []);

    async function submitHandler(e) {
        e.preventDefault();
        if (id === '') {
            try{
                setIsLoading(true);

                const result1 = await addUser(username, email, profile_picture, password, password_confirmation, role)
                console.log("RESULT 1: ", result1);
                if (result1) {
                    const result2 = await addFarmer(firstname, lastname, address, result1.user_id);
                    if (result2) {
                        console.log("SUCCESS!!");
                        setIsLoading(false);
    
                    }
                }
            }catch(e){
                setIsLoading(false);
            }
        } else {
            setIsLoading(true);
            const result1 = await updateFarmer(firstname, lastname, address, id)
            if (result1) {
                console.log("SUCCESS UPDATE!!");
                setId("");
            setIsLoading(false);
            }
        }

    }

    async function selectFarmerHandler(id) {
        setId(id);
        
        const res = await getFarmer(id);
        if (res) {
            console.log("SUCCESS: ", res);
            setFirstname(res.farmer.firstname)
            setLastname(res.farmer.lastname)
            setAddress(res.farmer.address)

            setUsername(res.user.name);
            setEmail(res.user.email)
        }
    }

    function clearFieldsHandler() {
        setFirstname("");
        setLastname("");
        setAddress("");
        setUsername("");
        setEmail("");
        setPassword("");
        setId("");
        setPasswordConfirmation("");
    }

    return (
        <div className="row mt-5 mb-5">
            <div className="col-md-4">
                <div className="card py-5 px-3 shadow">
                    <form action="" onSubmit={submitHandler}>
                        <h4 className="text-center">Farmer Details</h4>
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
                        <Input
                            label_id={"firstname"}
                            label={"First Name"}
                            type={"text"}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <Input
                            label_id={"lastname"}
                            label={"Last Name"}
                            type={"text"}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <Input
                            label_id={"address"}
                            label={"Address"}
                            type={"text"}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {
                            id ? null :
                                <>
                                    <Input
                                        label_id={"profile_picture"}
                                        label={"Profile Picture"}
                                        type={"file"}
                                        onChange={(e) => {
                                            setProfilePicture(e.target.files[0])
                                        }}
                                    />
                                    <Input
                                        label_id={"username"}
                                        label={"Username"}
                                        type={"text"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Input
                                        label_id={"email"}
                                        label={"Email"}
                                        type={"email"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        label_id={"password"}
                                        label={"Password"}
                                        type={"password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Input
                                        label_id={"password_confirmation"}
                                        label={"Password Confirmation"}
                                        type={"password"}
                                        value={password_confirmation}
                                        onChange={(e) =>
                                            setPasswordConfirmation(e.target.value)
                                        }
                                    /></>
                        }
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary mb-2">SAVE</button>
                            <button type="button" className="btn btn-dark" onClick={clearFieldsHandler}>CLEAR</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <table className="table">
                    <thead className="table-success">
                        <tr>
                            <th className="py-3 px-2">First Name</th>
                            <th className="py-3 px-2">Last Name</th>
                            <th className="py-3 px-2">Email</th>
                            <th className="py-3 px-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            farmers.length > 0 ? farmers.map(farmer =>
                                <tr key={farmer.id}>
                                    <td>{farmer.firstname}</td>
                                    <td>{farmer.lastname}</td>
                                    <td>{farmer.email}</td>
                                    <td><button className="btn btn-warning btn-sm"
                                        onClick={selectFarmerHandler.bind(this, farmer.id)}><i className="fa fa-edit"></i></button></td>
                                </tr>) : <tr>
                                <td colSpan={4}>No Data</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Farmers;
