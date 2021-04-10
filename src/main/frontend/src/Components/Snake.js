import SnakePart from "./SnakePart";

const Snake= ({snake,size}) => {

    return (
        <svg >
            {snake.map((snakePart, index) => {
                return (
                    <SnakePart part={snakePart} key={index} size={size} className='Block'/>
                )
            })}
        </svg>
    );
}
export default Snake