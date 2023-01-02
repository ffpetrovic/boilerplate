import 'package:boilerplate_app/state/example_state/example_state.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';

ExampleState useExampleState() {
  final state = GetIt.I<ExampleState>();
  useValueListenable(state.state);

  return state;
}