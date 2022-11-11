import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    to: string
    title: string
    
}

const ShopHeaderUserMenuItem: React.FC<Props> = ({
    to,
    title
}) => {
    return (
        <div>
            <Link to={to}>
                <li className="menu-item">
                    <span className="menu-link d-block text-black fw-lighter text-hover-success text-decoration-none py-2 px-6">{title}</span>
                </li>
            </Link>
        </div>
    )
}

export { ShopHeaderUserMenuItem }