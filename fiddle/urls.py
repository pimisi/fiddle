from django.conf.urls import include, url
from django.contrib import admin
from apps.playground import views

admin.autodiscover()

urlpatterns = [
    url(r'^login$', 'django.contrib.auth.views.login'),
    # url(r'api/', include('apps.api.urls', namespace='api')),
    # url(r'^$', include('apps.responsive_web.urls', namespace='web')),
    url(r'^$', views.HomePageView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
]

# if settings.DEBUG:
    # import debug_toolbar
    # urlpatterns += [
    #     url(r'^__debug__/', include(debug_toolbar.urls)),
    # ]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]