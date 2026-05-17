<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=13&duration=2000&pause=1000&color=1D9E75&center=true&vCenter=true&width=500&lines=●+LIVE+ON+REPLIT+—+491f162e...pike.replit.dev" alt="Live status" />

<br/>

<sup>amriiiita07-ui / Urban-Pulse</sup>

# 🏙️ Urban Pulse

### A real-time analytics dashboard that reads a city's vital signs
### Traffic · Air Quality · Noise · Energy · Mobility

> *"Cities generate data every second. Urban Pulse is the instrument that reads the heartbeat."*

<br/>

[![Live Demo](https://img.shields.io/badge/▶%20Live%20Demo-Open%20App-1D9E75?style=for-the-badge)](https://491f162e-4f29-47db-95cf-455a287496c1-00-o98pxtwpipi9.pike.replit.dev/login)
[![Replit](https://img.shields.io/badge/Built%20on-Replit-F26207?style=for-the-badge&logo=replit&logoColor=white)](https://replit.com)
[![GitHub](https://img.shields.io/badge/Repo-amriiiita07--ui-181717?style=for-the-badge&logo=github)](https://github.com/amriiiita07-ui/Urban-Pulse)
[![Status](https://img.shields.io/badge/Status-Active-1D9E75?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-7F77DD?style=for-the-badge)]()

<br/>

| 🏙️ Smart City Market | 🌐 IoT Devices Live | 🏘️ Urban Pop. by 2050 | 📊 City Leaders Using IoT |
|:---:|:---:|:---:|:---:|
| **$170.67B** in 2025 | **27 Billion** connected | **66%** of all humanity | **60%** reshaping ops daily |
| → $451B by 2034 · CAGR 11.4% | 17.9% CAGR (2022–2027) | UN World Urbanization Report | HiveMQ Smart City Survey 2025 |

<br/>

![Traffic](https://img.shields.io/badge/🚦_Traffic-Congestion-378ADD?style=flat-square)
![AQI](https://img.shields.io/badge/💨_Air-Quality_Index-1D9E75?style=flat-square)
![Noise](https://img.shields.io/badge/🔊_Noise-Pollution-7F77DD?style=flat-square)
![Energy](https://img.shields.io/badge/⚡_Energy-Load_Map-EF9F27?style=flat-square)
![Mobility](https://img.shields.io/badge/🚶_Citizen-Mobility-D4537E?style=flat-square)

<br/>

</div>

---

## What Is Urban Pulse?

Urban Pulse is a full-stack web analytics dashboard designed to monitor, visualize, and interpret the real-time vital signs of a city. Think of it as a control room interface for urban environments, where traffic density, air quality index, noise levels, energy consumption patterns, and citizen mobility data converge into a single, actionable view.

The project was built in response to one of the most underappreciated challenges in modern urban planning: **cities produce enormous volumes of data, but most of it goes unread**. According to a 2025 survey of 650 smart city experts, over 60% of urban leaders say real-time IoT data has fundamentally reshaped how their cities operate daily. Yet the tooling to make that data readable by non-specialists barely exists at the local government level.

Urban Pulse closes that gap.

---

## The Problem This Solves

| Urban Challenge | Scale of the Problem |
|---|---|
| Traffic congestion in major cities | Costs the average commuter 54 hours per year (INRIX, 2024) |
| Air pollution in urban zones | Reduces life expectancy by up to 22 months (WHO, 2018) |
| Urban noise levels in dense cities | Average 80-110 dB in prime areas, twice WHO's safe threshold of 60 dB |
| Unmonitored infrastructure | 80%+ of urban areas exceed acceptable air pollution limits without tracking |
| Data silos across city departments | Most cities have no unified view across traffic, AQ, energy, and noise |

Urban Pulse does not just visualize this data. It puts it in a format that city planners, data analysts, researchers, and citizens can actually use.

---

## Live Demo

**Try the dashboard right now, no installation required:**

```
https://491f162e-4f29-47db-95cf-455a287496c1-00-o98pxtwpipi9.pike.replit.dev/login
```

The application is deployed and running on Replit's cloud infrastructure with full backend connectivity and live data rendering.

---

## Feature Breakdown

### Real-Time Monitoring Panel
- Live city metrics updated on a rolling basis across all tracked parameters
- Configurable alert thresholds for AQI, noise (dB), traffic density, and energy load
- Color-coded status indicators aligned with WHO and EPA standard bands

### Traffic Intelligence Module
- Congestion heatmaps segmented by zone and time window
- Peak-hour detection with automatic flagging of high-load corridors
- Vehicle flow rate tracking (vehicles/hour per monitored junction)
- Congestion classification: Low / Medium / High (inspired by KMeans-based labeling approaches validated in academic literature, see CityPulse 2025)

### Air Quality Index (AQI) Tracker
- Pollutant tracking: PM2.5, PM10, NO2, SO2, CO, O3
- Real-time AQI band classification: Good / Moderate / Unhealthy / Hazardous
- Historical trend charts across user-defined date ranges
- Zone-level pollution comparison across city districts

### Noise Pollution Layer
- Decibel readings mapped to city zones
- Day vs. night noise pattern comparison
- WHO safety threshold overlay (55 dB day / 45 dB night for residential areas)

### Energy Consumption Analytics
- Load distribution by time of day and district
- Peak vs. off-peak usage delta
- Renewable vs. conventional energy source mix (if applicable to connected data)

### Citizen Mobility Insights
- Foot traffic density by zone and hour
- Public transport utilization proxy metrics
- Anomaly flags for unusual activity spikes

### Dashboard Controls
- Secure login with session management
- Zone filter and time-range selector
- Exportable report snapshots
- Mobile-responsive layout

---

## Data Infrastructure and Sources

Urban Pulse draws from, is validated against, and is conceptually aligned with the following publicly documented datasets:

| Dataset | Source | Records / Size | Use Case |
|---|---|---|---|
| Smart City Traffic Patterns | [Kaggle](https://www.kaggle.com/datasets/utathya/smart-city-traffic-patterns) | Multi-zone, time-series | Traffic congestion modeling |
| Smart Mobility Traffic Dataset | [Kaggle](https://www.kaggle.com/datasets/ziya07/smart-mobility-traffic-dataset) | Tabular, multi-feature | Vehicle flow rate benchmarks |
| Urban Traffic Flow Dataset | [Kaggle](https://www.kaggle.com/datasets/ziya07/urban-traffic-flow-dataset) | Hourly granularity | Peak-hour detection baseline |
| Smart Cities Index Dataset | [Kaggle](https://www.kaggle.com/datasets/magdamonteiro/smart-cities-index-datasets) | 100+ city metrics | Cross-city AQI and mobility benchmarking |
| Futuristic Smart City Citizen Activity | [Kaggle](https://www.kaggle.com/datasets/atharvasoundankar/futuristic-smart-city-citizen-activity-dataset) | Citizen behavior simulation | Mobility pattern validation |
| Smart Traffic Management Dataset | [Kaggle](https://www.kaggle.com/datasets/smmmmmmmmmmmm/smart-traffic-management-dataset) | Multi-metric | Signal timing and congestion classification |

**Reference Architecture Context:**

The pipeline and classification logic in Urban Pulse draws inspiration from validated research implementations including the CityPulse system (2025), which processes 11 million synthetic traffic records through Kafka-Spark streaming pipelines and applies KMeans clustering to classify congestion into Low, Medium, and High bands. Urban Pulse uses the same categorical framework in its traffic intelligence layer.

---

## Why These Numbers Matter

The smart city sector is not a niche research area. It is one of the fastest-growing segments in global infrastructure:

- The global smart city ICT infrastructure market is valued at **USD 170.67 billion** in 2025, projected to reach **USD 451.68 billion by 2034** (CAGR: 11.42%)
- **27 billion IoT devices** are connected worldwide as of 2025
- Smart-city IoT cellular connections are growing at **17.9% CAGR** (2022-2027), expected to exceed **122 million connections**
- IoT leads the smart city technology stack with a **35% share**, with AI/ML growing fastest at **17.50% CAGR**
- **60% of urban leaders** say real-time IoT data has reshaped daily city operations (HiveMQ Smart City Survey, 2025)
- Boston's sensor-driven public space redesign increased usage of public areas by **28%**
- New York's predictive water infrastructure maintenance **prevented 75 major leaks** in a single year
- Portland's IoT street lighting cut energy costs by **35%**
- The UN projects **66% of the global population will live in cities by 2050**

Urban Pulse exists at the intersection of all of these trends. It is a dashboard for the world cities are becoming.

---

## Tech Stack

```
Frontend        HTML5 / CSS3 / JavaScript
Backend         Python (Flask / FastAPI)
Database        SQLite / PostgreSQL
Hosting         Replit Cloud
Data Layer      REST APIs, simulated IoT data feeds
Visualization   Chart.js / D3.js / custom SVG components
Auth            Session-based login with secure routing
```

---

## Project Structure

```
Urban-Pulse/
│
├── static/
│   ├── css/
│   │   └── style.css              # Global styles, dark theme tokens
│   ├── js/
│   │   ├── dashboard.js           # Main chart rendering and live updates
│   │   ├── traffic.js             # Traffic congestion logic
│   │   └── aqi.js                 # Air quality index calculations
│   └── assets/
│       └── icons/                 # UI icons and map markers
│
├── templates/
│   ├── login.html                 # Secure login screen
│   ├── dashboard.html             # Main analytics view
│   ├── traffic.html               # Traffic module page
│   ├── airquality.html            # AQI tracking page
│   └── reports.html               # Export and history view
│
├── app.py                         # Entry point, route definitions
├── models.py                      # Database models
├── data_feeds.py                  # Simulated sensor data generators
├── analytics.py                   # Core metric computation logic
├── requirements.txt               # Python dependencies
└── README.md
```

---

## Running Locally

**Step 1: Clone the repository**

```bash
git clone https://github.com/amriiiita07-ui/Urban-Pulse.git
cd Urban-Pulse
```

**Step 2: Set up a virtual environment**

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

**Step 3: Install dependencies**

```bash
pip install -r requirements.txt
```

**Step 4: Run the application**

```bash
python app.py
```

**Step 5: Open in browser**

```
http://localhost:5000/login
```

Or skip all of this and use the [live demo](https://491f162e-4f29-47db-95cf-455a287496c1-00-o98pxtwpipi9.pike.replit.dev/login).

---

## Running on Replit

1. Fork the repository or import it directly via Replit's GitHub import
2. Replit auto-detects the Python environment and installs dependencies from `requirements.txt`
3. Press **Run** and the app starts at the `.replit.dev` URL

No manual configuration needed. The project is Replit-native.

---

## Key Analytical Concepts Behind the Dashboard

**AQI Calculation**

The Air Quality Index displayed in Urban Pulse follows the US EPA's standard breakpoints:

| AQI Range | Category | PM2.5 (µg/m³) |
|---|---|---|
| 0-50 | Good | 0.0-12.0 |
| 51-100 | Moderate | 12.1-35.4 |
| 101-150 | Unhealthy for Sensitive Groups | 35.5-55.4 |
| 151-200 | Unhealthy | 55.5-150.4 |
| 201-300 | Very Unhealthy | 150.5-250.4 |
| 301-500 | Hazardous | 250.5+ |

**Noise Classification**

Noise levels are classified per WHO Environmental Noise Guidelines (2018):

| Zone Type | Daytime Limit | Nighttime Limit |
|---|---|---|
| Residential | 55 dB | 45 dB |
| Commercial | 65 dB | 55 dB |
| Industrial | 75 dB | 65 dB |

Any reading exceeding these thresholds triggers an alert flag in the dashboard.

**Traffic Congestion Bands**

| Band | Vehicle Density (per km) | Average Speed |
|---|---|---|
| Low | 0-30 | >50 km/h |
| Medium | 31-60 | 25-50 km/h |
| High | 61+ | <25 km/h |

---

## Datasets and References Used in Development

- Kaggle: [Smart City Traffic Patterns](https://www.kaggle.com/datasets/utathya/smart-city-traffic-patterns)
- Kaggle: [Urban Traffic Flow Dataset](https://www.kaggle.com/datasets/ziya07/urban-traffic-flow-dataset)
- Kaggle: [Smart Mobility Traffic Dataset](https://www.kaggle.com/datasets/ziya07/smart-mobility-traffic-dataset)
- Kaggle: [Smart Cities Index Datasets](https://www.kaggle.com/datasets/magdamonteiro/smart-cities-index-datasets)
- Kaggle: [Futuristic Smart City Citizen Activity Dataset](https://www.kaggle.com/datasets/atharvasoundankar/futuristic-smart-city-citizen-activity-dataset)
- Kaggle: [Smart Traffic Management Dataset](https://www.kaggle.com/datasets/smmmmmmmmmmmm/smart-traffic-management-dataset)
- WHO Environmental Noise Guidelines for the European Region, 2018
- US EPA Air Quality Index (AQI) Technical Assistance Document, 2024
- CityPulse: Real-Time Traffic Data Analytics and Congestion Prediction, arXiv 2506.01971 (2025)
- HiveMQ Smart City Survey: IoT in American Cities, 2025
- Trafair Traffic Dashboard, ScienceDirect, 2021
- UN Department of Economic and Social Affairs: World Urbanization Prospects, 2023
- Smart City Statistics 2026, Bayelsa Watch / Bayelsawatch.com

---

## Real-World Validation

Urban Pulse is not built in isolation. Its design decisions mirror approaches that have proven effective in production smart city deployments:

The London City Dashboard, launched in 2012 by the Bartlett Centre for Advanced Spatial Analysis at University College London, features live information on weather, air quality, train status, and surface transit congestion. It was described as capturing the "pulse" of London, which is the exact metaphor this project builds on.

The Trafair Traffic Dashboard, developed across six European cities, demonstrated that combining traffic sensor data with air quality modeling produces significantly better city management outcomes than either dataset alone.

Chicago's Array of Things IoT project deployed modular sensor boxes across the city to collect real-time environmental data including climate, air quality, and noise, feeding it into public dashboards. Urban Pulse is a software-native interpretation of the same concept.

---

## Limitations and Honest Caveats

- The current deployment uses simulated sensor data. Integration with live city APIs (OpenAQ, HERE Traffic, TomTom, OpenWeatherMap) is a planned enhancement.
- The system is designed for single-city monitoring. Multi-city comparative mode is on the roadmap.
- The database layer is lightweight by design. At production scale (tens of thousands of sensor events per minute), a migration to TimescaleDB or Apache Kafka is recommended.
- No real-time push notifications yet. Alert thresholds are checked on page load and refresh cycles.

These are not failures. They are the honest boundaries of a v1 that was designed and shipped.

---

## Roadmap

- [ ] OpenAQ API integration for live AQI data
- [ ] TomTom or HERE Traffic API for real vehicle flow data
- [ ] PostgreSQL migration with TimescaleDB extension for time-series efficiency
- [ ] Role-based access control (admin / analyst / viewer)
- [ ] Exportable PDF reports per zone
- [ ] WebSocket-based live feed for zero-refresh updates
- [ ] Multi-city comparison mode
- [ ] Mobile app (React Native or Flutter)
- [ ] ML-based anomaly detection on traffic and AQI feeds

---

## Contributing

Pull requests are welcome and encouraged. If you want to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with a clear message
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request with a description of what you changed and why

For bug reports or feature requests, open an issue with the relevant label.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this code with attribution.

---

<div align="center">

**Built by [Amrita](https://github.com/amriiiita07-ui) with attention to what cities actually need.**

*Urban Pulse is not just a dashboard. It is a statement that data about where people live should be readable, accessible, and actionable.*

<br/>

[![GitHub stars](https://img.shields.io/github/stars/amriiiita07-ui/Urban-Pulse?style=social)](https://github.com/amriiiita07-ui/Urban-Pulse)
[![GitHub forks](https://img.shields.io/github/forks/amriiiita07-ui/Urban-Pulse?style=social)](https://github.com/amriiiita07-ui/Urban-Pulse)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7B2FBE,100:00D9FF&height=80&section=footer" width="100%"/>

</div>
