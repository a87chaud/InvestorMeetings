from django.db import models

# Create your models here.

# Agenda 
    # meetings
        # title, time, text desc
        
class Meetings(models.Model):
    title = models.CharField(max_length=100, blank=False, default = "")
    date = models.DateField(verbose_name='date', blank=False)
    time = models.IntegerField(verbose_name = 'time taken', default = 0)
    description = models.TextField(max_length = 500, blank=False, default = "")
    
    # 
    def __str__(self):
        return self.title,