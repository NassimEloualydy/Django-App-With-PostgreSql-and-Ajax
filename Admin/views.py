from django.shortcuts import render
from django.http import JsonResponse
from Admin.models import Admin
# Create your views here.
def login(request):
    if request.session.get('id',None)!=None and request.session.get('nom',None)!=None and request.session.get('photo',None)!=None and request.session.get('prenom',None)!=None and request.session.get('email',None)!=None and request.session.get('pw',None)!=None and request.session.get('cni',None)!=None:
        del request.session["photo"]
        del request.session["nom"]
        del request.session["prenom"]
        del request.session["email"]
        del request.session["pw"]
        del request.session["cni"]
        del request.session['id']

    return render(request,'login.html')
def compt(request):
    if request.session.get('nom',None)!=None:
        return render(request,'compt.html')
    
def inscrire(request):
    photo=request.FILES['photo']
    nom=request.POST['nom']
    prenom=request.POST['prenom']
    email=request.POST['email']
    pw=request.POST['pw']
    cni=request.POST['cni']
    if Admin.objects.filter(cni=cni).exists():
        return JsonResponse({"type":"error","message":"SVP cet cni exist deja !!"})
    if Admin.objects.filter(nom=nom,prenom=prenom).exists():
        return JsonResponse({"type":"error","message":"SVP le nom et le prenom exist deja !!"})
    if Admin.objects.filter(email=email).exists():
        return JsonResponse({"type":"error","message":"SVP cet email exist deja !!"})
    if Admin.objects.filter(pw=pw).exists():
        return JsonResponse({"type":"error","message":"SVP cet mot de pass exist deja !!"})
    a=Admin(nom=nom,prenom=prenom,cni=cni,photo=photo,email=email,pw=pw)
    a.save()
    return JsonResponse({"type":"success","message":"Inscription avec succes"})
def signIn(request):
    email=request.POST['email']
    pw=request.POST['pw']
    
    if Admin.objects.filter(email=email,pw=pw).exists():
        a=Admin.objects.filter(email=email,pw=pw).first()
        request.session["photo"]=a.photo.url
        request.session["nom"]=a.nom
        request.session["prenom"]=a.prenom
        request.session["cni"]=a.cni
        request.session["email"]=a.email
        request.session["pw"]=a.pw
        request.session['id']=a.pk

        return JsonResponse({"type":"success","message":"Connexion avec success"})
    else:
        return JsonResponse({"type":"error","message":"SVP le compt est introuvable !!"})
def Quitter(request):
    del request.session["photo"]
    del request.session["nom"]
    del request.session["prenom"]
def updateCompt(request):
    # photo=request.FILES['photo']
    nom=request.POST['nom']
    prenom=request.POST['prenom']
    email=request.POST['email']
    pw=request.POST['pw']
    cni=request.POST['cni']
    id=request.POST['id']
    if Admin.objects.filter(cni=cni).exclude(pk=int(id)).exists():
        return JsonResponse({"type":"error","message":"SVP cet cni exist deja !!"})
    if Admin.objects.filter(nom=nom,prenom=prenom).exclude(pk=int(id)).exists():
        return JsonResponse({"type":"error","message":"SVP le nom et le prenom exist deja !!"})
    if Admin.objects.filter(email=email).exclude(pk=int(id)).exists():
        return JsonResponse({"type":"error","message":"SVP cet email exsit deja !!"})
    if Admin.objects.filter(pw=pw).exclude(pk=int(id)).exclude():
        return JsonResponse({"type":"error","message":"SVP le mot de passe exist deja !!"})
    a=Admin.objects.filter(pk=int(id)).first()
    a.nom=nom
    a.prenom=prenom
    a.email=email
    a.pw=pw
    a.cni=cni
    if request.FILES:
        a.photo=request.FILES['photo']
    a.save()
    a=Admin.objects.filter(pk=int(id)).first()
    request.session["photo"]=a.photo.url
    request.session["nom"]=a.nom
    request.session["prenom"]=a.prenom
    request.session["cni"]=a.cni
    request.session["email"]=a.email
    request.session["pw"]=a.pw
    request.session['id']=a.pk
    return JsonResponse({"type":"success","message":"Moddifier avec success !!"})
