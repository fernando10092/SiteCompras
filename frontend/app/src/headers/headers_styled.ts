import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 220px;
overflow: hidden;
`

export const ContHero = styled.div`
width: 100%;
height: 150px;
position: relative;
`

export const Avatar = styled.div`
position: absolute;
top: 10px;
right: 15px;
width: 60px;
height: 60px;
background-color:rgba(255, 255, 255, 0.3);
border-radius: 50%;
align-content: center;
cursor: pointer;
`
export const AccessAvatar = styled.div`
width: 60px;
height: 60px;
border-radius: 50%;
background-color:rgba(255, 255, 255, 0.3);
position: absolute;
top: 10px;
right: 120px;
align-content: center;
text-align: center;
cursor: pointer;
`
export const ImgAvatar = styled.img`
width: 80%;
height: 80%;
`

export const TextAvatar = styled.p`
color: white;
font-size: 12px;
background-color:rgba(24, 22, 22, 0.6);
border-radius: 5px;
`

export const Hero = styled.img`
object-fit: cover;
height: 150px;
width: 100%;
`

export const Barra = styled.div`
width: 100%;
height: 70px;
align-content: center;
background-color: 	#FFFAFA;
`

export const Ul = styled.ul`
width: 100%;
list-style: none;
display: flex;
justify-content: space-between;
margin: 0;
`

export const Li = styled.li`
width: 100%;
text-align: center;
&:hover{
    background-color: #D3D3D3;
    transition: 0.9s;
    cursor: pointer;
    transition: 0.9s;
    border-radius: 5px;
    color: white;
    }
`

export const H1 = styled.h1`
color: 	#1C1C1C;
`