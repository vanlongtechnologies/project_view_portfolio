from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, 
    ProjectCategoryViewSet,
    tag_list,
    tag_detail,
    category_list,
    category_detail,
    search_projects,
    filter_projects,
    sort_projects,
    auth_status,
    auth_login,
    auth_logout,
    get_csrf_token
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'categories', ProjectCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tags/', tag_list, name='tag-list'),
    path('tags/<int:pk>/', tag_detail, name='tag-detail'),
    path('categories/', category_list, name='category-list'),
    path('categories/<int:pk>/', category_detail, name='category-detail'),
    path('projects/search/', search_projects, name='search-projects'),
    path('projects/filter/', filter_projects, name='filter-projects'),
    path('projects/sort/', sort_projects, name='sort-projects'),
    path('auth/status/', auth_status, name='auth-status'),
    path('auth/login/', auth_login, name='auth-login'),
    path('auth/logout/', auth_logout, name='auth-logout'),
    path('auth/csrf/', get_csrf_token, name='auth-csrf'),
]