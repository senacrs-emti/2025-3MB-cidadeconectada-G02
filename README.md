# 🗺️ InkluiMap — Mapa Colaborativo de Acessibilidade Urbana

O **InkluiMap** é um **Progressive Web App (PWA)** que promove a **inclusão e acessibilidade urbana**, permitindo que **pessoas com deficiência, apoiadores e cidadãos** avaliem e compartilhem informações sobre a **acessibilidade de locais públicos e privados**.

O projeto é **colaborativo, responsivo e acessível (WCAG)**, com foco em **simplicidade, contraste e inclusão digital**.

---

## 🎯 Objetivo

Facilitar a vida das pessoas com deficiência física e mobilidade reduzida, ajudando-as a **encontrar lugares acessíveis** e **contribuir com avaliações** reais sobre rampas, banheiros adaptados, elevadores, vagas e outras estruturas de acessibilidade.

---

## 🌐 Demonstração

🧩 **Nome do app:** InkluiMap  
📱 **Tipo:** Progressive Web App (PWA)  
💡 **Front-end:** HTML, CSS, JavaScript  
⚙️ **Back-end:** PHP + MySQL  
🗺️ **Mapa:** Google Maps API 

---

## 📋 Funcionalidades

### 🧭 Mapa Interativo
- Exibe **locais acessíveis** como marcadores no mapa.
- Mostra **detalhes do local** ao clicar (nome, categoria, notas, fotos, comentários).
- Permite **filtrar locais por categoria** (lazer, saúde, transporte, educação).

### ➕ Adicionar Local
- Formulário para **cadastrar um novo local** com:
  - Nome do local
  - Categoria
  - Notas de acessibilidade (rampas, banheiros, elevadores, vagas)
  - Comentário curto
  - Upload de até 3 fotos
  - Captura de **latitude e longitude** diretamente no mapa

### 👤 Perfil do Usuário
- Mostra **nome e e-mail** do usuário.
- Lista **locais cadastrados por ele**.
- Permite **editar** ou **excluir** locais adicionados.

### 🔐 Sistema de Login Simples
- Login básico com sessão em PHP.
- Cadastro opcional (ou anônimo, se configurado).

### 📱 Recursos PWA
- Manifest (`manifest.json`)
- Service Worker para **uso offline**
- Instalação no dispositivo (Android, iOS, Desktop)

---

## 🧰 Tecnologias Utilizadas

| Categoria | Tecnologia |
|------------|-------------|
| Front-end | HTML5, CSS3, JavaScript (PWA) |
| Back-end | PHP 8.x |
| Banco de Dados | MySQL |
| Mapa | Google Maps API *(ou Leaflet.js)* |
| Acessibilidade | WCAG 2.1, ARIA, alto contraste |
| Outras | Manifest.json, Service Worker, JSON |

---
