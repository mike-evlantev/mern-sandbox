export const Login: React.FC = () => {
  const handleSignIn = () => console.log('Sign In Clicked!');
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="form-floating mb-3">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label>Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSignIn}>Sign In</button>
    </div>
  )
}
