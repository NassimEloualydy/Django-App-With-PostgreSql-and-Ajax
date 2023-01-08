from django.urls import path
from . import views
urlpatterns=[
    path("",views.index,name="index"),
    path("getJardinierForJardin",views.getJardinierForJardin,name="getJardinierForJardin"),
    path("addJardin",views.addJardin,name="addJardin"),
    path("getDataJardin",views.getDataJardin,name="getDataJardin"),
    path("deleteJardin",views.deleteJardin,name="deleteJardin"),
    path("updateJardin",views.updateJardin,name="updateJardin"),
    path("searchJardin",views.searchJardin,name="searchJardin"),
    path("getNbrJardinParJardinier",views.getNbrJardinParJardinier,name="getNbrJardinParJardinier"),
    path("getJardinParVille",views.getJardinParVille,name="getJardinParVille"),
    path("getTheMosteRecomendedGardens",views.getTheMosteRecomendedGardens,name="getTheMosteRecomendedGardens")
]
