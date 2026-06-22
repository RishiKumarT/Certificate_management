import React, { useState } from 'react'

export default function Demo2() {
    // flag is a state obj and setflag is a function to modify the flag value
    const [flag,SetFlag]=useState(false)

    function change(){
        SetFlag(!flag)
    }

  return (
    <div>
        <h1>Conditional Rendering</h1>
        <button onClick={change}>Change</button><br /><br />
        {
            flag?<b>KLU</b>: <b>KLEF</b>
        }
    </div>
  )
}
