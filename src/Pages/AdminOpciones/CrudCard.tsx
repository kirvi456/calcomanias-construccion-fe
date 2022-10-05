import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/system'
import useFetch from '../../hooks/useFetch'
import { useNotification } from '../../hooks/useNotification'
import { CrudCardHeader } from './CrudCardHeader'
import { CrudListItem } from './CrudListItem'
import { ItemSchema } from './types'
import { sortArray } from './utlis'
import { CrudCardSkeleton } from './CrudCardSkeleton'

type CrudCardProps = {
    title: string,
    path: string
}




export const CrudCard : React.FC<CrudCardProps> = ({ title, path }) => {
    
    
    const [ items, setItems ] = useState<ItemSchema[]>([])

    const { openSuccessNotification } = useNotification();

    const { data, error } = useFetch<{result : ItemSchema[]}>( path );

    useEffect(() => {
        const newArray = [ ...(data?.result || []) ];
        sortArray( newArray )
        setItems( newArray );
    }, [ data ])

    const handleCreatedSuccess = ( result : ItemSchema ) => {
        openSuccessNotification( 'Se agrego correctamente' );
        const newArray = [...items, result ];
        sortArray( newArray );
        setItems( newArray );
    }

    const handleDeleteSuccess = ( result : ItemSchema ) => {
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
                handleCreatedSuccess={handleCreatedSuccess}
            />

            <Stack>
                {
                    items.map( ( { _id, nombre } ) => {
                        return (
                            <CrudListItem 
                                key={ _id }
                                _id={ _id }
                                nombre={ nombre }
                                path={path}
                                handleDeleteSuccess = { handleDeleteSuccess }
                            />
                        )
                    } )
                }
            </Stack>
        </Stack>
    )

}
