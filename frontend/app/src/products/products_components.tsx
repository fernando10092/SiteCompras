import { Background, BtnAdmin, ButtonProduct, Container, ContainerAdmin, ContainerArea, ContainerProduct, DescriptionProduct, InputAdmin, InputProduct, ListProducts, PictureProduct, PriceProduct, Text, TextMainAdmin, TextProduct, TextSubAdmin } from "./products_styled"
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

                    <TextMainAdmin>PAINEL DO ADMINISTRADOR</TextMainAdmin>

                    <ContainerArea>
                        <TextSubAdmin>CADASTRO DE PRODUTOS</TextSubAdmin>
                        <form>
                            <InputAdmin width="200px" name="product" placeholder="Nome do Produto" onChange={(e) => setProduct(e.target.value)} />
                            <InputAdmin width="100px" name="price" placeholder="Preço" onChange={(e) => setPrice(e.target.value)} />
                            <InputAdmin width="250px" name="description" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
                            <InputAdmin width="50px" name="qtd" placeholder="Quantidade" onChange={(e) => setQtd(e.target.value)} />
                            <InputAdmin width="200px" type="file" name="img" placeholder="Imagem" onChange={(e) => setImg(e.target.files![0])} />
                            <BtnAdmin type="button" onClick={async () => {

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


                            }}>Enviar</BtnAdmin>
                        </form>
                    </ContainerArea>


                    <ContainerArea>
                        <TextSubAdmin>EXCLUSÃO DE PRODUTOS</TextSubAdmin>
                        <form>
                            <InputAdmin width="80px" name="id" type="number" onChange={(e) => { setIdentification(Number(e.target.value)) }} />
                            <BtnAdmin onClick={async () => {

                                try {
                                    const response = await fetch("http://127.0.0.1:8000/products/delete/", {
                                        method: "DELETE",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ id: identification })
                                    })

                                    if (response.ok) {
                                        alert("Dados Excluidos com Sucesso")
                                    } else {
                                        alert("Erro ao excluir dados")
                                    }

                                } catch (e) {
                                    alert({ "Erro ao Excluir Produto": e })
                                }

                            }}>Excluir</BtnAdmin>
                        </form>


                    </ContainerArea>

                    <ContainerArea>
                        <TextSubAdmin>UPDATE PRODUTOS</TextSubAdmin>
                        <form>
                            <InputAdmin width="80px" name="id" type="number" onChange={(e) => { setIdentification(Number(e.target.value)) }} />
                            <InputAdmin width="200px" name="product" placeholder="Nome do Produto" onChange={(e) => setProduct(e.target.value)} />
                            <InputAdmin width="80px" name="price" placeholder="Preço" onChange={(e) => setPrice(e.target.value)} />
                            <InputAdmin width="250px" name="description" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
                            <InputAdmin width="50px" name="qtd" placeholder="Quantidade" onChange={(e) => setQtd(e.target.value)} />
                            <InputAdmin width="200px" type="file" name="img" placeholder="Imagem" onChange={(e) => setImg(e.target.files![0])} />
                            <BtnAdmin type="button" onClick={async () => {

                                try {

                                    const formData = new FormData();
                                    formData.append("id", identification.toString())
                                    formData.append("product", product.toString());
                                    formData.append("price", price.toString());
                                    formData.append("description", description.toString());
                                    formData.append("qtd", qtd.toString());
                                    if (img) {
                                        formData.append("img", img.toString());
                                    }

                                    const response = await fetch("http://127.0.0.1:8000/products/update/", {
                                        method: "PUT",
                                        //headers: {"Content-Type":"application/json"},
                                        body: formData
                                    })

                                    if (response.ok) {
                                        alert("Dados Atualizados com Sucesso")
                                    } else {
                                        alert('Erro ao atualizar dados')
                                    }


                                } catch (e) {
                                    alert("Erro: " + e)
                                }



                            }}>Atualizar</BtnAdmin>
                        </form>


                    </ContainerArea>





                </ContainerAdmin>
            }
            <Footer />

        </>
    )
}

export default Product;