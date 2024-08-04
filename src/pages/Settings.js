import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCircle } from 'react-icons/fa';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Wrapper from '../components/commons/Wrapper';
import { userData } from '../store/actions/userData';
import FileInputSettings from '../components/Settings/FileInputSettings';
import DataInputSettings from '../components/Settings/DataInputSettings';
import map from '../assets/images/map.png';
import { userUpdate } from '../store/actions/userUpdate';

function Settings() {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem('token');

  useEffect(() => {
    if (!userToken) {
      navigate('/signIn');
    }
  }, [userToken, navigate]);

  const data = useSelector((state) => state.userData.data.user);
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userData(userToken));
  }, [userToken, dispatch]);

  useEffect(() => {
    if (data) {
      setPhoto(data.photo || null);
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email || '');
      setCity(data.city || '');
      setCountry(data.country || '');
      setAddress(data.address || '');
      setPhone(data.phone || '');
    }
  }, [data]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('address', address);
    formData.append('phone', phone);
    const userUpdateResult = await dispatch(userUpdate(formData));

    if (userUpdate.fulfilled.match(userUpdateResult)) {
      toast.success('Your data has been successfully updated', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (userUpdateResult.error.message === 'Rejected') {
      const apiErrors = userUpdateResult.payload.errors;
      setErrors({
        ...apiErrors,
      });
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [photo, firstName, lastName, email, city, country, address, phone]);

  return (
    <Wrapper>
      <div className="profile">
        <div className="container">
          <div className="profile__page">
            <p>Profile</p>
            <form id="signUp" onSubmit={handleSubmit}>
              <FileInputSettings
                photo={data?.photo}
                setPhoto={setPhoto}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
              <DataInputSettings
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setCity={setCity}
                setCountry={setCountry}
                setAddress={setAddress}
                setPhone={setPhone}
                firstName={firstName}
                lastName={lastName}
                email={email}
                city={city}
                country={country}
                address={address}
                phone={phone}
                errors={errors}
              />
            </form>
            <div className="buyTicket__stages__payment__card__content">
              <div className="buyTicket__stages__payment__card__content__block">
                <img src={map} alt="map" />
                <div className="card__view">
                  <p>VISA</p>
                </div>
                {data && (
                  <>
                    <div className="card__number">
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span><FaCircle /></span>
                      <span>{data?.cards[0]?.cardNumber.charAt(12)}</span>
                      <span>{data?.cards[0]?.cardNumber.charAt(13)}</span>
                      <span>{data?.cards[0]?.cardNumber.charAt(14)}</span>
                      <span>{data?.cards[0]?.cardNumber.charAt(15)}</span>
                    </div>
                    <div className="card__owner">
                      <div className="card__owner__name">
                        <p>{data?.cards[0]?.cardHolderName}</p>
                      </div>
                      <div className="card__owner__date">
                        <p>{data?.cards[0]?.expirationDate.slice(0, 2)}</p>
                        <span>/</span>
                        <p>{data?.cards[0]?.expirationDate.slice(2)}</p>
                      </div>
                      <div className="card__owner__cvc">
                        <p>{data?.cards[0]?.cvv}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="profile__btn">
              <Button onClick={handleSubmit} type="submit" className="orange__btn">Send</Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default Settings;
