import React from 'react'
import {CircleCheckBig} from "lucide-react";

interface StepperProps {
    steps: string[]
    activeStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            {steps.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                    <div className="relative mb-2 flex items-center">
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                index < activeStep
                                    ? 'bg-primary text-white'
                                    : index === activeStep
                                        ? 'bg-primary-foreground text-white'
                                        : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {index < activeStep ? (
                                <CircleCheckBig className="w-6 h-6" />
                            ) : (
                                <span className="font-medium">{index + 1}</span>
                            )}
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-0.5 bg-border mx-2"></div>
                        )}
                    </div>
                    <div
                        className={`text-sm text-center ${
                            index === activeStep
                                ? 'text-primary-foreground font-semibold'
                                : 'text-muted-foreground'
                        }`}
                    >
                        {label}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stepper
