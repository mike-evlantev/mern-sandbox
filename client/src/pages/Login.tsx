import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spinner } from "../components/Spinner";
import { login } from "../features/auth/authSlice";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, success, error } = useAppSelector((state) => state.auth);
  
  React.useEffect(() => {
    if (error) {
      toast.error(error as string);
    }

    if (success || user) {
      navigate('/');
    }    
  }, [user, success, error, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    dispatch(login({ email, password }));
    
  }

  return (
    loading ? <Spinner /> :
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="form-floating mb-3">
        <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
        <label>Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>Log In</button>
    </div>
  )
}
