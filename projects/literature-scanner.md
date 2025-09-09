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
- Automatisierter Workflow (siehe Repo)
- Beispiel-Ausgabe (Beispiel-CSV / HTML-Summary)


[→ GitHub-Repo mit Skripten](https://github.com/USERNAME/literature-scanner)


[← Zurück zur Startseite](/)
