import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
    Button
  } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Navbar = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const getUser = async()=>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const res = await axios.get(`http://localhost:8000/api/v1/user/get`, { headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            } });
            if(res.status === 200){
                console.log("user--->", res.data);
                setUser(res.data.user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getUser();
    }, [])
    
    return (
        <div style={{width:"100Vw"}}>
            
            <div style={{display:'flex', justifyContent:'end', background:'gray', paddingRight:'20px'}}>
                {
                    user?.name ? <>
                    <Button m={1}>{user.name}</Button> 
                    <Button m={1} onClick={()=>{localStorage.removeItem('token'); navigate('/login')}}>LogOut</Button> 
                    
                    </>
                        : <>
                            <Button m={1}>Login</Button>
                            <Button m={1}>Sign-Up</Button>
                        </>
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar