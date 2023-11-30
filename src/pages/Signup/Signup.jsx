import { Link, Navigate } from "react-router-dom";
import login from "../../assets/images/login/login.svg"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import SocilaLogin from "../../shared/SocilaLogin/SocilaLogin";

const Signup = () => {
    const { createUser } = useContext(AuthContext)
    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Signup has been done",
                    showConfirmButton: false,
                    timer: 1500
                });
                Navigate("/login")
            })
            .catch(error => console.log(error))

    }
    return (
        <div className="hero min-h-screen bg-base-200 my-20">
            <div className="hero-content flex-col lg:flex-row justify-between">
                <div className="w-1/2 mr-24">
                    <img src={login} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Signup now!</h1>
                        <form onSubmit={handleSignup}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="bg-orange-500 px-4 py-2 cursor-pointer rounded text-white" type="submit" value="Sign up" />
                            </div>
                        </form>
                        <p className="text-center mt-3">Already have an Account? <Link className="underline text-orange-500 font-bold" to="/login">Login</Link> </p>
                    </div>
                    <SocilaLogin />
                </div>
            </div>
        </div>
    );
};

export default Signup;