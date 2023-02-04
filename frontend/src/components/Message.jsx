import React, { Fragment } from 'react';
import { MdDynamicForm } from 'react-icons/md';
import { useSelector } from 'react-redux';
export const Message = ({message,currentFriend,scrollRef,typingMessage}) => {
    const {myInfo}=useSelector(state=>state.auth);
  return (
      <Fragment>
      <div className='message-show'>
          {
              message && message.length>0?message.map((m,index)=>
                  m.senderId==myInfo.id? 
                    <div key={index} ref={scrollRef} className="my-message">
                        <div className="image-message">
                            <div className="my-text">
                                <p className="message-text">{m.message.text===''?<img src={`/image/${m.message.image}`}/>:m.message.text}</p>
                            </div>
                        </div>
                        <div className="time">
                            30January,2022
                        </div>
                    </div>
                : 

                <div key={index} ref={scrollRef} className="fd-message">
                    <div className="image-message-time">
                        <img src={`/image/${currentFriend.image}`}></img>
                        <div className="message-time">
                            <div className="fd-text">
                                <p className='message-text'>{m.message.text===''?<img src={`/image/${m.message.image}`}/>:m.message.text}</p>
                            </div>
                            <div className="time">
                                 5December,2021
                            </div>
                        </div>
                    </div>
                </div>
                ):''
          }
    </div>
        {
            typingMessage && typingMessage.message && typingMessage.senderId===currentFriend._id?
                <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                            <img src={`/image/${currentFriend.image}`}></img>
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className='message-text'>Typing message...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :''
        }
        </Fragment>
  );
};
