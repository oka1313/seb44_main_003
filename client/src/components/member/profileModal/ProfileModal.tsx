import { BiX } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../../recoil/atoms/Atoms';
import DefaultImgs from './DefaultImgs';
import { S_Modal } from '../../../styles/style';
import ImgUpload from './ImgUpload';
import { useState } from 'react';

function ProfileModal() {
  const [isUploading, setIsUploading] = useState(false);
  const setShowModal = useSetRecoilState(profileModalState);
  return (
    <S_Modal>
      <BiX
        onClick={() => {
          setShowModal(false);
        }}
      />
      <h1>프로필 선택</h1>
      <h2>사용할 프로필을 선택해주세요.</h2>
      <div>
        {isUploading ? (
          <ImgUpload />
        ) : (
          <DefaultImgs setIsUploading={setIsUploading} />
        )}
      </div>
    </S_Modal>
  );
}

export default ProfileModal;
