import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
  width: 80vw;
`;
const ConfirmBtn = styled.button`
  align-self: flex-end;
  margin: 20px;
  margin-top: 50px;
  margin-right: 150px;
`;
const Input = styled.input`
  margin-left: 15px;
`;
const MessageDiv = styled.div`
  margin-left: 10px;
  color: red;
  font-weight: bold;
`;
const RegExp = /^[a-zA-Z0-9]{4,12}$/;
const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

function Signin() {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');

  const [onId, setOnId] = useState(true);
  const [onNickname, setOnNickname] = useState(true);
  const [onPwd, setOnPwd] = useState(true);
  const [onCheckPwd, setOnCheckPwd] = useState(true);
  const validId = (event) => {
    setId(event.target.value);
    if (RegExp.test(event.target.value)) {
      setOnId(true);
    } else {
      setOnId(false);
    }
  };
  const validNickname = (event) => {
    setNickname(event.target.value);
    nicknameRegExp.test(event.target.value)? setOnNickname(true):setOnNickname(false);
  };
  const validPwd = (event) => {
    setPwd(event.target.value)
    passwordRegex.test(event.target.value)? setOnPwd(true):setOnPwd(false)
  };
  const validCheckPwd = (event) => {
    setCheckPwd(event.target.value)
    pwd === event.target.value? setOnCheckPwd(true):setOnCheckPwd(false)
  };
  const clickSignUp = () => {
    if (onId && onNickname & onPwd & onCheckPwd) {
      axios
        .post('https://localhost:4000/auth/signup', {
          userId: id,
          nickname: nickname,
          password: pwd,
        })
        .then((resp) =>
          resp.data.message === 'ok'
            ? alert('회원가입 성공')
            : alert('회원가입 실패')
        );
      setId('');
      setNickname('');
      setPwd('');
      setCheckPwd('');
    } else {
      alert('정보가 충족되지 않았습니다.');
    }
  };
  console.log(id, nickname, pwd);

  return (
    <ColDiv>
      <h3>회원가입</h3>
      <RowDiv>
        <div>아이디 :</div>
        <Input type="text" value={id} onChange={validId}></Input>
        {onId ? null : (
          <MessageDiv>아이디는 영문자, 숫자로 된 4~12 길이입니다.</MessageDiv>
        )}
      </RowDiv>
      <RowDiv>
        <div>닉네임 :</div>
        <Input type="text" value={nickname} onChange={validNickname}></Input>
        {onNickname ? null : (
          <MessageDiv>
            닉네임은 영문자, 한글, 숫자로 된 2~10 길이만 가능합니다
          </MessageDiv>
        )}
      </RowDiv>
      <RowDiv>
        <div>비밀번호 :</div>
        <Input type="password" value={pwd} onChange={validPwd}></Input>
        {onPwd ? null : (
          <MessageDiv>
            비밀번호는 영문자, 숫자, 특수문자가 포함된 8자 이상입니다.
          </MessageDiv>
        )}
      </RowDiv>
      <RowDiv>
        <div>비밀번호 확인 :</div>
        <Input type="password" value={checkPwd} onChange={validCheckPwd}></Input>
        {onCheckPwd ? null : <MessageDiv>비밀번호가 맞지 않습니다.</MessageDiv>}
      </RowDiv>
      <ConfirmBtn onClick={clickSignUp}>가입하기</ConfirmBtn>
    </ColDiv>
  );
}

export default Signin;
