import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';

const OttBtn = () => {
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genre = new URLSearchParams(location.search).get('genre');

  const urlData = {
    Netflix: ott?.includes('Netflix') ? 'Netflix' : '',
    'Disney Plus': ott?.includes('Disney Plus') ? 'Disney Plus' : '',
    Watcha: ott?.includes('Watcha') ? 'Watcha' : '',
    wavve: ott?.includes('wavve') ? 'wavve' : '',
    Tving: ott?.includes('Tving') ? 'Tving' : '',
  };
  const [selectedOtt, setSelectedOtt] = useState(urlData);
  const navigate = useNavigate();

  const handleBtnClick = (e: React.MouseEvent<EventTarget>) => {
    const ott = (e.target as HTMLImageElement).alt;
    if (
      ott === 'Netflix' ||
      ott === 'Disney Plus' ||
      ott === 'Watcha' ||
      ott === 'wavve' ||
      ott === 'Tving'
    ) {
      if (selectedOtt[ott] === '') {
        setSelectedOtt((prev) => ({ ...prev, [ott]: ott }));
      } else {
        setSelectedOtt((prev) => ({ ...prev, [ott]: '' }));
      }
    }
  };

  useEffect(() => {
    const genreValue = genre ? `genre=${genre}` : '';
    const ottValue = Object.values(selectedOtt);
    if (ottValue.every((str) => str === '')) {
      navigate(`${path}?${genreValue}`);
    } else {
      const selectedOtt = ottValue.filter((str) => str !== '').join(',');
      navigate(`${path}?${genreValue}&ott=${selectedOtt}`);
    }
  }, [selectedOtt]);

  if (path === '/tv' || path === '/movie') {
    return (
      <>
        <S_Ott
          src={netflix}
          alt="Netflix"
          onClick={() => navigate(`${path}/list?ott=Netflix`)}
        />
        <S_Ott
          src={disney}
          alt="Disney Plus"
          onClick={() => navigate(`${path}/list?ott=Disney Plus`)}
        />
        <S_Ott
          src={watcha}
          alt="Watcha"
          onClick={() => navigate(`${path}/list?ott=Watcha`)}
        />
        <S_Ott
          src={wavve}
          alt="wavve"
          onClick={() => navigate(`${path}/list?ott=wavve`)}
        />
        <S_Ott
          src={tving}
          alt="Tving"
          onClick={() => navigate(`${path}/list?ott=Tving`)}
        />
      </>
    );
  }

  return (
    <>
      <S_Ott
        src={netflix}
        alt="Netflix"
        className={selectedOtt.Netflix ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={disney}
        alt="Disney Plus"
        className={selectedOtt['Disney Plus'] ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={watcha}
        alt="Watcha"
        className={selectedOtt.Watcha ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={wavve}
        alt="wavve"
        className={selectedOtt.wavve ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={tving}
        alt="Tving"
        className={selectedOtt.Tving ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
    </>
  );
};

export default OttBtn;

const S_Ott = styled.img`
  box-shadow: var(--shadow-box-m-25);
  margin-right: 15px;
  cursor: pointer;

  &.dark {
    filter: saturate(0);
    opacity: 0.8;
  }
`;
