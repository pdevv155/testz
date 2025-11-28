from django.db import models

class Workplace(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Наименование")
    description = models.TextField(blank=True, verbose_name="Описание")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP-адрес")

    def __str__(self):
        return self.name