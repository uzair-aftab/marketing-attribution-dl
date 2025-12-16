# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

<!-- Add new changes here before creating a release -->

## [1.0.0] - 2025-12-16

### Added

- **Deep Learning Attribution Pipeline**
  - LSTM model for sequence-based conversion prediction
  - Attention mechanism for interpretable attribution weights
  - Multi-touch attribution scoring based on learned patterns

- **Rule-Based Baseline Models**
  - Last-Touch attribution (MMP standard)
  - First-Touch attribution
  - Linear attribution
  - Time-Decay attribution

- **7 Jupyter Notebooks**
  - `01_data_exploration.ipynb` - Criteo dataset exploration
  - `02_data_preprocessing.ipynb` - User journey sequence creation
  - `03_rule_based_models.ipynb` - Baseline attribution methods
  - `04_lstm_attribution.ipynb` - LSTM model training
  - `05_attention_model.ipynb` - Attention-based attribution
  - `06_cac_comparison.ipynb` - CAC shift analysis across models
  - `07_export_for_web.ipynb` - Dashboard data export

- **Interactive Web Dashboard**
  - Attribution model comparison visualization
  - CAC shift analysis charts
  - Budget reallocation recommendations

- **Criteo Attribution Dataset Integration**
  - 16M+ impressions from 30 days of live traffic
  - Real production conversion data
