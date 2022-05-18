import Header from "../components/Header"

import React from "react"
import Listform from "../components/Listform"
import styled from "styled-components"

const Div = styled.div`
    overflow: hidden;
    position: relative;
    display: block;

`
const Ul =styled.ul`
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
`
const Li = styled.li`
    position: relative;
    display: inline-block;
    width: 342px;
    float:none;
    margin: 0 30px 70px 0;
    vertical-align: top;
`
function Mainpage () {
  return (
    <div>
      <div>오늘의 추천 도시락</div> 
      {/* 3항 연산자 걸어가지구 router 로 바뀔때 마다 이름 변경되게 끔 바꿔야됌 */}
      <div className="main-recommend-container">
      <Listform/>  
      {/* <Div>
      <Ul>
        <Li>밀키트 수요 폭등</Li>
        <Li>박상하 만세</Li>
        <Li>윤선웅 만세</Li>
        <Li>호호호호호</Li>
      </Ul>
      </Div> */}
      </div>
      
    </div>
    
    
  )
}
export default Mainpage