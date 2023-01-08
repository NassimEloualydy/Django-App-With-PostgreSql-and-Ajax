from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from Jardin.models import Jardin
from Jardinier.models import Jardinier
def index(request):
    if request.session.get('nom',None)==None:
        return render(request,"login.html")
    else:
        return render(request,'jardin.html')
def getJardinierForJardin(request):
    query="select id,nom,prenom from "+'"'+"Jardinier_jardinier"+'"'+"  ;"
    cursor=connection.cursor()
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def addJardin(request):
    num=request.POST["num"]
    nom=request.POST["nom"]
    ville=request.POST["ville"]
    adresse=request.POST["adresse"]
    superficier=request.POST["superficier"]
    jardinier=request.POST["jardinier"]
    photo=request.FILES["photo"]
    jPerson=Jardinier.objects.filter(pk=int(jardinier)).first()
    if Jardin.objects.filter(num=num).exists():
        return JsonResponse({"type":"error","message":"SVP cet numero exist deja !!"})
    if Jardin.objects.filter(nom=nom).exists():
        return JsonResponse({"type":"error","message":"SVP cet nom exist deja !!"})
    if Jardin.objects.filter(ville=ville,adresse=adresse).exists():
        return JsonResponse({"type":"error","message":"SVP on ne peut pas avoir deux jardins avec la même ville et la même adresse"})
    j=Jardin(num=num,nom=nom,ville=ville,adresse=adresse,superficier=superficier,jardinier=jPerson,photo=photo)
    j.save()
    return JsonResponse({"type":"success","message":"Ajouter avec success"})
def getDataJardin(request):
    cursor=connection.cursor()
    offset=request.POST["offset"]
    query="SELECT j.photo,ja.photo, j.num, j.nom, j.ville, j.adresse, j.superficier, jardinier_id,ja.cni,ja.nom,ja.prenom,ja.email,ja.sexe,ja.tel,ja."+'"'+"dateEmbauch"+'"'+",j.id FROM public."+'"'+"Jardin_jardin"+'"'+" j inner join "+'"'+"Jardinier_jardinier"+'"'+" ja on j.jardinier_id=ja.id offset "+offset+" limit 5;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def deleteJardin(request):
    id=request.POST["id"]
    j=Jardin.objects.filter(pk=int(id)).first()
    j.delete()
    return JsonResponse({"type":"error","message":"Supprimer avec success !!"})
def updateJardin(request):
    num=request.POST["num"]
    nom=request.POST["nom"]
    ville=request.POST["ville"]
    adresse=request.POST["adresse"]
    superficier=request.POST["superficier"]
    jardinier=request.POST["jardinier"]
    id=request.POST["id"]
    if Jardin.objects.filter(num=num).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet numero exist deja !!"})
    if Jardin.objects.filter(nom=nom).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet nom exist deja !!"})
    if Jardin.objects.filter(adresse=adresse,ville=ville).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP on ne peut pas avoir deux jardins avec la même ville et la même adresse"})
    jPerson=Jardinier.objects.filter(pk=int(jardinier)).first()
    jardin=Jardin.objects.filter(pk=id).first()
    jardin.nom=nom
    jardin.num=num
    jardin.ville=ville
    jardin.adresse=adresse
    jardin.superficier=superficier
    jardin.jardinier=jPerson
    if request.FILES:
        jardin.photo=request.FILES["photo"]
    jardin.save()
    return JsonResponse({"type":"success","message":"Moddifier avec success"})
def searchJardin(request):
    numero=request.POST["numero"]
    nom=request.POST["nom"]
    adresse=request.POST["adresse"]
    ville=request.POST["ville"]
    superFicier=request.POST["superFicier"]
    nomJardinier=request.POST["nomJardinier"]
    prenomJardinier=request.POST["prenomJardinier"]
    cursor=connection.cursor()
    query="SELECT j.photo,ja.photo, j.num, j.nom, j.ville, j.adresse, j.superficier, j.jardinier_id,ja.cni,ja.nom,ja.prenom,ja.email,ja.sexe,ja.tel,ja."+'"'+"dateEmbauch"+'"'+",j.id FROM "+'"'+"Jardin_jardin"+'"'+" j  inner join "+'"'+"Jardinier_jardinier"+'"'+" ja on j.jardinier_id=ja.id inner join "+'"'+"Jardinier_jardinier"+'"'+" ja2 on j.jardinier_id=ja2.id inner join "+'"'+"Jardin_jardin"+'"'+" j1 on j1.id=j.id inner join "+'"'+"Jardin_jardin"+'"'+" j2 on j2.id=j.id inner join "+'"'+"Jardin_jardin"+'"'+" j3 on j3.id=j.id inner join "+'"'+"Jardin_jardin"+'"'+" j4 on j4.id=j.id inner join "+'"'+"Jardin_jardin"+'"'+" j5 on j5.id=j.id where  j1.num like '%"+numero+"%' and j2.nom like '%"+nom+"%' and j3.ville like '%"+ville+"%' and j4.adresse like '%"+adresse+"%' and cast(j5.superficier as varchar) like '%"+superFicier+"%' and ja.nom like '%"+nomJardinier+"%' and ja.prenom like '%"+prenomJardinier+"%'";
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})

def getNbrJardinParJardinier(request):
    cursor=connection.cursor()
    query="select j.nom,j.prenom,count(g.id) from "+'"'+"Jardinier_jardinier"+'"'+" j inner join "+'"'+"Jardin_jardin"+'"'+" g on g.jardinier_id=j.id group by j.nom,j.prenom;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getJardinParVille(request):
    cursor=connection.cursor()
    query="select ville,count(id) from "+'"'+"Jardin_jardin"+'"'+" group by ville;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getTheMosteRecomendedGardens(request):
    cursor=connection.cursor()
    query="select nom,prenom,photo from "+'"'+"Jardinier_jardinier"+'"'+" where id in (select "+'"'+"jardinier_id"+'"'+" from "+'"'+"Jardin_jardin"+'"'+" group by "+'"'+"jardinier_id"+'"'+" having count(id)>0 order by count(id) desc offset 0 limit 5);"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})