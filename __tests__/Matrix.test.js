const matrix_module = require("../dist/matrix/Matrix")
const Matrix = matrix_module.Matrix
const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

let rowMatrix, columnMatrix, arrayRowMatrix, arrayColumnMatrix, squareRowMatrix, squareRowArray, squareColumnMatrix, squareColumnArray

describe('Matrix', () => {


    beforeEach(() => {
        rowMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
        columnMatrix = new Matrix([[[1], [2], [3]], [[4], [5], [6]]]);

        arrayRowMatrix = [[1, 2, 3], [4, 5, 6]]
        arrayColumnMatrix = [[[1], [2], [3]], [[4], [5], [6]]]

        squareRowMatrix = new Matrix([[1, 2], [3, 4]])
        squareRowArray = [[1, 2], [3, 4]]

        squareColumnMatrix = new Matrix([[[1], [2]], [[3], [4]]])
        squareColumnArray = [[[1], [2]], [[3], [4]]]


    });

    describe('Matrix initialization', () => {

        it('Validation of a row matrix', () => {
            expect(rowMatrix.isRowMatrix).toBeTruthy();
            expect(rowMatrix.size).toBe(6);
            expect(rowMatrix.shape).toBe('(2,3)');
            expect(rowMatrix.isWide).toBeTruthy()
        });

        it('Validation of a column matrix', () => {
            expect(columnMatrix.isColumnMatrix).toBeTruthy();
            expect(columnMatrix.size).toBe(6);
            expect(columnMatrix.shape).toBe('(3,2)');
            expect(columnMatrix.isTall).toBeTruthy()
        });

        it('Validation of a square row matrix', () => {
            expect(squareRowMatrix.isRowMatrix).toBeTruthy();
            expect(squareRowMatrix.size).toBe(4);
            expect(squareRowMatrix.shape).toBe('(2,2)');
            expect(squareRowMatrix.isSquare).toBeTruthy()
        });

        it('Validation of a square column matrix', () => {
            expect(squareColumnMatrix.isColumnMatrix).toBeTruthy();
            expect(squareColumnMatrix.size).toBe(4);
            expect(squareColumnMatrix.shape).toBe('(2,2)');
            expect(squareColumnMatrix.isSquare).toBeTruthy()
        });


        it('Error: Different types of entries', () => {
            expect(() => new Matrix([[2], 2])).toThrow();
        })
    });

    describe('Matrix identity', () => {
        it('A 3x3 identity row matrix', () => {
            const matrix = Matrix.createIdentityMatrix(3);  // Create a 3x3 identity row matrix.

            expect(matrix.rows).toBe(3);  // We have 3 rows.
            expect(matrix.columns).toBe(3);  // We have 3 columns.

            matrix.elements.forEach((unitVector, index) => {
                expect(unitVector.isUnitVector()).toBe(true);  // The vector should be a unit vector.

                // Find the index of '1' (where the unit vector's magnitude is) in the elements of the unit vector.
                const indexOfOne = unitVector.elements.findIndex(element => element === 1);
                expect(indexOfOne).toBe(index);  // This index should match the current index of the unit vector in the matrix.
            });
        });

        it('A 3x3 identity column matrix', () => {
            const matrix = Matrix.createIdentityMatrix(3, true);  // Create a 3x3 identity column matrix.

            expect(matrix.rows).toBe(3);  // It should be a 3x3 matrix.
            expect(matrix.columns).toBe(3);
            matrix.elements.forEach((unitVector, index) => {
                expect(unitVector.isUnitVector()).toBe(true);  // The vector should be a unit vector.
                const indices = unitVector.elements.map((subarray) => subarray.findIndex((element) => element === 1));
                expect(indices.findIndex((e) => e === 0)).toBe(index);
            });
        });


        it('Error: Non-positive dimensions', () => {
            expect(() => Matrix.createIdentityMatrix(-1)).toThrow();
            expect(() => Matrix.createIdentityMatrix(0)).toThrow();
            expect(() => Matrix.createIdentityMatrix(-1)).toThrow();
            expect(() => Matrix.createIdentityMatrix(0)).toThrow();
        });

        it('Error: Non-boolean third argument', () => {
            expect(() => Matrix.createIdentityMatrix(3, 3, 'true')).toThrow();
            expect(() => Matrix.createIdentityMatrix(3, 3, null)).toThrow();
            expect(() => Matrix.createIdentityMatrix(3, 3, {})).toThrow();
        });


    });

    // Testing toColumnMatrix
    describe('toColumnMatrix', () => {
        it('should convert a row matrix to a column matrix', () => {
            const rowMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            const columnMatrix = rowMatrix.toColumnMatrix();

            expect(columnMatrix.elements).toEqual([
                new Vector([[1], [4]]),
                new Vector([[2], [5]]),
                new Vector([[3], [6]])
            ]);
        });
    });

    // Testing toRowMatrix
    describe('toRowMatrix', () => {
        it('should convert a column matrix to a row matrix', () => {
            const columnMatrix = new Matrix([new Vector([[1], [4]]), new Vector([[2], [5]]), new Vector([[3], [6]])]);
            const rowMatrix = columnMatrix.toRowMatrix();

            expect(rowMatrix.elements).toEqual([
                new Vector([1, 2, 3]),
                new Vector([4, 5, 6])
            ]);
        });

    });

    describe('Matrix naive multiplication', () => {
        it('A 3x3 identity row matrix', () => {
        
            let matrix = new Matrix([[5,-4],[1,2]]);

            const pog = matrix.QRDecomposition()
            pog.Q.printMatrix()
            pog.R.printMatrix()
            // matrix.gs().printMatrix()


        });



    });


})