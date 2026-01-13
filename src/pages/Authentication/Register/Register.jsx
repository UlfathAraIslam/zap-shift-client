import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
    const {createUser,updateUserProfile} = useAuth();
    const [profilePic,setProfilePic] = useState('');

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
    .then(result =>{
      console.log(result.user);

      //update userinfo in the database

      //update user profile in firebase
      const userProfile = {
        displayName : data.name,
        photoURL: profilePic,
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('profile name pic updated')
      })
      .catch(error =>{
        console.log(error);
      })
    })
    .catch(error =>{
      console.log(error(error))
    })
  };

  //Handle Image upload
  const handleImageUpload = async(e) =>{
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append('image',image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

    const res = await axios.post(imageUploadUrl,formData)
    setProfilePic(res.data.data.url);
  }
  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        {/* name */}
        <label className="label">Name</label>
        <input
          type="name"
          {...register("name")}
          className="input"
          placeholder="name"
        />
        {/* profile picture */}
        <label className="label">Name</label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="input"
          placeholder="Your Profile Picture"
        />
        {
            errors.email?.type === 'required' &&
            <p className="text-red-500">Name is required</p>
        }
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
        {/* password */}
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
            <Link className="btn btn-link" to="/login">Login</Link>
        </p>
      </fieldset>
      <SocialLogin/>
    </form>
  );
};

export default Register;
