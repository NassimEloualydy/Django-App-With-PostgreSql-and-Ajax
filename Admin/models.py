from django.db import models

class Admin(models.Model):
    photo=models.ImageField(upload_to='admins/%y/%m/%d/')
    cni=models.CharField(max_length=50)
    nom=models.CharField(max_length=50)
    prenom=models.CharField(max_length=50)
    email=models.CharField(max_length=100)
    pw=models.CharField(max_length=200)
    def __str__(self):
        return self.nom
    