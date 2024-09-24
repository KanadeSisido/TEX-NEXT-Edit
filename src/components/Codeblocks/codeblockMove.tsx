import { useState } from 'react'
import Codeblock from './codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';


type pr = {
    id: string,
    index: number,
}

const CodeBlockMove = (props : pr) => {
    
    const [dir, setDir] = useState("");

    return (
    <Codeblock Name={"ロボットを移動させる"} AlternativeName='ロボットをいどうさせる' id={props.id} index={props.index} icon={<ControlCameraIcon sx={{color:"#505050"}} />}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">方向</InputLabel>
                <Select
                labelId={"demo-simple-select-label-" + props.index}
                id="demo-simple-select"
                value={dir}
                label="方向を入力"
                onChange={(e: SelectChangeEvent)=>{setDir(e.target.value as string)}}
                >

                    <MenuItem value={0}>前</MenuItem>
                    <MenuItem value={1}>後</MenuItem>
                    <MenuItem value={2}>左</MenuItem>
                    <MenuItem value={3}>右</MenuItem>
                    
                </Select>
            </FormControl>
        </Box>
    </Codeblock>
  )
}

export default CodeBlockMove