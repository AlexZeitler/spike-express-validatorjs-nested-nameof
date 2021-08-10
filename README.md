# Type-safe nested validation with `express-validator` and `ts-simple-nameof`

`express-validator` is a powerful validation and sanitation library.

However, it relies on strings property names for the validation to work.

This is not type and refactoring safe, hence error prone.

By using `express-validator` together with `ts-simple-nameof`, this issue can be solved.

`ts-simpe-nameof` allows you to print
