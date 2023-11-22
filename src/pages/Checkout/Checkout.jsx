import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Checkout = () => {
    const services = useLoaderData();
    const { user } = useContext(AuthContext)
    const { img, title, price, _id } = services;
    const handleServices = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const message = form.message.value;
        const email = user?.email;
        const bookingInfo = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: parseFloat(price),
            message,
        }
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <div className="hero relative min-h-[300px] rounded" style={{
                backgroundImage: `url(${img})`
            }}>
                <div className="hero-overlay bg-opacity-60 rounded"></div>
                <div className="hero-content  text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">Check Out</h1>
                    </div>
                </div>
                <div className="absolute bottom-0">
                    <p className="bg-orange-500 text-white px-6 py-2 radius"> <Link to="/">Home</Link> / Checkout</p>
                </div>
            </div>
            <div>
                <h2 className="text-center text-4xl font-bold my-10">Book Service: {title}</h2>
                <form onSubmit={handleServices}>
                    <div className="card-body ">
                        <div className="bg-orange-100 p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="name" className="input  input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <input type="date" name="date" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name="email" defaultValue={user?.email} className="input  input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Due Amount</span>
                                    </label>
                                    <input type="text" name="email" defaultValue={'$ ' + price} className="input input-bordered" required />
                                </div>
                            </div>
                            <textarea name="message" className="my-5 p-2 w-full" placeholder="Your Message" id="" cols="30" rows="5"></textarea>
                            <div className="form-control mt-6">
                                <input className="btn bg-orange-500 text-white btn-block" type="submit" value="Order Confirm" />
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Checkout;