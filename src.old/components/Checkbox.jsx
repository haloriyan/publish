import React from "react";
import config from "../config";
import { IconCheck } from "@tabler/icons-react";

const Checkbox = ({selected, onSelect, size = window.screen.width > 480 ? 24 : 18, color = config.primaryColor}) => {
    return (
        <div className="aspect-square rounded flex items-center justify-center cursor-pointer" style={{height: `${size}px`,borderColor: color,borderWidth: 1}} onClick={onSelect}>
            {
                selected &&
                <div className="rounded aspect-square">
                    <IconCheck color={color} size={size - 8} />
                </div>
            }
        </div>
    )
}

export default Checkbox