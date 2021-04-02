install: 
	install-deps
	npm link

install-deps:
	npm ci

lint:
	npx eslint .
	
test:
	npm run test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

.PHONY: test log