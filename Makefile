.PHONY: build
build:
	npm run build

.PHONY: docker/build
docker/build:
	@docker build -t devops-app .

ifndef PORT
PORT = 3000
endif
.PHONY: docker/run
docker/run:
	@docker run --rm -dit --name devops-app -e PORT=${PORT} -p ${PORT}:${PORT} devops-app
