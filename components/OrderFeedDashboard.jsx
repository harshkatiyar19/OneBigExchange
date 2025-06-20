'use client';
import React, { useState } from 'react';
import ManualFeedEntry from './ManualFeedEntry';
import ExchangeFeedViewer from './ExchangeFeedViewer';

const OrderFeedDashboard = () => {
  const [feedMessages, setFeedMessages] = useState([]);

  const handleNewFeed = (newOrder) => {
    setFeedMessages(prev => [newOrder, ...prev]); // prepend latest
  };

  return (
    <div className="space-y-10">
      <ManualFeedEntry onSubmitFeed={handleNewFeed} />
      <ExchangeFeedViewer feedMessages={feedMessages} />
    </div>
  );
};

export default OrderFeedDashboard;
