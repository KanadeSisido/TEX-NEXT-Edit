import { useCallback } from 'react';
import { AppBar, Box, Button, Divider, Paper, Stack, styled, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png'
import Codeblock from './components/codeblock';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const Logo = styled('img')
(
  {
    height:"25px",
  }
);


function App() {
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);


  return (
   <>
   
      <AppBar position="sticky" color='default'>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', mx:1}}>
          <Logo src={Logofile}/>
          <Button color="primary" variant="contained">コンバート</Button>
        </Toolbar>
      </AppBar>


      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >

        <Stack direction='row' divider={<Divider orientation="vertical" flexItem />}>


          <Box sx={{m:3, flexGrow:1}}>
            <Droppable droppableId="CodeArea">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                
                <Paper elevation={3} sx={{ p: 3}}>
                  <Typography variant='h5'>コード</Typography>
                  <Typography sx={{fontSize:13, color:"#909090"}}>ここにロボットのコードを書いてください</Typography>
                  
                  <Stack>
                    
                    <Codeblock heading={"hello"} index={0}/>
                    <Codeblock heading={"hello"} index={1}/>

                  </Stack>

                  {provided.placeholder}
                
                </Paper>

                  
                  
                </div>
              )}
            </Droppable>
          </Box>
          

            

          <Stack sx={{flexGrow:1, p:2}}>
            <Paper elevation={3} sx={{ p: 3, position:"sticky", top:72}}>
              <Typography variant='h5'>パレット</Typography>
              <Typography sx={{fontSize:13, color:"#909090"}}>ここからブロックを取ってください</Typography>
              
              {/* 以下にブロック */}



            </Paper>


          </Stack>
          
        </Stack>
      </DragDropContext>
      
   </>
  )
}

export default App
