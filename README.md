# Weather Web App

A lightweight frontend weather application built with **HTML, CSS, and JavaScript**. Users enter a city name; the app calls the **OpenWeather** API to fetch and display current conditions in a prominent hero panel, plus upcoming time slots below. It also shows **contextual tips** (e.g., *"Rain expected at 3 PM — carry an umbrella"*, *"Heat alert at noon — stay hydrated"*).

> **Note:** This project is entirely frontend; no build tools required.

---

## ✨ Features

* **City search** with graceful error handling (invalid cities, network issues)
* **Current weather**: temperature, condition, icon, feels-like, humidity, wind
* **Hourly/next slots** preview in a responsive grid
* **Smart tips & warnings** based on temperature, precipitation, and wind
* **Clean, responsive UI** suitable for mobile and desktop
* **Zero backend** — deploy as static site

---

## 🧰 Tech Stack

* **HTML5** for structure
* **CSS3** (vanilla / utility classes) for styling and layout
* **JavaScript (ES6+)** for API calls and DOM updates
* **OpenWeather** API (Current + Forecast endpoints)

---

## 📸 Demo

![Watch the demo](https://github.com/user-attachments/assets/696cb098-b8eb-4c1c-a95e-c65d3b12d65d)


---

## 🖼️ UI Layout

* **Header/Search**: input + search button
* **Main Panel**: city name, temperature, condition icon, meta (feels like, humidity, wind)
* **Forecast Row/Grid**: upcoming time slots (3-hour intervals) with temp, icon, and a small **tip** pill

---

