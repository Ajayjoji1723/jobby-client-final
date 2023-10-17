import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header";
import './index.css'
import Cookies from "js-cookie";

const Home =()=>{

    let navigate = useNavigate();
    

    useEffect(()=>{
        const token = Cookies.get('jwt_token');
        if(token === undefined){
            navigate("/auth")
         }
    })

    

    return(
        <>
            <Header />   
            <div className="home-container">
                <div className="responsive-container">
                    <h1 className="main-heading">Find The Job That Fits Your Life</h1>
                    <p className="job-desc">
                        Millions of people searching for jobs, slaary informaton,company reviews. find the job that fits your abilities and potential.
                    </p>
                    <Link to="/jobs" className="link-item">
                    <button type="button" className="find-jobs ">Find Jobs</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;