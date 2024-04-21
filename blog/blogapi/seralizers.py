from rest_framework import serializers
from blogapi.models import Category, Post, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ("id", "title", "body", "created_on", "last_modified", "categories")

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ("id", "name", "posts")