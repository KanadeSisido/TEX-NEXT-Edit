import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode } from 'react'
import { v4 as uuid } from 'uuid'
import CodeBlockMove from './Codeblocks/codeblockMove'
import CodeBlockRot from './Codeblocks/codeblockRot'

type pr = {
    
    icon: ReactNode,
    spawn: string,
    Name: string,
    NameAlternative: string,
    setStaged: Function,
}


const AddbuttonListItem = (props: pr) => {

  const id = uuid();
  var spawn = <></>

  switch(props.spawn)
  {
    case 'move':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'rot':
      spawn = <CodeBlockRot id={id} index={0}/>
    break
    case 'handUD':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'handOC':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'RLED':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'BLED':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'GLED':
      spawn = <CodeBlockMove id={id} index={0}/>
    break
    case 'Wait':
      spawn = <CodeBlockMove id={id} index={0}/>
    break

  }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={()=>{
          
          props.setStaged(spawn);

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