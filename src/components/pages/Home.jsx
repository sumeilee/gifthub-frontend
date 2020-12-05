import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div
        className="h-full w-full bg-contain bg-center  "
        style={{
          backgroundImage: "url(/homepage.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div
          className="flex justify-left text-left text-4xl font-extrabold text-white  pl-5 pt-20 mt-20 "
          style={{
            textShadow: "3px 2px 0px rgb(202, 61, 118)",
            backgroundSize: "cover",
          }}
        >
          <h1>Welcome to giftHUB</h1>
        </div>
        <div
          className=" flex justify-left font-bold text-2xl text-white text-left pl-5 "
          style={{
            textShadow: "3px 2px 0px rgb(202, 61, 118)",
          }}
        >
          <p>Click into offers to see listings by donors that may benefit you.</p>
        </div>
        <div
          className=" flex justify-left font-bold text-2xl text-white text-left pl-5"
          style={{
            textShadow: "3px 2px 0px rgb(202, 61, 118)",
          }}
        >
          <p2>Click into requests to see listings by requestors that you may donate to .</p2>
        </div>
      </div>
    );
  }
}

export default Home;
