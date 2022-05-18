import React, { useState } from 'react';
import styled from 'styled-components';
import AddFood from '../components/AddFood';

const TodaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  margin-top: 10px;
`;
const Title = styled.div`
  margin: 0px;
  padding: 0px;
`;
const FoodList = styled.div`
  padding-top: 5px;
  border-bottom: 2px solid gray;
  width: 45vw;
  height: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PushMealBar = styled.div`
  text-align: right;
  font-size: 20px;
  background-color: bisque;
  width: 45vw;
  cursor : pointer;
`;
const TodayTotal = styled.div`
  padding-left: 50px;
`;
const TodayTotalBar = styled.div`
  text-align: center;
  width: 45vw;
  height: 70vh;
  background-color: bisque;
`;
const BoxDiv = styled.div`
  border: 2px solid black;
  min-height: auto;
  width: 45vw;
`;
const H2 = styled.h2`
  justify-self: center;
  text-align: center;
`

function TodayMeal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalNum, setModalNum] = useState(0);
  const [morning, setMorning] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const NowDate = new Date().toLocaleDateString();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const getDay = week[new Date().getDay()];

  const clickPlus = (num) => {
    setOpenModal(!openModal);
    setModalNum(num);
  };
  const removeFood = (idx) => {
    if (modalNum === 1) {
      morning.splice(idx,1)
      setMorning([...morning]);
    }
    if (modalNum === 2) {
      lunch.splice(idx,1)
      setLunch([...lunch]);
    }
    if (modalNum === 3) {
      dinner.splice(idx,1)
      setDinner([...dinner]);
    }
  };

  const addFoods = (food) => {
    if(food.name === '') return
    if (modalNum === 1) {
      for(let i=0; i < morning.length; i++) {
        if(morning[i].name === food.name) {
          morning[i].quantity += food.quantity
          setMorning([...morning])
          return;
        }
      }
      setMorning([...morning, food])
    }
    if (modalNum === 2) {
        for(let i=0; i < lunch.length; i++) {
          if(lunch[i].name === food.name) {
            lunch[i].quantity += food.quantity
            setLunch([...lunch])
            return;
          }
        }
        setLunch([...lunch, food])
    }
    if (modalNum === 3) {
        for(let i=0; i < dinner.length; i++) {
          if(dinner[i].name === food.name) {
            dinner[i].quantity += food.quantity
            setDinner([...dinner])
            return
          }
        }
        setDinner([...dinner, food])
    }
  };
  console.log(morning);
  const calculator= () => {
    let sum = 0
    for(let i=0; i < morning.length; i++) {
      sum = sum + (morning[i].kcal*morning[i].quantity)
    }
    for(let i=0; i < lunch.length; i++) {
      sum = sum + (lunch[i].kcal*lunch[i].quantity)
    }
    for(let i=0; i < dinner.length; i++) {
      sum = sum + (dinner[i].kcal*dinner[i].quantity)
    }
    return sum
  }
  return (
    <TodaysContainer>
      <div>
        <Title>
          <h1>마이 푸드 다이어리</h1>
          <div>{`${NowDate} ${getDay}`}</div>
        </Title>
        <br></br>
        <div>
          <BoxDiv className="아침">
            <H2>아침</H2>
            <PushMealBar onClick={() => clickPlus(1)}>
              항목 추가하기 +
            </PushMealBar>
            {openModal && modalNum === 1 ? (
              <AddFood addFoods={addFoods} />
            ) : null}
            {morning.length ===0? null:morning.map((food, idx) => (
              <FoodList key={idx}>
                <div>{food.name} 수량 {food.quantity}</div>
                <div>{(food.kcal)*(food.quantity)}kcal</div>
                <div onClick={() => removeFood(idx)}>X</div>
              </FoodList>
            ))}
          </BoxDiv>
          <br></br>
          <BoxDiv className="점심">
            <H2>점심</H2>
            <PushMealBar onClick={() => clickPlus(2)}>
              항목 추가하기 +
            </PushMealBar>
            {openModal && modalNum === 2 ? (
              <AddFood addFoods={addFoods} />
            ) : null}
            {lunch.length===0? null:lunch.map((food, idx) => (
              <FoodList key={idx}>
                <div>{food.name} 수량 {food.quantity}</div>
                <div>{(food.kcal)*(food.quantity)}kcal</div>
                <div onClick={() => removeFood(idx)}>X</div>
              </FoodList>
            ))}
          </BoxDiv>
          <br></br>
          <BoxDiv className="저녁">
            <H2>저녁</H2>
            <PushMealBar onClick={() => clickPlus(3)}>
              항목 추가하기 +
            </PushMealBar>
            {openModal && modalNum === 3 ? (
              <AddFood addFoods={addFoods} />
            ) : null}
            {dinner.length===0?null:dinner.map((food, idx) => (
              <FoodList key={idx}>
                <div>{food.name} 수량 {food.quantity}</div>
                <div>{(food.kcal)*(food.quantity)}kcal</div>
                <div onClick={() => removeFood(idx)}>X</div>
              </FoodList>
            ))}
          </BoxDiv>
          <br></br>
        </div>
      </div>
      <TodayTotal className="오늘의합계">
        <h1>오늘의 합계</h1>
        <TodayTotalBar text>{calculator()}kcal</TodayTotalBar>
      </TodayTotal>
      <br></br>
    </TodaysContainer>
  );
}

export default TodayMeal;
