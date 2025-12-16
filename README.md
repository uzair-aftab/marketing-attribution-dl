# Marketing Attribution with Deep Learning

**Demonstrating how deep learning outperforms rule-based MMP attribution (Adjust, AppsFlyer)**

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.6+-ee4c2c.svg)](https://pytorch.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Problem Statement

Mobile Measurement Partners (MMPs) like **Adjust, AppsFlyer, and Branch** use simple **Last-Touch attribution** - giving 100% credit to the final touchpoint before conversion. This approach:

- ❌ Ignores upper-funnel channels that drive awareness
- ❌ Overcredits "closer" channels like branded search
- ❌ Leads to misallocated marketing budgets
- ❌ Results in incorrect CAC (Customer Acquisition Cost) calculations

## 💡 Solution

This project demonstrates how **deep learning attribution** provides more accurate and fair credit distribution:

- ✅ LSTM + Attention models learn from real conversion patterns
- ✅ Attention weights = interpretable attribution scores
- ✅ Shows true channel contribution to conversions
- ✅ Reveals how **CAC shifts** under different attribution models

## 📊 Dataset

**Criteo Attribution Modeling Dataset** (real production data)

| Property | Value |
|----------|-------|
| Source | [Criteo AI Lab](https://ailab.criteo.com/) |
| Size | 653 MB (16M+ impressions) |
| Period | 30 days of live traffic |
| Features | User ID, Campaign, Conversion, Click, Cost, Timestamps |

## 🚀 Key Results

| Metric | Last-Touch | Deep Learning | Impact |
|--------|------------|---------------|--------|
| Conversion AUC | ~0.70 | ~0.85 | **+21%** |
| Attribution | Single touchpoint | Multi-touch | **Fair credit** |
| CAC Accuracy | Biased | Data-driven | **Better budget** |

## 📁 Project Structure

```
marketing-attribution-dl/
├── notebooks/
│   ├── 01_data_exploration.ipynb     # Explore Criteo data
│   ├── 02_data_preprocessing.ipynb   # Create user journeys
│   ├── 03_rule_based_models.ipynb    # Last-Touch, Linear, etc.
│   ├── 04_lstm_attribution.ipynb     # LSTM model
│   ├── 05_attention_model.ipynb      # Attention-based model
│   ├── 06_cac_comparison.ipynb       # CAC shift analysis ⭐
│   └── 07_export_for_web.ipynb       # Export for dashboard
├── webapp/                           # Interactive demo
├── data/raw/criteo/                  # Criteo dataset
└── results/                          # Figures and metrics
```

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/uzair-aftab/marketing-attribution-dl.git
cd marketing-attribution-dl

# Create environment
conda create -n attribution-dl python=3.10
conda activate attribution-dl

# Install dependencies
pip install -r requirements.txt

# For GPU support (CUDA 12.4)
pip install torch --index-url https://download.pytorch.org/whl/cu124

# Download Criteo dataset (already included if you cloned)
# Or download from: https://go.criteois.com/criteo-research-attribution-dataset.zip
```

## 🏃 Usage

Run notebooks in order:

```bash
jupyter lab
# Open notebooks 01-07 sequentially
```

## 🖥️ Hardware

Developed on:
- **GPU**: NVIDIA RTX 4070 Laptop (8GB)
- **CPU**: Intel i9-13900HX
- **RAM**: 32GB

## 📈 Key Insight: CAC Shift

The most important business insight is how **Customer Acquisition Cost changes** under different attribution:

```
Campaign A:  Last-Touch CAC: $42  →  DL CAC: $28  (-33% undervalued!)
Campaign B:  Last-Touch CAC: $18  →  DL CAC: $31  (+72% overvalued!)
```

This shows which channels are being **overcredited** (should reduce spend) vs **undercredited** (should increase spend).

## 📚 References

- [DNAMTA: Deep Neural Attribution for Marketing](https://arxiv.org/abs/1902.04748)
- [Criteo Attribution Dataset](https://ailab.criteo.com/criteo-attribution-modeling-bidding-dataset/)
- [Multi-Touch Attribution: A Data-Driven Approach](https://research.google/pubs/pub45352/)

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- Criteo AI Lab for the attribution dataset
- PyTorch team for the deep learning framework
