import React from 'react'

export default function Demo3() {

    const courses=["OS","OS","AWS","FULLSTACK","MSWD"]
    const count=courses.length || 0


  return (
    <div>
        <h1>No of Courses={count}</h1>
        <table border={2}>
            <tr>
                <th>Sl. No.</th>
                <th>Course</th>
            </tr>
        {
            courses.map( (v,i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{v}</td>
                </tr>
            ))
        }
        </table>
    </div>
  )
}
