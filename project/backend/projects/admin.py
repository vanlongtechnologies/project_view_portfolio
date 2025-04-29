from django.contrib import admin
from django import forms
from .models import Project, ProjectImage, ProjectTag, ProjectCategory

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(ProjectTag)
class ProjectTagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'
        widgets = {
            'tools': forms.Textarea(attrs={'rows': 3}),
        }

    def clean_tools(self):
        tools = self.cleaned_data['tools']
        if isinstance(tools, str):
            try:
                import json
                return json.loads(tools)
            except:
                raise forms.ValidationError('Tools must be a valid JSON array')
        return tools

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ('title', 'category', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'tags')
    search_fields = ('title', 'description')
    inlines = [ProjectImageInline]
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'category', 'description', 'thumbnail')
        }),
        ('Additional Info', {
            'fields': ('tools', 'link', 'featured', 'tags')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )