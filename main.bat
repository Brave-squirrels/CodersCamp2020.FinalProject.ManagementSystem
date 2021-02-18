ECHO ON

REM clear interface
docker-compose -f docker/docker-compose.yml down --volumes

REM backend
docker-compose -f docker/docker-compose.yml build "backend"
docker-compose -f docker/docker-compose.yml up -d "backend

REM follow
docker-compose -f docker/docker-compose.yml logs --follow --tail 50 "backend"
