from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Data population logic will be implemented here
        self.stdout.write(self.style.SUCCESS('Test data population logic goes here.'))
