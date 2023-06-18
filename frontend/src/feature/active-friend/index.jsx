import React from "react";

const ActiveFriend = ({ user, setCurrentFriend }) => {
  const { id, email, image, userName } = user.userInfo;

  return (
    <div
      onClick={() =>
        setCurrentFriend({
          _id: id,
          email: email,
          image: image,
          userName: userName,
        })
      }
      className="active-friend"
    >
      <div className="image-active-icon">
        <div className="image">
          <img src={`./image/${image}`} alt="user" />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
