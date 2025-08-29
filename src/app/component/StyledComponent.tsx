import styled, { css, keyframes } from "styled-components";

const messageAnimation = keyframes`
  from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
  to { opacity: 1; transform: translateY(0) translateX(-50%); }
`;

export const Main = styled.main`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
`;

export const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 24rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  outline: none;
  color: #000000;
  background-color: #ffffff;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;

export const Message = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: ${messageAnimation} 0.3s ease-out;

  &::before {
    content: ${({ type }) => (type === "error" ? '"Error"' : '"Success"')};
    display: block;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  ${({ type }) =>
    type === "success"
      ? css`
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #34d399;
        `
      : css`
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        `}
`;


