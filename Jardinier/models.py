from django.db import models

class Jardinier(models.Model):
    photo=models.ImageField(upload_to='jardinier/%y/%m/%d/')
    cni=models.CharField(max_length=50)
    nom=models.CharField(max_length=50)
    prenom=models.CharField(max_length=50)
    email=models.CharField(max_length=50)
    tel=models.CharField(max_length=50)
    dateEmbauch=models.DateTimeField(max_length=50)
    sexe=models.CharField(max_length=50)
    def __str__(self):
        return self.nom
    