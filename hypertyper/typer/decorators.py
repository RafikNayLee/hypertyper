from django.http import  JsonResponse


def authenticate_user(func):
    def wrapper(request, **args):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({"error": "Must login"}, status=400, safe=False)
        return func(request, **args)

    return wrapper
