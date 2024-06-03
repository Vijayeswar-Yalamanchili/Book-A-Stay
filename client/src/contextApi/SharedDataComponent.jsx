import React, {useState } from 'react'

export const SharedDataContext = React.createContext()

function SharedDataComponent ({children}){

    const [sharedHotelIdData, setSharedHotelIdData] = useState(null)

    return <>
        <SharedDataContext.Provider value={{sharedHotelIdData,setSharedHotelIdData}}>
            {children}
        </SharedDataContext.Provider>
    </>
}

export default SharedDataComponent