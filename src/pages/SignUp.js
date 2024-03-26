import React from 'react';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';
import CardInput from '../components/SignUpComponents/CardInput';

function SignUp() {
  return (
    <div className="container">
      <div className="sign__up">
        <div className="sign__up__title">
          <h1>Sign Up</h1>
        </div>
        <div className="sign__up__instruction">
          <p>Fill in all Fields</p>
        </div>
        <div className="sign__up__form">
          <form>
            <FileInput />
            <DataInput />
            <CardInput />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
