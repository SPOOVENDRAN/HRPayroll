import { useParams } from "react-router-dom";
import EmployeeDashboard from "./EmployeeDashboard";
import { useState , useEffect } from "react";

function EmployeeData(){

    let {empid} = useParams();
    let [employeeDetail , Setemployeedetails] = useState(null);
    useEffect( () => {
        fetch(`http://localhost:8080/employee/print?empid=${empid}`)
        .then((response) => response.json())
        .then((data) => {Setemployeedetails(data)})
        .catch((e) => console.log(e))
    },[empid]);

    if(!employeeDetail){
        return <div>Loading employee data...</div>;
    }

    
    return(
        <EmployeeDashboard
      name={employeeDetail.name}
      designation={employeeDetail.designation}
      employeeId={employeeDetail.empid}
      email={employeeDetail.email}
      phone={employeeDetail.phone}
      department={employeeDetail.department}
      manager={employeeDetail.manager}
      location={employeeDetail.location}
      joiningDate={employeeDetail.joiningDate}
      employmentType={employeeDetail.employmentType}
    />
    )
}

export default EmployeeData;