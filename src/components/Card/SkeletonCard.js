import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import { ThemeContext } from 'contexts/ThemeContext';

const Wrapper = styled.div`
  width: 100%;
  max-width: 320px;
  min-height: 380px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.element};
  border-radius: 8px;
  transition: 0.3s;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
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

const SkeletonCard = ({ visible }) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <Wrapper visible={visible ? 1 : 0}>
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

SkeletonCard.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default SkeletonCard;