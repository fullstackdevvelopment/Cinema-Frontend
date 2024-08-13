import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Wrapper from '../components/commons/Wrapper';
import { userData } from '../store/actions/userData';
import FileInputSettings from '../components/Settings/FileInputSettings';
import DataInputSettings from '../components/Settings/DataInputSettings';
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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setErrors({});

    const formData = new FormData();
    if (selectedFile) formData.append('photo', selectedFile);

    const fields = {
      firstName, lastName, email, city, country, address, phone,
    };
    Object.entries(fields).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (currentPassword && newPassword === repeatNewPassword) {
      formData.append('currentPassword', currentPassword);
      formData.append('newPassword', newPassword);
    } else if (currentPassword || newPassword || repeatNewPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatNewPassword: 'Passwords do not match or are missing',
      }));
      toast.error('Passwords do not match or are missing', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const userUpdateResult = await dispatch(userUpdate(formData));
    setLoading(false);

    if (userUpdate.fulfilled.match(userUpdateResult)) {
      if (userUpdateResult.payload.status === 'Data update') {
        toast.success('Your data has been successfully updated', {
          position: 'top-right',
          autoClose: 3000,
        });
        setErrors({});
      } else if (userUpdateResult.payload.status === 'Password update') {
        setErrors({});
        toast.success('Your details have been successfully updated and you will be redirected to the login page', {
          position: 'top-right',
          autoClose: 2000,
        });
        setInterval(() => {
          sessionStorage.removeItem('token');
          navigate('/signIn');
          window.location.reload();
        }, 2000);
      }
    } else if (userUpdateResult.error.message === 'Rejected') {
      if (userUpdateResult.payload === 'Wrong password') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: 'Incorrect Password',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...userUpdateResult.payload.errors,
        }));
      }
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [photo, selectedFile, firstName, lastName, email, city, country, address, phone, currentPassword, newPassword, repeatNewPassword, dispatch]);

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
                setCurrentPassword={setCurrentPassword}
                setNewPassword={setNewPassword}
                setRepeatNewPassword={setRepeatNewPassword}
                currentPassword={currentPassword}
                newPassword={newPassword}
                repeatNewPassword={repeatNewPassword}
              />
            </form>
            <div className="profile__btn">
              <Button
                onClick={handleSubmit}
                type="submit"
                className="orange__btn"
              >
                {loading ? (
                  <ClipLoader color="#fff" className="loading" />
                ) : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
}

export default Settings;
