import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
  min-height: 15vh;
  min-width: 10vw;
  text-align: center;
  border: 2px solid black;
`
const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 5vh;
`

function FoodList({setPickFood, searchList}) {
  return (
    <ContainerDiv>
      {searchList.map((el) => {
        return <ContentDiv onClick={() => setPickFood(el)} key={el.id}>{el.kit_name}</ContentDiv>
      })}
    </ContainerDiv>
  )
  
}

export default FoodList;