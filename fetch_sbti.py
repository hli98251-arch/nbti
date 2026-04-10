import urllib.request
import re

url = 'https://sbti.unun.dev/'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    css_links = re.findall(r'href="([^"]+\.css)"', html)
    print("Found CSS:", css_links)
    
    for link in css_links:
        css_url = url + link.lstrip('/') if link.startswith('/') else url + link
        css_req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
        css = urllib.request.urlopen(css_req).read().decode('utf-8')
        print(f"--- CSS Preview {link} ---")
        print(css[:1000])
        color_vars = re.findall(r'--[a-zA-Z0-9-]+:\s*#[a-fA-F0-9]+', css)
        print("Colors extracted:")
        for c in color_vars[:20]:
            print(c)
except Exception as e:
    print("Error:", e)
