let chartInstance = null; // Declare a variable to hold the chart instance

export const fetchDataAndRenderChart = async () => {
    try {
        const response = await fetch('/api/items/count/category');
        const data = await response.json();

        // Process the response to get labels and data
        const labels = data.map(item => item.item_category); // Extract categories
        const counts = data.map(item => item.category_count); // Extract counts

        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        // If a chart instance already exists, destroy it before creating a new one
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create a new chart instance
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, // Dynamic labels from the API
                datasets: [{
                    data: counts, // Dynamic data from the API
                    backgroundColor: [
                        'rgba(115, 164, 216, 1)',   // light blue
                        'rgba(255, 255, 255, 1)',   // white
                        'rgba(255, 255, 255, 1)',   // white
                        'rgba(242, 248, 178, 1)',   // light yellow
                        'rgba(242, 248, 178, 1)',   // light yellow
                        'rgba(240, 118, 118, 1)',   // light red
                        
                    ],
                    borderWidth: 1,
                }]
            },
            maintainAspectRatio: false,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 239, 193,0.1)' // Grid lines color for y-axis
                        },
                        ticks: {
                            color: '#222' // Tick labels color for y-axis
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display:true,
                        text: 'Items Missing Categories - Total Count',
                    }
                },
                barThickness: 50, // Adjust the width of the bars
                maxBarThickness: 100, // Max width of bars (useful for responsiveness)
                categoryPercentage: 0.8, // Controls the width relative to available space
                barPercentage: 0.9 // Controls the width of bars within the category
            }
        });
    } catch (error) {
        console.error('Error fetching data or rendering chart:', error);
    }
};

// Fetch data and render the chart
fetchDataAndRenderChart();
