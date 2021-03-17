import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';

const Wrapper = styled.div`
  width: 100%;
  max-width: 320px;
  height: 100%;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.element};
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
`;

const Detail = styled.div`
  margin-bottom: 5px;
`;

const Title = styled(Detail)`
  margin-bottom: 20px;
`;

const Overlay = styled.div`
  overflow: hidden;
`;

const SkeletonCard = () => {
    const { isDarkTheme } = useTheme();
    return (
        <Wrapper>
            <SkeletonTheme
                color={isDarkTheme ? '#495175' : '#e6e6e6'}
                highlightColor={isDarkTheme ? '#545c85' : '#fff'}
            >
                <Overlay>
                    <Skeleton width="100%" height={200} />
                </Overlay>
                <Content>
                    <Title>
                        <Skeleton width="50%" />
                    </Title>
                    <Detail>
                        <Skeleton width="80%" />
                    </Detail>
                    <Detail>
                        <Skeleton width="70%" />
                    </Detail>
                    <Detail>
                        <Skeleton width="60%" />
                    </Detail>
                </Content>
            </SkeletonTheme>
        </Wrapper>
    );
};

export default SkeletonCard;