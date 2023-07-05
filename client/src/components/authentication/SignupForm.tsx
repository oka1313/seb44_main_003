import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { HiXCircle } from 'react-icons/hi';
import { PostUser } from '../../api/api';
import { AxiosError } from 'axios';
import { NewMember } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [emailError, setEamilError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };

  function checknickname() {
    if (!nickname) {
      setNicknameError('닉네임을 입력해주세요.');
      return false;
    }
    setNicknameError(null);
    return true;
  }

  function checkEmail() {
    const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email) {
      setEamilError('이메일을 입력해주세요.');
      return false;
    }
    if (!emailRegexp.test(email)) {
      setEamilError('유효하지 않은 이메일 주소입니다.');
      return false;
    }
    setEamilError(null);
    return true;
  }

  function checkPassword() {
    const passwordRegexp =
      /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,}$/;

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    }
    if (!passwordRegexp.test(password)) {
      setPasswordError(
        '비밀번호는 8자 이상, 영숫자를 모두 1자 이상 포함해야 합니다.'
      );
      return false;
    }
    setPasswordError(null);
    return true;
  }

  function checkConfirm() {
    if (!confirm) {
      setConfirmError('비밀번호 확인을 입력해주세요.');
      return false;
    } else if (password !== confirm) {
      setConfirmError('비밀번호 확인이 일치하지 않습니다.');
      return false;
    } else {
      setConfirmError(null);
      return true;
    }
  }

  function validate() {
    return checknickname() && checkEmail() && checkPassword() && checkConfirm();
  }

  const login = () => {};

  const mutation = useMutation({
    mutationFn: (newMember: NewMember) => PostUser(newMember),
    onSuccess(data) {
      if (data.status === 201) {
        login();
        navigate('/');
      }
    },
    onError(error: AxiosError) {
      if (error.response && error.response.status === 400) {
        setSignupError('이미 사용 중인 이메일입니다.');
        console.error('error:  with same data already exist.');
      } else {
        console.error('error:', error);
      }
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupError(null);
    if (validate()) {
      mutation.mutate({
        nickname,
        email,
        password,
        avatarUri:
          'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/248/988c9527e85c5b2f7e13a974ae6714c0_res.jpeg',
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">닉네임</label>
        <input
          name="nickname"
          type="text"
          onChange={handleNickname}
          value={nickname}
          className={nicknameError ? 'error' : undefined}
        />
        <HiXCircle onClick={() => setNickname('')} />
      </div>
      {nicknameError && <div className="error">{nicknameError}</div>}
      <div>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          type="text"
          onChange={handleEmail}
          value={email}
          className={emailError ? 'error' : undefined}
        />
        <HiXCircle onClick={() => setEmail('')} />
      </div>
      {emailError && <div className="error">{emailError}</div>}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlepassword}
          className={passwordError ? 'error' : undefined}
        />
        {showPassword ? (
          <BsEyeFill onClick={() => setShowPassword(false)} />
        ) : (
          <BsEyeSlashFill onClick={() => setShowPassword(true)} />
        )}
      </div>
      {passwordError && <div className="error">{passwordError}</div>}
      <div>
        <label htmlFor="confirm">비밀번호 확인</label>
        <input
          name="confirm"
          type={showConfirm ? 'text' : 'password'}
          onChange={handleConfirm}
          className={confirmError ? 'error' : undefined}
        />
        {showConfirm ? (
          <BsEyeFill onClick={() => setShowConfirm(false)} />
        ) : (
          <BsEyeSlashFill onClick={() => setShowConfirm(true)} />
        )}
      </div>
      {confirmError && <div className="error">{confirmError}</div>}
      {signupError && <div className="error">{signupError}</div>}
      <button type="submit">회원가입하기</button>
    </form>
  );
}

export default SignupForm;
