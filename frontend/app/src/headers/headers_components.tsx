import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Barra, Container, Ul, Li, H1, Hero, ContHero, Avatar, AccessAvatar, ImgAvatar, TextAvatar } from "./headers_styled";
import heroDefault from "../assets/hero.jpg";
import carrinho from "../assets/carrinho.png";
import avatar from "../assets/avatar.png";

const Head = () => {
    const navigate = useNavigate();
    const [heroUrl, setHeroUrl] = useState<string>(heroDefault);

    useEffect(() => {
        const getHeroImage = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/hero/");
                const data = await res.json();
                if (data.image) {
                    setHeroUrl("http://localhost:8000" + data.image);
                } else {
                    setHeroUrl(heroDefault);
                }
            } catch {
                setHeroUrl(heroDefault);
            }
        };

        getHeroImage();
    }, []);


    return (
        <>
            <Container>
                <ContHero>
                    <Hero src={heroUrl} alt="Logo" />
                    <AccessAvatar onClick={() => navigate("/signin")}>
                        <ImgAvatar src={avatar} alt="Avatar" />
                        <TextAvatar>{localStorage.getItem("authToken") ? localStorage.getItem("username") : "LOGIN"}</TextAvatar>
                    </AccessAvatar>
                    <Avatar onClick={() => navigate("/checkout")}>
                        <ImgAvatar src={carrinho} alt="Carrinho" />
                    </Avatar>
                </ContHero>
                <Barra>
                    <Ul>
                        <Li onClick={()=>{navigate("/")}}><H1>Home</H1></Li>
                        <Li onClick={()=>{navigate("/men")}}><H1>Masculino</H1></Li>
                        <Li onClick={()=>{navigate("/women")}}><H1>Feminino</H1></Li>
                    </Ul>
                </Barra>
            </Container>
        </>
    );
};

export default Head;
