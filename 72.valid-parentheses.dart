// https://www.codewars.com/kata/52774a314c2333f0a7000688/train/dart
bool validParentheses(String braces) {
  if (braces.isEmpty) return true;
  List<String> stack = [];
  List<String> chars = braces.split('');
  for (String char in chars) {
    if (char == '(') {
      stack.add(char);
      continue;
    }
    if (char == ')') {
      if (stack.length > 0 && stack.last == '(') {
        stack.removeLast();
        continue;
      }
      return false;
    }
  }
  if (stack.length > 0) return false;
  return true;
}

bool validParentheses_other(String parentheses) {
  try {
    new RegExp(parentheses);
  } catch (_) {
    return false;
  }
  return true;
}
