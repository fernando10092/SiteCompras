from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .models import Banco, Product
from .serializers import Serializer, SerializerProduct
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import JsonResponse
import os


@swagger_auto_schema(
    method='post',
    operation_description="Insere um novo registro no banco de dados.",
    request_body=Serializer,
    responses={201: "Dados inseridos com sucesso"}
)
@swagger_auto_schema(
    method='get',
    operation_description="Lista todos os registros do banco de dados.",
    responses={200: Serializer(many=True)}
)


#View para listar e cadastrar produtos
@api_view(["GET", "POST"])
def ProductView(request):
    if request.method == "POST":
        product = request.data.get("product")
        price = request.data.get("price")
        description = request.data.get("description")
        qtd = request.data.get("qtd")
        img = request.FILES.get("img")
        product = Product(product=product,price=price,description=description,qtd=qtd,img=img)
        product.save()
        return Response({"message": "Produto inserido com sucesso"}, status=status.HTTP_201_CREATED)  
    products = Product.objects.all()
    serializer = SerializerProduct(products, many=True)
    return Response({"products": serializer.data})

#Excluir produtos
@api_view(["POST", "DELETE"])
def DeleteProduct(request):
    if request.method == 'DELETE':
        id = request.data.get("id")
        db = Product.objects.filter(id=id)
        if db.exists():
            db.delete()
            return Response({"mensagem":"Dados Excluidos"})
        else:
            return Response({"mensagem":"Dados não encontrados"})

#INTERAÇÃO COM O BANCO DE DADOS
@api_view(["GET", "POST"])
def Api(request):
    if request.method == "POST":
        serializer = Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Dados Inseridos com sucesso", 201)
        return Response(serializer.errors, 400)

    banco = Banco.objects.all()
    serializer = Serializer(banco, many=True)
    return Response(serializer.data, 200)

#TESTES API MERCADOPAGO
@api_view(['GET','POST'])
def api_mercadopago(request):
    from .api_mp.api import gerar_link_pagamento
    try:
        id = request.data.get('id')
        title = request.data.get('title')
        quantity = request.data.get('quantity')
        currency_id = request.data.get('currency_id')
        unit_price = request.data.get('unit_price')
        link_pagamento = gerar_link_pagamento(id, title, quantity, currency_id, unit_price)
        return JsonResponse({'link': link_pagamento})
    except Exception as e:
        print(f"Erro: {e}")
        return JsonResponse({'error': str(e)}, status=500)

#Autenticação
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)

class ProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Você está autenticado!", "user": request.user.username})


def hero_image(request):
    folder_path = os.path.join('media', 'uploads')

    try:
        arquivos = os.listdir(folder_path)
        imagens = [f for f in arquivos if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]

        if not imagens:
            return JsonResponse({"image": None, "detalhe": "Nenhuma imagem encontrada"})

        # Ordenar por data de modificação (a mais recente por último)
        imagens.sort(key=lambda x: os.path.getmtime(os.path.join(folder_path, x)))

        imagem_mais_recente = imagens[-1]  # Última = mais nova
        return JsonResponse({"image": f"/media/uploads/{imagem_mais_recente}"})

    except Exception as e:
        return JsonResponse({"image": None, "erro": str(e)})