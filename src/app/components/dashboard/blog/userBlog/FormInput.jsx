const FormInput = ({ label, id, ...props }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium font-hind text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition text-lg font-hind"
      />
    </div>
  );
};

export default FormInput;
