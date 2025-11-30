"use client";
import RegisterLeft from "./RegisterLeft";
import RegisterRight from "./RegisterRight";

const Register = () => {
  return (
    <div className="max-w-[1600px] mx-auto min-h-screen  flex justify-center items-center ">
      <div className="w-full  bg-white  overflow-hidden border border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* left side */}
          <div className="hidden md:block">
            <RegisterLeft />
          </div>
          {/* Right side */}
         <div>
           <RegisterRight/>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Register;