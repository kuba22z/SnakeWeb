import React from "react";

const SnakePart= ({part,size}) => {
    return (
        <rect
            x={part.x}
            y={part.y}
            width={size}
            height={size}
        />
    );
}
export default SnakePart