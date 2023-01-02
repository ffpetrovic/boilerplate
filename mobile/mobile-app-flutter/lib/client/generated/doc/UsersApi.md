# openapi.api.UsersApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**userControllerCreateUser**](UsersApi.md#usercontrollercreateuser) | **POST** /users | 
[**userControllerGetLatestUser**](UsersApi.md#usercontrollergetlatestuser) | **GET** /users/latest | 


# **userControllerCreateUser**
> userControllerCreateUser()



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getUsersApi();

try {
    api.userControllerCreateUser();
} catch on DioError (e) {
    print('Exception when calling UsersApi->userControllerCreateUser: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetLatestUser**
> User userControllerGetLatestUser()



### Example
```dart
import 'package:openapi/api.dart';

final api = Openapi().getUsersApi();

try {
    final response = api.userControllerGetLatestUser();
    print(response);
} catch on DioError (e) {
    print('Exception when calling UsersApi->userControllerGetLatestUser: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

