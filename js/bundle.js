(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Constants = require('./Constants');

module.exports = {

    Cell: class Cell {

        constructor(Ocean = null, coords = null) {
            this.Ocean1 = Ocean;
            this.offset = coords;
            this.image = Constants.DefaultImage;  //╨╖╨░╨╝╤Ц╨╜╨╕╤В╨╕ ╨▓╤Ц╨╖╤Г╨░╨╗╤Ц╨╖╨░╤Ж╤Ц╤Ф╤О ╨╜╨░ ╤Б╨░╨╣╤В╤Ц
            this.color = 'white';
            this.width = 10;
            this.height = 10;
        }

        //╨│╨╡╤В╤В╨╡╤А╨╕ ╤В╨░ ╤Б╨╡╤В╤В╨╡╤А╨╕
        getImage() {
            return this.image;
        }

        getOffset() {
            return this.offset;
        }

        setOffset(anOffset) {
            this.offset = anOffset;
        }

        //╨╛╤В╤А╨╕╨╝╨░╨╜╨╜╤П ╨╛╨▒'╤Ф╨║╤В╤Г ╨Ъ╨╗╤Ц╤В╨╕╨╜╨║╨╕ ╨┐╨╛ ╤Ч╤Ч ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В╨░╨╝ ╤Г ╨┤╨▓╨╛╨▓╨╕╨╝╤Ц╤А╨╜╨╛╨╝╨║ ╨╝╨░╤Б╨╕╨▓╤Ц
        getCellAt(aCoord) { 
            return this.Ocean1.cells[aCoord.getY()][aCoord.getX()];
        }

        //╨▓╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╜╤П ╨┐╨╡╨▓╨╜╨╛╨│╨╛ ╨╛╨▒'╤Ф╨║╤В╤Г ╨Ъ╨╗╤Ц╤В╨╕╨╜╨╕ ╤Г ╨╖╨░╨┤╨░╨╜╨╡ ╨╝╤Ц╤Б╤Ж╨╡ ╨┤╨▓╨╛╨▓╨╕╨╝╤Ц╤А╨╜╨╛╨│╨╛ ╨╝╨░╤Б╨╕╨▓╤Г
        assignCellAt(aCoord, aCell) { 
            this.Ocean1.cells[aCoord.getY()][aCoord.getX()] = aCell;
        }

        //╨┐╨╛╤И╤Г╨║ "╤Б╤Г╤Б╤Ц╨┤╨░" ╨┐╨╛ ╨┐╨╛╨╖╨╜╨░╤З╤Ж╤Ц (╨┐╨╡╤А╨╡╤А╨╛╨▒╨╕╤В╨╕)
        getNeighborWithImage(anImage) {
            let array = [],
                count = 0;

            if (this.north().getImage() == anImage) {
                array.push(this.north());
                count++;
            }
            if (this.south().getImage() == anImage) {
                array.push(this.south());
                count++;
            }
            if (this.east().getImage() == anImage) {
                array.push(this.east());
                count++;
            }
            if (this.west().getImage() == anImage) {
                array.push(this.west());
                count++;
            }

            if (count == 0) return this;
            else {
                let random = Math.floor(Math.random() * ((count - 1) - 0) + 0);
                return array[random];
            }
        }

        //╨╖╨╜╨░╤Е╨╛╨┤╨╢╨╡╨╜╨╜╤П ╨┐╤Г╤Б╤В╨╛╤Ч ╤Б╤Г╤Б╤Ц╨┤╨╜╤М╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        getEmptyNeighborCoord() {
            return this.getNeighborWithImage(Constants.DefaultImage).getOffset();
        }

        //╨╖╨╜╨░╤Е╨╛╨┤╨╢╨╡╨╜╨╜╤П ╤Б╤Г╤Б╤Ц╨┤╨╜╤М╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕ ╤В╨╕╨┐╤Г ╨Ч╨┤╨╛╨▒╨╕╤З
        getPrayNeighborCoord() {
            return this.getNeighborWithImage(Constants.DefaultPreyImage).getOffset();
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╨▓╨╡╤А╤Е╨╜╤М╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        north() {
            let yvalue;

            yvalue = (this.offset.getY() > 0) ? (this.offset.getY() - 1) : (this.Ocean1._numRows - 1);
            return this.Ocean1.cells[yvalue][this.offset.getX()];
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╨╜╨╕╨╢╨╜╤М╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        south() {
            let yvalue;

            yvalue = (this.offset.getY() + 1) % this.Ocean1._numRows;
            return this.Ocean1.cells[yvalue][this.offset.getX()];
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╨┐╤А╨░╨▓╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        east() {
            let xvalue;

            xvalue = (this.offset.getX() + 1) % this.Ocean1._numCols;
            return this.Ocean1.cells[this.offset.getY()][xvalue];
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╨╗╤Ц╨▓╨╛╤Ч ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        west() {
            let xvalue;

            xvalue = (this.offset.getX() > 0) ? (this.offset.getX() - 1) : (this.Ocean1._numCols - 1);
            return this.Ocean1.cells[this.offset.getY()][xvalue];
        }

        //╤Д╤Г╨╜╨║╤Ж╤Ц╤П "╤А╨╛╨╖╨╝╨╜╨╛╨╢╨╡╨╜╨╜╤П" ╨║╨╗╤Ц╤В╨╕╨╜╨╕
        reproduce(anOffset) {
            let temp = new Cell(this, anOffset);
            return temp;
        }

        //╨╛╨▒╤А╨╛╨▒╨║╨░ ╨┤╤Ц╨╣ ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╨▓ ╨╖╨░╨╗╨╡╨╢╨╜╨╛╤Б╤В╤Ц ╨▓╤Ц╨┤ ╤Ч╤Ч ╤В╨╕╨┐╤Г
        process() { } 

        //╨╝╨░╨╗╤О╨▓╨░╨╜╨╜╤П ╨║╨▓╨░╨┤╤А╨░╤В╤Г ╨▓ ╨╖╨░╨╗╨╡╨╢╨╜╨╛╤Б╤В╤Ц ╨▓╤Ц╨┤ ╤В╨╕╨┐╤Г ╨║╨╗╤Ц╤В╨╕╨╜╨║╨╕
        draw() { 
            this.Ocean1.context.fillStyle = this.color;
            this.Ocean1.context.fillRect(this.offset.getX() * this.width, (this.offset.getY() + 10) * this.height, this.width, this.height);
        }
    }
};
},{"./Constants":2}],2:[function(require,module,exports){

//╨║╨╛╨╜╤Б╤В╨░╨╜╤В╨╕
module.exports = {
    MaxRows: 50,
    MaxCols: 70,

    DefaultNumObstacles: 75,
    DefaultNumPredators: 30,
    DefaultNumPrey: 200,
    DefaultNumIterations: 1000,

    DefaultImage: '-',
    DefaultPreyImage: 'f',
    DefaultPredImage: 'S',
    ObstacleImage: '#',

    TimeToFeed: 6,
    TimeToReproduce: 6
};
},{}],3:[function(require,module,exports){
module.exports = {

    Coordinate: class Coordinate {
        constructor(aX = 0, aY = 0) {
            this.x = aX;
            this.y = aY;
        }

        //╨▓╤Б╤В╨░╨╜╨╛╨▓╨╗╨╡╨╜╨╜╤П ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В ╨╖ ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В ╨╖╨░╨┤╨░╨╜╨╛╨│╨╛ ╨╛╨▒'╤Ф╨║╤В╤Г
        setXYfromObj(obj) {
            this.x = obj.x;
            this.y = obj.y;
        }

        //╨│╨╡╤В╤В╨╡╤А╨╕ ╤В╨░ ╤Б╨╡╤В╤В╨╡╤А╨╕ ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В
        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        //setters
        setX(aX) {
            this.x = aX;
        }

        setY(aY) {
            this.y = aY;
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╤А╤Ц╨▓╨╜╨╛╤Б╤В╤Ц ╨╛╨▒'╤Ф╨║╤В╤Ц╨▓ ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В
        equalXY(obj) {
            return (this.x == obj.x && this.y == obj.y);
        }

        //╨┐╨╡╤А╨╡╨▓╤Ц╤А╨║╨░ ╨╜╨╡╤А╤Ц╨▓╨╜╨╛╤Б╤В╤Ц ╨╛╨▒'╤Ф╨║╤В╤Ц╨▓ ╨║╨╛╨╛╤А╨┤╨╕╨╜╨░╤В
        notEqualXY(obj) {
            return (this.x != obj.x || this.y != obj.y);
        }

    }


}
},{}],4:[function(require,module,exports){
const Cell = require('./Cell.js'),
    Constants = require('./Constants.js');

    //╨Ъ╨╗╤Ц╤В╨╕╨╜╨░ ╤В╨╕╨┐╤Г ╨Я╨╡╤А╨╡╤И╨║╨╛╨┤╨░. ╨Э╨╡ ╨╝╨░╤Ф ╨╜╤Ц╤П╨║╨╛╨│╨╛ ╤Д╤Г╨╜╨║╤Ж╤Ц╨╛╨╜╨░╨╗╤Г
module.exports = {
    Obstacle: class Obstacle extends Cell.Cell {
        constructor(Ocean, offset) {
            super(Ocean, offset);
            this.image = Constants.ObstacleImage;
            this.color = 'black';
        }
    }
};
},{"./Cell.js":1,"./Constants.js":2}],5:[function(require,module,exports){
const Constants = require('./Constants.js'), //include modules
    Random = require('./Random.js'),
    Cell = require('./Cell.js'),
    Coordinate = require('./Coordinate.js'),
    Obstacle = require('./Obstacle.js'),
    Predator = require('./Predator.js'),
    Prey = require('./Prey.js');

module.exports = {
    Ocean: class Ocean {

        constructor(canvas = null) {
            this._numRows = 0;
            this._numCols = 0;
            this._size = 0;
            this._numPrey = 0;
            this._numPredators = 0;
            this._numObstacles = 0;

            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');

            this.cells = [];
        }

        //╤Ц╨╜╤Ц╤Ж╤Ц╨░╨╗╤Ц╨╖╨░╤Ж╤Ц╤П ╨┐╨╛╨╗╤Ц╨▓ ╨║╨╗╨░╤Б╨░
        initialize() {
            this._numRows = Constants.MaxRows;
            this._numCols = Constants.MaxCols;
            this._size = this._numRows * this._numCols;
            this._numPrey = Constants.DefaultNumPrey;
            this._numPredators = Constants.DefaultNumPredators;
            this._numObstacles = Constants.DefaultNumObstacles;
            this.initCells();
        }

        //╨┤╨╛╨┤╨░╨▓╨░╨╜╨╜╤П ╤Г╤Б╤Ц╤Е ╨╡╨╗╨╡╨╝╨╡╨╜╤В╤Ц╨▓ ╨┤╨╛ "╨Ю╨║╨╡╨░╨╜╤Г"
        initCells() {
            this.addEmptyCells();

            this.addObstacles();
            this.addPrey();
            this.addPredators();

        }

        getEmptyCellCoord() { //╨┐╨╛╨┤╤Г╨╝╨░╤В╨╕ ╨╜╨░╨┤ ╨▒╤Ц╨╗╤М╤И ╨╡╤Д╨╡╨║╤В╨╕╨▓╨╜╨╛╤О ╤А╨╡╨░╨╗╤Ц╨╖╨░╤Ж╤Ц╤Ф╤О
            let x, y;

            do {
                x = Random.nextIntBetween(0, this._numCols - 1);
                y = Random.nextIntBetween(0, this._numRows - 1);
            } while (this.cells[y][x].getImage() != Constants.DefaultImage);

            return this.cells[y][x].getOffset();
        }

        //╨╖╨░╨┐╨╛╨▓╨╜╨╡╨╜╨╜╤П ╨Ю╨║╨╡╨░╨╜╤Г ╨┐╤Г╤Б╤В╨╕╨╝╨╕ ╨║╨╛╨╝╤Ц╤А╨║╨░╨╝╨╕
        addEmptyCells() {
            for (let row = 0; row < this._numRows; row++) {
                this.cells[row] = [];
                for (let col = 0; col < this._numCols; col++) {
                    this.cells[row][col] = new Cell.Cell(this, new Coordinate.Coordinate(col, row));
                }
            }
        }

        //╨┤╨╛╨┤╨░╨▓╨░╨╜╨╜╤П ╨╖╨┤╨╛╨▒╨╕╤З╨╕
        addPrey() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numPrey; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Prey.Prey(this, empty);
            }
        }

        //╨┤╨╛╨┤╨░╨▓╨░╨╜╨╜╤П ╨┐╨╡╤А╨╡╤И╨║╨╛╨┤
        addObstacles() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numObstacles; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Obstacle.Obstacle(this, empty);
            }
        }

        //╨┤╨╛╨┤╨░╨▓╨░╨╜╨╜╤П ╤Е╨╕╨╢╨░╨║╤Ц╨▓
        addPredators() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numPredators; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Predator.Predator(this, empty);
            }
        }

        //╨│╨╡╤В╤В╨╡╤А╨╕ ╤В╨░ ╤Б╨╡╤В╤В╨╡╤А╨╕
        getNumPrey() {
            return this._numPrey;
        }

        setNumPrey(num) {
            this._numPrey = num;
        }

        getNumPredators() {
            return this._numPredators;
        }

        setNumPredators(num) {
            this._numPredators = num;
        }

        //╨▓╨╕╨▓╨╡╨┤╨╡╨╜╨╜╤П ╨┤╨░╨╜╨╕╤Е ╤Б╤В╨░╨╜╤Г ╨Ю╨║╨╡╨░╨╜╤Г
        displayStats(iteration) {
            console.log(`Iteration: ${iteration}, Obst: ${this._numObstacles}, Predat: ${this._numPredators}, Prey: ${this._numPrey}`);
        }

        //╤Д╤Г╨╜╨║╤Ж╤Ц╤П ╨╖╨░╨┐╤Г╤Б╨║╤Г "╨╢╨╕╤В╤В╤П"
        run() {
            let numIter = 0;
            if (numIter > 1000 || numIter < 0) numIter = 1000;
            window.requestAnimationFrame(() => this.gameLoop(numIter));
        }

        //╤Д╤Г╨╜╨║╤Ж╤Ц╤П ╨▓╨╕╨▓╨╡╨┤╨╡╨╜╨╜╤П ╨┤╨░╨╜╨╕╤Е ╨┐╤А╨╛ ╤Б╤В╨░╨╜ ╨║╨╛╨╢╨╜╨╛╤Ч ╨║╨╛╨╝╤Ц╤А╨║╨╕ ╤Г ╨╖╨░╨┤╨╛╨▓╤Ц╨╗╤М╨╜╨╛╨╝╤Г ╨▓╨╕╨│╨╗╤П╨┤╤Ц
        view() {
            let arr = [];
            for (let row = 0; row < Constants.MaxRows; row++) {
                arr[row] = [];
                for (let col = 0; col < Constants.MaxCols; col++) {
                    this.cells[row][col].draw();
                    arr[row][col] = this.cells[row][col].image;
                }
            }

            arr.forEach((item) => {
                console.log(item);
            });
        }

        //╨╖╨░╨┐╤Г╤Б╨║ ╨╗╨╛╨│╤Ц╨║╨╕ "╨╢╨╕╤В╤В╤П" ╨║╨╛╨╢╨╜╨╛╤Ч ╨║╨╛╨╝╤Ц╤А╨║╨╕ ╨┤╨▓╨╛╨▓╨╕╨╝╤Ц╤А╨╜╨╛╨│╨╛ ╨╝╨░╤Б╨╕╨▓╤Г ╤Ц ╨╝╨░╨╗╤О╨▓╨░╨╜╨╜╤П ╤Ц╨│╤А╨╛╨▓╨╛╨│╨╛ ╨┐╨╛╨╗╤П ╨║╨╛╨╢╨╜╤Ц 1000╨╝╤Б
        gameLoop(numIter) {

            if ((this._numPredators > 0 && this._numPrey > 0) && numIter < Constants.DefaultNumIterations) {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.displayStats(numIter + 1);
                this.view();
                for (let row = 0; row < this._numRows; row++)
                    for (let col = 0; col < this._numCols; col++) {
                        if (!this.cells[row][col].moved) {
                            this.cells[row][col].process();
                        }
                    }

                for (let row = 0; row < this._numRows; row++)
                    for (let col = 0; col < this._numCols; col++) {
                        if (this.cells[row][col].moved)
                            this.cells[row][col].moved = false;
                    }

                numIter++;
            } else if (this._numPredators == 0 || this._numPrey == 0 || numIter >= Constants.DefaultNumIterations) {
                for (let row = 0; row < this._numRows; row++)
                    for (let col = 0; col < this._numCols; col++)
                        this.cells[row][col].draw();
                clearTimeout();
            }
            setTimeout(() => {
                window.requestAnimationFrame(() => this.gameLoop(numIter));
            }, 1000);

        }

    }
};



},{"./Cell.js":1,"./Constants.js":2,"./Coordinate.js":3,"./Obstacle.js":4,"./Predator.js":6,"./Prey.js":7,"./Random.js":8}],6:[function(require,module,exports){
const Cell = require('./Cell'),
    Constants = require('./Constants'),
    Prey = require('./Prey.js');

module.exports = {
    Predator: class Predator extends Prey.Prey {
        constructor(Ocean = null, offset = null) {
            super(Ocean, offset);
            this.timeToFeed = Constants.TimeToFeed;
            this.image = Constants.DefaultPredImage;
            this.color = 'red';
        }

        // "╤А╨╛╨╖╨╝╨╜╨╛╨╢╨╡╨╜╨╜╤П" ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╤В╨╕╨┐╤Г ╨е╨╕╨╢╨░╨║
        reproduce(anOffset) {
            let temp = new Predator(this.Ocean1, anOffset);
            this.Ocean1.setNumPredators(this.Ocean1.getNumPredators() + 1);
            temp.moved = true;
            return temp;
        }

        //╤Ц╨╝╤Ц╤В╨░╤Ж╤Ц╤П "╨╢╨╕╤В╤В╤П" ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╤В╨╕╨┐╤Г ╨е╨╕╨╢╨░╨║
        process() {
            if (--this.timeToFeed <= 0) {
                this.assignCellAt(this.offset, new Cell.Cell(this.Ocean1, this.offset));
                this.Ocean1.setNumPredators(this.Ocean1.getNumPredators() - 1);
                delete this;
            } else {
                let toCoord = this.getPrayNeighborCoord();
                if (toCoord != this.offset) {
                    this.Ocean1.setNumPrey(this.Ocean1.getNumPrey() - 1);
                    this.timeToFeed = Constants.TimeToFeed;
                    this.moveFrom(this.offset, toCoord);
                } else {
                    super.process();
                }
            }
        }
    }
}
},{"./Cell":1,"./Constants":2,"./Prey.js":7}],7:[function(require,module,exports){
const Cell = require('./Cell.js'),
    Constants = require('./Constants.js');

module.exports = {
    Prey: class Prey extends Cell.Cell {
        constructor(Ocean, offset) {
            super(Ocean, offset);
            this.timeToReproduce = Constants.TimeToReproduce;
            this.image = Constants.DefaultPreyImage;
            this.moved = false;
            this.color = 'green';
        }

        //╨╖╨╝╤Ц╨╜╨░ ╨┐╨╛╨╗╨╛╨╢╨╡╨╜╨╜╤П ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╨▓╤Ц╨┤ ╤В╨╛╤З╨║╨╕ ╨┤╨╛ ╤В╨╛╤З╨║╨╕
        moveFrom(from, to) {
            this.timeToReproduce--;
            if (to.notEqualXY(from)) {
                this.setOffset(to);
                this.assignCellAt(to, this);
                this.moved = true;
                if (this.timeToReproduce <= 0) {
                    this.timeToReproduce = Constants.TimeToReproduce;
                    this.assignCellAt(from, this.reproduce(from));
                } else {
                    this.assignCellAt(from, new Cell.Cell(this.Ocean1, from));
                }
            }
        }

        // "╤А╨╛╨╖╨╝╨╜╨╛╨╢╨╡╨╜╨╜╤П" ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╤В╨╕╨┐╤Г ╨Ч╨┤╨╛╨▒╨╕╤З
        reproduce(anOffset) {
            let temp = new Prey(this.Ocean1, anOffset);
            temp.moved = true;
            this.Ocean1.setNumPrey(this.Ocean1.getNumPrey() + 1);
            return temp;
        }

        //╤Ц╨╝╤Ц╤В╨░╤Ж╤Ц╤П "╨╢╨╕╤В╤В╤П" ╨║╨╗╤Ц╤В╨╕╨╜╨╕ ╤В╨╕╨┐╤Г ╨Ч╨┤╨╛╨▒╨╕╤З
        process() {
            this.moveFrom(this.offset, this.getEmptyNeighborCoord());
        }
    }
}
},{"./Cell.js":1,"./Constants.js":2}],8:[function(require,module,exports){
const MAX = 32767;

module.exports = {
    Random: class Random {
        constructor() { }
    },

    //╤Д╤Г╨╜╨║╤Ж╤Ц╤П ╨╖╨╜╨░╤Е╨╛╨┤╨╢╨╡╨╜╨╜╤П ╤А╨░╨╜╨┤╨╛╨╝╨╜╨╛╨│╨╛ ╤З╨╕╤Б╨╗╨░ ╨╝╤Ц╨╢ ╨┤╨▓╨╛╨╝╨░ ╨╖╨░╨┤╨░╨╜╨╕╨╝╨╕ ╤З╨╕╤Б╨╗╨░╨╝╨╕
    nextIntBetween: function (min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
};
},{}],9:[function(require,module,exports){
const Constants = require('./additionalClasses/Constants.js');
const Ocean = require('./additionalClasses/Ocean.js');

let canvas = document.getElementById('canvas');

// canvas.style.width = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
// canvas.style.height = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
let oceantest = new Ocean.Ocean(canvas);

oceantest.initialize();

oceantest.run();


},{"./additionalClasses/Constants.js":2,"./additionalClasses/Ocean.js":5}]},{},[9]);
