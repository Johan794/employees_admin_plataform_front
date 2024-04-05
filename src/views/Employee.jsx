import React from "react";
import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { getEmployee } from "../services/EmployeeService";
import { useParams } from "react-router-dom";

export default function Employee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        getEmployee(id).then((response) => {
            if (response.status === 200) {
                setEmployee(response.data);
            }
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {employee && <EmployeeCard employee={employee} />}
        </div>
    );
}
