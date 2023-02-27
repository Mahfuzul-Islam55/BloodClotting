import React from "react";
import {
  AiFillGift,
  BiMessageAltEdit,
  BsPlusCircle,
  RiGalleryLine,
  IoSend,
} from "react-icons/all";

const MessageSend = ({
  inputHendle,
  newMessage,
  sendMessage,
  emojiSend,
  ImageSend,
}) => {
  const emojis = [
    "😀",
    "",
    "😄",
    "😁",
    "😆",
    "",
    "😂",
    "🤣",
    "😊",
    "",
    "🙂",
    "🙃",
    "😉",
    "",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      {/* <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <BsPlusCircle />
      </div> */}
      <div className="file hover-image">
        <div className="add-image">Add File</div>
        <input
          style={{ display: "none" }}
          onChange={ImageSend}
          type="file"
          id="picture"
          className="form-control"
        />
        <label htmlFor="picture" style={{ fontSize: "20px" }}>
          <RiGalleryLine />
        </label>
      </div>
      <div className="file">
        <BiMessageAltEdit />
      </div>
      {/* <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <AiFillGift />
      </div> */}
      <div className="message-type">
        <input
          onChange={inputHendle}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          value={newMessage}
          className="form-control"
          style={{ color: "#000" }}
        />
        <label htmlFor="emoji">🙂</label>
      </div>
      <div onClick={sendMessage} className="file">
        <IoSend />
      </div>
      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e, index) => (
            <span key={index} onClick={() => emojiSend(e)}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
