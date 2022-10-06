import 'package:boilerplate_app/client/client.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';
import 'package:openapi/openapi.dart';

part 'example_state.freezed.dart';

class ExampleState {
  ExampleState(ExampleStateData state) : super() {
    this.state = ValueNotifier(state);
  }

  late final ValueNotifier<ExampleStateData> state;

  void increment() {
    state.value = state.value.copyWith(myNumber: state.value.myNumber + 1);
  }

  void getUser() async {
    state.value = state.value.copyWith(user: (await usersClient.userControllerGetLatestUser()).data);
  }
}

@freezed
class ExampleStateData with _$ExampleStateData {
  const factory ExampleStateData({
    required String myString,
    required num myNumber,
    User? user,
  }) = _ExampleStateData;
}
