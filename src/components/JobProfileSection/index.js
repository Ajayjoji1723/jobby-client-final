import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Audio } from "react-loader-spinner";
import Cookies from "js-cookie";
import JobCard from "../Jobcard";
import JobFilterGroup from "../JobFilterGroup";
import './index.css';

const employemnetTypeList = [
  {
    label: "Full Time",
    employemnetTypeId: "FULL TIME",
  },
  {
    label: "Part Time",
    employemnetTypeId: "PART TIME",
  },
  {
    label: "Freelance",
    employemnetTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employemnetTypeId: "INTERNSHIP",
  },
];

const salaryRangeList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobProfileSection = () => {
  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [employementType, setEmployementType] = useState([]);
  const [salaryRange, setSalaryRange] = useState(0);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getJobDetails();
  }, [employementType, salaryRange, searchInput]);

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:4444/api/filterjobs?employement_type=${employementType.join()}&minimum_package=${salaryRange}&search=${searchInput}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        setJobs(data);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (e) {
      console.log(e);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onChangeSalary = (salary) => {
    setSalaryRange(salary);
  };

  const onChangeEmploymentType = (type) => {
    setEmployementType((prev) => [...prev, type]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      getJobDetails();
    }
  };

  const renderJobDetails = () => {
    const jobDisplay = jobs.length > 0;

    return jobDisplay ? (
      <div className="details-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onKeyDown}
            value={searchInput}
          />
          <button
            type="button"
            className="search-button"
            onClick={getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-details-item-container">
          {jobs.map((eachJob) => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onKeyDown}
          />
          <button
            type="button"
            className="search-button"
            onClick={getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-jobs"
          alt="no jobs found"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We Could not found any jobs. Try other filters.
        </p>
      </div>
    );
  };

  const renderFailureView = () => (
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
    </div>
  );

  const renderLoaderView = () => (
     <div className="profile-loader-container">
      <Audio
        height="50"
        width="50"
        type="ThreeDots"
        color="#fffff"
      />
    </div>
);
 

  const renderJobPfrofileSection=()=>{
    switch(apiStatus){
        case apiStatusConstants.success:
            return renderJobDetails();
        case apiStatusConstants.failure:
            return renderFailureView();
        case apiStatusConstants.inProgress:
            return renderLoaderView();
        default:
            return null;
    }
  }


  console.log(employementType,"emplType")

  return (
    <div className="job-details-container">
        <div className="render-group-items">
            <JobFilterGroup
            employmentTypesList = {employemnetTypeList}
            salaryRangeList={salaryRangeList}
            changeEmploymentType={onChangeEmploymentType}
            changeSalary = {onChangeSalary}
            searchInput={searchInput}
            getJobDetails = {getJobDetails}
            />
        </div>
        <div className="responsive-items">{renderJobPfrofileSection()}</div>
    </div>
  );
};

export default JobProfileSection;
