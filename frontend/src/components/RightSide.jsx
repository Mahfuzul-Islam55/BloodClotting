import React, { useState, useCallback } from "react";
import {
  BsCameraVideoFill,
  BsPlusCircle,
  BsPlusCircleFill,
} from "react-icons/bs";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";
import Prescription from "./Prescription";
import Chatbot from "./Chatbot";
import { VideoCall } from "./VideoCall";
import { useHistory } from "react-router-dom";
import BloodTiff from "./BloodTiff";
import BloodPng from "./BloodPng";
import { RiGalleryLine } from "react-icons/ri";
import { useSelector } from "react-redux";
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
    TiffSend,
  } = props;
  const [show, setShow] = useState(false);
  const [showCB, setShowCB] = useState(false);
  const handleShow = () => setShow(!show);
  const handleShowCB = () => setShowCB(!showCB);
  const [Room, setRoom] = useState(false);

  const handlejoinRoom = () => {
    setRoom(Room);
    let value = `${Math.floor(Math.random() * (9000000 - 9999) + 9999)}`;
    window.open(`/room/${value}`);
  };

  const [showTiff, setShowTiff] = useState(false);
  const [showPng, setShowPng] = useState(false);
  const handleShowTiff = () => setShowTiff(!showTiff);
  const handleShowPng = () => setShowPng(!showPng);

  const { mlData } = useSelector((state) => state.messenger);
  console.log("Data from rightside: ", mlData);

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
                  <div className="icon" onClick={handlejoinRoom}>
                    <BsCameraVideoFill />
                  </div>
                  {Room && <VideoCall />}
                  <div className="icon">
                    <label htmlFor="dot">
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>
              {show && <Prescription handleShow={handleShow} />}
              {showCB && <Chatbot handleShowCB={handleShowCB} />}
              {/* {showTiff && (
                <BloodTiff
                  handleShowTiff={handleShowTiff}
                  TiffSend={TiffSend}
                />
              )} */}
              {showPng && <BloodPng handleShowPng={handleShowPng} />}

              {!show && !showCB && !showPng && (
                <Message
                  typingMessage={typingMessage}
                  currentfriend={currentfriend}
                  scrollRef={scrollRef}
                  message={message}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "10px",
                }}
              >
                {!show && (
                  <div onClick={handleShow} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Add Prescription</div>
                      <BsPlusCircle />
                    </div>
                  </div>
                )}
                {!showCB && (
                  <div onClick={handleShowCB} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Chat with AI</div>
                      <BsPlusCircle />
                    </div>
                  </div>
                )}
                {
                  <div
                    onClick={handleShowTiff}
                    className="message-send-section"
                  >
                    <div className="file hover-attachment">
                      <div className="add-attachment">Submit Tiff</div>
                      <input
                        onChange={TiffSend}
                        type="file"
                        id="pic"
                        className="form-control"
                      />
                      <label htmlFor="pic">
                        <BsPlusCircleFill />
                      </label>
                    </div>
                  </div>
                }
                {!showPng && (
                  <div onClick={handleShowPng} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Submit Png</div>
                      <BsPlusCircle />
                    </div>
                  </div>
                )}
              </div>
              {/*  */}
              {!show && !showCB && !showPng && (
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
