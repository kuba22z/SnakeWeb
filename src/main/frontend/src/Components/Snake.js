import SnakePart from "./SnakePart";
import Food from "./Food";


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