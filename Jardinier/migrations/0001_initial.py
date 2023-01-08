# Generated by Django 4.1.4 on 2023-01-03 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Jardinier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='jardinier/%y/%m/%d/')),
                ('cni', models.CharField(max_length=50)),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('tel', models.CharField(max_length=50)),
                ('dateEmbauch', models.DateTimeField(max_length=50)),
                ('sexe', models.CharField(max_length=50)),
            ],
        ),
    ]