import "./online.css";
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";


export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser,isFetching, dispatch} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const username = useParams().username;



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
    <li className="rightbarFriend">
    {friends.map((friend)=> (
    <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
      <div className="cdmg">
    <div className="rightbarProfileImgContainer">
      <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.jpg"} alt="" className="rightbarProfileimg" />
      <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{friend.username}</span>
    </div>
    </Link>
    ))}
  </li>
  )
}
