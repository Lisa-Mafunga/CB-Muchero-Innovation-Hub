<?php
// Simple PHP router for Vite SPA - serves dist/index.html with correct headers
// This bypasses .htaccess and ensures proper MIME types on servers with limited Apache support

$requested_file = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requested_file = ltrim($requested_file, '/');

// Asset files (.js, .css, etc.)
$dist_path = __DIR__ . '/dist/' . $requested_file;

if ($requested_file && file_exists($dist_path) && is_file($dist_path)) {
    // Serve the asset with correct MIME type
    $ext = pathinfo($dist_path, PATHINFO_EXTENSION);
    
    switch ($ext) {
        case 'js':
        case 'mjs':
            header('Content-Type: application/javascript; charset=utf-8');
            break;
        case 'css':
            header('Content-Type: text/css; charset=utf-8');
            break;
        case 'json':
            header('Content-Type: application/json; charset=utf-8');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'gif':
            header('Content-Type: image/gif');
            break;
        case 'webp':
            header('Content-Type: image/webp');
            break;
        case 'avif':
            header('Content-Type: image/avif');
            break;
        case 'ico':
            header('Content-Type: image/x-icon');
            break;
        case 'woff':
            header('Content-Type: font/woff');
            break;
        case 'woff2':
            header('Content-Type: font/woff2');
            break;
        case 'ttf':
            header('Content-Type: font/ttf');
            break;
        case 'eot':
            header('Content-Type: application/vnd.ms-fontobject');
            break;
        default:
            header('Content-Type: application/octet-stream');
    }
    
    // Allow browser caching for assets
    $file_age = time() - filemtime($dist_path);
    if ($file_age > 86400) { // if older than 1 day
        header('Cache-Control: public, max-age=31536000'); // 1 year
    } else {
        header('Cache-Control: public, max-age=3600'); // 1 hour
    }
    
    readfile($dist_path);
    exit;
}

// Fallback: serve index.html for SPA routing
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/dist/index.html');
?>
