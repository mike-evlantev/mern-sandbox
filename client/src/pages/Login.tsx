import React from "react";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSignIn = () => {
    console.log(email, password);
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="form-floating mb-3">
        <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
        <label>Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSignIn}>Sign In</button>
    </div>
  )
}
