from django.db import models

class Plante(models.Model):
      serie=models.CharField(max_length=50)
      nom=models.CharField(max_length=50)
      origine=models.CharField(max_length=50)
      typeP=models.CharField(max_length=50)
      prix=models.IntegerField()
      def __str__(self):
        return self.serie
    