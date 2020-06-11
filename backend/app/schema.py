import graphene 
from graphene_django import DjangoObjectType
from .models import Track


class TrackType(DjangoObjectType):
    class Meta:
        model = Track

class AllTrack(graphene.ObjectType):
    track = graphene.List(TrackType)
    
    def resolve_track(self, info):
        return Track.objects.all()

class CreateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()
    
    def mutate(self,info,title,description,url):
        track = Track(
            title=title, 
            description=description, 
            url=url
        )
        track.save()
        return CreateTrack(track=track)
        # alldata.get('title')



class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()