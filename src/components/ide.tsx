import React, {PropsWithChildren, useState} from "react";


export type IDEProps = PropsWithChildren<{
    className?: string
}>

export default function Ide({children, className}: IDEProps) {
    return (

            <div className="flex h-screen w-screen overflow-hidden mt-0">
                <div className="flex flex-grow">
                    <div className="w-full flex flex-col overflow-auto">
                        {children}
                    </div>
                </div>

            </div>
  );
}