#requires -Version 5.1
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$sourceLogo = Join-Path $PSScriptRoot 'src\assets\brand\logo.svg'
if (-not (Test-Path -LiteralPath $sourceLogo)) { throw 'Canonical outlined logo is missing. Extract M2 ZIP to the project root first.' }

$fontFolder = Join-Path $PSScriptRoot 'public\assets\fonts'
$regular = Join-Path $fontFolder 'Teko-Regular-latin.woff2'
$semi = Join-Path $fontFolder 'Teko-SemiBold-latin.woff2'
if (-not (Test-Path $regular) -or -not (Test-Path $semi)) {
    $ttfRegular = Join-Path $fontFolder 'Teko-Regular.ttf'
    $ttfSemi = Join-Path $fontFolder 'Teko-SemiBold.ttf'
    if ((Test-Path $ttfRegular) -and (Test-Path $ttfSemi)) {
        Write-Host 'Generating WOFF2 subsets from the local Teko TTF files...'
        py .\prepare_webfonts.py --fonts $fontFolder --output $fontFolder
        if ($LASTEXITCODE -ne 0) { throw 'Font subset generation failed. See README_M2.md (fonttools and brotli).' }
    }
}
if (-not (Test-Path $regular) -or -not (Test-Path $semi)) {
    throw 'WOFF2 fonts missing. Place your original TTFs in public\assets\fonts and run: py .\prepare_webfonts.py'
}

# Do not destroy the supplied source font files: relocate them outside public/.
$sourceBackup = Join-Path $PSScriptRoot '.local-font-sources'
foreach ($name in @('Teko-Regular.ttf', 'Teko-SemiBold.ttf')) {
    $source = Join-Path $fontFolder $name
    if (Test-Path -LiteralPath $source) {
        New-Item -ItemType Directory -Path $sourceBackup -Force | Out-Null
        Move-Item -LiteralPath $source -Destination (Join-Path $sourceBackup $name) -Force
    }
}

# M2 consolidates all wordmark references into src/assets/brand/logo.svg.
$obsolete = @(
    'public\assets\brand\logo.svg',
    'public\assets\brand\logo-display.svg',
    'public\assets\brand\liugel-studio.svg',
    'public\assets\js\brand-logo.js'
)
foreach ($relative in $obsolete) {
    $old = Join-Path $PSScriptRoot $relative
    if (Test-Path -LiteralPath $old) { Remove-Item -LiteralPath $old -Force }
}

npm run build
if ($LASTEXITCODE -ne 0) { throw 'Astro build failed. Do not push to GitHub until resolved.' }
Write-Host 'M2: local Astro build passed. Check git status and review changes before committing.'
