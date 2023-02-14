
import Axios from "../utils/axios-jwt-token.util"


 export class DataService<T, U>{
    
    
    async create(resource: T, url: U): Promise<T>{
        const response = await Axios.post(url as string, resource);
        const data: T = response.data;
        return data;
    }
    async delete(url: U): Promise<T>{
        const response = await Axios.delete(url as string);
        const data: T = response.data;
        return data;
    }
    async edit(resource: T, url: U): Promise<T>{
        const response = await Axios.patch(url as string, resource);
        const data: T = response.data;
        return data;
    }
    async findAll(url: U): Promise<T[]>{
        const response = await Axios.get(url as string);
        const data: T[] = response.data;
        return data;
    }

    async findOne(url: U): Promise<T>{
        const response = await Axios.get(url as string);
        const data: T = response.data;
        return data;
    }
 }