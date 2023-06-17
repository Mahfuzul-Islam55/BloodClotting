import React from "react";
import { BiMessageAltEdit, RiGalleryLine, IoSend } from "react-icons/all";

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
