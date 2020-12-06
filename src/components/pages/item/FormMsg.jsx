import React from "react";

class FormMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
    };
  }

  render() {
    return (
      <div className="form-msg">
        <p className="text-green-800 text-center">
          Form has been submitted successfully!
        </p>
        <br />
      </div>
    );
  }
}

export default FormMsg;
