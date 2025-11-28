from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from workplaces.views import WorkplaceViewSet

router = DefaultRouter()
router.register(r'workplaces', WorkplaceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]