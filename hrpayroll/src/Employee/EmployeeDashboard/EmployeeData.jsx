import { useParams } from "react-router-dom";
import EmployeeDashboard from "./EmployeeDashboard";
import { useState , useEffect } from "react";

function EmployeeData(){

    let {empid} = useParams();
    let [employeeDetail , Setemployeedetails] = useState(null);
    useEffect( () => {
        fetch(`http://localhost:8080/employee/dashboard?empid=${empid}`)
        .then((response) => response.json())
        .then((data) => {Setemployeedetails(data)})
        .catch((e) => console.log(e))
    },[empid]);

    if(!employeeDetail){
        return <div>Loading employee data...</div>;
    }
    let employeeData = employeeDetail.employee;
    
    
    return(
        <EmployeeDashboard
        name={employeeData.name}
        designation={employeeData.designation}
        employeeId={employeeData.empid}
        email={employeeData.email}
        phone={employeeData.phone}
        department={employeeData.department}
        manager={employeeData.manager}
        location={employeeData.location}
        joiningDate={employeeData.joiningDate}
        employmentType={employeeData.employmentType}
        yearsOfService={employeeData.experience}
        projects={employeeData.total_projects}
        overtime={employeeDetail.overtimeHours}
        salary={employeeDetail.lastMonthSalary}
        upcomingHolidays={2}
        pendingRequests={employeeDetail.pendingRequests}
        leaveBalance={employeeDetail.leaveBalance}
        goalAchievement={employeeDetail.goalAchievement}
        presentDays={employeeDetail.presentDays}
        productivity ={employeeDetail.productivity}
        salaryMonth={employeeDetail.salaryMonth}
        totalDays={employeeDetail.totalDays}
    />
    )
}

export default EmployeeData;