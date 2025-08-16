import styled from "styled-components"


export const Layout = styled.div`
width: 80%;
height: 80%;
top: 10%;
left: 10%;
position: fixed;
display: grid;
grid-template-columns: 1fr 1fr;
border-radius: 50px;
`
export const H1title = styled.h1`
color: #1C1C1C;
font-size: 30px;
margin: 20px;
`

export const ContainerLeft = styled.div`
height: 100%;
width: 100%;
text-align: center;
align-content: center;
background-color: rgba(61, 26, 187, 0.5);
`

export const ContainerRight = styled.div`
height: 100%;
width: 100%;
align-content: center;
background-color: rgba(68, 186, 216, 0.5);
text-align: center;
`

export const Label = styled.label`

`

export const InputEmail = styled.input`
width: 250px;
height: 25px;
border: none;
display: block;
margin: 10px auto;
`

export const InputPassword = styled.input`
width: 250px;
height: 25px;
border: none;
display: block;
margin: 10px auto;
`

export const InputName = styled.input`
display: block;
width: 250px;
height: 25px;
border: none;
display: block;
margin: 10px auto;
`

export const InputCpf = styled.input`
display: block;
width: 250px;
height: 25px;
border: none;
display: block;
margin: 10px auto;
`

export const BtnEnter = styled.button`
width: 250px;
height: 25px;
cursor: pointer;
background-color:	#008B8B;
border: none;
color: white;
font-weight: bold;
display: block;
margin: 10px auto;
&:hover{
  background-color: #2F4F4F;
  }
`

//Carrinho

export const BackChart = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`

export const ContainerChartLeft = styled.div`
margin: 0 auto;
`

export const ContainerChartRight = styled.div`
padding: 10px;
`

export const LiProduct = styled.li`
background-color: #FFFFE0;
margin: 10px;
box-shadow: 0px 0px 10px black;
color: #1C1C1C;
font-size: 12px;
width: 250px;
text-align: center;
padding: 10px;
`

type Cor = {
  cor: string;
}

export const ButtonProduct = styled.button<Cor>`
width: 200px;
height: 30px;
background-color: ${props => props.cor || "#4CAF50"};
border: none;
color: white;
cursor: pointer;
margin: 10px;
display: block;
&:hover{
  background-color: #45a049;
  }
`

export const H1Chart = styled.h1`
margin-top: 50px;
margin-bottom: 50px;
`


