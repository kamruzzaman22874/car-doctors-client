import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("car-access-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })
    }, [url])


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                const remaining = bookings.filter(booking => booking._id !== id)
                setBookings(remaining)
            }
        });
    }



    const handleUpdateBookings = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to update this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ status: "confirm" })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Confirmed",
                                text: "Your file has been Updated.",
                                icon: "success"
                            });
                        }
                        const remaining = bookings.filter(booking => booking._id !== id)
                        const updated = bookings.find(booking => booking._id === id)
                        updated.status = "confirm"
                        const newBookings = [updated, ...remaining]
                        setBookings(newBookings)
                    })

            }
        });
    }
    return (
        <div className="my-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking) => <tr key={booking._id}>
                                <th>
                                    <button onClick={() => handleDelete(booking._id)} className="btn btn-circle btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 mask mask-hexagon">
                                            <img src={booking?.img} />
                                        </div>
                                    </div>
                                </td>
                                <td>{booking.customerName}</td>
                                <td>${booking.price}</td>
                                <td>{booking.date}</td>
                                <th>
                                    {
                                        booking.status === "confirm" ? <span className="text-pink-700 font-bold">Confirmed</span> :
                                            <button onClick={() => handleUpdateBookings(booking._id)} className="btn btn-ghost btn-xs">Pending

                                            </button>
                                    }
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default Bookings;