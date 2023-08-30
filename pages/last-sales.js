import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
    
    const [sales, setSales] = useState(props.sales);

    const { data, error } = useSWR('https://react-getting-started-2edcf-default-rtdb.firebaseio.com/sales.json',
        (url) => fetch(url).then(res => res.json()));
    
    useEffect(() => { 
        if (data) { 
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data])

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(
    //         'https://react-getting-started-2edcf-default-rtdb.firebaseio.com/sales.json'
    //     ).then((response) => response.json())
    //         .then(data => {
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //             setSales(transformedSales);
    //             setLoading(false);
    //         })
    // }, []);
    
    if (error) { 
        return <p>Failed to load</p>
    }

    if (!data && !sales) { 
        return <p>Loading...</p>
    }

    return <ul>
        {sales.map(sales => <li key={sales.id}>{sales.username} - ${sales.volume}</li>)}
    </ul>
}

export default LastSalesPage;

export async function getStaticProps() { 
    const response = await fetch(
        'https://react-getting-started-2edcf-default-rtdb.firebaseio.com/sales.json'
    )
        
    const data = await response.json();
    
    const transformedSales = [];
    
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return { props: { sales: transformedSales }};
}