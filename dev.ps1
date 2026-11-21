# Eventos Ruiz — Servidor Local de Desarrollo (sin dependencias externas)
param(
    [int]$Port = 8080
)

Write-Host "Iniciando vista previa de Eventos Ruiz en http://localhost:$Port ..." -ForegroundColor Yellow
Start-Process "http://localhost:$Port"
python -m http.server $Port
