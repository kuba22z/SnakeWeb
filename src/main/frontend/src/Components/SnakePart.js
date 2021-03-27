import React from "react";

const SnakePart= ({part}) => {
    return (
        <rect
            x={part.x}
            y={part.y}
            width={part.width}
            height={part.height}
            style={{
                background: "black",
            }}
        />
    );
}
export default SnakePart