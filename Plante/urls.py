from django.urls import path
from . import views
urlpatterns=[
    path('',views.plante,name='plante'),
    path('addPlante',views.addPlante,name="addPlante"),
    path('getDataPlante',views.getDataPlante,name="getDataPlante"),
    path('deletePlante',views.deletePlante,name="deletePlante"),
    path('updatePlante',views.updatePlante,name="updatePlante"),
    path('searchPlante',views.searchPlante,name="searchPlante"),
    path('getNbrPlantParType',views.getNbrPlantParType,name="getNbrPlantParType"),
    path("getPriceByOperation",views.getPriceByOperation,name="getPriceByOperation")

]