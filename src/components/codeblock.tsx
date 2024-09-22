import { Card, Typography } from "@mui/material"
import { Draggable } from "@hello-pangea/dnd";


type pr = {
    heading : String,
    index : number,
};

const Codeblock = (props: pr) => {
  return (
    <Draggable draggableId={"draggable-"+ props.index.toString()} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Typography>{props.heading}</Typography>
          </Card>
        </div>
      )}
    </Draggable>
   
  )
}

export default Codeblock