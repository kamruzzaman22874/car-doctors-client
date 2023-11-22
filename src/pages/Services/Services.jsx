import { useEffect } from "react";
import { useState } from "react";
import Service from "../Service/Service";

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/services")
            .then(res => res.json())
            .then(data => {
                setServices(data)
            })
    }, [])
    return (

        <div>
            <div className="text-center my-10 space-y-3">
                <h2 className=" text-xl text-orange-500 font-bold">Service</h2>
                <h1 className="text-3xl font-bold">Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {services.map(service => <Service key={service._id} service={service} />)}
            </div>
            <div className="w-32 mx-auto px-3 py-2 my-6 rounded text-white bg-orange-500">
                <button>More Services</button>
            </div>
        </div>
    );
};

export default Services;