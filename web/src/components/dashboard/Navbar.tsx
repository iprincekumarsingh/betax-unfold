import React, { useState, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '../../hooks/GetWallet';
import { getWalletDetails } from '../../api/api';

export const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { walletAddress, walletBalance, fetchWalletContent, updateWalletAddress } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchWallet = async () => {
      if (authToken) {
        try {
          const walletData = await getWalletDetails(authToken);
          console.log("Wallet data:", JSON.stringify(walletData.data.wallets));
          setSelectedWallet(JSON.stringify(walletData.data.wallets));
          setWalletData(walletData.data.wallets);
        } catch (error) {
          console.error("Error fetching wallet details:", error);
        }
      }
    };

    fetchWallet();
  }, [authToken]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleWalletSelect = (address: string) => {
    updateWalletAddress(address);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">MetaMask Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span
                className="text-sm text-gray-400 cursor-pointer flex items-center"
                onClick={toggleDropdown}
              >
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Select Wallet'}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </span>
              {isDropdownOpen && walletAddress && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  <ul className="py-1 text-gray-300">
                    <li 
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleWalletSelect(walletAddress)}
                    >
                      <div>
                        <div>{walletData.slice(0, 6)}...{walletData.slice(-4)}</div>
                      {
                        walletBalance && (
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="block text-xs text-gray-400">APTOS: {walletBalance} APT</span>
                          </div>
                        )
                      }
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="inline-flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};