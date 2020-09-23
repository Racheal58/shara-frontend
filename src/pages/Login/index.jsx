import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import Nav from '../../components/Nav';
import FadeOut from '../../components/Loader/FadeOut';

// actions
import { authenticate } from '../../store/modules/auth';

// styles
import './index.scss';

const Authentication = props => {
  const { history } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    await setDisabled(true);

    let redirectUrl;

    localStorage.getItem('redirectUrl')
      ? (redirectUrl = localStorage.getItem('redirectUrl'))
      : (redirectUrl = '/admin');

    await props.authenticate({ email, password }, history, redirectUrl);
    await setPassword('');
    await setDisabled(false);
  };

  return (
    <section className="auth-container login">
      <Nav />
      <div className="d-flex justify-content-center align-items-center bg-transparent h-100">
        <form className="form bg-transparent" onSubmit={e => onSubmit(e)}>
          <p className="title text-center">Log In.</p>
          <p className="sub-text">
            Welcome back, Please log in to your account
          </p>
          <div className="form-group">
            <label className="label" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={e => {
                setEmail(e.target.value);
              }}
              required
              value={email}
              disabled={disabled}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="exampleInputPassword1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              // pattern="^(?=.*?[a-z])(?=.*?[0-9]).{6,}$"
              // minLength="4"
              onChange={e => {
                setPassword(e.target.value);
              }}
              required
              value={password}
              disabled={disabled}
            />
          </div>
          <button
            type="submit"
            className="btn btn-custom btn-lg w-100 mb-3 d-flex justify-content-center"
          >
            {props.isLoading ? <FadeOut /> : 'Submit'}
          </button>
          <div>
            <p className="text-center">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-custom text-underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = ({ auth: { isLoading } }) => ({
  isLoading,
});
export default connect(mapStateToProps, { authenticate })(Authentication);
