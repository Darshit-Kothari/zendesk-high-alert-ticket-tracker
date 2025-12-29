# Real-Time Zendesk High Alert Ticket Tracker

🚨 **Browser Extension for Real-Time High Alert Visibility in Zendesk**

This project is a Chrome browser extension designed to provide **real-time tracking of High Alert (High Priority) tickets in Zendesk**. It displays the active High Alert ticket count directly on the browser toolbar, allowing SOC and support engineers to stay instantly aware of critical issues without repeatedly switching tabs.

---

## 📌 Project Overview

Support and SOC teams often rely on Zendesk dashboards to monitor critical tickets. Constantly switching tabs or refreshing views reduces efficiency and delays response times.

This extension solves that problem by:
- Automatically detecting active Zendesk Agent tabs
- Polling High Alert ticket counts in the background
- Displaying the count as a dynamic badge on the extension icon
- Providing instant visual awareness of urgent tickets

---

## 🏢 Experience Context

**Organization:** Barracuda Networks  
**Location:** Bangalore, Karnataka (Onsite)  
**Duration:** April 2025 – May 2025  
**Role Type:** Full Time  

Developed to improve operational visibility and responsiveness for support engineers handling critical alerts.

---

## ⚙️ Key Features

- 🔄 **Real-time background polling** (every 5–10 seconds)
- 🎯 **Automatic Zendesk tab detection**
- 🔔 **Dynamic badge updates** visible across all browser tabs
- ⚠️ **Alert indicator** when no Zendesk tab is detected
- 🌐 **Global badge state** (not limited to a single tab)
- 🧩 **Manifest V3 compatible**
- 🛠️ Easy installation via Chrome Developer Mode

---

## 🧠 How It Works

1. The background service worker scans for active Zendesk Agent tabs.
2. A script is injected to extract the **High Priority Ticket count** from the Zendesk DOM.
3. The count is parsed and displayed as a badge on the extension icon.
4. If no Zendesk tab is detected, the badge shows a warning indicator.

---

## 🗂️ Tech Stack

- JavaScript (ES6)
- Chrome Extension APIs (Manifest V3)
- DOM Parsing
- Background Service Workers
- Content Scripts

---

## 🚀 Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/zendesk-high-alert-ticket-tracker.git
