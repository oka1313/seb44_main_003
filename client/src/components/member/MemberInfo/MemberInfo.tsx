import { styled } from 'styled-components';
import MemberProfile from './MemberProfile';
import Information from './Information';
import DeleteMember from './DeleteMember';

function MemberInfo() {
  return (
    <S_Wrapper>
      <MemberProfile />
      <Information />
      <DeleteMember />
    </S_Wrapper>
  );
}

export default MemberInfo;

const S_Wrapper = styled.div`
  display: flex;
  width: 100%;
  color: white;
  margin-top: 65px;
`;
