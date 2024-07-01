function FormInput({ label, type, name, placeholder }) {
  return (
    <label className="form-control w-full max-w-md">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-md"
      />
    </label>
  );
}

export default FormInput;
