import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface WalletResponse {
    address: string;
    balance: string;
}

const getWalletContent = async (authToken: string): Promise<WalletResponse> => {
    try {
        const response: AxiosResponse<WalletResponse> = await axios.get('https://sandbox-api.okto.tech/api/v1/wallet/content', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get wallet content');
    }
};

export const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [walletBalance, setWalletBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedWalletAddress = localStorage.getItem('walletAddress');
        if (storedWalletAddress) {
            setWalletAddress(storedWalletAddress);
        }
    }, []);

    const fetchWalletContent = async (authToken: string) => {
        setLoading(true);
        setError(null);
        try {
            const walletData = await getWalletContent(authToken);
            setWalletAddress(walletData.address);
            setWalletBalance(walletData.balance);
            localStorage.setItem('walletAddress', walletData.address);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const updateWalletAddress = (address: string) => {
        localStorage.setItem('walletAddress', address);
        setWalletAddress(address);
    };

    return {
        walletAddress,
        walletBalance,
        loading,
        error,
        fetchWalletContent,
        updateWalletAddress
    };
};
