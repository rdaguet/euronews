from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.conf import settings
from .forms import ArticleForm
from .models import Article

# Vue pour ajouter un nouvel article
def add_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ArticleForm()
    return render(request, 'articles/add_article.html', {'form': form})

# Vue pour récupérer tous les articles au format JSON
def articles_json(request):
    articles = Article.objects.all()
    base_url = request.build_absolute_uri('/')  # Ex: http://127.0.0.1:8000/

    data = [
        {
            'id': article.id,
            'title_fr': article.title_fr,
            'title_en': article.title_en,
            'image': f"{base_url}{settings.MEDIA_URL}{article.image}" if article.image else None,  
            'description_fr': article.description_fr,
            'description_en': article.description_en,
            'tags': article.tags.split(',') if article.tags else [],  # Assurer que les tags sont sous forme de liste
            'content_fr': article.content_fr,
            'content_en': article.content_en
        }
        for article in articles
    ]
    return JsonResponse(data, safe=False)

# Vue pour récupérer un article spécifique au format JSON
def article_detail(request, id):
    try:
        article = Article.objects.get(id=id)
        base_url = request.build_absolute_uri('/')  # Ex: http://127.0.0.1:8000/

        data = {
            'id': article.id,
            'title_fr': article.title_fr,
            'title_en': article.title_en,
            'image': f"{base_url}{settings.MEDIA_URL}{article.image}" if article.image else None,
            'description_fr': article.description_fr,
            'description_en': article.description_en,
            'tags': article.tags.split(',') if article.tags else [],
            'content_fr': article.content_fr,
            'content_en': article.content_en
        }
        return JsonResponse(data)
    
    except Article.DoesNotExist:
        return JsonResponse({'error': 'Article non trouvé'}, status=404)

# Vue pour l'accueil
def home(request):
    articles = Article.objects.all()
    return render(request, 'articles/home.html', {'articles': articles})
