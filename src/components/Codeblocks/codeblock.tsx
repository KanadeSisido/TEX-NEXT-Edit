import { Card, Stack, Typography } from "@mui/material"
import { Draggable } from "@hello-pangea/dnd";
import { ReactNode } from "react";


type pr = {
    Name : string,
    AlternativeName: string,
    index : number,
    children?: ReactNode,
};

const Codeblock = (props: pr) => {
  return (
    <Draggable draggableId={"draggable-"+ props.index.toString()} index={props.index}>
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
            p: 3,
            
            }}>
              <Stack direction='row' >
                <Typography sx={{flexGrow:1}}>{props.Name}</Typography>
                
                {props.children}
              </Stack>
            
          </Card>
        </div>
      )}
    </Draggable>
   
  )
}

export default Codeblock