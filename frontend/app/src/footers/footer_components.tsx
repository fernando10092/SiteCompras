import { ContainerFooter, FooterItem } from "./footer_styled";
const Footer = () => {
    return (
        <>
            <ContainerFooter>
                <ul>
                    <li>
                        <h6>Atendimento</h6>
                        <h6>Contato: XX XXXX-XXXX</h6>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h6>Forma de Pagamento</h6>
                        <h6>Cartão de Crédito</h6>
                        <h6>Pix</h6>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h6>Suporte</h6>
                        <h6>Política de Troca</h6>
                        <h6>Devolução</h6>
                    </li>
                </ul>

            </ContainerFooter>

        </>
    )
}

export default Footer;