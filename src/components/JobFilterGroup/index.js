import ProfileDetails from "../ProfileDetails";
import './index.css';


const JobFilterGroup = (props)=>{
    
    const getEmploymentTypeList = () => {
        const {employmentTypesList} = props
    
        return employmentTypesList.map(employ => {
          const {changeEmploymentType, getJobDetails} = props
          const onChangeEmployType = event =>
            changeEmploymentType(event.target.value)
    
          return (
            <li
              className="checkbox-list-items"
              key={employ.employemnetTypeId}
              onChange={onChangeEmployType}
            >
              <input
                type="checkbox"
                className="check-radio"
                id={employ.employemnetTypeId}
                value={employ.employemnetTypeId}
              />
              <label htmlFor={employ.employemnetTypeId} className="check-label">
                {employ.label}
              </label>
            </li>
          )
        })
      }
    
      const renderEmploymentType = () => (
        <div className="salary-container">
          <h1 className="salary-heading">Type of Employment</h1>
          <ul className="salary-range-container">{getEmploymentTypeList()}</ul>
        </div>
      )
    
   
    const getSalaryRangeList = ()=>{
        const {salaryRangeList} = props;

        return salaryRangeList.map(salary=>{
            const {changeSalary} = props;

            const onChangeSalary = ()=>(changeSalary(salary.salaryRangeId))
                return(
                    <li className="checkbox-list-items"
                    key={salary.salaryRangeId}
                    onChange={onChangeSalary}
                    >
                        <input 
                        type="radio"
                        className="check-radio"
                        id={salary.salaryRangeId}
                        name={salary}
                        
                        />
                        <label htmlFor={salary.salaryRangeId} className="check-label">{salary.label}</label>
                        

                    </li>
                )
            }

        )
    }

    const renderSalaryRange=()=>(
        <div className="salary-container">
            <h1 className="salary-heading">Salary Range</h1>
            <ul className="salary-range-container">{getSalaryRangeList()}</ul>
        </div>
    )


    return(
        <div className="job-filter-group">
            <ProfileDetails />
            <hr className="horizontal-line"/>
            {renderEmploymentType()}
            <hr className="horizontal-line"/>
            {renderSalaryRange()}
        </div>
    )
}

export default JobFilterGroup;