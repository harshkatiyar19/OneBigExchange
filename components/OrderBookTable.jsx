// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { RefreshCw } from 'lucide-react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// const SYMBOL_PRICE_RANGES = {
//   AAPL: [150.0, 200.0],
//   GOOGL: [2000.0, 2500.0],
//   MSFT: [200.0, 400.0],
//   AMZN: [3000.0, 3500.0],
//   TSLA: [200.0, 300.0],
// };

// const OrderBookTable = ({ selectedSymbol }) => {
//   const [orderBook, setOrderBook] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const wsRef = useRef(null);
//   const orderBookData = useRef({});

//   useEffect(() => {
//     if (selectedSymbol) {

//       orderBookData.current = {};
//       setOrderBook([]);
//       setError(null);
//       connectWebSocket();
//     } else {
//       if (wsRef.current) {
//         wsRef.current.close();
//       }
//       setOrderBook([]);
//     }

//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//       }
//     };
//   }, [selectedSymbol]);
//   ////



// const connectWebSocket = () => {
//   if (wsRef.current) {
//     wsRef.current.deactivate(); // STOMP client uses .deactivate()
//   }

//   setIsLoading(true);
//   setError(null);

//   const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws/careEcho"; // Assuming /ws is your WebSocket endpoint

//   const client = new Client({
//     webSocketFactory: () => new SockJS(socketUrl),
//     onConnect: () => {
//       console.log('Connected to WebSocket via STOMP');

//         client.subscribe('/topic/top5', (message) => {
//           try {
//             console.log("Parsed message:", message.body);
//             const msg = JSON.parse(message.body);
            
//             const symbolDataList = msg.data;

//             symbolDataList.forEach((symbolData) => {
//               const symbolName = symbolData.symbol.name;
              
//               let buyOrders = symbolData.buy;
//               let sellOrders = symbolData.sell;

//               if (symbolName === selectedSymbol) {
//                 console.log(`Received BUY for ${symbolName}:`, buyOrders);
//                 console.log(`Received SELL for ${symbolName}:`, sellOrders);

//                 // ✅ Sort orders
//                 buyOrders = [...buyOrders].sort((a, b) => b.price - a.price); // descending
//                 sellOrders = [...sellOrders].sort((a, b) => a.price - b.price); // ascending

//                 // ✅ Slice to top 5 and format
//                 const top5 = mergeBuySell(buyOrders.slice(0, 5), sellOrders.slice(0, 5));
//                 setOrderBook(top5);
//               }
//             });
//           } catch (err) {
//             console.error('Error processing STOMP message:', err);
//           }
//         });

//     },
//     onStompError: (frame) => {
//       console.error('STOMP error', frame);
//       setError('STOMP error occurred');
//     },
//     onWebSocketError: (err) => {
//       console.error('WebSocket error:', err);
//       setError('WebSocket error');
//     },
//     reconnectDelay: 3000,
//   });

//   client.activate();
//   wsRef.current = client;
// };

// function mergeBuySell(buyOrders, sellOrders) {
//   const levels = [];
//   for (let i = 0; i < 5; i++) {
//     levels.push({
//       bidPrice: buyOrders[i]?.price || null,
//       bidSize: buyOrders[i]?.qty || null,
//       askPrice: sellOrders[i]?.price || null,
//       askSize: sellOrders[i]?.qty || null,
//     });
//   }
//   return levels;
// }


//   // const connectWebSocket = () => {
//   //   if (wsRef.current) {
//   //     wsRef.current.close();
//   //   }

//   //   setIsLoading(true);
//   //   setError(null);

//   //   try {
//   //     wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_URL);


//   //     wsRef.current.onopen = () => {
//   //       console.log('WebSocket connection established');
//   //     };

//   //     wsRef.current.onmessage = (event) => {
//   //       try {
//   //         const message = JSON.parse(event.data);
//   //         const { exchange, timestamp, data } = message;

//   //         if (data && data.symbol === selectedSymbol) {
//   //           const [minPrice, maxPrice] = SYMBOL_PRICE_RANGES[selectedSymbol] || [0, Infinity];
//   //           const maxPriceWithSpread = maxPrice * 1.05;
//   //           if (
//   //             data.bid_price >= minPrice &&
//   //             data.bid_price <= maxPrice &&
//   //             data.ask_price >= minPrice &&
//   //             data.ask_price <= maxPriceWithSpread
//   //           ) {
//   //             orderBookData.current[exchange] = {
//   //               bidPrice: data.bid_price,
//   //               bidSize: data.bid_size,
//   //               askPrice: data.ask_price,
//   //               askSize: data.ask_size,
//   //               timestamp: timestamp,
//   //             };

//   //             const aggregatedOrderBook = aggregateOrderBook(orderBookData.current);
//   //             setOrderBook(aggregatedOrderBook);
//   //             setIsLoading(false);
//   //           } else {
//   //             console.warn(
//   //               `Discarded data for ${selectedSymbol} with out-of-range prices: ` +
//   //               `bid=${data.bid_price} (range: ${minPrice}–${maxPrice}), ` +
//   //               `ask=${data.ask_price} (range: ${minPrice}–${maxPriceWithSpread})`
//   //             );
//   //           }
//   //         } else {
//   //           console.warn(`Received data for unexpected symbol: ${data?.symbol}`);
//   //         }
//   //       } catch (err) {
//   //         console.error('Error processing message:', err, event.data);
//   //       }
//   //     };

//   //     wsRef.current.onerror = (error) => {
//   //       console.error('WebSocket error:', error);
//   //       setError('Connection error. Please try again later.');
//   //       setIsLoading(false);
//   //     };

//   //     wsRef.current.onclose = (event) => {
//   //       console.log('WebSocket connection closed:', event.code, event.reason);
//   //       setIsLoading(false);

//   //       if (event.code !== 1000) {
//   //         setTimeout(() => {
//   //           if (selectedSymbol) {
//   //             console.log('Attempting to reconnect WebSocket...');
//   //             connectWebSocket();
//   //           }
//   //         }, 1000);
//   //       }
//   //     };
//   //   } catch (err) {
//   //     console.error('Error setting up WebSocket:', err);
//   //     setError('Failed to connect to market data server.');
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const aggregateOrderBook = (orderBookData) => {
//   //   const aggregatedBids = {};
//   //   const aggregatedAsks = {};

//   //   const [minPrice, maxPrice] = SYMBOL_PRICE_RANGES[selectedSymbol] || [0, Infinity];
//   //   const maxPriceWithSpread = maxPrice * 1.05;
//   //   const priceRange = maxPrice - minPrice;
//   //   const priceIncrement = priceRange * 0.001; 

//   //   Object.values(orderBookData).forEach(({ bidPrice, bidSize, askPrice, askSize }) => {
//   //     if (bidPrice && bidPrice >= minPrice && bidPrice <= maxPrice) {
//   //       aggregatedBids[bidPrice] = (aggregatedBids[bidPrice] || 0) + bidSize;
//   //     }
//   //     if (askPrice && askPrice >= minPrice && askPrice <= maxPriceWithSpread) {
//   //       aggregatedAsks[askPrice] = (aggregatedAsks[askPrice] || 0) + askSize;
//   //     }
//   //   });

//   //   let bidLevels = Object.entries(aggregatedBids)
//   //     .map(([price, size]) => ({ price: parseFloat(price), size }))
//   //     .sort((a, b) => b.price - a.price); 

//   //   let askLevels = Object.entries(aggregatedAsks)
//   //     .map(([price, size]) => ({ price: parseFloat(price), size }))
//   //     .sort((a, b) => a.price - b.price); 

//   //   while (bidLevels.length < 5 && bidLevels.length > 0) {
//   //     const lowestBid = bidLevels[bidLevels.length - 1].price;
//   //     const newBidPrice = Math.max(minPrice, lowestBid - priceIncrement); 
//   //     bidLevels.push({
//   //       price: parseFloat(newBidPrice.toFixed(2)),
//   //       size: Math.round(bidLevels[bidLevels.length - 1].size * 0.9), 
//   //     });
//   //   }

//   //   while (askLevels.length < 5 && askLevels.length > 0) {
//   //     const highestAsk = askLevels[askLevels.length - 1].price;
//   //     const newAskPrice = Math.min(maxPriceWithSpread, highestAsk + priceIncrement); 
//   //     askLevels.push({
//   //       price: parseFloat(newAskPrice.toFixed(2)),
//   //       size: Math.round(askLevels[askLevels.length - 1].size * 0.9), 
//   //     });
//   //   }

//   //   const topLevels = [];
//   //   for (let i = 0; i < 5; i++) {
//   //     topLevels.push({
//   //       bidPrice: bidLevels[i]?.price || null,
//   //       bidSize: bidLevels[i]?.size || null,
//   //       askPrice: askLevels[i]?.price || null,
//   //       askSize: askLevels[i]?.size || null,
//   //     });
//   //   }

//   //   console.log(`Aggregated ${topLevels.length} levels for ${selectedSymbol}`, topLevels);

//   //   return topLevels;
//   // };

//   if (!selectedSymbol) {
//     return (
//       <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6 h-full">
//         <h2 className="text-lg font-semibold text-white mb-4">Consolidated Order Book</h2>
//         <div className="text-center py-8 text-gray-400">
//           Select a symbol to view order book data
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
//         <h2 className="text-lg font-semibold text-white mb-4">
//           Consolidated Order Book - {selectedSymbol}
//         </h2>
//         <div className="text-center py-8">
//           <div className="text-red-400 mb-2">Error connecting to market data</div>
//           <div className="text-gray-400 text-sm">{error}</div>
//           <button
//             onClick={() => {
//               setError(null);
//               connectWebSocket();
//             }}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
//         <h2 className="text-lg font-semibold text-white mb-4">
//           Consolidated Order Book - {selectedSymbol}
//         </h2>
//         <div className="text-center py-8">
//           <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-2" />
//           <div className="text-gray-400">Loading order book...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
//       <h2 className="text-lg font-semibold text-white mb-4">
//         Consolidated Order Book - {selectedSymbol}
//       </h2>
//       <div className="overflow-x-auto rounded-xl">
//         <table className="min-w-full divide-y divide-gray-800 ">
//           <thead className="bg-[#1b1d21]">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Level
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Bid Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Bid Size
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Ask Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Ask Size
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800">
//             {orderBook.map((level, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-[#232529]' : 'bg-[#1b1d21]'}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                   {index}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-mono">
//                   ${level.bidPrice?.toFixed(2) || '-'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
//                   {level.bidSize?.toLocaleString() || '-'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-mono">
//                   ${level.askPrice?.toFixed(2) || '-'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
//                   {level.askSize?.toLocaleString() || '-'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {orderBook.length === 0 && !isLoading && (
//         <div className="text-center py-8 text-gray-400">
//           No order book data available for {selectedSymbol}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderBookTable;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// const SYMBOL_PRICE_RANGES = {
//   AAPL: [150.0, 200.0],
//   GOOGL: [2000.0, 2500.0],
//   MSFT: [200.0, 400.0],
//   AMZN: [3000.0, 3500.0],
//   TSLA: [200.0, 300.0],
// };

const OrderBookTable = ({ selectedSymbol }) => {
  const [orderBook, setOrderBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const orderBookData = useRef({});

  useEffect(() => {
    if (selectedSymbol) {
      orderBookData.current = {};
      setOrderBook([]);
      setError(null);
      connectWebSocket();
    } else {
      if (wsRef.current) {
        wsRef.current.deactivate();
      }
      setOrderBook([]);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.deactivate();
      }
    };
  }, [selectedSymbol]);

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.deactivate();
    }

    setIsLoading(true);
    setError(null);

    const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws/careEcho";

    const client = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
      debug: (msg) => console.log('[STOMP DEBUG]', msg),
      onConnect: () => {
        console.log('Connected to WebSocket via STOMP');
        setIsLoading(false); // ✅ Set loading to false when connected

        client.subscribe('/topic/top5', (message) => {
          try {
            console.log("Raw message body:", message.body);
            const msg = JSON.parse(message.body);
            console.log("Parsed message:", msg);
            
            const symbolDataList = msg.data;

            if (!symbolDataList || !Array.isArray(symbolDataList)) {
              console.warn("Invalid symbolDataList:", symbolDataList);
              return;
            }

            symbolDataList.forEach((symbolData) => {
              // ✅ Handle both string and object symbol formats
              const symbolName = typeof symbolData.symbol === 'string' 
                ? symbolData.symbol 
                : symbolData.symbol?.name;
              console.log("Processing symbol:", symbolName, "Selected:", selectedSymbol);
              
              if (symbolName === selectedSymbol) {
                let buyOrders = symbolData.buy || [];
                let sellOrders = symbolData.sell || [];

                console.log(`Received BUY for ${symbolName}:`, buyOrders);
                console.log(`Received SELL for ${symbolName}:`, sellOrders);

                // ✅ Validate orders data
                if (!Array.isArray(buyOrders)) buyOrders = [];
                if (!Array.isArray(sellOrders)) sellOrders = [];

                // ✅ Sort orders
                buyOrders = [...buyOrders].sort((a, b) => b.price - a.price); // descending
                sellOrders = [...sellOrders].sort((a, b) => a.price - b.price); // ascending

                // ✅ Slice to top 5 and format
                const top5 = mergeBuySell(buyOrders.slice(0, 5), sellOrders.slice(0, 5));
                console.log("Generated top5 order book:", top5);
                
                setOrderBook(top5);
                setIsLoading(false); // ✅ Ensure loading is false after data update
              }
            });
          } catch (err) {
            console.error('Error processing STOMP message:', err);
            setError('Error processing market data');
            setIsLoading(false);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
        setError('STOMP connection error');
        setIsLoading(false);
      },
      onWebSocketError: (err) => {
        console.error('WebSocket error:', err);
        setError('WebSocket connection error');
        setIsLoading(false);
      },
      onDisconnect: () => {
        console.log('STOMP disconnected');
        setIsLoading(false);
      },
      reconnectDelay: 3000,
    });

    client.activate();
    wsRef.current = client;
  };

  function mergeBuySell(buyOrders, sellOrders) {
    console.log("Merging orders - Buy:", buyOrders, "Sell:", sellOrders);
    
    const levels = [];
    for (let i = 0; i < 5; i++) {
      const level = {
        bidPrice: buyOrders[i]?.price || null,
        bidSize: buyOrders[i]?.qty || buyOrders[i]?.quantity || null,
        askPrice: sellOrders[i]?.price || null,
        askSize: sellOrders[i]?.qty || sellOrders[i]?.quantity || null,
      };
      levels.push(level);
      console.log(`Level ${i}:`, level);
    }
    
    console.log("Final merged levels:", levels);
    return levels;
  }

  // ✅ Add debugging for render conditions
  console.log("Render state:", {
    selectedSymbol,
    isLoading,
    error,
    orderBookLength: orderBook.length,
    orderBook: orderBook
  });

  if (!selectedSymbol) {
    return (
      <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6 h-full">
        <h2 className="text-lg font-semibold text-white mb-4">Consolidated Order Book</h2>
        <div className="text-center py-8 text-gray-400">
          Select a symbol to view order book data
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Consolidated Order Book - {selectedSymbol}
        </h2>
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">Error connecting to market data</div>
          <div className="text-gray-400 text-sm">{error}</div>
          <button
            onClick={() => {
              setError(null);
              connectWebSocket();
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Consolidated Order Book - {selectedSymbol}
        </h2>
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-2" />
          <div className="text-gray-400">Loading order book...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121417] rounded-xl shadow-sm border border-gray-300 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Consolidated Order Book - {selectedSymbol}
      </h2>
      

      
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-[#1b1d21]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Bid Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Bid Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Ask Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Ask Size
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {orderBook.map((level, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-[#232529]' : 'bg-[#1b1d21]'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-mono">
                  {level.bidPrice ? `$${level.bidPrice.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                  {level.bidSize ? level.bidSize.toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-mono">
                  {level.askPrice ? `$${level.askPrice.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                  {level.askSize ? level.askSize.toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orderBook.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-400">
          No order book data available for {selectedSymbol}
        </div>
      )}
    </div>
  );
};

export default OrderBookTable;