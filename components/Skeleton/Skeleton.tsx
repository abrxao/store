import { FunctionComponent } from 'react';
import './skeleton.css';

interface props{
    className: string;
}

const Skeleton:FunctionComponent<props>=({className})=>{
    return(
        <div className={`skeleton ${className}`}>

        </div>
    )
}
export default Skeleton;