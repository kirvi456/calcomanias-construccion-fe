
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

type AnyAuthLayoutProps = {
    navbar: boolean
}
export const AnyAuthLayout : React.FC<AnyAuthLayoutProps> = ({navbar}) =>{

    
    return (        
        <> 
            {navbar && <NavBar />} 
            <Outlet /> 
        </>       
    )
}