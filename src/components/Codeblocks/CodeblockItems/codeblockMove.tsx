import Codeblock from '../codeblock'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
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
        <Codeblock Name={"ロボットを移動させる"} AlternativeName='ロボットをいどうさせる' id={props.data.id} index={props.index} GroupIndex={props.GroupIndex} icon={<ControlCameraIcon sx={{color:"#505050"}}/>} Delete={props.Delete}>
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

                        <MenuItem value={1}>前</MenuItem>
                        <MenuItem value={2}>後</MenuItem>
                        <MenuItem value={3}>左</MenuItem>
                        <MenuItem value={4}>右</MenuItem>
                        
                    </Select>
                </FormControl>
            </Box>
        </Codeblock>
    </>
  )
}

export default CodeBlockMove