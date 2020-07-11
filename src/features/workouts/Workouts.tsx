import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPage, fetchWorkouts } from "./WorkoutsSlice";
import { RootState } from "store";
import styled from "@emotion/styled";

const Container = styled.div``;

const ErrorMessage = styled.p`
  color: #ff5714;
`;

const Loading = styled.p`
  color: #fba300;
  font-size: 2rem;
  margin: 3.75rem 0;
`;

const Value = styled.p`
  font-size: 5rem;
  color: #5fd0ae;
  margin: 2rem 0;
`;

const Button = styled.button`
  margin: 0.5rem 0.75rem;
  font-size: 1.25rem;
  background: transparent;
  border-color: #5fd0ae;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;

  &:focus {
    outline: none;
  }
  &:active {
    border-style: solid;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const loading = useSelector((state: RootState) => state.counter.loading);
  const error = useSelector((state: RootState) => state.counter.error);
  const dispatch = useDispatch();

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <Loading data-testid="counter-loading">Loading...</Loading>
      ) : (
        <Value data-testid="counter-value">{count}</Value>
      )}
    </Container>
  );
};

export default Counter;
