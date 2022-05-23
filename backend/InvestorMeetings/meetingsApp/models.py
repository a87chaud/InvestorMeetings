from django.db import models

# Create your models here.

# Agenda 
    # meetings
        # title, time, text desc
        
class Meetings(models.Model):
    title = models.CharField(max_length=100, blank=False, default = "")
    time_estimate = models.DateTimeField(verbose_name='time estimate', auto_now_add=True)
    description = models.TextField(max_length = 500, blank=False)
