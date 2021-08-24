import React from 'react'

export default function AuthForm(props){
    //comes from Auth.js through props
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="password" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button className='button'>{ btnText }</button>
      <p style={{color: 'red'}}>{errMsg}</p>
    </form>
  )
}