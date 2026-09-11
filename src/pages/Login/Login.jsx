import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import './Login.css';

// Visual only — there is no real authentication yet. Submitting the form
// simply moves the user forward to Role Selection.
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
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
            <Input icon={Mail} type="text" placeholder="Email / Username" required />
          </div>

          <div className="login__field">
            <Input
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
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
