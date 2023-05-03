import { FunctionComponent, ReactNode } from 'react';
import './skeleton.css';

interface props{
    className: string;
    children?: ReactNode;
}

const Skeleton:FunctionComponent<props>=({className, children})=>{
    return(
        <div className={`skeleton ${className}`}>
            {children}
        </div>
    )
}
export default Skeleton;