import { ReactNode } from "react";

import CodeBlockMove from "./CodeblockItems/codeblockMove";
import { BlockType } from "../../App";


const dummydata: BlockType = {
    id: "dummy",
    component: "nil",
}

export const codeblockindex : {[key:string] : ReactNode} = {

    'nil' : <></>,
    'move' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'rot' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'handud' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'handoc' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'g_led' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'b_led' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'r_led' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    'wait' : <CodeBlockMove index={0} GroupIndex={0} data={dummydata} Update={()=>{}} Delete={()=>{}}/>,
    
}