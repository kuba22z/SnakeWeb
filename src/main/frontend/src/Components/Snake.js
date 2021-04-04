import SnakePart from "./SnakePart";


const Snake= ({snake,size}) => {

    return (
        <svg width={500} height={500} style={{background: "blue", display: "block" ,margin:"auto"}}>
            {snake.map((snakePart, index) => {
                return (
                    <SnakePart part={snakePart} key={index} size={size} className='Block'/>
                )
            })}

        </svg>
    );
}
export default Snake