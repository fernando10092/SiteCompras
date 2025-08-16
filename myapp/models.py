from django.db import models

# Create your models here.
class Banco(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    email = models.TextField()
    cpf = models.TextField()



#Teste de modelo para o painel administrativo
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    qtd = models.IntegerField()
    img = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.nome
