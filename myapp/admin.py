from django.contrib.admin import AdminSite
from django.urls import path
from django.template.response import TemplateResponse
from .models import Product # troque pelo seu modelo real
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage

class MyAdminSite(AdminSite):
    site_header = 'Meu Painel Administrativo'
    site_title = 'Admin'
    index_title = 'Bem-vindo ao painel'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('relatorio/', self.admin_view(self.relatorio_view), name='relatorio'),
        ]
        return custom_urls + urls

    def relatorio_view(self, request):
        context = dict(self.each_context(request), title='Relatório Especial')

        if request.method == "POST" and request.FILES.get("hero_image"):
            image = request.FILES["hero_image"]

            # Salva a imagem na pasta "media/uploads/"
            fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'uploads'), base_url='/media/uploads/')
            filename = fs.save(image.name, image)
            uploaded_url = fs.url(filename)
            context["uploaded_url"] = uploaded_url

        return TemplateResponse(request, "admin/relatorio.html", context)

# Instancia o admin site customizado
my_admin_site = MyAdminSite(name='myadmin')

# Registra seus modelos
my_admin_site.register(Product)
