param(
    [Parameter(Mandatory = $true)]
    [string]$Url,

    [string]$SearchConsoleCode = "",

    [string]$GoogleBusinessUrl = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cleanUrl = $Url.TrimEnd("/")

$targets = @(
    "index.html",
    "eventos.html",
    "cotizador.html",
    "reservas.html",
    "contacto.html",
    "sitemap.xml",
    "robots.txt",
    "assets\js\core\data.js"
)

foreach ($rel in $targets) {
    $path = Join-Path $root $rel
    if (-not (Test-Path $path)) { continue }
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    $updated = $content -replace "https://TU-USUARIO\.github\.io/eventos-ruiz", $cleanUrl

    if ($SearchConsoleCode -and $rel -eq "index.html") {
        $updated = $updated -replace 'name="google-site-verification"\s+content="[^"]*"', ('name="google-site-verification"' + "`n            content=`"" + $SearchConsoleCode + "`"")
    }
    if ($GoogleBusinessUrl) {
        $updated = $updated -replace '"hasMap":\s*"[^"]*"', ('"hasMap": "' + $GoogleBusinessUrl + '"')
        if ($rel -eq "assets\js\core\data.js") {
            $updated = $updated -replace 'customLink:\s*"[^"]*"', ('customLink: "' + $GoogleBusinessUrl + '"')
        }
    }

    if ($updated -ne $content) {
        [System.IO.File]::WriteAllText($path, $updated, [System.Text.UTF8Encoding]::new($false))
        Write-Host "[ACTUALIZADO] $rel" -ForegroundColor Green
    }
}

Write-Host "`nConfiguración aplicada para: $cleanUrl" -ForegroundColor Cyan
if ($SearchConsoleCode) { Write-Host "Código de Search Console insertado en index.html." -ForegroundColor Cyan }
if ($GoogleBusinessUrl) { Write-Host "Enlace de Google Business Profile vinculado." -ForegroundColor Cyan }
