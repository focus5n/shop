import React from "react"
import clsx from 'clsx'

const HCard = (props: { className: any; shadow: any; flush: any; resetSidePaddings: any; border: any; dashed: any; stretch: any; rounded: any; utilityP: any; utilityPY: any; utilityPX: any; children: any }) => {
    const {
        className,
        shadow,
        flush,
        resetSidePaddings,
        border,
        dashed,
        stretch,
        rounded,
        utilityP,
        utilityPY,
        utilityPX,
        children,
    } = props
    return (
        <div
            className={clsx(
                'card',
                className && className,
                {
                    'shadow-sm': shadow,
                    'card-flush': flush,
                    'card-px-0': resetSidePaddings,
                    'card-bordered': border,
                    'card-dashed': dashed,
                },
                stretch && `card-${stretch}`,
                utilityP && `p-${utilityP}`,
                utilityPX && `px-${utilityPX}`,
                utilityPY && `py-${utilityPY}`,
                rounded && `card-${rounded}`
            )}
        >
            {children}
        </div>
    )
}

export { HCard }
