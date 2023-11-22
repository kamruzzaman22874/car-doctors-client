import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Service = ({ service }) => {
    const { _id, img, title, price } = service;

    return (
        <div className="card card-compact  bg-base-100 shadow-xl">
            <img className="h-[250px] rounded-lg" src={img} alt="services img" />
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-end">
                    <p className="text-lg text-orange-500 font-semibold">Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}>
                        <button className=""><FaArrowRight /></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Service;