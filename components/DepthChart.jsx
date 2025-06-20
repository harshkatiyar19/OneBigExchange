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
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

const DepthChart = ({ bids = [], asks = [], symbol }) => {
    // Calculate median price to separate bids and asks
    const calculateMedianPrice = (bids, asks) => {
        if (bids.length === 0 && asks.length === 0) return 0;
        
        const bestBid = bids.length > 0 ? Math.max(...bids.map(b => b.price)) : 0;
        const bestAsk = asks.length > 0 ? Math.min(...asks.map(a => a.price)) : 0;
        
        if (bestBid > 0 && bestAsk > 0) {
            return (bestBid + bestAsk) / 2; // Midpoint of spread
        } else if (bestBid > 0) {
            return bestBid;
        } else if (bestAsk > 0) {
            return bestAsk;
        }
        return 0;
    };

    const medianPrice = calculateMedianPrice(bids, asks);

    // Filter and sort bids and asks
    const filteredBids = bids
        .filter(bid => bid.price <= medianPrice)
        .sort((a, b) => b.price - a.price); // Sort descending
    
    const filteredAsks = asks
        .filter(ask => ask.price >= medianPrice)
        .sort((a, b) => a.price - b.price); // Sort ascending

    // Calculate cumulative sizes
    const calculateCumulativeData = (orders) => {
        let cumulative = 0;
        return orders.map(order => {
            cumulative += order.size;
            return { ...order, cumulativeSize: cumulative };
        });
    };

    const cumulativeBids = calculateCumulativeData(filteredBids);
    const cumulativeAsks = calculateCumulativeData(filteredAsks);

    // Create price arrays - bids go from lowest to median, asks from median to highest
    const bidPrices = cumulativeBids.map(bid => bid.price).sort((a, b) => a - b);
    const askPrices = cumulativeAsks.map(ask => ask.price).sort((a, b) => a - b);
    
    // Combine all prices
    const allPrices = [...bidPrices, ...askPrices].sort((a, b) => a - b);

    // Find the maximum cumulative size to normalize the connection point
    const maxBidSize = cumulativeBids.length > 0 ? Math.max(...cumulativeBids.map(b => b.cumulativeSize)) : 0;
    const maxAskSize = cumulativeAsks.length > 0 ? Math.max(...cumulativeAsks.map(a => a.cumulativeSize)) : 0;

    // Create continuous data arrays that touch at median price and extend to x-axis
    const bidData = allPrices.map(price => {
        if (price > medianPrice) return null;
        
        // If at median price, return the maximum bid size to connect with asks
        if (Math.abs(price - medianPrice) < 0.01) {
            return maxBidSize;
        }
        
        const bid = cumulativeBids.find(b => Math.abs(b.price - price) < 0.01);
        return bid ? bid.cumulativeSize : 0; // Return 0 instead of null to touch x-axis
    });

    const askData = allPrices.map(price => {
        if (price < medianPrice) return null;
        
        // If at median price, return the maximum ask size to connect with bids
        if (Math.abs(price - medianPrice) < 0.01) {
            return maxAskSize;
        }
        
        const ask = cumulativeAsks.find(a => Math.abs(a.price - price) < 0.01);
        return ask ? ask.cumulativeSize : 0; // Return 0 instead of null to touch x-axis
    });

    // Add connection points at median price for smooth transition
    const medianIndex = allPrices.findIndex(price => Math.abs(price - medianPrice) < 0.01);
    
    // Ensure both datasets have a value at the median price for connection
    if (medianIndex !== -1) {
        // Use the smaller of the two max sizes for a natural connection
        const connectionSize = Math.min(maxBidSize, maxAskSize) || Math.max(maxBidSize, maxAskSize);
        if (bidData[medianIndex] !== null) bidData[medianIndex] = connectionSize;
        if (askData[medianIndex] !== null) askData[medianIndex] = connectionSize;
    }

    const data = {
        labels: allPrices.map(price => price.toFixed(2)),
        datasets: [
            {
                label: 'Bids (Cumulative)',
                data: bidData,
                borderColor: '#00FF00',
                backgroundColor: 'rgba(0, 255, 0, 0.15)', // Green with transparency
                fill: 'origin', // Fill to x-axis
                tension: 0.1, // Slight curve for smoother appearance
                pointRadius: 0,
                pointHoverRadius: 4,
                borderWidth: 3,
                spanGaps: false,
            },
            {
                label: 'Asks (Cumulative)',
                data: askData,
                borderColor: '#FF0000',
                backgroundColor: 'rgba(255, 0, 0, 0.15)', // Red with transparency
                fill: 'origin', // Fill to x-axis
                tension: 0.1, // Slight curve for smoother appearance
                pointRadius: 0,
                pointHoverRadius: 4,
                borderWidth: 3,
                spanGaps: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (context) => `Price: $${context[0].label}`,
                    label: (context) => {
                        const value = context.raw;
                        return value !== null && value !== undefined ? 
                            `${context.dataset.label}: ${value.toLocaleString()}` : '';
                    },
                    afterLabel: (context) => {
                        const price = parseFloat(context.label);
                        if (Math.abs(price - medianPrice) < 0.01) {
                            return `Spread Center: $${medianPrice.toFixed(2)}`;
                        }
                        return '';
                    }
                },
                filter: (tooltipItem) => tooltipItem.raw !== null && tooltipItem.raw !== undefined,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price ($)',
                    color: 'rgba(255, 255, 255, 0.8)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cumulative Size',
                    color: 'rgba(255, 255, 255, 0.8)',
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                },
            },
        },
        elements: {
            line: {
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
            },
        },
    };

    return (
        <div className="h-48 w-full">
            <Line data={data} options={options} />
        </div>
    );
};

const DepthCharts = () => {
    const [orderBooks, setOrderBooks] = useState({});
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [error, setError] = useState(null);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Transform backend data to component format
    const transformOrderBookData = (symbolData) => {
        // Transform buy orders (bids) - sort descending by price
        const bids = Object.entries(symbolData.buy || {})
            .map(([price, size]) => ({
                price: parseFloat(price),
                size: parseInt(size) || 0
            }))
            .filter(item => item.size > 0) // Filter out zero quantities
            .sort((a, b) => b.price - a.price) // Sort bids descending by price
            .slice(0, 15); // Limit to top 15 levels for performance

        // Transform sell orders (asks) - sort ascending by price  
        const asks = Object.entries(symbolData.sell || {})
            .map(([price, size]) => ({
                price: parseFloat(price),
                size: parseInt(size) || 0
            }))
            .filter(item => item.size > 0) // Filter out zero quantities
            .sort((a, b) => a.price - b.price) // Sort asks ascending by price
            .slice(0, 15); // Limit to top 15 levels for performance

        return { bids, asks };
    };

    // SockJS/STOMP connection logic
    const connectWebSocket = () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8082';
            const sockJsUrl = `${backendUrl}/ws/careEcho`;
            
            // Create SockJS connection
            const socket = new SockJS(sockJsUrl);
            const stompClient = Stomp.over(socket);
            
            // Disable debug logging in production
            if (process.env.NODE_ENV === 'production') {
                stompClient.debug = null;
            }

            stompClient.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                setConnectionStatus('Connected');
                setError(null);
                wsRef.current = stompClient;
                
                // Subscribe to the orders topic
                stompClient.subscribe('/topic/orders', (message) => {
                    try {
                        const orderData = JSON.parse(message.body);
                        console.log('Received order data:', orderData);
                        
                        // Process the OrderData(List<SymbolData2> data) structure
                        if (orderData && orderData.data && Array.isArray(orderData.data)) {
                            const newOrderBooks = {};
                            
                            orderData.data.forEach(symbolData => {
                                if (symbolData.symbol) {
                                    // Handle both string and enum symbol types
                                    const symbolName = typeof symbolData.symbol === 'string' 
                                        ? symbolData.symbol 
                                        : symbolData.symbol.toString();
                                    
                                    const transformedData = transformOrderBookData(symbolData);
                                    
                                    // Only update if we have meaningful data
                                    if (transformedData.bids.length > 0 || transformedData.asks.length > 0) {
                                        newOrderBooks[symbolName] = transformedData;
                                    }
                                }
                            });
                            
                            // Only update state if we have new data
                            if (Object.keys(newOrderBooks).length > 0) {
                                setOrderBooks(prevOrderBooks => ({
                                    ...prevOrderBooks,
                                    ...newOrderBooks
                                }));
                            }
                        }
                    } catch (err) {
                        console.error('Error parsing STOMP message:', err);
                        setError('Error parsing data from server');
                    }
                });
            }, (error) => {
                console.error('STOMP connection error:', error);
                setConnectionStatus('Error');
                setError('Failed to connect to server');
                
                // Attempt to reconnect after 3 seconds
                reconnectTimeoutRef.current = setTimeout(() => {
                    console.log('Attempting to reconnect...');
                    connectWebSocket();
                }, 3000);
            });

            
            // Handle disconnection
            socket.onclose = () => {
                console.log('SockJS connection closed');
                setConnectionStatus('Disconnected');
            };

        } catch (err) {
            console.error('Failed to create WebSocket connection:', err);
            setError('Failed to connect to server');
            setConnectionStatus('Error');
        }
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current && wsRef.current.connected) {
                wsRef.current.disconnect();
            }
        };
    }, []);

    // Manual reconnect function
    const handleReconnect = () => {
        if (wsRef.current && wsRef.current.connected) {
            wsRef.current.disconnect();
        }
        connectWebSocket();
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
                        <p className="text-white/70 mb-3 pb-4">
                            This section displays the real-time order book for {mainSymbol}, showing live bids and asks from your backend service.
                        </p>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                View All Exchanges
                            </button>
                            <button className="bg-green-500/70 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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