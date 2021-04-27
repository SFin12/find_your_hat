
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(fieldArray) {
        this.fieldArray = fieldArray;

        //current position starts at top left but will change upon movement.
        this.currentPosition = [0, 0];
    }
    //print method changes arrays to strings for better terminal look.
    print() {
        this.fieldArray.forEach(element => {
            console.log(element.join(''))
        });
    }

    //returns an array with random row and column. use field[row][col] to select the cell.
    static randomCell(field) {
        var randomRow = Math.floor(Math.random() * (field.length));
        var randomColumn = Math.floor(Math.random() * (field[0].length));
        return [randomRow, randomColumn];
    };

    //creates field that can be passed into class Field. Size and holes are based on user selection in game setup.
    static generateField(height = 10, width = 8, percentage = 30) {
        var numHoles = Math.floor((percentage / 100) * (height * width));
        const field = [];
        var count = height;
        while (count > 0) {
            field.push([])
            count--;
        };

        field.forEach(arr => {

            for (let j = 0; j < width; j++) {
                arr.push(fieldCharacter)
            }
        })
        while (numHoles > 0) {
            var cell = this.randomCell(field);
            var row = cell[0];
            var column = cell[1];
            if (field[row][column] !== hole) {
                field[row][column] = hole;
                numHoles--;
            } else {
                continue;
            }
        }
        //starting position.
        field[0][0] = pathCharacter;

        //random hat placement.
        var end = this.randomCell(field);
        //makes sure hat isn't placed on a hole or on starting location.
        while (end[0] === 0 || field[end[0]][end[1] === hole]) {
            end = this.randomCell(field);
        }
        //places hat in random location.
        field[end[0]][end[1]] = hat;

        return field;

    }

    //updates field with '*' when movement directions are received.
    update(direction) {
        
        if (direction == "d") {
            this.currentPosition[0] += 1;
   
        } else if (direction == "u") {
            this.currentPosition[0] -= 1;
       
        } else if (direction == "r") {
            this.currentPosition[1] += 1;
    
        } else if (direction == "l") {
            this.currentPosition[1] -= 1;
        }

        //row and column coordinates to update from movement.
        var r = this.currentPosition[0];
        var c = this.currentPosition[1];
        
        //if user goes off the top or bottom of the grid.
        if(r < 0 || r > this.fieldArray.length) {
            console.log("You fell off the edge!")
            return false;
        }

        //if user goes off the sides of the grid.
        if(this.fieldArray[r][c] == undefined) {
            console.log("You fell off the edge!")
            return false;
        //if user goes onto a hole.
        } else if (this.fieldArray[r][c] == hole) {
            console.log("You fell in a hole!")
            return false;
        //if a user goes onto the hat.
        } else if(this.fieldArray[r][c] == hat) {
            console.log("You found your hat!")
            return false;
        //creates new '*' to show path.
        } else {
            this.fieldArray[r][c] = pathCharacter;
            return true;
        }
    }

}


module.exports = Field