function race() {
    let n = parseInt(prompt('how many racers? (maximum 10)'))       //Number of cars
    while (n > 10 || isNaN(n)) {
        n = parseInt(prompt('how many racers? (maximum 10)'))
    }

    let cars = []                                                  //we make array of cars 

    function car(name, position = 0 , rank = 0, order) {
        this.name = name
        this.position = position
        this.rank = rank
        this.order = order
    }

    for (let i = 0 ; i < n ; i++) {                                   //get name from user and make random order for each car and make random order
        let carName = prompt(`Enter a name for car No ${i+1}`)
        let carOrder = Math.floor(Math.random() * (n - 1 + 1) + 1)
        while (cars.some(item => item.order == carOrder) || cars.some(item => item.name == carName)) {
            carOrder = Math.floor(Math.random() * (n - 1 + 1) + 1)
        }
        cars.push(new car(carName,0,0,carOrder))
    }

    cars.sort((a,b) => a.order - b.order)                           //sort Array of Cars by order to know who move first

    let track = []                                                  // track of race

    for (let i = 0 ; i < 300 ; i++) {
        track.push('-')
    }

    let rank = 0           //rank of each racer between 1...n
    let finished = []      //each racer who position after index 299 will push to finished array earlier

    console.log(cars.map(item => item.name))
    while (cars.some(item => item.position < 300)) { 
        let distance = []                                                   //array of new distances to drive                                              
        for (let i of cars) {
            let newDistance = Math.floor(Math.random() * (10 - 1 + 1) + 1)  //make drive distance by random number between 1..10
            distance.push(newDistance)
            track.splice(track.indexOf(i.name),1,'-')                       //delete last position of a car
            if (i.position == 0) {                                          //first move must be start from index[0] of track array
                i.position += newDistance - 1
            } else {
                i.position += newDistance
            }

            if (i.position > 300) {
                rank += 1                                           //every car who position over 299 will add to finished array
                i.rank = rank                                       //and it's rank will be one unit higher than previous
                finished.push(i)
                track.splice(track.indexOf(i.name),1,'-')           //finished car will be added to finished cars array
                cars.splice(cars.indexOf(i),1)                      //and it will be deleted from racers array
            } else {
                track.splice(i.position,1,i.name)
            }

            cars.map(function(item) {
                if(item.position == i.position && item.name != i.name) {
                    item.position = 0
                }
            })
        }
        console.log(`new moves ${distance}`)
        console.log(`new positions ${cars.map(function(item) { if (item.position == 0) { return 0 } else { return item.position + 1 } })}`)
        console.log(track.join(''))
    }
    console.log(finished.map(item => item.name + ' ' + item.rank))
}