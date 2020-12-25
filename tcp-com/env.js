const fs = require('fs') 
const envfile = require('envfile')
const sourcePath = '.env'
console.log(envfile.parse(sourcePath))
let parsedFile = envfile.parse(sourcePath);
parsedFile.NEW_VAR = 'newVariableValue'

