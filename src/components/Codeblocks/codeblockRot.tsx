import { useState } from 'react'
import Codeblock from './codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';



type pr = {
    id: string,
    index: number,
}

const CodeBlockRot = (props : pr) => {
    
    const [dir, setDir] = useState("");

    return (
    <Codeblock Name={"ロボットを回転させる"} AlternativeName='ロボットをまわす' id={props.id} index={props.index} icon={<ControlCameraIcon sx={{color:"#505050"}} />}>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">方向</InputLabel>
                <Select
                labelId={"demo-simple-select-label-" + props.index.toString()}
                id="demo-simple-select"
                value={dir}
                label="方向を入力"
                onChange={(e: SelectChangeEvent)=>{setDir(e.target.value as string)}}
                >

                    <MenuItem value={0}>時計まわり</MenuItem>
                    <MenuItem value={1}>反時計まわり</MenuItem>

                </Select>
            </FormControl>
        </Box>
    </Codeblock>
  )
}

export default CodeBlockRot