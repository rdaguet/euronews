from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title_fr', 'title_en', 'image', 'description_fr', 'description_en', 'tags', 'content_fr', 'content_en']
