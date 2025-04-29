from rest_framework import serializers
from .models import Project, ProjectImage, ProjectTag, ProjectCategory
from django.utils.text import slugify

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name', 'slug', 'description', 'order']
        read_only_fields = ['slug']

    def create(self, validated_data):
        if 'slug' not in validated_data:
            validated_data['slug'] = slugify(validated_data['name'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'name' in validated_data and 'slug' not in validated_data:
            validated_data['slug'] = slugify(validated_data['name'])
        return super().update(instance, validated_data)

class ProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTag
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']

    def create(self, validated_data):
        if 'slug' not in validated_data:
            validated_data['slug'] = slugify(validated_data['name'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'name' in validated_data and 'slug' not in validated_data:
            validated_data['slug'] = slugify(validated_data['name'])
        return super().update(instance, validated_data)

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'order']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, required=False)  # Allow empty list
    tags = ProjectTagSerializer(many=True, required=False)  # Allow empty list
    category_details = ProjectCategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'category_details', 'description', 
            'thumbnail', 'featured', 'tools', 'link', 
            'images', 'tags', 'created_at'
        ]

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        tags_data = validated_data.pop('tags', [])
        
        # Create the project instance
        project = Project.objects.create(**validated_data)
        
        # Handle the images if provided
        for image_data in images_data:
            ProjectImage.objects.create(project=project, **image_data)
        
        # Handle the tags if provided
        for tag_data in tags_data:
            project.tags.add(tag_data)
        
        return project
