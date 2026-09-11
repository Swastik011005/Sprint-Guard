import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import './Login.css';

// This is still MOCK authentication — any non-empty email/username +
// password combination succeeds. It exists to establish a real signed-in
// user (see AuthContext) so role selection, RBAC, and session persistence
// have something to attach to; it is not real security.
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setError('');
    navigate('/role-selection');
  }

  return (
    <div className="login">
      <div className="login__panel">
        <div className="login__brand">
          <span className="login__brand-name">SPRINT GUARD</span>
          <span className="login__brand-tagline">Detect. Alert. Resolve. Deliver.</span>
        </div>
        <div className="login__shield">
          <ShieldCheck size={72} strokeWidth={1.5} />
        </div>
      </div>

      <div className="login__form-side">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__heading">Welcome Back!</h1>
          <p className="login__subheading">Login to your account</p>

          <div className="login__field">
            <Input
              icon={Mail}
              type="text"
              placeholder="Email / Username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login__field">
            <Input
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              trailing={
                <button
                  type="button"
                  className="login__visibility-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          {error && (
            <div className="login__error">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <a href="#forgot-password" className="login__forgot">
            Forgot Password?
          </a>

          <Button type="submit" className="login__submit">
            LOGIN
          </Button>

          <div className="login__divider">
            <span />
            <span className="login__divider-text">OR</span>
            <span />
          </div>

          <Button type="button" variant="secondary" className="login__google">
            Login with Google
          </Button>

          <p className="login__footer">
            New to Sprint Guard? <a href="#contact-admin">Contact Admin</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
