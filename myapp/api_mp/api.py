import mercadopago
import os
from dotenv import load_dotenv

load_dotenv()

def gerar_link_pagamento(id, title, quantity, currency_id, unit_price):
    sdk = mercadopago.SDK(str(os.environ.get("ACCESS_TOKEN")))

    payment_data = {
        "items": [
            {
                "id": id,
                "title": title,
                "quantity": quantity,
                "currency_id": currency_id,
                "unit_price": unit_price
            }
        ],
        "back_urls": {
            "success": "https://c148-2804-1040-a09e-4c00-3cc1-8e65-2584-e91b.ngrok-free.app/compracerta", #nao funciona em local host
            "failure": "https://c148-2804-1040-a09e-4c00-3cc1-8e65-2584-e91b.ngrok-free.app/compraerrada", #nao funciona em local host
            "pending": "https://c148-2804-1040-a09e-4c00-3cc1-8e65-2584-e91b.ngrok-free.app/compraerrada", #nao funciona em local host
        },
        "auto_return": "all"
    }

    result = sdk.preference().create(payment_data)
    
    # Garante que 'init_point' existe
    if 'response' in result and 'init_point' in result['response']:
        payment = result['response']
        link_iniciar_pagamento = payment['init_point']
        return link_iniciar_pagamento
    else:
        # Exibe o erro que o Mercado Pago enviou
        raise Exception(f"Erro ao criar preferência: {result}")
