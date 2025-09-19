import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* left side */}
      <div></div>
      {/* Right side */}
      <div className="w-[400px] mx-auto bg-green-200 p-10">
        <form>
          {/* name */}
         
          <div className="my-6">
            <div className="flex ">
              <label>Enter Your Full Name Here -</label>
              <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
            </div>
            <input
              type="text"
              name="name"
              placeholder="enter your full name"
              className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
            />
          </div>
          
         {/* photo url */}
          <div className="my-6">
            <div className="flex ">
              <label>Enter Your Photo URL Here -</label>
              <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
            </div>
            <input
              type="url"
              name="url"
              placeholder="ljshZoXh/er80fv/?lopsf..."
              className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
            />
          </div>
         
          {/* email */}
          <div className="my-6">
            <div className="flex ">
              <label>Enter Your Valid Email -</label>
              <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
            </div>
            <input
              type="email"
              name="email"
              placeholder="info@gmail.com"
              className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
            />
          </div>
          {/* password */}
          <div className="my-6">
            <div className="flex ">
              <label>Add your Password -</label>
              <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
            </div>
            <input
              type="password"
              name="password"
              placeholder="password (e.g. !zdA?34Z..)"
              className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
