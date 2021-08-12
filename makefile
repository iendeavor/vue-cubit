lint:
	yarn prettier --write .

test:
	yarn jest --coverage ./packages

test-all:
	yarn jest --coverage
