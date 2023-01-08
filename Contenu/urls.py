from django.urls import path
from . import views
urlpatterns=[
    path("",views.index,name="index"),
    path("getPlanteForJardinier",views.getPlanteForJardinier,name="getPlanteForJardinier"),
    path("getJardinForContenu",views.getJardinForContenu,name="getJardinForContenu"),
    path("addContenu",views.addContenu,name="addContenu"),
    path("getDataContenu",views.getDataContenu,name="getDataContenu"),
    path("deleteContenu",views.deleteContenu,name="deleteContenu"),
    path("updateContenu",views.updateContenu,name="updateContenu"),
    path("searhContenu",views.searhContenu,name="searhContenu"),
    path("getNbreJardinParContenu",views.getNbreJardinParContenu,name="getNbreJardinParContenu"),
    path("getNbrePlanteParJardin",views.getNbrePlanteParJardin,name="getNbrePlanteParJardin"),
    path("getTheLatestAddedContenu",views.getTheLatestAddedContenu,name="getTheLatestAddedContenu")
]