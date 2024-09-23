import { useCallback } from 'react';
import { AppBar, Box, Button, Card, Divider, Paper, Stack, styled, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png'
import Codeblock from './components/codeblock';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TriggerLists } from './BlockConfigs';

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

        {/*左右分割 */}
        <Stack direction='row' divider={<Divider orientation="vertical" flexItem />}>

          {/*左　コードスペース */}
          <Stack gap={3} sx={{m:3, flexGrow:1}}>
            <Box>
              <Typography variant='h6'>コード</Typography>
              <Typography sx={{fontSize:10, color:"#909090"}}>ここにコードを書いてください</Typography>  
            </Box>
            <Paper elevation={3} sx={{p:2}}>
            
             <Stack gap={3}>
              <Typography sx={{fontSize:12, color:"#909090"}}>ROBOT - Main</Typography>

                {/* map関数でDropableを展開 */}
                {TriggerLists.map((Trigger, index)=>(

                  <Droppable droppableId={"Handle-" + index.toString()} key={"handle--" + index.toString()}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                      
                      <Paper elevation={1} sx={{ p: 2}}>
                        <Typography variant='body1'>{Trigger.Name}</Typography>
                        
                        <Stack gap={1} sx={{mt:2, p:2, backgroundColor:"#F0F0F0", borderRadius:"5px"}}>
                          <Codeblock heading={"hello"} index={index} />
                          <Codeblock heading={"hi"} index={index*100} />
                          
                          {provided.placeholder}
                        </Stack>
                        
                      </Paper>

                        
                        
                      </div>
                    )}
                  </Droppable>
                ))}
              
              </Stack>
            </Paper>

          </Stack>
          

            
          {/* 右 */}
          <Stack gap={3} sx={{flexGrow:1, mt:3, position:"sticky", top:89, height:'90vh'}}>
            <Box sx={{ml:3}}>
              <Box>
                <Typography variant='h6'>パレット</Typography>
                <Typography sx={{fontSize:10, color:"#909090"}}>ここからブロックを取ってください</Typography>  
              </Box>
              <Box sx={{mr:2, mt:3}}>
                
                <Paper elevation={3} sx={{p:2}}>
                  <Paper elevation={0} sx={{p:2, backgroundColor:"#F0F0F0"}}>
                    <Droppable droppableId={"Maker"} key={"Maker"}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                            <Codeblock heading={"bonjour"} index={1010} />
                              
                              {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                
                </Paper>

              </Box>
            </Box>
           
            <Box sx={{p:1, overflowY:'scroll'}}>
              <Paper elevation={3} sx={{ p: 3, ml:1}}>
                
                {/* 以下にブロック */}
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
                <Card sx={{p:3}}>
                hello
                </Card>
              

              </Paper>


            </Box>
          </Stack>
          
        </Stack>
      </DragDropContext>
      
   </>
  )
}

export default App
