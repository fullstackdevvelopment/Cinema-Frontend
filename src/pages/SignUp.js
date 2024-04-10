import React from 'react';
import FileInput from '../components/SignUpComponents/FileInput';
import DataInput from '../components/SignUpComponents/DataInput';
import CardInput from '../components/SignUpComponents/CardInput';
import Wrapper from '../components/commons/Wrapper';

function SignUp() {
  return (
    <Wrapper>
      <div className="sign__up">
        <div className="container">
          <div className="sign__up__page">
            <div className="sign__up__title">
              <h1>Sign Up</h1>
            </div>
            <div className="sign__up__instruction">
              <p>Fill in all Fields</p>
            </div>
            <div className="sign__up__form">
              <form id="signUp">
                <FileInput />
                <DataInput />
                <CardInput />
              </form>
            </div>
          </div>
          <div className="sign__up__btn">
            <button className="orange__btn" type="submit" form="signUp">Done</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SignUp;
