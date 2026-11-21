param(
    [switch]$Compress,
    [int]$MaxKB = 150,
    [int]$Quality = 82
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$imgDir = Join-Path $root "assets\IMG"

Write-Host "`n=== AUDITORIA SEO & PAGESPEED — EVENTOS RUIZ ===" -ForegroundColor Yellow

Write-Host "`n[1/3] Peso de imágenes en assets/IMG/ (límite recomendado móvil: $MaxKB KB)" -ForegroundColor Cyan
$heavy = @()
Get-ChildItem -Path $imgDir -File | Sort-Object Length -Descending | ForEach-Object {
    $kb = [math]::Round($_.Length / 1KB, 1)
    if ($kb -gt $MaxKB) {
        Write-Host ("  [PESADA] {0,-14} {1,7} KB  -> Recomendado comprimir" -f $_.Name, $kb) -ForegroundColor Red
        $heavy += $_
    } else {
        Write-Host ("  [OK]     {0,-14} {1,7} KB" -f $_.Name, $kb) -ForegroundColor Green
    }
}

if ($Compress -and $heavy.Count -gt 0) {
    Write-Host "`nComprimiendo $($heavy.Count) imagen(es) pesada(s) a calidad $Quality%..." -ForegroundColor Yellow
    Add-Type -AssemblyName System.Drawing
    $backupDir = Join-Path $root ".img-backup"
    if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

    foreach ($file in $heavy) {
        $backupPath = Join-Path $backupDir $file.Name
        if (-not (Test-Path $backupPath)) { Copy-Item $file.FullName $backupPath }

        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)

        $maxSide = 1200
        $w = $img.Width
        $h = $img.Height
        if ($w -gt $maxSide -or $h -gt $maxSide) {
            $scale = [math]::Min($maxSide / $w, $maxSide / $h)
            $w = [int][math]::Round($w * $scale)
            $h = [int][math]::Round($h * $scale)
        }

        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose()
        $img.Dispose()
        $ms.Dispose()

        $bmp.Save($file.FullName, $jpegCodec, $encParams)
        $bmp.Dispose()

        $newKb = [math]::Round((Get-Item $file.FullName).Length / 1KB, 1)
        Write-Host ("  [OPTIMIZADA] {0,-14} -> {1,6} KB (respaldo en .img-backup/)" -f $file.Name, $newKb) -ForegroundColor Green
    }
}

Write-Host "`n[2/3] Archivos clave para GitHub Pages y Google Search Console" -ForegroundColor Cyan
$requiredFiles = @("index.html", "eventos.html", "cotizador.html", "reservas.html", "contacto.html", "robots.txt", "sitemap.xml", "site.webmanifest")
foreach ($rf in $requiredFiles) {
    $exists = Test-Path (Join-Path $root $rf)
    $status = if ($exists) { "[OK]" } else { "[FALTA]" }
    $color = if ($exists) { "Green" } else { "Red" }
    Write-Host ("  {0,-8} {1}" -f $status, $rf) -ForegroundColor $color
}

$indexActual = (Get-ChildItem -Path $root -Filter "index.html").Name
if ($indexActual -cne "index.html") {
    Write-Host "  [ALERTA] Archivo raíz está como '$indexActual'. GitHub Pages exige 'index.html' en minúsculas." -ForegroundColor Red
} else {
    Write-Host "  [OK]     index.html en minúsculas listo para GitHub Pages" -ForegroundColor Green
}

Write-Host "`n[3/3] Títulos, Meta Descriptions, Open Graph y JSON-LD (Bolivia)" -ForegroundColor Cyan
$pages = @("index.html", "eventos.html", "cotizador.html", "reservas.html", "contacto.html")
foreach ($p in $pages) {
    $html = Get-Content -Path (Join-Path $root $p) -Raw -Encoding UTF8
    $title = if ($html -match "(?s)<title>(.*?)</title>") { ($matches[1] -replace "\s+", " ").Trim() } else { "" }
    $desc  = if ($html -match '(?s)name="description"\s+content="([^"]+)"') { ($matches[1] -replace "\s+", " ").Trim() } else { "" }
    $hasLd = $html -match 'application/ld\+json'
    $hasOg = $html -match 'property="og:title"'
    $tLen  = $title.Length
    $dLen  = $desc.Length

    Write-Host ("  {0,-15} | Title: {1,2} car. | Desc: {2,3} car. | OG: {3} | Schema: {4}" -f $p, $tLen, $dLen, $(if($hasOg){"SI"}else{"NO"}), $(if($hasLd){"SI"}else{"NO"})) -ForegroundColor White
}

$indexHtml = Get-Content -Path (Join-Path $root "index.html") -Raw -Encoding UTF8
if ($indexHtml -match "PEGA_AQUI_TU_CODIGO_DE_SEARCH_CONSOLE") {
    Write-Host "`n[PENDIENTE] Aún falta pegar tu código real de Google Search Console en index.html (o usa .\scripts\set-domain.ps1)." -ForegroundColor Yellow
}
if ($indexHtml -match "TU-USUARIO\.github\.io") {
    Write-Host "[PENDIENTE] Reemplaza la URL de GitHub Pages ejecutando: .\scripts\set-domain.ps1 -Url 'https://tu-usuario.github.io/tu-repo'" -ForegroundColor Yellow
}

Write-Host "`nAuditoría completada.`n" -ForegroundColor Green
