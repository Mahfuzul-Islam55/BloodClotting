import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import bot from "../../asset/image/bot.svg";
import user from "../../asset/image/user.svg";
import send from "../../asset/image/send.svg";
import axios from "axios";

export default function Chatbot({ handleShowCB }) {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/", { prompt })
      .then((res) => {
        setResponse(res.data.bot);
        console.log(res.data.bot, " json res full");
      })
      .catch((err) => console.warn(err, " error "));
  };

  return (
    <div className="chatbot">
      <form
        className="myForm"
        onSubmit={handleSubmit}
        style={{ width: "80%", height: "300px" }}
      >
        <div
          onClick={() => handleShowCB()}
          style={{ cursor: "pointer", color: "black", marginLeft: "95%" }}
        >
          <AiFillCloseCircle />
        </div>
        <div className="user" style={{ marginBottom: "20px" }}>
          <img src={user} style={{ marginRight: "10px" }} alt="" />
          <input
            className="textarea"
            placeholder="  Ask me anything..."
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button className="sbtn" type="submit">
            {" "}
            <img src={send} alt="" />
          </button>
        </div>
        <div className="bot">
          <img src={bot} alt="" />
          {response}
        </div>
      </form>
    </div>
  );
}
