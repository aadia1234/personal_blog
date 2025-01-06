from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from blogapi.models import *
from .seralizers import *
from rest_framework.permissions import IsAuthenticated


class CategoryView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class PostView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all().order_by("created_on").reverse()
        category = self.request.query_params.get("category")
        title = self.request.query_params.get("title")
        if category is not None:
            queryset = queryset.filter(category=category)
        if title is not None:
            queryset = queryset.filter(title=title)
        return queryset

class CommentView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated] 
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all().order_by("created_on")
        post = self.request.query_params.get("post")
        if post is not None:
            queryset = queryset.filter(post=post)
        return queryset