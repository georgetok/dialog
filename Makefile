DOCKER_RUNNER ?= node10
DOCKER_BUILDER ?= node10

makelib.inc:
	@curl https://bitbucket.transmit.im/projects/DVPS/repos/public/raw/makelib.inc?at=refs%2Fheads%2Fmaster -Lo makelib.inc
include makelib.inc

.PHONY: test docker-build all clean build docker-clean docker-run

all: build docker-build


build:
	$(call run-in-docker, \
	npm config set //$(NPM_SOURCE_REGISTRY)/:_authToken $(NPM_SOURCE_REGISTRY_TOKEN); \
	npm i; \
	npm run build \
	)

run:
	$(call run-in-docker, \
	npm config set //$(NPM_SOURCE_REGISTRY)/:_authToken $(NPM_SOURCE_REGISTRY_TOKEN); \
	npm start,, \
	-p 3000:3000 \
	)
