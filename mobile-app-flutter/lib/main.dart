import 'package:boilerplate_app/pages/home.dart';
import 'package:boilerplate_app/state/example_state/example_state.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void main() {
  GetIt.I.registerSingleton<ExampleState>(
      ExampleState(const ExampleStateData(myString: 'test', myNumber: 0)));

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Boilerplate App',
      initialRoute: HomePage.routePath,
      routes: {
        HomePage.routePath: (context) => HomePage(),
      },
    );
  }
}
