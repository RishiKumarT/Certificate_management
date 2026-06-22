import React, { useState } from 'react'

export default function Demo1() {

    //"count" is state variable
    //"setCount" is a method to modify count value
    const [count,setCount]=useState(0)

    function increment(){
        //alert("increment")
        setCount(count+1)
    }
    function decrement(){
        //alert("decrement")
        setCount(count-1)
    }



  return (
    <div>
        <h2>Counter App</h2>

        COUNT={count}<br/>
        <button onClick={increment}>Increment</button><br/>
        <button onClick={decrement}>Decrement</button>
    </div>
  )
}
