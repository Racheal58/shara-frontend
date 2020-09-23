import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import Nav from '../../components/Nav';
import FadeOut from '../../components/Loader/FadeOut';

// actions
import { register } from '../../store/modules/auth';

// styles
import './index.scss';

//utils
import country from '../../utils/country';

const CountryOptions = country.map(item => {
  return (
    <option key={`${item.phoneCode} ${item.value}`} value={item.phoneCode}>
      {item.map} {`+${item.phoneCode}`}
    </option>
  );
});

const Registration = props => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneCode, setPhoneCode] = React.useState(
    country.find(item => item.code === 'NG').phoneCode,
  );
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    await setDisabled(true);

    const { history } = props;
    let redirectUrl;

    localStorage.getItem('redirectUrl')
      ? (redirectUrl = localStorage.getItem('redirectUrl'))
      : (redirectUrl = '/products');

    await props.register(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: `+${phoneCode}${phone.substring(1)}`,
      },
      history,
      redirectUrl,
    );
    await setPassword('');
  };

  const handleSelectChange = async ({ target: { value } }) => {
    await setPhoneCode(value);
  };

  const handlePhoneNumberChange = async ({ target: { value } }) => {
    if (/^[0-9]+$/.test(value)) {
      return await setPhone(value);
    }
    await setPhone(phone);
  };

  return (
    <section className="auth-container register">
      <Nav />
      <div className="d-flex justify-content-center align-items-center bg-transparent h-100">
        <form className="form bg-transparent" onSubmit={e => onSubmit(e)}>
          <p className="title text-center">Sign Up.</p>
          <div className="form-group">
            <label className="label" htmlFor="exampleInputEmail1">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              pattern="[a-zA-Z0-9]+"
              onChange={e => {
                setFirstName(e.target.value);
              }}
              required
              value={firstName}
              disabled={disabled}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="exampleInputEmail1">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              pattern="[a-zA-Z0-9]+"
              onChange={e => {
                setLastName(e.target.value);
              }}
              required
              value={lastName}
              disabled={disabled}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-3 col-md-3">
              <label className="label" htmlFor="inputZip">
                Country
              </label>
              <select
                value={phoneCode}
                onChange={handleSelectChange}
                id="inputState"
                className="form-control"
              >
                {CountryOptions}
              </select>
            </div>
            <div className="form-group col-9 col-md-9">
              <label className="label" htmlFor="exampleInputPassword1">
                Phone number
              </label>
              <input
                type="tel"
                className="form-control"
                id="exampleInputPassword1"
                onChange={e => handlePhoneNumberChange(e)}
                required
                value={phone}
                disabled={disabled}
              />
            </div>
          </div>
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
              pattern="^(?=.*?[a-z])(?=.*?[0-9]).{6,}$"
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
              Already have an account?{' '}
              <Link to="/authenticate" className="text-custom text-underline">
                Log In
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

export default connect(mapStateToProps, { register })(Registration);
