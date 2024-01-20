import styled from 'styled-components';

const Amount = ({ amount, setDecrement, setIncrement }) => {
  return (
    <Wrapper>
      <button onClick={() => setDecrement()}>
        <h4 className='fw-bold'>-</h4>
      </button>
      <p className='fw-bold fs-6'>{amount}</p>
      <button onClick={() => setIncrement()}>
        <h4 className='fw-bold'>+</h4>
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 30px;
  button {
    width: 30px;
    height: 100%;
    margin: auto;
    border: none;
    border-radius: 50%;
    background: #c5c5c5;
    text-align: center;
    opacity: 0.7;
    h4 {
      line-height: 1.1;
    }
    &:hover {
      opacity: 1;
    }
  }
  p {
    margin: 0 20px;
    font-size: 20px;
    color: #363636;
  }
`;
export default Amount;
