import Codeblock from '../codeblock'
import { Box, Button, Divider, Menu, MenuItem, Slider, TextField, Typography } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import { BlockType } from '../../../App';
import { useState } from 'react';

type pr = {

    GroupIndex: number,
    index: number,
    data: BlockType,

    Update : Function,
    Delete : Function,
}

const CodeBlockMove = (props : pr) => {
    
    const [value, setValue] = useState(parseFloat(props.data.value? props.data.value: '0'));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        props.Update(props.GroupIndex, props.index, value.toString());
    };


    const HandleChange = (event: Event, _value: number | number[]) => {

        
        setValue(_value as number);
    }



    return (
    <>
        <Codeblock Name={"待機する"} AlternativeName='じかんをまつ' id={props.data.id} index={props.index} GroupIndex={props.GroupIndex} icon={<AccessAlarmIcon sx={{color:"#505050"}}/>} Delete={props.Delete} sx={{backgroundColor: "#E0E0FF"}}>
            <Box sx={{ minWidth: 120, display:'flex'}}>
                <Divider orientation='vertical' variant='middle' flexItem/>
                <Button onClick={handleClick}>
                    <Typography sx={{color: "#111111"}} variant='body1'>
                        {value.toString() + "秒"}
                    </Typography>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={{width: '150px', pt:4, px:3, pb:1}}>
                        <Slider aria-label="Volume" value={value} onChange={HandleChange} step={0.5} marks min={0} max={5} valueLabelDisplay="auto"/>
                    </Box>
                </Menu>
            </Box>
        </Codeblock>
    </>
  )
}

export default CodeBlockMove