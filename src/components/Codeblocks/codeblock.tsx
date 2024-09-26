import { Box, Card, IconButton, Stack, Typography } from "@mui/material"
import { Draggable } from "@hello-pangea/dnd";
import { ReactNode } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type pr = {
    Name : string,
    AlternativeName: string,
    id : string,
    
    Delete: Function,

    GroupIndex: number,
    index: number,

    icon: ReactNode,
    children?: ReactNode,
};

const Codeblock = (props: pr) => {

  const HandleDelete = () => {

    props.Delete(props.GroupIndex, props.index);
  }

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging? "0.5" : "1"
          }}
        >
          <Card elevation={1} sx={{
            maxWidth:"500px",
            p: 2,
            
            }}>
              <Stack direction='row' sx={{alignItems:"center"}}>
                {props.icon}
                <Box sx={{ml:2, flexGrow:1}}>
                  <Typography >{props.Name}</Typography>
                  <Typography sx={{color:"#909090", fontSize:"12px"}}>{props.AlternativeName}</Typography>
                </Box>
                
                {props.children}
                <Box sx={{flexGrow: 1}}></Box>
                <IconButton onClick={HandleDelete}><DeleteIcon/></IconButton>
              </Stack>
            
          </Card>
        </div>
      )}
    </Draggable>
   
  )
}

export default Codeblock