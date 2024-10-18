import React, {PropsWithChildren, useState} from "react";


export type IDEProps = PropsWithChildren<{
    className?: string
}>

export default function Ide({children, className}: IDEProps) {
    return (

        <div className="w-full h-full" >

            {children}

        </div>
    );
}