from django.conf.urls import patterns, url, include
from rest_framework.urlpatterns import format_suffix_patterns

from apps.api import views

general_urls = patterns(
    '',
    url(r'^/post-data', views.PostDataView.as_view()),
)

urlpatterns = patterns(
    '',
    url(r'^general', include(general_urls))
)

urlpatterns = format_suffix_patterns(urlpatterns)
