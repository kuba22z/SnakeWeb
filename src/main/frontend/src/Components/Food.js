import React from "react";

const Food= ({part,size}) => {
    return (
        <rect
            x={part.x}
            y={part.y}
            width={size}
            height={size}
            fill={part.color}
        />
    );
}
export default Food