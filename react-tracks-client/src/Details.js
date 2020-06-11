import { useQuery } from '@apollo/react-hooks';
import React from "react";
import withRoot from "./withRoot";
import gql from 'graphql-tag'

import { withStyles } from '@material-ui/core/styles';

// import { List }  from 'react-native-elements';
import { ListItemText, List , ListItem} from '@material-ui/core';


const GET_USER_QUERY = gql`
{
    track{
        id
        title
        description
}
}
`;

function get(props) {
    
    const {data,loading,error} = useQuery(GET_USER_QUERY)
    if (data){
        console.log(data)
    }
    if (loading){
        return <p>Loading...</p>

    }
    if (error){
        console.log(error)
    }
    return (
        <List>
                {data && data.track && data.track.map(tracks =>(
                    <ListItem>
                        <ListItemText
                            primary={tracks.title}
                            secondary={tracks.description}>
                        </ListItemText>
                    </ListItem>
                )
                )}
        </List>
    )

}


export default withRoot(get);
