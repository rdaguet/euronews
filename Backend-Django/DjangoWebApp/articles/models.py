from django.db import models

class Article(models.Model):
    TAG_CHOICES = [
        ('écologie', 'Écologie'),
        ('politique', 'Politique'),
        ('numérique', 'Numérique'),
        ('santé', 'Santé'),
    ]
    
    title_fr = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    description_fr = models.TextField()
    description_en = models.TextField()
    tags = models.CharField(max_length=50, choices=TAG_CHOICES, default='écologie')
    content_fr = models.TextField(default="Texte non disponible")
    content_en = models.TextField(default="Texte non disponible")

    def __str__(self):
        return self.title_fr
