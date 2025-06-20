// 'use client';
// import React, { useState } from 'react';
// import { Plus } from 'lucide-react';

// const ManualFeedEntry = ({ onSubmitFeed }) => {
//   const [feedData, setFeedData] = useState({
//     messageType: 'NEW_ORDER',
//     symbol: '',
//     side: 'BUY',
//     price: '',
//     quantity: '',
//     orderId: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       await onSubmitFeed(feedData);
//       setFeedData({
//         messageType: 'NEW_ORDER',
//         symbol: '',
//         side: 'BUY',
//         price: '',
//         quantity: '',
//         orderId: ''
//       });
//     } catch (error) {
//       console.error('Error submitting feed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid = feedData.symbol && feedData.price && feedData.quantity && feedData.orderId;

//   return (
//     <div className="bg-[#1b1d21] rounded-xl border border-border shadow-2xl backdrop-blur-sm">
//       {/* Header Section */}
//       <div className="border-b border-border bg-gradient-to-r from-surface to-accent2 rounded-t-xl p-6">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-primary/20 rounded-lg">
//             <Plus className="h-6 w-6 text-primary" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-white">Manual Feed Entry</h2>
//             <p className="text-sm text-gray-300">Submit trading orders directly to the feed</p>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="p-8">
//         <div className="space-y-6">
//           {/* Message Type & Symbol Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Message Type
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   value={feedData.messageType}
//                   onChange={(e) => setFeedData({ ...feedData, messageType: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1a1d21] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text text-gray-300 appearance-none cursor-pointer transition-all duration-200 hover:border-primary/50"
//                 >
//                   <option value="NEW_ORDER">NEW ORDER</option>
//                   <option value="MODIFY_ORDER">MODIFY ORDER</option>
//                   <option value="CANCEL_ORDER">CANCEL ORDER</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Symbol
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={feedData.symbol}
//                 onChange={(e) => setFeedData({ ...feedData, symbol: e.target.value.toUpperCase() })}
//                 onFocus={() => setFocusedField('symbol')}
//                 onBlur={() => setFocusedField(null)}
//                 placeholder="AAPL"
//                 className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-muted transition-all duration-200 hover:border-primary/50 ${focusedField === 'symbol' ? 'border-primary' : 'border-border'
//                   }`}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Side
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <div className="flex bg-surface border border-border rounded-lg p-1">
//                 <button
//                   type="button"
//                   onClick={() => setFeedData({ ...feedData, side: 'BUY' })}
//                   className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-[#326b21] ${feedData.side === 'BUY'
//                       ? 'bg-[#1b1] text-white shadow-lg'
//                       : 'text-muted hover:text-text hover:bg-accent'
//                     }`}
//                 >
//                   BUY
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFeedData({ ...feedData, side: 'SELL' })}
//                   className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-[#ea3322] hover:bg-[#a33424] ${feedData.side === 'SELL'
//                       ? 'bg-danger text-white shadow-lg'
//                       : 'text-muted hover:text-text hover:bg-accent'
//                     }`}
//                 >
//                   SELL
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Price
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted text-sm">$</span>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={feedData.price}
//                   onChange={(e) => setFeedData({ ...feedData, price: e.target.value })}
//                   onFocus={() => setFocusedField('price')}
//                   onBlur={() => setFocusedField(null)}
//                   placeholder="150.25"
//                   className={`w-full pl-8 pr-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-muted transition-all duration-200 hover:border-primary/50 ${focusedField === 'price' ? 'border-primary' : 'border-border'
//                     }`}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Quantity & Order ID Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Quantity
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={feedData.quantity}
//                 onChange={(e) => setFeedData({ ...feedData, quantity: e.target.value })}
//                 onFocus={() => setFocusedField('quantity')}
//                 onBlur={() => setFocusedField(null)}
//                 placeholder="100"
//                 className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-muted transition-all duration-200 hover:border-primary/50 ${focusedField === 'quantity' ? 'border-primary' : 'border-border'
//                   }`}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-text">
//                 Order ID
//                 <span className="text-primary ml-1">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={feedData.orderId}
//                 onChange={(e) => setFeedData({ ...feedData, orderId: e.target.value })}
//                 onFocus={() => setFocusedField('orderId')}
//                 onBlur={() => setFocusedField(null)}
//                 placeholder="ORD12345"
//                 className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-muted transition-all duration-200 hover:border-primary/50 ${focusedField === 'orderId' ? 'border-primary' : 'border-border'
//                   }`}
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4">
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting || !isFormValid}
//               className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform flex items-center justify-center space-x-3 ${isSubmitting || !isFormValid
//                   ? 'bg-gray-600 cursor-not-allowed opacity-50'
//                   : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
//                 }`}
//             >
//               <div className={`${isSubmitting ? 'animate-spin' : ''}`}>
//                 {isSubmitting ? (
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                 ) : (
//                   <Plus className="w-5 h-5" />
//                 )}
//               </div>
//               <span className="text-lg">
//                 {isSubmitting ? 'Submitting Feed...' : 'Submit Feed Message'}
//               </span>
//             </button>
//           </div>

//           {/* Form Status Indicator */}
//           {!isFormValid && (
//             <div className="flex items-center space-x-2 text-sm text-muted bg-accent/30 rounded-lg p-3">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Please fill in all required fields to submit</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManualFeedEntry;
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ManualFeedEntry = ({ onSubmitFeed }) => {
  const [feedData, setFeedData] = useState({
    symbol: 'AAPL',
    side: 'BUY',
    price: '',
    qty: '',
    orderType: 'Limit',
    orderValidity: 'Day'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const stompClient = useRef(null);

  // Essential fields for stock exchange order placement
  const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA'];
  const SIDES = ['BUY', 'SELL'];
  const ORDER_TYPES = ['Limit', 'Market', 'Stop', 'Stop Limit'];
  const ORDER_VALIDITY = ['Day', 'GTC', 'IOC', 'FOK'];

  // Generate random values for backend fields
  const generateRandomOrderData = () => {
    const exchanges = ['NYSE', 'NASDAQ'];
    const orderStatuses = ['New', 'Partially', 'Filled', 'Cancelled'];
    
    return {
      orderId: Math.floor(Math.random() * 1000000) + 100000, // Random 6-digit order ID
      filledQty: 0, // Always start with 0 filled quantity
      remainingQty: parseInt(feedData.qty) || 0,
      orderStatus: 'New', // Always start with 'New' status
      timeStamp: new Date(),
      exchange: exchanges[Math.floor(Math.random() * exchanges.length)]
    };
  };

  // Initialize WebSocket connection
  useEffect(() => {
    const connect = () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const sockJsUrl = `${backendUrl}/ws/careEcho`;
      
      const socket = new SockJS(sockJsUrl);
      stompClient.current = Stomp.over(socket);
      
      stompClient.current.connect(
        {},
        (frame) => {
          console.log('Connected: ' + frame);
          setConnectionStatus('connected');
          
          // Subscribe to order responses
          stompClient.current.subscribe('/topic/order', (message) => {
            const orderResponse = JSON.parse(message.body);
            console.log('Order response:', orderResponse);
          });
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          setConnectionStatus('error');
          // Try to reconnect after 5 seconds
          setTimeout(() => {
            setConnectionStatus('reconnecting');
            connect();
          }, 5000);
        }
      );
    };

    connect();

    // Cleanup on unmount
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (!stompClient.current || !stompClient.current.connected) {
      console.error('WebSocket not connected');
      alert('WebSocket connection not available. Please wait for connection.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate random data for backend fields
      const randomData = generateRandomOrderData();
      
      // Create complete order object
      const order = {
        orderId: randomData.orderId,
        symbol: feedData.symbol,
        side: feedData.side,
        price: parseFloat(feedData.price),
        qty: parseInt(feedData.qty),
        filledQty: randomData.filledQty,
        remainingQty: parseInt(feedData.qty), // Initially all quantity is remaining
        orderType: feedData.orderType,
        orderStatus: randomData.orderStatus,
        orderValidity: feedData.orderValidity,
        timeStamp: randomData.timeStamp,
        exchange: randomData.exchange
      };

      // Send order to backend via WebSocket
      stompClient.current.send('/app/order', {}, JSON.stringify(order));
      
      // Call the original onSubmitFeed if provided
      
      if (onSubmitFeed) {
        await onSubmitFeed(order);
      }

      // Show success message with generated order ID
      alert(`Order submitted successfully! Order ID: ${randomData.orderId}`);

      // Reset form
      setFeedData({
        symbol: 'AAPL',
        side: 'BUY',
        price: '',
        qty: '',
        orderType: 'Limit',
        orderValidity: 'Day'
      });

      console.log('Order sent successfully:', order);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = feedData.symbol && feedData.price && feedData.qty;

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'connecting': case 'reconnecting': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'reconnecting': return 'Reconnecting...';
      case 'error': return 'Connection Error';
      default: return 'Disconnected';
    }
  };

  return (
    <div className="bg-[#1b1d21] rounded-xl border border-gray-700 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Plus className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Place Order</h2>
              <p className="text-sm text-gray-300">Enter your trading order details</p>
            </div>
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
            <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {getConnectionStatusText()}
            </span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-8">
        <div className="space-y-6">
          {/* Symbol & Side Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Symbol
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  value={feedData.symbol}
                  onChange={(e) => setFeedData({ ...feedData, symbol: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400"
                >
                  {SYMBOLS.map(symbol => (
                    <option key={symbol} value={symbol}>{symbol}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Side
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="flex bg-gray-800 border border-gray-600 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setFeedData({ ...feedData, side: 'BUY' })}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${feedData.side === 'BUY'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setFeedData({ ...feedData, side: 'SELL' })}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${feedData.side === 'SELL'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  SELL
                </button>
              </div>
            </div>
          </div>

          {/* Order Type & Validity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Order Type
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  value={feedData.orderType}
                  onChange={(e) => setFeedData({ ...feedData, orderType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400"
                >
                  {ORDER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Time in Force
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  value={feedData.orderValidity}
                  onChange={(e) => setFeedData({ ...feedData, orderValidity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400"
                >
                  {ORDER_VALIDITY.map(validity => (
                    <option key={validity} value={validity}>
                      {validity === 'GTC' ? 'Good Till Cancelled' : 
                       validity === 'IOC' ? 'Immediate or Cancel' :
                       validity === 'FOK' ? 'Fill or Kill' : validity}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Quantity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Price
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={feedData.price}
                  onChange={(e) => setFeedData({ ...feedData, price: e.target.value })}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="150.25"
                  disabled={feedData.orderType === 'Market'}
                  className={`w-full pl-8 pr-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 hover:border-blue-400 ${
                    feedData.orderType === 'Market' ? 'opacity-50 cursor-not-allowed' : ''
                  } ${focusedField === 'price' ? 'border-blue-500' : 'border-gray-600'}`}
                  required={feedData.orderType !== 'Market'}
                />
              </div>
              {feedData.orderType === 'Market' && (
                <p className="text-xs text-gray-400">Price not required for market orders</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Quantity
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={feedData.qty}
                onChange={(e) => setFeedData({ ...feedData, qty: e.target.value })}
                onFocus={() => setFocusedField('qty')}
                onBlur={() => setFocusedField(null)}
                placeholder="100"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 hover:border-blue-400 ${focusedField === 'qty' ? 'border-blue-500' : 'border-gray-600'}`}
                required
              />
            </div>
          </div>

          {/* Order Preview */}
          {isFormValid && (
            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Order Preview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white ml-2 font-medium">{feedData.symbol}</span>
                </div>
                <div>
                  <span className="text-gray-400">Side:</span>
                  <span className={`ml-2 font-medium ${feedData.side === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {feedData.side}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2 font-medium">{feedData.orderType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Quantity:</span>
                  <span className="text-white ml-2 font-medium">{feedData.qty}</span>
                </div>
                {feedData.price && (
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white ml-2 font-medium">${feedData.price}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Time in Force:</span>
                  <span className="text-white ml-2 font-medium">{feedData.orderValidity}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid || connectionStatus !== 'connected'}
              className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform flex items-center justify-center space-x-3 ${
                isSubmitting || !isFormValid || connectionStatus !== 'connected'
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <div className={`${isSubmitting ? 'animate-spin' : ''}`}>
                {isSubmitting ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </div>
              <span className="text-lg">
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </span>
            </button>
          </div>

          {/* Form Status Indicator */}
          {(!isFormValid || connectionStatus !== 'connected') && (
            <div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-800/30 rounded-lg p-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {connectionStatus !== 'connected' 
                  ? 'WebSocket connection required to place orders'
                  : `Please fill in required fields: ${!feedData.symbol ? 'Symbol ' : ''}${(!feedData.price && feedData.orderType !== 'Market') ? 'Price ' : ''}${!feedData.qty ? 'Quantity' : ''}`
                }
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualFeedEntry;