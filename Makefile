ifneq ("$(wildcard .env)","")
    include .env
endif

init:
	cp -n .env.sample .env
	npm install
up:
	@docker compose up -d --remove-orphans --build --force-recreate

down:
	@docker compose down --remove-orphans

exec:
	@docker compose exec -u root app sh

restart:
	make down && make up

apply-manifest:
	kubectl apply -f ./deployment/m1-deployment.yaml
	kubectl apply -f ./deployment/m2-deployment.yaml
	kubectl apply -f ./deployment/rabbitmq-deployment.yaml

apply-manifest-services:
	kubectl apply -f ./deployment/m1-service.yaml
	kubectl apply -f ./deployment/m2-service.yaml
	kubectl apply -f ./deployment/rabbitmq-service.yaml

deploy:
	make apply-manifest
	make apply-manifest-services
	kubectl get deployments

secrets:
	kubectl create secret docker-registry registry-secret \
      --docker-server=${REGISTRY_URL} \
      --docker-username=${REGISTRY_NAME} \
      --docker-password=${REGISTRY_PASSWORD}
