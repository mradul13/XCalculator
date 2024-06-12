const operate = (operand1, operand2, operator)=>{
    switch(operator){
        case '+':
            return operand1+operand2;
        case '-':
            return operand1-operand2;
        case '*':
            return operand1*operand2;
        case '/':
            return operand1/operand2;
        default:
            return '';
    }
}

const tokenize = (expression)=>{
    let tokens = [];
    let currNumber = ''
    for(let i=0; i<expression.length; i++){
        if(expression[i]==='*' || expression[i]==='+' || expression[i]==='/' || expression[i]==='-'){
            tokens.push(parseInt(currNumber));
            currNumber = '';
            tokens.push(expression[i]);
        }
        else{
            currNumber = currNumber+expression[i];
        }
    }
    tokens.push(parseInt(currNumber));
    return tokens;
}

export const evaluateExpression = (expression)=>{
    if(expression===''){
        return 'Error'
    }
    let tokens = tokenize(expression);
    for(let i=0; i<tokens.length; i++){
        if(tokens[i]==='*' || tokens[i]==='/'){
            if(tokens[i]==='/'){
                if(tokens[i+1]===0 && tokens[i-1]===0){
                    return 'NaN';
                }
                if(tokens[i+1]===0){
                    return "Infinity"
                }
            }
            const result = operate(tokens[i-1], tokens[i+1], tokens[i]);
            tokens.splice(i-1, 3, result);
            i--;
        }
    }
    for(let i=0; i<tokens.length; i++){
        if(tokens[i]==='+' || tokens[i]==='-'){
            const result = operate(tokens[i-1], tokens[i+1], tokens[i]);
            tokens.splice(i-1, 3, result);
            i--;
        }
    }
    return tokens[0]
}

