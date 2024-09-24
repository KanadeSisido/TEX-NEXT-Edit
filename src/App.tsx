import { useCallback, useState } from 'react';
import { AppBar, Box, Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, styled, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png'
import Codeblock from './components/Codeblocks/codeblock';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TriggerLists } from './BlockConfigs';
import AddButton from './components/addButton';
import AddbuttonListItem from './components/addbuttonListItem';
import {v4 as uuid} from "uuid";

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import CodeBlockMove from './components/Codeblocks/codeblockMove';
import CodeBlockRot from './components/Codeblocks/codeblockRot';

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


  const [blocks, setBlocks] = useState([[<>h</>,<>e</>],[],[],[],[],[],[],[],[],[],[],[],[]]);
  const [statements, setStatements] = useState([[],[],[],[],[],[],[],[],[],[],[],[],[]]);

  const [staged, setStaged] = useState(<></>);





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

                  
                  <Paper elevation={1} sx={{ p: 2}}>
                        
                    <Typography variant='body1'>{Trigger.Name}</Typography>
                    <Typography variant='body2' sx={{color:"#909090", fontSize:"12px"}}>{Trigger.AlternativeName}</Typography>
                    
                    <Droppable droppableId={uuid()} key={uuid()}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                    
                        <Stack gap={1} sx={{mt:2, p:2, backgroundColor:"#F0F0F0", borderRadius:"5px"}}>
                          
                          {/*ここにブロックが入る */}
                          {blocks[index].map((block,i)=>(
                            
                            block

                          ))}
                          
                          {provided.placeholder}

                        </Stack>

                        </div>
                      )}
                    </Droppable>
                      
                  </Paper>
 
                ))}
              
              </Stack>
            </Paper>

          </Stack>
          

            
          {/* 右 */}
          <Stack gap={3} direction="row" sx={{flexGrow:1, mt:3, position:"sticky", top:89, height:'90vh'}}>
            <Box sx={{ml:3, flexGrow:1}}>
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

                          {/* ここにブロック */}
                          
                          {staged}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                
                </Paper>

              </Box>
            </Box>
           
            <Box sx={{p:1, flexGrow:1, overflowY:'scroll'}}>
              <Paper elevation={3} sx={{ p: 3, ml:1}}>
                
                {/* 以下にブロック */}
                <AddButton name='ロボットを動かす'>
                  <AddbuttonListItem Name='ロボットを移動させる' NameAlternative='ロボットをいどうさせる' icon={<ControlCameraIcon />} setStaged={setStaged} spawn={'move'}/>
                  <AddbuttonListItem Name='ロボットを回転させる' NameAlternative='ロボットをまわす' icon={<ControlCameraIcon/>} setStaged={setStaged} spawn={'rot'}/>
                </AddButton>
                
                <AddButton name='ハンドを動かす'>
                  <AddbuttonListItem Name='ハンドを上下に動かす' NameAlternative='ハンドをじょうげにうごかす' icon={<SwapVertIcon/>} setStaged={setStaged} spawn={'handUD'}/>
                  <AddbuttonListItem Name='ハンドを開閉させる' NameAlternative='ハンドをひらく・とじる' icon={<SyncAltIcon/>} setStaged={setStaged} spawn={'handOC'}/>
                </AddButton>
                
                <AddButton name='LEDを光らせる'>
                  <AddbuttonListItem Name='赤色のLEDを光らせる・消す' NameAlternative='あかいろのLEDをひからせる・けす' icon={<LightModeIcon/>} setStaged={setStaged} spawn={'RLED'}/>
                  <AddbuttonListItem Name='青色のLEDを光らせる・消す' NameAlternative='あおいろのLEDをひからせる・けす' icon={<LightModeIcon/>} setStaged={setStaged} spawn={'BLED'}/>
                  <AddbuttonListItem Name='緑色のLEDを光らせる・消す' NameAlternative='みどりいろのLEDをひからせる・けす' icon={<LightModeIcon/>} setStaged={setStaged} spawn={'GLED'}/>
                </AddButton>
                <AddButton name='時間を待つ'>
                  <AddbuttonListItem Name='待機する' NameAlternative='じかんをまつ' icon={<AccessAlarmIcon/>} setStaged={setStaged} spawn={'Wait'}/>
                </AddButton>
                
              

              </Paper>


            </Box>
          </Stack>
          
        </Stack>
      </DragDropContext>
      
   </>
  )
}

export default App
