import React from "react"

import clsx from 'clsx'

const HCardBody = (props: any) => {
    const { className, scroll, height, children } = props
    return (
        <div
            className={clsx(
                'card-body',
                className && className,
                {
                    'card-scroll': scroll,
                },
                height && `h-${height}px`
            )}
        >
            {children}
        </div>
    )
}

export { HCardBody }
