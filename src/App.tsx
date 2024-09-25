import { cloneElement, ReactElement, useCallback, useState } from 'react';
import { AppBar, Box, Button, Divider, Paper, Stack, styled, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TriggerLists } from './BlockConfigs';
import AddButton from './components/addButton';
import AddbuttonListItem from './components/addbuttonListItem';
import { codeblockindex } from './components/Codeblocks/codeblockindex';
import {v4 as uuid} from "uuid";

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';



const Logo = styled('img')
(
  {
    height:"25px",
  }
);

type stagedType = {

  index : number,
  id: string,
  value: number,
  component: string,

}


function App() {

  const [blocks, setBlocks] = useState<(stagedType | null)[][]>([[],[],[],[],[],[],[],[],[],[],[],[],[]]);

  const [staged, setStaged] = useState<stagedType | null>();

  const onDragEnd = (result: DropResult) => {

    console.log(result);
    const {source, destination} = result;

    //パレットから
    if ( source.droppableId === 'Maker')
    {
      if (destination && staged)
      {
        
        const _blocks = blocks;
        const index = TriggerLists.findIndex((element)=>element.id == destination.droppableId);

        _blocks[index].splice(destination.index, 0, staged);

        setStaged(null);

        setBlocks(_blocks);
        console.log(blocks);
      }
     

    }

    //同じところ
    if ( source.droppableId === destination?.droppableId)
    {
      const index = TriggerLists.findIndex((element)=>element.id === source.droppableId);
      const _blocks = blocks;
      const _insertdata = _blocks[index][source.index];

      _blocks[index].splice(source.index, 1);
      _blocks[index].splice(destination.index, 0, _insertdata);

      setBlocks(_blocks);

    }
    else
    {
      if (destination)
      {
        const sourceIndex = TriggerLists.findIndex((element)=>element.id === source.droppableId);
        const destIndex = TriggerLists.findIndex((element)=>element.id === destination.droppableId);
        
        const _blocks = blocks;
        const _insertdata = _blocks[sourceIndex][source.index];

        _blocks[sourceIndex].splice(source.index, 1);
        _blocks[destIndex].splice(destination.index, 0, _insertdata);
      }
      
    }

    TriggerLists.findIndex((element)=>{element.id === source.droppableId})

  };



  return (
   <>
   
      <AppBar position="sticky" color='default'>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', mx:1}}>
          <Logo src={Logofile}/>
          <Button color="primary" variant="contained">コンバート</Button>
        </Toolbar>
      </AppBar>


      <DragDropContext
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
                    
                    <Droppable droppableId={Trigger.id} key={uuid()}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                    
                        <Stack gap={1} sx={{mt:2, p:2, backgroundColor:"#F0F0F0", borderRadius:"5px"}}>
                          

                          {blocks[index].map((block,i)=>(
                            
                            // ここにブロック
                            <>
                              {block? cloneElement(codeblockindex[block.component] as ReactElement, { index: i, id: block.id }) : <></>}
                            </>

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

                          <>
                            {staged? cloneElement(codeblockindex[staged.component] as ReactElement, { index: 0, id: staged.id }): <></>}
                          </>

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
                  <AddbuttonListItem Name='ロボットを移動させる' NameAlternative='ロボットをいどうさせる' icon={<ControlCameraIcon />} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'move'})}/>
                  <AddbuttonListItem Name='ロボットを回転させる' NameAlternative='ロボットをまわす' icon={<ControlCameraIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'rot'})}/>
                </AddButton>
                
                <AddButton name='ハンドを動かす'>
                  <AddbuttonListItem Name='ハンドを上下に動かす' NameAlternative='ハンドをじょうげにうごかす' icon={<SwapVertIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'handud'})}/>
                  <AddbuttonListItem Name='ハンドを開閉させる' NameAlternative='ハンドをひらく・とじる' icon={<SyncAltIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'handoc'})}/>
                </AddButton>
                
                <AddButton name='LEDを光らせる'>
                  <AddbuttonListItem Name='赤色のLEDを光らせる・消す' NameAlternative='あかいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'r_led'})}/>
                  <AddbuttonListItem Name='緑色のLEDを光らせる・消す' NameAlternative='みどりいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'g_led'})}/>
                  <AddbuttonListItem Name='青色のLEDを光らせる・消す' NameAlternative='あおいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'b_led'})}/>
                </AddButton>
                <AddButton name='時間を待つ'>
                  <AddbuttonListItem Name='待機する' NameAlternative='じかんをまつ' icon={<AccessAlarmIcon/>} onclick={ ()=>setStaged({index : 0, id: uuid(), value: 0, component: 'wait'})}/>
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
