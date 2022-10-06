import 'package:flutter/material.dart';
import 'package:mix/mix.dart';

final boxStyle = Mix(
  padding(20),
  marginY(10),
  rounded(10),
  textStyle($button),
  textColor($onPrimary),
  border(
    width: 2,
    style: BorderStyle.solid,
    color: Colors.black12,
  ),
  align(Alignment.center),
);

final buttonStyle = Mix(
  textColor(Colors.black),
  bgColor(Colors.black12),
  padding(10),
  rounded(10),
  align(Alignment.center),
  fontSize(16),
  press(
    bgColor(Colors.black26),
  ),
);
