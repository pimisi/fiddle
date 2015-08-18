from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

class PostDataView(APIView):
    def post(self, request, *args, **kwargs):
        print("Request")
        print(self.request.data)
        print(type(self.request.data))
        # Get the data out
        request_data = self.request.data
        # print(request_data["subject"])
        # Send the mail

        return Response({"message": "The data was received successfully", "data": request_data})

    def get(self, request):
        return Response({"data": "This is the get response"})
