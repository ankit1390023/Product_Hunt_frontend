<template>
    <div class="dashboard-container p-6">
        <div class="dashboard-header mb-8">
            <h1 class="text-4xl font-bold text-gray-800">Product Hunt Analytics</h1>
            <p class="text-gray-600 mt-2">Track your product's performance and user engagement in real-time</p>
        </div>

        <!-- Stats Overview Cards -->
        <div class="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-content">
                    <h3 class="stat-title">Total Users</h3>
                    <p class="stat-value">12,458</p>
                    <p class="stat-change positive">+12.5% from last week</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-content">
                    <h3 class="stat-title">Upvotes</h3>
                    <p class="stat-value">8,234</p>
                    <p class="stat-change positive">+8.3% from last week</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💬</div>
                <div class="stat-content">
                    <h3 class="stat-title">Comments</h3>
                    <p class="stat-value">1,234</p>
                    <p class="stat-change positive">+15.2% from last week</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📈</div>
                <div class="stat-content">
                    <h3 class="stat-title">Conversion Rate</h3>
                    <p class="stat-value">24.5%</p>
                    <p class="stat-change positive">+3.2% from last week</p>
                </div>
            </div>
        </div>
        
        <!-- Chart Rows with Alternating Layout -->
        <div class="chart-rows space-y-8">
            <!-- Row 1: Weekly Upvotes Trend -->
            <div class="chart-row flex flex-col md:flex-row gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="upvotesChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Weekly Upvotes Trend</h2>
                        <p class="text-gray-600 mb-4">Track your product's popularity over time with our comprehensive upvotes analysis. This chart shows the daily upvotes trend, helping you identify patterns and peak engagement periods.</p>
                        <div class="stats-highlight bg-indigo-50 p-4 rounded-lg">
                            <p class="text-indigo-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    Peak engagement on Wednesdays
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    15% increase in weekend engagement
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2: User Engagement -->
            <div class="chart-row flex flex-col md:flex-row-reverse gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="engagementChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">User Engagement</h2>
                        <p class="text-gray-600 mb-4">Analyze how users interact with your product through various engagement metrics. Compare comments, views, upvotes, and shares to understand user behavior patterns.</p>
                        <div class="stats-highlight bg-green-50 p-4 rounded-lg">
                            <p class="text-green-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    High view-to-upvote conversion rate
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Growing social sharing activity
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 3: User Demographics -->
            <div class="chart-row flex flex-col md:flex-row gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="demographicsChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">User Demographics</h2>
                        <p class="text-gray-600 mb-4">Understand your user base distribution across different age groups. This helps in tailoring your product features and marketing strategies to your core audience.</p>
                        <div class="stats-highlight bg-yellow-50 p-4 rounded-lg">
                            <p class="text-yellow-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    Strong presence in 25-34 age group
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    Growing adoption in younger demographics
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 4: Traffic Sources -->
            <div class="chart-row flex flex-col md:flex-row-reverse gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="trafficChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Traffic Sources</h2>
                        <p class="text-gray-600 mb-4">Discover where your users are coming from. This breakdown helps optimize your marketing efforts and understand which channels are most effective.</p>
                        <div class="stats-highlight bg-red-50 p-4 rounded-lg">
                            <p class="text-red-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    Strong direct traffic indicates brand recognition
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    Growing social media presence
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 5: Product Status -->
            <div class="chart-row flex flex-col md:flex-row gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="statusChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Product Status</h2>
                        <p class="text-gray-600 mb-4">Monitor the current state of your product features and track their development progress. This helps in resource allocation and feature prioritization.</p>
                        <div class="stats-highlight bg-blue-50 p-4 rounded-lg">
                            <p class="text-blue-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    High percentage of active features
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Efficient review process
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 6: Competitor Analysis -->
            <div class="chart-row flex flex-col md:flex-row-reverse gap-6 items-center">
                <div class="chart-container md:w-1/2">
                    <div class="chart-card">
                        <canvas ref="competitorChart"></canvas>
                    </div>
                </div>
                <div class="content-container md:w-1/2">
                    <div class="content-card">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Competitor Analysis</h2>
                        <p class="text-gray-600 mb-4">Compare your product's performance against competitors across key metrics. This helps identify strengths and areas for improvement.</p>
                        <div class="stats-highlight bg-purple-50 p-4 rounded-lg">
                            <p class="text-purple-700 font-medium">Key Insights:</p>
                            <ul class="mt-2 space-y-2">
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Leading in UI/UX and Security
                                </li>
                                <li class="flex items-center text-sm text-gray-600">
                                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    Competitive pricing strategy
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const upvotesChart = ref(null)
const engagementChart = ref(null)
const trafficChart = ref(null)
const statusChart = ref(null)
const competitorChart = ref(null)
const demographicsChart = ref(null)

onMounted(() => {
    // Weekly Upvotes Trend (Line Chart)
    new Chart(upvotesChart.value, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Upvotes',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    })

    // User Engagement (Bar Chart)
    new Chart(engagementChart.value, {
        type: 'bar',
        data: {
            labels: ['Comments', 'Views', 'Upvotes', 'Shares'],
            datasets: [{
                label: 'Engagement Metrics',
                data: [300, 1200, 800, 450],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    })

    // User Demographics (Pie Chart)
    new Chart(demographicsChart.value, {
        type: 'pie',
        data: {
            labels: ['18-24', '25-34', '35-44', '45+'],
            datasets: [{
                data: [30, 45, 15, 10],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    })

    // Top Traffic Sources (Pie Chart)
    new Chart(trafficChart.value, {
        type: 'pie',
        data: {
            labels: ['Direct', 'Social', 'Referral', 'Organic'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    })

    // Product Status (Doughnut Chart)
    new Chart(statusChart.value, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'In Review', 'Pending', 'Archived'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    })

    // Competitor Metrics (Radar Chart)
    new Chart(competitorChart.value, {
        type: 'radar',
        data: {
            labels: ['Features', 'UI/UX', 'Performance', 'Support', 'Pricing', 'Security'],
            datasets: [{
                label: 'Our Product',
                data: [85, 90, 80, 75, 85, 95],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgb(99, 102, 241)',
                pointBackgroundColor: 'rgb(99, 102, 241)'
            }, {
                label: 'Competitor',
                data: [75, 85, 85, 80, 90, 85],
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgb(239, 68, 68)',
                pointBackgroundColor: 'rgb(239, 68, 68)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    })
})
</script>

<style scoped>
.dashboard-container {
    background-color: #f8fafc;
    min-height: 100vh;
}

.dashboard-header {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 1rem;
}

.stats-grid {
    margin-bottom: 2rem;
}

.stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
}

.stat-icon {
    font-size: 2rem;
    background: #f1f5f9;
    padding: 0.75rem;
    border-radius: 12px;
}

.stat-content {
    flex: 1;
}

.stat-title {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
}

.stat-value {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.25rem 0;
}

.stat-change {
    font-size: 0.875rem;
    font-weight: 500;
}

.stat-change.positive {
    color: #16a34a;
}

.stat-change.negative {
    color: #dc2626;
}

.chart-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    height: 100%;
}

.chart-card:hover {
    transform: translateY(-2px);
}

.content-card {
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.chart-row {
    margin-bottom: 2rem;
}

.stats-highlight {
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .chart-row {
        flex-direction: column;
    }
    
    .chart-container,
    .content-container {
        width: 100%;
    }
}
</style>