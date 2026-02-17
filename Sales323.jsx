import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Sales = () => {
    const [predictionData, setPredictionData] = useState(null);

    // Mock Prediction Handler
    const handlePredict = () => {
        // In real app, call API here
        setPredictionData({
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [
                {
                    label: 'Predicted Sales Demand',
                    data: [45, 48, 52, 50, 55, 60, 58],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderDash: [5, 5],
                    tension: 0.3,
                }
            ],
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Entry Form */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
                <h2 className="text-xl font-bold mb-4">Record Daily Sales</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Select Product</label>
                        <select className="w-full p-2 border rounded">
                            <option>Running Shoes</option>
                            <option>Cotton T-Shirt</option>
                            <option>Smart Watch</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input type="date" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Quantity Sold</label>
                        <input type="number" className="w-full p-2 border rounded" placeholder="0" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Submit Sales Data
                    </button>
                    <div className="pt-4 border-t">
                        <p className="text-sm font-bold mb-2 text-gray-500">Bulk Upload CSV</p>
                        <input type="file" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                </form>
            </div>

            {/* AI Prediction Module */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">AI Demand Prediction</h2>
                    <button
                        onClick={handlePredict}
                        className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                        Run Forecast Model
                    </button>
                </div>

                {predictionData ? (
                    <div>
                        <div className="mb-4 bg-yellow-50 p-4 border-l-4 border-yellow-400">
                            <p className="text-sm text-yellow-700 font-bold">
                                Recommendation: Order 150 units of Running Shoes to prevent stock-out next week.
                            </p>
                        </div>
                        <Line data={predictionData} options={{ responsive: true }} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p className="mb-2">Select a product and run the model</p>
                        <div className="text-4xl animate-pulse">🤖</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sales; 