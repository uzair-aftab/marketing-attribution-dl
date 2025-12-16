/**
 * Marketing Attribution Intelligence
 * Main Application JavaScript
 */

// Sample data (will be replaced with actual data from JSON)
const sampleData = {
    metrics: {
        attention_auc: 0.84,
        baseline_auc: 0.68,
        improvement_pct: 23.5,
        precision: 0.72,
        recall: 0.68,
        f1: 0.70,
        total_reattributed: 18.5
    },
    attribution: {
        channels: ['Paid Search', 'Organic Search', 'Social Media', 'Email', 'Display Ads', 'Affiliate', 'Direct'],
        last_touch: [28.5, 18.2, 22.1, 8.5, 12.3, 6.2, 4.2],
        linear: [20.1, 19.5, 18.8, 14.2, 13.1, 8.5, 5.8],
        time_decay: [24.5, 17.8, 20.5, 12.1, 13.8, 7.2, 4.1],
        attention: [22.3, 21.5, 19.2, 15.8, 10.5, 6.8, 3.9],
        lstm: [21.8, 20.9, 19.8, 14.5, 11.2, 7.5, 4.3]
    },
    insights: {
        most_undervalued: 'Email',
        undervalued_amount: 7.3,
        most_overvalued: 'Paid Search',
        overvalued_amount: 6.2
    }
};

// Global state
let data = sampleData;
let chart = null;
let selectedModels = ['last_touch', 'attention'];

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadData();
    initChart();
    initModelSelector();
    initAnimations();
    updateHeroStats();
    updateInsights();
    updateComparisonTable();
});

// Theme handling
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update chart colors
        if (chart) {
            updateChartTheme();
        }
    });
}

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('assets/data/attribution_data.json');
        if (response.ok) {
            data = await response.json();
            updateHeroStats();
            updateInsights();
            updateComparisonTable();
            updateChart();
        }
    } catch (error) {
        console.log('Using sample data:', error);
    }
}

// Update hero section statistics
function updateHeroStats() {
    animateValue('aucValue', 0, data.metrics.attention_auc, 1500, (val) => val.toFixed(2));
    animateValue('improvementValue', 0, data.metrics.improvement_pct, 1500, (val) => `+${val.toFixed(1)}%`);
    animateValue('reattributedValue', 0, data.metrics.total_reattributed, 1500, (val) => `${val.toFixed(1)}%`);

    // Animate stat cards
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateValue(el, 0, target, 2000, (val) => Math.floor(val) + suffix);
    });
}

// Update insights section
function updateInsights() {
    document.getElementById('undervaluedChannel').textContent = data.insights.most_undervalued;
    document.getElementById('undervaluedAmount').textContent = `+${data.insights.undervalued_amount}%`;
    document.getElementById('overvaluedChannel').textContent = data.insights.most_overvalued;
    document.getElementById('overvaluedAmount').textContent = `-${data.insights.overvalued_amount}%`;
}

// Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('attributionChart').getContext('2d');

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.attribution.channels,
            datasets: getSelectedDatasets()
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12,
                            weight: 500
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: textColor,
                    bodyColor: textColor,
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        family: "'Inter', sans-serif",
                        size: 14,
                        weight: 600
                    },
                    bodyFont: {
                        family: "'Inter', sans-serif",
                        size: 13
                    },
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw.toFixed(1)}%`
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        callback: (value) => value + '%'
                    }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Get datasets for selected models
function getSelectedDatasets() {
    const modelConfig = {
        last_touch: {
            label: 'Last-Touch',
            data: data.attribution.last_touch,
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1
        },
        linear: {
            label: 'Linear',
            data: data.attribution.linear,
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1
        },
        time_decay: {
            label: 'Time-Decay',
            data: data.attribution.time_decay,
            backgroundColor: 'rgba(168, 85, 247, 0.8)',
            borderColor: 'rgba(168, 85, 247, 1)',
            borderWidth: 1
        },
        attention: {
            label: 'Attention (AI)',
            data: data.attribution.attention,
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2
        },
        lstm: {
            label: 'LSTM',
            data: data.attribution.lstm,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
        }
    };

    return selectedModels.map(model => modelConfig[model]);
}

// Initialize model selector buttons
function initModelSelector() {
    const buttons = document.querySelectorAll('.model-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const model = btn.dataset.model;

            if (selectedModels.includes(model)) {
                if (selectedModels.length > 1) {
                    selectedModels = selectedModels.filter(m => m !== model);
                    btn.classList.remove('active');
                }
            } else {
                selectedModels.push(model);
                btn.classList.add('active');
            }

            updateChart();
        });
    });
}

// Update chart with new data
function updateChart() {
    if (chart) {
        chart.data.datasets = getSelectedDatasets();
        chart.update('active');
    }
}

// Update chart theme
function updateChartTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    chart.options.plugins.legend.labels.color = textColor;
    chart.options.plugins.tooltip.backgroundColor = isDark ? '#1e293b' : '#ffffff';
    chart.options.plugins.tooltip.titleColor = textColor;
    chart.options.plugins.tooltip.bodyColor = textColor;
    chart.options.plugins.tooltip.borderColor = isDark ? '#334155' : '#e2e8f0';
    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.scales.y.grid.color = gridColor;

    chart.update();
}

// Update comparison table
function updateComparisonTable() {
    const tbody = document.getElementById('comparisonTableBody');
    tbody.innerHTML = '';

    data.attribution.channels.forEach((channel, i) => {
        const lastTouch = data.attribution.last_touch[i];
        const linear = data.attribution.linear[i];
        const timeDecay = data.attribution.time_decay[i];
        const attention = data.attribution.attention[i];
        const diff = attention - lastTouch;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${channel}</strong></td>
            <td>${lastTouch.toFixed(1)}%</td>
            <td>${linear.toFixed(1)}%</td>
            <td>${timeDecay.toFixed(1)}%</td>
            <td><strong>${attention.toFixed(1)}%</strong></td>
            <td class="${diff >= 0 ? 'diff-positive' : 'diff-negative'}">
                ${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Animate numeric values
function animateValue(element, start, end, duration, formatter) {
    const el = typeof element === 'string' ? document.getElementById(element) : element;
    if (!el) return;

    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        el.textContent = formatter ? formatter(current) : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Initialize scroll animations
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to sections
    document.querySelectorAll('.stat-card, .problem-card, .solution-card, .insight-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
