import React, { useState, useEffect } from "react";
const Store = React.createContext({});

interface Props {
    children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {

    interface IData {
        'eng-data' : string[],
    }

    const [data, setData] = useState<IData>({"eng-data": []});
    const url: string = '/data/images.json';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData({
                'eng-data': data,
            }))
            .catch(e => console.log(e));
    }, [])

    console.log(data);

    return (
        <Store.Provider value={data}>
            {children}
        </Store.Provider>
    );

}

export { Store, StoreProvider };