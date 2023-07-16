import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';

function GenreBtn() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genre = new URLSearchParams(location.search).get('genre');
  const genres = [
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
    '역사',
    '전쟁',
    '서부',
    '다큐멘터리',
    'Reality TV',
    'Made in Europe',
  ];
  const genreBtnRef = useRef(null);

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setSelectedGenre(e.target.value);

    if (path === '/tv' || path === '/movie') {
      return navigate(`${path}/list?genre=${selected}`);
    }
    let navigateUrl = `${path}?genre=${selected}${
      ott !== null ? `&ott=${ott}` : ''
    }`;
    navigate(navigateUrl);
  };

  const handleGenreClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      genreBtnRef.current &&
      !(genreBtnRef.current as HTMLDivElement).contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (genre) {
      setIsOpen(true);
    }
  }, [selectedGenre]);

  return (
    <GenreBtnContainer ref={genreBtnRef}>
      <S_GenreBtn onClick={handleGenreClick}>
        장르 검색
        <IoIosArrowDown size={30} />
      </S_GenreBtn>
      {isOpen && (
        <S_LabelWrapper>
          {Array.from({ length: Math.ceil(genres.length / 4) }).map(
            (_text, index) => (
              <S_LabelRow key={index}>
                {genres
                  .slice(index * 4, (index + 1) * 4)
                  .map((text, innerIndex) => (
                    <S_Label
                      key={innerIndex}
                      flexgrow={text === 'Made in Europe' ? '1' : '0'}
                    >
                      <S_Input
                        type="checkbox"
                        value={text}
                        checked={selectedGenre === text}
                        onChange={handleGenreChange}
                      />
                      <S_Text>{text}</S_Text>
                    </S_Label>
                  ))}
              </S_LabelRow>
            )
          )}
        </S_LabelWrapper>
      )}
    </GenreBtnContainer>
  );
}

export default GenreBtn;

const GenreBtnContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const S_GenreBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: var(--color-white-80);
  cursor: pointer;
  svg {
    margin: 4% 0 0 5px;
  }
`;

const S_LabelWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid gainsboro;
  border-radius: 5px;
  padding: 15px 0px 15px 20px;
  top: 100%;
  left: 10;
  z-index: 10;
  background-color: var(--color-bg-100);

  @media only screen and (max-width: 930px) {
    left: 20px;
  }

  @media only screen and (max-width: 580px) {
    padding: 10px;
    left: 140px;
  }

  @media only screen and (max-width: 500px) {
    padding: 10px;
    left: 20px;
  }
`;

const S_LabelRow = styled.div`
  display: flex;
`;

const S_Label = styled.label<{ flexgrow: string }>`
  width: 130px;
  display: flex;
  align-items: center;
  flex-grow: ${(props) => props.flexgrow};

  @media only screen and (max-width: 580px) {
    width: 80px;
  }
`;

const S_Text = styled.div`
  color: var(--color-white-60);
  padding: 5px 0 5px 15px;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease-out;
  &:hover {
    color: var(--color-white-100);
  }
  input[type='checkbox']:checked + & {
    color: var(--color-primary-gold);
  }

  @media only screen and (max-width: 580px) {
    padding: 10px 10px;
  }
`;

const S_Input = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 4px;
  width: 18px;
  height: 18px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-primary-gold);
  }

  @media only screen and (max-width: 580px) {
    display: none;
  }
`;
