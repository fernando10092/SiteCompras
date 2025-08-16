import { useState } from "react";
import { BtnEnter, ContainerLeft, ContainerRight, H1title, InputCpf, InputEmail, InputName, InputPassword, Label, Layout } from "./sign_styled";
import { useNavigate } from "react-router";

const Singin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<String>()
    const [password, setPassword] = useState<String>()

    const [rusername, setRusername] = useState<String>()
    const [remail, setRemail] = useState<String>()
    const [rpassword, setRpassword] = useState<String>()
    const [rcpf, setRcpf] = useState<String>()

    //authentication
    const Auth = async () => {
        console.log("Autenticando...");
        const dados = {
            "username": username,
            "password": password,
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("username", username!.toString());
                localStorage.setItem('authToken', data.access);  // <- isso salva o token
                alert("Login feito com sucesso!"+ data.access);
                navigate("/checkout");
            } else {
                const data = await response.json();
                alert(JSON.stringify(data));
            }
        } catch (e) {
            alert("Erro ao autenticar: " + e)
        }
    }


    const Register = async () => {
        const dados = {
            "username": rusername,
            "password": rpassword,
            "email": remail,
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/createuser/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })

            if (response.ok) {
                const data = await response.json();
                alert(JSON.stringify(data));
            } else {
                alert("Erro ao autenticar, verifique os dados informados.")
            }
        } catch (e) {
            alert("Erro ao autenticar: " + e)
        }
    }


    return (
        <>
            <Layout>
                <ContainerLeft>

                    <H1title>ENTRAR</H1title>
                    <Label>Username</Label>
                    <InputEmail onChange={(e) => { setUsername(e.target.value) }} name="username" type="email" placeholder="Email" />
                    <Label>Senha</Label>
                    <InputPassword onChange={(e) => { setPassword(e.target.value) }} name="password" type="password" placeholder="Senha" />
                    <BtnEnter onClick={() => {
                        Auth();
                    }}>Enter</BtnEnter>

                </ContainerLeft>

                <ContainerRight>
                    <H1title>CADASTRE-SE</H1title>
                    <Label>Nome</Label>
                    <InputName onChange={(e)=>{setRusername(e.target.value)}} type="text" placeholder="Nome" />
                    <Label>E-Mail</Label>
                    <InputEmail onChange={(e)=>{setRemail(e.target.value)}} type="email" placeholder="Email" />
                    <Label>Senha</Label>
                    <InputPassword onChange={(e)=>setRpassword(e.target.value)} type="password" placeholder="Senha" />
                    <Label>CPF</Label>
                    <InputCpf onChange={(e)=>setRcpf(e.target.value)} type="text" placeholder="CPF" />
                    <BtnEnter onClick={
                        () => {
                            Register();
                        }
                    }>Register</BtnEnter>
                </ContainerRight>
            </Layout>
        </>

    )
}

export default Singin;