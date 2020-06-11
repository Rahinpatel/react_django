from django.contrib.auth import get_user_model

from graphene_django import DjangoObjectType

import graphene

##query

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    users = graphene.Field(UserType,id=graphene.Int(required=True))

    def resolve_user(self,info,id):
        return get_user_model().objects.get(id=id)


class Alluser(graphene.ObjectType):
    user = graphene.List(UserType)
    
    def resolve_user(self,info):
        return get_user_model().objects.all()

##mutation

class DeleteUser(graphene.Mutation):
    user_id = graphene.Int()

    class Arguments:
        user_id = graphene.Int(required=True)

    def mutate(self,info,user_id):
        # user = info.context.user
        # print(user)
        userdata = get_user_model().objects.get(id=user_id) 
        print(userdata)
        userdata.delete()
        return DeleteUser(user_id=user_id)

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self,info,username,password,email):
        user = get_user_model()(
            username=username,
            password=password,
            email=email
        )
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    DeleteUser = DeleteUser.Field()
    

    