import { ReactNode } from "react";

import CodeBlockMove from "./CodeblockItems/codeblockMove";
import CodeBlockRot from "./CodeblockItems/codeblockRot";
import CodeBlockHandUD from "./CodeblockItems/codeblockHandUD";
import CodeBlockHandOC from "./CodeblockItems/codeblockHandOC";
import CodeBlockLED from "./CodeblockItems/codeblockLED";
import CodeBlockWait from "./CodeblockItems/codeblockWait";



import { BlockType } from "../../App";


const dummydata: BlockType = {
    id: "dummy",
    component: "nil",
}

export const codeblockindex : {[key:string] : ReactNode} = {

    'nil' : <></>,
    'move' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'rot' : <CodeBlockRot index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'handud' : <CodeBlockHandUD index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'handoc' : <CodeBlockHandOC index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'g_led' : <CodeBlockLED index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}} iconColor="#60F060" Color="緑" AlterColor="みどり"/>,
    'b_led' : <CodeBlockLED index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}} iconColor="#6060F0" Color="青" AlterColor="あお"/>,
    'r_led' : <CodeBlockLED index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}} iconColor="#F06060" Color="赤" AlterColor="あか"/>,
    'wait' : <CodeBlockWait index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    
}