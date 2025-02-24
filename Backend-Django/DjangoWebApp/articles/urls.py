from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('add/', views.add_article, name='add_article'),
    path('json/', views.articles_json, name='articles_json'), 
    path('json/<int:id>/', views.article_detail, name='article_detail'),
]
