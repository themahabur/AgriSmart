"use client";
import RegisterLeft from "./RegisterLeft";
import RegisterRight from "./RegisterRight";

const Register = () => {

 
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className=" md:grid md:grid-cols-2  lg:grid-cols-2  rounded-2xl container mx-auto w-full">
        {/* left side */}
        <RegisterLeft />
        {/* Right side */}
        <RegisterRight/>
      </div>
    </div>
  );
};

export default Register;
