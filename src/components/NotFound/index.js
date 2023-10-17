

import './index.css'

const NotFound = ()=>{
    return(
        <div className='not-found-container'>
            <img 
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            alt="Not Found"
            className='not-found-image'

            />
            <h1 className='not-found-heading'>Page Not Found</h1>
            <p className='not-desc'>we're soory, the page you requested could not be found</p>
        </div>
    )
}


export default NotFound;