import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HandymanIcon from '@mui/icons-material/Handyman';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FeedIcon from '@mui/icons-material/Feed';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';


interface Pagina {
    titulo : string,
    icono : any,
    url: string
};

interface PaginasPorRol {
    admin : Pagina[],
    digitador : Pagina[]
}


export const listaPaginas : PaginasPorRol = {
    admin: [
        {
            titulo: 'Inicio',
            icono: <HomeIcon />,
            url: '/adminhome'
        },
        {
            titulo: 'Formularios',
            icono: <HorizontalSplitIcon />,
            url: '/formularios'
        },
        {
            titulo: 'Iniciar Formulario',
            icono: <FeedIcon />,
            url: '/iniciarform'
        },
        {
            titulo: 'Panel de Administración',
            icono: <AdminPanelSettingsIcon />,
            url: '/adminpanel'
        }
    ],
    digitador: [
        {
            titulo: 'Inicio',
            icono: <HomeIcon />,
            url: '/digitadorhome'
        },
        {
            titulo: 'Iniciar Formulario',
            icono: <FeedIcon />,
            url: '/iniciarform'
        }
    ]    
};
