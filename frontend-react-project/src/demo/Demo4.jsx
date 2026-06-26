import React, { useState } from 'react'
import empdata from './data.json'
export default function () {

    const [data,setData] =useState(empdata)


  return (
    <div>
        <table>
            <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>SALARY</td>
            </tr>
            {
                data.map((emp,i)=>(
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.salary}</td>
                    </tr>
                ))
            }
        </table>
    </div>
  )
}
