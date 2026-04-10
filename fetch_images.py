import urllib.request
import re
import os

url = 'https://sbti.unun.dev/'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # find images
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    print("Found images:", imgs)
    
    # also find any svg objects or backgrounds
    css_links = re.findall(r'href=["\']([^"\']+\.css)["\']', html)
    for link in css_links:
        css_url = url + link.lstrip('/') if link.startswith('/') else url + link
        css_req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
        css = urllib.request.urlopen(css_req).read().decode('utf-8')
        bgs = re.findall(r'url\([^)]+\)', css)
        print("CSS backgrounds:", bgs)
except Exception as e:
    print("Error:", e)
