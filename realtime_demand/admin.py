# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.forms import forms
from django.shortcuts import render
from django.contrib import messages

from realtime_demand.models import Asset, AssetInvestors, Investor
from realtime_demand.file_upload_validator.file_upload_validator import InvestorFile, AssetFile


class FileUploadForm(forms.Form):
    investor_file = forms.FileField(label="Select Investor CSV")
    asset_file = forms.FileField(label="Select Asset CSV")

    def __init__(self, post=None, files=None):
        super(FileUploadForm, self).__init__(post, files)
        self.asset_file = None
        self.investor_file = None

    def clean(self):
        cleaned_data = super(FileUploadForm, self).clean()
        investor_file_data = cleaned_data.get('investor_file')
        asset_file_data = cleaned_data.get('asset_file')
        self.investor_file = InvestorFile(investor_file_data)
        self.asset_file = AssetFile(asset_file_data)
        self.investor_file.validate_fields()
        self.investor_file.validate_entries()
        self.asset_file.validate_fields()
        self.asset_file.validate_entries()

    def populate_database(self):
        self.investor_file.populate_database()
        self.asset_file.populate_database()


@admin.site.register_view('file/upload')
def populate_database_with_csv(request, *args, **kwargs):

    file_form = FileUploadForm()
    if request.method == "POST":
        file_form = FileUploadForm(request.POST, request.FILES)
        if file_form.is_valid():
            file_form.populate_database()
            messages.success(request, "Form submission successful!")
    return render(request, 'fileUpload.html', {"form": file_form})

admin.site.register(Investor)
admin.site.register(Asset)
admin.site.register(AssetInvestors)
