from django.db import models
from Jardinier.models import Jardinier
class Jardin(models.Model):
    photo=models.ImageField(upload_to='jardin/%y/%m/%d/')
    num=models.CharField(max_length=40)
    nom=models.CharField(max_length=40)
    ville=models.CharField(max_length=40)
    adresse=models.CharField(max_length=40)
    superficier=models.IntegerField()
    jardinier=models.ForeignKey(Jardinier,on_delete=models.CASCADE)
    def __str__(self):
        return self.nom


