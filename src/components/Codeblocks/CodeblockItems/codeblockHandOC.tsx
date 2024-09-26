import Codeblock from '../codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
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
        <Codeblock Name={"ハンドを開閉させる"} AlternativeName='ハンドをひらく・とじる' id={props.data.id} index={props.index} GroupIndex={props.GroupIndex} icon={<SyncAltIcon sx={{color:"#505050"}}/>} Delete={props.Delete} sx={{backgroundColor: "#E0FFE0"}}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">設定</InputLabel>
                    <Select
                    labelId={"demo-simple-select-label-" + props.index}
                    id="demo-simple-select"
                    value={props.data.value? props.data.value: ""}
                    label="設定"
                    onChange={(e: SelectChangeEvent)=>{HandleEvent(e.target.value)}}
                    >

                        <MenuItem value={1}>開く</MenuItem>
                        <MenuItem value={2}>閉じる</MenuItem>

                    </Select>
                </FormControl>
            </Box>
        </Codeblock>
    </>
  )
}

export default CodeBlockMove