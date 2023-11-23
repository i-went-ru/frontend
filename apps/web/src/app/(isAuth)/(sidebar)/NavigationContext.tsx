import { createContext, useEffect, useState } from "react";

const NavigationContext = createContext(null);
const NavigationProvider = ({ children, navigation, setNavigation }) => {
    return (
        <NavigationContext.Provider
            value={{ navigation, setNavigation }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export { NavigationContext, NavigationProvider }
