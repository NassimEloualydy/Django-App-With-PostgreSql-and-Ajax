# Generated by Django 4.1.4 on 2023-01-07 12:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Jardin', '0001_initial'),
        ('Plante', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contenu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qte', models.IntegerField()),
                ('datePlantation', models.DateTimeField(max_length=50)),
                ('jardin', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='Jardin.jardin')),
                ('plante', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='Plante.plante')),
            ],
        ),
    ]