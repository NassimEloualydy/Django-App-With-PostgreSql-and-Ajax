from django.shortcuts import render
from Jardinier.models import Jardinier
from django.http import JsonResponse
from django.core import serializers
from django.db import models
from django.db import connection
def index(request):
    if request.session.get('nom',None)==None:
        return render(request,'login.html')
    else:
        return render(request,'jardinier.html')
def addJardinier(request):
    photo=request.FILES["photo"]
    nom=request.POST["nom"]
    prenom=request.POST["prenom"]
    email=request.POST["email"]
    tel=request.POST["tel"]
    sexe=request.POST["sexe"]
    cni=request.POST["cni"]
    dateEmbauch=request.POST["dateEmboushe"]
    if Jardinier.objects.filter(cni=cni).exists():
        return JsonResponse({"type":"error","message":"SVP cet cni exist deja "})
    if Jardinier.objects.filter(nom=nom,prenom=prenom).exists():
        return JsonResponse({"type":"error","message":"SVP le nom et le prenom exist deja !!"})
    if Jardinier.objects.filter(email=email).exists():
        return JsonResponse({"type":"error","message":"SVP cet email exist deja !!"})
    if Jardinier.objects.filter(tel=tel).exists():
        return JsonResponse({"type":"errorr","message":"SVP cet telephone exist deja !!"})
    j=Jardinier(cni=cni,nom=nom,prenom=prenom,photo=photo,email=email,tel=tel,sexe=sexe,dateEmbauch=dateEmbauch)
    j.save()
    return JsonResponse({"type":"success","message":"Ajouter avec success"})
def getDataJardinier(request):
    ofsset=request.POST["ofsset"]
    j=Jardinier.objects.order_by("cni")[int(ofsset):int(ofsset)+5]
    data=serializers.serialize('json',j)
    return JsonResponse({"data":data})
def deleteJardinier(request):
    id=request.POST["id"]
    Jardinier.objects.filter(pk=id).delete()
    return JsonResponse({"type":"success","message":"Supprimer avec success "})
def updateJardinier(request):
    # photo=request.FILES["photo"]
    nom=request.POST["nom"]
    prenom=request.POST["prenom"]
    email=request.POST["email"]
    tel=request.POST["tel"]
    sexe=request.POST["sexe"]
    cni=request.POST["cni"]
    dateEmbauch=request.POST["dateEmboushe"]
    id=request.POST["id"]
    if Jardinier.objects.filter(cni=cni).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet cni exist deja !!"})
    if Jardinier.objects.filter(nom=nom,prenom=prenom).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP le nom et le prenom exist deja !!"})
    if Jardinier.objects.filter(email=email).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet email exist deja !!"})
    if Jardinier.objects.filter(tel=tel).exclude(pk=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet telephon exist deja !!"})
    if request.FILES:
        photo=request.FILES["photo"]
        j=Jardinier.objects.get(pk=id)
        j.photo=photo
        j.cni=cni
        j.nom=nom
        j.prenom=prenom
        j.email=email
        j.tel=tel
        j.dateEmbauch=dateEmbauch
        j.sexe=sexe
        j.save()
    else:
        Jardinier.objects.filter(pk=int(id)).update(cni=cni,nom=nom,prenom=prenom,email=email,tel=tel,sexe=sexe,dateEmbauch=dateEmbauch)
    return JsonResponse({"type":"success","message":"Moddifier avec success"})
def searchJardinier(request):
    nom=request.POST["nom"]
    prenom=request.POST["prenom"]
    email=request.POST["email"]
    tel=request.POST["tel"]
    sexe=request.POST["sexe"]
    cni=request.POST["cni"]
    dateEmbauch=request.POST["dateEmboushe"]
    cursor=connection.cursor()
    query="select j.* from "+'"'+"Jardinier_jardinier"+'"'+" as j inner join "+'"'+"Jardinier_jardinier"+'"'+" as j1 on j1.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j2 on j2.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j3 on j3.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j4 on j4.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j5 on j5.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j6 on j6.id=j.id inner join "+'"'+"Jardinier_jardinier"+'"'+" as j7 on j7.id=j.id where  j1.cni like '%"+cni+"%' and j2.nom like '%"+nom+"%' and  j3.email like '%"+email+"%' and j4.tel like '%"+tel+"%' and cast(j5."+'"'+"dateEmbauch"+'"'+" as varchar) like '%"+dateEmbauch+"%' and j6.prenom like '%"+prenom+"%' and  j7.sexe like '%"+sexe+"%' order by j.cni;"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getNbrAnneEmbaush(request):
    cursor=connection.cursor()
    query="select distinct  date_part('year',"+'"'+"dateEmbauch"+'"'+") from "+'"'+"Jardinier_jardinier"+'"'+";"
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getNbrJardinierParAnnee(request):
    if request.POST.get("annee",None)==None:
        query="select concat(date_part('year',"+'"'+"dateEmbauch"+'"'+"),'/',date_part('month',"+'"'+"dateEmbauch"+'"'+")),count(cni) from "+'"'+"Jardinier_jardinier"+'"'+" group by concat(date_part('year',"+'"'+"dateEmbauch"+'"'+"),'/',date_part('month',"+'"'+"dateEmbauch"+'"'+"));"
        cursor=connection.cursor()
        cursor.execute(query)
        return JsonResponse({"data":cursor.fetchall()})
    else:
        annee=request.POST["annee"]
        query="select date_part('month',"+'"'+"dateEmbauch"+'"'+"),count(cni) from "+'"'+"Jardinier_jardinier"+'"'+" where  date_part('year',"+'"'+"dateEmbauch"+'"'+")="+annee+" group by date_part('month',"+'"'+"dateEmbauch"+'"'+");"
        cursor=connection.cursor()
        cursor.execute(query)
        return JsonResponse({"data":cursor.fetchall()})
    
def getJardinierParSexe(request):
    query="SELECT sexe,count(cni) from "+'"'+"Jardinier_jardinier"+'"'+" group by sexe;"
    cursor=connection.cursor()
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})
def getLatesAddedJardinier(request):
    query="SELECT photo,nom,prenom FROM "+'"'+"Jardinier_jardinier"+'"'+" order by id desc offset 0 limit 5;"
    cursor=connection.cursor()
    cursor.execute(query)
    return JsonResponse({"data":cursor.fetchall()})