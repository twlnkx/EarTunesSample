import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/admin/products"><i className="fa fa-clipboard"></i>Product All</Link>
                        
                        <Link to="/admin/product"><i className="fa fa-plus"></i>Product Create</Link> 
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i>All Users</Link>
                    </li>

                    <li>
                      <Link to="/admin/seller/new"><i className="fa fa-clipboard"></i>Seller Create</Link>
                    </li>

                    <li>
                      <Link to="/admin/sellers"><i className="fa fa-plus"></i>All Sellers</Link>
                        
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar