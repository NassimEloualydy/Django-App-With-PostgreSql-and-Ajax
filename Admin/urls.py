from django.urls import path
from . import views
urlpatterns=[
    path('login',views.login,name='login'),
    path('inscrire',views.inscrire,name="inscrire"),
    path('signIn',views.signIn,name="signIn"),
    path('Quitter',views.Quitter,name="Quitter"),
    path('compt',views.compt,name='compt'),
    path('updateCompt',views.updateCompt,name="updateCompt")
]