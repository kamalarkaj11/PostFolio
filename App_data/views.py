from django.shortcuts import render
from .models import *

# Create your views here.
def home(request):
    if request.method=="POST":
        name=request.POST.get('name')
        email=request.POST.get('email')
        message=request.POST.get('message')
        print(name,email,message)
        user=Contact(name=name, email=email, message=message)
        
        user.save()
    return render(request,"home.html")

def atm(request):
    return render(request,"atm.html")

def calculator(request):
    return render(request,'calculator.html')

def marksheet(request):
    return render(request,'marksheet.html')