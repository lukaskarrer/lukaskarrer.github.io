---
layout: page
title: "KI-gestützter Literatur-Scanner"
permalink: /projects/literature-scanner/
---


## Ziel
Automatisierte tägliche Recherche und Relevanzbewertung wissenschaftlicher Artikel zu definierten Themen.


## Umsetzung
- Python-Skript, läuft als **GitHub Action** (täglicher Workflow)
- Scraping/Parsing von Open-Access-Plattformen, Filterlogik nach Metadaten
- Relevanzbewertung (Skala 0–10) via GPT-3.5-Turbo API
- Versand: täglich automatisch generierte E‑Mail-Zusammenfassung


## Technologien
Python, GitHub Actions, OpenAI GPT-3.5-Turbo (API), Mail-API


## Ergebnis & Proof
- Automatisierter Workflow 
- Beispiel-Ausgabe
<br><br>
![Github-Overview](/assets/images/screenshot_github.PNG)
<br><br>
![Code-Snippet](/assets/images/screenshot_code.PNG)
<br><br>
![E-Mail-Beispiel](/assets/images/screenshot_email.PNG)
<br><br>


[← Zurück zur Startseite](/)
