import styled from "styled-components";

export const Background = styled.div`
width: 100%;
background-color: #FFFAFA;
`

export const Container = styled.div`
margin-top: 150px;
width: 100%;
`
export const ContainerProduct = styled.div`
width: 100%;
height: 400px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`

export const ListProducts = styled.div`
width: 210px;
height: 350px;
background-color: #F5F5F5;
margin: 5px;
`

export const PictureProduct = styled.img`
width: 100%;
height: 200px;
object-fit: cover;
`

export const Text = styled.h1`
font-size: 24px;
font-weight: 600;
margin-left: 20px;
`

export const TextProduct = styled.h1`
font-size: 20px;
color: #1C1C1C;
font-weight: 200;
margin-lef: 10px;
`

export const InputProduct = styled.input`
font-size: 20px;
color: #1C1C1C;
font-weight: 200;
margin-lef: 10px;
`

export const DescriptionProduct = styled.p``

export const PriceProduct = styled.p`
font-size: 20px;
font-weight: 600;
color: #1C1C1C;
margin-top: 10px;
margin-bottom: 10px;
margin-lef: 10px;
`

export const ButtonProduct = styled.button`
width: 90%;
height: 30px;
margin: 10px;
background-color: 	#D3D3D3;
cursor: pointer;
border: none;
color: #1C1C1C;
font-weight: 600;
font-size: 16px;
&:hover{
    background-color: #808080;
    transition: 0.5s;
    }
`

export const ContainerAdmin = styled.div`
background-color: gray;
text-align: center;
height: 80vh;
`

export const TextoTeste = styled.h1`
background-color: red;
font-size: 18px;
`
