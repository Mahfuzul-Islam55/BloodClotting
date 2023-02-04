import React from 'react';
import { AiFillGift } from 'react-icons/ai';
import { BiMessageAltEdit } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import { RiGalleryLine } from 'react-icons/ri';

export const MessageSend = ({inputHandle,newMessage,sendMessage,emojiSend,imageSend}) => {

    const emojis = [
        '😀', '😃', '😄', '😁',
        '😆', '😅', '😂', '🤣',
        '😊', '😇', '🙂', '🙃',
        '😉', '😌', '😍', '😝',
        '😜', '🧐', '🤓', '😎',
        '😕', '🤑', '🥴', '😱'
    ]

  return (
      <div className="message-send-section">
          <input type="checkbox" id='emoji' />
          <div className="file hover-attachment">
              <div className="add-attachment">
                  Add Attacment
              </div>
              <BsPlusCircle/>
          </div>
          <div className="file hover-image">
              <div className="add-image">
                Add Image
              </div>
              <input onChange={imageSend} type="file" id="pic" className="form-control" />
              <label htmlFor="pic"><RiGalleryLine></RiGalleryLine></label>
          </div>
          <div className="file">
              <BiMessageAltEdit></BiMessageAltEdit>
          </div>
          <div className="file hover-gift">
              <div className="add-gift">
                Add Gift
              </div>
              <AiFillGift></AiFillGift>
          </div>
          <div className="message-type">
              <input onChange={inputHandle} value={newMessage} type="text" name="message" id="message" placeholder="Aa" className="form-control" />
              <label htmlFor="emoji">😃</label>
          </div>
          <div onClick={sendMessage} className="file">{ newMessage?<MdSend size={30}/>:'❤️'}
        
          </div>
            <div className="emoji-section">
                <div className="emoji">
                    {emojis.map((e,index)=><span key={index} onClick={()=>emojiSend(e)}>{e}</span>)}
                </div>
            </div>
      </div>
  );
};
