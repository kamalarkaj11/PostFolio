from django.urls import path
from .views import*

urlpatterns = [
    path('',home,name="home"),
    path('atm/',atm,name="atm"),
    path('calculator/',calculator,name="calculator"),
    path('marksheet/',marksheet,name="marksheet")
               ]
