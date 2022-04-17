include .env

ifeq ($(filter $(APP_ENVIRONMENT), development production),)
$(error Invalid APP_ENVIRONMENT variable. Values accepteds: development or production.)
endif

DOCKER_COMPOSE_FILE=docker-compose.$(APP_ENVIRONMENT).yml

ifeq (production,$(APP_ENVIRONMENT))
  ifeq ($(wildcard $(DOCKER_COMPOSE_FILE)),)
    $(error $(DOCKER_COMPOSE_FILE) file not found.)
  endif
endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Colors definitions                                                          │
# └─────────────────────────────────────────────────────────────────────────────┘
CR=\033[0;31m
CG=\033[0;32m
CY=\033[0;33m
CB=\033[0;36m
RC=\033[0m

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ API container commands                                                      │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: bash
bash:
  ifeq (production,$(APP_ENVIRONMENT))
	  docker exec -it app sh
  endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Infra commands                                                              │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: up
up:
  ifeq (production,$(APP_ENVIRONMENT))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
  endif
  ifeq (development,$(APP_ENVIRONMENT))
	  yarn dev
  endif

.PHONY: down
down:
  ifeq (production,$(APP_ENVIRONMENT))
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
  endif

.PHONY: build
build:
  ifeq (production,$(APP_ENVIRONMENT))
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
  endif
  ifeq (development,$(APP_ENVIRONMENT))
	  yarn install
  endif

.PHONY: restart
restart: down up

.PHONY: app-logs
app-logs:
  ifeq (production,$(APP_ENVIRONMENT))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) logs
  endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Help                                                                        │
# └─────────────────────────────────────────────────────────────────────────────┘
help:
	@echo ""
	@echo "${CY}Usage:${RC}"
	@echo "   make ${CG}<command>${RC}"
	@echo ""
	@echo "${CY}Infra commands:${RC}"
	@echo "${CG}   build               ${RC}Build all containers"
	@echo "${CG}   restart             ${RC}Restart all containers"
	@echo "${CG}   up                  ${RC}Start all containers"
	@echo "${CG}   down                ${RC}Stop all containers"
	@echo "${CG}   app-logs            ${RC}List app container logs"
	@echo ""
	@echo "${CY}APP commands:${RC}"
	@echo "${CG}   bash                ${RC}Open a bash terminal inside the APP container"
	@echo ""
