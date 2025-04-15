# Test-Temporal

Start - docker-compose -f my-temporal-stack.yaml up -d  
- Temporal Server
- Temporal UI
- Prometheus
- PostgreSQL


Start Temporal Worker - npx ts-node src\child-workflows\worker.ts


Start Temporal Client ( Trigger Temporal Workflow ) - npx ts-node src\child-workflows\start.ts
