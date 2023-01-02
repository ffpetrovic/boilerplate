import 'package:boilerplate_app/hooks/use_example_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:mix/mix.dart' as Mix;
import 'example_widget_styles.dart';

class ExampleWidget extends HookWidget {
  ExampleWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final exampleState = useExampleState();

    return Mix.Box(
      mix: Mix.Mix(
        Mix.padding(10),
      ),
      child: Column(
        children: [
          Mix.Box(
            mix: boxStyle,
            child: Mix.Pressable(
              mix: buttonStyle,
              child: Mix.TextMix(
                  "Increment local state: ${exampleState.state.value.myNumber.toString()}"
              ),
              onPressed: () {
                exampleState.increment();
              },
            ),
          ),
          Mix.Box(
            mix: boxStyle,
            child: Mix.Pressable(
              mix: buttonStyle,
              child: Mix.TextMix("Fetch remote data: ${exampleState.state.value.user?.firstName}"),
              onPressed: () {
                exampleState.getUser();
              },
            ),
          )
        ],
      ),
    );
  }
}
