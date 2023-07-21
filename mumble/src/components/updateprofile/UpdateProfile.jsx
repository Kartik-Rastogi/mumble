import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function UpdateProfile() {

    const {user} = useContext(AuthContext);
    const [file,setFile] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser,isFetching, dispatch} = useContext(AuthContext);
    const username = useParams().username;
  
    const handleClicked = async (e) => {
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
        }catch(err){
            console.log(err);
        }
      }
    
  return (
    <div>
      <form className="updateUsername" onSubmit={handleClicked}>
      <input type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
