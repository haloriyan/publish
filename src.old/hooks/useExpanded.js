import { useState } from "react";

const useSidebarExpanded = () => {
    const [isExpanded, setStatus] = useState(JSON.parse(window.localStorage.getItem('sidebar_expanded')));

    const setExpanded = (val) => {
        setStatus(val);
        window.localStorage.setItem('sidebar_expanded', JSON.stringify(val));
    }

    return [isExpanded, setExpanded];
}

export default useSidebarExpanded