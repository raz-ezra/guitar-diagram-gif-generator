// @ts-nocheck
export function tokenizer(input) {
    let current = 0;
    let tokens = [];
  
    // We start by creating a `while` loop where we are setting up our `current`
    // variable to be incremented as much as we want `inside` the loop.
    //
    // We do this because we may want to increment `current` many times within a
    // single loop because our tokens can be any length.
    while (current < input.length) {
      // We're also going to store the `current` character in the `input`.
      let char = input[current];
  
      if (char === "|") {
        if (input[current + 1] === "|") {
          tokens.push({
            type: "double barline",
            value: "||",
          });
          current++;
        } else {
          tokens.push({
            type: "barline",
            value: "|",
          });
        }
  
        current++;
        continue;
      }
  
      // we're now going to check for whitespace. This is interesting
      // because we care that whitespace exists to separate characters, but it
      // isn't actually important for us to store as a token. We would only throw
      // it out later.
      //
      // So here we're just going to test for existence and if it does exist we're
      // going to just `continue` on.
      let WHITESPACE = /\s/;
      if (WHITESPACE.test(char)) {
        current++;
        continue;
      }
  
      if (char === ":") {
        // TODO - take care of this later
        current++;
        continue;
      }
  
      if (char === ".") {
        // Consider putting here the chord itself
        tokens.push({
          type: "dot",
          value: ".",
        });
      }
  
      let CHORD = /[a-zA-Z0-9#-+()]/i;
      if (CHORD.test(char)) {
        let value = "";
  
        // Again we're just going to loop through all the letters pushing them to
        // a value.
        while (CHORD.test(char)) {
          value += char;
          char = input[++current];
        }
  
        tokens.push({ type: "chord", value });
  
        continue;
      }
  
      // Finally if we have not matched a character by now, we're going to throw
      // an error and completely exit.
      throw new TypeError("I dont know what this character is: " + char);
    }
  
    // Then at the end of our `tokenizer` we simply return the tokens array.
    return tokens;
  }
  