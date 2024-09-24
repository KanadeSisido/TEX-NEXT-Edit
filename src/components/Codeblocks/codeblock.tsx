import { Box, Card, Stack, Typography } from "@mui/material"
import { Draggable } from "@hello-pangea/dnd";
import { ReactNode } from "react";


type pr = {
    Name : string,
    AlternativeName: string,
    id : string,
    index: number,
    icon: ReactNode,
    children?: ReactNode,
};

const Codeblock = (props: pr) => {
  console.log(props.id);
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
              </Stack>
            
          </Card>
        </div>
      )}
    </Draggable>
   
  )
}

export default Codeblock