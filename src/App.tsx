import { cloneElement, ReactElement, useState } from 'react';
import { Alert, AppBar, Backdrop, Box, Button, Divider, IconButton, Paper, Snackbar, Stack, styled, TextField, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { TriggerLists } from './BlockConfigs';
import AddButton from './components/addButton';
import AddbuttonListItem from './components/addbuttonListItem';
import { codeblockindex } from './components/Codeblocks/codeblockindex';
import {v4 as uuid} from "uuid";

import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import UploadSteps from './components/UploadSteps';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Logo = styled('img')
(
  {
    height:"25px",
  }
);

export type BlockType = {

  id: string,
  value?: string,
  component: string,

}


function App() {

  const [blocks, setBlocks] = useState<(BlockType | null)[][]>([[],[],[],[],[],[],[],[],[],[],[],[],[]]);

  const [staged, setStaged] = useState<BlockType | null>();

  const [openCombert, setOpenCombert] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [CppCode, setCppCode] = useState("This is Dummy Code");
  const [snack, setSnack] = useState(false);

  function Update(GroupIndex: number, Index: number, Value: string){

    if(GroupIndex == -1 && Index == -1)
    {
      if(staged)
      {
        setStaged({id:staged.id, value: Value, component:staged.component});
      }

      console.log(staged);
      return;
    }

    var _blocks = [...blocks];

    if(_blocks[GroupIndex][Index])
    {
      _blocks[GroupIndex][Index].value = Value;
    }

    console.log("a");

    setBlocks(_blocks);
    console.log(blocks);
    
  }

  function Delete(GroupIndex: number, Index: number){

    if(GroupIndex == -1 && Index == -1)
    {
      setStaged(null);
      
      return;
    }

    var _blocks = [...blocks];

    _blocks[GroupIndex].splice(Index, 1);

    setBlocks(_blocks);
  }


  const onDragEnd = (result: DropResult) => {

    const {source, destination} = result;

    if (!destination)
    {

      console.log("null Destination", result);
      console.log(blocks);
      
      return;
    }

    //パレットから
    if ( source.droppableId === 'Maker')
    {
      if (staged)
      {
        
        const _blocks = [...blocks];
        const index = TriggerLists.findIndex((element)=>(element.id == destination.droppableId));

        _blocks[index].splice(destination.index, 0, staged);

        setStaged(null);

        setBlocks(_blocks);
      }
      console.log("From Maker", result);
      console.log(blocks);
      return;
    }

    if(destination?.droppableId == 'Maker')
    {
      console.log("To Maker", result);
      console.log(blocks);
      return;
    }

    //同じところ
    if ( source.droppableId === destination?.droppableId)
    {
      const index = TriggerLists.findIndex((element)=>element.id == source.droppableId);
      const _blocks = [...blocks];
      const _insertdata = _blocks[index][source.index];

      _blocks[index].splice(source.index, 1);
      _blocks[index].splice(destination.index, 0, _insertdata);

      setBlocks(_blocks);
      console.log("onaji", result);
      console.log(blocks);

    }
    else //違うところ
    {

        const sourceIndex = TriggerLists.findIndex((element)=>element.id == source.droppableId);
        const destIndex = TriggerLists.findIndex((element)=>element.id == destination.droppableId);
        
        const _blocks = [...blocks];
        const _insertdata = _blocks[sourceIndex][source.index];

        _blocks[sourceIndex].splice(source.index, 1);
        _blocks[destIndex].splice(destination.index, 0, _insertdata);

        setBlocks(_blocks);
        console.log("tigau", result);
        console.log(blocks);
    
      }



  };



  return (
   <>
   
      <AppBar position="sticky" color='default'>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', mx:1}}>
          <Logo src={Logofile}/>
          <Button color="primary" variant="contained" onClick={()=>{setOpenCombert(true);}}>コンバート</Button>
        </Toolbar>
      </AppBar>


      <DragDropContext onDragEnd={onDragEnd}>

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
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                    
                        <Stack gap={1} sx={{mt:2, p:2, backgroundColor:"#F0F0F0", borderRadius:"5px"}}>
                          

                          {blocks[index].map((block,i)=>(
                            
                            // ここにブロック
                            <>
                              {block? cloneElement(codeblockindex[block.component] as ReactElement, { index: i, GroupIndex: index, data: block, Update: Update, Delete: Delete} ) : <></>}
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
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >

                          {/* ここにブロック */}

                          <>
                            {staged? cloneElement(codeblockindex[staged.component] as ReactElement, { index: -1, GroupIndex: -1, data: staged, Update: Update, Delete: Delete}): <></>}
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
                  <AddbuttonListItem Name='ロボットを移動させる' NameAlternative='ロボットをいどうさせる' icon={<ControlCameraIcon />} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'move'})}/>
                  <AddbuttonListItem Name='ロボットを回転させる' NameAlternative='ロボットをまわす' icon={<ThreeSixtyIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'rot'})}/>
                </AddButton>
                
                <AddButton name='ハンドを動かす'>
                  <AddbuttonListItem Name='ハンドを上下に動かす' NameAlternative='ハンドをじょうげにうごかす' icon={<SwapVertIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'handud'})}/>
                  <AddbuttonListItem Name='ハンドを開閉させる' NameAlternative='ハンドをひらく・とじる' icon={<SyncAltIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'handoc'})}/>
                </AddButton>
                
                <AddButton name='LEDを光らせる'>
                  <AddbuttonListItem Name='赤色のLEDを光らせる・消す' NameAlternative='あかいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'r_led'})}/>
                  <AddbuttonListItem Name='緑色のLEDを光らせる・消す' NameAlternative='みどりいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'g_led'})}/>
                  <AddbuttonListItem Name='青色のLEDを光らせる・消す' NameAlternative='あおいろのLEDをひからせる・けす' icon={<LightModeIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'b_led'})}/>
                </AddButton>
                <AddButton name='時間を待つ'>
                  <AddbuttonListItem Name='待機する' NameAlternative='じかんをまつ' icon={<AccessAlarmIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'wait'})}/>
                </AddButton>
                
              

              </Paper>


            </Box>
          </Stack>
          
        </Stack>
      </DragDropContext>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openCombert}
        onClick={()=>{}}
      >
        
        <Paper sx={{width:"60vw", height: "80vh", p: 2}}>
          <Stack direction='column' sx={{height: '100%'}}>
            <Box sx={{display:'flex', justifyContent: 'right'}}>
              <IconButton onClick={()=>setOpenCombert(false)} sx={{}}><CloseIcon/></IconButton>
            </Box>
            <Stack sx={{mt:2, height: '100%'}}>
              
              <UploadSteps steps={["コンバート結果","ログイン","リザルト"]} stepIndex={stepIndex}/>
              <>
              
              {
                //コンバート結果
                (stepIndex == 0)?
                  <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <Paper elevation={2} sx={{p: 3, mt: 6}}>
                      <Stack sx={{}}>
                        <Box sx={{mb:2, display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                          <Typography>コード</Typography>
                          <IconButton onClick={async ()=>{ await navigator.clipboard.writeText(CppCode); setSnack(true);}}><ContentCopyIcon/></IconButton>
                        </Box>
                        <Box sx={{p: 2, flexGrow:1, overflowY: 'scroll', height: '250px', backgroundColor:"#E0E0E0"}}>
                          <Typography>
                            {CppCode}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                    <Box sx={{display: 'flex', justifyContent: 'end', mt:3}}>
                      <Button variant='contained' onClick={()=>setStepIndex(1)}>次へ</Button>
                    </Box>
                  </Box>
                :(stepIndex == 1)?
                  //ログイン
                  <Stack>
                    <Box gap={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8, mb: 4}}>
                      <Typography variant='h5'>コードをアップロード</Typography>
                      
                        <Box gap={1} sx={{display: 'flex'}}>
                          <TextField
                            id="read-only-userID"
                            label="ユーザID"
                            defaultValue="001"
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                          />
                          <Button variant='outlined'>アップロード</Button>
                        </Box>


                        <Alert severity='success' >データベースとの接続は確立されています</Alert>

                      

                      
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'end', mt: 3}}>
                      <Button onClick={()=>setStepIndex(0)}>戻る</Button>
                      <Button variant='contained' onClick={()=>setStepIndex(2)}>次へ</Button>
                    </Box>
                  </Stack>
                :
                  //リザルト 
                <Stack>
                    <Box gap={4} sx={{display: 'flex', flexDirection:'column', alignItems: 'center', pt: 8, mb: 4}}>        
                      <Typography variant='h5'>アップロード完了</Typography>
                      <TextField
                        id="read-only-userID"
                        label="ユーザID"
                        defaultValue="001"
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}

                      sx={{width: "300px"}}
                      />
                      <TextField
                        id="read-only-userID"
                        label="パスワード"
                        defaultValue="Password"
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}

                        sx={{width: "300px"}}
                      />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'end', mt: 3}}>
                      <Button onClick={()=>setStepIndex(1)}>戻る</Button>
                      <Button variant='contained' onClick={()=>setOpenCombert(false)}>閉じる</Button>
                    </Box>
                  </Stack>
              }
              </>
              
            </Stack>

          </Stack>
        </Paper>
        <Snackbar
          open={snack}
          autoHideDuration={5000}
          onClose={()=>setSnack(false)}
          message="コピーしました"
        />
        
        

        

      </Backdrop>
   </>
  )
}

export default App
