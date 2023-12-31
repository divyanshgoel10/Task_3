document.addEventListener("DOMContentLoaded", function () {
    // Proceeding with creating charts
    initializeCharts();
});

function initializeCharts() {

    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded or recognized. Check if the script tag for Chart.js is correctly included.');
        return;
    }

    // Dummy data for demonstration
    const companyMetricsData = {
        "Total Revenue": 1000000,
        "Total Jobs Avg": 150,
        "Tickets Created": 300,
        "Tickets Scheduled": 200,
        "Outstanding Amount": 50000,
        "Memberships Sold": 50,
        "Jobs Completed": 100,
        "Total Cancelled": 20
    };

    const revenueByLocationData = {
        labels: ['Everett','Seattle','Lynnwood','Bothell','Mukilteo','Edmonds'],
        datasets: [{
            data: [80000, 75000, 49000, 47500, 45900, 34500],
            backgroundColor: 'rgba(0, 128, 0, 0.7)',
            borderColor: 'rgba(0, 128, 0, 0)',
            borderWidth: 0,
        }]
    };

    const revenueByTypeData = {
        labels: ['Service Plumbing','Bid Work HVAC', 'Service HVAC', 'Bid Work Plumbing','HWT Replacement','Maintenance','Material Sale'],
        datasets: [{
            data: [142000,90000,59000,58500,22000,21000,1000],
            backgroundColor: 'rgba(0, 128, 0, 0.7)',
            borderColor: 'rgba(0, 128, 0, 0)',
            borderWidth: 0,
        }]
    };

    // Creating Company Metrics components
    createCompanyMetrics(companyMetricsData);

    // Creating bar charts
    createBarChart('revenueByLocationChart', revenueByLocationData, 'Revenue By Job Location (November 2019)');
    createBarChart('revenueByTypeChart', revenueByTypeData, 'Revenue By Job Type (November 2019)');
}

function createCompanyMetrics(data) {
    const companyMetricsContainer = document.querySelector('.company-metrics');

    for (const metric in data) {
        const formattedValue = formatNumberWithCommas(data[metric]);
        const metricBox = document.createElement('div');
        metricBox.classList.add('metric-box');
        const textColorClass = metric === 'Total Revenue' || metric === 'Outstanding Amount' ? '' : 'white-text';
        metricBox.innerHTML = `<div class="metric-title ${textColorClass}">${metric}</div><div class="metric-value${metric === 'Outstanding Amount' ? ' outstanding-amount' : ''} ${textColorClass}">${metric === 'Outstanding Amount' ? '$' : ''}${formattedValue}</div>`;
        companyMetricsContainer.appendChild(metricBox);
    }
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createBarChart(chartId, data, title) {
    const chartsContainer = document.querySelector('.charts-container');

    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = chartId;
    chartsContainer.appendChild(chartCanvas);

    const ctx = chartCanvas.getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',  // 'y' for horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    position: 'left',
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0 
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title,
                    position: 'bottom'
                },
                legend: {
                    display: false
                }
            }
        }
    });
}
