"""
Vercel WSGI Entrypoint.
Serves the static React + Highcharts Dashboard and report assets.
"""

import mimetypes
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


def app(environ, start_response):
    path_info = environ.get("PATH_INFO", "/")
    
    if path_info in ("", "/"):
        file_path = BASE_DIR / "index.html"
    elif path_info.startswith("/dashboard"):
        rel_path = path_info.replace("/dashboard", "").lstrip("/")
        file_path = BASE_DIR / "dashboard" / (rel_path or "index.html")
    elif path_info.startswith("/reports"):
        file_path = BASE_DIR / path_info.lstrip("/")
    elif path_info.startswith("/assets"):
        file_path = BASE_DIR / path_info.lstrip("/")
    else:
        file_path = BASE_DIR / path_info.lstrip("/")

    if not file_path.exists() or file_path.is_dir():
        file_path = BASE_DIR / "index.html"

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
