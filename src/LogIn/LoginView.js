import React from "react";

const LogInView = ({ onSubmit }) => {
  return (
    <div className="container">
      <div className="p-3 mb-2 bg-primary text-white"><h1 className="text-center">Welcome to Personal Training </h1></div><br />
      <h2>Sign In to Enter</h2><br />
      <form onSubmit={onSubmit}>
        <label>
          User Email
          <input
            style={{ width: "100%" }}
            name="email"
            type="email"
            placeholder="User Email"
          />
        </label>
        <label>
          Password
          <input
            style={{ width: "100%" }}
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <button type="submit" className="btn btn-success btn-sm">
          Sign In
        </button>
      </form><br /><br /><br />
          <div className="p-.8 mb-2 bg-secondary text-white">
            <p className="text-center">Copyright@Eashin Matubber</p>
          </div>
    </div>
  );
};

export default LogInView;
