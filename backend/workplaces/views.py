from rest_framework import viewsets
from .models import Workplace
from .serializers import WorkplaceSerializer

class WorkplaceViewSet(viewsets.ModelViewSet):
    queryset = Workplace.objects.all().order_by('-id') # Новые сверху
    serializer_class = WorkplaceSerializer