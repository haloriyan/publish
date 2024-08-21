import React from "react";

const AppIcon = ({size = 12, textSize = "xl", rounded = "lg"}) => {
    return (
        <div className={`aspect-square rounded-lg mobile:rounded-full bg-primary-dark flex items-center justify-center font-bold text-green-700 text-${textSize}`} style={{
            height: size,
        }}>
            Br
        </div>
    )
}

export default AppIcon