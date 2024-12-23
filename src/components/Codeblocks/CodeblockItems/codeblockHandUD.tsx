import Codeblock from '../codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { BlockType } from '../../../App';

type pr = {

    GroupIndex: number,
    index: number,
    data: BlockType,

    Update : Function,
    Delete : Function,
}

const CodeBlockMove = (props : pr) => {


    const HandleEvent = (_value: string) =>{
        
        props.Update(props.GroupIndex, props.index, _value);
    }


    return (
    <>
        <Codeblock Name={"ハンドを上下に動かす"} AlternativeName='ハンドをじょうげにうごかす' id={props.data.id} index={props.index} GroupIndex={props.GroupIndex} icon={<SwapVertIcon sx={{color:"#505050"}}/>} Delete={props.Delete} sx={{backgroundColor: "#E0FFE0"}}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">方向</InputLabel>
                    <Select
                    labelId={"demo-simple-select-label-" + props.index}
                    id="demo-simple-select"
                    value={props.data.value? props.data.value: ""}
                    label="方向を入力"
                    onChange={(e: SelectChangeEvent)=>{HandleEvent(e.target.value)}}
                    >

                        <MenuItem value={1}>上</MenuItem>
                        <MenuItem value={2}>下</MenuItem>

                    </Select>
                </FormControl>
            </Box>
        </Codeblock>
    </>
  )
}

export default CodeBlockMove