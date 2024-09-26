import Codeblock from '../codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import { BlockType } from '../../../App';

type pr = {

    GroupIndex: number,
    index: number,
    data: BlockType,
    iconColor: string,
    Color: string,
    AlterColor: string,

    Update : Function,
    Delete : Function,
}

const CodeBlockMove = (props : pr) => {


    const HandleEvent = (_value: string) =>{
        
        props.Update(props.GroupIndex, props.index, _value);
    }


    return (
    <>
        <Codeblock Name={props.Color + "色のLEDを光らせる・消す"} AlternativeName={props.AlterColor + 'いろのLEDをひからせる・けす'} id={props.data.id} index={props.index} GroupIndex={props.GroupIndex} icon={<LightModeIcon sx={{color:props.iconColor}}/>} Delete={props.Delete} sx={{backgrondColor:'#FEFEFE'}}>
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

                        <MenuItem value={1}>光らせる</MenuItem>
                        <MenuItem value={2}>消す</MenuItem>

                    </Select>
                </FormControl>
            </Box>
        </Codeblock>
    </>
  )
}

export default CodeBlockMove