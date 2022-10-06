import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for UsersApi
void main() {
  final instance = Openapi().getUsersApi();

  group(UsersApi, () {
    //Future userControllerCreateUser() async
    test('test userControllerCreateUser', () async {
      // TODO
    });

    //Future<User> userControllerGetLatestUser() async
    test('test userControllerGetLatestUser', () async {
      // TODO
    });

  });
}
