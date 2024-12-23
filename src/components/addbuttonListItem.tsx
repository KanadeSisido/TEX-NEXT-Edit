import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode } from 'react'

type pr = {
    icon: ReactNode,
    Name: string,
    NameAlternative: string,
    onclick: Function,
}


const AddbuttonListItem = (props: pr) => {


  return (
    <ListItem disablePadding>
        <ListItemButton onClick={()=>{
          
          props.onclick();

        }}>
          <ListItemIcon>
              {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.Name} secondary={props.NameAlternative}/>
        </ListItemButton>
    </ListItem>
  )
}

export default AddbuttonListItem