import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

type pr = {

    steps: string[],
    stepIndex: number,

}

const UploadSteps = (props: pr) => {
  return (
    <Stepper activeStep={props.stepIndex} alternativeLabel>
        {props.steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  )
}

export default UploadSteps