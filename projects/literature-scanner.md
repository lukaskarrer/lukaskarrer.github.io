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
Python, GitHub Actions, OpenAI GPT-3.5-Turbo (API), SMTP / Mail-API


## Ergebnis & Proof
- Automatisierter Workflow 
- Beispiel-Ausgabe
 
![Github-Overview](/assets/images/screenshot_github.PNG)

![Code-Snippet](/assets/images/screenshot_code.PNG)

![E-Mail-Beispiel](/assets/images/screenshot_email.PNG)



[← Zurück zur Startseite](/)
