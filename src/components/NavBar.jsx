import PropTypes from "prop-types";
import React, {Component} from "react";
import "semantic-ui-css/semantic.min.css";

import DesktopNavBarContainer from "./NavBarDesktop";
import MobileNavBarContainer from "./NavBarMobile";
import DesktopConnectedNavBarContainer from "./ConnectedNavBarDesktop"
import MobileConnectedNavBarContainer from "./ConnectedNavBarMobile";
import "./NavBar.css";

const ResponsiveNavBarContainer = ({children}) => (
    <div>
        <DesktopNavBarContainer>{children}</DesktopNavBarContainer>
        <MobileNavBarContainer>{children}</MobileNavBarContainer>
    </div>
);

const ResponsiveConnectedNavBarContainer = (userData, children) => (
    <div>
        <DesktopConnectedNavBarContainer userData={userData} children={children}/>
        <MobileConnectedNavBarContainer userData={userData} children={children}/>
    </div>
);

ResponsiveNavBarContainer.propTypes = {
    children: PropTypes.node
};

ResponsiveConnectedNavBarContainer.propTypes = {
    children: PropTypes.node
};

export default function NavBarLayout({userData, children}) {
    if(userData.isConnected === true) {
        return <ResponsiveConnectedNavBarContainer userData={userData} children={children}/>;
    }
    else {
        return <ResponsiveNavBarContainer children={children}/>;
    }
}