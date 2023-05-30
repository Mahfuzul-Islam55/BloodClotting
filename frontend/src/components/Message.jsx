import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { HiOutlineCheckCircle, RiCheckboxCircleFill } from "react-icons/all";

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <div className="message-show">
          {message && message.length > 0 ? (
            message.map((m, index) =>
              m.senderId === myInfo.id ? (
                <div key={index} ref={scrollRef} className="my-message">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text my">
                        {m.message.text === "" ? (
                          <a href={`/image/${m.message.image}`} download>
                            <img
                              style={{ cursor: "pointer" }}
                              src={`/image/${m.message.image}`}
                              alt="attachment"
                              download
                            />
                          </a>
                        ) : (
                          m.message.text
                        )}
                      </p>
                      {index === message.length - 1 &&
                      m.senderId === myInfo.id ? (
                        m.status === "seen" ? (
                          <img
                            className="img"
                            src={`/image/${currentfriend.image}`}
                            alt=""
                          />
                        ) : m.status === "delivared" ? (
                          <span>
                            <RiCheckboxCircleFill />
                          </span>
                        ) : (
                          <span>
                            <HiOutlineCheckCircle />
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="time">
                    {moment(m.createdAt).startOf("mini").fromNow()}
                  </div>
                </div>
              ) : (
                <div key={index} ref={scrollRef} className="fd-message">
                  <div className="image-message-time">
                    <img src={`./image/${currentfriend.image}`} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text fd">
                          {m.message.text === "" ? (
                            <a href={`/image/${m.message.image}`} download>
                              <img src={`./image/${m.message.image}`} alt="" />
                            </a>
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                      <div className="time">
                        {moment(m.createdAt).startOf("mini").fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="friend_connect">
              <img src={`./image/${currentfriend.image}`} alt="" />
              <h3>
                {currentfriend.doctor == true ? "Dr. " : ""}
                {currentfriend.userName} connect you
              </h3>
              <span>
                {moment(currentfriend.createdAt).startOf("mini").fromNow()}
              </span>
            </div>
          )}

          {typingMessage &&
          typingMessage.msg &&
          typingMessage.senderId === currentfriend._id ? (
            <div className="typing-message">
              <div className="fd-message">
                <div className="image-message-time">
                  <img src={`./image/${currentfriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">Typing message....</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h3>sdfkhsdfsd</h3>
      )}
    </>
  );
};

export default Message;
