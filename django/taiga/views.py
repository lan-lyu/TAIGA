from django.shortcuts import render

# Home page
def home_page(request):
    return render(request, 'taiga/main.html', {})