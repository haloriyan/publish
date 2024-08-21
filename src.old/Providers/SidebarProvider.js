import React, { createContext, useContext, useState } from 'react';
import useSidebarExpanded from '../hooks/useExpanded';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isExpanded, setExpanded] = useSidebarExpanded();

    return (
        <SidebarContext.Provider value={{ isExpanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);