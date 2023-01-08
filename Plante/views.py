from django.shortcuts import render
from django.http import JsonResponse
from Plante.models import Plante
from django.core import serializers
from django.db import connection,transaction
# Create your views here.
def plante(request):
    if request.session.get('nom',None)==None:
        return render(request,'login.html')
    else:
        return render(request,'plante.html')
def addPlante(request):
    serie=request.POST['serie']
    nom=request.POST['nom']
    origine=request.POST['origine']
    typeP=request.POST['typeP']
    prix=request.POST['prix']
    if Plante.objects.filter(serie=serie).exists():
        return JsonResponse({"type":"error","message":"SVP cet serie exist deja !!"})
    if Plante.objects.filter(nom=nom).exists():
        return JsonResponse({"type":"error","message":"SVP cet nom exist deja !!"})
    P=Plante(serie=serie,nom=nom,origine=origine,typeP=typeP,prix=prix)
    P.save()
    return JsonResponse({"type":"success","message":"Ajouter avec success !!"})
def getDataPlante(request):
    offsetPlante=request.POST['offsetPlante']
    p=Plante.objects.order_by('serie')[int(offsetPlante):int(offsetPlante)+5]
    data=serializers.serialize('json',p)
    return JsonResponse({"data":data})
def deletePlante(request):
    id=request.POST["id"]
    Plante.objects.filter(pk=int(id)).delete()
    return JsonResponse({"type":"success","message":"supprimer avec succes"})
def updatePlante(request):
    id=request.POST["id"]
    serie=request.POST['serie']
    nom=request.POST['nom']
    origine=request.POST['origine']
    typeP=request.POST['typeP']
    prix=request.POST['prix']
    if Plante.objects.filter(id=id,serie=serie).exclude(id=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet serie exist deja !!"})
    if Plante.objects.filter(nom=nom).exclude(id=id).exists():
        return JsonResponse({"type":"error","message":"SVP cet nom exist deja !!"})
    Plante.objects.filter(pk=int(id)).update(serie=serie,nom=nom,origine=origine,typeP=typeP,prix=prix)
    return JsonResponse({"type":"success","message":"Moddifier avec success"})
def searchPlante(request):
    serie=request.POST['serie']
    nom=request.POST['nom']
    origine=request.POST['origine']
    typeP=request.POST['typeP']
    prix=str(request.POST['prix'])
    cursor=connection.cursor()
    query="SELECT p.* FROM "+'"'+"Plante_plante"+'"'+" p inner join "+'"'+"Plante_plante"+'"'+" p1 on p1.id=p.id inner join "+'"'+"Plante_plante"+'"'+" p2 on p2.id=p.id inner join "+'"'+"Plante_plante"+'"'+" p3 on p3.id=p.id inner join "+'"'+"Plante_plante"+'"'+" p4 on p4.id=p.id inner join "+'"'+"Plante_plante"+'"'+" p5 on p5.id=p.id where p1.nom like '%"+nom+"%' and p2.serie like '%"+serie+"%' and p3.origine like '%"+origine+"%' and p4."+'"'+"typeP"+'"'+" like '%"+typeP+"%' and cast(p1.prix as varchar) like '%"+prix+"%' order by serie;"
    cursor.execute(query)
    return JsonResponse({'data':cursor.fetchall()})
def getNbrPlantParType(request):
    cursor=connection.cursor()
    query="select  "+'"'+"typeP"+'"'+" as "+'"'+"type"+'"'+",count(nom) from "+'"'+"Plante_plante"+'"'+" group by "+'"'+"typeP"+'"'+";"
    cursor.execute(query)
    return JsonResponse({'data':cursor.fetchall()})
def getPriceByOperation(request):
    val=request.POST["value"]
    operation=request.POST["operation"]
    cursor=connection.cursor()    
    if operation=="=":
        query="SELECT COUNT(*) FROM "+'"'+"Plante_plante"+'"'+" WHERE prix = "+val
        cursor.execute(query)
        return JsonResponse({"data":cursor.fetchall()})
    if operation==">":
        query="SELECT COUNT(*) FROM "+'"'+"Plante_plante"+'"'+" WHERE prix > "+val
        cursor.execute(query)
        return JsonResponse({"data":cursor.fetchall()})
    if operation=="<":
        query="SELECT COUNT(*) FROM "+'"'+"Plante_plante"+'"'+" WHERE prix < "+val
        cursor.execute(query)
        return JsonResponse({"data":cursor.fetchall()})
    
    
