from django.db import models
from Jardin.models import Jardin
from Plante.models import Plante
class Contenu(models.Model):
    jardin=models.ForeignKey(Jardin,on_delete=models.CASCADE)
    plante=models.ForeignKey(Plante,on_delete=models.CASCADE)
    qte=models.IntegerField()
    datePlantation=models.DateTimeField(max_length=50)
    def __str__(self):
        return self.datePlantation
    