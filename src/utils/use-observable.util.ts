import {useState, useEffect} from "react";
import {Observable} from "rxjs";

export function useObservable<T>(source$: Observable<T>, initialState: T):T{
    const [data, setData] = useState(initialState);

    useEffect(() => {
        const subs = source$.subscribe(setData);
        return () => subs.unsubscribe();
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return data;
}