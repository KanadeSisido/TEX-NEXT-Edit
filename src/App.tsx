import { AppBar, BottomNavigationAction, Box, Button, Card, Divider, Paper, Stack, styled, Toolbar, Typography } from '@mui/material'
import Logofile from './assets/logo.png'

const Logo = styled('img')
(
  {
    height:"25px",
  }
);


function App() {

  return (
   <>
   
      <AppBar position="sticky" color='default'>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', mx:1}}>
          <Logo src={Logofile}/>
          <Button color="primary" variant="contained">コンバート</Button>
        </Toolbar>
      </AppBar>

      <Stack direction='row' divider={<Divider orientation="vertical" flexItem />}>
        
        <Stack sx={{flexGrow:1, p:2}}>
          <Paper elevation={3} sx={{ p: 3}}>
            <Typography variant='h5'>コード</Typography>
            <Typography sx={{fontSize:13, color:"#909090"}}>ここにロボットのコードを書いてください</Typography>
          </Paper>
        </Stack>

        <Stack sx={{flexGrow:1, p:2}}>
          <Paper elevation={3} sx={{ p: 3, position:"sticky", top:72}}>
            <Typography variant='h5'>パレット</Typography>
            <Typography sx={{fontSize:13, color:"#909090"}}>ここからブロックを取ってください</Typography>
          </Paper>
        </Stack>
        
      </Stack>
      
   </>
  )
}

export default App
