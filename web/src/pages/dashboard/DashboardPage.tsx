import React, { useEffect, useState } from 'react';
import { createWallet, getWalletDetails } from '../../api/api';

interface CardProps {
  id: string;
  title: string;
  description: string;
  number?: number;
}

const Card: React.FC<CardProps> = ({ id, title, description, number }) => {
  return (
    <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-xs text-pink-400">#{id}</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      {number !== undefined && (
        <div className="flex items-center justify-end">
          <span className="text-4xl font-bold text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg transition-all hover:bg-emerald-400/20">{number}</span>
        </div>
      )}
    </div>
  );
};

export const DashboardPage: React.FC = () => {

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchWalletData = async () => {
      if (authToken) {
        try {
          await createWallet(authToken);
     
        } catch (error) {
          console.error('Error fetching wallet data:', error);
        }
      }
    };

    fetchWalletData();
  }, [authToken]);

  const cardData = [
    {
      id: "1",
      title: "Number of Contracts",
      description: "Number of contracts in the Chain",
      number: 42
    },
    {
      id: "2",
      title: "Deployed Contracts",
      description: "Number of deployed contracts",
      number: 128
    },
    {
      id: "3",
      title: "Type of Contracts",
      description: "Number of different types of contracts",
      number: 357
    },
    {
      id: "4",
      title: "Successful Deployments",
      description: "Number of successful contract deployments",
      number: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            number={card.number}
          />
        ))}
      </div>
    </div>
  );
};