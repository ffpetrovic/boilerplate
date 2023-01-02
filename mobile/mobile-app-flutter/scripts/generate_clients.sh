openapi-generator-cli generate -g dart-dio-next -i http://localhost:3000/swagger-ui-json -o generated
cd generated && fvm flutter pub run build_runner build