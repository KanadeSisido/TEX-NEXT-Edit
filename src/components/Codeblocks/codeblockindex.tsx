import { ReactNode } from "react";

import CodeBlockMove from "./codeblockMove";
import CodeBlockRot from "./codeblockRot";


const dummyid = 'dummy';

export const codeblockindex : {[key:string] : ReactNode} = {

    'nil' : <></>,
    'move' : <CodeBlockMove id={dummyid} index={0}/>,
    'rot' : <CodeBlockRot id={dummyid} index={0}/>,
    'handud' : <CodeBlockMove id={dummyid} index={0}/>,
    'handoc' : <CodeBlockMove id={dummyid} index={0}/>,
    'r_led' : <CodeBlockMove id={dummyid} index={0}/>,
    'g_led' : <CodeBlockMove id={dummyid} index={0}/>,
    'b_led' : <CodeBlockMove id={dummyid} index={0}/>,
    'wait' : <CodeBlockMove id={dummyid} index={0}/>,
    
}