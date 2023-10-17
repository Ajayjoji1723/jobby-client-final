import React, { useState, useEffect } from 'react';
import {Audio} from 'react-loader-spinner';
import Cookies from 'js-cookie';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

function ProfileDetails() {
  const [profileList, setProfileList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get('jwt_token');
    const url = 'http://localhost:4444/auth/profile';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
      
        setProfileList(data);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderProfileDetails = () => {
    const { name } = profileList;

    return (
      <div className="profile-container">
        <img src="https://res.cloudinary.com/dhpkv1tec/image/upload/v1695203821/natural%20places/3135768_oyq8qx.png" alt="profile" className="profile-logo" />
        <h1 className="name-heading">{name}</h1>
        <p className="bio">Full Stack Dveloper</p>
      </div>
    );
  };

  const renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Audio type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={getProfileDetails}
      >
        Retry
      </button>
    </div>
  );

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderProfileDetails();
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
}

export default ProfileDetails;