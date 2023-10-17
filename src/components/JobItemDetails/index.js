import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import { AiFillStar } from "react-icons/ai";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import {BsBriefcaseFill} from 'react-icons/bs';
import {BiLinkExternal} from 'react-icons/bi'
import {GoLocation} from 'react-icons/go';
import { Audio } from "react-loader-spinner";
import Header from "../Header";
import SimilarJobItem from '../SimilarJobDetails';
import SkillsCard from '../SkillsCard'
import './index.css';

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
  };


const JobItemDetails =()=>{
    let navigate = useNavigate();
    const {id} = useParams();

    const [jobItemDeatils, setJobItemDetails ] = useState({});
    const [similarJobs, setSmiliarJobs] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    
    useEffect(()=>{
        const token = Cookies.get('jwt_token');
        if(token === undefined){
            navigate('/auth')
        }
        getJobDetails()
    },[])

    const getJobDetails = async ()=>{
        setApiStatus(apiStatus.inProgress)

        const jwtToken = Cookies.get('jwt_token');
        const url = `http://localhost:4444/api/jobs/${id}`;
        const oprtions = {
            headers:{
                Authorization: `Bearer ${jwtToken}`
            },
            method:'GET'
        }

        const response = await fetch(url, oprtions);
        
        if(response.ok === true){
            const data = await response.json();
            setJobItemDetails(data.jobDetails)
            setSmiliarJobs(data.similarJobs)
            setApiStatus(apiStatusConstants.success)
        }else{
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const renderLoaderView = () => {
        <div className="profile-loader-container">
          <Audio
            height="50"
            width="50"
            type="ThreeDots"
            color="#fffff"
          />
        </div>;
      };


      const renderFailureView = () => {
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-view"
          />
          <h1 className="failure-heading">Ooops something went wrong</h1>
          <p className="failure-desc">
            we cannot find the page you are looking for.
          </p>
          <button
            type="button"
            className="jobs-failure-button"
            onClick={getJobDetails}
          >
            Retry
          </button>
        </div>;
      };

      console.log(jobItemDeatils)
    
      const renderJobItemDetails = ()=>{
        const {companyLogoUrl, companyWebsiteUrl,employmentType,jobDescription,lifeAtCompany,location,packagePerAnnum,rating,skills,title} = jobItemDeatils
        const {description, imageUrl} = lifeAtCompany
        return(
          <div className="full-job-item-container">
        <div className="job-items-container">
          <div className="logo-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-justify"
            />
            <div className="title-container">
              <h1 className="company-title-head">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="count-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="location-desc">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="location-logo-brief" />
                <p className="location-desc">{employmentType}</p>
              </div>
            </div>
            <p className="package-desc">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="desc-heading">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl} target='_blank'>
              Visit
              <BiLinkExternal className="bi-link" />
            </a>
          </div>
          <p className="job-story-desc">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-container">
            {skills.map((eachSkill) => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-company-heading">Life at company</h1>
          <div className="life-at-company-container">
            <p className="life-company-desc">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-logo"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-cards">
          {similarJobs.map((eachItem) => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
        )
      }

      const renderJobViews =()=>{
        switch(apiStatus){
          case apiStatusConstants.success:
            return renderJobItemDetails();
          case apiStatusConstants.inProgress:
            return renderLoaderView();
          case apiStatusConstants.failure:
            return renderFailureView();
          default :
          return null;
        }
      }

    return(
        <>
         <Header />
         <div className="get-products-details-container">
         {renderJobViews()}
          </div>  
        </>
    )
}

export default JobItemDetails;