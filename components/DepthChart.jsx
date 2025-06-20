// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip,
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Tooltip
// );

// const DepthChart = ({ bids = [], asks = [] }) => {
//     const bidPrices = bids.map((bid) => bid.price);
//     const bidSizes = bids.map((bid) => bid.size);
//     const askPrices = asks.map((ask) => ask.price);
//     const askSizes = asks.map((ask) => ask.size);

//     const data = {
//         labels: [...bidPrices.reverse(), ...askPrices],
//         datasets: [
//             {
//                 label: 'Bids',
//                 data: [...bidSizes.reverse(), ...Array(askSizes.length).fill(null)],
//                 borderColor: '#00FF00',
//                 backgroundColor: 'rgba(4, 255, 0, 0.4)',
//                 fill: true,
//                 tension: 0,
//             },
//             {
//                 label: 'Asks',
//                 data: [...Array(bidSizes.length).fill(null), ...askSizes],
//                 borderColor: '#FF0000',
//                 backgroundColor: 'rgba(255, 0, 0, 0.2)',
//                 fill: true,
//                 tension: 0,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             tooltip: {
//                 mode: 'index',
//                 intersect: false,
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Price',
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Size',
//                 },
//             },
//         },
//     };

//     return (
//         <div className="h-48 w-full">
//             <Line data={data} options={options} />
//         </div>
//     );
// };

// const SYMBOL_PRICE_RANGES = {
//     AAPL: [150.0, 200.0],
//     GOOGL: [2000.0, 2500.0],
//     MSFT: [200.0, 400.0],
//     AMZN: [3000.0, 3500.0],
//     TSLA: [200.0, 300.0],
// };

// const generateOrderBookData = (priceRange) => {
//     const [minPrice, maxPrice] = priceRange;
//     const midPrice = (minPrice + maxPrice) / 2;
//     const spread = (maxPrice - minPrice) * 0.01;

//     const bids = Array.from({ length: 10 }, (_, i) => ({
//         price: (midPrice - spread * (i + 1)).toFixed(2),
//         size: Math.random() * 100 + i * 100,
//     }));

//     const asks = Array.from({ length: 10 }, (_, i) => ({
//         price: (midPrice + spread * (i + 1)).toFixed(2),
//         size: Math.random() * 100 + i * 100,
//     }));

//     return { bids, asks };
// };

// const DepthCharts = () => {
//     const [orderBooks, setOrderBooks] = useState({});

//     useEffect(() => {
//         const updateData = () => {
//             const newOrderBooks = {};
//             Object.keys(SYMBOL_PRICE_RANGES).forEach((symbol) => {
//                 newOrderBooks[symbol] = generateOrderBookData(SYMBOL_PRICE_RANGES[symbol]);
//             });
//             setOrderBooks(newOrderBooks);
//         };

//         updateData();
//         const interval = setInterval(updateData, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="container mx-auto p-4 pb-12">
//             {/* <h1 className="text-4xl font-bold mb-4 text-center -mt-4 pb-8">Stock Depth Charts</h1> */}
//             <div className="flex flex-col lg:flex-row gap-4">
//                 {/* Left side: Large graph */}
//                 <div className="lg:w-2/5 border rounded-lg p-4 shadow-md flex-grow">
//                     <h2 className="text-lg font-semibold mb-2">AMZN</h2>
//                     {orderBooks['AMZN'] ? (
//                         <DepthChart
//                             bids={orderBooks['AMZN'].bids}
//                             asks={orderBooks['AMZN'].asks}
//                             symbol="AMZN"
//                         />
//                     ) : (
//                         <p>Loading...</p>
//                     )}
//                     <div className="mt-4 p-8">
//                         <h3 className="text-xl font-semibold mb-2 pb-3">About AMZN</h3>
//                         <p className="text-white/70 mb-3 pb-4">
//                             This section displays the consolidated order book for AMZN, combining bids and asks from various exchanges to provide a comprehensive view of market depth.
//                         </p>
//                         <div className="flex space-x-2">
//                             <button className="bg-blue-500/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                 View All Exchanges
//                             </button>
//                             <button className="bg-green-500/70 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                                 Analyze Liquidity
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side: 2x2 grid of smaller graphs */}
//                 <div className="lg:w-3/5 grid grid-cols-2 gap-4">
//                     {['AAPL', 'GOOGL', 'MSFT', 'TSLA'].map((symbol) => (
//                         <div key={symbol} className="border rounded-lg p-4 shadow-md">
//                             <h2 className="text-lg font-semibold mb-2">{symbol}</h2>
//                             {orderBooks[symbol] ? (
//                                 <DepthChart
//                                     bids={orderBooks[symbol].bids}
//                                     asks={orderBooks[symbol].asks}
//                                     symbol={symbol}
//                                 />
//                             ) : (
//                                 <p>Loading...</p>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DepthCharts;


//-------------///
// import React, { useState, useEffect, useRef } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// const DepthCharts = () => {
//     const [orderBooks, setOrderBooks] = useState({});
//     const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const stompClientRef = useRef(null);
//     const reconnectTimeoutRef = useRef(null);

//     // Transform backend data to component format
//     const transformOrderBookData = (symbolData) => {
//         // Transform buy orders (bids) - sort descending by price
//         const bids = Object.entries(symbolData.buy || {})
//             .map(([price, size]) => ({
//                 price: parseFloat(price),
//                 size: parseInt(size) || 0
//             }))
//             .filter(item => item.size > 0) // Filter out zero quantities
//             .sort((a, b) => b.price - a.price) // Sort bids descending by price
//             .slice(0, 15); // Limit to top 15 levels for performance

//         // Transform sell orders (asks) - sort ascending by price  
//         const asks = Object.entries(symbolData.sell || {})
//             .map(([price, size]) => ({
//                 price: parseFloat(price),
//                 size: parseInt(size) || 0
//             }))
//             .filter(item => item.size > 0) // Filter out zero quantities
//             .sort((a, b) => a.price - b.price) // Sort asks ascending by price
//             .slice(0, 15); // Limit to top 15 levels for performance

//         return { bids, asks };
//     };

//     const connectWebSocket = () => {
//         try {
//             // Clean up existing connection
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate();
//             }

//             // Clear any existing reconnection timeout
//             if (reconnectTimeoutRef.current) {
//                 clearTimeout(reconnectTimeoutRef.current);
//                 reconnectTimeoutRef.current = null;
//             }

//             setIsLoading(true);
//             setError(null);
//             setConnectionStatus('Connecting');

//             const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws/careEcho";

//             const client = new Client({
//                 brokerURL: undefined,
//                 webSocketFactory: () => new SockJS(socketUrl),
//                 reconnectDelay: 5000,
//                 debug: (msg) => console.log('[STOMP DEBUG]', msg),

//                 onConnect: () => {
//                     console.log('✅ Connected to WebSocket via STOMP');
//                     setIsLoading(false);
//                     setConnectionStatus('Connected');
//                     setError(null);

//                     client.subscribe('/topic/orders', (message) => {
//                         try {
//                             const orderData = JSON.parse(message.body);
//                             console.log('📦 Received order data:', orderData);

//                             if (orderData && orderData.data && Array.isArray(orderData.data)) {
//                                 const newOrderBooks = {};

//                                 orderData.data.forEach(symbolData => {
//                                     const symbolName = typeof symbolData.symbol === 'string'
//                                         ? symbolData.symbol
//                                         : symbolData.symbol.toString();

//                                     const transformed = transformOrderBookData(symbolData);
//                                     if (transformed.bids.length || transformed.asks.length) {
//                                         newOrderBooks[symbolName] = transformed;
//                                     }
//                                 });

//                                 if (Object.keys(newOrderBooks).length > 0) {
//                                     setOrderBooks(prev => ({
//                                         ...prev,
//                                         ...newOrderBooks
//                                     }));
//                                 }
//                             }

//                         } catch (err) {
//                             console.error('❌ Error parsing STOMP message:', err);
//                             setError('Error parsing data from server');
//                         }
//                     });
//                 },

//                 onStompError: (frame) => {
//                     console.error('❌ STOMP error:', frame);
//                     setConnectionStatus('Error');
//                     setError('STOMP protocol error from server');
//                     setIsLoading(false);
//                 },

//                 onWebSocketError: (event) => {
//                     console.error('❌ WebSocket error:', event);
//                     setConnectionStatus('Error');
//                     setError('WebSocket connection error');
//                     setIsLoading(false);
//                 },

//                 onWebSocketClose: (event) => {
//                     console.warn('⚠️ WebSocket connection closed:', event);
//                     setConnectionStatus('Disconnected');
//                     setIsLoading(false);

//                     // Only attempt reconnection if it wasn't a clean disconnect
//                     if (event.code !== 1000) {
//                         reconnectTimeoutRef.current = setTimeout(() => {
//                             console.log('🔁 Attempting reconnection...');
//                             connectWebSocket();
//                         }, 3000);
//                     }
//                 },

//                 onDisconnect: () => {
//                     console.log('📤 STOMP disconnected');
//                     setConnectionStatus('Disconnected');
//                     setIsLoading(false);
//                 }
//             });

//             stompClientRef.current = client;
//             client.activate(); // Start the connection

//         } catch (err) {
//             console.error('❌ Failed to connect WebSocket:', err);
//             setError('WebSocket connection failed: ' + err.message);
//             setConnectionStatus('Error');
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         connectWebSocket();

//         return () => {
//             // Cleanup on component unmount
//             if (reconnectTimeoutRef.current) {
//                 clearTimeout(reconnectTimeoutRef.current);
//             }
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate();
//             }
//         };
//     }, []);

//     // Manual reconnect function
//     const handleReconnect = () => {
//         console.log('🔄 Manual reconnection requested');
//         connectWebSocket();
//     };

//     // Disconnect function
//     const handleDisconnect = () => {
//         console.log('🔌 Manual disconnect requested');
//         if (reconnectTimeoutRef.current) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = null;
//         }
//         if (stompClientRef.current && stompClientRef.current.connected) {
//             stompClientRef.current.deactivate();
//         }
//         setConnectionStatus('Disconnected');
//         setIsLoading(false);
//     };

//     const getDisplaySymbols = () => {
//         const availableSymbols = Object.keys(orderBooks);
//         const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
        
//         // Use available symbols from backend, fallback to defaults for display
//         return availableSymbols.length > 0 ? availableSymbols : defaultSymbols;
//     };

//     const displaySymbols = getDisplaySymbols();
//     const mainSymbol = displaySymbols.includes('AMZN') ? 'AMZN' : displaySymbols[0];
//     const gridSymbols = displaySymbols.filter(symbol => symbol !== mainSymbol).slice(0, 4);

//     // Helper function to get connection status color
//     const getStatusColor = () => {
//         switch (connectionStatus) {
//             case 'Connected': return 'text-green-600';
//             case 'Connecting': return 'text-yellow-600';
//             case 'Error': return 'text-red-600';
//             default: return 'text-gray-600';
//         }
//     };
//     return (
//         <div className="container mx-auto p-4 pb-12">
//             {/* Connection Status */}
//             <div className="mb-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                     <div className={`w-3 h-3 rounded-full ${
//                         connectionStatus === 'Connected' ? 'bg-green-500' : 
//                         connectionStatus === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
//                     }`}></div>
//                     <span className={`text-sm font-medium ${
//                         connectionStatus === 'Connected' ? 'text-green-600' : 
//                         connectionStatus === 'Error' ? 'text-red-600' : 'text-yellow-600'
//                     }`}>
//                         {connectionStatus}
//                     </span>
//                 </div>
                
//                 {connectionStatus !== 'Connected' && (
//                     <button 
//                         onClick={handleReconnect}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
//                     >
//                         Reconnect
//                     </button>
//                 )}
//             </div>

//             {/* Error Display */}
//             {error && (
//                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                     {error}
//                 </div>
//             )}

//             <div className="flex flex-col lg:flex-row gap-4">
//                 {/* Left side: Large graph */}
//                 <div className="lg:w-2/5 border rounded-lg p-4 shadow-md flex-grow">
//                     <h2 className="text-lg font-semibold mb-2">{mainSymbol}</h2>
//                     {/* {orderBooks[mainSymbol] ? (
//                         // <DepthChart
//                         //     bids={orderBooks[mainSymbol].bids}
//                         //     asks={orderBooks[mainSymbol].asks}
//                         //     symbol={mainSymbol}
//                         // />
//                     ) : (
//                         <div className="h-48 w-full flex items-center justify-center text-gray-500">
//                             {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
//                         </div>
//                     )} */}
//                     <div className="mt-4 p-8">
//                         <h3 className="text-xl font-semibold mb-2 pb-3">About {mainSymbol}</h3>
//                         <p className="text-white/70 mb-3 pb-4">
//                             This section displays the real-time order book for {mainSymbol}, showing live bids and asks from your backend service.
//                         </p>
//                         <div className="flex space-x-2">
//                             <button className="bg-blue-500/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                 View All Exchanges
//                             </button>
//                             <button className="bg-green-500/70 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                                 Analyze Liquidity
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side: 2x2 grid of smaller graphs */}
//                 <div className="lg:w-3/5 grid grid-cols-2 gap-4">
//                     {gridSymbols.map((symbol) => (
//                         <div key={symbol} className="border rounded-lg p-4 shadow-md">
//                             <h2 className="text-lg font-semibold mb-2">{symbol}</h2>
//                             {/* {orderBooks[symbol] ? (
//                                 <DepthChart
//                                     bids={orderBooks[symbol].bids}
//                                     asks={orderBooks[symbol].asks}
//                                     symbol={symbol}
//                                 />
//                             ) : (
//                                 <div className="h-48 w-full flex items-center justify-center text-gray-500">
//                                     {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
//                                 </div>
//                             )} */}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DepthCharts;


/////====================================================================================/////
// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// const DepthChart = ({ bids, asks, symbol }) => {
//     const canvasRef = useRef(null);
//     const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

//     // Process data - use cumulative values directly from backend
//     const processedData = useMemo(() => {
//         if (!bids.length && !asks.length) return { processedBids: [], processedAsks: [], medianPrice: 0 };

//         // Since backend already provides cumulative data, use it directly
//         const processedBids = bids
//             .filter(bid => bid.cumulative > 0)
//             .sort((a, b) => b.price - a.price); // Descending by price

//         const processedAsks = asks
//             .filter(ask => ask.cumulative > 0)
//             .sort((a, b) => a.price - b.price); // Ascending by price

//         // Remove any overlaps
//         const bestBid = processedBids.length > 0 ? processedBids[0].price : 0;
//         const bestAsk = processedAsks.length > 0 ? processedAsks[0].price : 0;
        
//         const validBids = bestAsk > 0 ? processedBids.filter(bid => bid.price < bestAsk) : processedBids;
//         const validAsks = bestBid > 0 ? processedAsks.filter(ask => ask.price > bestBid) : processedAsks;

//         // Calculate median price
//         const medianPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : bestBid || bestAsk || 0;

//         return {
//             processedBids: validBids,
//             processedAsks: validAsks,
//             medianPrice
//         };
//     }, [bids, asks]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         const { width, height } = canvas.getBoundingClientRect();
        
//         canvas.width = width * window.devicePixelRatio;
//         canvas.height = height * window.devicePixelRatio;
//         ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
//         setDimensions({ width, height });
//         ctx.clearRect(0, 0, width, height);

//         const { processedBids, processedAsks, medianPrice } = processedData;

//         if (processedBids.length === 0 && processedAsks.length === 0) {
//             ctx.fillStyle = '#6b7280';
//             ctx.font = '14px Arial';
//             ctx.textAlign = 'center';
//             ctx.fillText('No order book data', width / 2, height / 2);
//             return;
//         }

//         // Calculate ranges using cumulative values
//         const allPrices = [...processedBids.map(b => b.price), ...processedAsks.map(a => a.price)];
//         const allQuantities = [...processedBids.map(b => b.cumulative), ...processedAsks.map(a => a.cumulative)];
        
//         if (allPrices.length === 0) return;

//         const minPrice = Math.min(...allPrices) * 0.995;
//         const maxPrice = Math.max(...allPrices) * 1.005;
//         const maxQuantity = Math.max(...allQuantities) * 1.1;

//         const padding = 40;
//         const chartWidth = width - 2 * padding;
//         const chartHeight = height - 2 * padding;

//         const priceToX = (price) => padding + ((price - minPrice) / (maxPrice - minPrice)) * chartWidth;
//         const quantityToY = (quantity) => height - padding - (quantity / maxQuantity) * chartHeight;

//         // Draw grid
//         ctx.strokeStyle = '#374151';
//         ctx.lineWidth = 0.5;
        
//         for (let i = 0; i <= 5; i++) {
//             const price = minPrice + (maxPrice - minPrice) * (i / 5);
//             const x = priceToX(price);
//             ctx.beginPath();
//             ctx.moveTo(x, padding);
//             ctx.lineTo(x, height - padding);
//             ctx.stroke();
//         }

//         for (let i = 0; i <= 5; i++) {
//             const quantity = maxQuantity * (i / 5);
//             const y = quantityToY(quantity);
//             ctx.beginPath();
//             ctx.moveTo(padding, y);
//             ctx.lineTo(width - padding, y);
//             ctx.stroke();
//         }

//         // Draw median price line
//         if (medianPrice > 0) {
//             ctx.strokeStyle = '#fbbf24';
//             ctx.lineWidth = 2;
//             ctx.setLineDash([5, 5]);
//             const medianX = priceToX(medianPrice);
//             ctx.beginPath();
//             ctx.moveTo(medianX, padding);
//             ctx.lineTo(medianX, height - padding);
//             ctx.stroke();
//             ctx.setLineDash([]);
            
//             ctx.fillStyle = '#fbbf24';
//             ctx.font = '12px Arial';
//             ctx.textAlign = 'center';
//             ctx.fillText(`Median: $${medianPrice.toFixed(2)}`, medianX, padding - 10);
//         }

//         // Draw bid depth area (green)
//         if (processedBids.length > 0) {
//             ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
//             ctx.strokeStyle = '#10b981';
//             ctx.lineWidth = 2;

//             ctx.beginPath();
            
//             // Start from zero depth at the rightmost bid price
//             let startX = priceToX(processedBids[0].price);
//             ctx.moveTo(startX, height - padding);
            
//             // Draw the depth curve as steps
//             for (let i = 0; i < processedBids.length; i++) {
//                 const bid = processedBids[i];
//                 const x = priceToX(bid.price);
//                 const y = quantityToY(bid.cumulative);
                
//                 // Draw horizontal line at this cumulative depth
//                 ctx.lineTo(x, y);
                
//                 // If there's a next point, draw vertical line to extend the depth
//                 if (i < processedBids.length - 1) {
//                     const nextBid = processedBids[i + 1];
//                     const nextX = priceToX(nextBid.price);
//                     ctx.lineTo(nextX, y);
//                 }
//             }
            
//             // Close the area back to the baseline
//             const lastBid = processedBids[processedBids.length - 1];
//             ctx.lineTo(priceToX(lastBid.price), height - padding);
//             ctx.closePath();
            
//             ctx.fill();
//             ctx.stroke();
//         }

//         // Draw ask depth area (red)
//         if (processedAsks.length > 0) {
//             ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
//             ctx.strokeStyle = '#ef4444';
//             ctx.lineWidth = 2;

//             ctx.beginPath();
            
//             // Start from zero depth at the leftmost ask price
//             let startX = priceToX(processedAsks[0].price);
//             ctx.moveTo(startX, height - padding);
            
//             // Draw the depth curve as steps
//             for (let i = 0; i < processedAsks.length; i++) {
//                 const ask = processedAsks[i];
//                 const x = priceToX(ask.price);
//                 const y = quantityToY(ask.cumulative);
                
//                 // Draw horizontal line at this cumulative depth
//                 ctx.lineTo(x, y);
                
//                 // If there's a next point, draw vertical line to extend the depth
//                 if (i < processedAsks.length - 1) {
//                     const nextAsk = processedAsks[i + 1];
//                     const nextX = priceToX(nextAsk.price);
//                     ctx.lineTo(nextX, y);
//                 }
//             }
            
//             // Close the area back to the baseline
//             const lastAsk = processedAsks[processedAsks.length - 1];
//             ctx.lineTo(priceToX(lastAsk.price), height - padding);
//             ctx.closePath();
            
//             ctx.fill();
//             ctx.stroke();
//         }

//         // Draw axes
//         ctx.strokeStyle = '#4b5563';
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(padding, height - padding);
//         ctx.lineTo(width - padding, height - padding);
//         ctx.moveTo(padding, padding);
//         ctx.lineTo(padding, height - padding);
//         ctx.stroke();

//         // Draw labels
//         ctx.fillStyle = '#9ca3af';
//         ctx.font = '11px Arial';
//         ctx.textAlign = 'center';

//         for (let i = 0; i <= 5; i++) {
//             const price = minPrice + (maxPrice - minPrice) * (i / 5);
//             const x = priceToX(price);
//             ctx.fillText(`$${price.toFixed(2)}`, x, height - padding + 15);
//         }

//         ctx.textAlign = 'right';
//         for (let i = 0; i <= 5; i++) {
//             const quantity = maxQuantity * (i / 5);
//             const y = quantityToY(quantity);
//             ctx.fillText(quantity.toFixed(0), padding - 10, y + 4);
//         }

//         // Legend
//         ctx.textAlign = 'left';
//         ctx.font = '12px Arial';
        
//         ctx.fillStyle = '#10b981';
//         ctx.fillRect(width - padding - 80, padding + 10, 12, 12);
//         ctx.fillText('Bids', width - padding - 60, padding + 21);
        
//         ctx.fillStyle = '#ef4444';
//         ctx.fillRect(width - padding - 80, padding + 30, 12, 12);
//         ctx.fillText('Asks', width - padding - 60, padding + 41);

//     }, [processedData, dimensions]);

//     return (
//         <div className="w-full h-48">
//             <canvas
//                 ref={canvasRef}
//                 className="w-full h-full border border-gray-300 rounded"
//                 style={{ width: '100%', height: '100%' }}
//             />
//         </div>
//     );
// };

// const DepthCharts = () => {
//     const [orderBooks, setOrderBooks] = useState({});
//     const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const stompClientRef = useRef(null);
//     const reconnectTimeoutRef = useRef(null);

//     // Transform backend data to component format
//     // Transform backend cumulative depth data to component format
// // Transform backend cumulative depth data to component format
// const transformOrderBookData = (symbolData) => {
//     console.log('📊 Received symbol data:', symbolData);
    
//     // Extract cumulative maps from backend (your backend already calculated these)
//     const cumulativeBuyMap = symbolData.cumulativeBuyMap || symbolData.buy || {};
//     const cumulativeSellMap = symbolData.cumulativeSellMap || symbolData.sell || {};

//     // Convert to arrays with cumulative values (don't convert back to individual sizes)
//     const bidEntries = Object.entries(cumulativeBuyMap)
//         .map(([price, cumulativeQty]) => ({
//             price: parseFloat(price),
//             cumulative: parseInt(cumulativeQty) || 0
//         }))
//         .filter(item => item.cumulative > 0)
//         .sort((a, b) => b.price - a.price); // Sort bids descending by price

//     const askEntries = Object.entries(cumulativeSellMap)
//         .map(([price, cumulativeQty]) => ({
//             price: parseFloat(price),
//             cumulative: parseInt(cumulativeQty) || 0
//         }))
//         .filter(item => item.cumulative > 0)
//         .sort((a, b) => a.price - b.price); // Sort asks ascending by price

//     // Remove overlapping entries
//     const bestBid = bidEntries.length > 0 ? bidEntries[0].price : 0;
//     const bestAsk = askEntries.length > 0 ? askEntries[0].price : 0;

//     const validBids = bestAsk > 0 
//         ? bidEntries.filter(bid => bid.price < bestAsk) 
//         : bidEntries;
    
//     const validAsks = bestBid > 0 
//         ? askEntries.filter(ask => ask.price > bestBid)
//         : askEntries;

//     // Since we're using cumulative data directly, create fake 'size' for compatibility
//     // but the chart will use the 'cumulative' values
//     const bids = validBids.map(bid => ({
//         price: bid.price,
//         size: 1, // Dummy value, not used
//         cumulative: bid.cumulative // This is what we'll actually use
//     })).slice(0, 15);

//     const asks = validAsks.map(ask => ({
//         price: ask.price,
//         size: 1, // Dummy value, not used  
//         cumulative: ask.cumulative // This is what we'll actually use
//     })).slice(0, 15);

//     console.log(`📊 Processed ${symbolData.symbol || 'Unknown'}: ${bids.length} bids, ${asks.length} asks`);
//     console.log('💰 Sample bid:', bids[0]);
//     console.log('💰 Sample ask:', asks[0]);

//     return { bids, asks };
// };

//     const connectWebSocket = () => {
//         try {
//             // Clean up existing connection
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate();
//             }

//             // Clear any existing reconnection timeout
//             if (reconnectTimeoutRef.current) {
//                 clearTimeout(reconnectTimeoutRef.current);
//                 reconnectTimeoutRef.current = null;
//             }

//             setIsLoading(true);
//             setError(null);
//             setConnectionStatus('Connecting');

//             const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws/careEcho";

//             const client = new Client({
//                 brokerURL: undefined,
//                 webSocketFactory: () => new SockJS(socketUrl),
//                 reconnectDelay: 5000,
//                 debug: (msg) => console.log('[STOMP DEBUG]', msg),

//                 onConnect: () => {
//                     console.log('✅ Connected to WebSocket via STOMP');
//                     setIsLoading(false);
//                     setConnectionStatus('Connected');
//                     setError(null);

//                     client.subscribe('/topic/orders', (message) => {
//                         try {
//                             const orderData = JSON.parse(message.body);
//                             console.log('📦 Received order data:', orderData);

//                             if (orderData && orderData.data && Array.isArray(orderData.data)) {
//                                 const newOrderBooks = {};

//                                 orderData.data.forEach(symbolData => {
//                                     const symbolName = typeof symbolData.symbol === 'string'
//                                         ? symbolData.symbol
//                                         : symbolData.symbol.toString();

//                                     const transformed = transformOrderBookData(symbolData);
//                                     if (transformed.bids.length || transformed.asks.length) {
//                                         newOrderBooks[symbolName] = transformed;
//                                     }
//                                 });

//                                 if (Object.keys(newOrderBooks).length > 0) {
//                                     setOrderBooks(prev => ({
//                                         ...prev,
//                                         ...newOrderBooks
//                                     }));
//                                 }
//                             }

//                         } catch (err) {
//                             console.error('❌ Error parsing STOMP message:', err);
//                             setError('Error parsing data from server');
//                         }
//                     });
//                 },

//                 onStompError: (frame) => {
//                     console.error('❌ STOMP error:', frame);
//                     setConnectionStatus('Error');
//                     setError('STOMP protocol error from server');
//                     setIsLoading(false);
//                 },

//                 onWebSocketError: (event) => {
//                     console.error('❌ WebSocket error:', event);
//                     setConnectionStatus('Error');
//                     setError('WebSocket connection error');
//                     setIsLoading(false);
//                 },

//                 onWebSocketClose: (event) => {
//                     console.warn('⚠️ WebSocket connection closed:', event);
//                     setConnectionStatus('Disconnected');
//                     setIsLoading(false);

//                     // Only attempt reconnection if it wasn't a clean disconnect
//                     if (event.code !== 1000) {
//                         reconnectTimeoutRef.current = setTimeout(() => {
//                             console.log('🔁 Attempting reconnection...');
//                             connectWebSocket();
//                         }, 3000);
//                     }
//                 },

//                 onDisconnect: () => {
//                     console.log('📤 STOMP disconnected');
//                     setConnectionStatus('Disconnected');
//                     setIsLoading(false);
//                 }
//             });

//             stompClientRef.current = client;
//             client.activate(); // Start the connection

//         } catch (err) {
//             console.error('❌ Failed to connect WebSocket:', err);
//             setError('WebSocket connection failed: ' + err.message);
//             setConnectionStatus('Error');
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         connectWebSocket();

//         return () => {
//             // Cleanup on component unmount
//             if (reconnectTimeoutRef.current) {
//                 clearTimeout(reconnectTimeoutRef.current);
//             }
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.deactivate();
//             }
//         };
//     }, []);

//     // Manual reconnect function
//     const handleReconnect = () => {
//         console.log('🔄 Manual reconnection requested');
//         connectWebSocket();
//     };

//     // Disconnect function
//     const handleDisconnect = () => {
//         console.log('🔌 Manual disconnect requested');
//         if (reconnectTimeoutRef.current) {
//             clearTimeout(reconnectTimeoutRef.current);
//             reconnectTimeoutRef.current = null;
//         }
//         if (stompClientRef.current && stompClientRef.current.connected) {
//             stompClientRef.current.deactivate();
//         }
//         setConnectionStatus('Disconnected');
//         setIsLoading(false);
//     };

//     const getDisplaySymbols = () => {
//         const availableSymbols = Object.keys(orderBooks);
//         const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
        
//         // Use available symbols from backend, fallback to defaults for display
//         return availableSymbols.length > 0 ? availableSymbols : defaultSymbols;
//     };

//     const displaySymbols = getDisplaySymbols();
//     const mainSymbol = displaySymbols.includes('AMZN') ? 'AMZN' : displaySymbols[0];
//     const gridSymbols = displaySymbols.filter(symbol => symbol !== mainSymbol).slice(0, 4);

//     // Helper function to get connection status color
//     const getStatusColor = () => {
//         switch (connectionStatus) {
//             case 'Connected': return 'text-green-600';
//             case 'Connecting': return 'text-yellow-600';
//             case 'Error': return 'text-red-600';
//             default: return 'text-gray-600';
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 pb-12">
//             {/* Connection Status */}
//             <div className="mb-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                     <div className={`w-3 h-3 rounded-full ${
//                         connectionStatus === 'Connected' ? 'bg-green-500' : 
//                         connectionStatus === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
//                     }`}></div>
//                     <span className={`text-sm font-medium ${
//                         connectionStatus === 'Connected' ? 'text-green-600' : 
//                         connectionStatus === 'Error' ? 'text-red-600' : 'text-yellow-600'
//                     }`}>
//                         {connectionStatus}
//                     </span>
//                 </div>
                
//                 {connectionStatus !== 'Connected' && (
//                     <button 
//                         onClick={handleReconnect}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
//                     >
//                         Reconnect
//                     </button>
//                 )}
//             </div>

//             {/* Error Display */}
//             {error && (
//                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                     {error}
//                 </div>
//             )}

//             <div className="flex flex-col lg:flex-row gap-4">
//                 {/* Left side: Large graph */}
//                 <div className="lg:w-2/5 border rounded-lg p-4 shadow-md flex-grow">
//                     <h2 className="text-lg font-semibold mb-2">{mainSymbol}</h2>
//                     {orderBooks[mainSymbol] ? (
//                         <DepthChart
//                             bids={orderBooks[mainSymbol].bids}
//                             asks={orderBooks[mainSymbol].asks}
//                             symbol={mainSymbol}
//                         />
//                     ) : (
//                         <div className="h-48 w-full flex items-center justify-center text-gray-500">
//                             {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
//                         </div>
//                     )}
//                     <div className="mt-4 p-8">
//                         <h3 className="text-xl font-semibold mb-2 pb-3">About {mainSymbol}</h3>
//                         <p className="text-gray-600 mb-3 pb-4">
//                             This section displays the real-time order book for {mainSymbol}, showing live bids and asks from your backend service.
//                         </p>
//                         <div className="flex space-x-2">
//                             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                 View All Exchanges
//                             </button>
//                             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                                 Analyze Liquidity
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side: 2x2 grid of smaller graphs */}
//                 <div className="lg:w-3/5 grid grid-cols-2 gap-4">
//                     {gridSymbols.map((symbol) => (
//                         <div key={symbol} className="border rounded-lg p-4 shadow-md">
//                             <h2 className="text-lg font-semibold mb-2">{symbol}</h2>
//                             {orderBooks[symbol] ? (
//                                 <DepthChart
//                                     bids={orderBooks[symbol].bids}
//                                     asks={orderBooks[symbol].asks}
//                                     symbol={symbol}
//                                 />
//                             ) : (
//                                 <div className="h-48 w-full flex items-center justify-center text-gray-500">
//                                     {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DepthCharts;


/////====================================================================================/////

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const DepthChart = ({ bids, asks, symbol }) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

    // Process data - use cumulative values directly from backend
    const processedData = useMemo(() => {
        if (!bids.length && !asks.length) return { processedBids: [], processedAsks: [], medianPrice: 0 };

        // Since backend already provides cumulative data, use it directly
        const processedBids = bids
            .filter(bid => bid.cumulative > 0)
            .sort((a, b) => b.price - a.price); // Descending by price

        const processedAsks = asks
            .filter(ask => ask.cumulative > 0)
            .sort((a, b) => a.price - b.price); // Ascending by price

        // Remove any overlaps
        const bestBid = processedBids.length > 0 ? processedBids[0].price : 0;
        const bestAsk = processedAsks.length > 0 ? processedAsks[0].price : 0;
        
        const validBids = bestAsk > 0 ? processedBids.filter(bid => bid.price < bestAsk) : processedBids;
        const validAsks = bestBid > 0 ? processedAsks.filter(ask => ask.price > bestBid) : processedAsks;

        // Calculate median price
        const medianPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : bestBid || bestAsk || 0;

        return {
            processedBids: validBids,
            processedAsks: validAsks,
            medianPrice
        };
    }, [bids, asks]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas.getBoundingClientRect();
        
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        setDimensions({ width, height });
        ctx.clearRect(0, 0, width, height);

        const { processedBids, processedAsks, medianPrice } = processedData;

        if (processedBids.length === 0 && processedAsks.length === 0) {
            ctx.fillStyle = '#6b7280';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No order book data', width / 2, height / 2);
            return;
        }

        // Calculate ranges using cumulative values
        const allPrices = [...processedBids.map(b => b.price), ...processedAsks.map(a => a.price)];
        const allQuantities = [...processedBids.map(b => b.cumulative), ...processedAsks.map(a => a.cumulative)];
        
        if (allPrices.length === 0) return;

        const minPrice = Math.min(...allPrices) * 0.995;
        const maxPrice = Math.max(...allPrices) * 1.005;
        const maxQuantity = Math.max(...allQuantities) * 1.1;

        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        const priceToX = (price) => padding + ((price - minPrice) / (maxPrice - minPrice)) * chartWidth;
        const quantityToY = (quantity) => height - padding - (quantity / maxQuantity) * chartHeight;

        // Draw grid
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= 5; i++) {
            const price = minPrice + (maxPrice - minPrice) * (i / 5);
            const x = priceToX(price);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }

        for (let i = 0; i <= 5; i++) {
            const quantity = maxQuantity * (i / 5);
            const y = quantityToY(quantity);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw median price line
        if (medianPrice > 0) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            const medianX = priceToX(medianPrice);
            ctx.beginPath();
            ctx.moveTo(medianX, padding);
            ctx.lineTo(medianX, height - padding);
            ctx.stroke();
            ctx.setLineDash([]);
            
            ctx.fillStyle = '#fbbf24';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Median: $${medianPrice.toFixed(2)}`, medianX, padding - 10);
        }

        // Draw bid depth area (green) - smooth curve
        if (processedBids.length > 0) {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;

            ctx.beginPath();
            
            // Start from zero depth at the rightmost bid price
            const startX = priceToX(processedBids[0].price);
            ctx.moveTo(startX, height - padding);
            
            // Draw smooth curve through bid points
            for (let i = 0; i < processedBids.length; i++) {
                const bid = processedBids[i];
                const x = priceToX(bid.price);
                const y = quantityToY(bid.cumulative);
                
                if (i === 0) {
                    ctx.lineTo(x, y);
                } else {
                    // Use quadratic curves for smooth transitions
                    const prevBid = processedBids[i - 1];
                    const prevX = priceToX(prevBid.price);
                    const prevY = quantityToY(prevBid.cumulative);
                    
                    // Control point for smooth curve
                    const cpX = prevX + (x - prevX) * 0.5;
                    const cpY = prevY;
                    
                    ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            
            // Close the area back to the baseline
            const lastBid = processedBids[processedBids.length - 1];
            ctx.lineTo(priceToX(lastBid.price), height - padding);
            ctx.closePath();
            
            ctx.fill();
            ctx.stroke();
        }

        // Draw ask depth area (red) - smooth curve
        if (processedAsks.length > 0) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;

            ctx.beginPath();
            
            // Start from zero depth at the leftmost ask price
            const startX = priceToX(processedAsks[0].price);
            ctx.moveTo(startX, height - padding);
            
            // Draw smooth curve through ask points
            for (let i = 0; i < processedAsks.length; i++) {
                const ask = processedAsks[i];
                const x = priceToX(ask.price);
                const y = quantityToY(ask.cumulative);
                
                if (i === 0) {
                    ctx.lineTo(x, y);
                } else {
                    // Use quadratic curves for smooth transitions
                    const prevAsk = processedAsks[i - 1];
                    const prevX = priceToX(prevAsk.price);
                    const prevY = quantityToY(prevAsk.cumulative);
                    
                    // Control point for smooth curve
                    const cpX = prevX + (x - prevX) * 0.5;
                    const cpY = prevY;
                    
                    ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            
            // Close the area back to the baseline
            const lastAsk = processedAsks[processedAsks.length - 1];
            ctx.lineTo(priceToX(lastAsk.price), height - padding);
            ctx.closePath();
            
            ctx.fill();
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();

        // Draw labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';

        for (let i = 0; i <= 5; i++) {
            const price = minPrice + (maxPrice - minPrice) * (i / 5);
            const x = priceToX(price);
            ctx.fillText(`$${price.toFixed(2)}`, x, height - padding + 15);
        }

        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const quantity = maxQuantity * (i / 5);
            const y = quantityToY(quantity);
            ctx.fillText(quantity.toFixed(0), padding - 10, y + 4);
        }

        // Legend
        ctx.textAlign = 'left';
        ctx.font = '12px Arial';
        
        ctx.fillStyle = '#10b981';
        ctx.fillRect(width - padding - 80, padding + 10, 12, 12);
        ctx.fillText('Bids', width - padding - 60, padding + 21);
        
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(width - padding - 80, padding + 30, 12, 12);
        ctx.fillText('Asks', width - padding - 60, padding + 41);

    }, [processedData, dimensions]);

    return (
        <div className="w-full h-48">
            <canvas
                ref={canvasRef}
                className="w-full h-full border border-gray-300 rounded"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

const DepthCharts = () => {
    const [orderBooks, setOrderBooks] = useState({});
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const stompClientRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Transform backend data to component format
    // Transform backend cumulative depth data to component format
// Transform backend cumulative depth data to component format
const transformOrderBookData = (symbolData) => {
    console.log('📊 Received symbol data:', symbolData);
    
    // Extract cumulative maps from backend (your backend already calculated these)
    const cumulativeBuyMap = symbolData.cumulativeBuyMap || symbolData.buy || {};
    const cumulativeSellMap = symbolData.cumulativeSellMap || symbolData.sell || {};

    // Convert to arrays with cumulative values (don't convert back to individual sizes)
    const bidEntries = Object.entries(cumulativeBuyMap)
        .map(([price, cumulativeQty]) => ({
            price: parseFloat(price),
            cumulative: parseInt(cumulativeQty) || 0
        }))
        .filter(item => item.cumulative > 0)
        .sort((a, b) => b.price - a.price); // Sort bids descending by price

    const askEntries = Object.entries(cumulativeSellMap)
        .map(([price, cumulativeQty]) => ({
            price: parseFloat(price),
            cumulative: parseInt(cumulativeQty) || 0
        }))
        .filter(item => item.cumulative > 0)
        .sort((a, b) => a.price - b.price); // Sort asks ascending by price

    // Remove overlapping entries
    const bestBid = bidEntries.length > 0 ? bidEntries[0].price : 0;
    const bestAsk = askEntries.length > 0 ? askEntries[0].price : 0;

    const validBids = bestAsk > 0 
        ? bidEntries.filter(bid => bid.price < bestAsk) 
        : bidEntries;
    
    const validAsks = bestBid > 0 
        ? askEntries.filter(ask => ask.price > bestBid)
        : askEntries;

    // Since we're using cumulative data directly, create fake 'size' for compatibility
    // but the chart will use the 'cumulative' values
    const bids = validBids.map(bid => ({
        price: bid.price,
        size: 1, // Dummy value, not used
        cumulative: bid.cumulative // This is what we'll actually use
    })).slice(0, 15);

    const asks = validAsks.map(ask => ({
        price: ask.price,
        size: 1, // Dummy value, not used  
        cumulative: ask.cumulative // This is what we'll actually use
    })).slice(0, 15);

    console.log(`📊 Processed ${symbolData.symbol || 'Unknown'}: ${bids.length} bids, ${asks.length} asks`);
    console.log('💰 Sample bid:', bids[0]);
    console.log('💰 Sample ask:', asks[0]);

    return { bids, asks };
};

    const connectWebSocket = () => {
        try {
            // Clean up existing connection
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.deactivate();
            }

            // Clear any existing reconnection timeout
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }

            setIsLoading(true);
            setError(null);
            setConnectionStatus('Connecting');

            const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ws/careEcho";

            const client = new Client({
                brokerURL: undefined,
                webSocketFactory: () => new SockJS(socketUrl),
                reconnectDelay: 5000,
                debug: (msg) => console.log('[STOMP DEBUG]', msg),

                onConnect: () => {
                    console.log('✅ Connected to WebSocket via STOMP');
                    setIsLoading(false);
                    setConnectionStatus('Connected');
                    setError(null);

                    client.subscribe('/topic/orders', (message) => {
                        try {
                            const orderData = JSON.parse(message.body);
                            console.log('📦 Received order data:', orderData);

                            if (orderData && orderData.data && Array.isArray(orderData.data)) {
                                const newOrderBooks = {};

                                orderData.data.forEach(symbolData => {
                                    const symbolName = typeof symbolData.symbol === 'string'
                                        ? symbolData.symbol
                                        : symbolData.symbol.toString();

                                    const transformed = transformOrderBookData(symbolData);
                                    if (transformed.bids.length || transformed.asks.length) {
                                        newOrderBooks[symbolName] = transformed;
                                    }
                                });

if (Object.keys(newOrderBooks).length > 0) {
    setOrderBooks(prev => ({
        ...prev,
        ...newOrderBooks
    }));
}

                            }

                        } catch (err) {
                            console.error('❌ Error parsing STOMP message:', err);
                            setError('Error parsing data from server');
                        }
                    });
                },

                onStompError: (frame) => {
                    console.error('❌ STOMP error:', frame);
                    setConnectionStatus('Error');
                    setError('STOMP protocol error from server');
                    setIsLoading(false);
                },

                onWebSocketError: (event) => {
                    console.error('❌ WebSocket error:', event);
                    setConnectionStatus('Error');
                    setError('WebSocket connection error');
                    setIsLoading(false);
                },

                onWebSocketClose: (event) => {
                    console.warn('⚠️ WebSocket connection closed:', event);
                    setConnectionStatus('Disconnected');
                    setIsLoading(false);

                    // Only attempt reconnection if it wasn't a clean disconnect
                    if (event.code !== 1000) {
                        reconnectTimeoutRef.current = setTimeout(() => {
                            console.log('🔁 Attempting reconnection...');
                            connectWebSocket();
                        }, 3000);
                    }
                },

                onDisconnect: () => {
                    console.log('📤 STOMP disconnected');
                    setConnectionStatus('Disconnected');
                    setIsLoading(false);
                }
            });

            stompClientRef.current = client;
            client.activate(); // Start the connection

        } catch (err) {
            console.error('❌ Failed to connect WebSocket:', err);
            setError('WebSocket connection failed: ' + err.message);
            setConnectionStatus('Error');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            // Cleanup on component unmount
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    // Manual reconnect function
    const handleReconnect = () => {
        console.log('🔄 Manual reconnection requested');
        connectWebSocket();
    };

    // Disconnect function
    const handleDisconnect = () => {
        console.log('🔌 Manual disconnect requested');
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.deactivate();
        }
        setConnectionStatus('Disconnected');
        setIsLoading(false);
    };

    const getDisplaySymbols = () => {
        const availableSymbols = Object.keys(orderBooks);
        const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
        
        // Use available symbols from backend, fallback to defaults for display
        return availableSymbols.length > 0 ? availableSymbols : defaultSymbols;
    };

    const displaySymbols = getDisplaySymbols();
    const mainSymbol = displaySymbols.includes('AMZN') ? 'AMZN' : displaySymbols[0];
    const gridSymbols = displaySymbols.filter(symbol => symbol !== mainSymbol).slice(0, 4);

    // Helper function to get connection status color
    const getStatusColor = () => {
        switch (connectionStatus) {
            case 'Connected': return 'text-green-600';
            case 'Connecting': return 'text-yellow-600';
            case 'Error': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="container mx-auto p-4 pb-12">
            {/* Connection Status */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                        connectionStatus === 'Connected' ? 'bg-green-500' : 
                        connectionStatus === 'Error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                        connectionStatus === 'Connected' ? 'text-green-600' : 
                        connectionStatus === 'Error' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                        {connectionStatus}
                    </span>
                </div>
                
                {connectionStatus !== 'Connected' && (
                    <button 
                        onClick={handleReconnect}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                        Reconnect
                    </button>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left side: Large graph */}
                <div className="lg:w-2/5 border rounded-lg p-4 shadow-md flex-grow">
                    <h2 className="text-lg font-semibold mb-2">{mainSymbol}</h2>
                    {orderBooks[mainSymbol] ? (
                        <DepthChart
                            bids={orderBooks[mainSymbol].bids}
                            asks={orderBooks[mainSymbol].asks}
                            symbol={mainSymbol}
                        />
                    ) : (
                        <div className="h-48 w-full flex items-center justify-center text-gray-500">
                            {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
                        </div>
                    )}
                    <div className="mt-4 p-8">
                        <h3 className="text-xl font-semibold mb-2 pb-3">About {mainSymbol}</h3>
                        <p className="text-gray-600 mb-3 pb-4">
                            This section displays the real-time order book for {mainSymbol}, showing live bids and asks from your backend service.
                        </p>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                View All Exchanges
                            </button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Analyze Liquidity
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right side: 2x2 grid of smaller graphs */}
                <div className="lg:w-3/5 grid grid-cols-2 gap-4">
                    {gridSymbols.map((symbol) => (
                        <div key={symbol} className="border rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-semibold mb-2">{symbol}</h2>
                            {orderBooks[symbol] ? (
                                <DepthChart
                                    bids={orderBooks[symbol].bids}
                                    asks={orderBooks[symbol].asks}
                                    symbol={symbol}
                                />
                            ) : (
                                <div className="h-48 w-full flex items-center justify-center text-gray-500">
                                    {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DepthCharts;