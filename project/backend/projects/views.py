from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Project, ProjectCategory, ProjectTag
from .serializers import ProjectSerializer, ProjectCategorySerializer, ProjectTagSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.core.mail import send_mail
from django.conf import settings

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ProjectCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [IsAdminOrReadOnly]

@api_view(['GET', 'POST'])
@permission_classes([IsAdminOrReadOnly])
def tag_list(request):
    if request.method == 'GET':
        tags = ProjectTag.objects.all()
        serializer = ProjectTagSerializer(tags, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProjectTagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAdminOrReadOnly])
def tag_detail(request, pk):
    try:
        tag = ProjectTag.objects.get(pk=pk)
    except ProjectTag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectTagSerializer(tag)
        return Response(serializer.data)
    elif request.method in ['PUT', 'PATCH']:
        serializer = ProjectTagSerializer(tag, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAdminOrReadOnly])
def category_list(request):
    if request.method == 'GET':
        categories = ProjectCategory.objects.all()
        serializer = ProjectCategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProjectCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAdminOrReadOnly])
def category_detail(request, pk):
    try:
        category = ProjectCategory.objects.get(pk=pk)
    except ProjectCategory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectCategorySerializer(category)
        return Response(serializer.data)
    elif request.method in ['PUT', 'PATCH']:
        serializer = ProjectCategorySerializer(category, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_projects(request):
    query = request.query_params.get('q', '')
    if query:
        projects = Project.objects.filter(title__icontains=query)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    return Response([])

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def filter_projects(request):
    category = request.query_params.get('category')
    if category:
        projects = Project.objects.filter(category=category)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    return Response([])

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def sort_projects(request):
    sort_by = request.query_params.get('sort_by', 'created_at')
    projects = Project.objects.all().order_by(sort_by)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def auth_status(request):
    if request.user.is_authenticated:
        return Response({
            'isAuthenticated': True,
            'user': {
                'id': request.user.id,
                'email': request.user.email,
                'username': request.user.username,
            }
        })
    return Response({
        'isAuthenticated': False,
        'user': None
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def auth_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({
            'error': 'Please provide both email and password'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=email, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
            }
        })
    else:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def auth_logout(request):
    logout(request)
    return Response({'message': 'Successfully logged out'})

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['POST'])
def contact_form(request):
    try:
        data = request.data
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Send email
        email_message = f"""
        New contact form submission from {name} ({email})
        
        Subject: {subject}
        
        Message:
        {message}
        """

        send_mail(
            subject=f'New Contact Form Submission: {subject}',
            message=email_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=False,
        )

        return Response({'message': 'Message sent successfully'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)