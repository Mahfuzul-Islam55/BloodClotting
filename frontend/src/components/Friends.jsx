import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
export const Friends = ({friend}) => {
    const {myInfo}=useSelector(state=>state.auth);
  return (
        <div className='friend'>
            <div className="friend-image">
                <div className="image">
                    <img src={`/image/${friend.friendInfo.image}`} alt=""/>
                </div>
            </div>
            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4 className='Fd_name'>{friend.friendInfo.userName}</h4>
                    <div className="message-time">
                        {
                          friend.messageInfo && friend.messageInfo.senderId===myInfo.id?<span>You: </span>:<span>{friend.friendInfo.userName}: </span>
                        }
                        {
                            friend.messageInfo && friend.messageInfo.message.text?<span>{friend.messageInfo.message.text.slice(0,10)}</span>:  friend.messageInfo && friend.messageInfo.message.image?<span>send an image</span>:<span>connect to you</span>
                        }
                        {
                            friend.messageInfo?<span> {moment(friend.messageInfo.createdAt).startOf('mini').fromNow()}</span>:<span> {moment(friend.createdAt).startOf('mini').fromNow()}</span>
                        }
                    </div>
                </div>
                    {
                        friend.messageInfo && myInfo.id===friend.messageInfo.senderId?
                            <div className="seen-unseen-icon">
                                {
                                    friend.messageInfo.status==='seen'?
                                        <img src={`/image/${friend.friendInfo.image}`} alt=""/>:
                                        friend.messageInfo.status==='delivered'?<div className='delivered'></div>:
                                        <div className="unseen"></div>
                                }
                            </div>:
                            <div className="seen-unseen-icon">
                                <div className="seen-icon">

                                </div>
                            </div>
                        }
            </div>
        </div>
        );
};
