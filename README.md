# Chez Tomio

This repository contains the complete Chez Tomio website (cheztomio.com).

## Installation (Docker)

You can find the images in [Github Packages](https://github.com/orgs/Chez-Tomio/packages?repo_name=Chez-Tomio).

## resto-website

```yaml
version: '3.7'

services:
    mongo:
        image: mongo
        container_name: mongo
        restart: unless-stopped
        security_opt:
            - no-new-privileges:true
        networks:
            - proxy

    chez-tomio:
        depends_on:
            - mongo
        image: ghcr.io/chez-tomio/chez-tomio:main
        container_name: chez-tomio
        restart: unless-stopped
        security_opt:
            - no-new-privileges:true
        networks:
            - traefik-proxy
        environment:
            PORT: 5000

networks:
    proxy:
        external: true
```

## scanner

```yaml
version: '3.7'

services:
    chez-tomio-scanner:
        image: ghcr.io/chez-tomio/chez-tomio-scanner:main
        container_name: chez-tomio-scanner
        restart: unless-stopped
        security_opt:
            - no-new-privileges:true
        networks:
            - proxy

networks:
    proxy:
        external: true
```

See [docker-compose.yml](https://github.com/Chez-Tomio/Chez-Tomio/blob/main/docker-compose.yml) for example
