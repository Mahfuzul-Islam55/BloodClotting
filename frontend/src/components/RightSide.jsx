import React, { useState } from "react";
import { BsCameraVideoFill, BsPlusCircle } from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";
import Prescription from "./Prescription";
import Chatbot from "./Chatbot";

const RightSide = (props) => {
  const {
    currentfriend,
    inputHendle,
    newMessage,
    sendMessage,
    message,
    scrollRef,
    emojiSend,
    ImageSend,
    activeUser,
    typingMessage,
  } = props;
  const [show, setShow] = useState(false);
  const[showCB,setShowCB]=useState(false);
  const handleShow = () => setShow(!show);
  const handleShowCB=()=>setShowCB(!showCB);
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./image/${currentfriend.image}`} alt="" />
                    {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some((u) => u.userId === currentfriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="name">
                    <h3>
                      {currentfriend.doctor == "true" ? "Dr. " : ""}{" "}
                      {currentfriend.userName}
                    </h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <IoCall />
                  </div>
                  <div className="icon">
                    <BsCameraVideoFill />
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>
              {show  && <Prescription handleShow={handleShow} />}
              {showCB &&  <Chatbot handleShowCB={handleShowCB} />}
              {!show && !showCB && (
                <Message
                  typingMessage={typingMessage}
                  currentfriend={currentfriend}
                  scrollRef={scrollRef}
                  message={message}
                />
              )}
              <div style={{display:"flex",flexDirection:"row",marginRight:"10px"}}>

             
              {!show && (
                <div onClick={handleShow} className="message-send-section">
                  <div className="file hover-attachment">
                    <div className="add-attachment">Add Prescription</div>
                    <BsPlusCircle />
                  </div>
                </div>
              )}
               { !showCB &&(
                <div onClick={handleShowCB} className="message-send-section">
                  <div className="file hover-attachment">
                    <div className="add-attachment">Chat with AI</div>
                    <BsPlusCircle />
                  </div>
                </div>
              )}
               </div>
              {!show && !showCB && (
                <MessageSend
                  ImageSend={ImageSend}
                  emojiSend={emojiSend}
                  sendMessage={sendMessage}
                  inputHendle={inputHendle}
                  newMessage={newMessage}
                />
              )}
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
              message={message}
              currentfriend={currentfriend}
              activeUser={activeUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
