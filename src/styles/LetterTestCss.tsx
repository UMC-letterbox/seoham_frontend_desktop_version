import styled from "styled-components";
import Autumn from '../assets/autumn.png'; //1
import Birthday from '../assets/birthday.png'; //2
import Christmas from '../assets/christmas.png'; //3
import Congratulation from '../assets/congratulation.png'; //4
import Letter1 from '../assets/letter1.png'; //5
import Love from '../assets/love.png'; //6
import Spring from '../assets/spring.png'; //7
import Tradition from '../assets/tradition.png'; //8
import Winter from '../assets/winter.png' //9

interface propsType{
    paper:number;
}
export const LetterPaper = styled.img.attrs((props:propsType) => {
    if(props.paper == 1){
        return({src:`${Autumn}`})
    }
    else if(props.paper == 2){
        return({src:`${Birthday}`})
    }
    else if(props.paper == 3){
        return({src:`${Christmas}`})
    }
    else if(props.paper == 4){
        return({src:`${Congratulation}`})
    }
    else if(props.paper == 5){
        return({src:`${Letter1}`})
    }
    else if(props.paper == 6){
        return({src:`${Love}`})
    }
    else if(props.paper == 7){
        return({src:`${Spring}`})
    }
    else if(props.paper == 8){
        return({src:`${Tradition}`})
    }
    else if(props.paper == 9){
        return({src:`${Winter}`})
    }
})`
    height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`
export const LetterContent = styled.div<{paper:number}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: ${props => props.paper==3 ? "40%":"50%"};
    left: 50%;
    transform: ${props => props.paper==3 ? "translate(-50%, -60%)":
        props.paper==2 || props.paper==6 ? "translate(-50%, -30%)":
        "translate(-50%, -50%)"};
    width: 60%;
    padding: 20px 10px;
    height: ${(props) => props.paper==3||props.paper==4 ? "50%"
        :
        props.paper==5||props.paper==8 ? "70%":
        "60%"
    };
    // background-color: gray;
    .sender{
        text-align: start;
        // background-color: red;
        span{
            font-weight: bold;
        }
    }
    .content{
        // height: 70%;
        // background-color: yellow;
        overflow: auto;
    }
    /*스크롤바 커스텀 하고 싶은데 -webkit~~ 이게 안먹히네요*/
    .date{
        // background-color: blue;
        text-align: end;
    }

`