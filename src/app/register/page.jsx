"use client";
import RegisterLeft from "./RegisterLeft";
import RegisterRight from "./RegisterRight";

const Register = () => {

 
  return (
    <div className="min-h-screen bg-green-100 flex justify-center items-center">
      <div className=" md:grid md:grid-cols-2  lg:grid-cols-2  rounded-2xl md:max-w-6xl mx-auto w-full">
        {/* left side */}
        <RegisterLeft />
        {/* Right side */}
        <RegisterRight/>
      </div>
    </div>
  );
};

export default Register;
