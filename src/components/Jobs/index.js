import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import './index.css'
import JobProfileSection from "../JobProfileSection";

const Jobs =()=>{
    let navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('jwt_token');
        if(token === undefined){
            navigate("/auth")
         }
    })

    return(
        <>
            <Header/>
            <div className="job-profile-container">
                <JobProfileSection/>
            </div>
        </>
    )
}

export default Jobs;