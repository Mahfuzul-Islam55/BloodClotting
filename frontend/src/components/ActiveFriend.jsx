import React from 'react';

export const  ActiveFriend=({user,setCurrentFriend})=> {

  return (
      <div  className="active-friend">
          <div className="image-active-icon">
              {
                  user && user.length>0?user.map(active=>
                    <div className="image">
                        <img src={`/image/${active.userInfo.image}`} 
                            alt="" 
                            onClick={()=>setCurrentFriend({_id:active.userInfo.id,email:active.userInfo.email,image:active.userInfo.image,userName:active.userInfo.userName})}
                        />
                        <div className="active-icon"></div>
                    </div>
                  ):''
              }
              
          </div>
      </div>
  )
}
