import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { ReactNode } from 'react'

type pr = {
    
    icon: ReactNode,
    Name: string,
    NameAlternative: string,
}


const AddbuttonListItem = (props: pr) => {
  return (
    <ListItem disablePadding>
        <ListItemButton>
        <ListItemIcon>
            {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.Name} secondary={props.NameAlternative}/>
        </ListItemButton>
    </ListItem>
  )
}

export default AddbuttonListItem