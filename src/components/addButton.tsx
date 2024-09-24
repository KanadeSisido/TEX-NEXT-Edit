import { Accordion, AccordionSummary, Card, List } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { ReactNode } from 'react'

type pr = {

    name : string,
    index? : number,
    children? : ReactNode,
}

const AddButton = (props: pr) => {
  return (
    <Accordion elevation={3}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            {props.name}
        </AccordionSummary>
        <List>
            {props.children}
        </List>
    </Accordion>
  )
}

export default AddButton