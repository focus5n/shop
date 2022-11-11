import React, {FC} from 'react'
import { Link } from 'react-router-dom';

type Props = {
    link: string
    title: string
    icon: string
}


const ShopUserSideMenuItem: FC<Props> = ({
    link,
    title,
    icon
}) => {
    return (
        <div className="py-3 ps-1">
            <Link to={link}>
                <span className="text-dark-v3 text-hover-success fs-5">
                    <div className="flex align-items-center">
                        <i className={icon}></i>
                        <span className="ps-4">{title}</span>
                    </div>
                </span>
            </Link>
        </div>
    )
}

export {ShopUserSideMenuItem}