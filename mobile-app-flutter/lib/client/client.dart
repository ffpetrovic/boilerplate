import 'package:dio/dio.dart';
import 'package:openapi/openapi.dart';

Dio createBaseInstance() {
  final dio = Dio(BaseOptions(
    // TODO: Environment variable for API base url
    baseUrl: 'http://localhost:3000',
  ));

  return dio;
}

final usersClient = UsersApi(createBaseInstance(), standardSerializers);
