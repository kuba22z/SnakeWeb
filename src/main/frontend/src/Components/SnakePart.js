import React from "react";

const SnakePart= ({part,size}) => {
    return (
        <rect
            x={part.x}
            y={part.y}
            width={size}
            height={size}
            style={{
                background: "black",
            }}
        />
    );
}
export default SnakePart