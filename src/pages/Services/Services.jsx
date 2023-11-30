import { useEffect, useRef, useState } from "react";
import Service from "../Service/Service";

const Services = () => {
    const [services, setServices] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [displayedServices, setDisplayedServices] = useState([]);
    const [assending, setAssending] = useState(true);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${assending ? "assending" : "dessending"}`)
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setDisplayedServices(data.slice(0, 3));
            });
    }, [assending, search]);

    const handleShowMore = () => {
        setDisplayedServices(services);
        setShowAll(true);
    };

    const handleShowLess = () => {
        setDisplayedServices(services.slice(0, 3));
        setShowAll(false);
    };

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className="text-center my-10 space-y-3">
                <h2 className="text-xl text-orange-500 font-bold">Service</h2>
                <h1 className="text-3xl font-bold">Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable. </p>
            </div>
            <div className="text-center flex justify-center gap-10">
                <select className="select select-bordered w-full max-w-xs" onChange={() => setAssending(!assending)}>
                    <option value="assending">Assending</option>
                    <option value="dessending">Dessending</option>
                </select>
                <input ref={searchRef} type="text" onChange={handleSearch} placeholder="Type here" className="input input-bordered w-full max-w-xs" />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {displayedServices.map(service => (
                    <Service key={service._id} service={service} />
                ))}
            </div>
            <div className="w-32 mx-auto px-3 py-2 my-6 rounded text-white bg-orange-500">
                {!showAll ? (
                    <button onClick={handleShowMore}>More Services</button>
                ) : (
                    <button onClick={handleShowLess}>Show Less</button>
                )}
            </div>
        </div >
    );
};

export default Services;
