// @ts-nocheck
export function parser(tokens: any) {
    let current = 0;
  
    function walk() {
      let token = tokens[current];
  
      if (token.type === "chord") {
        current++;
  
        return {
          type: "chord",
          value: token.value,
        };
      }
  
      if (token.type === "double barline") {
        let node = {
          type: "Section",
          content: [],
        };
  
        token = tokens[++current];
  
        while (token.type !== "double barline") {
          node.content.push(walk());
          token = tokens[current];
        }
  
        // Finally we will increment `current` one last time to skip the closing barline
        current++;
  
        // And return the node.
        return node;
      }
  
      if (token.type === "barline") {
        token = tokens[++current];
  
        let node = {
          type: "bar",
          chords: [],
        };
  
        while (token.type !== "barline") {
          node.chords.push(walk());
          token = tokens[current];
        }
  
        // In case we're in the end, pass on the last barline
        if (!tokens[current + 1]) {
          ++current;
        }
  
        return node;
      }
  
      throw new TypeError(`Couldn'd recognize token type "${token.type}""`);
    }
  
    // Now, we're going to create our AST which will have a root which is a
    // `Chart` node.
    let ast = {
      type: "Chart",
      body: [],
    };
  
    while (current < tokens.length) {
      ast.body.push(walk());
    }
  
    // At the end of our parser we'll return the AST.
    return ast;
  }
  