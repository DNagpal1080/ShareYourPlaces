import React, { useState } from 'react'
import Backdrop from '../UIElements/Backdrop'

import MainHeader from './MainHeader'
import './MainNavigation.css'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = (e) => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = (e) => {
        setDrawerIsOpen(false)
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}> My Backdrop Component</Backdrop>}

            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>

                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    Your Places
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>

            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation