import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
    baseURL: 'https://sandbox-api.okto.tech/',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 second timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);


interface UserDetails {
    // Add user details type definition  
    id: string;
    email: string;
    name: string;
}

interface ContractTemplate {
    // Add contract template type definition
    id: string;
    name: string;
    abi: any;
}

/**
 * Creates a new wallet
 * @param auth_token Authentication token
 * @returns Wallet creation response
 */
const createWallet = async (auth_token: string): Promise<any> => {
    console.log("Api Request", auth_token);

    try {
        const response: AxiosResponse<any> = await axios.post('https://sandbox-api.okto.tech/api/v1/wallet', {}, {
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
        console.log("Wallet creation successful:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create wallet');
    }
}

const getWallet = async (auth_token: string): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get('https://sandbox-api.okto.tech/api/v1/wallet', {
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        });
    } catch (error) {
        throw new Error('Failed to get wallet');
    }
}
/**
 * Gets user details
 * @returns User details
 */
const getUserDetails = async (): Promise<UserDetails> => {
    try {
        const response: AxiosResponse<UserDetails> = await api.get('/user');
        return response.data;
    } catch (error) {
        throw new Error('Failed to get user details');
    }
}

/**
 * Gets contract template
 * @returns Contract template
 */
const templateContract = async (): Promise<ContractTemplate> => {
    try {
        const response: AxiosResponse<ContractTemplate> = await api.get('/contract/template');
        return response.data;
    } catch (error) {
        throw new Error('Failed to get contract template');
    }
}

/**
 * Gets wallet details
 * @returns Wallet details
 */
const getWalletDetails = async (authToken: string | null): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await api.get('/api/v1/wallet', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get wallet details');
    }
}

export {
    createWallet,
    getUserDetails,
    templateContract,
    getWalletDetails
};