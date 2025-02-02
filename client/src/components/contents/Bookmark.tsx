import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { AxiosError } from 'axios';
import { GetIsBookmark, PostBookmark } from '../../api/api';
import useIsLoggedIn from './../../hooks/useIsLoggedIn';
import { S_IconWrapper } from '../../styles/style';
import BookmarkLoading from '../ui/exceptions/BookmarkLoading';
import { notifyError, notifyWithIcon } from '../../utils/notify';

function Bookmark({ contentId }: { contentId: string }) {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <BsHeart
            color="white"
            size="35"
            onClick={() => notifyError('로그인 후 이용 가능합니다')}
          />
          <p>찜</p>
        </div>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, isSuccess, error } = useQuery(
    ['isBookmarked', contentId],
    () => GetIsBookmark(contentId),
    {
      enabled: isLoggedIn,
    }
  );

  const BookmarkMutation = useMutation({
    mutationFn: (contentId: string) => PostBookmark(contentId),
    onSuccess: () => {
      if (!data) {
        notifyWithIcon('찜 완료!', '❤️');
      } else {
        notifyWithIcon('찜 취소..', '🤍');
      }
      queryClient.invalidateQueries(['isBookmarked', contentId]);
      queryClient.invalidateQueries(['userContents']);
    },
  });

  const handleBookmark = () => {
    if (!BookmarkMutation.isLoading) {
      BookmarkMutation.mutate(contentId);
    }
  };

  if (isLoading) {
    return <BookmarkLoading />;
  }

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
  }

  if (isSuccess) {
    return (
      <S_IconWrapper>
        <div>
          {data ? (
            <BsHeartFill
              color="white"
              size="34"
              className="isTrue"
              onClick={handleBookmark}
            />
          ) : (
            <BsHeart color="white" size="35" onClick={handleBookmark} />
          )}
          <p className={data ? 'isTrue' : ''}>찜</p>
        </div>
      </S_IconWrapper>
    );
  }
}

export default Bookmark;
