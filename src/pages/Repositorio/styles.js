import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    margin: 80px auto;
    color: #333;
`;

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;

  img{
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    color: #0d2636;
    text-align: center;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #aaa;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const RepoInfo = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #fff;
  }

  p {
    font-size: 14px;
    color: #aaa;
  }
`;

export const BackButton = styled(Link)`
  background: transparent;
  border: 0;
  color: #0d2636;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;

  svg {
    margin-right: 5px;
  }
`;

export const IssuesList = styled.ul`
    list-style: none;
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 30px;

  li {
    display: flex;
    padding: 15px 10px;
    border-bottom: 1px solid #eee;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    &:last-child {
      border-bottom: 0;
    }
    div {
      flex: 1;
      margin-left: 12px;

        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }

    }   
    strong {
      font-size: 16px;
      a{
        text-decoration: none;
        color: #222;
        transform: 0.3s;
        &:hover {
          color: #0071db;
        }   
      }
        span {
            background: #222;
            color: #fff;
            border-radius: 4px;
            padding: 3px 5px;
            font-size: 12px;
            margin-left: 10px;
        }

    }
  }
  `;