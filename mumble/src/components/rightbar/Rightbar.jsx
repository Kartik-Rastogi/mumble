import React, { useEffect, useRef } from 'react';
import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@mui/icons-material";
import { useParams } from "react-router";


export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [setUser] = useState({});
  const {user:currentUser,isFetching, dispatch} = useContext(AuthContext);
  const [followed,setFollowed] = useState(currentUser.followings.includes(user?.id));
  const username = useParams().username;
  const [file,setFile] = useState(null);

  



  const updateCity = useRef();
  const updateFrom = useRef();
  const updateDesc = useRef();
  const relationship = useRef();




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
  

  const handleClick = async () => {
    try {
     if(followed){
      await axios.put(`/users/${user._id}/unfollow`,{userId: currentUser._id});
      dispatch({type:"UNFOLLOW",payload:user._id})
     }else{
      await axios.put(`/users/${user._id}/follow`,{userId: currentUser._id});
      dispatch({type:"FOLLOW",payload:user._id})
     }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const handleClicked = async (e) => {
    e.preventDefault();
    const user = {
      _id: currentUser._id,
      city: updateCity.current.value,
      from: updateFrom.current.value,
      desc: updateDesc.current.value,
      relationship: relationship.current.value,
    }
    try{
      await axios.put(`/users/${user._id}`,{user,userId:user._id});
      console.log(user);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const handlePic = async (e) => {
    e.preventDefault();
    const user = {
      _id: currentUser._id,
    };

    if(file){
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        user.profilePicture = fileName;
        try{
          await axios.post("/upload", data);
        }catch(err){
          console.log(err);
        }
      }
  
    try{
        await axios.put(`/users/${user._id}`,{user,userId:user._id});
        console.log(user);
        window.location.reload();
    }catch(err){
        console.log(err);
    }
  }

  
  const HomeRightbar = () => {
    return(
      <>
      <div className="homeRtbr">
        <div className="birthdayContainer">
            <img src="assets/gift.png" alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Kartik</b> and <b>3 others</b> have birthday today.</span>
        </div>
          <img src="assets/ad1.jpg" alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            
              <Online/>
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () =>{
    return (
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user.relationship ===1
           ? "Single" 
           : user.relationship ===2 
           ? "Married" 
           : "-"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
            {friends.map((friend)=> (
              <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
          <div className="rightbarFollowing">
            <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.jpg"} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
            ))}
      </div>
      <p>Update Profile</p>
      {user.username === currentUser.username && (
      <div className="rightbarUpdateProfile">
        <form action="" className="rightbarUpdateForm" onSubmit={handleClicked}>
          <input ref={updateCity} type="text" placeholder="City" required className="city" />
          <input ref={updateFrom} type="text" placeholder="From" required className="from" />
          <input ref={updateDesc} type="text" placeholder="Description" required className="description" />
          <select className="relationship" ref={relationship}>
              <option value="1">Single</option>
              <option value="2">Married</option>
          </select>

          <button type="submit" className="rightbarSubmit">Update</button>
        </form>
        <form action="" className="rightbarUpdateForm" onSubmit={handlePic}>
        <input type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="submit" className="rightbarSubmit">Update</button>
        </form>

      </div>
      )};
      </>
    )
  }
  return (
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
  );
}
