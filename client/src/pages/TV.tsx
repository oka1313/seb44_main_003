import Banner from '../components/banner/Banner';
import SildeTV from '../components/silde/SildeTV';
import image from '../assets/이번생도잘부탁해.webp';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';

const TV = () => {
  const genres: string[] = [
    '액션',
    '드라마',
    'SF',
    '스릴러',
    '애니메이션',
    '코미디',
    '가족',
    '판타지',
    '로맨스',
    '공포',
    '범죄',
    '스포츠',
    '음악',
    'Made in Europe',
    'Reality TV',
    '역사',
    '다큐멘터리',
    '전쟁',
    '서부'
  ];

  return (
    <S_Wrapper>
      <Banner image={image} />
      <ListBtns />
      {genres.map((genre) => (
        <>
          <S_GenreTitle>{genre}</S_GenreTitle>
          <SildeTV genre={genre}/>
        </>
      ))}
    </S_Wrapper>
  );
};

export default TV;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const S_GenreTitle = styled.h2`
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;
