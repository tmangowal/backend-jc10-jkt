function randomkeun () {
    let result = parseInt(Math.random() * 10)
    while(result > 5){
        result = parseInt(Math.random() * 10)
    }

    return result
}

console.log(randomkeun())