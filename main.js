const readFile = require('fs').readFileSync;

let inputs = [];
const file = readFile('input.txt', 'utf-8').split('\n').forEach(data=> {
    inputs.push(data.trim());
})

function preprocessData(inputs, start, end){
    let data = inputs.slice(start, end);
    data = data.join(' ');
    data = data.split(' ')
    data = data.map(data => data.split(':'))
    let attributes = data.map(arr => {return {...arr}})
    return attributes;
}
function findNextPassport(inputs, start){
    let end = -1;
    for(let i=start; i<inputs.length; i++){
        if(i === inputs.length-1 || inputs[i].length===0 ){
            end = i;
            break;
        }
    }
    return [start, end];
}

function isPassportValid(passport){
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let validFields = 0
    for(let i=0; i<passport.length; i++){
        let attribute = passport[i][0];
        let value = passport[i][1];
        if(requiredFields.includes(attribute) && isValidPassportDetails(attribute, value))
        {
            validFields++;
        }       
    }
    return validFields >= requiredFields.length
}

function isValidPassportDetails(attribute, value){
    if(attribute==='cid')
    {
        return true;
    }
    else if(attribute === 'byr')
    {
        
        if(value.length === 4)
        {
            let intVal = parseInt(value);
            if(intVal >=1920 && intVal <= 2002)
            {
                return true;
            }
        }
        return false;
    }
    else if(attribute==='iyr')
    {
        if(value.length === 4)
        {
            let intVal = parseInt(value);
            if(intVal >=2010 && intVal <= 2020)
            {
                return true;
            }
        }
        return false;
    }
    else if(attribute ==='eyr')
    {
        if(value.length === 4)
        {
            let intVal = parseInt(value);
            if(intVal >=2020 && intVal <= 2030)
            {
                return true;
            }
        }
        return false;
    }
    else if(attribute === 'hgt')
    {
        let regex = new RegExp("^[0-9]+(cm|in)$");
        let result = value.search(regex);
        if(result === -1){
            return false;
        }
        else{
            let num = parseInt(value) ;
            if(num !== NaN){
                if(value.search('in')!== -1){
                    if(num >= 59 && num <= 76)
                    {
                        return true
                    }
                }
                else if(value.search('cm')!==-1){
                    if(num >= 150 && num <= 193)
                    {
                        return true
                    }
                }
            }            
        }
        return false;
    }
    else if(attribute === 'hcl'){
        let regex = new RegExp("^(#)[0-9a-f]{6}$");
        return value.search(regex) !== -1;
    }
    else if(attribute === 'ecl'){
        const color = ['amb','blu', 'brn', 'gry', 'grn', 'hzl',  'oth']
        return color.includes(value);
    }
    else if(attribute === 'pid'){
        return value.length === 9;
    }
    return false

}

function validatePassport(inputs){
    let i =0;
    let validCount = 0;
    while(i<inputs.length)
    {
        let start = i;
        let end = -1;
        [start, end] = findNextPassport(inputs, start);
        end = end === inputs.length-1 ? end+1 : end;
        let passport = preprocessData(inputs, start, end);

        if(isPassportValid(passport)){
            validCount++
        }

        i = end+1;
    }
    console.log(validCount);
}

validatePassport(inputs);