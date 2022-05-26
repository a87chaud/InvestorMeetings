from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from meetingsApp.models import Meetings

# Create your views here.
def index(request):
    return HttpResponse('On index page')

# the view for making new meetings 
# 
def meetings(request):
    # for a post method 
    if request.method == 'POST':
        # stored as a json array
        json_arr = request.body
        json_obj = json.loads(json_arr)
        print('json: ', json_obj)
        
        # The state from the React component was saved in an array and each of the fields correspond to a 
        # different index in the array. To see how the index of each field you can check the console
        title = json_obj[0]
        date = json_obj[1]
        time = json_obj[2]
        description = json_obj[3]
        
        meetings = Meetings.objects.create(
            title = title,
            date = date,
            time = time,
            description = description,
        )
        meetings.save()
        return HttpResponse('Success')
    else:
        print(request.body)
        return HttpResponse('2')

    