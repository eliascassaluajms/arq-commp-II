#!/bin/bash
set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "================================================="
echo " Desplegando Arquitectura de Computadores II PWA"
echo " Dominio: https://arq2-cassal-labs.duckdns.org"
echo "================================================="

cd "$APP_DIR"

echo "--> [1/3] Compilando y levantando contenedor Docker en puerto 4174..."
docker compose up -d --build

echo "--> [2/3] Verificando respuesta interna en puerto 4174..."
sleep 2
curl -sI http://127.0.0.1:4174/ | head -n 5

echo "--> [3/3] Limpieza de capas de imagen huerfanas..."
docker image prune -f

echo "================================================="
echo " ✅ Sitio actualizado en produccion con exito:"
echo " https://arq2-cassal-labs.duckdns.org"
echo "================================================="
