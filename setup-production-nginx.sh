#!/bin/bash
set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "===================================================================="
echo " 🚀 Configuración NGINX y SSL para Arquitectura de Computadores II"
echo " Dominio: https://arq2-cassal-labs.duckdns.org"
echo " Proxy hacia Docker: 127.0.0.1:4174"
echo "===================================================================="

# 1. Asegurar que el contenedor Docker esté arriba
echo "--> [1/5] Verificando contenedor Docker en puerto 4174..."
cd "$APP_DIR"
docker compose up -d
sleep 2

if curl -sI http://127.0.0.1:4174/ | grep -q "200 OK"; then
    echo "    ✔ Contenedor respondiendo correctamente en http://127.0.0.1:4174"
else
    echo "    ✖ Error: El contenedor no responde en http://127.0.0.1:4174"
    exit 1
fi

# 2. Instalar configuración en sites-available
echo "--> [2/5] Copiando configuración a /etc/nginx/sites-available/arq2-cassal-labs..."
sudo cp "$APP_DIR/nginx-arq2-cassal-labs.conf" /etc/nginx/sites-available/arq2-cassal-labs

# 3. Habilitar el sitio en sites-enabled
echo "--> [3/5] Habilitando sitio en /etc/nginx/sites-enabled/..."
sudo ln -sf /etc/nginx/sites-available/arq2-cassal-labs /etc/nginx/sites-enabled/

# 4. Probar sintaxis de NGINX y recargar
echo "--> [4/5] Probando sintaxis de Nginx..."
sudo nginx -t
sudo systemctl reload nginx
echo "    ✔ Nginx recargado exitosamente."

# 5. Obtener certificado SSL Let's Encrypt con Certbot
echo "--> [5/5] Obteniendo certificado SSL Let's Encrypt con Certbot..."
sudo certbot --nginx -d arq2-cassal-labs.duckdns.org --non-interactive --agree-tos --email eliascassal@uajms.edu.bo --redirect || {
    echo "Aviso: Certbot no pudo completar automáticamente. Puede ejecutar manualmente:"
    echo "sudo certbot --nginx -d arq2-cassal-labs.duckdns.org"
}

sudo systemctl reload nginx

echo "===================================================================="
echo " ✅ ¡Despliegue en producción completado!"
echo " Acceso seguro: https://arq2-cassal-labs.duckdns.org"
echo "===================================================================="
