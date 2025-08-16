import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { removeCarrinho } from "../app/features/slice"
import { BackChart, ButtonProduct, ContainerChartLeft, ContainerChartRight, H1Chart, LiProduct } from "./sign_styled"

const Carrinho = () => {
    const itens = useSelector((state: RootState) => state.chart)
    const dispatch = useDispatch();

    console.log(itens)

    return (
        <>
            <div>
                <BackChart>
                    <ContainerChartLeft>
                        <ul>
                            {
                                itens.map((i: any) => (
                                    <LiProduct>
                                        <div>
                                            <img src={i.image} alt={i.title} style={{ width: "150px", height: "150px" }} />
                                        </div>
                                        <h1>ID: {i.id}</h1>
                                        <h1>Produto: {i.title}</h1>
                                        <h1>QTD: {i.quantity.toString()}</h1>
                                        <h1>Valor: {i.unit_price.toString()}</h1>
                                    </LiProduct>
                                ))
                            }

                        </ul>

                    </ContainerChartLeft    >


                    <ContainerChartRight>
                        <H1Chart>Total: R$ {itens.map((i: any) => i.unit_price).reduce((a: number, b: number) => a + b, 0)}</H1Chart>
                        <ButtonProduct cor="#4CAF50" onClick={async () => {
                            try {
                                var dados = {
                                    "id": "id",
                                    "title": "Produtos",
                                    "quantity": 1,
                                    "currency_id": "BRL",
                                    "unit_price": itens.map((i: any) => i.unit_price).reduce((a: number, b: number) => a + b, 0)
                                }
                                const response = await fetch('http://127.0.0.1:8000/mp/', {
                                    method: 'POST',
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(dados)
                                })
                                if (response.ok) {
                                    const data = await response.json()
                                    console.log(data.link)
                                    window.location.href = data.link
                                }
                                else {
                                    alert("Erro ao buscar dados")
                                }
                            } catch (error) {
                                alert("Erro ao buscar dados: " + error)
                            }
                        }}

                        >Continue para pagamento</ButtonProduct>
                        <ButtonProduct cor="gray" onClick={
                            () => {
                                window.location.href = "/"
                            }
                        }>Voltar</ButtonProduct>
                        <ButtonProduct cor="red" onClick={
                            () => {
                                localStorage.removeItem("carrinho")
                                dispatch(removeCarrinho(0))
                                window.location.reload()
                            }
                        }>Limpar Carrinho</ButtonProduct>
                    </ContainerChartRight>

                </BackChart>


            </div>
        </>
    )
}

export default Carrinho;