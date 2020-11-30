import React from "react";

const ErrorMsg = ({ msg }) => (
  <div className="text-red-500 text-sm mt-3">
    <p>{msg}</p>
  </div>
);

export default ErrorMsg;
