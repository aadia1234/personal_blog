from django.db import models
from django.conf import settings
from tinymce.models import HTMLField
import uuid

class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        abstract=True

class Category(UUIDModel):
    name = models.CharField(max_length=30)
    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Post(UUIDModel):
    title = models.CharField(max_length=255)
    banner = models.ImageField(upload_to="post_banners/")
    body = HTMLField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column="categories_id") # need to remove db_column later!

    def __str__(self):
        return self.title

class Comment(UUIDModel):
    author = models.CharField(max_length=60)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author} on \"{self.post}\""