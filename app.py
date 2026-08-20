"""
Vercel WSGI Entrypoint.
Serves the Vite React + TypeScript + Highcharts Dashboard (dist/) and report assets.
"""

import mimetypes
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"


def app(environ, start_response):
    path_info = environ.get("PATH_INFO", "/")
    
    if path_info in ("", "/"):
        file_path = (DIST_DIR / "index.html") if DIST_DIR.exists() else (BASE_DIR / "index.html")
    elif path_info.startswith("/reports"):
        file_path = BASE_DIR / path_info.lstrip("/")
    else:
        target = DIST_DIR / path_info.lstrip("/")
        file_path = target if target.exists() else (BASE_DIR / path_info.lstrip("/"))

    if not file_path.exists() or file_path.is_dir():
        file_path = (DIST_DIR / "index.html") if DIST_DIR.exists() else (BASE_DIR / "index.html")

    content_type, _ = mimetypes.guess_type(str(file_path))
    if not content_type:
        content_type = "text/html" if file_path.suffix == ".html" else "application/octet-stream"

    try:
        data = file_path.read_bytes()
        status = "200 OK"
    except Exception:
        data = b"File not found"
        status = "404 Not Found"
        content_type = "text/plain"

    response_headers = [
        ("Content-Type", content_type),
        ("Content-Length", str(len(data))),
    ]
    start_response(status, response_headers)
    return [data]


handler = app
