import React, { useContext } from 'react';
import './Shipment.css';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => console.log("Submit", data);
    console.log(watch("example"));//watch input value by passing the
    return (
        <div>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">Name is required</span>}

                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
                {errors.email && <span className="error">Email is required</span>}

                <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                {errors.address && <span className="error">Address is required</span>}

                <input name="phone" ref={register({ required: true })} placeholder="Your Phone no." />
                {errors.phone && <span className="error">Phone no. is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipment;