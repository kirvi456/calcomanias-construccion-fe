import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system'
import useFetch from '../../hooks/useFetch'
import { useNotification } from '../../hooks/useNotification'
import { CrudCardHeader } from './CrudCardHeader'
import { CrudListItem } from './CrudListItem'
import { sortArray } from './utlis'
import { CrudCardSkeleton } from './CrudCardSkeleton'
import { Rubro } from '../../models/Rubro'
import { EmptyList } from '../../components/EmptyList'

type CrudCardProps = {
    title: string,
    path: string
}




export const CrudCard : React.FC<CrudCardProps> = ({ title, path }) => {
    
    
    const [ items, setItems ] = useState<Rubro[]>([])

    const { openSuccessNotification } = useNotification();

    const { data, error } = useFetch<{result : Rubro[]}>( path );

    useEffect(() => {
        const newArray = [ ...(data?.result || []) ];
        sortArray( newArray )
        setItems( newArray );
    }, [ data ])

    const handleCreatedSuccess = ( result : Rubro ) => {
        openSuccessNotification( 'Se agrego correctamente' );
        const newArray = [...items, result ];
        sortArray( newArray );
        setItems( newArray );
    }

    const handleDeleteSuccess = ( result : Rubro ) => {
        openSuccessNotification( 'Se borró correctamente' );
        const newArray = items.filter( el => el._id !== result._id );
        setItems( newArray );
    }

    if ( error ) return ( <div>Error</div> )
    if ( !data ) return ( <CrudCardSkeleton title={title} /> )

    return (
        <Stack p={2} spacing={1}>
            
            <CrudCardHeader 
                title={title}
                path={path}
                handleCreatedSuccess={ handleCreatedSuccess }
            />

            <Stack>
                {
                    items.length > 0 ?
                    items.map( ( { _id, no, desc, unidad } ) => {
                        return (
                            <CrudListItem 
                                key={ _id }
                                _id={ _id }
                                no={ no }
                                desc={ desc }
                                unidad={ unidad }
                                path={ path }
                                handleDeleteSuccess = { handleDeleteSuccess }
                            />
                        )
                    } )
                    : <EmptyList message='No se han registrado Rubros' />
                }
            </Stack>
        </Stack>
    )

}
