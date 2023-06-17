import React, { useState } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import FriendInfo from "../feature/friend-info";
import Message from "./Message";
import MessageSend from "./MessageSend";
import Prescription from "../feature/prescription";
import Chatbot from "../feature/chatbot";
import VideoCall from "../feature/video-call";
import BloodPng from "../feature/clotting/png-clotting";
import { useDispatch, useSelector } from "react-redux";
import MlImageShow from "./assets/MlImageShow";
import chatIcon from "./assets/chat.webp";
import { ShowStainImage, ShowLoading } from "../store/actions/messengerAction";
import Loading from "./assets/Loading";
import report from "./assets/report.png";
import search_stain from "./assets/search_stain.png";
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
  const handleShowTiff = () => {
    setShowTiff(!showTiff);
    dispatch(ShowLoading());
  };
  const dispatch = useDispatch();
  const handleShowPng = () => {
    setShowPng(!showPng);
    dispatch(ShowLoading());
    dispatch(ShowStainImage());
  };

  const { mlData, mlDataSendSuccess, showLoading, loadingMessage, showStain } =
    useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  console.log("Data from rightside: ", mlData);
  console.log("mlDataSendSuccess ", mlDataSendSuccess);
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
              {mlDataSendSuccess ? <MlImageShow mlData={mlData} /> : ""}
              {!mlDataSendSuccess && showLoading && !showCB ? (
                <Loading loadingMessage={loadingMessage} />
              ) : (
                ""
              )}

              {show && <Prescription handleShow={handleShow} />}
              {showCB && <Chatbot handleShowCB={handleShowCB} />}

              {showPng && showStain && (
                <BloodPng handleShowPng={handleShowPng} />
              )}

              {!show &&
                !showCB &&
                !showPng &&
                !mlDataSendSuccess &&
                !showLoading && (
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
                {!show && myInfo.doctor == "true" && (
                  <div onClick={handleShow} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Add Prescription</div>
                      <FaPrescriptionBottleAlt />
                    </div>
                  </div>
                )}
                {!showCB && (
                  <div onClick={handleShowCB} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Chat with AI</div>
                      <img
                        src={chatIcon}
                        style={{ width: "18px", height: "18px" }}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {myInfo.doctor == "true" && (
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
                      <label htmlFor="pic" style={{ fontSize: "20px" }}>
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src={report}
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                )}
                {!showPng && myInfo.doctor == "true" && (
                  <div onClick={handleShowPng} className="message-send-section">
                    <div className="file hover-attachment">
                      <div className="add-attachment">Show Stain Image</div>
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={search_stain}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
              {/*  */}
              {!show &&
                !showCB &&
                !showPng &&
                !mlDataSendSuccess &&
                !showLoading && (
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
