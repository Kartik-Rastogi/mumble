import React, { useEffect, useState } from 'react';
import "./sidebar.css"
import {RssFeed, Chat, PlayCircle, Group, Bookmarks, LiveHelp, Work, EventNote, School} from "@mui/icons-material";
import {Users} from "../../dummyData";
import CloseFriend from "../closefriend/CloseFriend";
import { useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';


export default function Sidebar() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const params = useParams()
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`/users?username=${username}`);
      setUser(res.data)
    };
    fetchUser();
  }, [username]);
  




  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed htmlColor="SlateBlue" className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat htmlColor="tomato" className="sidebarIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li><li className="sidebarListItem">
            <PlayCircle htmlColor="mediumturquoise" className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group htmlColor="springgreen" className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmarks htmlColor="crimson" className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <LiveHelp htmlColor="goldenrod" className="sidebarIcon"/>
            <span className="sidebarListItemText">FAQ</span>
          </li>
          <li className="sidebarListItem">
            <Work htmlColor="deepskyblue" className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventNote htmlColor="purple" className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School htmlColor="chocolate" className="sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map(u=>(
            <CloseFriend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
