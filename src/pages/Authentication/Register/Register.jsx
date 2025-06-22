import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Name</label>
        <input
          type="name"
          {...register("name")}
          className="input"
          placeholder="name"
        />
        {/* email */}
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email",{required:true})}
          className="input"
          placeholder="Email"
        />
        {
            errors.email?.type === 'required' &&
            <p className="text-red-500">Email is required</p>
        }

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

        <button className="btn btn-primary text-black mt-4">Register</button>
        <p>Already have an account? 
            <Link to="/login">Login</Link>
        </p>
      </fieldset>
    </form>
  );
};

export default Login;
