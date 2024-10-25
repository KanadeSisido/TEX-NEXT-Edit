import { cloneElement, ReactElement, useEffect, useState } from 'react';
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
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


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
  const [awakeCond, setAwakeCond] = useState(false);

  const [openCombert, setOpenCombert] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [snack, setSnack] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [duration, setDuration] = useState(false);

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [uName, setUName] = useState("");
  const [uid, setUid] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);

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

        if(staged && destination.droppableId == 'onAwaken' && ['move', 'rot', 'handud', 'handoc'].includes(staged.component))
        {
          setAwakeCond(true);
          return;
        }

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

        console.log("ins", _insertdata);

        if(_insertdata && destination.droppableId == 'onAwaken' && ['move', 'rot', 'handud', 'handoc'].includes(_insertdata.component))
        {
          setAwakeCond(true);
          return;
        }

        _blocks[sourceIndex].splice(source.index, 1);
        _blocks[destIndex].splice(destination.index, 0, _insertdata);

        setBlocks(_blocks);
        console.log("tigau", result);
        console.log(blocks);
    
      }



  };

  const TryLogin = ()=>{

    let unsubscribe : (()=>void);

    signInWithEmailAndPassword(auth, (userID + "@example.com") , password).then(
      ()=>{
        setStepIndex(1);
        setUName(userID);
        
        unsubscribe = onAuthStateChanged(auth, async (user)=>{
          console.log(user);
          if(user)
          {
            console.log(user.uid);
            setUid(user.uid);

          }

        })
      }
    ).catch((e)=>{

      console.log(e);
      setInvalidPass(true);

    })



    useEffect(()=>{
      return () => {
        unsubscribe();
      }


    },[]);

  }

 

  async function UploadData(userId: string, userData: (BlockType | null)[][])
  {
    try{

      const uploadBlocks = {
        'onAwaken' : userData[0],
        'onJoyStickFront' : userData[1],
        'onJoyStickBack' : userData[2],
        'onJoyStickRight' : userData[3],
        'onJoyStickLeft' : userData[4],
        'onMaruButton': userData[5],
        'onBatuButton' : userData[6],
        'onSankakuButton' : userData[7],
        'onShikakuButton': userData[8],
        'onL1Button' : userData[9],
        'onL2Button' : userData[10],
        'onR1Button' : userData[11],
        'onR2Button' : userData[12],
      }

      const uploadData = {createdBy: uid, data:uploadBlocks}
      console.log(uploadData);
      await setDoc(doc(db, "userData", userId), uploadData);
      setUploaded(true);
      setSnack(true);
      setDuration(true);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
   <>
   
      <AppBar position="sticky" color='default'>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', mx:1}}>
          <Logo src={Logofile}/>
          <Stack gap={1} direction="row">
            <Button color="primary" variant="contained" onClick={()=>{setOpenCombert(true);}}>アップロード</Button>
            <Button color="primary" variant="outlined" onClick={()=>{signOut(auth); window.location.reload();}}>ログアウト</Button>
          </Stack>
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
                <AddButton name='ロボットを動かす' sx={{backgroundColor: "#FFE0E0"}}>
                  <AddbuttonListItem  Name='ロボットを移動させる' NameAlternative='ロボットをいどうさせる' icon={<ControlCameraIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'move'})}/>
                  <AddbuttonListItem Name='ロボットを回転させる' NameAlternative='ロボットをまわす' icon={<ThreeSixtyIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'rot'})}/>
                </AddButton>
                
                <AddButton name='ハンドを動かす' sx={{backgroundColor: "#E0FFE0"}}>
                  <AddbuttonListItem Name='ハンドを上下に動かす' NameAlternative='ハンドをじょうげにうごかす' icon={<SwapVertIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'handud'})}/>
                  <AddbuttonListItem Name='ハンドを開閉させる' NameAlternative='ハンドをひらく・とじる' icon={<SyncAltIcon/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'handoc'})}/>
                </AddButton>
                
                <AddButton name='LEDを光らせる' sx={{backgroundColor: "#FEFEFE"}}>
                  <AddbuttonListItem Name='赤色のLEDを光らせる・消す' NameAlternative='あかいろのLEDをひからせる・けす' icon={<LightModeIcon sx={{color:"#F06060"}}/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'r_led'})}/>
                  <AddbuttonListItem Name='緑色のLEDを光らせる・消す' NameAlternative='みどりいろのLEDをひからせる・けす' icon={<LightModeIcon sx={{color:"#60F060"}}/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'g_led'})}/>
                  <AddbuttonListItem Name='青色のLEDを光らせる・消す' NameAlternative='あおいろのLEDをひからせる・けす' icon={<LightModeIcon sx={{color:"#6060F0"}}/>} onclick={ ()=>setStaged({id: uuid(), value: "", component: 'b_led'})}/>
                </AddButton>
                <AddButton name='時間を待つ' sx={{backgroundColor: "#E0E0FF"}}>
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
        
        <Paper sx={{width:"50vw", height: "70vh", p: 4}}>
          <Stack direction='column' sx={{height: '100%'}}>
            <Box sx={{display:'flex', justifyContent: 'right'}}>
              <IconButton onClick={()=>{setOpenCombert(false); setDuration(false)}} sx={{}}><CloseIcon/></IconButton>
            </Box>
            <Stack sx={{mt:2, height: '100%'}}>
              
              <UploadSteps steps={["ログイン", "アップロード","リザルト"]} stepIndex={stepIndex}/>
              <>
              
              {
                //コンバート結果
                (stepIndex == 0)?
                <Stack>
                    <Box gap={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8, mb: 4}}>
                      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:1, mb:2}}>
                        <Typography variant='h5'>ログイン</Typography>
                        <Typography variant='body1' sx={{fontSize:14}}>アップロードするにはログインしてください</Typography>
                      </Box>
                      
                          <TextField required
                            id="read-only-userID"
                            label="ユーザID"
                            value={userID}
                            error={invalidPass}
                            onChange={e=> setUserID(e.target.value)}
                            sx={{width: 300}}
                          />
                          <TextField required
                            id="read-only-userID"
                            label="パスワード"
                            value={password}   
                            error={invalidPass}
                            helperText={invalidPass? "ACCESS ID または パスワードが間違っています": ""}                     
                            onChange={e=>setPassword(e.target.value)}
                            sx={{width: 300}}
                          />
                          
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'end', mt: 3}}>
                      <Button variant='contained' onClick={()=>TryLogin()}>ログイン</Button>
                    </Box>
                </Stack>
                :(stepIndex == 1)?
                  <Stack>
                    <Box gap={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8, mb: 4}}>
                      <Typography variant='h5'>コードをアップロード</Typography>
                      
                        <Box gap={1} sx={{display: 'flex'}}>
                          <TextField
                            id="read-only-userID"
                            label="ユーザID"
                            defaultValue={uName}
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                          />
                          <Button variant='outlined' disabled={duration} onClick={() => UploadData(uName, blocks)}>アップロード</Button>
                        </Box>


                        <Alert severity='info' >利用規約をご確認の上，コードをアップロードしてください</Alert>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'end', mt: 3}}>
                      <Button variant='contained' disabled={!uploaded} onClick={()=>{setStepIndex(2); setDuration(false);}}>次へ</Button>
                    </Box>
                </Stack>
                :
                <Stack>
                  <Box gap={4} sx={{display: 'flex', flexDirection:'column', alignItems: 'center', pt: 8, mb: 4}}>        
                    <Typography variant='h5'>アップロード完了</Typography>
                    <Typography>アップロードが完了しました．<br/>ロボットの準備ができるまで少々お待ちください．</Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'end', mt: 3}}>
                    <Button onClick={()=>setStepIndex(1)}>戻る</Button>
                    <Button variant='contained' onClick={()=>{setOpenCombert(false); signOut(auth); window.location.reload();}}>終了する</Button>
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
          message="アップロード完了"
        />        

      </Backdrop>
      
      <Snackbar
          open={awakeCond}
          autoHideDuration={5000}
          onClose={()=>{setAwakeCond(false); console.log("close")}}
          message="「ロボット起動時」にそのブロックは置けません"
      />
      
   </>
  )
}

export default App
