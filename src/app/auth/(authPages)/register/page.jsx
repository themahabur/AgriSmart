"use client";
import RegisterLeft from "./RegisterLeft";
import RegisterRight from "./RegisterRight";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex justify-center items-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
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