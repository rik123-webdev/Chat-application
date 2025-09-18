import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Rik");
  const [bio, setBio] = useState("Hi");

  // Define handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-full max-w-xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex flex-row max-sm:flex-col items-center gap-6 p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <h3 className="text-lg font-semibold">Profile details</h3>

          {/* Upload Avatar */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
            />
            Upload profile image
          </label>

          {/* Name Input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Enter your name"
            className="p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none:ring-2 focus:ring-violet-500"
          />

          {/* Bio Input */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
            placeholder="Write a short bio..."
            className="p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none:ring-2 focus:ring-violet-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer disabled:opacity-50"
          >
            Save Profile
          </button>
        </form>
        <img src={assets.logo_icon} alt="" className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"/>
      </div>
    </div>
  );
};

export default ProfilePage;
