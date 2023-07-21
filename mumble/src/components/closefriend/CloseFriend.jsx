import React, { useEffect, useState } from 'react';
import userEvent from "@testing-library/user-event"
import "./closefriend.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);



  useEffect(()=>{
    const getFriends = async ()=>{
      try{
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      }catch(err){
        console.log(err);
      }
    };
    getFriends();
  },[user]);


  return (
    <div className="totalFriends">
    {friends.map((friend)=> (
      <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
    <li className="sidebarFriend">
            <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
    </li>
    </Link>
    ))}
    </div>

  )
}
