from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from Plante.models import Plante
from Jardin.models import Jardin
from Contenu.models import Contenu
# Create your views here.
def index(request):
    return render(request,'contenu.html')
def getPlanteForJardinier(request):
    cursor=connection.cursor()
    query="SELECT id,nom FROM "+'"'+"Plante_plante"+'"'+" ;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getJardinForContenu(request):
    cursor=connection.cursor()
    query="SELECT id,nom FROM "+'"'+"Jardin_jardin"+'"'+" ;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def addContenu(request):
    qte=request.POST["qte"]
    datePlantation=request.POST["datePlantation"]
    plante=request.POST["plante"]
    jardin=request.POST["jardin"]
    p=Plante.objects.filter(pk=plante).first()
    j=Jardin.objects.filter(pk=jardin).first()
    if Contenu.objects.filter(plante=p,jardin=j).exists():
        return JsonResponse({"type":"error","message":"SVP On ne peut pas avoir le même contenu avec le même Jardin et la même Plante !!"})
    c=Contenu(qte=qte,plante=p,jardin=j,datePlantation=datePlantation)
    c.save()
    return JsonResponse({"type":"success","message":"Ajouter avec success "})
def getDataContenu(request):
    cursor=connection.cursor()
    offset=request.POST["offset"]
    query="select c.qte,to_char(c."+'"'+"datePlantation"+'"'+",'yyyy-mm-dd'),c.jardin_id,j.photo,j.num,j.nom,j.ville,j.adresse,j.superficier,c.plante_id,p.serie,p.nom,p.origine,p."+'"'+"typeP"+'"'+",p.prix,c.id from "+'"'+"Contenu_contenu"+'"'+" c inner join "+'"'+"Jardin_jardin"+'"'+" j on j.id=c.jardin_id inner join "+'"'+"Plante_plante"+'"'+" p on c.plante_id=p.id order by c."+'"'+"datePlantation"+'"'+"offset "+offset+" limit 5 ;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def deleteContenu(request):
    id=request.POST["id"]
    Contenu.objects.filter(pk=int(id)).first().delete()
    return JsonResponse({"type":"success","message":"Supprimer avec success "})
def updateContenu(request):
    qte=request.POST["qte"]
    datePlantation=request.POST["datePlantation"]
    plante=request.POST["plante"]
    jardin=request.POST["jardin"]
    id=request.POST["id"]
    p=Plante.objects.filter(pk=plante).first()
    j=Jardin.objects.filter(pk=jardin).first()
    if Contenu.objects.filter(plante=p,jardin=j).exclude(pk=int(id)).exists():
        return JsonResponse({"type":"error","message":"SVP On ne peut pas avoir le même contenu avec le même Jardin et la même Plante !!"})
    c=Contenu.objects.filter(pk=int(id)).first()
    c.qte=qte
    c.datePlantation=datePlantation
    c.plante=p
    c.jardin=j
    c.save()
    return JsonResponse({"type":"success","message":"Moddifier avec success !!"})
def searhContenu(request):
    datePlantation=request.POST["datePlantation"]
    nomJardin=request.POST["nomJardin"]
    nomPlante=request.POST["nomPlante"]
    typelante=request.POST["typelante"]
    villeJardin=request.POST["villeJardin"]
    qte=request.POST["qte"]
    cursor=connection.cursor()
    query="select c.qte,to_char(c."+'"'+"datePlantation"+'"'+",'yyyy-mm-dd'),c.jardin_id,j.photo,j.num,j.nom,j.ville,j.adresse,j.superficier,c.plante_id,p.serie,p.nom,p.origine,p."+'"'+"typeP"+'"'+",p.prix,c.id from "+'"'+"Contenu_contenu"+'"'+" c inner join "+'"'+"Jardin_jardin"+'"'+" j on j.id=c.jardin_id inner join "+'"'+"Jardin_jardin"+'"'+" j1 on j1.id=c.jardin_id inner join "+'"'+"Plante_plante"+'"'+" p on c.plante_id=p.id inner join "+'"'+"Contenu_contenu"+'"'+" c1 on c1.id=c.id inner join "+'"'+"Contenu_contenu"+'"'+" c2 on c2.id=c.id inner join "+'"'+"Plante_plante"+'"'+" p1 on c.plante_id=p1.id where cast(c1.qte as varchar) like '%"+qte+"%' and to_char(c2."+'"'+"datePlantation"+'"'+",'yyyy-mm-dd') like '%"+datePlantation+"%' and j1.nom like '%"+nomJardin+"%' and j.ville like '%"+villeJardin+"%' and p1.nom like '%"+nomPlante+"%' and p."+'"'+"typeP"+'"'+" like '%"+typelante+"%' order by c."+'"'+"datePlantation"+'"'+" ;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getNbreJardinParContenu(request):
    cursor=connection.cursor()
    query="select "+'"'+"datePlantation"+'"'+",count(jardin_id) from "+'"'+"Contenu_contenu"+'"'+" group by "+'"'+"datePlantation"+'"'+";"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getNbrePlanteParJardin(request):
    cursor=connection.cursor()
    query="select p.nom,count(c.jardin_id) from "+'"'+"Contenu_contenu"+'"'+" c inner join "+'"'+"Plante_plante"+'"'+" p on c.plante_id =p.id group by p.nom;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getTheLatestAddedContenu(request):
    cursor=connection.cursor()
    query="select j.nom,j.photo from "+'"'+"Contenu_contenu"+'"'+" c inner join "+'"'+"Jardin_jardin"+'"'+" j on c.jardin_id=j.id order by c.id desc;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
    
