from django.urls import path
from . import views
urlpatterns=[
    path('',views.index,name='index'),
    path('addJardinier',views.addJardinier,name="addJardinier"),
    path('getDataJardinier',views.getDataJardinier,name="getDataJardinier"),
    path('deleteJardinier',views.deleteJardinier,name="deleteJardinier"),
    path("updateJardinier",views.updateJardinier,name="updateJardinier"),
    path("searchJardinier",views.searchJardinier,name="searchJardinier"),
    path("getNbrAnneEmbaush",views.getNbrAnneEmbaush,name="getNbrAnneEmbaush"),
    path("getNbrJardinierParAnnee",views.getNbrJardinierParAnnee,name="getNbrJardinierParAnnee"),
    path("getJardinierParSexe",views.getJardinierParSexe,name="getJardinierParSexe"),
    path("getLatesAddedJardinier",views.getLatesAddedJardinier,name="getLatesAddedJardinier")
]
