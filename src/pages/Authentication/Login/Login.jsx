import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const {signIn} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '/';

  const onSubmit = (data) => {
    signIn(data.email,data.password)
    .then(result =>{
      console.log(result.user);
      navigate(from);
    })
    .catch(error => console.log(error))
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email",{
            required:true
          })}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          {...register("password",{
            required:true,
            minLength: 6
          })}
          className="input"
          placeholder="Password"
        />
        {
            errors.password?.type === "required" && (
                <p role="alert" className="text-red-600">Password is required</p>
            )
          }
        {
            errors.password?.type === "minLength" && (
                <p role="alert" className="text-red-600">Password must be 6 characters or longer</p>
            )
          }

        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <button className="btn btn-primary text-black mt-4">Login</button>
      </fieldset>
      <p><small>New to this website? <Link className="btn btn-link" to="/register">Register</Link></small></p>
      <SocialLogin/>
    </form>
  );
};

export default Login;
