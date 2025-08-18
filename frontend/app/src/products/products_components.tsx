import { Background, ButtonProduct, Container, ContainerAdmin, ContainerProduct, DescriptionProduct, InputProduct, ListProducts, PictureProduct, PriceProduct, Text, TextoTeste, TextProduct } from "./products_styled"
import { Lista } from "../data/list_product";
import Head from "../headers/headers_components";
import { useDispatch, useSelector } from "react-redux";
import { addCarrinho } from "../app/features/slice";
import { store } from "../app/store";
import { useNavigate } from "react-router";
import HeroComponents from "../informe/hero_components";
import Footer from "../footers/footer_components";
import { useEffect, useState } from "react";
import imagens from "../../../../media/products/modelo1.jpg";


const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState<String>("item");
    const [price, setPrice] = useState<String>("0");
    const [description, setDescription] = useState<String>("item");
    const [qtd, setQtd] = useState<String>("0");
    const [img, setImg] = useState<File | null>(null);
    const [productData, setProductData] = useState<Array<any>>([]);
    const [admin, setAdmin] = useState<boolean>(true);
    const [identification, setIdentification] = useState<any>()

    const getToken = () => {
        const token = localStorage.getItem('authToken');
        return token ? token : null;
    }

    useEffect(() => {

        getData();
    }, []);


    //Obter Dados do Banco
    const getData = async () => {
        const dados = await fetch("http://127.0.0.1:8000/products/");
        dados.json().then((data) => {
            setProductData(data["products"]);
        })
    }


    return (
        <>
            <Head />
            <Background>
                <HeroComponents />
                <Container>
                    <Text>Novidades</Text>
                    <ContainerProduct>
                        {
                            productData.map((i) => (
                                <ListProducts>
                                    <PictureProduct src={`http://127.0.0.1:8000${i.img}`} />
                                    <TextProduct>{i.product}</TextProduct>
                                    <PriceProduct>R$ {i.price}</PriceProduct>
                                    <ButtonProduct onClick={
                                        () => {
                                            dispatch(addCarrinho({ id: i.id, title: i.product, quantity: 1, currency_id: "BRL", unit_price: i.price, image: i.img }));
                                            if (getToken() == null) {
                                                navigate("/signin");
                                            } else {
                                                navigate("/checkout");
                                            }

                                        }
                                    }>COMPRAR</ButtonProduct>
                                </ListProducts>

                            ))
                        }
                    </ContainerProduct>

                </Container>

            </Background>
            {admin &&
                <ContainerAdmin>

                    <h1>PAINEL DO ADMINISTRADOR</h1>
                    <h4>CADASTRO DE PRODUTOS</h4>
                    <form>
                        <input name="product" placeholder="Nome do Produto" onChange={(e) => setProduct(e.target.value)} />
                        <input name="price" placeholder="Preço" onChange={(e) => setPrice(e.target.value)} />
                        <input name="description" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
                        <input name="qtd" placeholder="Quantidade" onChange={(e) => setQtd(e.target.value)} />
                        <input type="file" name="img" placeholder="Imagem" onChange={(e) => setImg(e.target.files![0])} />
                        <button type="button" onClick={async () => {

                            try {
                                const formData = new FormData();
                                formData.append("product", product.toString());
                                formData.append("price", price.toString());
                                formData.append("description", description.toString());
                                formData.append("qtd", qtd.toString());
                                if (img) {
                                    formData.append("img", img);
                                }

                                const response = await fetch("http://127.0.0.1:8000/products/", {
                                    method: "POST",
                                    body: formData
                                })

                                if (response.ok) {
                                    alert("Produto enviado com sucesso!");

                                } else {
                                    alert("Erro ao enviar produto!");
                                }

                            } catch (e) {
                                alert({ "Erro ao cadastrar produto": e })
                            }


                        }}>Enviar</button>
                    </form>


                    <h1>EXCLUSÃO DE PRODUTOS</h1>
                    <form>
                        <input name="id" type="number" onChange={(e) => { setIdentification(Number(e.target.value)) }} />
                        <button onClick={async () => {

                            try {
                                const response = await fetch("http://127.0.0.1:8000/products/delete/", {
                                    method: "DELETE",
                                    headers: {"Content-Type":"application/json"},
                                    body: JSON.stringify({id: identification})
                                })

                                if (response.ok) {
                                    alert("Dados Excluidos com Sucesso")
                                } else {
                                    alert("Erro ao excluir dados")
                                }

                            } catch (e) {
                                alert({ "Erro ao Excluir Produto": e })
                            }

                        }}>Excluir</button>
                    </form>



                </ContainerAdmin>
            }
            <Footer />

        </>
    )
}

export default Product;